import { act, fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import type { ComponentProps } from 'react';

import { COMMAND_DELAYS } from '../constants/commands';
import Terminal from './Terminal';

const contentData: ComponentProps<typeof Terminal>['contentData'] = {
  experiences: [
    {
      title: 'Senior Engineer',
      date: '2024 - now',
      description: 'Builds useful products.',
      tags: ['React'],
    },
  ],
  projects: [
    {
      title: 'Project Alpha',
      description: 'A focused product.',
      type: 'Web app',
      scope: 'A useful project.',
      github: 'https://github.com/example/project-alpha',
      technologies: ['React'],
      featured: true,
    },
  ],
  knowledgeCategories: [
    {
      category: 'Frontend',
      knowledges: [{ name: 'React', rating: 4 }],
    },
  ],
  contactInfo: [
    { title: 'Email', content: 'hello@example.com', link: 'mailto:hello@example.com' },
  ],
  commands: [
    { command: '/home', description: 'Go home', category: 'navigation' },
    { command: '/experience', description: 'Show experience', category: 'info' },
    { command: '/projects', description: 'Show projects', category: 'info' },
    { command: '/skills', description: 'Show skills', category: 'info' },
    { command: '/profile', description: 'Show profile', category: 'info' },
    { command: '/ai', description: 'Show AI work', category: 'info' },
    { command: '/github', description: 'Show GitHub activity', category: 'info' },
    { command: '/certifications', description: 'Show certifications', category: 'info' },
    { command: '/contact', description: 'Show contact', category: 'info' },
    { command: '/cv', description: 'Open CV', category: 'utility' },
    { command: '/clear', description: 'Clear terminal', category: 'utility' },
    { command: '/help', description: 'Show help', category: 'utility' },
  ],
  profile: {
    role: 'Full Stack Developer',
    stack: ['React'],
    location: 'Madrid, ES',
    status: 'Open to work',
    bio: 'Builds reliable products.',
    availability: 'Available for product teams.',
    about: ['Works from evidence.'],
    principles: [{ label: 'Prioritizes', content: 'Quality.' }],
    categories: [
      {
        title: 'Frontend',
        description: 'Clear interfaces.',
        groups: [{ title: 'Core', skills: ['React'] }],
      },
    ],
  },
  aiEngineering: {
    subtitle: 'Agent work in production.',
    intro: 'Uses agents with the team.',
    positioning: 'Workflows are versioned.',
    metrics: [{ label: 'Adoption', value: '12 people' }],
    sections: [{ title: 'Stack', description: 'Tools used weekly.', items: ['Claude Code'] }],
    agentSkills: [
      {
        name: 'better-init',
        description: 'Creates project instructions.',
        install: 'npx skills add example/better-init',
        repository: 'https://github.com/example/better-init',
      },
    ],
  },
  certifications: [
    {
      year: '2025',
      title: 'Cloud Leader',
      issuer: 'Google Cloud',
      description: 'Cloud foundations.',
    },
  ],
  github: {
    summary: 'Recent contributions.',
    contributions: 42,
    period: 'Last year',
    profileUrl: 'https://github.com/example',
    months: [{ label: 'Jan', contributions: 42 }],
  },
  general: {
    ctaMessage: 'Available for useful work.',
    ctaButtonText: 'Open email',
    welcomeMessage: 'Welcome to the terminal.',
    helpTitle: 'Available commands',
    helpTip: 'Use Tab for autocomplete.',
    contactEmail: 'hello@example.com',
  },
};

const renderTerminal = () => {
  render(<Terminal contentData={contentData} />);
  return screen.getByRole('combobox', { name: 'Comando de terminal' });
};

const submitCommand = async (input: HTMLElement, command: string) => {
  await act(async () => {
    fireEvent.change(input, { target: { value: command } });
    fireEvent.submit(input.closest('form')!);
    vi.advanceTimersByTime(COMMAND_DELAYS.MIN);
  });
};

const useCommandTimers = () => {
  vi.useFakeTimers();
  vi.spyOn(Math, 'random').mockReturnValue(0);
};

describe('Terminal', () => {
  it('executes a content-driven command and renders its output', async () => {
    useCommandTimers();
    const input = renderTerminal();

    await submitCommand(input, '/help');

    expect(screen.getByText('Available commands')).toBeInTheDocument();
    expect(screen.getByText('/projects')).toBeInTheDocument();
    expect(screen.getByText('Use Tab for autocomplete.')).toBeInTheDocument();
  });

  it('renders the requested portfolio section through a terminal command', async () => {
    useCommandTimers();
    const input = renderTerminal();

    await submitCommand(input, '  /projects  ');

    expect(screen.getByRole('heading', { name: 'Project Alpha' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Repo/ })).toHaveAttribute(
      'href',
      'https://github.com/example/project-alpha',
    );
  });

  it('exposes recruiter-critical sections as welcome actions', async () => {
    useCommandTimers();
    renderTerminal();

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Ejecutar /projects' }));
      vi.advanceTimersByTime(COMMAND_DELAYS.MIN);
    });

    expect(screen.getByRole('heading', { name: 'Project Alpha' })).toBeInTheDocument();
  });

  it('renders the published profile through its terminal command', async () => {
    useCommandTimers();
    const input = renderTerminal();

    await submitCommand(input, '/profile');

    expect(screen.getByText('Builds reliable products.')).toBeInTheDocument();
    expect(screen.getByText('Frontend')).toBeInTheDocument();
  });

  it.each([
    ['/ai', 'Agent work in production.'],
    ['/github', 'contribuciones públicas'],
    ['/certifications', 'Cloud Leader'],
  ])('renders %s through its terminal command', async (command, expectedOutput) => {
    useCommandTimers();
    const input = renderTerminal();

    await submitCommand(input, command);

    expect(screen.getByText(expectedOutput)).toBeInTheDocument();
  });

  it('suggests the nearest known command for a typo', async () => {
    useCommandTimers();
    const input = renderTerminal();

    await submitCommand(input, '/projecs');

    expect(screen.getByText('Comando no reconocido:')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '/projects' })).toBeInTheDocument();
  });

  it('shows a manual CV link when the browser blocks the new window', async () => {
    useCommandTimers();
    vi.spyOn(window, 'open').mockReturnValue(null);
    const input = renderTerminal();

    await submitCommand(input, '/cv');

    expect(screen.getByText('El navegador bloqueó la ventana.')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Abrir manualmente/ })).toHaveAttribute(
      'href',
      '/cv/CV_2026.pdf',
    );
  });

  it('navigates through the submitted command history', async () => {
    useCommandTimers();
    const input = renderTerminal();

    await submitCommand(input, '/projects');
    await submitCommand(input, '/contact');

    fireEvent.keyDown(input, { key: 'ArrowUp', code: 'ArrowUp' });
    expect(input).toHaveValue('/contact');

    fireEvent.keyDown(input, { key: 'ArrowUp', code: 'ArrowUp' });
    expect(input).toHaveValue('/projects');

    fireEvent.keyDown(input, { key: 'ArrowDown', code: 'ArrowDown' });
    expect(input).toHaveValue('/contact');

    fireEvent.keyDown(input, { key: 'ArrowDown', code: 'ArrowDown' });
    expect(input).toHaveValue('');
  });

  it('leaves a recovery hint after clearing the terminal', async () => {
    useCommandTimers();
    const input = renderTerminal();

    await submitCommand(input, '/clear');

    expect(screen.getByText('terminal limpio')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '/home' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '/help' })).toBeInTheDocument();
  });
});
