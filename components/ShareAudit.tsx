"use client";

import { useState } from "react";
import { Copy, Check, Link2, Share2, Loader2, Send, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";

interface ShareAuditProps {
  auditData: any;
}

export function ShareAudit({ auditData }: ShareAuditProps) {
  const [slug, setSlug] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const generateLink = async () => {
    if (slug) return;
    setIsGenerating(true);
    try {
      const res = await fetch("/api/share", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(auditData),
      });
      const data = await res.json();
      setSlug(data.slug);
    } catch (e) {
      console.error("Sharing failed", e);
    } finally {
      setIsGenerating(false);
    }
  };

  const fullUrl = typeof window !== "undefined" ? `${window.location.origin}/audit/${slug}` : "";

  const handleCopy = () => {
    navigator.clipboard.writeText(fullUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareTwitter = () => {
    const annualSavings = auditData.annualSavings ?? auditData.totalAnnualSavings ?? 0;
    const text = `I just saved $${annualSavings.toLocaleString()}/year on LLM Audit! Check my audit:`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(fullUrl)}`, "_blank");
  };

  const shareLinkedIn = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(fullUrl)}`, "_blank");
  };

  return (
    <Card className="p-10 bg-slate-900/50 border-white/5 rounded-[2.5rem] relative overflow-hidden mb-12">
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
        <div className="max-w-md text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary text-xs font-bold mb-4">
            <Share2 className="w-3 h-3" /> Viral Share Loop
          </div>
          <h3 className="text-2xl font-bold text-white mb-4">Share Your Results</h3>
          <p className="text-slate-400 font-medium leading-relaxed">
            Generate a public link to share your savings with your team or on social media. All private company data is stripped from the public version.
          </p>
        </div>

        <div className="w-full md:w-auto flex flex-col items-center gap-4">
          <AnimatePresence mode="wait">
            {!slug ? (
              <motion.div
                key="generate"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
              >
                <Button
                  onClick={generateLink}
                  disabled={isGenerating}
                  size="lg"
                  className="h-16 px-10 rounded-2xl brand-gradient text-white font-bold text-lg min-w-[240px] shadow-xl hover:scale-105 transition-all"
                >
                  {isGenerating ? (
                    <Loader2 className="w-6 h-6 animate-spin mr-2" />
                  ) : (
                    <Link2 className="w-6 h-6 mr-2" />
                  )}
                  {isGenerating ? "Generating..." : "Generate Share Link"}
                </Button>
              </motion.div>
            ) : (
              <motion.div
                key="links"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center gap-4 w-full"
              >
                <div className="flex items-center gap-2 w-full p-2 bg-slate-950 border border-white/10 rounded-xl">
                  <div className="px-4 py-2 text-xs font-mono text-slate-500 truncate max-w-[200px]">
                    {fullUrl}
                  </div>
                  <Button
                    size="sm"
                    onClick={handleCopy}
                    className="ml-auto bg-white text-slate-900 hover:bg-slate-200 rounded-lg h-10 px-4 font-bold"
                  >
                    {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                    {copied ? "Copied" : "Copy"}
                  </Button>
                </div>

                <div className="flex gap-4 w-full">
                  <Button
                    onClick={shareLinkedIn}
                    variant="outline"
                    className="flex-1 h-14 border-white/10 hover:bg-white/5 rounded-xl text-white font-bold gap-2"
                  >
                    <Users className="w-5 h-5 fill-current text-[#0A66C2]" /> Share
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Card>
  );
}
