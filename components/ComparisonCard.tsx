"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { ArrowRight, CheckCircle2 } from "lucide-react";

interface ComparisonItem {
  name: string;
  currentPlan: string;
  currentCost: number;
  optimizedPlan: string;
  optimizedCost: number;
}

interface BeforeAfterProps {
  items: ComparisonItem[];
}

export function ComparisonCard({ items }: BeforeAfterProps) {
  if (items.length === 0) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
      {/* Current Stack */}
      <Card className="p-8 bg-slate-900/40 border-white/5 rounded-3xl relative overflow-hidden h-full">
        <div className="absolute top-0 right-0 p-4 opacity-5">
           <span className="text-4xl font-bold uppercase tracking-tighter">Current</span>
        </div>
        <h4 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-6">Current Stack</h4>
        <div className="space-y-4">
          {items.map((item, i) => (
            <div key={i} className="flex justify-between items-center pb-4 border-b border-white/5 last:border-0 last:pb-0">
              <div>
                <p className="font-bold text-white">{item.name}</p>
                <p className="text-xs text-slate-400">{item.currentPlan}</p>
              </div>
              <p className="font-bold text-slate-300">${item.currentCost}/mo</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Optimized Stack */}
      <Card className="p-8 bg-emerald-500/5 border-emerald-500/20 rounded-3xl relative overflow-hidden h-full">
        <div className="absolute top-0 right-0 p-4 opacity-10 text-emerald-500">
           <CheckCircle2 className="w-12 h-12" />
        </div>
        <h4 className="text-sm font-bold text-emerald-500 uppercase tracking-widest mb-6">Optimized Stack</h4>
        <div className="space-y-4">
          {items.map((item, i) => (
            <div key={i} className="flex justify-between items-center pb-4 border-b border-emerald-500/10 last:border-0 last:pb-0">
              <div>
                <p className="font-bold text-white">{item.name}</p>
                <p className="text-xs text-emerald-400 font-medium">{item.optimizedPlan}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-emerald-400">${item.optimizedCost}/mo</p>
                <p className="text-[10px] text-emerald-500/60 font-bold">-{Math.round((1 - item.optimizedCost/item.currentCost) * 100)}%</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
