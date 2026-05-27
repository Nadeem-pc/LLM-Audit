import { nanoid } from 'nanoid';
import { supabase } from './supabase';

export interface PublicAudit {
  id: string;
  slug: string;
  teamSize: number;
  useCase: string;
  tools: string[];
  recommendations: any[];
  monthlySpend: number;
  annualSpend: number;
  monthlySavings: number;
  annualSavings: number;
  aiSummary: string;
  createdAt?: string;
}

/**
 * Saves audit data to Supabase for public sharing.
 * Replaced local filesystem logic which was failing in production (Vercel).
 */
export async function savePublicAudit(data: Omit<PublicAudit, 'id' | 'slug' | 'createdAt'>): Promise<string> {
  const slug = nanoid(10);

  if (!supabase) {
    throw new Error("Supabase client not initialized. Check your environment variables.");
  }

  const { error } = await supabase
    .from('public_audits')
    .insert({
      slug,
      team_size: data.teamSize,
      use_case: data.useCase,
      tools: data.tools,
      recommendations: data.recommendations,
      monthly_spend: data.monthlySpend,
      annual_spend: data.annualSpend,
      monthly_savings: data.monthlySavings,
      annual_savings: data.annualSavings,
      ai_summary: data.aiSummary
    });

  if (error) {
    console.error("Supabase Save Error:", error);
    throw new Error(`Failed to save public audit: ${error.message}`);
  }

  return slug;
}

/**
 * Retrieves a public audit by its slug from Supabase.
 */
export async function getPublicAudit(slug: string): Promise<PublicAudit | null> {
  if (!supabase) return null;

  const { data, error } = await supabase
    .from('public_audits')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !data) {
    console.error("Supabase Fetch Error:", error);
    return null;
  }

  // Map database snake_case to frontend camelCase
  return {
    id: data.id,
    slug: data.slug,
    teamSize: data.team_size,
    useCase: data.use_case,
    tools: data.tools,
    recommendations: data.recommendations,
    monthlySpend: data.monthly_spend,
    annualSpend: data.annual_spend,
    monthlySavings: data.monthly_savings,
    annualSavings: data.annual_savings,
    aiSummary: data.ai_summary,
    createdAt: data.created_at
  };
}
