"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative pt-62 pb-56 overflow-hidden">
      {/* Optimized Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-glow opacity-40 -z-10" />
      <div className="absolute top-[-5%] right-[-5%] w-[400px] h-[400px] bg-brand-primary/5 blur-[100px] rounded-full -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out fill-mode-forwards">

          <h1 className="text-6xl md:text-7xl font-bold tracking-tight mb-8 leading-[1.05] text-white">
            Slash your AI spend <br />
            <span className="text-gradient">with precision auditing.</span>
          </h1>

          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
            LLMAUDIT gives you deep visibility into your AI infra costs.
            Connect your stack, discover waste, and save up to 40% instantly.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/audit" className="w-full sm:w-auto">
              <Button size="xl" className="w-full h-14 px-8 brand-gradient text-white rounded-xl font-bold text-base shadow-[0_0_30px_rgba(16,185,129,0.2)] hover:scale-[1.01] transition-all duration-300">
                Start Free Audit <ArrowRight className="ml-2 w-4 h-4" aria-hidden="true" />
              </Button>
            </Link>
            <Button size="xl" variant="ghost" className="h-14 px-8 rounded-xl border border-white/5 glass text-white font-semibold text-base hover:bg-white/5 transition-all">
              <Play className="mr-2 w-4 h-4 fill-current text-brand-primary" aria-hidden="true" /> Watch Demo
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}