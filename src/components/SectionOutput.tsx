import React from 'react';

import ContactSection from './sections/ContactSection';
import ExperienceSection from './sections/ExperienceSection';
import AiEngineeringSection from './sections/AiEngineeringSection';
import CertificationsSection from './sections/CertificationsSection';
import GithubSection from './sections/GithubSection';
import ProfileSection from './sections/ProfileSection';
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
  achievements?: string[];
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

interface ContactItem {
  title: string;
  content: string;
  link: string;
}

interface ProfileItem {
  role: string;
  stack: string[];
  location: string;
  status: string;
  bio: string;
  availability: string;
  about: string[];
  principles: { label: string; content: string }[];
  categories: {
    title: string;
    description: string;
    groups: { title: string; skills: string[] }[];
  }[];
}

interface AiEngineeringItem {
  subtitle: string;
  intro: string;
  positioning: string;
  metrics: { label: string; value: string }[];
  sections: { title: string; description: string; items: string[] }[];
  agentSkills: { name: string; description: string; install: string; repository: string }[];
}

interface CertificationItem {
  year: string;
  title: string;
  issuer: string;
  description: string;
}

interface GithubItem {
  summary: string;
  contributions: number;
  period: string;
  profileUrl: string;
  months: { label: string; contributions: number }[];
}

type Props = {
  section: 'experience' | 'projects' | 'skills' | 'profile' | 'ai' | 'github' | 'certifications' | 'contact';
  data?: {
    experiences?: ExperienceItem[];
    projects?: ProjectItem[];
    knowledgeCategories?: KnowledgeCategory[];
    contactInfo?: ContactItem[];
    ctaMessage?: string;
    ctaButtonText?: string;
    contactEmail?: string;
    profile?: ProfileItem;
    aiEngineering?: AiEngineeringItem;
    certifications?: CertificationItem[];
    github?: GithubItem;
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

    default:
      return null;
  }
};

export default SectionOutput;
