"use client";

import { useEffect, useState } from "react";
import { personalInfo } from "@/lib/data";

export default function Footer() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-between h-12 px-4 md:px-8 bg-sage border-t border-sage-dark/20 shadow-[0_-2px_12px_rgba(59,52,35,0.1)] text-cream">
      <div className="flex-1 hidden md:flex items-center">
        <span className="font-mono text-xs opacity-70 tracking-widest">{time}</span>
      </div>

      <div className="flex-1 flex justify-center items-center gap-4">
        <a href={personalInfo.socials.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 transition-all hover:bg-cream/10 rounded-md hover:-translate-y-0.5" aria-label="LinkedIn">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
        </a>
        <a href={personalInfo.socials.github} target="_blank" rel="noopener noreferrer" className="p-2 transition-all hover:bg-cream/10 rounded-md hover:-translate-y-0.5" aria-label="GitHub">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
        </a>
        <a href={personalInfo.socials.instagram} target="_blank" rel="noopener noreferrer" className="p-2 transition-all hover:bg-cream/10 rounded-md hover:-translate-y-0.5" aria-label="Instagram">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
        </a>
      </div>

      <div className="flex-1 flex justify-end items-center">
        <span className="font-mono text-xs opacity-60 tracking-wider">ReetiOS v2.0</span>
      </div>
    </footer>
  );
}
