import { getPublicAudit } from "@/lib/db";
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Navbar } from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AuditSummary } from "@/components/AuditSummary";
import { ComparisonCard } from "@/components/ComparisonCard";
import { Zap, ShieldCheck, ArrowRight, Share2, Link2, Send, Users } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const audit = await getPublicAudit(slug);
  if (!audit) return { title: 'Audit Not Found' };

  const savings = audit.annualSavings.toLocaleString();
  return {
    title: `Save $${savings}/year on AI tooling`,
    description: `AI Spend Audit identified major optimization opportunities for this engineering stack. View the custom report here.`,
    openGraph: {
      title: `Save $${savings}/year on AI tooling`,
      description: `AI Spend Audit identified major optimization opportunities for this engineering stack.`,
      type: 'website',
      images: [`/api/og/${slug}`],
    },
    twitter: {
      card: 'summary_large_image',
      title: `Save $${savings}/year on AI tooling`,
      description: `AI Spend Audit identified major optimization opportunities for this engineering stack.`,
      images: [`/api/og/${slug}`],
    },
  };
}

export default async function PublicAuditPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const audit = await getPublicAudit(slug);
  if (!audit) notFound();

  const comparisonItems = audit.recommendations
    .filter((r: any) => r.savingAmount > 25)
    .slice(0, 3)
    .map((r: any) => ({
      name: r.toolId.charAt(0).toUpperCase() + r.toolId.slice(1),
      currentPlan: "Current Plan",
      currentCost: r.currentSpend,
      optimizedPlan: r.suggestedPlan,
      optimizedCost: r.recommendedSpend
    }));

  return (
    <main className="min-h-screen bg-slate-950 text-white pb-32">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 pt-32">
        <div className="mb-12">
          <Badge className="bg-brand-primary/10 text-brand-primary border-brand-primary/20 mb-4 px-4 py-1">
            Verified Public Audit Report
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
            AI Optimization <span className="text-gradient">Case Study.</span>
          </h1>
          <p className="text-slate-400 text-xl max-w-2xl">
            This report was generated using CreditFlow's deterministic audit engine for a team of {audit.teamSize}.
          </p>
        </div>

        {/* Impact Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
           <Card className="lg:col-span-8 p-10 bg-slate-900/50 border-white/5 rounded-[2.5rem] relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/5 blur-[80px] -z-10" />
             <div className="flex flex-col md:flex-row justify-between gap-12 relative z-10">
                <div>
                  <p className="text-slate-500 font-bold uppercase tracking-[0.2em] text-xs mb-6">Annual Potential Savings</p>
                  <div className="flex items-baseline gap-4 mb-4">
                    <span className="text-7xl font-bold tracking-tighter text-white">${audit.annualSavings.toLocaleString()}</span>
                    <span className="text-2xl font-bold text-brand-primary">/ year</span>
                  </div>
                  <p className="text-slate-400 text-lg font-medium">
                    Optimization potential of ${audit.monthlySavings.toLocaleString()} per month detected across {audit.tools.length} tools.
                  </p>
                </div>
                <div className="flex flex-col justify-end text-right border-l border-white/5 pl-12 h-full">
                  <p className="text-slate-500 font-bold text-xs uppercase mb-2">Original Spend</p>
                  <p className="text-3xl font-bold text-white mb-6">${audit.monthlySpend.toLocaleString()}/mo</p>
                  <p className="text-emerald-500 font-bold text-xs uppercase mb-2">Optimized Spend</p>
                  <p className="text-3xl font-bold text-emerald-400">${(audit.monthlySpend - audit.monthlySavings).toLocaleString()}/mo</p>
                </div>
             </div>
           </Card>

           <Card className="lg:col-span-4 p-10 bg-brand-primary/10 border border-brand-primary/20 rounded-[2.5rem] flex flex-col justify-center items-center text-center">
             <div className="w-16 h-16 rounded-2xl bg-brand-primary flex items-center justify-center mb-6">
                <Zap className="w-8 h-8 text-white fill-current" />
             </div>
             <h3 className="text-2xl font-bold mb-4">Start Your Own</h3>
             <p className="text-slate-300 font-medium mb-6 leading-relaxed">
               Audit your team's AI spending in 60 seconds. No credit card required.
             </p>
             <Link href="/audit" className="w-full">
               <Button className="w-full h-14 rounded-xl brand-gradient text-white font-bold text-lg gap-2">
                 Audit My Team <ArrowRight className="w-5 h-5" />
               </Button>
             </Link>
           </Card>
        </div>

        {/* AI Summary Card (Read Only version or simulation) */}
        <div className="mb-12">
           <Card className="p-10 bg-slate-900/60 border-brand-primary/20 rounded-[2.5rem] relative overflow-hidden">
             <div className="absolute top-0 left-0 w-1.5 h-full bg-brand-primary" />
             <div className="flex items-center gap-3 mb-6">
               <div className="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center">
                 <ShieldCheck className="w-5 h-5 text-brand-primary" />
               </div>
               <h3 className="text-xl font-bold text-white tracking-tight">AI Advisor Analysis</h3>
             </div>
             <p className="text-slate-200 text-xl leading-relaxed font-medium italic">
               "{audit.aiSummary}"
             </p>
           </Card>
        </div>

        {/* Transformation visualization */}
        {comparisonItems.length > 0 && (
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-8">Structural Transformation</h3>
            <ComparisonCard items={comparisonItems} />
          </div>
        )}

        {/* Recommendations Grid */}
        <h3 className="text-2xl font-bold mb-8">Detailed Recommendation Breakdown</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           {audit.recommendations.map((rec: any, i: number) => (
             <Card key={i} className="p-8 bg-slate-900/40 border-white/5 rounded-3xl hover:border-brand-primary/20 transition-all">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-950 border border-white/5 flex items-center justify-center font-bold text-slate-500 uppercase">
                      {rec.toolId[0]}
                    </div>
                    <h4 className="text-xl font-bold capitalize">{rec.toolId}</h4>
                  </div>
                  {rec.savingAmount > 0 && <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 font-bold">-${rec.savingAmount}/mo</Badge>}
                </div>
                <p className="text-white font-bold mb-2">{rec.actionTitle}</p>
                <p className="text-slate-400 text-sm leading-relaxed">{rec.reasoning}</p>
             </Card>
           ))}
        </div>
      </div>
    </main>
  );
}
