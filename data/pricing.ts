export type BillingModel = 'flat' | 'per_seat' | 'usage';

export interface PricingTier {
  id: string;
  name: string;
  pricePerMonth: number;
  billingModel: BillingModel;
  minSeats?: number;
  bestForTeamSize: [number, number]; // [min, max]
  bestForUseCases: string[];
  features: string[];
  type: 'free' | 'pro' | 'team' | 'enterprise';
  typicalMonthlyRange?: [number, number]; // mainly for usage-based
}

export interface ToolPricing {
  id: string;
  name: string;
  category: 'IDE' | 'Assistant' | 'API';
  tiers: PricingTier[];
  planAliases: Record<string, string>;
}

export const PRICING_DATA: Record<string, ToolPricing> = {
  cursor: {
    id: 'cursor',
    name: 'Cursor',
    category: 'IDE',
    planAliases: { 'hobby': 'free', 'pro': 'pro', 'business': 'team' },
    tiers: [
      { id: 'free', name: 'Hobby', pricePerMonth: 0, billingModel: 'flat', bestForTeamSize: [1, 1], bestForUseCases: ['Coding'], features: ['Basic AI'], type: 'free' },
      { id: 'pro', name: 'Pro', pricePerMonth: 20, billingModel: 'per_seat', bestForTeamSize: [1, 10], bestForUseCases: ['Coding'], features: ['Unlimited Claude 3.5 Sonnet'], type: 'pro' },
      { id: 'team', name: 'Business', pricePerMonth: 40, billingModel: 'per_seat', bestForTeamSize: [5, 100], bestForUseCases: ['Coding'], features: ['Admin controls', 'Privacy mode'], type: 'team' },
    ],
  },
  chatgpt: {
    id: 'chatgpt',
    name: 'ChatGPT',
    category: 'Assistant',
    planAliases: { 'free': 'free', 'plus': 'pro', 'team': 'team', 'enterprise': 'enterprise' },
    tiers: [
      { id: 'free', name: 'Free', pricePerMonth: 0, billingModel: 'flat', bestForTeamSize: [1, 1], bestForUseCases: ['Personal'], features: ['Basic access'], type: 'free' },
      { id: 'pro', name: 'Plus', pricePerMonth: 20, billingModel: 'per_seat', bestForTeamSize: [1, 5], bestForUseCases: ['Writing', 'Research'], features: ['GPT-4 access'], type: 'pro' },
      { id: 'team', name: 'Team', pricePerMonth: 30, billingModel: 'per_seat', minSeats: 2, bestForTeamSize: [2, 50], bestForUseCases: ['Writing', 'Research'], features: ['Higher limits'], type: 'team' },
      { id: 'enterprise', name: 'Enterprise', pricePerMonth: 60, billingModel: 'per_seat', minSeats: 20, bestForTeamSize: [20, 1000], bestForUseCases: ['Data Analysis'], features: ['Security'], type: 'enterprise' },
    ],
  },
  claude: {
    id: 'claude',
    name: 'Claude',
    category: 'Assistant',
    planAliases: { 'free': 'free', 'pro': 'pro', 'team': 'team' },
    tiers: [
      { id: 'free', name: 'Free', pricePerMonth: 0, billingModel: 'flat', bestForTeamSize: [1, 1], bestForUseCases: ['Research'], features: ['Basic Claude'], type: 'free' },
      { id: 'pro', name: 'Pro', pricePerMonth: 20, billingModel: 'per_seat', bestForTeamSize: [1, 5], bestForUseCases: ['Writing', 'Coding'], features: ['High limits'], type: 'pro' },
      { id: 'team', name: 'Team', pricePerMonth: 30, billingModel: 'per_seat', minSeats: 5, bestForTeamSize: [5, 100], bestForUseCases: ['Writing', 'Coding'], features: ['Projects'], type: 'team' },
    ],
  },
  copilot: {
    id: 'copilot',
    name: 'GitHub Copilot',
    category: 'IDE',
    planAliases: { 'individual': 'pro', 'business': 'team', 'enterprise': 'enterprise' },
    tiers: [
      { id: 'pro', name: 'Individual', pricePerMonth: 10, billingModel: 'per_seat', bestForTeamSize: [1, 1], bestForUseCases: ['Coding'], features: ['Chat'], type: 'pro' },
      { id: 'team', name: 'Business', pricePerMonth: 19, billingModel: 'per_seat', bestForTeamSize: [2, 100], bestForUseCases: ['Coding'], features: ['Org management'], type: 'team' },
      { id: 'enterprise', name: 'Enterprise', pricePerMonth: 39, billingModel: 'per_seat', bestForTeamSize: [100, 10000], bestForUseCases: ['Coding'], features: ['Customization'], type: 'enterprise' },
    ],
  },
  gemini: {
    id: 'gemini',
    name: 'Gemini',
    category: 'Assistant',
    planAliases: { 'basic': 'free', 'advanced': 'pro', 'business': 'team', 'enterprise': 'enterprise' },
    tiers: [
      { id: 'free', name: 'Basic', pricePerMonth: 0, billingModel: 'flat', bestForTeamSize: [1, 1], bestForUseCases: ['General'], features: ['1.5 Flash'], type: 'free' },
      { id: 'pro', name: 'Advanced', pricePerMonth: 20, billingModel: 'per_seat', bestForTeamSize: [1, 2], bestForUseCases: ['Google Workspace'], features: ['1.5 Pro'], type: 'pro' },
      { id: 'team', name: 'Business', pricePerMonth: 24, billingModel: 'per_seat', bestForTeamSize: [2, 100], bestForUseCases: ['Google Workspace'], features: ['Enterprise security'], type: 'team' },
    ],
  },
  'openai-api': {
    id: 'openai-api',
    name: 'OpenAI API',
    category: 'API',
    planAliases: { 'usage': 'usage' },
    tiers: [
      { id: 'usage', name: 'Pay-as-you-go', pricePerMonth: 1, billingModel: 'usage', bestForTeamSize: [1, 1000], bestForUseCases: ['Scaling'], features: ['GPT-4o'], type: 'pro', typicalMonthlyRange: [100, 5000] },
    ],
  },
  'anthropic-api': {
    id: 'anthropic-api',
    name: 'Anthropic API',
    category: 'API',
    planAliases: { 'usage': 'usage' },
    tiers: [
      { id: 'usage', name: 'Pay-as-you-go', pricePerMonth: 1, billingModel: 'usage', bestForTeamSize: [1, 1000], bestForUseCases: ['Scaling'], features: ['Claude 3.5'], type: 'pro', typicalMonthlyRange: [100, 5000] },
    ],
  },
};
