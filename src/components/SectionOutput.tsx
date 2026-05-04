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

const SectionOutput: React.FC<Props> = ({ section, data = {} }) => {
  switch (section) {
    case 'home':
      return (
        <div className="font-sans">
          <div className="mb-5 flex items-center gap-2 font-mono text-sm">
            <span className="text-terminal-prompt">$</span>
            <span className="text-terminal-accent">cat</span>
            <span className="text-terminal-text-secondary">profile.summary</span>
          </div>

          <div className="max-w-3xl space-y-4">
            <p className="text-lg font-semibold leading-snug text-terminal-text md:text-xl">
              Fullstack engineer. Producto web, tooling y arquitectura pragmática.
            </p>
            <p className="text-sm leading-7 text-terminal-text-secondary md:text-base">
              Software claro para quien lo usa, fiable para quien lo mantiene. Interfaz, integración y evolución de producto.
            </p>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-3">
            <div className="border-t border-terminal-border/50 pt-3">
              <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-terminal-text-secondary">focus</div>
              <p className="mt-1.5 text-sm text-terminal-text">Fullstack product, DX, herramientas internas.</p>
            </div>
            <div className="border-t border-terminal-border/50 pt-3">
              <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-terminal-text-secondary">approach</div>
              <p className="mt-1.5 text-sm text-terminal-text">Sobrio, mantenible, con criterio de interfaz.</p>
            </div>
            <div className="border-t border-terminal-border/50 pt-3">
              <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-terminal-text-secondary">next</div>
              <p className="mt-1.5 text-sm text-terminal-text">
                <span className="font-mono text-terminal-accent">/experience</span>{' '}
                <span className="font-mono text-terminal-accent">/projects</span>{' '}
                <span className="font-mono text-terminal-accent">/contact</span>
              </p>
            </div>
          </div>
        </div>
      );

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
