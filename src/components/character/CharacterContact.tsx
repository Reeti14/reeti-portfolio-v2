"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const hearts = [
  { bottom: "55%", right: "15%", size: 10, delay: 0 },
  { bottom: "60%", right: "25%", size: 8, delay: 1.2 },
  { bottom: "50%", right: "8%", size: 12, delay: 2.5 },
  { bottom: "58%", right: "18%", size: 7, delay: 3.8 },
];

export default function CharacterContact() {
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
      animate={{
        scale: [1, 1.015, 1],
        rotate: [-0.5, 0.5, -0.5],
      }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
    >
      <Image
        src="/characters/contact.png"
        alt="Reeti standing and waving happily with her fox companion wagging its tail beside her"
        width={840}
        height={840}
        className="w-full h-auto drop-shadow-lg"
      />

      {/* Floating hearts */}
      {hearts.map((heart, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none select-none"
          style={{
            bottom: heart.bottom,
            right: heart.right,
          }}
          animate={{
            y: [0, -30 - i * 8],
            x: [0, (i % 2 === 0 ? 5 : -5)],
            opacity: [0, 0.8, 0],
            scale: [0.3, 1, 0.5],
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            delay: heart.delay,
            ease: "easeOut",
          }}
        >
          <svg width={heart.size} height={heart.size} viewBox="0 0 24 24" fill="rgba(198, 123, 92, 0.6)">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </motion.div>
      ))}
    </motion.div>
  );
}
