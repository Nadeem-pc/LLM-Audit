"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShieldCheck } from "lucide-react";

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="p-1.5 bg-brand-500 rounded-lg group-hover:bg-brand-400 transition-colors">
                <ShieldCheck className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">LLMAUDIT</span>
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link href="#features" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Features</Link>
              <Link href="#how-it-works" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">How it Works</Link>
              <Link href="#pricing" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Pricing</Link>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
              Log in
            </Link>
            <Button className="bg-brand-600 hover:bg-brand-500 text-white border-none">
              Start Free Audit
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
