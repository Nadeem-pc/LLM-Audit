import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { supabase } from "@/lib/supabase";
import { sendAuditConfirmationEmail } from "@/lib/email";
import { savePublicAudit } from "@/lib/db";

// Validation schema
const leadSchema = z.object({
  email: z.string().email("Invalid email format"),
  companyName: z.string().optional(),
  role: z.string().optional(),
  teamSize: z.number().optional().default(0),
  website_field: z.string().max(0, "Bot detected").optional(),
  auditData: z.object({
    tools: z.array(z.string()).default([]),
    recommendations: z.any().optional(),
    totalMonthlySpend: z.number().optional().default(0),
    totalAnnualSpend: z.number().optional().default(0),
    totalMonthlySavings: z.number().optional().default(0),
    totalAnnualSavings: z.number().optional().default(0),
    aiSummary: z.string().optional().default("No summary generated"),
    primaryUseCase: z.string().optional()
  }).passthrough() // Allow extra fields without failing
});

export async function POST(req: NextRequest) {
  console.log("API: POST /api/leads reached");
  try {
    const body = await req.json();
    console.log("API: Body received", !!body);
    
    // Check for required environment variables
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      console.error("API: Missing Supabase configuration");
      return NextResponse.json({ error: "Supabase configuration missing on server" }, { status: 500 });
    }
    if (!process.env.RESEND_API_KEY) {
      console.error("API: Missing Resend API key");
      return NextResponse.json({ error: "Resend configuration missing on server" }, { status: 500 });
    }

    // 1. Validate with Zod
    const validation = leadSchema.safeParse(body);
    if (!validation.success) {
      // LOG PRECISE VALIDATION ERRORS
      console.error("API: Validation Details:", JSON.stringify(validation.error.format(), null, 2));
      
      const isBot = validation.error.issues.some(i => i.message === "Bot detected");
      return NextResponse.json({ 
        error: isBot ? "Bot protection triggered" : `Validation Error: ${validation.error.issues[0].path.join('.')} is ${validation.error.issues[0].message}`
      }, { status: 400 });
    }

    const { email, companyName, role, teamSize, auditData } = validation.data;
    const mSavings = auditData.totalMonthlySavings;
    const aSavings = auditData.totalAnnualSavings;
    const isHighIntent = mSavings > 500;

    // 3. Create Public Audit Record for the Email Link
    console.log("API: Generating public audit slug...");
    let shareSlug = "";
    try {
      shareSlug = await savePublicAudit({
        teamSize: teamSize || 0,
        useCase: auditData.primaryUseCase || "Mixed",
        tools: auditData.tools,
        recommendations: auditData.recommendations,
        monthlySpend: auditData.totalMonthlySpend,
        annualSpend: auditData.totalAnnualSpend,
        monthlySavings: mSavings,
        annualSavings: aSavings,
        aiSummary: auditData.aiSummary
      });
      console.log("API: Share slug generated", shareSlug);
    } catch (e) {
      console.error("API: Failed to generate public audit", e);
    }

    // 4. Store Lead in Supabase
    console.log("API: Attempting Supabase insert...");
    
    if (!supabase) {
      console.error("API: Supabase client not initialized - missing keys");
      return NextResponse.json({ error: "Database not configured on server" }, { status: 500 });
    }

    const { error: dbError } = await supabase
      .from('audit_leads')
      .insert({
        email,
        company_name: companyName,
        role,
        team_size: teamSize || 0,
        primary_use_case: auditData.primaryUseCase,
        monthly_spend: auditData.totalMonthlySpend,
        annual_spend: auditData.totalAnnualSpend,
        monthly_savings: mSavings,
        annual_savings: aSavings,
        tools: auditData.tools,
        recommendations: auditData.recommendations,
        ai_summary: auditData.aiSummary,
        high_intent: isHighIntent
      });

    if (dbError) {
      console.error("API: Supabase error", dbError);
      // We still try to send email
    } else {
      console.log("API: Supabase insert success");
    }

    // 5. Send Confirmation Email via Resend
    console.log("API: Attempting Resend email...");
    let emailSent = false;
    try {
      const emailResult = await sendAuditConfirmationEmail({
        email,
        monthlySavings: mSavings,
        annualSavings: aSavings,
        aiSummary: auditData.aiSummary,
        isHighIntent,
        slug: shareSlug
      });
      emailSent = !!emailResult;
      console.log("API: Resend result", emailSent);
    } catch (e) {
      console.error("API: Resend failed", e);
    }

    return NextResponse.json({ 
      success: true, 
      highIntent: isHighIntent,
      emailSent,
      slug: shareSlug
    });

  } catch (error: any) {
    console.error("API: Global Catch", error);
    return NextResponse.json({ 
      error: "The server encountered an error while processing your lead. Support has been notified.",
      details: error.message 
    }, { status: 500 });
  }
}
