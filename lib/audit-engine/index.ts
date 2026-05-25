import { AuditEntry, evaluateTool, ToolRecommendation } from "./evaluate-tool";

export interface AuditResult {
  recommendations: ToolRecommendation[];
  totalMonthlySpend: number;
  totalMonthlySavings: number;
  totalAnnualSavings: number;
  summary: string;
  isPortfolioOptimized: boolean;
}

const PORTFOLIO_OPTIMIZED_THRESHOLD = 50;

export function runAudit(entries: AuditEntry[]): AuditResult {
  let totalMonthlySpend = 0;
  let totalMonthlySavings = 0;

  // Note: The form gives us total teamSize separately in the raw data, 
  // but to keep runAudit clean, we assume teamSize is attached to entries or passed in.
  // In our actual implementation, the audit page passes the global teamSize.
  const teamSize = entries[0]?.teamSize || 1;

  const recommendations = entries.map(entry => {
    totalMonthlySpend += entry.monthlySpend;
    const rec = evaluateTool(entry, teamSize);
    totalMonthlySavings += rec.savingAmount;
    return rec;
  });

  const totalAnnualSavings = totalMonthlySavings * 12;
  const isPortfolioOptimized = totalMonthlySavings < PORTFOLIO_OPTIMIZED_THRESHOLD;

  // Build Summary Message
  let summary = "";
  const opsCount = recommendations.filter(r => r.savingAmount > 0).length;

  if (isPortfolioOptimized) {
    summary = "Your portfolio is already spending efficiently with minimal waste detected.";
  } else if (opsCount === 1) {
    summary = `We found a high-impact opportunity to reclaim $${totalMonthlySavings.toLocaleString()}/mo from your configuration.`;
  } else {
    summary = `We identified ${opsCount} optimization opportunities across your stack for total savings of $${totalMonthlySavings.toLocaleString()}/mo.`;
  }

  return {
    recommendations,
    totalMonthlySpend,
    totalMonthlySavings,
    totalAnnualSavings,
    summary,
    isPortfolioOptimized
  };
}

export type { ToolRecommendation } from "./evaluate-tool";
