import React from 'react';

interface ExperienceItem {
  title: string;
  date: string;
  description: string;
  tags: string[];
}

interface ExperienceSectionProps {
  experiences: ExperienceItem[];
}

const ExperienceSection: React.FC<ExperienceSectionProps> = ({ experiences }) => {
  return (
    <div className="font-sans">
      <div className="mb-5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 font-mono text-sm">
          <span className="text-terminal-prompt">$</span>
          <span className="text-terminal-accent">history</span>
          <span className="text-terminal-text-secondary">--experience</span>
        </div>
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-terminal-text-secondary">
          {experiences.length} entries
        </span>
      </div>

      <div className="relative space-y-0">
        {experiences.map((experience, index) => (
          <article
            key={experience.title}
            className="border-t border-terminal-border/40 py-5 first:border-t-0 first:pt-0"
          >
            <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between">
              <h3 className="text-base font-semibold leading-snug text-terminal-text md:text-lg">
                {experience.title}
              </h3>
              <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-terminal-text-secondary">
                {experience.date}
              </div>
            </div>

            <p className="mt-2 max-w-3xl text-sm leading-7 text-terminal-text-secondary">
              {experience.description}
            </p>

            <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[11px] text-terminal-text-secondary/80">
              {experience.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default ExperienceSection;
