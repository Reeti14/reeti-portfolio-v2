import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

export default function CharacterProjects() {
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

        {/* Sleeping Zzz's and Bubbles */}
        <motion.div
          className="absolute top-[20%] right-[25%] text-[#7AB8A4] text-2xl font-bold opacity-60"
          animate={{ y: [0, -30], x: [0, 15], opacity: [0, 0.8, 0], scale: [0.8, 1.2] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeOut" }}
        >Z</motion.div>
        <motion.div
          className="absolute top-[35%] right-[15%] text-[#7AB8A4] text-4xl font-bold opacity-40"
          animate={{ y: [0, -40], x: [0, 25], opacity: [0, 0.6, 0], scale: [0.5, 1.5] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeOut", delay: 1.5 }}
        >Z</motion.div>
        <motion.div
          className="absolute bottom-[20%] left-[15%] w-8 h-8 rounded-full border-2 border-[#C8A2A8] opacity-30"
          animate={{ y: [0, -50], opacity: [0, 0.5, 0], scale: [1, 1.5] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeOut", delay: 0.5 }}
        />

      <motion.div style={{ rotateX, rotateY, x: parallaxX, y: parallaxY }} className="w-full h-full flex justify-center items-center relative z-10">
        <motion.img
          src="/images/characters/hero-character.projects.png"
          alt="Reeti 3D character projects"
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
