"use client";

import { motion } from "framer-motion";
import SkillTag from "./SkillTag";

interface ProjectProps {
  project: {
    id: string;
    title: string;
    description: string;
    tech: string[];
    link: string | null;
    github: string | null;
  }
}

export default function ProjectCard({ project }: ProjectProps) {
  return (
    <motion.div 
      className="group relative flex flex-col h-full bg-cream-dark border border-sage-light/20 rounded-xl overflow-hidden shadow-sm transition-all hover:shadow-md"
      whileHover={{ y: -5 }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-sage-light/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <div className="p-6 flex flex-col flex-grow relative z-10">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-sage-dark">{project.title}</h3>
          
          <div className="flex gap-2">
            {project.github && project.github !== "#" && (
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="p-1.5 text-sage hover:text-terracotta hover:bg-cream rounded transition-colors" aria-label="GitHub Repository">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
              </a>
            )}
            {project.link && project.link !== "#" && (
              <a href={project.link} target="_blank" rel="noopener noreferrer" className="p-1.5 text-sage hover:text-terracotta hover:bg-cream rounded transition-colors" aria-label="Live Demo">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
              </a>
            )}
          </div>
        </div>
        
        <p className="text-sm text-text-muted mb-6 flex-grow leading-relaxed">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-sage-light/10">
          {project.tech.map((t) => (
            <SkillTag key={t} label={t} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
