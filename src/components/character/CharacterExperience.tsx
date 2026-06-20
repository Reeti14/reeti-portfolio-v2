"use client";

import { motion } from "framer-motion";

export default function CharacterExperience() {
  return (
    <div className="relative w-full max-w-[400px] aspect-square mx-auto">
      <svg viewBox="0 0 400 400" className="w-full h-full drop-shadow-md">
        {/* Whiteboard */}
        <rect x="60" y="50" width="280" height="180" rx="4" fill="#f4f1ea" stroke="#d1d5db" strokeWidth="6" />
        <rect x="60" y="230" width="280" height="10" fill="#9ca3af" />
        
        {/* Whiteboard Stand */}
        <path d="M100 240 L80 350" stroke="#d1d5db" strokeWidth="6" strokeLinecap="round" />
        <path d="M300 240 L320 350" stroke="#d1d5db" strokeWidth="6" strokeLinecap="round" />

        {/* Sticky Notes on whiteboard */}
        <rect x="100" y="80" width="30" height="30" fill="#fcd5ce" transform="rotate(-5 115 95)" />
        <rect x="150" y="90" width="30" height="30" fill="#e8a882" transform="rotate(8 165 105)" />
        <rect x="120" y="140" width="30" height="30" fill="#a8b89d" transform="rotate(-2 135 155)" />
        <rect x="200" y="120" width="30" height="30" fill="#fcd5ce" transform="rotate(12 215 135)" />
        <rect x="250" y="85" width="30" height="30" fill="#a8b89d" transform="rotate(-10 265 100)" />

        {/* Character (Girl pointing at whiteboard) */}
        {/* Body */}
        <path d="M190 350 c 0 -50 -20 -80 -40 -80 s -40 30 -40 80" fill="#7a8b6f" />
        
        {/* Head/Face */}
        <circle cx="150" cy="220" r="30" fill="#fcd5ce" />
        
        {/* Curly Hair */}
        <path d="M115 220 c -5 -25 10 -50 35 -55 c 25 -5 45 15 35 45 c 10 15 -5 40 -20 35 c -10 10 -30 10 -40 -5 c -10 -5 -15 -15 -10 -20 z" fill="#3d3528" />
        
        {/* Face details (profile view) */}
        <circle cx="165" cy="220" r="2.5" fill="#3d3528" />
        <path d="M170 225 q 4 2 8 -2" fill="none" stroke="#3d3528" strokeWidth="1.5" strokeLinecap="round" />

        {/* Arm pointing up */}
        <motion.path 
          d="M160 280 q 30 -10 40 -40" 
          fill="none" stroke="#fcd5ce" strokeWidth="10" strokeLinecap="round"
          animate={{ d: ["M160 280 q 30 -10 40 -40", "M160 280 q 40 -20 60 -30", "M160 280 q 30 -10 40 -40"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* The Fox (Watching attentively) */}
        <g transform="translate(260, 310)">
          {/* Fox body sitting */}
          <path d="M0 40 c 0 -20 15 -35 25 -35 c 10 0 20 15 20 35 z" fill="#d97736" />
          {/* White chest */}
          <path d="M15 15 c 0 10 10 25 15 25 c 5 -10 0 -25 -15 -25" fill="#f4f1ea" />
          {/* Fox tail wrapped around */}
          <path d="M45 35 c 15 0 20 5 0 5" fill="#d97736" />
          {/* Fox head looking up */}
          <circle cx="20" cy="10" r="12" fill="#d97736" />
          <path d="M12 0 l -4 -10 l 10 8 z" fill="#d97736" />
          <path d="M28 0 l 4 -10 l -10 8 z" fill="#d97736" />
          {/* Eyes looking up */}
          <circle cx="15" cy="8" r="1.5" fill="#3d3528" />
          <circle cx="25" cy="8" r="1.5" fill="#3d3528" />
        </g>
      </svg>
    </div>
  );
}
