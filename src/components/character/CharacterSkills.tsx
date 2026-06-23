"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

export default function CharacterSkills() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Mouse position relative to center
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Parallax transform for subtle 3D depth based on mouse
  const rotateX = useTransform(mouseY, [-300, 300], [5, -5]);
  const rotateY = useTransform(mouseX, [-300, 300], [-5, 5]);
  const parallaxX = useTransform(mouseX, [-300, 300], [-10, 10]);
  const parallaxY = useTransform(mouseY, [-300, 300], [-10, 10]);

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      // Always track mouse globally for constant slight movement
      mouseX.set(e.clientX - window.innerWidth / 2);
      mouseY.set(e.clientY - window.innerHeight / 2);
    };

    window.addEventListener('mousemove', handleGlobalMouseMove);
    return () => window.removeEventListener('mousemove', handleGlobalMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      ref={containerRef}
      className="relative w-full max-w-[420px] mx-auto cursor-pointer select-none"
      style={{ perspective: 1200 }}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ type: "spring", bounce: 0.5, duration: 1 }}
    >
      {/* Dynamic Floor Shadow */}
      <motion.div 
        className="absolute bottom-0 left-[20%] right-[20%] h-4 bg-black/10 rounded-[100%] blur-md"
        animate={{ scale: [1, 0.8, 1], opacity: [0.4, 0.2, 0.4] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <motion.div style={{ rotateX, rotateY, x: parallaxX, y: parallaxY }} className="w-full h-full flex justify-center items-center relative z-10">
        
        {/* Floating Element 1: Terminal / Bash (Languages) */}
        <motion.div
          className="absolute top-[15%] left-[5%] text-sage-dark opacity-60 pointer-events-none z-0"
          animate={{ y: [0, -10, 0], rotate: [-10, 5, -10] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
        >
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line></svg>
        </motion.div>

        {/* Floating Element 2: React Atom (Frontend) */}
        <motion.div
          className="absolute bottom-[25%] right-[0%] text-terracotta opacity-80 pointer-events-none z-20 drop-shadow-md"
          animate={{ y: [0, 15, 0], rotate: [0, 90, 180] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        >
          <svg width="40" height="40" viewBox="-10.5 -9.45 21 18.9" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="0" cy="0" r="2" fill="currentColor"></circle><g stroke="currentColor" strokeWidth="1" fill="none"><ellipse rx="10" ry="4.5"></ellipse><ellipse rx="10" ry="4.5" transform="rotate(60)"></ellipse><ellipse rx="10" ry="4.5" transform="rotate(120)"></ellipse></g></svg>
        </motion.div>

        {/* Floating Element 3: Neural Network (ML / AI) */}
        <motion.div
          className="absolute top-[30%] right-[5%] text-[#60a5fa] opacity-60 pointer-events-none z-0"
          animate={{ y: [0, -15, 0], rotate: [10, -5, 10] }}
          transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
        </motion.div>

        {/* Floating Element 4: Database (Backend & Data) */}
        <motion.div
          className="absolute bottom-[35%] left-[0%] text-warm-brown opacity-60 pointer-events-none z-20 drop-shadow-sm"
          animate={{ y: [0, 10, 0], scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>
        </motion.div>

        <motion.img
          src="/images/characters/hero-character.skills.png"
          alt="Reeti 3D character skills"
          className="w-full h-auto drop-shadow-xl relative z-10"
          animate={{ 
            y: [0, -15, 0],
            rotateZ: [-2, 2, -2],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          whileHover={{ scale: 1.05, filter: "drop-shadow(0px 20px 20px rgba(0,0,0,0.3))" }}
        />
      </motion.div>
    </motion.div>
  );
}
