"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

export default function CharacterProjects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-150, 150], [5, -5]);
  const rotateY = useTransform(mouseX, [-150, 150], [-5, 5]);

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - (rect.left + rect.width / 2));
    mouseY.set(e.clientY - (rect.top + rect.height / 2));
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={containerRef}
      className="relative w-full max-w-[420px] mx-auto cursor-pointer"
      style={{ perspective: 800, rotateX, rotateY }}
      onMouseMove={handleMouse}
      onMouseLeave={handleMouseLeave}
      animate={{ scale: [1, 1.015, 1] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
    >
      <Image
        src="/characters/projects.png"
        alt="Reeti sitting cross-legged sketching on a tablet with her fox companion curled up sleeping beside her"
        width={840}
        height={840}
        className="w-full h-auto drop-shadow-lg"
      />

      {/* Zzz sleep bubbles floating up from the fox */}
      {["z", "z", "z"].map((letter, i) => (
        <motion.span
          key={i}
          className="absolute font-mono font-bold pointer-events-none select-none"
          style={{
            bottom: `${32 + i * 2}%`,
            right: `${25 + i * 5}%`,
            fontSize: `${10 + i * 3}px`,
            color: "rgba(122, 139, 111, 0.5)",
          }}
          animate={{
            y: [0, -20 - i * 8],
            x: [0, 5 + i * 3],
            opacity: [0, 0.7, 0],
            rotate: [0, 10 + i * 5],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.8,
            ease: "easeOut",
          }}
        >
          {letter}
        </motion.span>
      ))}

      {/* Pencil sparkle glow near the tablet */}
      <motion.div
        className="absolute bottom-[42%] left-[40%] w-3 h-3 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(232, 168, 130, 0.6) 0%, transparent 70%)",
        }}
        animate={{
          opacity: [0.3, 0.8, 0.3],
          scale: [0.8, 1.3, 0.8],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
}
