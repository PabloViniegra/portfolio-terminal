import React from 'react';
import SectionHeader from './SectionHeader';

interface ExperienceItem {
  title: string;
  date: string;
  description: string;
  achievements?: string[];
  tags: string[];
}

interface ExperienceSectionProps {
  experiences: ExperienceItem[];
}

const ExperienceSection: React.FC<ExperienceSectionProps> = ({ experiences }) => {
  return (
    <div className="font-sans">
      <SectionHeader verb="history" args="--experience" meta={`${experiences.length} entradas`} />

      <div className="relative space-y-0">
        {experiences.map((experience) => (
          <article
            key={experience.title}
            className="border-t border-terminal-border/40 py-5 first:border-t-0 first:pt-0"
          >
            <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between">
              <h3 className="text-base font-semibold leading-snug text-terminal-text md:text-lg">
                {experience.title}
              </h3>
              <div className="font-mono text-mono-xs uppercase tracking-[0.16em] text-terminal-text-secondary">
                {experience.date}
              </div>
            </div>

            <p className="mt-2 max-w-3xl text-sm leading-7 text-terminal-text-secondary">
              {experience.description}
            </p>

            {experience.achievements && experience.achievements.length > 0 && (
              <ul className="mt-3 max-w-3xl space-y-2 text-sm leading-6 text-terminal-text-secondary">
                {experience.achievements.map((achievement) => (
                  <li key={achievement} className="flex gap-2">
                    <span className="text-terminal-prompt" aria-hidden="true">→</span>
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 font-mono text-mono-xs text-terminal-text-secondary/80">
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
