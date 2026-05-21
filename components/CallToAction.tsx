"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export function CallToAction() {
  return (
    <section className="py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden bg-brand-600 p-12 md:p-20 text-center"
        >
          {/* Decorative circles */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-black/10 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl" />
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Start your first AI <br /> audit for free today.
            </h2>
            <p className="text-brand-100 text-lg mb-10 max-w-xl mx-auto">
              Join 500+ startups saving an average of 32% on leurs bills. No credit card required.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="xl" className="h-14 px-10 bg-white text-brand-600 hover:bg-slate-100 rounded-full font-bold transition-transform hover:scale-105">
                Get Started Now <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button size="xl" variant="ghost" className="h-14 px-10 text-white hover:bg-white/10 rounded-full font-semibold">
                Talk to Sales
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
