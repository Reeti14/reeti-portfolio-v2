"use client";

import { motion } from "framer-motion";

export default function CharacterHome() {
  return (
    <div className="relative w-full max-w-[400px] aspect-square mx-auto">
      <svg viewBox="0 0 400 400" className="w-full h-full drop-shadow-md">
        {/* Desk */}
        <rect x="40" y="280" width="320" height="20" rx="4" fill="#a68a64" />
        <rect x="60" y="300" width="16" height="100" fill="#8a6e4d" />
        <rect x="320" y="300" width="16" height="100" fill="#8a6e4d" />

        {/* Laptop */}
        <rect x="120" y="210" width="100" height="70" rx="4" fill="#d1d5db" />
        <rect x="100" y="275" width="140" height="8" rx="2" fill="#9ca3af" />
        
        {/* Monitor glowing screen */}
        <rect x="125" y="215" width="90" height="60" rx="2" fill="#f4f1ea" />
        <motion.rect 
          x="135" y="225" width="12" height="4" rx="2" fill="#7a8b6f"
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />

        {/* Coffee Mug */}
        <path d="M250 250 h20 v25 a5 5 0 0 1 -5 5 h-10 a5 5 0 0 1 -5 -5 v-25" fill="#c67b5c" />
        <path d="M270 255 h5 a5 5 0 0 1 5 5 v5 a5 5 0 0 1 -5 5 h-5" fill="none" stroke="#c67b5c" strokeWidth="3" />
        
        {/* Steam */}
        <motion.path 
          d="M255 240 Q 260 230 255 220 T 260 200" 
          fill="none" stroke="#ece8dc" strokeWidth="2" strokeLinecap="round"
          animate={{ y: [-5, -15], opacity: [0, 0.6, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.path 
          d="M265 245 Q 260 235 265 225 T 260 205" 
          fill="none" stroke="#ece8dc" strokeWidth="2" strokeLinecap="round"
          animate={{ y: [-5, -15], opacity: [0, 0.5, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, delay: 0.5, ease: "easeInOut" }}
        />

        {/* Character (Girl) */}
        {/* Body */}
        <path d="M170 280 c 0 -40 -30 -60 -60 -60 s -60 20 -60 60" fill="#7a8b6f" />
        
        {/* Head/Face */}
        <circle cx="110" cy="190" r="35" fill="#fcd5ce" />
        
        {/* Curly Hair (Abstract shapes) */}
        <path d="M70 190 c -10 -30 10 -60 40 -65 c 30 -5 50 20 40 50 c 15 20 -5 50 -20 40 c -10 15 -35 15 -45 -5 c -15 0 -20 -15 -15 -20 z" fill="#3d3528" />
        
        {/* Face details */}
        <circle cx="120" cy="190" r="3" fill="#3d3528" />
        <path d="M125 195 q 5 3 10 0" fill="none" stroke="#3d3528" strokeWidth="2" strokeLinecap="round" />
        
        {/* Arms typing */}
        <motion.path 
          d="M95 230 q 20 30 50 45" 
          fill="none" stroke="#fcd5ce" strokeWidth="12" strokeLinecap="round"
          animate={{ d: ["M95 230 q 20 30 50 45", "M95 230 q 20 35 45 45", "M95 230 q 20 30 50 45"] }}
          transition={{ duration: 0.4, repeat: Infinity }}
        />
        <motion.path 
          d="M120 230 q 20 25 40 45" 
          fill="none" stroke="#fcd5ce" strokeWidth="12" strokeLinecap="round"
          animate={{ d: ["M120 230 q 20 25 40 45", "M120 230 q 15 30 45 45", "M120 230 q 20 25 40 45"] }}
          transition={{ duration: 0.5, repeat: Infinity, delay: 0.1 }}
        />

        {/* The Fox (Napping) */}
        <g transform="translate(280, 260)">
          {/* Fox body */}
          <path d="M0 20 c 0 -15 20 -20 30 -10 c 10 10 -5 10 -30 10 z" fill="#d97736" />
          {/* Fox tail curled around */}
          <path d="M30 10 c 15 -5 20 10 0 10" fill="#d97736" />
          <path d="M20 15 c 5 0 10 0 10 5" fill="#f4f1ea" /> {/* White tail tip */}
          {/* Fox ear */}
          <path d="M5 5 l 5 -10 l 5 10 z" fill="#d97736" />
          {/* Sleepy eye */}
          <path d="M5 12 q 3 -3 6 0" fill="none" stroke="#3d3528" strokeWidth="1.5" strokeLinecap="round" />
          {/* Zzz animation */}
          <motion.text 
            x="15" y="0" fontSize="12" fill="#9a9080" fontFamily="monospace"
            animate={{ y: [-5, -15], opacity: [0, 1, 0] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >z</motion.text>
          <motion.text 
            x="25" y="-5" fontSize="16" fill="#9a9080" fontFamily="monospace"
            animate={{ y: [-5, -20], opacity: [0, 1, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
          >Z</motion.text>
        </g>
      </svg>
    </div>
  );
}
