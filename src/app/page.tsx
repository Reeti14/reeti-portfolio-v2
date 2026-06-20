import Link from "next/link";
import { personalInfo } from "@/lib/data";
import SectionReveal from "@/components/SectionReveal";
import CharacterHome from "@/components/character/CharacterHome";

export default function Home() {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8 pt-8 lg:pt-20">
      
      {/* Left side text content */}
      <div className="flex-1 max-w-xl flex flex-col gap-6">
        <SectionReveal delay={0.1}>
          <div className="inline-block px-3 py-1 mb-2 border border-terracotta/30 bg-terracotta/10 text-terracotta font-mono text-xs rounded-full">
            C:\REETI\status &gt; online
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary tracking-tight leading-[1.1]">
            hi, i'm <span className="text-terracotta relative inline-block">
              Reeti
              <span className="absolute bottom-1 left-0 w-full h-2 bg-terracotta-light/40 -z-10 rounded-sm"></span>
            </span>
          </h1>
        </SectionReveal>

        <SectionReveal delay={0.2}>
          <h2 className="text-xl md:text-2xl text-sage-dark font-medium leading-relaxed">
            {personalInfo.tagline}
          </h2>
        </SectionReveal>

        <SectionReveal delay={0.3}>
          <p className="text-base text-text-muted leading-relaxed border-l-2 border-sage-light/40 pl-4 bg-sage-light/5 py-2">
            {personalInfo.shortBio}
          </p>
        </SectionReveal>

        <SectionReveal delay={0.4} className="mt-4">
          <div className="grid grid-cols-2 gap-4">
            <Link href="/experience" className="group flex items-center p-4 bg-cream-dark border border-sage-light/20 rounded-xl hover:bg-sage hover:text-cream hover:border-sage transition-all shadow-sm hover:shadow-md">
              <span className="font-mono text-sm group-hover:tracking-wider transition-all">./experience</span>
              <svg className="ml-auto w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
            <Link href="/projects" className="group flex items-center p-4 bg-cream-dark border border-sage-light/20 rounded-xl hover:bg-terracotta hover:text-cream hover:border-terracotta transition-all shadow-sm hover:shadow-md">
              <span className="font-mono text-sm group-hover:tracking-wider transition-all">./projects</span>
              <svg className="ml-auto w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
            <Link href="/open-source" className="group flex items-center p-4 bg-cream-dark border border-sage-light/20 rounded-xl hover:bg-[#60a5fa] hover:text-white hover:border-[#60a5fa] transition-all shadow-sm hover:shadow-md">
              <span className="font-mono text-sm group-hover:tracking-wider transition-all">./open-source</span>
              <svg className="ml-auto w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
            <Link href="/contact" className="group flex items-center p-4 bg-cream-dark border border-sage-light/20 rounded-xl hover:bg-warm-brown hover:text-cream hover:border-warm-brown transition-all shadow-sm hover:shadow-md">
              <span className="font-mono text-sm group-hover:tracking-wider transition-all">./contact</span>
              <svg className="ml-auto w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </div>
        </SectionReveal>
      </div>

      {/* Right side character illustration */}
      <div className="flex-1 w-full max-w-lg">
        <SectionReveal delay={0.5}>
          <CharacterHome />
        </SectionReveal>
      </div>
      
    </div>
  );
}
