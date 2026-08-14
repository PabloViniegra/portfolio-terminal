import { describe, expect, it } from 'vitest';

import type { ContentData } from '../types/content';
import { CV_PDF_URL, resolveCommand } from './resolveCommand';

const contentData: ContentData = {
  experiences: [
    {
      title: 'Engineer',
      date: '2024',
      description: 'Builds.',
      tags: ['Go'],
    },
  ],
  projects: [
    {
      title: 'Alpha',
      description: 'App',
      type: 'Web',
      scope: 'Small',
      github: 'https://github.com/example/alpha',
      technologies: ['React'],
    },
  ],
  knowledgeCategories: [{ category: 'Frontend', knowledges: [{ name: 'React', rating: 4 }] }],
  contactInfo: [{ title: 'Email', content: 'a@b.com', link: 'mailto:a@b.com' }],
  commands: [
    { command: '/projects', description: 'Projects', category: 'info' },
    { command: '/help', description: 'Help', category: 'utility' },
  ],
  certifications: [],
  general: {
    ctaMessage: 'Hello',
    ctaButtonText: 'Mail',
    welcomeMessage: 'Welcome',
    helpTitle: 'Help',
    helpTip: 'Tab',
    contactEmail: 'a@b.com',
  },
};

describe('resolveCommand', () => {
  it('returns empty for blank input', () => {
    expect(resolveCommand('   ', contentData)).toEqual({ kind: 'empty' });
  });

  it('normalizes casing and whitespace for known commands', () => {
    expect(resolveCommand('  /HELP  ', contentData)).toEqual({ kind: 'help' });
    expect(resolveCommand('/Home', contentData)).toEqual({ kind: 'home' });
    expect(resolveCommand('/clear', contentData)).toEqual({ kind: 'clear' });
    expect(resolveCommand('/rain', contentData)).toEqual({ kind: 'rain' });
  });

  it('maps content commands to section payloads', () => {
    expect(resolveCommand('/projects', contentData)).toEqual({
      kind: 'section',
      section: 'projects',
      data: { projects: contentData.projects },
    });
    expect(resolveCommand('/contact', contentData)).toEqual({
      kind: 'section',
      section: 'contact',
      data: {
        contactInfo: contentData.contactInfo,
        ctaMessage: 'Hello',
        ctaButtonText: 'Mail',
        contactEmail: 'a@b.com',
      },
    });
  });

  it('returns the CV url without opening a window', () => {
    expect(resolveCommand('/cv', contentData)).toEqual({
      kind: 'cv',
      pdfUrl: CV_PDF_URL,
    });
  });

  it('suggests the closest command for a typo', () => {
    expect(resolveCommand('/projecs', contentData)).toEqual({
      kind: 'unknown',
      input: '/projecs',
      suggestion: '/projects',
    });
  });
});
