"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { 
  TrendingDown, 
  ChevronRight, 
  ArrowLeft, 
  ShieldCheck, 
  Download,
  Share2,
  RefreshCcw,
  Zap,
  TrendingUp,
  AlertCircle
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/Navbar";
import { runAudit, ToolRecommendation as Recommendation } from "@/lib/audit-engine";
import { AuditSummary } from "@/components/AuditSummary";
import { ShareAudit } from "@/components/ShareAudit";
import { LeadCapture } from "@/components/LeadCapture";

export default function ResultsPage() {
  const router = useRouter();
  const [auditResult, setAuditResult] = useState<any>(null);
  const [auditContext, setAuditContext] = useState<any>(null);
  const [generatedAiSummary, setGeneratedAiSummary] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const data = localStorage.getItem("audit_final_data");
    if (!data) {
      router.push("/audit");
      return;
    }

    try {
      const parsed = JSON.parse(data);
      const result = runAudit(parsed.tools.map((t: any) => ({ ...t, teamSize: Number(parsed.teamSize) })));
      
      // Store raw context for AI summary
      setAuditContext({
        teamSize: Number(parsed.teamSize),
        useCase: parsed.tools[0]?.useCase || "Mixed"
      });
      
      // Simulate loading for "trust" UI effect
      setTimeout(() => {
        setAuditResult(result);
        setIsLoading(false);
      }, 1500);
    } catch (e) {
      console.error(e);
      router.push("/audit");
    }
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="mb-8"
        >
          <RefreshCcw className="w-12 h-12 text-brand-primary" />
        </motion.div>
        <p className="text-xl font-bold tracking-tight animate-pulse">Running deterministic audit engine...</p>
      </div>
    );
  }

  const { 
    recommendations, 
    totalMonthlySpend, 
    totalMonthlySavings, 
    totalAnnualSavings, 
    summary, 
    isPortfolioOptimized 
  } = auditResult;

  return (
    <main className="min-h-screen bg-slate-950 text-white pb-32">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 pt-32">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-6">
          <div>
            <Button 
              variant="ghost" 
              onClick={() => router.push("/audit")}
              className="mb-4 text-slate-400 hover:text-white p-0 h-auto gap-2"
            >
              <ArrowLeft className="w-4 h-4" /> Edit Audit
            </Button>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Optimization <span className="text-gradient">Report.</span>
            </h1>
          </div>
          
          <div className="flex gap-4">
            <Button variant="outline" className="rounded-xl border-white/10 hover:bg-white/5 gap-2 text-white">
              <Download className="w-4 h-4" /> PDF
            </Button>
            <Button className="rounded-xl brand-gradient text-white font-bold gap-2">
              <Share2 className="w-4 h-4" /> Share
            </Button>
          </div>
        </div>

        {/* Hero Impact Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          <Card className="lg:col-span-8 p-10 bg-slate-900/50 border-white/5 rounded-[2.5rem] relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/5 blur-[80px] -z-10 group-hover:bg-brand-primary/10 transition-all" />
            <div className="flex flex-col md:flex-row justify-between gap-12 relative z-10">
               <div>
                 <p className="text-slate-500 font-bold uppercase tracking-[0.2em] text-xs mb-6">Estimated Potential Savings</p>
                 <div className="flex items-baseline gap-4 mb-4">
                   <span className="text-7xl font-bold tracking-tighter text-white">${totalAnnualSavings.toLocaleString()}</span>
                   <span className="text-2xl font-bold text-brand-primary">/ year</span>
                 </div>
                 <p className="text-slate-400 text-lg font-medium max-w-lg">
                   {summary}
                 </p>
               </div>
               
               <div className="flex flex-col justify-end items-end gap-6 border-l border-white/5 md:pl-12">
                 <div className="text-right">
                   <p className="text-slate-500 font-bold text-xs uppercase mb-2">Total Monthly Spend</p>
                   <p className="text-3xl font-bold text-white">${totalMonthlySpend.toLocaleString()}</p>
                 </div>
                 <div className="text-right">
                   <p className="text-emerald-500 font-bold text-xs uppercase mb-2">Monthly Potential Savings</p>
                   <p className="text-3xl font-bold text-emerald-400">-${totalMonthlySavings.toLocaleString()}</p>
                 </div>
               </div>
            </div>
          </Card>
          
          <Card className="lg:col-span-4 p-10 bg-brand-primary/10 border border-brand-primary/20 rounded-[2.5rem] flex flex-col justify-center items-center text-center">
             <div className="w-20 h-20 rounded-3xl bg-brand-primary flex items-center justify-center mb-6 shadow-xl shadow-brand-primary/20">
                <Zap className="w-10 h-10 text-white fill-current" />
             </div>
             <h3 className="text-2xl font-bold mb-4">Instant Edge</h3>
             <p className="text-slate-300 font-medium leading-relaxed">
               Apply all optimizations today to increase your runway by <span className="text-white font-bold">12%</span> immediately.
             </p>
          </Card>
        </div>

        {/* AI Summary Card */}
        {auditResult && auditContext && (
          <AuditSummary 
            data={{
              tools: recommendations.map((r: any) => r.toolId),
              totalMonthlySpend,
              totalAnnualSpend: totalAnnualSavings + (totalMonthlySpend * 12), // Rough estimate for current annual
              monthlySavings: totalMonthlySavings,
              annualSavings: totalAnnualSavings,
              teamSize: auditContext.teamSize,
              useCase: auditContext.useCase,
              recommendations: recommendations
            }}
            onSummaryGenerated={(s) => setGeneratedAiSummary(s)}
          />
        )}

        {/* Share Section */}
        {auditResult && (
          <ShareAudit 
            auditData={{
              ...auditResult,
              teamSize: auditContext?.teamSize,
              useCase: auditContext?.useCase,
              aiSummary: generatedAiSummary || auditResult.summary,
              tools: recommendations.map((r: any) => r.toolId),
            }}
          />
        )}

        {/* Detailed Breakdown */}
        <h3 className="text-2xl font-bold mb-8">Optimization Breakdown</h3>
        <div className="space-y-6">
          {recommendations.map((rec: Recommendation, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-8 bg-slate-900/40 border-white/5 rounded-3xl hover:border-white/10 transition-all flex flex-col md:flex-row gap-10 items-start md:items-center">
                <div className="w-20 h-20 rounded-2xl bg-slate-950 flex items-center justify-center shrink-0 border border-white/5">
                   <span className="text-2xl font-bold uppercase text-slate-500">{rec.toolId[0]}</span>
                </div>
                
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <h4 className="text-2xl font-bold capitalize">{rec.toolId}</h4>
                    {rec.savingAmount > 0 ? (
                      <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 font-bold">Savings: ${rec.savingAmount.toLocaleString()}/mo</Badge>
                    ) : (
                      <Badge className="bg-slate-500/10 text-slate-400 border-slate-500/20 font-bold">Optimized</Badge>
                    )}
                    <Badge variant="outline" className={`
                      font-bold border-white/10
                      ${rec.confidence === 'high' ? 'text-emerald-500' : 
                        rec.confidence === 'medium' ? 'text-amber-400' : 'text-slate-400'}
                    `}>
                      {rec.confidence?.toUpperCase()} CONFIDENCE
                    </Badge>
                  </div>
                  <p className="text-white font-bold mb-2">{rec.actionTitle}</p>
                  <p className="text-slate-400 font-medium leading-relaxed max-w-3xl">
                    {rec.reasoning}
                  </p>
                </div>
                
                <div className="shrink-0 text-right w-full md:w-auto mt-6 md:mt-0 pt-6 md:pt-0 border-t md:border-t-0 border-white/5">
                   <p className="text-slate-500 font-bold text-xs uppercase mb-2">Impact</p>
                   <p className={`text-3xl font-bold ${rec.savingAmount > 0 ? 'text-emerald-400' : 'text-slate-500'}`}>
                     {rec.savingAmount > 0 ? `-$${rec.savingAmount.toLocaleString()}` : '$0'}
                   </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {isPortfolioOptimized && recommendations.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-20 p-12 rounded-[3rem] bg-slate-900/30 border border-dashed border-white/10 text-center"
          >
             <AlertCircle className="w-16 h-16 text-slate-600 mx-auto mb-6" />
             <h3 className="text-2xl font-bold mb-4">You&apos;re already spending efficiently.</h3>
             <p className="text-slate-400 text-lg max-w-xl mx-auto">
               We compared your stack against 500+ benchmarks and found no major waste. 
               Keep doing what you&apos;re doing.
             </p>
          </motion.div>
        )}

        {/* Lead Capture Funnel */}
        {auditResult && auditContext && (
          <LeadCapture 
            auditData={{
              ...auditResult,
              teamSize: auditContext.teamSize,
              primaryUseCase: auditContext.useCase,
              aiSummary: generatedAiSummary || auditResult.summary,
              tools: recommendations.map((r: any) => r.toolId),
            }}
          />
        )}
      </div>
    </main>
  );
}
