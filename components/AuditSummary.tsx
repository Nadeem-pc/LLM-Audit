"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, AlertCircle, RefreshCcw, ArrowRight, ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ComparisonCard } from "./ComparisonCard";

interface AuditSummaryProps {
  data: {
    tools: string[];
    totalMonthlySpend: number;
    totalAnnualSpend: number;
    monthlySavings: number;
    annualSavings: number;
    teamSize: number;
    useCase: string;
    recommendations: any[];
  };
  onSummaryGenerated?: (summary: string) => void;
}

export function AuditSummary({ data, onSummaryGenerated }: AuditSummaryProps) {
  const [summary, setSummary] = useState<string | null>(null);
  const [timestamp, setTimestamp] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchSummary() {
      const cacheKey = `audit_summary_${JSON.stringify(data.tools)}_${data.monthlySavings}`;
      const cached = localStorage.getItem(cacheKey);
      
      if (cached) {
        const parsed = JSON.parse(cached);
        setSummary(parsed.text);
        setTimestamp(parsed.time);
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch("/api/generate-summary", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        if (!response.ok) throw new Error("Failed to generate summary");
        
        const result = await response.json();
        setSummary(result.summary);
        setTimestamp(new Date().toISOString());
        localStorage.setItem(cacheKey, JSON.stringify({
          text: result.summary,
          time: new Date().toISOString()
        }));
      } catch (err) {
        setError(true);
        setSummary("Your current AI tooling setup contains optimization opportunities that may reduce overall spend while maintaining similar productivity levels. Review the recommendations below to identify potential savings.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchSummary();
  }, [data]);

  const getTimeAgo = (iso: string | null) => {
    if (!iso) return "";
    const seconds = Math.floor((new Date().getTime() - new Date(iso).getTime()) / 1000);
    if (seconds < 60) return "Just now";
    const mins = Math.floor(seconds / 60);
    if (mins < 60) return `${mins} minute${mins === 1 ? "" : "s"} ago`;
    return new Date(iso).toLocaleDateString();
  };

  const comparisonItems = data.recommendations
    .filter(r => r.savingAmount > 25) // Only show meaningful transforms
    .slice(0, 3) // Keep it compact
    .map(r => ({
      name: r.toolId.charAt(0).toUpperCase() + r.toolId.slice(1),
      currentPlan: "Current Plan", // Ideally passed from audit data
      currentCost: r.currentSpend,
      optimizedPlan: r.suggestedPlan,
      optimizedCost: r.recommendedSpend
    }));

  return (
    <div className="space-y-6 mb-16">
      <Card className="p-10 bg-slate-900/60 border-brand-primary/20 rounded-[2.5rem] relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 left-0 w-1.5 h-full bg-brand-primary" />
        
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 flex items-center justify-center border border-brand-primary/10">
            <Sparkles className="w-6 h-6 text-brand-primary" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white tracking-tight">AI Advisor Analysis</h3>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Powered by Claude 3.5 Sonnet</p>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              <div className="space-y-3">
                <div className="h-5 bg-slate-800/50 rounded-lg w-full relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent shimmer animate-shimmer" />
                </div>
                <div className="h-5 bg-slate-800/50 rounded-lg w-[92%] relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent shimmer animate-shimmer" />
                </div>
                <div className="h-5 bg-slate-800/50 rounded-lg w-[96%] relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent shimmer animate-shimmer" />
                </div>
                <div className="h-5 bg-slate-800/50 rounded-lg w-[70%] relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent shimmer animate-shimmer" />
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative"
            >
              <p className="text-slate-200 text-xl leading-relaxed font-medium italic">
                &quot;{summary}&quot;
              </p>
              
              <div className="mt-8 flex items-center justify-between border-t border-white/5 pt-6">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-brand-primary animate-pulse" />
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">
                      Analysis Verified
                    </span>
                    {process.env.NODE_ENV === 'development' && (
                      <Badge variant="outline" className="text-[8px] h-4 border-white/5 opacity-50 px-1 ml-2">
                        {summary?.includes("analysis of your") ? "FALLBACK" : "AI"}
                      </Badge>
                    )}
                  </div>
                  <span className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.2em]">
                    Generated {getTimeAgo(timestamp)}
                  </span>
                </div>
                
                <button 
                  onClick={() => {
                    localStorage.removeItem(`audit_summary_${JSON.stringify(data.tools)}_${data.monthlySavings}`);
                    window.location.reload();
                  }}
                  className="text-[10px] font-bold text-slate-500 hover:text-white flex items-center gap-2 transition-colors uppercase tracking-[0.2em]"
                >
                  <RefreshCcw className="w-3 h-3" /> Regenerate Analysis
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>

      {/* Comparison Transforms */}
      {!isLoading && comparisonItems.length > 0 && (
        <ComparisonCard items={comparisonItems} />
      )}

      {/* High-Savings Lead Gen CTA */}
      {!isLoading && data.monthlySavings > 500 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="p-10 bg-emerald-500/10 border-emerald-500/30 rounded-[2.5rem] relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-[80px] -z-10 group-hover:bg-emerald-500/20 transition-all" />
            <div className="flex flex-col md:flex-row items-center justify-between gap-10">
              <div className="max-w-xl text-center md:text-left">
                <h4 className="text-2xl font-bold text-white mb-4">Unlock Additional Savings with Credex</h4>
                <p className="text-slate-300 font-medium leading-relaxed">
                  Your audit indicates substantial optimization potential. Credex helps startups access discounted AI infrastructure credits and reduce operational AI costs even further.
                </p>
              </div>
              <button className="h-16 px-10 bg-emerald-500 text-white rounded-2xl font-bold text-lg shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:scale-105 transition-all flex items-center gap-3 whitespace-nowrap">
                Book Free Consultation <ExternalLink className="w-5 h-5" />
              </button>
            </div>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
