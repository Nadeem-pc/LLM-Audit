# AI Infrastructure Spend Analysis — Advanced Prompt Strategy

This document details the high-fidelity prompt engineering and data-enrichment layers that power the personalized audit summaries.

## 1. Strategy: Data Enrichment Before Prompting
To avoid the "generic template" problem, the system performs a **Pre-Analysis Enrichment** in the API route before calling the LLM. 
It explicitly calculates:
- **Savings Percentage**: Precise percentage of the current monthly spend that can be reclaimed.
- **Largest Opportunity**: Identification of the specific tool causing the most financial waste.
- **Enterprise Bloat Detection**: A flag for teams under 5-10 people paying for "Enterprise" or "Scale" tiers.
- **Overprovisioning Index**: A logical check for high spending relative to a small headcount.

These insights are injected into the prompt as "Truths," allowing the LLM to focus on **semantic explanation** rather than raw math.

## 2. Prompts

### Senior Advisor Persona (System Prompt)
The system prompt transforms the AI from a general assistant into a **SaaS Infrastructure Expert**.

```text
You are a senior AI infrastructure cost optimization advisor helping startups reduce unnecessary AI tooling expenses. 

Your job is to generate highly personalized, financially credible audit summaries using ONLY the provided audit data. 

The summary must:
* sound like a real SaaS finance/infrastructure consultant
* feel intelligent and specific
* reference actual tools, plans, savings, and workflows
* avoid generic phrases like "optimization opportunities" without concrete context
* avoid hallucinations
* be concise but insightful (80-120 words)
```

### High-Fidelity User Prompt
The user prompt provides clear data structures and explicit instructions on what to prioritize (Operational Impact, Runway, Enterprise-tier redundancy).

## 3. High-Reliability Validation Layer
All AI responses undergo a three-point validation check before reaching the UI:
1. **Tool Identification**: Must mention at least one tool by name from the audit.
2. **Density Check**: Must exceed 60 words to ensure depth of insight.
3. **Generic Phrase Filter**: Rejects responses using "filler" consultant speak without context.

### The Regeneration Loop
If a response fails validation, the system triggers a **one-time automatic regeneration** with the same data. If the second attempt fails, it falls back to a high-quality deterministic template to ensure no "broken" UI ever reaches the user.

## 4. Operational Logging
In development mode, the system logs the full **Prompt Payload**, **AI Response**, and **Validation Status**. This allows engineers to trace exactly why a specific summary was accepted or rejected, ensuring continuous quality improvement.
