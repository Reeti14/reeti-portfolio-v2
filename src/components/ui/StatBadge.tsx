"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useState, useRef } from "react";

export default function StatBadge({ label, value, suffix = "" }: { label: string, value: number, suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const duration = 2000;
      const incrementTime = 30;
      const steps = Math.ceil(duration / incrementTime);
      const stepValue = end / steps;

      const timer = setInterval(() => {
        start += stepValue;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.ceil(start));
        }
      }, incrementTime);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <motion.div
      ref={ref}
      className="flex flex-col items-center justify-center p-5 glass rounded-xl shadow-sm glow-border group hover:shadow-md transition-all duration-300"
      whileHover={{ y: -3, scale: 1.02 }}
    >
      <div className="text-3xl md:text-4xl font-bold text-sage-dark mb-1.5 font-mono group-hover:text-terracotta transition-colors duration-300">
        {count}{suffix}
      </div>
      <div className="text-xs md:text-sm font-medium text-warm-brown uppercase tracking-widest text-center">
        {label}
      </div>
    </motion.div>
  );
}
