"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { personalInfo, experiences, projects, openSourceData } from "@/lib/data";
import SectionReveal from "@/components/SectionReveal";
import CharacterHome from "@/components/character/CharacterHome";
import CharacterExperience from "@/components/character/CharacterExperience";
import CharacterProjects from "@/components/character/CharacterProjects";
import CharacterOpenSource from "@/components/character/CharacterOpenSource";
import CharacterContact from "@/components/character/CharacterContact";
import CharacterSkills from "@/components/character/CharacterSkills";
import ExperienceCard from "@/components/ui/ExperienceCard";
import ProjectCard from "@/components/ui/ProjectCard";
import StatBadge from "@/components/ui/StatBadge";

const ScrollWordReveal = ({ text }: { text: string }) => {
  const words = text.split(" ");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    
    const spans = el.querySelectorAll('.scroll-word') as NodeListOf<HTMLSpanElement>;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      spans.forEach(span => span.classList.add('active'));
      return;
    }

    let activeIdx = -1;
    let timer: NodeJS.Timeout;
    let isVisible = false;

    const activateUpTo = (targetIdx: number) => {
      while (activeIdx < targetIdx && activeIdx < spans.length - 1) {
        activeIdx++;
        spans[activeIdx].classList.add('active');
      }
    };

    const deactivateAll = () => {
      activeIdx = -1;
      spans.forEach(span => span.classList.remove('active'));
    };

    const autoPlay = () => {
      if (!isVisible) return;
      if (activeIdx < spans.length - 1) {
        activateUpTo(activeIdx + 1);
        timer = setTimeout(autoPlay, 40); // 40ms per word auto-play
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          if (activeIdx === -1) {
            autoPlay(); // Start autoplay
          }
        } else {
          deactivateAll(); // Reset completely when out of view
          clearTimeout(timer);
        }
      },
      { threshold: 0 }
    );

    observer.observe(el);

    const handleScroll = () => {
      if (!isVisible) return;
      const scrollY = window.scrollY;
      const scrollProgress = Math.min(Math.max(scrollY / 400, 0), 1);
      const targetIndex = Math.floor(scrollProgress * spans.length);
      
      if (targetIndex > activeIdx) {
        activateUpTo(targetIndex);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative text-[15px] lg:text-base text-text-muted leading-relaxed">
      <style>{`
        .scroll-word {
          display: inline-block;
          transition: color 350ms ease-out, opacity 350ms ease-out, transform 350ms cubic-bezier(0.34, 1.2, 0.64, 1);
          color: inherit;
          opacity: 0.25;
          transform: scale(0.98);
          will-change: opacity, transform, color;
        }
        .scroll-word.active {
          color: inherit;
          opacity: 1;
          transform: scale(1) translateZ(0);
        }
        @media (prefers-reduced-motion: reduce) {
          .scroll-word {
            transition: none !important;
            color: inherit !important;
            opacity: 1 !important;
            transform: scale(1) !important;
          }
        }
      `}</style>
      {words.map((word, i) => (
        <React.Fragment key={i}>
          <span className="scroll-word">{word}</span>
          {i < words.length - 1 && " "}
        </React.Fragment>
      ))}
    </div>
  );
};

