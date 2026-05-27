"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Play, Sparkles } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative pt-40 pb-24 overflow-hidden">
      {/* Optimized Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-glow opacity-40 -z-10" />
      <div className="absolute top-[-5%] right-[-5%] w-[400px] h-[400px] bg-brand-primary/5 blur-[100px] rounded-full -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out fill-mode-forwards">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 text-brand-primary text-sm font-bold mb-10 shadow-lg shadow-brand-primary/10">
            <Sparkles className="w-4 h-4" aria-hidden="true" />
            <span>Trusted by 500+ Engineering Teams</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-8 leading-[1.1] text-white">
            Slash your AI spend <br />
            <span className="text-gradient">with precision auditing.</span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto mb-12 leading-relaxed font-medium">
            LLMAUDIT gives you deep visibility into your AI infra costs.
            Connect your stack, discover waste, and save up to 40% instantly.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link href="/audit" className="w-full sm:w-auto">
              <Button size="xl" className="w-full h-16 px-10 brand-gradient text-white rounded-2xl font-bold text-lg shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:scale-[1.02] transition-all duration-300">
                Start Free Audit <ArrowRight className="ml-2 w-5 h-5" aria-hidden="true" />
              </Button>
            </Link>
            <Button size="xl" variant="ghost" className="h-16 px-10 rounded-2xl border border-white/10 glass text-white font-semibold hover:bg-white/5 transition-all">
              <Play className="mr-2 w-5 h-5 fill-current text-brand-primary" aria-hidden="true" /> Watch Demo
            </Button>
          </div>

          <div className="mt-16 flex flex-wrap items-center justify-center gap-12 opacity-30 hover:opacity-60 transition-opacity duration-500 grayscale">
            <span className="text-xl font-bold tracking-tighter text-white">BOLT</span>
            <span className="text-xl font-bold tracking-tighter text-white">TECH</span>
            <span className="text-xl font-bold tracking-tighter text-white">NOVA AI</span>
            <span className="text-xl font-bold tracking-tighter text-white">HYPERSCALE</span>
          </div>
        </div>
      </div>
    </section>
  );
}