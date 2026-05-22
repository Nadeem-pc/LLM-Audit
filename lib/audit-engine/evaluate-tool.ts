import { PRICING_DATA, PricingTier } from "@/data/pricing";
import { 
  normalizePlanName, 
  estimateTierMonthlyCost, 
  pickBestTier 
} from "./helper";

export interface AuditEntry {
  toolId: string;
  planName: string;
  monthlySpend: number;
  seats: number;
  teamSize: number;
  useCase: 'Coding' | 'Writing' | 'Research' | 'Data Analysis' | 'Mixed';
}

export interface ToolRecommendation {
  toolId: string;
  currentSpend: number;
  recommendedSpend: number;
  savingAmount: number;
  actionTitle: string;
  reasoning: string;
  suggestedPlan: string;
  type: 'downgrade' | 'alternative' | 'credit' | 'optimized';
  confidence: 'high' | 'medium' | 'low';
}

const OPTIMIZED_SAVINGS_THRESHOLD = 25;
const OPTIMIZED_SAVINGS_PERCENT = 0.05;

export function evaluateTool(entry: AuditEntry, teamSize: number): ToolRecommendation {
  const tool = PRICING_DATA[entry.toolId];
  const normalizedCurrentPlanId = normalizePlanName(entry.toolId, entry.planName);
  
  // 1. Initial best tier pick
  let bestTier = pickBestTier(entry.toolId, teamSize, entry.useCase, entry.seats) || tool?.tiers[0];
  let recommendedSpend = bestTier ? estimateTierMonthlyCost(bestTier, Math.min(entry.seats, Math.max(teamSize, 1))) : entry.monthlySpend;
  
  let recType: ToolRecommendation['type'] = 'downgrade';
  let confidence: ToolRecommendation['confidence'] = 'high';
  let reasoning = "";
  let actionTitle = `Switch to ${bestTier?.name || 'optimized plan'}`;

  // A. General rules
  const isEnterpriseLike = /enterprise|scale|tier4/i.test(entry.planName) || normalizedCurrentPlanId === 'enterprise';
  const isTeamLike = /team|business/i.test(entry.planName) || normalizedCurrentPlanId === 'team';

  // Rule 1: Enterprise mismatch
  if (isEnterpriseLike && teamSize < 20) {
    const nonEntTier = tool.tiers.find(t => t.type !== 'enterprise' && t.type !== 'team') || bestTier;
    bestTier = nonEntTier;
    recommendedSpend = estimateTierMonthlyCost(bestTier, teamSize);
    reasoning = `Enterprise tiers often require ${bestTier.minSeats || 20}+ seats. For a team of ${teamSize}, the ${bestTier.name} plan provides professional features at a more appropriate scale. `;
  }

  // Rule 2: Team mismatch for tiny teams
  else if (isTeamLike && teamSize <= 5 && entry.seats <= 3) {
    const proTier = tool.tiers.find(t => t.type === 'pro');
    if (proTier) {
      bestTier = proTier;
      recommendedSpend = estimateTierMonthlyCost(bestTier, entry.seats);
      reasoning = `Small teams of ${teamSize} rarely utilize org-level administrative controls. The ${proTier.name} tier offers identical model performance with less overhead. `;
    }
  }

  // Rule 3: Ghost seats
  if (entry.seats > teamSize + 1) {
    const rightSizedSeats = Math.max(teamSize, 1);
    recommendedSpend = bestTier ? estimateTierMonthlyCost(bestTier, rightSizedSeats) : recommendedSpend;
    reasoning += `Detected ${entry.seats - rightSizedSeats} idle seats. Right-sizing your seat count to match your actual team size (${teamSize}) will instantly reclaim budget. `;
  }

  // Rule 5: Optimized check
  if (bestTier && bestTier.id === normalizedCurrentPlanId) {
    recType = 'optimized';
    reasoning = "Your current spend and tier are in line with typical premium benchmarks for your usage pattern.";
    actionTitle = "Optimal Status";
  }

  // B. API Overrides
  if (tool?.category === 'API') {
    recommendedSpend = Math.min(entry.monthlySpend, entry.monthlySpend * (Math.max(teamSize, 1)/entry.seats) * 0.85);
    if (entry.monthlySpend > 2000 && teamSize < 15) {
      recType = 'credit';
      recommendedSpend = entry.monthlySpend * 0.72;
      reasoning = "High API volume detected. Teams at your scale are eligible for Credex prepaid credits, reducing effective token costs by up to 28%.";
      actionTitle = "Lease Prepaid Credits";
    } else if (entry.monthlySpend < 300) {
      recType = 'optimized';
      recommendedSpend = entry.monthlySpend;
    }
  }

  // C. Tool-specific overrides
  if ((entry.toolId === 'chatgpt' || entry.toolId === 'claude') && isTeamLike && teamSize <= 4 && entry.useCase === 'Coding') {
    recType = 'alternative';
    const proTier = tool.tiers.find(t => t.type === 'pro');
    if (proTier) {
       bestTier = proTier;
       recommendedSpend = estimateTierMonthlyCost(bestTier, entry.seats);
       actionTitle = `Switch to ${proTier.name}`;
       reasoning = `For small coding-heavy squads, ${proTier.name} plans offer higher per-user throughput than ${entry.planName} quotas.`;
    }
  }

  if (entry.toolId === 'copilot' && isTeamLike && teamSize <= 3) {
    const proTier = tool.tiers.find(t => t.type === 'pro');
    if (proTier) {
      bestTier = proTier;
      recommendedSpend = estimateTierMonthlyCost(bestTier, entry.seats);
      reasoning = "GitHub Copilot Individual offers equivalent latency and features to Business for teams without complex organizational policy requirements.";
    }
  }

  if (entry.toolId === 'cursor' && isTeamLike && teamSize <= 4) {
    const proTier = tool.tiers.find(t => t.type === 'pro');
    if (proTier) {
      bestTier = proTier;
      recommendedSpend = estimateTierMonthlyCost(bestTier, entry.seats);
      reasoning = "Most Cursor innovations are available first on the Pro tier. Business features like SSO are often redundant for agile teams of your size.";
    }
  }

  // Final Caps and Thresholds
  recommendedSpend = Math.min(recommendedSpend, entry.monthlySpend);
  let savingAmount = Math.max(0, entry.monthlySpend - recommendedSpend);

  if (savingAmount < OPTIMIZED_SAVINGS_THRESHOLD && (savingAmount / (entry.monthlySpend || 1)) < OPTIMIZED_SAVINGS_PERCENT) {
    recType = 'optimized';
    recommendedSpend = entry.monthlySpend;
    savingAmount = 0;
    reasoning = "Your spend is highly efficient. Further optimization would yield marginal gains below our $25 threshold.";
    actionTitle = "Optimal Status";
  }

  return {
    toolId: entry.toolId,
    currentSpend: entry.monthlySpend,
    recommendedSpend,
    savingAmount,
    actionTitle,
    reasoning,
    suggestedPlan: bestTier?.name || entry.planName,
    type: recType,
    confidence
  };
}
