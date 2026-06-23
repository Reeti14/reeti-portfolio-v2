"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { personalInfo, experiences, projects, openSourceData } from "@/lib/data";
import SectionReveal from "@/components/SectionReveal";
import CharacterHome from "@/components/character/CharacterHome";
import CharacterExperience from "@/components/character/CharacterExperience";
import CharacterProjects from "@/components/character/CharacterProjects";
import CharacterOpenSource from "@/components/character/CharacterOpenSource";
import CharacterContact from "@/components/character/CharacterContact";
import ExperienceCard from "@/components/ui/ExperienceCard";
import ProjectCard from "@/components/ui/ProjectCard";
import StatBadge from "@/components/ui/StatBadge";

export default function Home() {
  const [command, setCommand] = useState("");
  const [history, setHistory] = useState<{text: string, type: 'input'|'output'}[]>([]);
  const [isTyping, setIsTyping] = useState(true);
  const terminalRef = useRef<HTMLDivElement>(null);

  // Parallax effects
  const { scrollY } = useScroll();
  const smoothScrollY = useSpring(scrollY, { damping: 20, stiffness: 100 });
  const heroTextY = useTransform(smoothScrollY, [0, 1000], [0, -200]);
  const heroImageY = useTransform(smoothScrollY, [0, 1000], [0, 150]);
  const heroOpacity = useTransform(smoothScrollY, [0, 500], [1, 0]);

  // Typewriter effect for terminal welcome message
  useEffect(() => {
    const lines = [
      "Welcome to ReetiOS Mail Subsystem.",
      "Type 'help' for available commands.",
    ];
    let lineIndex = 0;
    let charIndex = 0;
    let currentText = "";
    const tempHistory: {text: string, type: 'input'|'output'}[] = [];

    const typeInterval = setInterval(() => {
      if (lineIndex >= lines.length) {
        clearInterval(typeInterval);
        setIsTyping(false);
        return;
      }

      currentText = lines[lineIndex].substring(0, charIndex + 1);
      const newHistory = [...tempHistory];
      // Update the current line being typed
      if (newHistory.length > lineIndex) {
        newHistory[lineIndex] = { text: currentText, type: "output" };
      } else {
        newHistory.push({ text: currentText, type: "output" });
      }
      setHistory([...newHistory]);

      charIndex++;
      if (charIndex >= lines[lineIndex].length) {
        tempHistory.push({ text: lines[lineIndex], type: "output" });
        lineIndex++;
        charIndex = 0;
      }
    }, 35);

    return () => clearInterval(typeInterval);
  }, []);

  // Auto-scroll terminal to bottom on new output
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && command.trim()) {
      const input = command.trim().toLowerCase();
      const newHistory = [...history, { text: `C:\\REETI> ${command}`, type: "input" as const }];
      
      if (input === 'help') {
        newHistory.push({ text: "Commands: 'email' | 'phone' | 'send' | 'clear'", type: "output" });
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
    <div className="flex flex-col">
      {/* ============================== */}
      {/* SECTION 1: HOME / HERO */}
      {/* ============================== */}
      <section id="home" className="min-h-[calc(100vh-8rem)] flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8 pt-8 lg:pt-20">
        <motion.div className="flex-1 max-w-xl flex flex-col gap-6" style={{ y: heroTextY, opacity: heroOpacity }}>
          <SectionReveal delay={0.1}>
            <div className="inline-block px-3 py-1 mb-2 border border-terracotta/30 bg-terracotta/10 text-terracotta font-mono text-xs rounded-full">
              C:\REETI\status &gt; online
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary tracking-tight leading-[1.1]">
              hi, i&apos;m <span className="text-terracotta relative inline-block">
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
            <p className="text-base text-text-muted leading-relaxed border-l-2 border-sage-light/40 pl-4 glass py-3 px-4 rounded-r-lg">
              {personalInfo.shortBio}
            </p>
          </SectionReveal>

          <SectionReveal delay={0.4} className="mt-4">
            <div className="grid grid-cols-2 gap-4">
              <button onClick={() => document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })} className="group flex items-center p-4 glass rounded-xl hover:bg-sage hover:text-cream transition-all shadow-sm hover:shadow-md btn-3d cursor-pointer">
                <span className="font-mono text-sm group-hover:tracking-wider transition-all">./experience</span>
                <svg className="ml-auto w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
              <button onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })} className="group flex items-center p-4 glass rounded-xl hover:bg-terracotta hover:text-cream transition-all shadow-sm hover:shadow-md btn-3d cursor-pointer">
                <span className="font-mono text-sm group-hover:tracking-wider transition-all">./projects</span>
                <svg className="ml-auto w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
              <button onClick={() => document.getElementById('open-source')?.scrollIntoView({ behavior: 'smooth' })} className="group flex items-center p-4 glass rounded-xl hover:bg-[#60a5fa] hover:text-white transition-all shadow-sm hover:shadow-md btn-3d cursor-pointer">
                <span className="font-mono text-sm group-hover:tracking-wider transition-all">./open-source</span>
                <svg className="ml-auto w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
              <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="group flex items-center p-4 glass rounded-xl hover:bg-warm-brown hover:text-cream transition-all shadow-sm hover:shadow-md btn-3d cursor-pointer">
                <span className="font-mono text-sm group-hover:tracking-wider transition-all">./contact</span>
                <svg className="ml-auto w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
            </div>
          </SectionReveal>
        </motion.div>
        <motion.div className="flex-1 w-full max-w-lg" style={{ y: heroImageY, opacity: heroOpacity }}>
          <SectionReveal delay={0.5}>
            <CharacterHome />
          </SectionReveal>
        </motion.div>
      </section>

      <div className="section-divider my-8" />

      {/* ============================== */}
      {/* SECTION 2: EXPERIENCE */}
      {/* ============================== */}
      <section id="experience" className="py-16 lg:py-24">
        <div className="flex flex-col lg:flex-row items-center gap-10 mb-20">
          <div className="flex-1">
            <SectionReveal>
              <h2 className="text-4xl md:text-5xl font-bold text-sage-dark mb-4">
                My Journey.
              </h2>
              <p className="text-lg text-text-muted leading-relaxed">
                I&apos;ve had the opportunity to tackle complex problems across different domains—from digitizing historical texts to automating warehouse logistics. Here&apos;s how I approached them.
              </p>
            </SectionReveal>
          </div>
          <div className="w-full max-w-sm">
            <SectionReveal delay={0.2}>
              <CharacterExperience />
            </SectionReveal>
          </div>
        </div>

        <div className="relative mt-12 w-full max-w-5xl mx-auto">
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-sage-light/30" />
          <div className="flex flex-col w-full relative z-10">
            {experiences.map((exp, index) => (
              <ExperienceCard key={exp.id} experience={exp} index={index} />
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider my-8" />

      {/* ============================== */}
      {/* SECTION 3: PROJECTS */}
      {/* ============================== */}
      <section id="projects" className="py-16 lg:py-24">
        <div className="flex flex-col lg:flex-row items-center gap-10 mb-16">
          <div className="w-full max-w-sm order-2 lg:order-1">
            <SectionReveal delay={0.2}>
              <CharacterProjects />
            </SectionReveal>
          </div>
          <div className="flex-1 order-1 lg:order-2">
            <SectionReveal>
              <h2 className="text-4xl md:text-5xl font-bold text-sage-dark mb-4">
                My Work.
              </h2>
              <p className="text-lg text-text-muted leading-relaxed">
                A collection of systems I&apos;ve built, ranging from real-time logistics dashboards to machine learning models for agricultural disease detection.
              </p>
            </SectionReveal>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
          {projects.map((project, index) => (
            <SectionReveal key={project.id} delay={0.1 * index}>
              <ProjectCard project={project} />
            </SectionReveal>
          ))}
        </div>
      </section>

      <div className="section-divider my-8" />

      {/* ============================== */}
      {/* SECTION 4: OPEN SOURCE */}
      {/* ============================== */}
      <section id="open-source" className="py-16 lg:py-24">
        <div className="flex flex-col lg:flex-row items-center gap-10 mb-16">
          <div className="flex-1">
            <SectionReveal>
              <h2 className="text-4xl md:text-5xl font-bold text-sage-dark mb-6">
                Open Source & Community.
              </h2>
              <div className="p-6 glass border-l-4 border-terracotta rounded-r-xl shadow-sm">
                <p className="text-lg text-text-muted italic leading-relaxed">
                  &quot;{openSourceData.quote}&quot;
                </p>
              </div>
            </SectionReveal>
          </div>
          <div className="w-full max-w-sm">
            <SectionReveal delay={0.2}>
              <CharacterOpenSource />
            </SectionReveal>
          </div>
        </div>

        {/* Stats */}
        <SectionReveal delay={0.3}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            {openSourceData.stats.map((stat, index) => (
              <StatBadge key={index} label={stat.label} value={stat.value} suffix={stat.suffix} />
            ))}
          </div>
        </SectionReveal>

        {/* Highlights */}
        <SectionReveal delay={0.35}>
          <div className="mb-16 p-6 glass rounded-xl border-l-4 border-sage">
            <h3 className="text-lg font-bold text-sage-dark mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-terracotta" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              Key Highlights
            </h3>
            <ul className="space-y-3">
              {openSourceData.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-text-muted leading-relaxed">
                  <span className="mt-1.5 w-2 h-2 rounded-full bg-terracotta flex-shrink-0" />
                  {h}
                </li>
              ))}
            </ul>
          </div>
        </SectionReveal>

        {/* Wikimedia Handles */}
        <SectionReveal delay={0.4}>
          <div className="mb-16">
            <h3 className="text-xl font-bold text-sage-dark mb-6">Open Source Profiles</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {openSourceData.handles.map((handle) => (
                <a
                  key={handle.name}
                  href={handle.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 p-5 glass rounded-xl hover:shadow-lg transition-all duration-300 btn-3d glow-border"
                >
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-sage/10 flex items-center justify-center group-hover:bg-sage group-hover:text-cream transition-colors duration-300 flex-shrink-0">
                    {handle.icon === "wikimedia" && (
                      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M12.003 2C6.478 2 2 6.478 2 12.003S6.478 22.006 12.003 22.006 22.006 17.528 22.006 12.003 17.528 2 12.003 2zm.6 3.6l2.4 6.6h-4.8l2.4-6.6zm-3.6 0L6.3 12.6H3.9l5.1-7zm7.2 0l5.1 7H18.9l-2.7-7zM3.3 13.8h3l1.5 4.8-4.5-4.8zm14.4 0h3l-4.5 4.8 1.5-4.8zM9.3 13.8h5.4l-2.7 5.4-2.7-5.4z"/></svg>
                    )}
                    {handle.icon === "phabricator" && (
                      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6" fill="white"/><circle cx="12" cy="12" r="3" fill="currentColor"/></svg>
                    )}
                    {handle.icon === "gerrit" && (
                      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15l-5-5 1.41-1.41L11 14.17l7.59-7.59L20 8l-9 9z"/></svg>
                    )}
                  </div>
                  <div>
                    <div className="font-bold text-sage-dark group-hover:text-terracotta transition-colors">{handle.name}</div>
                    <div className="text-xs text-text-muted font-mono">View Profile →</div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </SectionReveal>

        {/* Two Column Content */}
        <div className="grid md:grid-cols-2 gap-10">
          <SectionReveal delay={0.45}>
            <h3 className="text-2xl font-bold text-sage-dark mb-6">Building the Free Knowledge Ecosystem</h3>
            <div className="prose prose-sage space-y-4 text-text-muted leading-relaxed text-sm">
              <p>
                My heart lies in the open-source world, particularly within the Wikimedia Foundation&apos;s MediaWiki ecosystem. I regularly contribute technical code, track bugs via Phabricator, and submit patch sets through Gerrit.
              </p>
              <p>
                I am incredibly proud to have 8 of my 10 tasks successfully merged, maintaining an 88% patch acceptance rate across repositories that serve millions of Wikipedia users globally. Beyond writing code, I authored internationalization (i18n) technical documentation that was merged into MediaWiki core and formally cited in the FY25-26 Wikimedia Language Usability Annual Summary.
              </p>
              <p>
                But the most rewarding part of this ecosystem isn&apos;t just the code—it&apos;s mentoring new contributors and helping them navigate their first open-source commits.
              </p>
            </div>
          </SectionReveal>

          <SectionReveal delay={0.5}>
            <h3 className="text-2xl font-bold text-sage-dark mb-6">Grassroots Leadership</h3>
            <SectionReveal stagger staggerDelay={0.1} className="space-y-4">
              {openSourceData.roles.map((role, index) => {
                const isGDG = role.org.includes("GDG");
                return (
                  <div key={index} className={`p-4 rounded-xl border transition-all hover:shadow-md cursor-pointer ${isGDG ? 'glass border-[#4285F4]/20 shadow-[0_2px_10px_rgba(66,133,244,0.08)]' : 'glass border-sage-light/20'}`}>
                    <div className="flex justify-between items-baseline mb-2">
                      <h4 className="font-bold text-text-primary">{role.title}</h4>
                      <span className={`text-sm font-medium ${isGDG ? 'text-[#EA4335]' : 'text-terracotta'}`}>{role.org}</span>
                    </div>
                    <p className="text-sm text-text-muted leading-relaxed">{role.desc}</p>
                  </div>
                );
              })}
            </SectionReveal>
          </SectionReveal>
        </div>
      </section>

      <div className="section-divider my-8" />

      {/* ============================== */}
      {/* SECTION 5: CONTACT */}
      {/* ============================== */}
      <section id="contact" className="py-16 lg:py-24">
        <SectionReveal>
          <h2 className="text-4xl md:text-5xl font-bold text-sage-dark mb-4 text-center">
            Let&apos;s Get in Touch.
          </h2>
          <p className="text-lg text-text-muted text-center max-w-2xl mx-auto mb-12">
            Always happy to chat about code, collaboration, or cats.
          </p>
        </SectionReveal>

        <div className="flex flex-col lg:flex-row items-stretch justify-center gap-10">
          
          <div className="flex-1 max-w-md flex flex-col gap-6 w-full">
            
            {/* Contact Card */}
            <SectionReveal delay={0.1}>
              <div className="glass p-8 rounded-xl shadow-md relative overflow-hidden glow-border">
                <div className="absolute top-0 right-8 w-16 h-20 bg-terracotta/10 border-2 border-terracotta/20 flex items-center justify-center rounded-sm">
                  <span className="text-xs text-terracotta/50 font-mono rotate-12">STAMP</span>
                </div>
                
                <h3 className="text-2xl font-bold text-sage-dark mb-6">Contact Details</h3>
                
                <div className="space-y-6">
                  <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-4 group">
                    <div className="w-10 h-10 rounded-full bg-sage/10 flex items-center justify-center text-sage group-hover:bg-sage group-hover:text-cream transition-colors btn-3d">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                    </div>
                    <div>
                      <div className="text-xs text-text-muted uppercase tracking-wider font-medium mb-1">Email</div>
                      <div className="font-mono text-sm text-text-primary group-hover:text-terracotta transition-colors">{personalInfo.email}</div>
                    </div>
                  </a>
                  
                  <a href={`tel:${personalInfo.phone}`} className="flex items-center gap-4 group">
                    <div className="w-10 h-10 rounded-full bg-terracotta/10 flex items-center justify-center text-terracotta group-hover:bg-terracotta group-hover:text-cream transition-colors btn-3d">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                    </div>
                    <div>
                      <div className="text-xs text-text-muted uppercase tracking-wider font-medium mb-1">Phone</div>
                      <div className="font-mono text-sm text-text-primary group-hover:text-terracotta transition-colors">{personalInfo.phone}</div>
                    </div>
                  </a>
                </div>

                {/* Social Links */}
                <div className="mt-8 pt-6 border-t border-sage-light/15">
                  <div className="text-xs text-text-muted uppercase tracking-wider font-medium mb-4">Find me on</div>
                  <div className="flex flex-wrap gap-3">
                    <a href={personalInfo.socials.linkedin} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-sage/10 text-sage hover:bg-sage hover:text-cream transition-all btn-3d" aria-label="LinkedIn">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                    </a>
                    <a href={personalInfo.socials.github} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-sage/10 text-sage hover:bg-sage hover:text-cream transition-all btn-3d" aria-label="GitHub">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                    </a>
                    <a href={personalInfo.socials.instagram} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-sage/10 text-sage hover:bg-sage hover:text-cream transition-all btn-3d" aria-label="Instagram">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                    </a>
                    <a href={personalInfo.socials.wikimedia} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-sage/10 text-sage hover:bg-sage hover:text-cream transition-all btn-3d" aria-label="Wikimedia">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12.003 2C6.478 2 2 6.478 2 12.003S6.478 22.006 12.003 22.006 22.006 17.528 22.006 12.003 17.528 2 12.003 2zm.6 3.6l2.4 6.6h-4.8l2.4-6.6zm-3.6 0L6.3 12.6H3.9l5.1-7zm7.2 0l5.1 7H18.9l-2.7-7zM3.3 13.8h3l1.5 4.8-4.5-4.8zm14.4 0h3l-4.5 4.8 1.5-4.8zM9.3 13.8h5.4l-2.7 5.4-2.7-5.4z"/></svg>
                    </a>
                    <a href={personalInfo.socials.phabricator} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-sage/10 text-sage hover:bg-sage hover:text-cream transition-all btn-3d" aria-label="Phabricator">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6" fill="white"/><circle cx="12" cy="12" r="3" fill="currentColor"/></svg>
                    </a>
                    <a href={personalInfo.socials.gerrit} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-sage/10 text-sage hover:bg-sage hover:text-cream transition-all btn-3d" aria-label="Gerrit">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15l-5-5 1.41-1.41L11 14.17l7.59-7.59L20 8l-9 9z"/></svg>
                    </a>
                  </div>
                </div>
              </div>
            </SectionReveal>

            {/* Terminal */}
            <SectionReveal delay={0.2}>
              <div className="glass-dark rounded-xl overflow-hidden shadow-lg">
                <div className="bg-[#3d3528] px-4 py-2 flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="ml-2 font-mono text-xs text-white/50">reetios.exe</span>
                </div>
                <div ref={terminalRef} className="p-4 h-48 overflow-y-auto font-mono text-sm flex flex-col gap-2 scrollbar-thin scrollbar-thumb-white/10">
                  {history.map((line, i) => (
                    <div key={i} className={line.type === 'input' ? 'text-white/70' : 'text-sage-light'}>
                      {line.text}
                    </div>
                  ))}
                  <div className="flex items-center text-white mt-auto">
                    <span className="text-terracotta-light mr-2">C:\REETI&gt;</span>
                    {isTyping ? (
                      <span className="border-r-2 border-sage-light" style={{ animation: "typewriter-blink 1s step-end infinite" }}>&nbsp;</span>
                    ) : (
                      <input 
                        type="text" 
                        value={command}
                        onChange={(e) => setCommand(e.target.value)}
                        onKeyDown={handleCommand}
                        className="flex-1 bg-transparent border-none outline-none text-white focus:ring-0 p-0"
                        autoComplete="off"
                        spellCheck="false"
                        id="terminal-input"
                      />
                    )}
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
      </section>
    </div>
  );
}
