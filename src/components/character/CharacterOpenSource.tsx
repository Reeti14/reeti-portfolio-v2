import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

export default function CharacterOpenSource() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Smooth out mouse tracking with spring physics for an organic feel
  const springConfig = { damping: 20, stiffness: 90, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);
  
  // 3D Rotation based on mouse
  const rotateX = useTransform(smoothY, [-150, 150], [8, -8]);
  const rotateY = useTransform(smoothX, [-150, 150], [-8, 8]);
  
  // Opposite direction parallax shift
  const parallaxX = useTransform(smoothX, [-150, 150], [20, -20]);
  const parallaxY = useTransform(smoothY, [-150, 150], [20, -20]);

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
      className="relative w-full max-w-[420px] mx-auto cursor-pointer select-none"
      style={{ perspective: 1200 }}
      onMouseMove={handleMouse}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ type: "spring", bounce: 0.4, duration: 1.2 }}
    >
      {/* Dynamic Floor Shadow */}
      <motion.div 
        className="absolute bottom-0 left-[20%] right-[20%] h-4 bg-black/10 rounded-[100%] blur-md"
        animate={{ scale: [1, 0.8, 1], opacity: [0.4, 0.2, 0.4] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Background Particles Specific to Section */}

        {/* Tech Nodes & Connections */}
        <motion.div
          className="absolute top-[30%] left-[10%] w-4 h-4 rounded-full bg-[#B19CD9] shadow-[0_0_15px_#B19CD9] opacity-70"
          animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-[50%] right-[15%] w-6 h-6 rounded-full bg-[#7AB8A4] shadow-[0_0_15px_#7AB8A4] opacity-60"
          animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <svg className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
          <motion.line x1="15%" y1="32%" x2="50%" y2="50%" stroke="#B19CD9" strokeWidth="2" strokeDasharray="4 4" 
            animate={{ strokeDashoffset: [0, -20] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} />
          <motion.line x1="85%" y1="52%" x2="50%" y2="50%" stroke="#7AB8A4" strokeWidth="2" strokeDasharray="4 4" 
            animate={{ strokeDashoffset: [0, 20] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} />
        </svg>

      <motion.div style={{ rotateX, rotateY, x: parallaxX, y: parallaxY }} className="w-full h-full flex justify-center items-center relative z-10">
        <motion.img
          src="/images/characters/hero-character.open-source.png"
          alt="Reeti 3D character open source"
          className="w-full h-auto"
          animate={{ 
            y: [0, -18, 0],
            rotateZ: [-1.5, 1.5, -1.5],
            filter: [
              "drop-shadow(0px 10px 15px rgba(0,0,0,0.15))", 
              "drop-shadow(0px 30px 25px rgba(0,0,0,0.25))", 
              "drop-shadow(0px 10px 15px rgba(0,0,0,0.15))"
            ]
          }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          whileHover={{ scale: 1.05, filter: "drop-shadow(0px 20px 20px rgba(0,0,0,0.3))" }}
        />
      </motion.div>
    </motion.div>
  );
}
