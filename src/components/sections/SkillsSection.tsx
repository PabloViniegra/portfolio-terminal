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

interface SkillsSectionProps {
  knowledgeCategories: KnowledgeCategory[];
}

const getDepthLabel = (rating: number) => {
  if (rating >= 4) return 'base sólida';
  if (rating >= 3) return 'uso habitual';
  return 'en crecimiento';
};

const SkillsSection: React.FC<SkillsSectionProps> = ({ knowledgeCategories }) => {
  return (
    <div className="font-sans">
      <SectionHeader verb="map" args="skillset --current" meta="mapa de stack" />

      <div className="space-y-8">
        <section>
          <div className="mb-4 flex items-center gap-3">
            <h3 className="font-mono text-mono-xs uppercase tracking-[0.22em] text-terminal-text-secondary">
              profundidad técnica
            </h3>
            <span className="h-px flex-1 bg-terminal-border/40"></span>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {knowledgeCategories.map((category) => (
              <div key={category.category}>
                <div className="mb-3 flex items-baseline justify-between gap-3">
                  <h4 className="text-sm font-semibold text-terminal-text">{category.category}</h4>
                  <span className="font-mono text-mono-xs uppercase tracking-[0.16em] text-terminal-text-secondary">
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
                        <div className="mt-0.5 font-mono text-mono-xs uppercase tracking-[0.16em] text-terminal-text-secondary/70">
                          {getDepthLabel(skill.rating)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default SkillsSection;
