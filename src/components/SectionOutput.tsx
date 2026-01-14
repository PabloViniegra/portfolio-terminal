import React from 'react';
import ExperienceSection from './sections/ExperienceSection';
import ProjectsSection from './sections/ProjectsSection';
import SkillsSection from './sections/SkillsSection';
import ContactSection from './sections/ContactSection';

/**
 * Componente de mensaje de error para datos faltantes
 * @param {Object} props - Props del componente
 * @param {string} props.message - Mensaje de error a mostrar
 * @returns {JSX.Element} Mensaje de error renderizado
 */
const ErrorMessage: React.FC<{ message: string }> = ({ message }) => (
  <div className="error-message">
    <div className="text-terminal-text">
      ⚠️ {message}
    </div>
  </div>
);

interface ExperienceItem {
  title: string;
  date: string;
  description: string;
  tags: string[];
}

interface ProjectItem {
  title: string;
  description: string;
  link?: string;
  github: string;
  technologies: string[];
}

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

interface ContactItem {
  title: string;
  content: string;
  link: string;
}

type Props = {
  section: 'home' | 'experience' | 'projects' | 'skills' | 'contact';
  data?: {
    experiences?: ExperienceItem[];
    projects?: ProjectItem[];
    knowledgeCategories?: KnowledgeCategory[];
    softSkills?: SoftSkill[];
    contactInfo?: ContactItem[];
    ctaMessage?: string;
    ctaButtonText?: string;
    contactEmail?: string;
  };
};

/**
 * Componente que renderiza diferentes secciones del portfolio
 * 
 * @component
 * @param {Props} props - Props del componente
 * @returns {JSX.Element | null} Sección renderizada o null
 * 
 * @example
 * ```tsx
 * <SectionOutput 
 *   section="experience" 
 *   data={{ experiences: [...] }}
 * />
 * ```
 */
const SectionOutput: React.FC<Props> = ({ section, data = {} }) => {
  switch (section) {
    case 'home':
      return (
        <div className="font-mono">
          <div className="mb-2">
            <span className="text-terminal-prompt">$ </span>
            <span className="text-terminal-accent">echo</span>
            <span> "¡Hola! Soy Pablo, fullstack developer"</span>
          </div>
          <div className="mb-4 text-terminal-text">
            ¡Hola! Soy Pablo, fullstack developer
          </div>
          
          <div className="mb-2">
            <span className="text-terminal-prompt">$ </span>
            <span className="text-terminal-accent">echo</span>
            <span> "Sobre mí:"</span>
          </div>
          <div className="mb-2 text-terminal-text">
            Apasionado por la tecnología y la resolución de problemas.
          </div>
          
          <div className="text-terminal-text-secondary italic text-sm mt-4">
            <span className="text-terminal-comment"># </span>
            "La programación es solo un medio, y el fin es solucionar tus problemas."
          </div>
        </div>
      );

    case 'experience':
      if (!data.experiences || data.experiences.length === 0) {
        return <ErrorMessage message="No hay datos de experiencia disponibles" />;
      }
      return <ExperienceSection experiences={data.experiences} />;

    case 'projects':
      if (!data.projects || data.projects.length === 0) {
        return <ErrorMessage message="No hay proyectos disponibles" />;
      }
      return <ProjectsSection projects={data.projects} />;

    case 'skills':
      if (!data.knowledgeCategories || !data.softSkills) {
        return <ErrorMessage message="No hay datos de habilidades disponibles" />;
      }
      return <SkillsSection 
        knowledgeCategories={data.knowledgeCategories} 
        softSkills={data.softSkills} 
      />;

    case 'contact':
      if (!data.contactInfo || data.contactInfo.length === 0) {
        return <ErrorMessage message="No hay información de contacto disponible" />;
      }
      return <ContactSection 
        contactInfo={data.contactInfo} 
        ctaMessage={data.ctaMessage || "¿Quieres trabajar juntos en un proyecto?"}
        ctaButtonText={data.ctaButtonText || "Enviar mensaje"}
        contactEmail={data.contactEmail || "pablovpmadrid@gmail.com"}
      />;

    default:
      return null;
  }
};

export default SectionOutput;
