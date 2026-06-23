"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

export default function CharacterHome() {
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
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    >
      <Image
        src="/characters/home.png"
        alt="Reeti sitting at her desk coding with her fox companion napping beside the laptop"
        width={840}
        height={840}
        className="w-full h-auto drop-shadow-lg"
        priority
      />

      {/* Coffee Steam — 3 animated wisps above the mug area */}
      <div className="absolute bottom-[38%] left-[22%] w-8 h-12 pointer-events-none">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: 3 + i * 1.5,
              height: 3 + i * 1.5,
              left: `${30 + i * 15}%`,
              bottom: 0,
              background: "rgba(168, 184, 157, 0.5)",
            }}
            animate={{
              y: [-0, -18 - i * 4],
              x: [0, (i - 1) * 3],
              opacity: [0, 0.6, 0],
              scale: [0.5, 1.5],
            }}
            transition={{
              duration: 2.5 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.7,
              ease: "easeOut",
            }}
          />
        ))}
      </div>

      {/* Blinking Cursor on laptop screen */}
      <motion.div
        className="absolute bottom-[44%] left-[48%] w-[3px] h-3 bg-sage-light rounded-sm pointer-events-none"
        animate={{ opacity: [1, 1, 0, 0] }}
        transition={{ duration: 1, repeat: Infinity, times: [0, 0.49, 0.5, 1] }}
      />

      {/* Ambient sparkle dots */}
      {[
        { top: "15%", right: "10%", delay: 0 },
        { top: "30%", left: "8%", delay: 1.5 },
        { bottom: "25%", right: "15%", delay: 3 },
      ].map((pos, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full bg-terracotta-light pointer-events-none"
          style={{ top: pos.top, bottom: pos.bottom, left: pos.left, right: pos.right }}
          animate={{
            opacity: [0, 0.7, 0],
            scale: [0.5, 1.2, 0.5],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: pos.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </motion.div>
  );
}

