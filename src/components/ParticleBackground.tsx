"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

type Shape = "circle" | "star" | "diamond" | "triangle";

interface Particle {
  id: number;
  left: number;
  size: number;
  delay: number;
  duration: number;
  opacity: number;
  shape: Shape;
}

function getShapeStyles(shape: Shape): React.CSSProperties {
  switch (shape) {
    case "circle":
      return {
        borderRadius: "50%",
        background: "var(--color-sage-light)",
      };
    case "star":
      return {
        borderRadius: "0",
        background: "var(--color-terracotta-light)",
        transform: "rotate(45deg)",
      };
    case "diamond":
      return {
        borderRadius: "2px",
        background: "var(--color-sage)",
        transform: "rotate(45deg)",
      };
    case "triangle":
      return {
        width: 0,
        height: 0,
        background: "transparent",
        borderLeft: "3px solid transparent",
        borderRight: "3px solid transparent",
        borderBottom: "6px solid var(--color-terracotta-light)",
      };
  }
}

export default function ParticleBackground() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(motionQuery.matches);
    const handleMotionChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    motionQuery.addEventListener("change", handleMotionChange);

    const mobileQuery = window.matchMedia("(max-width: 768px)");
    setIsMobile(mobileQuery.matches);
    const handleMobileChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mobileQuery.addEventListener("change", handleMobileChange);

    return () => {
      motionQuery.removeEventListener("change", handleMotionChange);
      mobileQuery.removeEventListener("change", handleMobileChange);
    };
  }, []);

  // Skip rendering entirely when reduced motion is preferred
  if (prefersReducedMotion) return null;

  const shapes: Shape[] = ["circle", "star", "diamond", "triangle"];
  const count = isMobile ? 10 : 25;

  const { scrollY } = useScroll();
  const smoothVelocity = useSpring(scrollY, { damping: 50, stiffness: 400 });
  // Particles move up slightly faster when scrolling down
  const yOffset = useTransform(smoothVelocity, [0, 5000], [0, -500]);

  const [particles] = useState<Particle[]>(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: Math.random() * 4 + 2,
      delay: Math.random() * 15,
      duration: Math.random() * 15 + 15,
      opacity: Math.random() * 0.3 + 0.1,
      shape: shapes[Math.floor(Math.random() * shapes.length)],
    }))
  );

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute"
          style={{
            left: `${p.left}%`,
            bottom: "-10px",
            width: p.shape === "triangle" ? undefined : `${p.size}px`,
            height: p.shape === "triangle" ? undefined : `${p.size}px`,
            opacity: p.opacity,
            animation: `drift ${p.duration}s linear ${p.delay}s infinite`,
            y: useTransform(yOffset, value => value * (p.size / 5)), // larger particles move faster
            ...getShapeStyles(p.shape),
          }}
        />
      ))}
    </div>
  );
}
