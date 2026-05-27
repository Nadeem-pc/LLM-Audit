import Link from "next/link";
import { ShieldCheck, Mail, Globe, MessageSquare } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#050811] border-t border-white/5 pt-32 pb-16 relative overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-brand-primary/5 blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-16 mb-24">
          <div className="col-span-2 lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-8 group">
              <div className="p-2.5 bg-brand-primary rounded-xl shadow-lg shadow-brand-primary/20">
                <ShieldCheck className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold tracking-tighter text-white">LLMAUDIT</span>
            </Link>
            <p className="text-slate-500 max-w-sm mb-10 text-lg font-medium leading-relaxed">
              The professional AI spend auditing platform for developers and modern engineering teams.
            </p>
            <div className="flex items-center gap-6">
              <Link href="#" className="p-3 rounded-xl bg-slate-900/50 border border-white/5 text-slate-500 hover:text-white hover:border-brand-primary/30 transition-all" aria-label="Join our Discord community">
                <MessageSquare className="w-5 h-5" aria-hidden="true" />
              </Link>
              <Link href="#" className="p-3 rounded-xl bg-slate-900/50 border border-white/5 text-slate-500 hover:text-white hover:border-brand-primary/30 transition-all" aria-label="Visit our global website">
                <Globe className="w-5 h-5" aria-hidden="true" />
              </Link>
              <Link href="#" className="p-3 rounded-xl bg-slate-900/50 border border-white/5 text-slate-500 hover:text-white hover:border-brand-primary/30 transition-all" aria-label="Email our support team">
                <Mail className="w-5 h-5" aria-hidden="true" />
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-white mb-8 uppercase tracking-[0.2em] text-xs">Product</h4>
            <ul className="space-y-5">
              <li><Link href="#" className="text-slate-500 hover:text-brand-primary transition-colors font-semibold">Features</Link></li>
              <li><Link href="#" className="text-slate-500 hover:text-brand-primary transition-colors font-semibold">Integrations</Link></li>
              <li><Link href="#" className="text-slate-500 hover:text-brand-primary transition-colors font-semibold">Pricing</Link></li>
              <li><Link href="#" className="text-slate-500 hover:text-brand-primary transition-colors font-semibold">Security</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-8 uppercase tracking-[0.2em] text-xs">Company</h4>
            <ul className="space-y-5">
              <li><Link href="#" className="text-slate-500 hover:text-brand-primary transition-colors font-semibold">About</Link></li>
              <li><Link href="#" className="text-slate-500 hover:text-brand-primary transition-colors font-semibold">Changelog</Link></li>
              <li><Link href="#" className="text-slate-500 hover:text-brand-primary transition-colors font-semibold">Careers</Link></li>
              <li><Link href="#" className="text-slate-500 hover:text-brand-primary transition-colors font-semibold">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-8 uppercase tracking-[0.2em] text-xs">Legal</h4>
            <ul className="space-y-5">
              <li><Link href="#" className="text-slate-500 hover:text-brand-primary transition-colors font-semibold">Privacy</Link></li>
              <li><Link href="#" className="text-slate-500 hover:text-brand-primary transition-colors font-semibold">Terms</Link></li>
              <li><Link href="#" className="text-slate-500 hover:text-brand-primary transition-colors font-semibold">Cookies</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-slate-600 text-sm font-bold tracking-tight">
            © 2026 LLMAUDIT INC. BUILT FOR THE INTELLIGENT ERA.
          </p>
        </div>
      </div>
    </footer>
  );
}
