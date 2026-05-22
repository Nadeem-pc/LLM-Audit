import { PRICING_DATA, ToolPricing, PricingTier } from "@/data/pricing";

export function normalizePlanName(toolId: string, rawPlan: string): string {
  const tool = PRICING_DATA[toolId];
  if (!tool) return rawPlan.toLowerCase();
  
  const cleanPlan = rawPlan.toLowerCase().replace(/[^a-z0-9]/g, '');
  
  // Check aliases
  for (const [alias, tierId] of Object.entries(tool.planAliases)) {
    if (cleanPlan.includes(alias)) return tierId;
  }
  
  return cleanPlan;
}

export function estimateTierMonthlyCost(tier: PricingTier, seats: number): number {
  switch (tier.billingModel) {
    case 'flat':
      return tier.pricePerMonth;
    case 'per_seat':
      return tier.pricePerMonth * Math.max(seats, tier.minSeats ?? 1);
    case 'usage':
      return tier.typicalMonthlyRange ? (tier.typicalMonthlyRange[0] + tier.typicalMonthlyRange[1]) / 2 : tier.pricePerMonth;
    default:
      return 0;
  }
}

export function pickBestTier(toolId: string, teamSize: number, useCase: string, seats: number): PricingTier | null {
  const tool = PRICING_DATA[toolId];
  if (!tool) return null;

  let bestTier: PricingTier | null = null;
  let highestScore = -100;

  tool.tiers.forEach(tier => {
    let score = 0;

    // teamSize within bestForTeamSize
    if (teamSize >= tier.bestForTeamSize[0] && teamSize <= tier.bestForTeamSize[1]) {
      score += 3;
    }

    // primaryUseCase in bestForUseCases
    if (tier.bestForUseCases.some(uc => uc.toLowerCase() === useCase.toLowerCase())) {
      score += 2;
    }

    // seats matching teamSize
    if (tier.billingModel === 'per_seat') {
      if (seats >= (tier.minSeats ?? 0) && seats <= teamSize + 2) {
        score += 2;
      } else if (seats > teamSize + 3) {
        score -= 2;
      }
    }

    if (score > highestScore) {
      highestScore = score;
      bestTier = tier;
    }
  });

  return bestTier;
}
