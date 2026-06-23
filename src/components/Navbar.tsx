"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import MagneticElement from "./ui/MagneticElement";

const navItems = [
  { id: "home", label: "home" },
  { id: "skills", label: "skills" },
  { id: "experience", label: "experience" },
  { id: "projects", label: "projects" },
  { id: "open-source", label: "open-source" },
  { id: "contact", label: "contact" },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    navItems.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setMobileOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between h-14 px-4 md:px-8 glass shadow-sm">
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-terracotta/80" />
        <div className="w-3 h-3 rounded-full bg-sage/80" />
        <div className="w-3 h-3 rounded-full bg-warm-brown/30" />
      </div>

      {/* Desktop nav */}
      <div className="hidden md:flex items-center gap-6 font-mono text-sm">
        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <MagneticElement key={item.id} strength={0.2}>
              <button
                onClick={() => scrollTo(item.id)}
                className={`relative px-4 py-2 text-sm font-medium transition-colors ${
                  activeSection === item.id ? "text-terracotta" : "text-text-muted hover:text-sage-dark"
                }`}
              >
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute inset-0 bg-cream-dark/50 rounded-lg -z-10"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                {item.label}
              </button>
            </MagneticElement>
          );
        })}
      </div>

      {/* Mobile hamburger */}
      <button
        className="md:hidden flex flex-col gap-1.5 p-2 cursor-pointer"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle menu"
      >
        <motion.div
          className="w-5 h-0.5 bg-warm-brown rounded"
          animate={shouldReduceMotion ? {} : (mobileOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 })}
        />
        <motion.div
          className="w-5 h-0.5 bg-warm-brown rounded"
          animate={shouldReduceMotion ? {} : (mobileOpen ? { opacity: 0 } : { opacity: 1 })}
        />
        <motion.div
          className="w-5 h-0.5 bg-warm-brown rounded"
          animate={shouldReduceMotion ? {} : (mobileOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 })}
        />
      </button>

      {/* Mobile dropdown */}
      <motion.div
        className="absolute top-14 left-0 right-0 glass border-b border-sage-light/20 shadow-lg md:hidden overflow-hidden"
        initial={false}
        animate={mobileOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex flex-col p-4 gap-2">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`text-left px-3 py-2 font-mono text-sm rounded-lg transition-colors cursor-pointer ${
                  isActive ? "bg-sage-light/20 text-sage-dark font-medium" : "text-text-muted hover:bg-cream-dark"
                }`}
              >
                C:\REETI\{item.label}
              </button>
            );
          })}
        </div>
      </motion.div>
    </nav>
  );
}
