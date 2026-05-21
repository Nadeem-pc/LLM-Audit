"use client";

import { motion } from "framer-motion";
import { 
  BarChart3, 
  Lightbulb, 
  Share2, 
  Users, 
  Zap, 
  ShieldCheck 
} from "lucide-react";

const features = [
  {
    title: "AI Spend Analysis",
    description: "Deep dive into every dollar spent across all your AI providers with granular usage maps.",
    icon: BarChart3,
    size: "col-span-1 md:col-span-2",
    delay: 0.1
  },
  {
    title: "Plan Optimization",
    description: "Automatically match your team's needs with the most cost-effective provider plans.",
    icon: Zap,
    size: "col-span-1",
    delay: 0.2
  },
  {
    title: "Alternative Recommendations",
    description: "Real-time benchmarking to find cheaper, performant alternatives to your current stack.",
    icon: Lightbulb,
    size: "col-span-1",
    delay: 0.3
  },
  {
    title: "Team Usage Insights",
    description: "Identify power users and under-utilized seats within your engineering organization.",
    icon: Users,
    size: "col-span-1 md:col-span-2",
    delay: 0.4
  },
  {
    title: "Shareable Reports",
    description: "Generate polished, executive-ready spend audit PDFs and dashboards in one click.",
    icon: Share2,
    size: "col-span-1",
    delay: 0.5
  },
  {
    title: "Enterprise Security",
    description: "SOC2 Type II compliant with zero data retention on your sensitive API logs.",
    icon: ShieldCheck,
    size: "col-span-1",
    delay: 0.6
  }
];

export function FeatureGrid() {
  return (
    <section id="features" className="py-24 bg-slate-950/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Precision tools for <br /> AI infrastructure.</h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Everything your finance and engineering teams need to regain control of your AI budget.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: feature.delay }}
              className={`${feature.size} group relative p-8 rounded-3xl border border-white/5 bg-slate-900/40 hover:bg-slate-900 transition-all duration-300 overflow-hidden`}
            >
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <feature.icon className="w-32 h-32" />
              </div>
              
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center mb-6 text-brand-400 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed text-sm md:text-base">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
