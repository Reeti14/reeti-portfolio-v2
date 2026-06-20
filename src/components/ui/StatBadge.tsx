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
      const duration = 2000; // 2s
      const incrementTime = 30; // ms
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
    <div ref={ref} className="flex flex-col items-center justify-center p-4 bg-cream border border-sage-light/20 rounded-lg shadow-sm">
      <div className="text-3xl md:text-4xl font-bold text-sage-dark mb-1 font-mono">
        {count}{suffix}
      </div>
      <div className="text-xs md:text-sm font-medium text-warm-brown uppercase tracking-widest text-center">
        {label}
      </div>
    </div>
  );
}
