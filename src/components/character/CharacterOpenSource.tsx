"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const codeChars = ["<", ">", "/", "{", "}", ";", "=", "()"];

export default function CharacterOpenSource() {
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
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
    >
      <Image
        src="/characters/opensource.png"
        alt="Reeti at dual monitors with headphones coding, with her fox companion pawing at the screen"
        width={840}
        height={840}
        className="w-full h-auto drop-shadow-lg"
      />

      {/* Code rain — falling code characters */}
      {codeChars.slice(0, 5).map((char, i) => (
        <motion.span
          key={i}
          className="absolute font-mono text-[10px] pointer-events-none select-none"
          style={{
            left: `${10 + i * 18}%`,
            top: "10%",
            color: "rgba(122, 139, 111, 0.35)",
          }}
          animate={{
            y: [0, 80],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: 3.5 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.6,
            ease: "linear",
          }}
        >
          {char}
        </motion.span>
      ))}

      {/* Screen glow — pulsing light from monitor */}
      <motion.div
        className="absolute top-[20%] left-[30%] w-[40%] h-[25%] rounded-xl pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(122, 139, 111, 0.15) 0%, transparent 70%)",
        }}
        animate={{
          opacity: [0.3, 0.7, 0.3],
          scale: [0.95, 1.05, 0.95],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
}
