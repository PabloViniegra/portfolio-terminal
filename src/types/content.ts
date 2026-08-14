export interface ContentCommand {
  command: string;
  description: string;
  category: 'navigation' | 'info' | 'utility' | 'special';
  hint?: string;
}

export interface ExperienceItem {
  title: string;
  date: string;
  description: string;
  achievements?: string[];
  tags: string[];
}

export interface ProjectItem {
  title: string;
  description: string;
  type: string;
  scope: string;
  link?: string;
  github: string;
  technologies: string[];
  featured?: boolean;
}

export interface KnowledgeItem {
  name: string;
  rating: number;
}

export interface KnowledgeCategory {
  category: string;
  knowledges: KnowledgeItem[];
}

export interface ContactItem {
  title: string;
  content: string;
  link: string;
}

export interface ProfileItem {
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

export interface AiEngineeringItem {
  subtitle: string;
  intro: string;
  positioning: string;
  metrics: { label: string; value: string }[];
  sections: { title: string; description: string; items: string[] }[];
  agentSkills: { name: string; description: string; install: string; repository: string }[];
}

export interface CertificationItem {
  year: string;
  title: string;
  issuer: string;
  description: string;
}

export interface GithubItem {
  summary: string;
  contributions: number;
  period: string;
  profileUrl: string;
  months: { label: string; contributions: number }[];
}

export type PortfolioSection =
  | 'experience'
  | 'projects'
  | 'skills'
  | 'profile'
  | 'ai'
  | 'github'
  | 'certifications'
  | 'contact';

export type SectionOutputData = {
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

export interface ContentData {
  experiences: ExperienceItem[];
  projects: ProjectItem[];
  knowledgeCategories: KnowledgeCategory[];
  contactInfo: ContactItem[];
  commands: ContentCommand[];
  profile?: ProfileItem;
  aiEngineering?: AiEngineeringItem;
  certifications: CertificationItem[];
  github?: GithubItem;
  general: {
    ctaMessage: string;
    ctaButtonText: string;
    welcomeMessage: string;
    helpTitle: string;
    helpTip: string;
    contactEmail: string;
  };
}
