"use client";

import { motion } from "framer-motion";

export default function CharacterProjects() {
  return (
    <div className="relative w-full max-w-[400px] aspect-square mx-auto">
      <svg viewBox="0 0 400 400" className="w-full h-full drop-shadow-md">
        {/* Soft rug/floor area */}
        <ellipse cx="200" cy="350" rx="150" ry="40" fill="#ece8dc" />

        {/* Character (Girl sitting on floor, sketching) */}
        {/* Legs crossed */}
        <path d="M120 340 q 40 30 80 0 q 40 -30 80 0 q 10 10 -20 20 q -60 20 -140 0 z" fill="#7a8b6f" />
        
        {/* Body */}
        <path d="M160 340 c 0 -50 10 -90 40 -90 s 40 40 40 90 z" fill="#a8b89d" />
        
        {/* Head */}
        <circle cx="200" cy="200" r="32" fill="#fcd5ce" />
        
        {/* Curly Hair */}
        <path d="M165 200 c -5 -30 15 -55 40 -60 c 25 -5 45 15 35 45 c 10 15 -5 40 -20 35 c -10 10 -30 10 -40 -5 c -10 -5 -15 -15 -10 -15 z" fill="#3d3528" />
        
        {/* Face details (looking down) */}
        <path d="M190 205 q 5 3 10 0" fill="none" stroke="#3d3528" strokeWidth="2" strokeLinecap="round" />
        
        {/* Tablet on lap */}
        <rect x="155" y="270" width="90" height="60" rx="4" fill="#374151" transform="rotate(-15 200 300)" />
        <rect x="165" y="280" width="70" height="40" rx="2" fill="#f4f1ea" transform="rotate(-15 200 300)" />

        {/* Arm sketching */}
        <motion.path 
          d="M230 250 q 20 20 -10 40" 
          fill="none" stroke="#fcd5ce" strokeWidth="10" strokeLinecap="round"
          animate={{ d: ["M230 250 q 20 20 -10 40", "M230 250 q 25 15 -5 35", "M230 250 q 15 25 -15 45", "M230 250 q 20 20 -10 40"] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* The Fox (Curled up on lap/beside) */}
        <g transform="translate(130, 290)">
          {/* Curled fox body */}
          <circle cx="30" cy="30" r="25" fill="#d97736" />
          <path d="M10 40 c -10 -10 -5 -25 10 -30 c 15 -5 25 5 15 15" fill="#d97736" />
          <path d="M20 35 c 5 0 10 0 10 5" fill="#f4f1ea" /> {/* White tail tip */}
          {/* Sleeping head */}
          <circle cx="20" cy="15" r="10" fill="#d97736" />
          <path d="M10 15 l 5 -8 l 8 5 z" fill="#d97736" />
          <path d="M15 15 q 3 -2 5 0" fill="none" stroke="#3d3528" strokeWidth="1" strokeLinecap="round" />
        </g>
        
        {/* Floating creative elements (stars/sparkles) */}
        <motion.path d="M120 150 l 5 -10 l 5 10 l 10 5 l -10 5 l -5 10 l -5 -10 l -10 -5 z" fill="#e8a882" 
          animate={{ scale: [0, 1, 0], opacity: [0, 1, 0], rotate: [0, 90] }} transition={{ duration: 3, repeat: Infinity, delay: 0.5 }} />
        <motion.path d="M280 180 l 3 -6 l 3 6 l 6 3 l -6 3 l -3 6 l -3 -6 l -6 -3 z" fill="#a8b89d" 
          animate={{ scale: [0, 1, 0], opacity: [0, 1, 0], rotate: [0, 90] }} transition={{ duration: 2.5, repeat: Infinity, delay: 1.5 }} />
        <motion.path d="M250 120 l 4 -8 l 4 8 l 8 4 l -8 4 l -4 8 l -4 -8 l -8 -4 z" fill="#c67b5c" 
          animate={{ scale: [0, 1, 0], opacity: [0, 1, 0], rotate: [0, 90] }} transition={{ duration: 4, repeat: Infinity, delay: 0 }} />
      </svg>
    </div>
  );
}
