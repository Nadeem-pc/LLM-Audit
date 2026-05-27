# User Interview Summaries

I spoke with 3 potential users during the build phase to validate the problem. These conversations were instrumental in shifting the product from a simple calculator to a shareable report platform.

## Interview 1: M.S.
- **Role:** Founder & CEO
- **Stage:** Seed ($2M raised), 12 employees
- **The Quote:** *"I don't even know who in my team has a ChatGPT Team vs. a personal Plus account. I just see 'OpenAI' on the corporate card 4 times a month and it’s always different amounts."*
- **Surprising Insight:** He wasn't worried about the API cost as much as the "Seat Leakage"—untracked subscriptions for developers who had already left the company.
- **Product Change:** I added the "Unused Seat Detection" logic to the audit engine specifically because of this conversation.

## Interview 2: A.K.
- **Role:** Full-stack Developer
- **Stage:** Freelance / Solopreneur
- **The Quote:** *"I tried Cursor, then Windsurf, then stayed with VS Code Copilot. I think I’m paying for all three right now and I haven’t used two of them in weeks. It's too much friction to go cancel them one by one."*
- **Surprising Insight:** He wanted a "One-click Cancel" but since I can't build that, he settled for a "Comparison Cheat Sheet" so he knew which one to prioritize.
- **Product Change:** I implemented the **Comparison Card** in the results page to show "Current vs. Optimized" in a side-by-side view.

## Interview 3: J.W.
- **Role:** Engineering Manager
- **Stage:** Series A, 45 employees
- **The Quote:** *"My CFO asked me why we are spending $4k a month on AI when 'everyone is using the free version.' I need a report I can just hand her so she stops asking."*
- **Surprising Insight:** The public audit URL was most important to him because he didn't want to explain the math—he wanted a "Third Party" to validate his spend.
- **Product Change:** This led me to prioritize the **Public Audit Page** and **Open Graph images**, making the report look like a "Verified Certificate" rather than just a web page.

---

### Key Takeaway from Interviews
The common friction wasn't the *price* of AI tools, but the **lack of ROI visibility**. Every interviewee felt like they were in an "AI Subscription arms race" and were over-subscribing just to keep up. The value of LLM Audit became "permission to cancel what you don't use."
