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
    <div className="py-12 border-y border-white/5 bg-slate-950/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-medium text-slate-500 mb-8 tracking-widest uppercase">
          Supported Platforms & APIs
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
          {tools.map((tool) => (
            <div key={tool.name} className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center font-bold text-slate-400 group-hover:text-white group-hover:bg-brand-600 transition-colors">
                {tool.logo}
              </div>
              <span className="font-semibold text-slate-400 group-hover:text-white transition-colors">
                {tool.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
