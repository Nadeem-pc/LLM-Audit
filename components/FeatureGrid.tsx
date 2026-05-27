"use client";

import { motion } from "framer-motion";
import { 
  BarChart3, 
  Lightbulb, 
  Users, 
  Zap, 
  Globe,
  Lock
} from "lucide-react";

const features = [
  {
    title: "Deep Usage Map",
    description: "Every dollar mapped to specific services and teams with millisecond precision.",
    icon: BarChart3,
    size: "md:col-span-8 md:row-span-1",
    delay: 0.1,
    gradient: "from-blue-500/10 to-transparent"
  },
  {
    title: "Arbitrage",
    description: "Switch models in real-time based on cost.",
    icon: Zap,
    size: "md:col-span-4 md:row-span-1",
    delay: 0.2,
    gradient: "from-amber-500/10 to-transparent"
  },
  {
    title: "Team Insights",
    description: "Detect power users and reclaim unused licenses automatically.",
    icon: Users,
    size: "md:col-span-4 md:row-span-1",
    delay: 0.3,
    gradient: "from-purple-500/10 to-transparent"
  },
  {
    title: "Secure Audit",
    description: "SOC2 compliant auditing without ever storing your model inputs or outputs.",
    icon: Lock,
    size: "md:col-span-8 md:row-span-1",
    delay: 0.4,
    gradient: "from-green-500/10 to-transparent"
  },
  {
    title: "Global Benchmarking",
    description: "See how your AI spend compares to thousands of teams in your industry.",
    icon: Globe,
    size: "md:col-span-6 md:row-span-1",
    delay: 0.5,
    gradient: "from-brand-secondary/10 to-transparent"
  },
  {
    title: "Smart Alerts",
    description: "Get notified before your budget expires with predictive burn-rate analysis.",
    icon: Lightbulb,
    size: "md:col-span-6 md:row-span-1",
    delay: 0.6,
    gradient: "from-red-500/10 to-transparent"
  }
];

export function FeatureGrid() {
  return (
    <section id="features" className="py-32 bg-slate-950/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="mb-6 inline-block p-1 rounded-2xl bg-white/5 border border-white/10"
          >
            <div className="px-4 py-1 rounded-xl bg-slate-900 text-slate-400 text-sm font-bold uppercase tracking-widest">
              Capabilities
            </div>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white tracking-tight">
            Built for <span className="text-gradient">modern infra.</span>
          </h2>
          <p className="text-slate-400 text-lg font-medium max-w-xl mx-auto leading-relaxed">
            The platform that brings financial discipline to the AI era.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[250px]">
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: feature.delay, duration: 0.6 }}
              className={`${feature.size} group relative bento-item bg-gradient-to-br ${feature.gradient} card-hover`}
            >
              <div className="relative z-10 h-full flex flex-col">
                <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-white/5 flex items-center justify-center mb-auto text-brand-primary shadow-inner">
                  <feature.icon className="w-6 h-6" />
                </div>
                
                <div>
                  <h3 className="text-xl font-bold mb-3 text-white group-hover:text-brand-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-slate-400 text-base font-medium leading-relaxed group-hover:text-white transition-colors">
                    {feature.description}
                  </p>
                </div>
              </div>
              
              {/* Decorative background element */}
              <div className="absolute top-0 right-0 p-12 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity pr-[-20px] pt-[-20px]">
                 <feature.icon className="w-40 h-40" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
