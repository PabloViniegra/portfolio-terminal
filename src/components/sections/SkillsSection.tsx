import React from 'react';
import SectionHeader from './SectionHeader';

interface KnowledgeItem {
  name: string;
  rating: number;
}

interface KnowledgeCategory {
  category: string;
  knowledges: KnowledgeItem[];
}

interface SoftSkill {
  name: string;
  rating: number;
}

interface SkillsSectionProps {
  knowledgeCategories: KnowledgeCategory[];
  softSkills: SoftSkill[];
}

const getDepthLabel = (rating: number) => {
  if (rating >= 4) return 'base sólida';
  if (rating >= 3) return 'uso habitual';
  return 'en crecimiento';
};

const getSoftSkillLabel = (rating: number) => {
  if (rating >= 75) return 'muy presente';
  if (rating >= 60) return 'consistente';
  return 'en práctica';
};

const SkillDepth = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-1" aria-hidden="true">
    {Array.from({ length: 4 }).map((_, index) => (
      <span
        key={index}
        className={`h-1.5 w-5 rounded-full ${
          index < rating ? 'bg-terminal-accent/75' : 'bg-terminal-border/60'
        }`}
      ></span>
    ))}
  </div>
);

const SkillsSection: React.FC<SkillsSectionProps> = ({ knowledgeCategories, softSkills }) => {
  const sortedSoftSkills = [...softSkills].sort((first, second) => second.rating - first.rating);

  return (
    <div className="font-sans">
      <SectionHeader verb="map" args="skillset --current" meta="stack overview" />

      <div className="space-y-8">
        <section>
          <div className="mb-4 flex items-center gap-3">
            <h3 className="font-mono text-[11px] uppercase tracking-[0.22em] text-terminal-text-secondary">
              Technical depth
            </h3>
            <span className="h-px flex-1 bg-terminal-border/40"></span>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {knowledgeCategories.map((category) => (
              <div key={category.category}>
                <div className="mb-3 flex items-baseline justify-between gap-3">
                  <h4 className="text-sm font-semibold text-terminal-text">{category.category}</h4>
                  <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-terminal-text-secondary">
                    {category.knowledges.length}
                  </span>
                </div>

                <div className="space-y-2">
                  {category.knowledges.map((skill) => (
                    <div
                      key={skill.name}
                      className="flex items-center justify-between gap-3 border-t border-terminal-border/30 py-2"
                    >
                      <div className="min-w-0">
                        <div className="text-sm text-terminal-text">{skill.name}</div>
                        <div className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.16em] text-terminal-text-secondary/70">
                          {getDepthLabel(skill.rating)}
                        </div>
                      </div>
                      <SkillDepth rating={skill.rating} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="mb-4 flex items-center gap-3">
            <h3 className="font-mono text-[11px] uppercase tracking-[0.22em] text-terminal-text-secondary">
              Working style
            </h3>
            <span className="h-px flex-1 bg-terminal-border/40"></span>
          </div>

          <div className="grid gap-x-6 gap-y-2 md:grid-cols-2">
            {sortedSoftSkills.map((skill) => (
              <div
                key={skill.name}
                className="flex items-baseline justify-between gap-4 border-t border-terminal-border/30 py-2"
              >
                <span className="text-sm text-terminal-text">{skill.name}</span>
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-terminal-text-secondary/70">
                  {getSoftSkillLabel(skill.rating)}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default SkillsSection;
