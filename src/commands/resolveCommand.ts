import { COMMANDS } from '../constants/commands';
import type { ContentData, PortfolioSection, SectionOutputData } from '../types/content';
import { suggestClosestCommand } from './suggestClosestCommand';

export const CV_PDF_URL = '/cv/CV_2026.pdf';

export type CommandResult =
  | { kind: 'empty' }
  | { kind: 'home' }
  | { kind: 'clear' }
  | { kind: 'help' }
  | { kind: 'rain' }
  | { kind: 'cv'; pdfUrl: string }
  | { kind: 'section'; section: PortfolioSection; data: SectionOutputData }
  | { kind: 'unknown'; input: string; suggestion: string | null };

const section = (
  name: PortfolioSection,
  data: SectionOutputData,
): CommandResult => ({ kind: 'section', section: name, data });

export const resolveCommand = (
  input: string,
  contentData: ContentData,
): CommandResult => {
  if (input.trim() === '') {
    return { kind: 'empty' };
  }

  const command = input.trim().toLowerCase();

  switch (command) {
    case COMMANDS.RAIN:
      return { kind: 'rain' };
    case COMMANDS.CLEAR:
      return { kind: 'clear' };
    case COMMANDS.HOME:
      return { kind: 'home' };
    case COMMANDS.HELP:
      return { kind: 'help' };
    case COMMANDS.EXPERIENCE:
      return section('experience', { experiences: contentData.experiences });
    case COMMANDS.PROJECTS:
      return section('projects', { projects: contentData.projects });
    case COMMANDS.SKILLS:
      return section('skills', {
        knowledgeCategories: contentData.knowledgeCategories,
      });
    case COMMANDS.PROFILE:
      return section('profile', { profile: contentData.profile });
    case COMMANDS.AI:
      return section('ai', { aiEngineering: contentData.aiEngineering });
    case COMMANDS.GITHUB:
      return section('github', { github: contentData.github });
    case COMMANDS.CERTIFICATIONS:
      return section('certifications', {
        certifications: contentData.certifications,
      });
    case COMMANDS.CONTACT:
      return section('contact', {
        contactInfo: contentData.contactInfo,
        ctaMessage: contentData.general.ctaMessage,
        ctaButtonText: contentData.general.ctaButtonText,
        contactEmail: contentData.general.contactEmail,
      });
    case COMMANDS.CV:
      return { kind: 'cv', pdfUrl: CV_PDF_URL };
    default:
      return {
        kind: 'unknown',
        input,
        suggestion: suggestClosestCommand(
          input,
          contentData.commands.map(({ command: name }) => name),
        ),
      };
  }
};
