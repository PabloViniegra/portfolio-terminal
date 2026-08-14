import { getCollection } from 'astro:content';

import type { ContentData } from '../types/content';

const byOrder = <T extends { data: { order?: number } }>(a: T, b: T) =>
  (a.data.order || 0) - (b.data.order || 0);

export const loadContentData = async (): Promise<ContentData> => {
  const [
    experienceEntries,
    projectsEntries,
    skillsEntries,
    contactEntries,
    commandsEntries,
    generalEntries,
    profileEntries,
    aiEngineeringEntries,
    certificationsEntries,
    githubEntries,
  ] = await Promise.all([
    getCollection('experience'),
    getCollection('projects'),
    getCollection('skills'),
    getCollection('contact'),
    getCollection('commands'),
    getCollection('general'),
    getCollection('profile'),
    getCollection('ai-engineering'),
    getCollection('certifications'),
    getCollection('github'),
  ]);

  const getGeneralContent = (key: string) => {
    const entry = generalEntries.find((item) => item.data.key === key);
    return entry?.data.content || '';
  };

  return {
    experiences: experienceEntries.sort(byOrder).map((entry) => entry.data),
    projects: projectsEntries.sort(byOrder).map((entry) => entry.data),
    knowledgeCategories: skillsEntries.sort(byOrder).map((entry) => entry.data),
    contactInfo: contactEntries.sort(byOrder).map((entry) => entry.data),
    commands: commandsEntries.sort(byOrder).map((entry) => entry.data),
    profile: profileEntries[0]?.data,
    aiEngineering: aiEngineeringEntries[0]?.data,
    certifications: certificationsEntries.sort(byOrder).map((entry) => entry.data),
    github: githubEntries[0]?.data,
    general: {
      ctaMessage: getGeneralContent('contact-cta'),
      ctaButtonText: getGeneralContent('contact-button'),
      welcomeMessage: getGeneralContent('welcome-message'),
      helpTitle: getGeneralContent('help-title'),
      helpTip: getGeneralContent('help-tip'),
      contactEmail: getGeneralContent('contact-email'),
    },
  };
};
