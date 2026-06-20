"use client";

import { motion } from "framer-motion";
import SkillTag from "./SkillTag";

interface ExperienceProps {
  experience: {
    id: string;
    role: string;
    company: string;
    date: string;
    problem: string;
    approach: string;
    impact: string;
    metrics: string[];
  };
  index: number;
}

export default function ExperienceCard({ experience, index }: ExperienceProps) {
  const isEven = index % 2 === 0;

  return (
    <div className={`relative flex items-center justify-between md:justify-normal w-full mb-16 ${isEven ? 'md:flex-row-reverse' : ''}`}>
      
      {/* Center timeline dot (hidden on mobile, visible on md+) */}
      <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-terracotta border-4 border-cream z-20" />
      
      {/* Empty space for the other side of the timeline on desktop */}
      <div className="hidden md:block w-5/12" />

      {/* Card Content */}
      <motion.div 
        className="w-full md:w-5/12 z-10"
        initial={{ opacity: 0, x: isEven ? 50 : -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
      >
        <div className="bg-cream-dark p-6 rounded-xl border border-sage-light/20 shadow-sm relative group hover:shadow-md transition-shadow">
          
          {/* Connector arrow (desktop) */}
          <div className={`hidden md:block absolute top-6 w-0 h-0 border-y-8 border-y-transparent ${isEven ? 'right-full border-r-[12px] border-r-cream-dark' : 'left-full border-l-[12px] border-l-cream-dark'}`} />
          
          <div className="flex flex-col gap-1 mb-4">
            <span className="font-mono text-xs text-terracotta tracking-wider">{experience.date}</span>
            <h3 className="text-xl font-bold text-sage-dark">{experience.role}</h3>
            <span className="text-sm font-medium text-warm-brown/80">{experience.company}</span>
          </div>

          <div className="space-y-3 text-sm text-text-muted leading-relaxed mb-5">
            <p><strong className="text-warm-brown font-medium">The Challenge:</strong> {experience.problem}</p>
            <p><strong className="text-warm-brown font-medium">My Approach:</strong> {experience.approach}</p>
            <p><strong className="text-warm-brown font-medium">The Impact:</strong> {experience.impact}</p>
          </div>

          <div className="flex flex-wrap gap-2 pt-4 border-t border-sage-light/10">
            {experience.metrics.map(metric => (
              <SkillTag key={metric} label={metric} />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
