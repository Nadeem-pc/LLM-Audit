import { ImageResponse } from 'next/og';
import { getPublicAudit } from "@/lib/db";

export const runtime = 'nodejs';

export async function GET(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    const audit = await getPublicAudit(slug);
    if (!audit) return new Response('Not found', { status: 404 });

    const savings = audit.annualSavings.toLocaleString();
    const monthlySpend = audit.monthlySpend.toLocaleString();
    const monthlySavings = audit.monthlySavings.toLocaleString();

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#020617', // slate-950
            backgroundImage: 'radial-gradient(circle at 50% 50%, #10b98115 0%, transparent 50%)',
            padding: '80px',
            fontFamily: 'Inter, sans-serif',
          }}
        >
          {/* Logo/Branding */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '40px' }}>
             <div style={{ width: '40px', height: '40px', backgroundColor: '#10b981', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyItems: 'center' }}>
                <span style={{ color: 'white', fontWeight: 'bold', width: '100%', textAlign: 'center' }}>✓</span>
             </div>
             <span style={{ fontSize: '32px', fontWeight: 'bold', color: 'white', letterSpacing: '-0.05em' }}>LLMAUDIT</span>
          </div>

          {/* Main Savings */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '60px' }}>
             <span style={{ fontSize: '24px', color: '#94a3b8', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px' }}>Annual Optimization Detected</span>
             <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                <span style={{ fontSize: '120px', fontWeight: '900', color: 'white', letterSpacing: '-0.05em' }}>${savings}</span>
                <span style={{ fontSize: '40px', fontWeight: 'bold', color: '#10b981' }}>/ year</span>
             </div>
          </div>

          {/* Stats Bar */}
          <div style={{ display: 'flex', gap: '40px', width: '100%', justifyContent: 'center' }}>
             <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: 'rgba(255,255,255,0.03)', padding: '24px 40px', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <span style={{ color: '#64748b', fontSize: '14px', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '4px' }}>Original Spend</span>
                <span style={{ color: 'white', fontSize: '32px', fontWeight: 'bold' }}>${monthlySpend}/mo</span>
             </div>
             <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: 'rgba(16,185,129,0.05)', padding: '24px 40px', borderRadius: '24px', border: '1px solid rgba(16,185,129,0.2)' }}>
                <span style={{ color: '#10b981', fontSize: '14px', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '4px' }}>Monthly Savings</span>
                <span style={{ color: '#10b981', fontSize: '32px', fontWeight: 'bold' }}>-${monthlySavings}/mo</span>
             </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
