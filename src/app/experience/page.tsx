import { experiences } from "@/lib/data";
import SectionReveal from "@/components/SectionReveal";
import ExperienceCard from "@/components/ui/ExperienceCard";
import CharacterExperience from "@/components/character/CharacterExperience";

export default function Experience() {
  return (
    <div className="pt-8 lg:pt-16 max-w-5xl mx-auto w-full">
      <div className="flex flex-col lg:flex-row items-center gap-10 mb-20">
        <div className="flex-1">
          <SectionReveal>
            <h1 className="text-4xl md:text-5xl font-bold text-sage-dark mb-4">
              My Journey.
            </h1>
            <p className="text-lg text-text-muted leading-relaxed">
              I've had the opportunity to tackle complex problems across different domains—from digitizing historical texts to automating warehouse logistics. Here's how I approached them.
            </p>
          </SectionReveal>
        </div>
        <div className="w-full max-w-sm">
          <SectionReveal delay={0.2}>
            <CharacterExperience />
          </SectionReveal>
        </div>
      </div>

      <div className="relative mt-12 w-full">
        {/* Timeline Center Line (Desktop) */}
        <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-sage-light/30" />

        <div className="flex flex-col w-full relative z-10">
          {experiences.map((exp, index) => (
            <ExperienceCard key={exp.id} experience={exp} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
