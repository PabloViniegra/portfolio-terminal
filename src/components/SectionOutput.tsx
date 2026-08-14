import React from 'react';

import type { PortfolioSection, SectionOutputData } from '../types/content';
import AiEngineeringSection from './sections/AiEngineeringSection';
import CertificationsSection from './sections/CertificationsSection';
import ContactSection from './sections/ContactSection';
import ExperienceSection from './sections/ExperienceSection';
import GithubSection from './sections/GithubSection';
import ProfileSection from './sections/ProfileSection';
import ProjectsSection from './sections/ProjectsSection';
import SkillsSection from './sections/SkillsSection';

const ErrorMessage: React.FC<{ message: string }> = ({ message }) => (
  <div className="rounded-xl border border-terminal-error/35 bg-terminal-bg-secondary/28 px-4 py-3 text-terminal-error">
    <div className="text-terminal-text">{message}</div>
  </div>
);

type Props = {
  section: PortfolioSection;
  data?: SectionOutputData;
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
      if (!data.knowledgeCategories) {
        return <ErrorMessage message="No hay datos de habilidades disponibles." />;
      }

      return (
        <SkillsSection
          knowledgeCategories={data.knowledgeCategories}
        />
      );

    case 'profile':
      if (!data.profile) {
        return <ErrorMessage message="No hay datos de perfil disponibles." />;
      }

      return <ProfileSection profile={data.profile} />;

    case 'ai':
      if (!data.aiEngineering) {
        return <ErrorMessage message="No hay datos de AI Engineering disponibles." />;
      }

      return <AiEngineeringSection aiEngineering={data.aiEngineering} />;

    case 'github':
      if (!data.github) {
        return <ErrorMessage message="No hay datos de actividad en GitHub disponibles." />;
      }

      return <GithubSection github={data.github} />;

    case 'certifications':
      if (!data.certifications || data.certifications.length === 0) {
        return <ErrorMessage message="No hay certificaciones disponibles." />;
      }

      return <CertificationsSection certifications={data.certifications} />;

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
    default: {
      const _exhaustive: never = section;
      return _exhaustive;
    }
  }
};

export default SectionOutput;
