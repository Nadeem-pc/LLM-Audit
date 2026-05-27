# LLM Audit

LLM Audit is an AI cost optimization platform that helps startups and teams analyze their current AI tool stack, identify unnecessary spending, and receive personalized recommendations to reduce monthly costs. The platform is designed for businesses using tools like ChatGPT, Claude, Gemini, GitHub Copilot, and other AI services to improve efficiency and optimize subscriptions.

## Features

- AI-powered audit summary generation
- Personalized cost optimization recommendations
- Public shareable audit reports
- Stack comparison and savings insights
- Lead capture system
- Responsive modern UI
- Lighthouse-optimized performance
- Supabase backend integration
- Email notification integration

---

## Tech Stack

- Next.js 16
- TypeScript
- Tailwind CSS
- shadcn/ui
- Supabase
- Claude 3.5 Sonnet API
- Vercel

---

## Screenshots

### Landing Page
![Landing Page](/Users/nadeempopzz/Downloads/llm-audit/public/landingPage.png)

### Audit Flow
![Audit Flow](/Users/nadeempopzz/Downloads/llm-audit/public/auditForm.png)

### Audit Results
![Audit Results](/Users/nadeempopzz/Downloads/llm-audit/public/optimizationReport.png)
![Audit Results](/Users/nadeempopzz/Downloads/llm-audit/public/emailForm.png)

---

## Live Demo

Deployed URL:  
`https://llm-audit-one.vercel.app`

---

## Quick Start

### Clone the repository

```bash
git clone https://github.com/your-username/llm-audit.git
cd llm-audit
```

### Install dependencies

```bash
npm install
```

### Setup environment variables

Create a `.env.local` file and add:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
ANTHROPIC_API_KEY=your_anthropic_key
EMAILJS_SERVICE_ID=your_service_id
EMAILJS_TEMPLATE_ID=your_template_id
EMAILJS_PUBLIC_KEY=your_publickey_here
EMAILJS_PRIVATE_KEY=your_privatekey_here
```

### Run locally

```bash
npm run dev
```

Open:

```txt
http://localhost:3000
```

---

## Deployment

This project is deployed on Vercel.

To deploy manually:

```bash
vercel
```

Production deployment:

```bash
vercel --prod
```

---

## Decisions & Trade-offs

### 1. Claude 3.5 Sonnet instead of building custom AI logic
Used Claude API for generating audit summaries to speed up MVP development and improve output quality instead of training custom recommendation models.

### 2. Supabase over a custom backend
Chose Supabase for faster authentication and database setup, reducing backend development complexity and improving development speed.

### 3. Public shareable reports with limited private data
Separated public audit reports from sensitive lead data to improve privacy while still enabling easy report sharing.

### 4. Focused on MVP speed over advanced analytics
Prioritized shipping a polished and functional MVP quickly instead of building highly complex cost prediction systems in the initial version.

### 5. Performance optimization before launch
Spent additional time improving Lighthouse scores and frontend optimization to ensure better real-world usability and faster load times before deployment.

---

## Author

Built by Nadeem

GitHub:  
https://github.com/Nadeem-pc