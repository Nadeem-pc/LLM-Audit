"use client";

import { motion } from "framer-motion";
import { TrendingDown, ArrowUpRight, Cpu, Wallet, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function SavingsPreview() {
  return (
    <section className="py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-start gap-20">
          <div className="lg:w-1/3 pt-10">
            <Badge className="mb-6 px-3 py-1 bg-brand-primary/10 text-brand-primary border-brand-primary/20">
              Savings Engine
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-8 leading-tight text-white">
              Stop the bleeding. <br />
              Grow with <span className="text-brand-primary">efficiency.</span>
            </h2>
            <p className="text-slate-400 text-base mb-10 leading-relaxed font-medium">
              We analyze every token and API call to find hidden inefficiencies. 
              Our recommendations aren&apos;t just theories—they are actionable recipes for immediate savings.
            </p>
            
            <div className="space-y-6">
              {[
                { label: "Token wastage detection", icon: Cpu },
                { label: "Provider arbitrage", icon: Zap },
                { label: "Bulk commitment analysis", icon: Wallet }
              ].map((item, i) => (
                  <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-4 p-4 rounded-2xl glass border-white/5"
                >
                  <div className="p-2 rounded-lg bg-brand-primary/10 text-brand-primary">
                    <item.icon className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <span className="text-white font-semibold">{item.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
          
          <div className="lg:w-2/3 w-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 40 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative p-1 rounded-[2.5rem] bg-gradient-to-br from-white/10 via-brand-primary/20 to-transparent"
            >
              <div className="bg-[#0c111d] rounded-[2.4rem] p-8 md:p-12 shadow-3xl overflow-hidden border border-white/5">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">Audit Dashboard</h3>
                    <p className="text-slate-400 font-medium tracking-tight">Real-time spend analysis for Acme Corp</p>
                  </div>
                  <div className="flex gap-3">
                    <div className="px-4 py-2 rounded-xl bg-green-500/10 text-green-400 border border-green-500/20 text-sm font-bold animate-pulse">
                      Live Audit
                    </div>
                  </div>
                </div>

                {/* Main Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                  {[
                    { label: "MTD SPEND", value: "$34,510", trend: "+12.1%", color: "text-white" },
                    { label: "EST. SAVINGS", value: "$5,680", trend: "24.3%", color: "text-green-400" },
                    { label: "EFFICIENCY", value: "92/100", trend: "Optimal", color: "text-brand-primary" }
                  ].map((stat, i) => (
                    <div key={i} className="p-5 rounded-2xl bg-white/[0.02] border border-white/5">
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.15em] mb-3">{stat.label}</p>
                      <div className="flex items-baseline gap-2">
                        <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                        <span className="text-[10px] font-bold text-green-400">{stat.trend}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Visual Chart Placeholder */}
                <div className="relative h-64 w-full mb-12 rounded-2xl bg-gradient-to-t from-brand-primary/5 to-transparent border border-white/5 flex items-end p-8 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center opacity-10">
                     <TrendingDown className="w-48 h-48 text-brand-primary" aria-hidden="true" />
                  </div>
                  <div className="flex items-end justify-between w-full h-full gap-2 relative z-10">
                    {[40, 70, 45, 90, 65, 80, 50, 85, 60, 75, 45, 95].map((h, i) => (
                      <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        whileInView={{ height: `${h}%` }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05, duration: 1 }}
                        className="w-full bg-gradient-to-t from-brand-primary/40 to-brand-primary rounded-t-lg shadow-[0_0_15px_rgba(59,130,246,0.3)]"
                      />
                    ))}
                  </div>
                </div>

                {/* Optimizations */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="group p-5 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-brand-primary/30 transition-all cursor-pointer">
                    <div className="flex justify-between items-start mb-4">
                       <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/20">Critical</Badge>
                       <ArrowUpRight className="w-5 h-5 text-slate-600 group-hover:text-brand-primary transition-colors" />
                    </div>
                    <p className="font-bold text-white mb-1">Switch Claude 2 to Haiku</p>
                    <p className="text-sm text-slate-400 font-medium mb-3">Target: Internal Logic Chains</p>
                    <p className="text-green-400 font-bold text-lg">$1,400/mo saved</p>
                  </div>
                  
                  <div className="group p-5 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-brand-primary/30 transition-all cursor-pointer">
                    <div className="flex justify-between items-start mb-4">
                       <Badge className="bg-brand-primary/10 text-brand-primary border-brand-primary/20">Medium</Badge>
                       <ArrowUpRight className="w-5 h-5 text-slate-600 group-hover:text-brand-primary transition-colors" />
                    </div>
                    <p className="font-bold text-white mb-1">Reclaim Unused Seats</p>
                    <p className="text-sm text-slate-400 font-medium mb-3">12 Inactive Dev Accounts</p>
                    <p className="text-green-400 font-bold text-lg">$480/mo saved</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
