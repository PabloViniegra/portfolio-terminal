import React from 'react';

/**
 * Representa un item de experiencia laboral
 * @interface ExperienceItem
 * @property {string} title - Título del puesto o posición
 * @property {string} date - Fecha o período de la experiencia
 * @property {string} description - Descripción de las responsabilidades
 * @property {string[]} tags - Tecnologías o habilidades utilizadas
 */
interface ExperienceItem {
  title: string;
  date: string;
  description: string;
  tags: string[];
}

/**
 * Props del componente ExperienceSection
 * @interface ExperienceSectionProps
 * @property {ExperienceItem[]} experiences - Lista de experiencias laborales
 */
interface ExperienceSectionProps {
  experiences: ExperienceItem[];
}

/**
 * Componente que muestra la sección de experiencia laboral
 * 
 * @component
 * @param {ExperienceSectionProps} props - Props del componente
 * @returns {JSX.Element} Sección de experiencia renderizada
 * 
 * @example
 * ```tsx
 * <ExperienceSection experiences={experiences} />
 * ```
 */
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
