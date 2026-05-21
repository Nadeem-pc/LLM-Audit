"use client";

import { motion } from "framer-motion";
import { Link2, BarChart3, Zap } from "lucide-react";

const steps = [
  {
    title: "Connect your AI stack",
    description: "Securely link your OpenAI, Anthropic, and other AI provider accounts in seconds.",
    icon: Link2,
    color: "text-blue-400",
    bg: "bg-blue-400/10",
  },
  {
    title: "Analyze spending",
    description: "Our AI engine crawls your usage patterns to identify waste and over-provisioned seats.",
    icon: BarChart3,
    color: "text-purple-400",
    bg: "bg-purple-400/10",
  },
  {
    title: "Discover savings",
    description: "Get a personalized optimization plan with recommended seat counts and API tiering.",
    icon: Zap,
    color: "text-amber-400",
    bg: "bg-amber-400/10",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">How it works</h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            From connection to optimization in under three minutes.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative p-8 rounded-2xl border border-white/5 bg-slate-900/50 hover:bg-slate-900 transition-colors"
            >
              <div className={`w-12 h-12 rounded-xl ${step.bg} ${step.color} flex items-center justify-center mb-6`}>
                <step.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">{step.title}</h3>
              <p className="text-slate-400 leading-relaxed">
                {step.description}
              </p>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 translate-y-[-50%] z-10 text-slate-800">
                  <ArrowRight className="w-8 h-8" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ArrowRight({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  );
}
