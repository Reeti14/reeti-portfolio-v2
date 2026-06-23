"use client";

import { motion, useMotionValue, useTransform, useSpring, useMotionTemplate } from "framer-motion";
import { useRef, useState } from "react";
import SkillTag from "./SkillTag";

interface ProjectProps {
  project: {
    id: string;
    title: string;
    description: string;
    tech: string[];
    link: string | null;
    github: string | null;
  }
}

export default function ProjectCard({ project }: ProjectProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse position relative to center for tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Mouse position relative to top-left for glare
  const clientX = useMotionValue(0);
  const clientY = useMotionValue(0);

  // Deep tilt values (exaggerated for pro-max 3D effect)
  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [15, -15]), { damping: 30, stiffness: 200 });
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-15, 15]), { damping: 30, stiffness: 200 });

  // Dynamic glare based on mouse position
  const glareBackground = useMotionTemplate`radial-gradient(circle at ${clientX}px ${clientY}px, rgba(255,255,255,0.15) 0%, transparent 60%)`;

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - (rect.left + rect.width / 2));
    mouseY.set(e.clientY - (rect.top + rect.height / 2));
    
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
    <motion.div
      ref={cardRef}
      className="group relative flex flex-col h-full bg-cream/80 backdrop-blur-md rounded-2xl overflow-hidden shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-sage/20 transition-all cursor-pointer card-3d"
      style={{ perspective: 1200, rotateX, rotateY }}
      onMouseMove={handleMouse}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      animate={{ scale: isHovered ? 1.03 : 1, y: isHovered ? -8 : 0 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Glare overlay */}
      <motion.div
        className="absolute inset-0 z-20 pointer-events-none rounded-xl mix-blend-overlay transition-opacity duration-300"
        style={{ background: glareBackground, opacity: isHovered ? 1 : 0 }}
      />
      
      <div className="p-6 flex flex-col flex-grow relative z-10 card-3d-inner" style={{ transformStyle: "preserve-3d" }}>
        
        <div className="flex justify-between items-start mb-4" style={{ transform: "translateZ(30px)" }}>
          <h3 className="text-xl font-bold text-sage-dark transition-colors duration-300">{project.title}</h3>
          
          <div className="flex gap-2">
            {project.github && project.github !== "#" && (
              <motion.a 
                href={project.github} target="_blank" rel="noopener noreferrer" 
                className="p-2 text-sage-dark hover:bg-sage/10 rounded-xl shadow-sm transition-all bg-white/50 border border-sage/10" 
                aria-label="GitHub Repository"
                whileHover={{ scale: 1.15, rotate: 5, y: -4 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
              </motion.a>
            )}
            {project.link && project.link !== "#" && (
              <motion.a 
                href={project.link} target="_blank" rel="noopener noreferrer" 
                className="p-2 text-sage-dark hover:bg-sage/10 rounded-xl shadow-sm transition-all bg-white/50 border border-sage/10" 
                aria-label="Live Demo"
                whileHover={{ scale: 1.15, rotate: -5, y: -4 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
              </motion.a>
            )}
          </div>
        </div>
        
        <p className="text-sm text-text-muted mb-6 flex-grow leading-relaxed">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-sage/10">
          {project.tech.map((t, index) => (
            <motion.div
              key={t}
              initial={false}
              animate={{ 
                y: isHovered ? [0, -4, 0] : 0 
              }}
              transition={{
                duration: 0.4,
                delay: isHovered ? index * 0.05 : 0,
                ease: "easeOut"
              }}
            >
              <SkillTag label={t} />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
