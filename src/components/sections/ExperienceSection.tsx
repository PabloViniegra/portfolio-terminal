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
    <div className="font-mono">
      <div className="mb-4">
        <span className="text-terminal-prompt">$ </span>
        <span className="text-terminal-accent">cat</span>
        <span> experiencia.txt</span>
      </div>
      
      <div className="space-y-8">
        {experiences.map((exp, idx) => (
          <div key={idx} className="border-l-2 border-terminal-accent pl-4">
            <div className="flex flex-col sm:flex-row sm:items-baseline gap-2">
              <h3 className="text-terminal-text font-bold">{exp.title}</h3>
              <span className="text-terminal-comment text-sm"># {exp.date}</span>
            </div>
            <p className="my-2 text-terminal-text">{exp.description}</p>
            <div className="flex flex-wrap gap-2 mt-3">
              {exp.tags.map((tag, tagIdx) => (
                <span 
                  key={tagIdx}
                  className="px-2 py-1 bg-terminal-bg-secondary text-xs rounded border border-terminal-border"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExperienceSection;
