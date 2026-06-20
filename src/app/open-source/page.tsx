import { openSourceData } from "@/lib/data";
import SectionReveal from "@/components/SectionReveal";
import StatBadge from "@/components/ui/StatBadge";
import CharacterOpenSource from "@/components/character/CharacterOpenSource";

export default function OpenSource() {
  return (
    <div className="pt-8 lg:pt-16 max-w-5xl mx-auto w-full">
      <div className="flex flex-col lg:flex-row items-center gap-10 mb-16">
        <div className="flex-1">
          <SectionReveal>
            <h1 className="text-4xl md:text-5xl font-bold text-sage-dark mb-6">
              Open Source & Community.
            </h1>
            <div className="p-6 bg-cream-dark border-l-4 border-terracotta rounded-r-xl shadow-sm">
              <p className="text-lg text-text-muted italic leading-relaxed">
                "{openSourceData.quote}"
              </p>
            </div>
          </SectionReveal>
        </div>
        <div className="w-full max-w-sm">
          <SectionReveal delay={0.2}>
            <CharacterOpenSource />
          </SectionReveal>
        </div>
      </div>

      <SectionReveal delay={0.3}>
        <div className="grid grid-cols-3 gap-4 mb-16">
          {openSourceData.stats.map((stat, index) => (
            <StatBadge key={index} label={stat.label} value={stat.value} suffix={stat.suffix} />
          ))}
        </div>
      </SectionReveal>

      <div className="grid md:grid-cols-2 gap-10">
        <SectionReveal delay={0.4}>
          <h2 className="text-2xl font-bold text-sage-dark mb-6">Building the Free Knowledge Ecosystem</h2>
          <div className="prose prose-sage prose-p:text-text-muted prose-p:leading-relaxed">
            <p>
              My heart lies in the open-source world, particularly within the Wikimedia Foundation's MediaWiki ecosystem. I regularly contribute technical code, track bugs via Phabricator, and submit patch sets through Gerrit.
            </p>
            <p>
              I am incredibly proud to have 8 of my 9 tasks successfully merged, maintaining an 88% patch acceptance rate across repositories that serve millions of Wikipedia users globally. Beyond writing code, I authored internationalization (i18n) technical documentation that was merged into MediaWiki core and formally cited in the FY25-26 Wikimedia Language Usability Annual Summary.
            </p>
            <p>
              But the most rewarding part of this ecosystem isn't just the code—it's mentoring new contributors and helping them navigate their first open-source commits.
            </p>
          </div>
        </SectionReveal>

        <SectionReveal delay={0.5}>
          <h2 className="text-2xl font-bold text-sage-dark mb-6">Grassroots Leadership</h2>
          <div className="space-y-4">
            {openSourceData.roles.map((role, index) => {
              const isGDG = role.org.includes("GDG");
              return (
                <div key={index} className={`p-4 rounded-lg border ${isGDG ? 'bg-white border-[#4285F4]/20 shadow-[0_2px_10px_rgba(66,133,244,0.08)]' : 'bg-cream-dark border-sage-light/20'}`}>
                  <div className="flex justify-between items-baseline mb-2">
                    <h3 className="font-bold text-text-primary">{role.title}</h3>
                    <span className={`text-sm font-medium ${isGDG ? 'text-[#EA4335]' : 'text-terracotta'}`}>{role.org}</span>
                  </div>
                  <p className="text-sm text-text-muted leading-relaxed">{role.desc}</p>
                </div>
              );
            })}
          </div>
        </SectionReveal>
      </div>
    </div>
  );
}
