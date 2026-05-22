"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck } from "lucide-react";
import Link from "next/link";

export function CallToAction() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-[3rem] p-12 md:p-20 overflow-hidden brand-gradient shadow-[0_0_60px_rgba(16,185,129,0.2)]">
          {/* Decorative rings */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/10 rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/10 rounded-full" />
          
          <div className="relative z-10 text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-bold mb-8">
              <ShieldCheck className="w-4 h-4" />
              <span>Enterprise Grade Security</span>
            </div>
            
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tight">
              Ready to reclaim your <br /> AI budget?
            </h2>
            
            <p className="text-xl text-white/90 mb-12 font-medium">
              Join the new generation of engineering teams building profitable AI infrastructure.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full">
              <Link href="/audit" className="w-full sm:w-auto">
                <Button size="xl" className="h-16 px-12 bg-white text-emerald-600 hover:bg-slate-100 rounded-2xl font-bold text-xl shadow-2xl transition-all hover:scale-105 active:scale-95 w-full">
                  Get Started Now <ArrowRight className="ml-3 w-6 h-6" />
                </Button>
              </Link>
              <Button size="xl" variant="ghost" className="h-16 px-12 text-white border border-white/20 hover:bg-white/10 rounded-2xl font-bold text-lg w-full sm:w-auto">
                Talk to Sales
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
