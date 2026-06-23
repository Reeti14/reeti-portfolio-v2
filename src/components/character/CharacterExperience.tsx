"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const stickyNotes = [
  { color: "rgba(198, 123, 92, 0.25)", top: "18%", right: "20%", rotate: -8, delay: 0 },
  { color: "rgba(122, 139, 111, 0.25)", top: "28%", right: "12%", rotate: 5, delay: 1.2 },
  { color: "rgba(232, 168, 130, 0.2)", top: "22%", right: "30%", rotate: 12, delay: 2.4 },
];

export default function CharacterExperience() {
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
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
    >
      <Image
        src="/characters/experience.png"
        alt="Reeti standing at a whiteboard with sticky notes, pointing and explaining, with her fox companion watching"
        width={840}
        height={840}
        className="w-full h-auto drop-shadow-lg"
      />

      {/* Floating sticky notes near whiteboard */}
      {stickyNotes.map((note, i) => (
        <motion.div
          key={i}
          className="absolute w-5 h-5 rounded-sm pointer-events-none"
          style={{
            background: note.color,
            top: note.top,
            right: note.right,
            border: `1px solid ${note.color}`,
          }}
          animate={{
            y: [0, -6, 0],
            rotate: [note.rotate, note.rotate + 4, note.rotate],
            opacity: [0.6, 0.9, 0.6],
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            delay: note.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Pointer sparkle near the hand */}
      <motion.div
        className="absolute top-[35%] left-[55%] pointer-events-none"
        animate={{
          opacity: [0, 1, 0],
          scale: [0.3, 1, 0.3],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2l2.09 6.26L20 9.27l-4.91 3.78L16.18 20 12 16.77 7.82 20l1.09-6.95L4 9.27l5.91-1.01L12 2z"
            fill="rgba(198, 123, 92, 0.6)"
          />
        </svg>
      </motion.div>
    </motion.div>
  );
}