export default function Home() {
  const [command, setCommand] = useState("");
  const [history, setHistory] = useState<{ text: string, type: 'input' | 'output' }[]>([]);
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
    const tempHistory: { text: string, type: 'input' | 'output' }[] = [];

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

        {/* LEFT COLUMN: Intro Text */}
        <motion.div className="flex-1 max-w-sm flex flex-col gap-6 text-center lg:text-left" style={{ y: heroTextY, opacity: heroOpacity }}>
          <SectionReveal delay={0.1}>
            <div>
              <div className="inline-block px-3 py-1 mb-4 border border-terracotta/30 bg-terracotta/10 text-terracotta font-mono text-xs rounded-full">
                C:\REETI\status &gt; online
              </div>
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
        </motion.div>

        {/* CENTER COLUMN: Character Illustration */}
        <motion.div className="flex-[1.5] w-full max-w-[280px] sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto py-4 lg:py-0" style={{ y: heroImageY, opacity: heroOpacity }}>
          <SectionReveal delay={0.3}>
            <CharacterHome />
          </SectionReveal>
        </motion.div>

        {/* RIGHT COLUMN: Description Text */}
        <motion.div className="flex-1 max-w-sm flex flex-col justify-center text-left" style={{ y: heroTextY, opacity: heroOpacity }}>
          <ScrollWordReveal text="I build things that make messy systems elegant; from routing logistics across 50 warehouses to digitising centuries-old manuscripts with computer vision. Final-year CS undergrad who'd rather ship working code than write another to-do list about it. Currently breaking (and fixing) things in production at scale." />
        </motion.div>

      </section>

      <div className="section-divider my-8" />

      {/* ============================== */}
      {/* Skills Section */}
      {/* ============================== */}
      <section id="skills" className="py-16 lg:py-24">
        <SectionReveal>
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-sage-dark">Technical Arsenal.</h2>
            <div className="h-px flex-1 bg-sage-light/30"></div>
          </div>
        </SectionReveal>

        <div className="flex flex-col lg:flex-row items-center gap-10">
          <div className="flex-1 w-full order-2 lg:order-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              {/* Languages */}
              <motion.div
                initial={{ opacity: 0, x: -50, rotateY: -90, scale: 0.9 }}
                whileInView={{ opacity: 1, x: 0, rotateY: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
                style={{ perspective: 1200, transformOrigin: "left" }}
              >
                <motion.div whileHover={{ scale: 1.02, y: -4 }} className="p-6 bg-cream/80 backdrop-blur-sm border border-sage/20 rounded-2xl shadow-sm hover:shadow-md transition-all h-full">
                  <div className="flex items-center gap-3 mb-4 text-sage">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
                    <h3 className="font-bold text-lg text-sage-dark">Languages</h3>
                  </div>
                  <p className="text-text-muted text-sm leading-relaxed">Python, TypeScript, Java, Bash</p>
                </motion.div>
              </motion.div>

              {/* Frontend / Full-Stack */}
              <motion.div
                initial={{ opacity: 0, x: -50, rotateY: -90, scale: 0.9 }}
                whileInView={{ opacity: 1, x: 0, rotateY: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}
                style={{ perspective: 1200, transformOrigin: "left" }}
              >
                <motion.div whileHover={{ scale: 1.02, y: -4 }} className="p-6 bg-cream/80 backdrop-blur-sm border border-terracotta/20 rounded-2xl shadow-sm hover:shadow-md transition-all h-full">
                  <div className="flex items-center gap-3 mb-4 text-terracotta">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>
                    <h3 className="font-bold text-lg text-sage-dark">Frontend / Full-Stack</h3>
                  </div>
                  <p className="text-text-muted text-sm leading-relaxed">Next.js, React, Tailwind CSS</p>
                </motion.div>
              </motion.div>

              {/* ML / AI */}
              <motion.div
                initial={{ opacity: 0, x: -50, rotateY: -90, scale: 0.9 }}
                whileInView={{ opacity: 1, x: 0, rotateY: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
                style={{ perspective: 1200, transformOrigin: "left" }}
              >
                <motion.div whileHover={{ scale: 1.02, y: -4 }} className="p-6 bg-cream/80 backdrop-blur-sm border border-[#60a5fa]/20 rounded-2xl shadow-sm hover:shadow-md transition-all h-full">
                  <div className="flex items-center gap-3 mb-4 text-[#60a5fa]">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                    <h3 className="font-bold text-lg text-sage-dark">ML / AI</h3>
                  </div>
                  <p className="text-text-muted text-sm leading-relaxed">CNNs (TensorFlow/Keras, OpenCV), NLP (scikit-learn, NLTK), Google Vision AI</p>
                </motion.div>
              </motion.div>

              {/* Backend & Data */}
              <motion.div
                initial={{ opacity: 0, x: -50, rotateY: -90, scale: 0.9 }}
                whileInView={{ opacity: 1, x: 0, rotateY: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: 0.25, ease: [0.23, 1, 0.32, 1] }}
                style={{ perspective: 1200, transformOrigin: "left" }}
              >
                <motion.div whileHover={{ scale: 1.02, y: -4 }} className="p-6 bg-cream/80 backdrop-blur-sm border border-warm-brown/20 rounded-2xl shadow-sm hover:shadow-md transition-all h-full">
                  <div className="flex items-center gap-3 mb-4 text-warm-brown">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>
                    <h3 className="font-bold text-lg text-sage-dark">Backend & Data</h3>
                  </div>
                  <p className="text-text-muted text-sm leading-relaxed">REST APIs, ETL pipelines, async Firestore, data automation</p>
                </motion.div>
              </motion.div>

              {/* Cloud / DevOps */}
              <motion.div
                initial={{ opacity: 0, x: -50, rotateY: -90, scale: 0.9 }}
                whileInView={{ opacity: 1, x: 0, rotateY: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
                style={{ perspective: 1200, transformOrigin: "left" }}
                className="md:col-span-2"
              >
                <motion.div whileHover={{ scale: 1.02, y: -4 }} className="p-6 bg-cream/80 backdrop-blur-sm border border-sage-dark/20 rounded-2xl shadow-sm hover:shadow-md transition-all h-full">
                  <div className="flex items-center gap-3 mb-4 text-sage-dark">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path></svg>
                    <h3 className="font-bold text-lg text-sage-dark">Cloud / DevOps</h3>
                  </div>
                  <p className="text-text-muted text-sm leading-relaxed">GCP (Compute Engine, Cloud Storage, Firestore), Docker, Git, Gerrit</p>
                </motion.div>
              </motion.div>

              {/* Soft Skills */}
              <motion.div
                initial={{ opacity: 0, x: -50, rotateY: -90, scale: 0.9 }}
                whileInView={{ opacity: 1, x: 0, rotateY: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: 0.35, ease: [0.23, 1, 0.32, 1] }}
                style={{ perspective: 1200, transformOrigin: "left" }}
                className="md:col-span-2"
              >
                <motion.div whileHover={{ scale: 1.02, y: -4 }} className="p-6 bg-sage-dark/5 backdrop-blur-sm border-2 border-sage-dark/10 rounded-2xl shadow-sm hover:shadow-md transition-all h-full relative overflow-hidden group">
                  <div className="absolute -right-10 -top-10 opacity-5 group-hover:opacity-10 transition-opacity">
                    <svg width="150" height="150" viewBox="0 0 24 24" fill="currentColor"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                  </div>
                  <div className="flex items-center gap-3 mb-4 text-sage-dark relative z-10">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                    <h3 className="font-bold text-lg text-sage-dark">Leadership & Synergy</h3>
                  </div>
                  <p className="text-text-muted text-sm leading-relaxed relative z-10 font-medium">Communication, Team Leadership, Open-Source Mentorship</p>
                </motion.div>
              </motion.div>

            </div>
          </div>
          <div className="flex-1 w-full max-w-[280px] sm:max-w-sm mx-auto flex items-center justify-center order-1 lg:order-2">
            <SectionReveal delay={0.4} className="w-full">
              <CharacterSkills />
            </SectionReveal>
          </div>
        </div>
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
                I&apos;ve had the opportunity to tackle complex problems across different domains from digitizing historical texts to automating warehouse logistics. Here&apos;s how I approached them.
              </p>
            </SectionReveal>
          </div>
          <div className="w-full max-w-[280px] sm:max-w-sm mx-auto">
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
          <div className="w-full max-w-[280px] sm:max-w-sm mx-auto order-2 lg:order-1">
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
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 60, rotateX: -45, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: 0.15 * index, ease: [0.23, 1, 0.32, 1] }}
              style={{ perspective: 1200 }}
            >
              <ProjectCard project={project} />
            </motion.div>
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
          <div className="w-full max-w-[280px] sm:max-w-sm mx-auto">
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
              <svg className="w-5 h-5 text-terracotta" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
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
                <motion.a
                  key={handle.name}
                  href={handle.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -8, scale: 1.02 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative flex items-center gap-4 p-5 bg-white rounded-2xl shadow-sm hover:shadow-xl border border-sage/10 transition-all duration-300 overflow-hidden"
                >
                  {/* Icon */}
                  <motion.div
                    className="w-12 h-12 rounded-xl bg-sage/10 flex items-center justify-center text-sage group-hover:bg-sage/20 transition-colors duration-300 flex-shrink-0"
                    whileHover={{ rotate: [0, -10, 10, -10, 10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    {handle.icon === "wikimedia" && (
                      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M12.003 2C6.478 2 2 6.478 2 12.003S6.478 22.006 12.003 22.006 22.006 17.528 22.006 12.003 17.528 2 12.003 2zm.6 3.6l2.4 6.6h-4.8l2.4-6.6zm-3.6 0L6.3 12.6H3.9l5.1-7zm7.2 0l5.1 7H18.9l-2.7-7zM3.3 13.8h3l1.5 4.8-4.5-4.8zm14.4 0h3l-4.5 4.8 1.5-4.8zM9.3 13.8h5.4l-2.7 5.4-2.7-5.4z" /></svg>
                    )}
                    {handle.icon === "phabricator" && (
                      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" fill="white" /><circle cx="12" cy="12" r="3" fill="currentColor" /></svg>
                    )}
                    {handle.icon === "gerrit" && (
                      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15l-5-5 1.41-1.41L11 14.17l7.59-7.59L20 8l-9 9z" /></svg>
                    )}
                  </motion.div>
                  <div className="relative z-10">
                    <div className="font-bold text-sage-dark transition-colors">{handle.name}</div>
                    <div className="text-xs text-text-muted font-mono tracking-wide transition-colors">View Profile →</div>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </SectionReveal>

        {/* Two Column Content */}
        <div className="grid md:grid-cols-2 gap-10">
          <SectionReveal delay={0.45}>
            <h3 className="text-2xl font-bold text-sage-dark mb-6">Building the Free Knowledge Ecosystem</h3>
            <div className="prose prose-sage space-y-4 text-text-muted leading-relaxed text-sm text-justify">
              <p>
                My heart lies in the open-source world, particularly within the Wikimedia Foundation&apos;s MediaWiki ecosystem. I regularly contribute technical code, track bugs via Phabricator, and submit patch sets through Gerrit.
              </p>
              <p>
                I am incredibly proud to have 8 of my 10 tasks successfully merged, maintaining an 88% patch acceptance rate across repositories that serve millions of Wikipedia users globally. Beyond writing code, I authored internationalization (i18n) technical documentation that was merged into MediaWiki core and formally cited in the FY25-26 Wikimedia Language Usability Annual Summary.
              </p>
              <p>
                But the most rewarding part of this ecosystem isn&apos;t just the code it&apos;s mentoring new contributors and helping them navigate their first open-source commits.
              </p>
            </div>
          </SectionReveal>

          <SectionReveal delay={0.5}>
            <h3 className="text-2xl font-bold text-sage-dark mb-6">Grassroots Leadership</h3>
            <SectionReveal stagger staggerDelay={0.1} className="space-y-4">
              {openSourceData.roles.map((role, index) => {
                const isGDG = role.org.includes("GDG");
                return (
                  <motion.div
                    key={index}
                    className="relative p-5 rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden group bg-white border-sage/20 hover:shadow-lg hover:border-sage/30"
                    whileHover={{ scale: 1.02, x: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  >
                    <div className="flex justify-between items-baseline mb-3 relative z-10">
                      <h4 className="font-bold text-sage-dark text-lg">{role.title}</h4>
                      <span className={`text-sm font-bold tracking-wide ${isGDG ? 'text-sage-dark' : 'text-sage'}`}>{role.org}</span>
                    </div>
                    <p className="text-sm text-text-muted leading-relaxed relative z-10">{role.desc}</p>
                  </motion.div>
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
            Always happy to chat about code, collaboration, or creativity.
          </p>
        </SectionReveal>

        <div className="flex flex-col lg:flex-row items-stretch justify-center gap-10">

          <div className="flex-1 max-w-md flex flex-col gap-6 w-full">

            {/* Contact Card */}
            {/* Clean, Minimalist Contact Card */}
            <SectionReveal delay={0.1}>
              <div className="relative p-8 rounded-[2rem] bg-cream shadow-sm border border-sage/20 overflow-hidden">
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-8">
                    <div>
                      <h3 className="text-3xl font-bold text-sage-dark mb-1">Let's Connect</h3>
                      <p className="text-sm font-medium text-sage-dark/60">Reach out via email or phone</p>
                    </div>
                  </div>

                  <div className="space-y-4 mb-8">
                    {/* Email Card */}
                    <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-4 p-4 rounded-2xl bg-white hover:bg-sage/5 border border-sage/10 hover:border-sage/30 transition-colors duration-200 group">
                      <div className="w-12 h-12 shrink-0 rounded-xl bg-sage/10 text-sage flex items-center justify-center group-hover:bg-sage group-hover:text-white transition-colors duration-200">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[11px] text-sage-dark/50 uppercase tracking-widest font-bold mb-0.5">Email Me</div>
                        <div className="font-semibold text-sage-dark text-sm sm:text-base truncate">{personalInfo.email}</div>
                      </div>
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-sage opacity-0 group-hover:opacity-100 transition-opacity">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                      </div>
                    </a>

                    {/* Phone Card */}
                    <a href={`tel:${personalInfo.phone}`} className="flex items-center gap-4 p-4 rounded-2xl bg-white hover:bg-terracotta/5 border border-terracotta/10 hover:border-terracotta/30 transition-colors duration-200 group">
                      <div className="w-12 h-12 shrink-0 rounded-xl bg-terracotta/10 text-terracotta flex items-center justify-center group-hover:bg-terracotta group-hover:text-white transition-colors duration-200">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[11px] text-terracotta/70 uppercase tracking-widest font-bold mb-0.5">Call Me</div>
                        <div className="font-semibold text-sage-dark text-sm sm:text-base truncate">{personalInfo.phone}</div>
                      </div>
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-terracotta opacity-0 group-hover:opacity-100 transition-opacity">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                      </div>
                    </a>
                  </div>

                  {/* Social Links Dock */}
                  <div>
                    <div className="text-[11px] text-sage-dark/50 uppercase tracking-widest font-bold mb-3">Social Profiles</div>
                    <div className="flex flex-wrap gap-3">
                      <a href={personalInfo.socials.linkedin} target="_blank" rel="noopener noreferrer" className="w-11 h-11 flex items-center justify-center rounded-xl bg-white text-sage border border-sage/20 hover:bg-sage hover:text-white transition-colors duration-200" aria-label="LinkedIn">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                      </a>
                      <a href={personalInfo.socials.github} target="_blank" rel="noopener noreferrer" className="w-11 h-11 flex items-center justify-center rounded-xl bg-white text-sage border border-sage/20 hover:bg-sage hover:text-white transition-colors duration-200" aria-label="GitHub">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                      </a>
                      <a href={personalInfo.socials.instagram} target="_blank" rel="noopener noreferrer" className="w-11 h-11 flex items-center justify-center rounded-xl bg-white text-sage border border-sage/20 hover:bg-sage hover:text-white transition-colors duration-200" aria-label="Instagram">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                      </a>
                      <a href={personalInfo.socials.wikimedia} target="_blank" rel="noopener noreferrer" className="w-11 h-11 flex items-center justify-center rounded-xl bg-white text-sage border border-sage/20 hover:bg-sage hover:text-white transition-colors duration-200" aria-label="Wikimedia">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12.003 2C6.478 2 2 6.478 2 12.003S6.478 22.006 12.003 22.006 22.006 17.528 22.006 12.003 17.528 2 12.003 2zm.6 3.6l2.4 6.6h-4.8l2.4-6.6zm-3.6 0L6.3 12.6H3.9l5.1-7zm7.2 0l5.1 7H18.9l-2.7-7zM3.3 13.8h3l1.5 4.8-4.5-4.8zm14.4 0h3l-4.5 4.8 1.5-4.8zM9.3 13.8h5.4l-2.7 5.4-2.7-5.4z" /></svg>
                      </a>
                      <a href={personalInfo.socials.phabricator} target="_blank" rel="noopener noreferrer" className="w-11 h-11 flex items-center justify-center rounded-xl bg-white text-sage border border-sage/20 hover:bg-sage hover:text-white transition-colors duration-200" aria-label="Phabricator">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" fill="white" /><circle cx="12" cy="12" r="3" fill="currentColor" /></svg>
                      </a>
                      <a href={personalInfo.socials.gerrit} target="_blank" rel="noopener noreferrer" className="w-11 h-11 flex items-center justify-center rounded-xl bg-white text-sage border border-sage/20 hover:bg-sage hover:text-white transition-colors duration-200" aria-label="Gerrit">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15l-5-5 1.41-1.41L11 14.17l7.59-7.59L20 8l-9 9z" /></svg>
                      </a>
                    </div>
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
                <div ref={terminalRef} className="p-4 h-48 overflow-y-auto overflow-x-hidden font-mono text-sm flex flex-col gap-2 scrollbar-thin scrollbar-thumb-white/10 break-words">
                  {history.map((line, i) => (
                    <div key={i} className={line.type === 'input' ? 'text-white/70' : 'text-sage-light'}>
                      {line.text}
                    </div>
                  ))}
                  <div className="flex flex-wrap items-center text-white mt-auto">
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
          <div className="flex-1 w-full max-w-[280px] sm:max-w-sm mx-auto flex items-center justify-center">
            <SectionReveal delay={0.3} className="w-full">
              <CharacterContact />
            </SectionReveal>
          </div>
        </div>
      </section>
    </div>
  );
}
