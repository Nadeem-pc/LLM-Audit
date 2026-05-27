"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Building2, UserCircle2, Users2, CheckCircle2, Loader2, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface LeadCaptureProps {
  auditData: any;
}

export function LeadCapture({ auditData }: LeadCaptureProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: "",
    companyName: "",
    role: "",
    teamSize: "",
    website_field: "" // Honeypot
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting lead form...", formData);
    setIsSubmitting(true);
    setError(null);

    try {
      const payload = {
        ...formData,
        teamSize: formData.teamSize ? parseInt(formData.teamSize) : undefined,
        auditData
      };
      console.log("Payload:", payload);

      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      console.log("Response status:", response.status);
      const result = await response.json();
      console.log("Result:", result);

      if (!response.ok) {
        throw new Error(result.error || "Submission failed");
      }

      setIsSuccess(true);
    } catch (err: any) {
      console.error("Submission error:", err);
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="mt-20 max-w-4xl mx-auto px-4">
      <AnimatePresence mode="wait">
        {!isSuccess ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <Card className="p-10 bg-slate-900/60 border-white/5 rounded-[2.5rem] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/5 blur-[100px] -z-10" />
              
              <div className="text-center mb-10">
                <h3 className="text-3xl font-bold text-white mb-4">Reclaim Your Budget.</h3>
                <p className="text-slate-400 text-lg max-w-lg mx-auto">
                  Get your full optimization report sent to your inbox plus a custom blueprint to implement these savings.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Honeypot: Hidden from real users */}
                <div className="hidden">
                  <input
                    type="text"
                    value={formData.website_field}
                    onChange={(e) => setFormData({ ...formData, website_field: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-1">Work Email</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      required
                      type="email"
                      placeholder="name@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full h-14 bg-slate-950 border border-white/10 rounded-xl pl-12 pr-4 text-white placeholder:text-slate-600 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-1">Company Name</label>
                  <div className="relative">
                    <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      type="text"
                      placeholder="Acme Inc."
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      className="w-full h-14 bg-slate-950 border border-white/10 rounded-xl pl-12 pr-4 text-white placeholder:text-slate-600 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-1">Your Role</label>
                  <div className="relative">
                    <UserCircle2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      type="text"
                      placeholder="CTO, Founder, etc."
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      className="w-full h-14 bg-slate-950 border border-white/10 rounded-xl pl-12 pr-4 text-white placeholder:text-slate-600 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-1">Total AI Users</label>
                  <div className="relative">
                    <Users2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      type="number"
                      placeholder={auditData.teamSize.toString()}
                      value={formData.teamSize}
                      onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
                      className="w-full h-14 bg-slate-950 border border-white/10 rounded-xl pl-12 pr-4 text-white placeholder:text-slate-600 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all outline-none"
                    />
                  </div>
                </div>

                <div className="md:col-span-2 pt-4">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-16 rounded-2xl brand-gradient text-white font-bold text-xl shadow-xl shadow-brand-primary/10 hover:scale-[1.02] transition-all group"
                  >
                    {isSubmitting ? (
                      <Loader2 className="w-6 h-6 animate-spin" />
                    ) : (
                      <>
                        Get Full Audit Report <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </Button>
                  
                  {error && (
                    <motion.p 
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }} 
                      className="text-red-400 text-sm mt-4 text-center font-bold"
                    >
                      {error}
                    </motion.p>
                  )}
                  
                  <p className="text-slate-500 text-xs mt-6 text-center">
                    By submitting, you agree to receive follow-up emails regarding your audit. 
                    No spam, just savings.
                  </p>
                </div>
              </form>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
          >
            <div className="w-20 h-20 rounded-3xl bg-brand-primary/10 flex items-center justify-center mx-auto mb-8 border border-brand-primary/20">
              <CheckCircle2 className="w-10 h-10 text-brand-primary" />
            </div>
            <h3 className="text-3xl font-bold text-white mb-4">Report Sent Successfully</h3>
            <p className="text-slate-400 text-xl max-w-md mx-auto">
              Check your inbox. We've sent the full breakdown and optimization plan for your team.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
