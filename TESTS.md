# Audit Engine Testing Suite

Since this tool provides financial advice, I couldn't rely on "eye-balling" the results. I implemented a core test suite focusing on the `audit-engine` logic using Vitest.

## Core Automated Tests

### 1. `savings-calculation.test.ts`
- **Covers:** Basic math logic. Ensures `totalSpend - optimizedSpend === totalSavings`.
- **Why:** Sounds simple, but floating point issues in monthly-to-annual conversions could lead to "penny-off" errors that look unprofessional.

### 2. `redundant-seat-detection.test.ts`
- **Covers:** Logic that flags when a user has both Cursor and GitHub Copilot for the same headcount.
- **Why:** This is a high-value insight. The test ensures that if `tools` array contains `cursor` AND `copilot`, a specific recommendation is generated.

### 3. `use-case-sensitivity.test.ts`
- **Covers:** Ensures "Research" use cases trigger Claude/Perplexity prompts while "Coding" use cases prioritize Cursor/Copilot.
- **Why:** Validates that the advice isn't generic but tailored to the company's work style.

### 4. `edge-case-team-size.test.ts`
- **Covers:** Team sizes of 1 and team sizes of 10,000.
- **Why:** Ensures the coerced Zod numbers don't break with high-volume inputs or return `NaN` when team size isn't provided.

### 5. `schema-validation.test.ts`
- **Covers:** Lead form to Audit Engine data transformation.
- **Why:** Debugging the "unknown" type error in production taught me that I need to test the *interface* between the form and the logic, not just the logic itself.

---

## How to run tests

```bash
# Run all tests
npm run test

# Run Vitest in UI mode (browser)
npx vitest --ui
```

**Note on Vitest:** I chose Vitest over Jest because it's significantly faster for Next.js 16/15+ projects and requires zero config to work with the standard Vite-based testing setup.
