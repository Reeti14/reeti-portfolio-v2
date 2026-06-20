import { projects } from "@/lib/data";
import SectionReveal from "@/components/SectionReveal";
import ProjectCard from "@/components/ui/ProjectCard";
import CharacterProjects from "@/components/character/CharacterProjects";

export default function Projects() {
  return (
    <div className="pt-8 lg:pt-16 max-w-5xl mx-auto w-full">
      <div className="flex flex-col lg:flex-row items-center gap-10 mb-16">
        <div className="w-full max-w-sm order-2 lg:order-1">
          <SectionReveal delay={0.2}>
            <CharacterProjects />
          </SectionReveal>
        </div>
        <div className="flex-1 order-1 lg:order-2">
          <SectionReveal>
            <h1 className="text-4xl md:text-5xl font-bold text-sage-dark mb-4">
              My Work.
            </h1>
            <p className="text-lg text-text-muted leading-relaxed">
              A collection of systems I've built, ranging from real-time logistics dashboards to machine learning models for agricultural disease detection.
            </p>
          </SectionReveal>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
        {projects.map((project, index) => (
          <SectionReveal key={project.id} delay={0.1 * index}>
            <ProjectCard project={project} />
          </SectionReveal>
        ))}
      </div>
    </div>
  );
}
