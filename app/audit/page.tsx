"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus, 
  Trash2, 
  ChevronRight, 
  ChevronLeft, 
  ShieldCheck, 
  Calculator,
  ArrowRight
} from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Navbar } from "@/components/Navbar";

const auditSchema = z.object({
  teamSize: z.coerce.number().min(1, "Required"),
  tools: z.array(z.object({
    toolId: z.string().min(1, "Select a tool"),
    planName: z.string().min(1, "Enter plan (e.g. Pro, Team)"),
    monthlySpend: z.coerce.number().min(0, "Invalid amount"),
    seats: z.coerce.number().min(1, "Min 1 seat"),
    useCase: z.enum(['Coding', 'Writing', 'Research', 'Data Analysis', 'Mixed']),
  })).min(1, "Add at least one tool"),
});

type AuditFormValues = z.infer<typeof auditSchema>;

const TOOLS_OPTIONS = [
  { id: 'cursor', name: 'Cursor' },
  { id: 'copilot', name: 'GitHub Copilot' },
  { id: 'claude', name: 'Claude' },
  { id: 'chatgpt', name: 'ChatGPT' },
  { id: 'anthropic-api', name: 'Anthropic API' },
  { id: 'openai-api', name: 'OpenAI API' },
  { id: 'gemini', name: 'Gemini' },
  { id: 'windsurf', name: 'Windsurf / v0' },
];

export default function AuditPage() {
  const router = useRouter();
  const [isHydrated, setIsHydrated] = useState(false);

  const form = useForm<AuditFormValues>({
    resolver: zodResolver(auditSchema),
    defaultValues: {
      teamSize: 1,
      tools: [{ toolId: "", planName: "", monthlySpend: 0, seats: 1, useCase: 'Coding' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "tools",
    control: form.control,
  });

  // Hydration and localStorage restoration
  useEffect(() => {
    const saved = localStorage.getItem("audit_form_draft");
    if (saved) {
      try {
        form.reset(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to restore form state", e);
      }
    }
    setIsHydrated(true);
  }, [form]);

  // Save changes to localStorage
  useEffect(() => {
    if (isHydrated) {
      const subscription = form.watch((value) => {
        localStorage.setItem("audit_form_draft", JSON.stringify(value));
      });
      return () => subscription.unsubscribe();
    }
  }, [form, isHydrated]);

  function onSubmit(data: AuditFormValues) {
    localStorage.setItem("audit_final_data", JSON.stringify(data));
    router.push("/results");
  }

  if (!isHydrated) return null;

  return (
    <main className="min-h-screen bg-slate-950 text-white pb-20">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 pt-32">
        <div className="mb-12">
          <div className="flex items-center gap-3 text-brand-primary mb-4 font-bold tracking-widest uppercase text-xs">
            <Calculator className="w-4 h-4" />
            <span>Audit Engine v1.0</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-white">
            Audit your <span className="text-gradient">AI spend.</span>
          </h1>
          <p className="text-slate-400 text-lg">
            Add the tools your team uses to receive an optimization report.
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Global Team Config */}
            <Card className="p-8 bg-slate-900/50 border-white/5 rounded-3xl">
              <FormField
                control={form.control}
                name="teamSize"
                render={({ field }: { field: any }) => (
                  <FormItem>
                    <FormLabel className="text-base font-bold">Total Team Size</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        {...field} 
                        className="bg-slate-950 border-white/10 h-12 text-lg rounded-xl focus:border-brand-primary/50 transition-all text-white"
                        placeholder="Total number of employees..."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </Card>

            {/* Tools Section */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold">Tools & Usage</h3>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => append({ toolId: "", planName: "", monthlySpend: 0, seats: 1, useCase: 'Coding' })}
                  className="rounded-xl border-white/10 hover:bg-white/5 gap-2 text-white"
                >
                  <Plus className="w-4 h-4" /> Add Tool
                </Button>
              </div>

              <AnimatePresence mode="popLayout">
                {fields.map((field, index) => (
                  <motion.div
                    key={field.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="relative group"
                  >
                    <Card className="p-8 bg-slate-900/40 border-white/5 rounded-3xl group-hover:border-brand-primary/20 transition-all">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Tool Selector */}
                        <FormField
                          control={form.control}
                          name={`tools.${index}.toolId` as any}
                          render={({ field }: { field: any }) => (
                            <FormItem>
                              <FormLabel className="text-xs font-bold uppercase tracking-widest text-slate-500">Tool Name</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger className="bg-slate-950 border-white/10 h-12 rounded-xl text-white">
                                    <SelectValue placeholder="Select tool" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent className="bg-slate-950 border-white/10 text-white">
                                  {TOOLS_OPTIONS.map(opt => (
                                    <SelectItem key={opt.id} value={opt.id}>{opt.name}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* Plan Name */}
                        <FormField
                          control={form.control}
                          name={`tools.${index}.planName` as any}
                          render={({ field }: { field: any }) => (
                            <FormItem>
                              <FormLabel className="text-xs font-bold uppercase tracking-widest text-slate-500">Current Plan</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="Pro / Team" className="bg-slate-950 border-white/10 h-12 rounded-xl text-white" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* Monthly Spend */}
                        <FormField
                          control={form.control}
                          name={`tools.${index}.monthlySpend` as any}
                          render={({ field }: { field: any }) => (
                            <FormItem>
                              <FormLabel className="text-xs font-bold uppercase tracking-widest text-slate-500">Monthly Spend ($)</FormLabel>
                              <FormControl>
                                <Input type="number" {...field} className="bg-slate-950 border-white/10 h-12 rounded-xl text-white" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* Seats */}
                        <FormField
                          control={form.control}
                          name={`tools.${index}.seats` as any}
                          render={({ field }: { field: any }) => (
                            <FormItem>
                              <FormLabel className="text-xs font-bold uppercase tracking-widest text-slate-500">Active Seats</FormLabel>
                              <FormControl>
                                <Input type="number" {...field} className="bg-slate-950 border-white/10 h-12 rounded-xl text-white" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* Use Case */}
                        <FormField
                          control={form.control}
                          name={`tools.${index}.useCase` as any}
                          render={({ field }: { field: any }) => (
                            <FormItem>
                              <FormLabel className="text-xs font-bold uppercase tracking-widest text-slate-500">Primary Use Case</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger className="bg-slate-950 border-white/10 h-12 rounded-xl text-white">
                                    <SelectValue placeholder="Use case" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent className="bg-slate-950 border-white/10 text-white">
                                  {['Coding', 'Writing', 'Research', 'Data Analysis', 'Mixed'].map(uc => (
                                    <SelectItem key={uc} value={uc}>{uc}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      {fields.length > 1 && (
                        <button
                          type="button"
                          onClick={() => remove(index)}
                          className="absolute -top-3 -right-3 p-2 bg-red-500/10 text-red-500 border border-red-500/20 rounded-full hover:bg-red-500 hover:text-white transition-all shadow-xl"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div className="pt-10">
              <Button type="submit" size="xl" className="w-full h-16 brand-gradient text-white rounded-2xl font-bold text-xl shadow-[0_0_40px_rgba(16,185,129,0.3)] hover:scale-[1.01] transition-all">
                Run Audit Report <ArrowRight className="ml-3 w-6 h-6" />
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </main>
  );
}
