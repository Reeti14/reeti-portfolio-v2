"use client";

import { motion } from "framer-motion";

export default function CharacterOpenSource() {
  return (
    <div className="relative w-full max-w-[400px] aspect-square mx-auto">
      <svg viewBox="0 0 400 400" className="w-full h-full drop-shadow-md">
        {/* Large dual monitors setup */}
        {/* Stand */}
        <rect x="180" y="250" width="40" height="70" fill="#9ca3af" />
        <rect x="140" y="310" width="120" height="10" rx="3" fill="#6b7280" />
        
        {/* Left Monitor (Code) */}
        <rect x="40" y="100" width="150" height="110" rx="4" fill="#374151" transform="rotate(-5 115 155)" />
        <rect x="50" y="110" width="130" height="90" rx="2" fill="#1f2937" transform="rotate(-5 115 155)" />
        {/* Code lines */}
        <motion.rect x="60" y="125" width="80" height="4" rx="2" fill="#10b981" transform="rotate(-5 115 155)" 
          animate={{ opacity: [1, 0.5, 1] }} transition={{ duration: 2, repeat: Infinity }} />
        <rect x="60" y="135" width="100" height="4" rx="2" fill="#60a5fa" transform="rotate(-5 115 155)" />
        <rect x="60" y="145" width="60" height="4" rx="2" fill="#f59e0b" transform="rotate(-5 115 155)" />
        <rect x="60" y="155" width="90" height="4" rx="2" fill="#60a5fa" transform="rotate(-5 115 155)" />
        <motion.rect x="60" y="165" width="70" height="4" rx="2" fill="#ef4444" transform="rotate(-5 115 155)" 
          animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2.5, repeat: Infinity }} />

        {/* Right Monitor (Gerrit/Community) */}
        <rect x="200" y="90" width="160" height="120" rx="4" fill="#d1d5db" transform="rotate(5 280 150)" />
        <rect x="210" y="100" width="140" height="100" rx="2" fill="#f3f4f6" transform="rotate(5 280 150)" />
        {/* Community UI blocks */}
        <rect x="220" y="115" width="120" height="20" rx="2" fill="#e5e7eb" transform="rotate(5 280 150)" />
        <rect x="220" y="145" width="50" height="40" rx="2" fill="#e5e7eb" transform="rotate(5 280 150)" />
        <rect x="280" y="145" width="60" height="40" rx="2" fill="#e5e7eb" transform="rotate(5 280 150)" />

        {/* Character (Girl leaning forward) */}
        {/* Body */}
        <path d="M160 360 c 0 -60 20 -100 40 -100 s 40 40 40 100" fill="#7a8b6f" />
        
        {/* Head */}
        <circle cx="200" cy="220" r="35" fill="#fcd5ce" />
        
        {/* Curly Hair */}
        <path d="M160 220 c -10 -30 10 -60 40 -65 c 30 -5 50 20 40 50 c 15 20 -5 50 -20 40 c -10 15 -35 15 -45 -5 c -15 0 -20 -15 -15 -20 z" fill="#3d3528" />
        
        {/* Headphones */}
        <path d="M160 220 a 40 40 0 0 1 80 0" fill="none" stroke="#6b5b4a" strokeWidth="6" />
        <rect x="155" y="210" width="15" height="25" rx="5" fill="#e8a882" />
        <rect x="230" y="210" width="15" height="25" rx="5" fill="#e8a882" />

        {/* The Fox (Pawing at the screen) */}
        <g transform="translate(260, 210)">
          {/* Fox body reaching up */}
          <path d="M20 100 c -10 -20 0 -40 10 -50 c 10 -10 20 0 20 20 z" fill="#d97736" />
          {/* Fox head */}
          <circle cx="25" cy="40" r="12" fill="#d97736" />
          {/* Ears */}
          <path d="M15 30 l -5 -12 l 12 8 z" fill="#d97736" />
          <path d="M35 30 l 5 -12 l -12 8 z" fill="#d97736" />
          {/* Paws reaching */}
          <motion.path 
            d="M20 50 q -10 -20 -15 -40" 
            fill="none" stroke="#d97736" strokeWidth="5" strokeLinecap="round"
            animate={{ d: ["M20 50 q -10 -20 -15 -40", "M20 50 q -5 -25 -5 -40", "M20 50 q -10 -20 -15 -40"] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.path 
            d="M30 50 q 10 -20 15 -35" 
            fill="none" stroke="#d97736" strokeWidth="5" strokeLinecap="round"
            animate={{ d: ["M30 50 q 10 -20 15 -35", "M30 50 q 0 -25 5 -40", "M30 50 q 10 -20 15 -35"] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.75, ease: "easeInOut" }}
          />
        </g>
      </svg>
    </div>
  );
}
