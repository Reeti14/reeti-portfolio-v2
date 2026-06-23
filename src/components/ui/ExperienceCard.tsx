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
      
      {/* Empty space */}
      <div className="hidden md:block w-5/12" />

      {/* Card */}
      <motion.div
        className="w-full md:w-5/12 z-10"
        initial={{ opacity: 0, y: 60, rotateX: -45, scale: 0.9 }}
        whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
        style={{ perspective: 1200 }}
      >
        <motion.div
          ref={cardRef}
          className="w-full h-full card-3d"
          style={{ rotateX, rotateY }}
          onMouseMove={handleMouse}
          onMouseLeave={handleMouseLeave}
          onMouseEnter={handleMouseEnter}
        >
        <motion.div 
          className="bg-cream/80 backdrop-blur-md p-6 rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-sage/20 relative group hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all duration-300 cursor-pointer card-3d-inner overflow-hidden"
          animate={{ scale: isHovered ? 1.03 : 1, y: isHovered ? -8 : 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          whileTap={{ scale: 0.98 }}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Glare overlay */}
          <motion.div
            className="absolute inset-0 z-20 pointer-events-none rounded-xl mix-blend-overlay transition-opacity duration-300"
            style={{ background: glareBackground, opacity: isHovered ? 1 : 0 }}
          />
          
          <div className="flex flex-col gap-1 mb-4 relative z-10" style={{ transform: "translateZ(20px)" }}>
            <motion.span 
              className="font-mono text-xs text-terracotta tracking-wider"
              animate={{ x: isHovered ? 5 : 0 }}
              transition={{ type: "spring", stiffness: 300 }}
            >{experience.date}</motion.span>
            <h3 className="text-xl font-bold text-sage-dark group-hover:text-terracotta transition-colors">{experience.role}</h3>
            <span className="text-sm font-medium text-warm-brown/80">{experience.company}</span>
          </div>

          <div className="space-y-3 text-sm text-text-muted leading-relaxed mb-5 relative z-10" style={{ transform: "translateZ(10px)" }}>
            <motion.p animate={{ x: isHovered ? 4 : 0 }} transition={{ duration: 0.3, delay: 0.05 }}><strong className="text-warm-brown font-medium">The Challenge:</strong> {experience.problem}</motion.p>
            <motion.p animate={{ x: isHovered ? 4 : 0 }} transition={{ duration: 0.3, delay: 0.1 }}><strong className="text-warm-brown font-medium">My Approach:</strong> {experience.approach}</motion.p>
            <motion.p animate={{ x: isHovered ? 4 : 0 }} transition={{ duration: 0.3, delay: 0.15 }}><strong className="text-warm-brown font-medium">The Impact:</strong> {experience.impact}</motion.p>
          </div>

          <div className="flex flex-wrap gap-2 pt-4 border-t border-sage/10 relative z-10" style={{ transform: "translateZ(30px)" }}>
            {experience.metrics.map((metric, index) => (
              <motion.div
                key={metric}
                initial={false}
                animate={{ 
                  y: isHovered ? [0, -3, 0] : 0 
                }}
                transition={{
                  duration: 0.4,
                  delay: isHovered ? index * 0.05 : 0,
                  ease: "easeOut"
                }}
              >
                <SkillTag label={metric} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
      </motion.div>
    </div>
  );
}
