import Link from "next/link";
import { ShieldCheck, Mail, Globe, MessageSquare } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-white/5 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-16">
          <div className="col-span-2 lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6 group">
              <div className="p-1.5 bg-brand-500 rounded-lg">
                <ShieldCheck className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">LLMAUDIT</span>
            </Link>
            <p className="text-slate-500 max-w-xs mb-8 leading-relaxed">
              The professional AI spend auditing platform for developers and modern engineering teams.
            </p>
            <div className="flex items-center gap-4">
              <Link href="#" className="p-2 rounded-lg bg-slate-900 text-slate-500 hover:text-white transition-colors">
                <MessageSquare className="w-5 h-5" />
              </Link>
              <Link href="#" className="p-2 rounded-lg bg-slate-900 text-slate-500 hover:text-white transition-colors">
                <Globe className="w-5 h-5" />
              </Link>
              <Link href="#" className="p-2 rounded-lg bg-slate-900 text-slate-500 hover:text-white transition-colors">
                <Mail className="w-5 h-5" />
              </Link>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-xs">Product</h4>
            <ul className="space-y-4">
              <li><Link href="#" className="text-slate-500 hover:text-brand-400 transition-colors">Features</Link></li>
              <li><Link href="#" className="text-slate-500 hover:text-brand-400 transition-colors">Integrations</Link></li>
              <li><Link href="#" className="text-slate-500 hover:text-brand-400 transition-colors">Pricing</Link></li>
              <li><Link href="#" className="text-slate-500 hover:text-brand-400 transition-colors">API Docs</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-xs">Company</h4>
            <ul className="space-y-4">
              <li><Link href="#" className="text-slate-500 hover:text-brand-400 transition-colors">About Us</Link></li>
              <li><Link href="#" className="text-slate-500 hover:text-brand-400 transition-colors">Blog</Link></li>
              <li><Link href="#" className="text-slate-500 hover:text-brand-400 transition-colors">Careers</Link></li>
              <li><Link href="#" className="text-slate-500 hover:text-brand-400 transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-xs">Legal</h4>
            <ul className="space-y-4">
              <li><Link href="#" className="text-slate-500 hover:text-brand-400 transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="text-slate-500 hover:text-brand-400 transition-colors">Terms of Service</Link></li>
              <li><Link href="#" className="text-slate-500 hover:text-brand-400 transition-colors">Cookie Policy</Link></li>
              <li><Link href="#" className="text-slate-500 hover:text-brand-400 transition-colors">Security</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-500 text-sm">
            © 2026 LLMAUDIT Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs text-slate-500 font-medium font-mono uppercase tracking-widest">System Status: Operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
