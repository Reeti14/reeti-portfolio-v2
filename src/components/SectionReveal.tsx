"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode, Children } from "react";

interface SectionRevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  stagger?: boolean;
  staggerDelay?: number;
}

export default function SectionReveal({
  children,
  delay = 0,
  className = "",
  stagger = false,
  staggerDelay = 0.08,
}: SectionRevealProps) {
  const shouldReduceMotion = useReducedMotion();

  // When reduced motion is preferred, render immediately without animation
  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  // Stagger mode: wrap each child in its own motion.div with incremental delay
  if (stagger) {
    const childArray = Children.toArray(children);
    return (
      <div className={className}>
        {childArray.map((child, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              duration: 0.5,
              delay: delay + index * staggerDelay,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {child}
          </motion.div>
        ))}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
