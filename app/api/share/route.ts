import { NextRequest, NextResponse } from "next/server";
import { savePublicAudit } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    const mSavings = body.monthlySavings ?? body.totalMonthlySavings;
    const aSavings = body.annualSavings ?? body.totalAnnualSavings;
    const mSpend = body.monthlySpend ?? body.totalMonthlySpend;
    const aSpend = body.annualSpend ?? body.totalAnnualSpend;

    // Validate required fields 
    if (!body.tools || mSavings === undefined) {
      return NextResponse.json({ 
        error: "Invalid audit data", 
        debug: { hasTools: !!body.tools, mSavings }
      }, { status: 400 });
    }

    // Strictly Pick only public fields to prevent leakage
    const publicData = {
      teamSize: body.teamSize,
      useCase: body.useCase,
      tools: body.tools,
      recommendations: body.recommendations,
      monthlySpend: mSpend,
      annualSpend: aSpend,
      monthlySavings: mSavings,
      annualSavings: aSavings,
      aiSummary: body.aiSummary || "",
    };

    const slug = await savePublicAudit(publicData);

    return NextResponse.json({ slug });
  } catch (error) {
    console.error("Failed to share audit:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
