import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

export default function CharacterExperience() {
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

        {/* Floating Sticky Notes & Stars */}
        <motion.div
          className="absolute top-[25%] right-[15%] w-10 h-10 bg-[#E8A882] rounded shadow-md opacity-60"
          animate={{ y: [0, -15, 0], rotate: [10, 25, 10] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-[65%] left-[12%] w-12 h-12 bg-[#7AB8A4] rounded shadow-md opacity-50"
          animate={{ y: [0, 20, 0], rotate: [-15, 5, -15] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.div
          className="absolute top-[40%] left-[20%] text-[#B19CD9] text-2xl font-bold"
          animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        >✦</motion.div>

      <motion.div style={{ rotateX, rotateY, x: parallaxX, y: parallaxY }} className="w-full h-full flex justify-center items-center relative z-10">
        <motion.img
          src="/images/characters/hero-character.experience.png"
          alt="Reeti 3D character experience"
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
