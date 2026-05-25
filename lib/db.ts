import fs from 'fs';
import path from 'path';
import { nanoid } from 'nanoid';

const DB_PATH = path.join(process.cwd(), 'data', 'public_audits.json');

export interface PublicAudit {
  id: string;
  slug: string;
  teamSize: number;
  useCase: string;
  tools: string[];
  recommendations: any[];
  monthlySpend: number;
  annualSpend: number;
  monthlySavings: number;
  annualSavings: number;
  aiSummary: string;
  createdAt: string;
}

// Ensure DB file exists
function initDb() {
  const dir = path.dirname(DB_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(DB_PATH)) {
    fs.writeFileSync(DB_PATH, JSON.stringify([], null, 2));
  }
}

export async function savePublicAudit(data: Omit<PublicAudit, 'id' | 'slug' | 'createdAt'>): Promise<string> {
  initDb();
  const slug = nanoid(10);
  const newAudit: PublicAudit = {
    ...data,
    id: nanoid(),
    slug,
    createdAt: new Date().toISOString(),
  };

  const currentData = JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
  currentData.push(newAudit);
  fs.writeFileSync(DB_PATH, JSON.stringify(currentData, null, 2));

  return slug;
}

export async function getPublicAudit(slug: string): Promise<PublicAudit | null> {
  initDb();
  if (!fs.existsSync(DB_PATH)) return null;
  const currentData = JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
  return currentData.find((a: PublicAudit) => a.slug === slug) || null;
}
