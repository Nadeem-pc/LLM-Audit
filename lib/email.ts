import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface AuditReportEmailProps {
  email: string;
  monthlySavings: number;
  annualSavings: number;
  aiSummary: string;
  isHighIntent: boolean;
  slug?: string;
}

export async function sendAuditConfirmationEmail({
  email,
  monthlySavings,
  annualSavings,
  aiSummary,
  isHighIntent,
  slug
}: AuditReportEmailProps) {
  try {
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const auditUrl = slug ? `${appUrl}/audit/${slug}` : appUrl;

    const { data, error } = await resend.emails.send({
      from: 'LLM Audit <onboarding@resend.dev>', // Must be onboarding@resend.dev for trial accounts
      to: 'developingpurposeonly@gmail.com',
      subject: `Your AI Spend Audit Report — $${annualSavings.toLocaleString()} Optimization Detected`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 40px; border: 1px solid #e2e8f0; border-radius: 12px;">
          <h1 style="color: #020617; font-size: 24px; margin-bottom: 24px;">Your AI Spend Optimization Report</h1>
          
          <div style="background-color: #f8fafc; padding: 24px; border-radius: 8px; margin-bottom: 32px; border-left: 4px solid #10b981;">
            <p style="color: #64748b; font-size: 14px; text-transform: uppercase; font-weight: bold; margin-bottom: 8px;">Estimated Annual Savings</p>
            <h2 style="color: #10b981; font-size: 48px; margin: 0; letter-spacing: -0.05em;">$${annualSavings.toLocaleString()}</h2>
          </div>

          <div style="margin-bottom: 32px;">
            <h3 style="color: #020617; font-size: 18px; margin-bottom: 12px;">AI Advisor Summary</h3>
            <p style="color: #475569; line-height: 1.6; font-style: italic;">"${aiSummary}"</p>
          </div>

          <div style="margin-bottom: 32px; padding-top: 24px; border-top: 1px solid #e2e8f0;">
            <p style="color: #475569; line-height: 1.6;">
              Based on our analysis, your team could recapture <strong>$${monthlySavings.toLocaleString()} per month</strong> by right-sizing your AI tool tiers and eliminating redundant seats.
            </p>
            ${isHighIntent ? `
              <div style="background-color: #ecfdf5; padding: 20px; border-radius: 8px; margin-top: 24px; border: 1px solid #10b981;">
                <p style="color: #065f46; font-weight: bold; margin-bottom: 8px;">Exclusive Offer for Your Scale</p>
                <p style="color: #064e3b; margin: 0; font-size: 14px;">
                  Your audit indicates substantial volume. <strong>Credex</strong> may be able to help reduce your infrastructure costs even further through discounted AI credits and enterprise-grade negotiation.
                </p>
              </div>
            ` : ''}
          </div>

          <a href="${auditUrl}" style="display: inline-block; background-color: #020617; color: #ffffff; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-weight: bold;">View Full Audit Again</a>
          
          <p style="color: #94a3b8; font-size: 12px; margin-top: 40px; text-align: center;">
            © ${new Date().getFullYear()} LLM Audit. All rights reserved.
          </p>
        </div>
      `,
    });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Email service error:', error);
    return null;
  }
}
