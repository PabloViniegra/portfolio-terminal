import React from 'react';

import ContactSection from './sections/ContactSection';
import ExperienceSection from './sections/ExperienceSection';
import ProjectsSection from './sections/ProjectsSection';
import SkillsSection from './sections/SkillsSection';

const ErrorMessage: React.FC<{ message: string }> = ({ message }) => (
  <div className="rounded-xl border border-terminal-error/35 bg-terminal-bg-secondary/28 px-4 py-3 text-terminal-error">
    <div className="text-terminal-text">{message}</div>
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
  type: string;
  scope: string;
  link?: string;
  github: string;
  technologies: string[];
  featured?: boolean;
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
  section: 'experience' | 'projects' | 'skills' | 'contact';
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

const SectionOutput: React.FC<Props> = ({ section, data = {} }) => {
  switch (section) {
    case 'experience':
      if (!data.experiences || data.experiences.length === 0) {
        return <ErrorMessage message="No hay datos de experiencia disponibles." />;
      }

      return <ExperienceSection experiences={data.experiences} />;

    case 'projects':
      if (!data.projects || data.projects.length === 0) {
        return <ErrorMessage message="No hay proyectos disponibles." />;
      }

      return <ProjectsSection projects={data.projects} />;

    case 'skills':
      if (!data.knowledgeCategories || !data.softSkills) {
        return <ErrorMessage message="No hay datos de habilidades disponibles." />;
      }

      return (
        <SkillsSection
          knowledgeCategories={data.knowledgeCategories}
          softSkills={data.softSkills}
        />
      );

    case 'contact':
      if (!data.contactInfo || data.contactInfo.length === 0) {
        return <ErrorMessage message="No hay información de contacto disponible." />;
      }

      return (
        <ContactSection
          contactInfo={data.contactInfo}
          ctaMessage={data.ctaMessage || 'Disponible para hablar sobre producto web y fullstack.'}
          ctaButtonText={data.ctaButtonText || 'Abrir email'}
          contactEmail={data.contactEmail || 'pablovpmadrid@gmail.com'}
        />
      );

    default:
      return null;
  }
};

export default SectionOutput;
