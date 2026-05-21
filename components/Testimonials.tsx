"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    quote: "LLMAUDIT identified $40k in annual waste within 10 minutes of connecting. It's now a mandatory part of our quarterly review.",
    author: "Marc Levinson",
    role: "VP of Engineering at Bolt Tech",
    avatar: "ML"
  },
  {
    quote: "The model-switching recommendations alone paid for the platform 10x over. The UI is exceptionally clean and intuitive.",
    author: "Sarah Chen",
    role: "Founder at Nova AI",
    avatar: "SC"
  },
  {
    quote: "Finally, a tool that speaks both finance and engineering. We've optimized our entire Anthropic stack using their insights.",
    author: "James Wilson",
    role: "CTO at HyperScale",
    avatar: "JW"
  }
];

export function Testimonials() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold">Trusted by AI-First companies.</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.author}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-3xl border border-white/5 bg-slate-900/20"
            >
              <p className="text-lg text-slate-300 italic mb-8">
                &quot;{t.quote}&quot;
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-brand-600 flex items-center justify-center font-bold text-white">
                  {t.avatar}
                </div>
                <div>
                  <p className="font-bold text-white">{t.author}</p>
                  <p className="text-sm text-slate-500">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
