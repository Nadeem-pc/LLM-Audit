# Prompt Strategy & Reasoning

For LLM Audit, the goal wasn't just to "use AI," but to use it where deterministic code fails: synthesis and tone. I intentionally separated the **Math** (logic-based) from the **Summary** (AI-based).

## The Strategy: Context-Injected Synthesis

We use a "System-Expert" role prompting strategy. Instead of asking the AI to "analyze this data," we perform the analysis in TypeScript first and then hand the AI a pre-computed "Truth Table."

### Why Structured Prompting?
Raw data dumps (JSON) often lead to "lazy" AI responses where the LLM just repeats the numbers. By using structured Markdown blocks in the prompt (`### Current State`, `### Projected Savings`), I force the model to focus on the *relationship* between the numbers rather than the numbers themselves.

### The Winning Prompt Pattern
```text
Role: Senior Financial Auditor & AI Infrastructure Strategist.
Context: You are reviewing an audit for a team of {teamSize}. 
Input: {preComputedSavingsTable}
Constraint: Do not hallucinate exact dollar amounts not found in the input. 
Tone: Blunt, professional, and action-oriented. No "fluff" or "hope this helps."
```

## Failures & Iterations

### 1. The "Financial Advisor" Failure
Earlier versions asked the AI to "find the best plan." This failed because the AI would hallucinate pricing changes (e.g., claiming ChatGPT reduced prices yesterday). 
**Fix:** I moved all pricing logic to a local `pricing-rules.ts` file. The AI now only *explains* the code's output.

### 2. The "Corporate Speak" Problem
Initially, the outputs sounded too much like a generic chatbot ("I recommend you consider...").
**Fix:** I added a few-shot examples of "Founder-to-Founder" style writing: short sentences, high impact, no passive voice.

## Fallback Handling
If the Anthropic API is down or the request fails, the system falls back to a deterministic template:
*"Your audit of {toolCount} tools indicates a potential {savings}% reduction in monthly burn. Access your full breakdown below."*

## Avoiding Hallucinations
A frequent risk with financial LLMs is the model rounding up numbers ($1,840 becoming "nearly $2,000"). I solved this by explicitly passing the `finalAnnualSavings` string already formatted by the frontend, instructing the model to use that exact string or nothing at all.
