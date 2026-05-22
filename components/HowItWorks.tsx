"use client";

import { motion } from "framer-motion";
import { Link2, BarChart3, Zap, ArrowRight as LucideArrowRight } from "lucide-react";

const steps = [
  {
    title: "Link Account",
    description: "Securely connect your API keys or SSO in seconds with enterprise-grade encryption.",
    icon: Link2,
    number: "01",
    color: "from-blue-500 to-cyan-400"
  },
  {
    title: "Deep Analysis",
    description: "Our AI engine scans your historical usage to identify patterns, wastage, and risks.",
    icon: BarChart3,
    number: "02",
    color: "from-purple-500 to-brand-secondary"
  },
  {
    title: "Instant Savings",
    description: "Get a prioritized list of optimizations that you can apply with a single click.",
    icon: Zap,
    number: "03",
    color: "from-brand-primary to-blue-600"
  }
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-end justify-between mb-24 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
              A smarter way to <br />
              <span className="text-gradient">manage AI capital.</span>
            </h2>
            <p className="text-slate-400 text-xl font-medium leading-relaxed">
              We&apos;ve distilled years of financial auditing expertise into a transparent, three-step platform.
            </p>
          </div>
          <div className="flex items-center gap-4 text-slate-500 font-bold uppercase tracking-widest text-sm">
             <span>Efficiency First</span>
             <div className="w-12 h-px bg-slate-800" />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              className="relative group"
            >
              <div className="text-8xl font-black text-white/[0.03] absolute -top-12 -left-4 group-hover:text-brand-primary/5 transition-colors duration-500">
                {step.number}
              </div>
              
              <div className={`w-16 h-16 rounded-[1.5rem] bg-gradient-to-br ${step.color} p-[1px] mb-8 shadow-xl shadow-brand-primary/5 transition-transform group-hover:scale-110 duration-500`}>
                <div className="w-full h-full bg-[#050811] rounded-[1.4rem] flex items-center justify-center text-white">
                   <step.icon className="w-7 h-7" />
                </div>
              </div>
              
              <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-brand-primary transition-colors">
                {step.title}
              </h3>
              <p className="text-slate-300 text-lg font-medium leading-relaxed group-hover:text-white transition-colors">
                {step.description}
              </p>
              
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-[2rem] right-[-40px] text-slate-800">
                   <LucideArrowRight className="w-8 h-8 opacity-20" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
