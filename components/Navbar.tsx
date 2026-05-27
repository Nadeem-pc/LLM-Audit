"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Menu, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "py-4" : "py-6"
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`glass border border-white/5 rounded-2xl md:rounded-[2rem] px-6 md:px-10 py-3 md:py-4 transition-all duration-300 ${scrolled ? "mx-4" : "mx-0"
          }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/" className="flex items-center gap-2 group" aria-label="LLMAUDIT Home">
                <div className="p-2 bg-brand-primary rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.4)]">
                  <ShieldCheck className="w-5 h-5 text-white" aria-hidden="true" />
                </div>
                <span className="text-xl md:text-2xl font-bold tracking-tighter text-white">
                  LLMAUDIT
                </span>
              </Link>
            </div>

            <div className="hidden lg:flex items-center gap-10">
              <Link href="/#features" className="text-sm font-bold text-white hover:text-brand-primary transition-colors py-2">Platform</Link>
              <Link href="/#how-it-works" className="text-sm font-bold text-white hover:text-brand-primary transition-colors py-2">How it Works</Link>
              <Link href="/#pricing" className="text-sm font-bold text-white hover:text-brand-primary transition-colors py-2">Pricing</Link>
            </div>

            <div className="flex items-center gap-6">
              <Link href="/audit">
                <Button className="h-12 px-6 brand-gradient text-white rounded-xl font-bold shadow-lg shadow-brand-primary/20 hover:scale-105 transition-all">
                  Audit Now <ArrowRight className="ml-2 w-4 h-4" aria-hidden="true" />
                </Button>
              </Link>
              <button
                className="lg:hidden text-white p-2 hover:bg-white/10 rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-brand-primary"
                aria-label="Open navigation menu"
              >
                <Menu className="w-6 h-6" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
