"use client";

const tools = [
  { name: "ChatGPT", logo: "GPT" },
  { name: "Claude", logo: "CL" },
  { name: "Cursor", logo: "CU" },
  { name: "Copilot", logo: "CP" },
  { name: "Gemini", logo: "GE" },
  { name: "OpenAI API", logo: "OA" },
  { name: "Anthropic API", logo: "AN" },
];

export function ToolLogos() {
  return (
    <div className="py-16 bg-slate-950/40 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-sm font-bold text-slate-500 mb-10 tracking-[0.3em] uppercase">
          Supported Platforms & APIs
        </p>
        <div className="flex flex-wrap justify-center items-center gap-10 md:gap-20 opacity-30">
           {tools.map((tool) => (
            <div key={tool.name} className="flex items-center gap-4 group cursor-default">
              <div className="w-12 h-12 rounded-xl bg-slate-900 border border-white/5 flex items-center justify-center font-bold text-slate-400 group-hover:text-white group-hover:bg-brand-primary transition-all duration-500">
                {tool.logo}
              </div>
              <span className="text-xl font-bold text-slate-400 group-hover:text-white transition-all duration-500 tracking-tighter">
                {tool.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
