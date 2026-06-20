"use client";

import { motion } from "framer-motion";

export default function CharacterContact() {
  return (
    <div className="relative w-full max-w-[400px] aspect-square mx-auto">
      <svg viewBox="0 0 400 400" className="w-full h-full drop-shadow-md">
        {/* Background elements - mailbox / post */}
        <rect x="80" y="200" width="16" height="150" fill="#a68a64" />
        <path d="M50 150 h80 l30 -20 v-40 l-30 -20 h-80 z" fill="#c67b5c" />
        <path d="M130 150 v-80 l30 20 v80 z" fill="#8b5a44" />
        <rect x="60" y="100" width="60" height="40" fill="#f4f1ea" />
        <motion.path 
          d="M140 100 l 15 -30" 
          fill="none" stroke="#e8a882" strokeWidth="6" strokeLinecap="round"
          animate={{ transformOrigin: "140px 100px", rotate: [0, 20, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Character (Girl standing, waving) */}
        {/* Body */}
        <path d="M260 350 c 0 -80 -20 -120 -40 -120 s -40 40 -40 120" fill="#7a8b6f" />
        
        {/* Head */}
        <circle cx="220" cy="180" r="32" fill="#fcd5ce" />
        
        {/* Curly Hair */}
        <path d="M180 180 c -5 -30 15 -60 40 -65 c 25 -5 45 20 35 50 c 10 15 -5 45 -20 40 c -10 10 -30 15 -40 0 c -10 -5 -15 -15 -10 -20 z" fill="#3d3528" />
        
        {/* Face details (smiling eyes) */}
        <path d="M210 185 q 5 -5 10 0" fill="none" stroke="#3d3528" strokeWidth="2" strokeLinecap="round" />
        <path d="M230 185 q 5 -5 10 0" fill="none" stroke="#3d3528" strokeWidth="2" strokeLinecap="round" />
        <path d="M220 195 q 5 5 10 0" fill="none" stroke="#3d3528" strokeWidth="1.5" strokeLinecap="round" />

        {/* Arm waving */}
        <motion.path 
          d="M250 240 q 30 -20 20 -60" 
          fill="none" stroke="#fcd5ce" strokeWidth="10" strokeLinecap="round"
          animate={{ transformOrigin: "250px 240px", rotate: [-10, 10, -10] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Other arm */}
        <path d="M190 240 q -10 30 -5 50" fill="none" stroke="#fcd5ce" strokeWidth="10" strokeLinecap="round" />

        {/* The Fox (Sitting, wagging tail) */}
        <g transform="translate(280, 290)">
          {/* Fox body sitting */}
          <path d="M0 60 c 0 -20 15 -40 25 -40 c 10 0 20 20 20 40 z" fill="#d97736" />
          {/* White chest */}
          <path d="M15 30 c 0 10 10 25 15 25 c 5 -10 0 -25 -15 -25" fill="#f4f1ea" />
          {/* Fox head */}
          <circle cx="20" cy="15" r="14" fill="#d97736" />
          <path d="M10 5 l -5 -12 l 12 8 z" fill="#d97736" />
          <path d="M30 5 l 5 -12 l -12 8 z" fill="#d97736" />
          {/* Happy eyes */}
          <path d="M13 13 q 3 -3 6 0" fill="none" stroke="#3d3528" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M23 13 q 3 -3 6 0" fill="none" stroke="#3d3528" strokeWidth="1.5" strokeLinecap="round" />
          {/* Wagging tail */}
          <motion.path 
            d="M45 55 c 20 0 25 -20 5 -20" 
            fill="#d97736"
            animate={{ transformOrigin: "45px 55px", rotate: [-15, 15, -15] }}
            transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </g>
      </svg>
    </div>
  );
}
