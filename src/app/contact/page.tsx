"use client";

import { useState } from "react";
import { personalInfo } from "@/lib/data";
import SectionReveal from "@/components/SectionReveal";
import CharacterContact from "@/components/character/CharacterContact";

export default function Contact() {
  const [command, setCommand] = useState("");
  const [history, setHistory] = useState<{text: string, type: 'input'|'output'}[]>([
    { text: "Welcome to ReetiOS Mail Subsystem.", type: "output" },
    { text: "Type 'help' for available commands.", type: "output" }
  ]);

  const handleCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && command.trim()) {
      const input = command.trim().toLowerCase();
      const newHistory = [...history, { text: `C:\\REETI> ${command}`, type: "input" as const }];
      
      if (input === 'help') {
        newHistory.push({ text: "Commands: 'email' (get email addr), 'phone' (get phone num), 'send' (compose message), 'clear' (clear terminal)", type: "output" });
      } else if (input === 'email') {
        newHistory.push({ text: personalInfo.email, type: "output" });
      } else if (input === 'phone') {
        newHistory.push({ text: personalInfo.phone, type: "output" });
      } else if (input === 'send') {
        newHistory.push({ text: `Opening mail client to ${personalInfo.email}...`, type: "output" });
        setTimeout(() => window.location.href = `mailto:${personalInfo.email}`, 500);
      } else if (input === 'clear') {
        setHistory([]);
        setCommand("");
        return;
      } else {
        newHistory.push({ text: `Command not found: ${input}. Type 'help'.`, type: "output" });
      }
      
      setHistory(newHistory);
      setCommand("");
    }
  };

  return (
    <div className="pt-8 lg:pt-16 max-w-5xl mx-auto w-full">
      <SectionReveal>
        <h1 className="text-4xl md:text-5xl font-bold text-sage-dark mb-4 text-center">
          Let's Get in Touch.
        </h1>
        <p className="text-lg text-text-muted text-center max-w-2xl mx-auto mb-12">
          Always happy to chat about code, collaboration, or cats.
        </p>
      </SectionReveal>

      <div className="flex flex-col lg:flex-row items-stretch justify-center gap-10">
        
        {/* Left Side - Postcard & Terminal */}
        <div className="flex-1 max-w-md flex flex-col gap-6 w-full">
          
          <SectionReveal delay={0.1}>
            <div className="bg-cream-dark p-8 rounded-xl border border-sage-light/20 shadow-md relative overflow-hidden">
              <div className="absolute top-0 right-8 w-16 h-20 bg-terracotta/10 border-2 border-terracotta/20 flex items-center justify-center rounded-sm">
                <span className="text-xs text-terracotta/50 font-mono rotate-12">STAMP</span>
              </div>
              
              <h2 className="text-2xl font-bold text-sage-dark mb-6">Contact Details</h2>
              
              <div className="space-y-6">
                <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-full bg-sage/10 flex items-center justify-center text-sage group-hover:bg-sage group-hover:text-cream transition-colors">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                  </div>
                  <div>
                    <div className="text-xs text-text-muted uppercase tracking-wider font-medium mb-1">Email</div>
                    <div className="font-mono text-sm text-text-primary group-hover:text-terracotta transition-colors">{personalInfo.email}</div>
                  </div>
                </a>
                
                <a href={`tel:${personalInfo.phone}`} className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-full bg-terracotta/10 flex items-center justify-center text-terracotta group-hover:bg-terracotta group-hover:text-cream transition-colors">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                  </div>
                  <div>
                    <div className="text-xs text-text-muted uppercase tracking-wider font-medium mb-1">Phone</div>
                    <div className="font-mono text-sm text-text-primary group-hover:text-terracotta transition-colors">{personalInfo.phone}</div>
                  </div>
                </a>
              </div>
            </div>
          </SectionReveal>

          <SectionReveal delay={0.2}>
            <div className="bg-[#2d2822] rounded-xl overflow-hidden shadow-lg border border-[#3d3528]">
              <div className="bg-[#3d3528] px-4 py-2 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="ml-2 font-mono text-xs text-white/50">reetios.exe</span>
              </div>
              <div className="p-4 h-48 overflow-y-auto font-mono text-sm flex flex-col gap-2 scrollbar-thin scrollbar-thumb-white/10">
                {history.map((line, i) => (
                  <div key={i} className={line.type === 'input' ? 'text-white/70' : 'text-sage-light'}>
                    {line.text}
                  </div>
                ))}
                <div className="flex items-center text-white mt-auto">
                  <span className="text-terracotta-light mr-2">C:\REETI&gt;</span>
                  <input 
                    type="text" 
                    value={command}
                    onChange={(e) => setCommand(e.target.value)}
                    onKeyDown={handleCommand}
                    className="flex-1 bg-transparent border-none outline-none text-white focus:ring-0 p-0"
                    autoFocus
                    autoComplete="off"
                    spellCheck="false"
                  />
                </div>
              </div>
            </div>
          </SectionReveal>

        </div>

        {/* Right Side - Character */}
        <div className="flex-1 max-w-sm flex items-center justify-center">
          <SectionReveal delay={0.3} className="w-full">
            <CharacterContact />
          </SectionReveal>
        </div>
      </div>
    </div>
  );
}
