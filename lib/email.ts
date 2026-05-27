interface AuditReportEmailProps {
  email: string;
  monthlySavings: number;
  annualSavings: number;
  aiSummary: string;
  isHighIntent: boolean;
  slug?: string;
}

/**
 * Sends an audit confirmation email using EmailJS REST API.
 * This is used for server-side mailing without a browser context.
 */
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

    const serviceId = process.env.EMAILJS_SERVICE_ID;
    const templateId = process.env.EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.EMAILJS_PUBLIC_KEY;
    const privateKey = process.env.EMAILJS_PRIVATE_KEY;

    if (!serviceId || !templateId || !publicKey) {
      console.error('EmailJS configuration missing');
      return null;
    }

    const cleanSummary = aiSummary.replace(/\n/g, ' ').replace(/"/g, "'");

    const templateParams = {
      to_email: email,
      to_name: email.split('@')[0],
      annual_savings: annualSavings.toLocaleString(),
      monthly_savings: monthlySavings.toLocaleString(),
      ai_summary: cleanSummary,
      audit_url: auditUrl,
      is_high_intent: isHighIntent ? "True" : "False",
      subject: `Your AI Spend Audit Report — $${annualSavings.toLocaleString()} Optimization Detected`
    };

    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        service_id: serviceId,
        template_id: templateId,
        user_id: publicKey,
        accessToken: privateKey,
        template_params: templateParams,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('EmailJS Error Response:', errorData);
      return null;
    }

    return true;
  } catch (error) {
    console.error('Email service error:', error);
    return null;
  }
}
