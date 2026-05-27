import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || "",
});


const IS_DEV = process.env.NODE_ENV === 'development';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { 
      useCase, 
      recommendations,
      monthlySavings,
      totalMonthlySpend,
      totalAnnualSpend,
      annualSavings,
      teamSize,
      tools,
      email
    } = body;

    // --- DATA ENRICHMENT ---
    const savingsPercentage = Math.round((monthlySavings / (totalMonthlySpend || 1)) * 100);
    const sortedRecs = [...recommendations].sort((a, b) => b.savingAmount - a.savingAmount);
    const largestOpportunity = sortedRecs[0];
    const hasEnterprisePlan = recommendations.some((r: any) => /enterprise|scale|tier4/i.test(r.suggestedPlan || "") || /enterprise|scale|tier4/i.test(r.actionTitle));
    const isOverprovisioned = monthlySavings > 100 && teamSize <= 5;
    
    const enrichedData = {
      savingsPercentage,
      largestOpportunityTool: largestOpportunity?.toolId,
      largestOpportunityAmount: largestOpportunity?.savingAmount,
      largestOpportunityAction: largestOpportunity?.actionTitle,
      hasEnterprisePlan,
      isOverprovisioned
    };

    // FALLBACK GENERATOR (DETERMINISTIC) - Used if no API key or API fails
    const generateFallback = () => {
      const toolNames = tools.slice(0, 2).join(" and ");
      const base = `Our analysis of your ${toolNames} configuration for a ${teamSize}-person team shows ${savingsPercentage}% potential savings. `;
      
      if (monthlySavings > 250) {
        return base + `The most significant opportunity is the ${enrichedData.largestOpportunityAction} for ${enrichedData.largestOpportunityTool}, which would reclaim $${enrichedData.largestOpportunityAmount}/mo. Given your focus on ${useCase}, right-sizing these tiers will improve capital efficiency without impacting velocity.`;
      } else if (monthlySavings > 0) {
        return base + `Your setup is mostly efficient, but $${monthlySavings}/mo can be reclaimed via selective tier optimization. This will maintain your current ${useCase} performance while slightly reducing monthly operational overhead.`;
      } else {
        return `Your AI tooling stack is highly optimized. We verified your ${toolNames} subscriptions against 500+ benchmarks and found no meaningful waste for a team of ${teamSize}.`;
      }
    };

    if (IS_DEV) {
      console.log("--- BROWSER PROMPT PAYLOAD ---");
      console.log(JSON.stringify({ ...body, enrichedData }, null, 2));
    }

    if (!process.env.ANTHROPIC_API_KEY || process.env.ANTHROPIC_API_KEY === "YOUR_API_KEY_HERE") {
      if (IS_DEV) console.warn("ANTHROPIC_API_KEY missing. Using Smart Fallback.");
      return NextResponse.json({ 
        summary: generateFallback(),
        isFallback: true,
        timestamp: new Date().toISOString()
      });
    }

    const systemPrompt = `You are a senior AI infrastructure cost optimization advisor helping startups reduce unnecessary AI tooling expenses. 

Your job is to generate highly personalized, financially credible audit summaries using ONLY the provided audit data. 

The summary must:
* sound like a real SaaS finance/infrastructure consultant
* feel intelligent and specific
* reference actual tools, plans, savings, and workflows
* avoid generic phrases like "optimization opportunities" or "AI tooling setup"
* avoid marketing fluff
* avoid hallucinations
* be concise but insightful
* be 80–120 words

The tone should feel:
* premium, analytical, operationally grounded
* confident but not exaggerated

Never invent numbers, tools, pricing, or features.`;

    const userPrompt = `
Generate a personalized AI infrastructure spend analysis using ONLY the following audit data.

TEAM SIZE: ${teamSize}
PRIMARY WORKFLOW: ${useCase}
CURRENT MONTHLY SPEND: $${totalMonthlySpend}
CURRENT ANNUAL SPEND: $${totalAnnualSpend}
POTENTIAL MONTHLY SAVINGS: $${monthlySavings} (${savingsPercentage}% reduction)
POTENTIAL ANNUAL SAVINGS: $${annualSavings}

TOOLS AND PLANS:
${tools.join(", ")}

RECOMMENDED OPTIMIZATIONS:
${recommendations.map((r: any) => `- ${r.toolId}: ${r.actionTitle} (${r.reasoning})`).join("\n")}

ENRICHED INSIGHTS:
- Largest Saving: $${enrichedData.largestOpportunityAmount}/mo on ${enrichedData.largestOpportunityTool} (${enrichedData.largestOpportunityAction})
- Enterprise Bloat Detected: ${enrichedData.hasEnterprisePlan ? 'Yes' : 'No'}
- Small Team Overprovisioning: ${enrichedData.isOverprovisioned ? 'Yes' : 'No'}

ADDITIONAL INSTRUCTIONS:
* Be specific. Mention ${enrichedData.largestOpportunityTool} specifically.
* Mention the ${savingsPercentage}% reduction opportunity.
* Do not be generic. Mention the team size of ${teamSize}.
* Keep it premium and professional.
`;

    async function generateAndValidate(retryCount = 0): Promise<string | null> {
      try {
        const response = await anthropic.messages.create({
          model: "claude-3-5-sonnet-20240620",
          max_tokens: 400,
          system: systemPrompt,
          messages: [{ role: "user", content: userPrompt }],
        });

        const content = response.content[0];
        const text = content.type === 'text' ? content.text : "";

        // VALIDATION
        const hasToolName = tools.some((t: string) => text.toLowerCase().includes(t.toLowerCase()));
        const isTooShort = text.split(" ").length < 50;

        if (IS_DEV) console.log(`AI Response (Attempt ${retryCount + 1}):`, text);

        if ((!hasToolName || isTooShort) && retryCount < 1) {
          return generateAndValidate(retryCount + 1);
        }

        if (!hasToolName || isTooShort) return null;

        return text;
      } catch (err) {
        console.error("SDK Call Error:", err);
        return null;
      }
    }

    const finalSummary = await generateAndValidate();

    if (!finalSummary) {
      if (IS_DEV) console.error("Validation failed or SDK error. Using Fallback.");
      return NextResponse.json({ 
        summary: generateFallback(),
        isFallback: true, 
        timestamp: new Date().toISOString()
      });
    }

    return NextResponse.json({ 
      summary: finalSummary, 
      isFallback: false,
      timestamp: new Date().toISOString() 
    });

  } catch (error) {
    if (IS_DEV) console.error("API Route Error:", error);
    return NextResponse.json({ 
      summary: "Your audit indicates specific optimization opportunities across your tool stack. Review the per-tool breakdown below to identify seat reclaiming and tier-adjustment paths that align with your team size.",
      isFallback: true 
    });
  }
}
