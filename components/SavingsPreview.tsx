"use client";

import { motion } from "framer-motion";
import { TrendingDown, CheckCircle2, AlertCircle, ArrowDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function SavingsPreview() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-500/5 blur-[120px] -z-10" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Real-time savings, <br /> zero effort.</h2>
            <p className="text-slate-400 text-lg mb-8 max-w-lg leading-relaxed">
              We don&apos;t just show you data; we give you actionable recipes to cut costs immediately. Most teams find their first $1,000 in savings within minutes.
            </p>
            
            <ul className="space-y-4">
              {[
                "Automatic seat reclamation",
                "Unused API key detection",
                "Model-switching recommendations",
                "Bulk discount negotiation leaks"
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-slate-300 font-medium">
                  <CheckCircle2 className="w-5 h-5 text-brand-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="flex-1 w-full max-w-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <Card className="glass border-white/10 shadow-2xl overflow-hidden">
                <CardHeader className="bg-white/[0.02] border-b border-white/5">
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle className="text-white">Monthly Audit Report</CardTitle>
                      <CardDescription className="text-slate-500">Acme Corp • May 2026</CardDescription>
                    </div>
                    <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/20 px-3 py-1">
                      Ready to Save
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                      <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Current Spend</p>
                      <p className="text-2xl font-bold text-white">$12,450</p>
                    </div>
                    <div className="p-4 rounded-xl bg-brand-500/10 border border-brand-500/20">
                      <p className="text-xs text-brand-400 uppercase tracking-wider mb-1">Potential Savings</p>
                      <p className="text-2xl font-bold text-brand-400">-$3,820</p>
                    </div>
                  </div>
                  
                  {/* Recommendations */}
                  <div className="space-y-4">
                    <p className="text-sm font-semibold text-slate-400 uppercase tracking-wide">Top Recommendations</p>
                    
                    <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5 group hover:border-brand-500/30 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center">
                          <TrendingDown className="w-5 h-5 text-brand-400" />
                        </div>
                        <div>
                          <p className="font-semibold text-white">Consolidate ChatGPT Plus</p>
                          <p className="text-xs text-slate-500">12 unused seats detected</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-green-400">save $360</p>
                        <ArrowDown className="inline w-3 h-3 text-green-400" />
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5 group hover:border-brand-500/30 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center">
                          <AlertCircle className="w-5 h-5 text-amber-400" />
                        </div>
                        <div>
                          <p className="font-semibold text-white">Switch to Claude 3.5 Haiku</p>
                          <p className="text-xs text-slate-500">Lower cost for internal tools</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-green-400">save $2,100</p>
                        <ArrowDown className="inline w-3 h-3 text-green-400" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Floating element */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-6 -right-6 p-4 glass border-white/10 rounded-2xl shadow-2xl max-w-[180px]"
              >
                <p className="text-[10px] text-slate-500 uppercase font-bold mb-1">Efficiency Score</p>
                <div className="flex items-end gap-2">
                  <span className="text-3xl font-bold text-brand-400">94</span>
                  <span className="text-xs text-green-400 font-medium mb-1.5">+12% vs last month</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
