"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-glow -z-10 opacity-50" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-sm font-medium mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
            </span>
            New: AI Spend Benchmarking
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-gradient">
            Audit, Optimize, and <br className="hidden md:block" /> Reduce Your AI Spend.
          </h1>
          
          <p className="text-slate-400 text-lg mb-8 max-w-lg mx-auto leading-relaxed">
            We don&apos;t just show you data; we give you actionable recipes to cut costs immediately. Most teams find their first $1,000 in savings within minutes.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="h-12 px-8 bg-brand-600 hover:bg-brand-500 text-white rounded-full transition-all hover:scale-105 active:scale-95">
              Start Free Audit <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Button size="lg" variant="outline" className="h-12 px-8 rounded-full border-white/10 hover:bg-white/5 text-slate-300">
              <Play className="mr-2 w-4 h-4 fill-current" /> See Demo
            </Button>
          </div>
          
          <div className="mt-12 flex items-center justify-center gap-8 text-slate-500 text-sm italic">
            <span>&quot;Saved us $2.4k/mo&quot; — Bolt Tech</span>
            <span>&quot;Essential for AI-First teams&quot; — Nova AI</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
