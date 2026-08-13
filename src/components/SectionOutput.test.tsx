import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import SectionOutput from './SectionOutput';

const project = {
  title: 'Project Alpha',
  description: 'A useful project.',
  type: 'Web app',
  scope: 'A focused product.',
  github: 'https://github.com/example/project-alpha',
  technologies: ['React'],
  featured: true,
};

describe('SectionOutput', () => {
  it.each([
    ['experience', 'No hay datos de experiencia disponibles.'],
    ['projects', 'No hay proyectos disponibles.'],
    ['skills', 'No hay datos de habilidades disponibles.'],
    ['contact', 'No hay información de contacto disponible.'],
  ] as const)('reports missing %s data clearly', (section, message) => {
    render(<SectionOutput section={section} />);

    expect(screen.getByText(message)).toBeInTheDocument();
  });

  it('renders project data through the projects section', () => {
    render(<SectionOutput section="projects" data={{ projects: [project] }} />);

    expect(screen.getByRole('heading', { name: 'Project Alpha' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Repo/ })).toHaveAttribute(
      'href',
      project.github,
    );
  });

  it('renders contact links and applies contact defaults', () => {
    render(
      <SectionOutput
        section="contact"
        data={{
          contactInfo: [
            { title: 'Email', content: 'hello@example.com', link: 'mailto:hello@example.com' },
            { title: 'LinkedIn', content: 'pablo', link: 'https://linkedin.com/in/pablo' },
          ],
        }}
      />,
    );

    expect(screen.getByRole('link', { name: /Email/ })).toHaveAttribute(
      'href',
      'mailto:hello@example.com',
    );
    expect(screen.getByRole('link', { name: /LinkedIn/ })).toHaveAttribute('target', '_blank');
    expect(screen.getByRole('link', { name: /Abrir email/ })).toHaveAttribute(
      'href',
      'mailto:pablovpmadrid@gmail.com',
    );
  });
});
