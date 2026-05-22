"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    quote: "LLMAUDIT identified $40k in annual waste within 10 minutes. It's now standard in our quarterly reviews.",
    author: "Marc Levinson",
    role: "VP Eng at Bolt Tech",
    avatar: "ML"
  },
  {
    quote: "The model-switching insights alone paid for the platform 10x over. The UI is exceptionally clear.",
    author: "Sarah Chen",
    role: "CEO at Nova AI",
    avatar: "SC"
  },
  {
    quote: "Finally, a tool that speaks both finance and engineering. Our Anthropic stack is now fully optimized.",
    author: "James Wilson",
    role: "CTO at HyperScale",
    avatar: "JW"
  }
];

export function Testimonials() {
  return (
    <section className="py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
            Trusted by <span className="text-gradient">AI-first leaders.</span>
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.author}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-10 rounded-[2rem] glass border border-white/5 bg-slate-900/10 card-hover"
            >
              <p className="text-xl text-slate-300 font-medium mb-10 leading-relaxed italic">
                &quot;{t.quote}&quot;
              </p>
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-full brand-gradient flex items-center justify-center font-bold text-white text-lg shadow-lg shadow-brand-primary/20">
                  {t.avatar}
                </div>
                <div>
                  <p className="font-bold text-white text-lg">{t.author}</p>
                  <p className="text-sm text-slate-500 font-bold tracking-widest uppercase">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
