"use client";

import { motion, useMotionValue, useTransform, useSpring, useMotionTemplate } from "framer-motion";
import { useRef, useState } from "react";
import SkillTag from "./SkillTag";

interface ExperienceProps {
  experience: {
    id: string;
    role: string;
    company: string;
    date: string;
    problem: string;
    approach: string;
    impact: string;
    metrics: string[];
  };
  index: number;
}

export default function ExperienceCard({ experience, index }: ExperienceProps) {
  const isEven = index % 2 === 0;
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse position relative to center for tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Mouse position relative to top-left for glare
  const clientX = useMotionValue(0);
  const clientY = useMotionValue(0);

  // Deep tilt values
  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [12, -12]), { damping: 30, stiffness: 200 });
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-12, 12]), { damping: 30, stiffness: 200 });

  // Dynamic glare based on mouse position
  const glareBackground = useMotionTemplate`radial-gradient(circle at ${clientX}px ${clientY}px, rgba(255,255,255,0.15) 0%, transparent 60%)`;

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
    
    // Set absolute mouse coordinates for glare effect within the card
    clientX.set(e.clientX - rect.left);
    clientY.set(e.clientY - rect.top);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <div className={`relative flex items-center justify-between md:justify-normal w-full mb-16 ${isEven ? 'md:flex-row-reverse' : ''}`}>
      
      {/* Center timeline dot */}
      <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-terracotta border-4 border-cream z-20 shadow-md" />
      
      {/* Pulse ring on the dot */}
      <motion.div
        className="hidden md:block absolute left-1/2 -translate-x-1/2 w-5 h-5 rounded-full border-2 border-terracotta/40 z-10"
        animate={{ scale: [1, 1.8, 1], opacity: [0.5, 0, 0.5] }}
        transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
      />
      
      {/* Empty space */}
      <div className="hidden md:block w-5/12" />

      {/* Card */}
      <motion.div
        ref={cardRef}
        className="w-full md:w-5/12 z-10 card-3d"
        style={{ perspective: 1200, rotateX, rotateY }}
        onMouseMove={handleMouse}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
        initial={{ opacity: 0, x: isEven ? 50 : -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
      >
        <motion.div 
          className="glass p-6 rounded-xl shadow-sm relative group hover:shadow-lg transition-all duration-300 glow-border cursor-pointer card-3d-inner overflow-hidden"
          animate={{ scale: isHovered ? 1.02 : 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Glare overlay */}
          <motion.div
            className="absolute inset-0 z-20 pointer-events-none rounded-xl mix-blend-overlay transition-opacity duration-300"
            style={{ background: glareBackground, opacity: isHovered ? 1 : 0 }}
          />
          
          {/* Connector arrow */}
          <div className={`hidden md:block absolute top-6 w-0 h-0 border-y-8 border-y-transparent ${isEven ? 'right-full border-r-[12px] border-r-cream-dark/60' : 'left-full border-l-[12px] border-l-cream-dark/60'}`} />
          
          <div className="flex flex-col gap-1 mb-4 relative z-10" style={{ transform: "translateZ(20px)" }}>
            <span className="font-mono text-xs text-terracotta tracking-wider">{experience.date}</span>
            <h3 className="text-xl font-bold text-sage-dark group-hover:text-terracotta transition-colors">{experience.role}</h3>
            <span className="text-sm font-medium text-warm-brown/80">{experience.company}</span>
          </div>

          <div className="space-y-3 text-sm text-text-muted leading-relaxed mb-5 relative z-10" style={{ transform: "translateZ(10px)" }}>
            <p><strong className="text-warm-brown font-medium">The Challenge:</strong> {experience.problem}</p>
            <p><strong className="text-warm-brown font-medium">My Approach:</strong> {experience.approach}</p>
            <p><strong className="text-warm-brown font-medium">The Impact:</strong> {experience.impact}</p>
          </div>

          <div className="flex flex-wrap gap-2 pt-4 border-t border-sage-light/10 relative z-10" style={{ transform: "translateZ(30px)" }}>
            {experience.metrics.map(metric => (
              <SkillTag key={metric} label={metric} />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
