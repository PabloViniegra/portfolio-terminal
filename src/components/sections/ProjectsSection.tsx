import React from 'react';
import type { ProjectItem } from '../../types/content';
import SectionHeader from './SectionHeader';

interface ProjectsSectionProps {
  projects: ProjectItem[];
}

const ExternalLink = ({ href, label }: { href: string; label: string }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={`${label} (enlace externo)`}
    className="font-mono text-mono-xs uppercase tracking-[0.18em] text-terminal-text-secondary transition-colors duration-200 hover:text-terminal-accent active:text-terminal-accent focus:outline-none focus:ring-1 focus:ring-terminal-accent/50"
  >
    {label} <span aria-hidden="true">↗</span>
  </a>
);

const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projects }) => {
  const featuredProjects = projects.filter((project) => project.featured);
  const archiveProjects = projects.filter((project) => !project.featured);

  return (
    <div className="font-sans">
      <SectionHeader verb="inspect" args="projects.registry" meta={`${projects.length} proyectos`} />

      <div className="space-y-8">
        <section>
          <div className="mb-4 flex items-center gap-3">
            <h3 className="font-mono text-mono-xs uppercase tracking-[0.22em] text-terminal-text-secondary">
              destacados
            </h3>
            <span className="h-px flex-1 bg-terminal-border/40"></span>
          </div>

          <div className="space-y-0">
            {featuredProjects.map((project, index) => (
              <article
                key={project.title}
                className={`border-t py-5 first:border-t-0 first:pt-0 ${
                  index === 0 ? 'border-terminal-border/60' : 'border-terminal-border/40'
                }`}
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-mono-xs uppercase tracking-[0.16em] text-terminal-accent">
                    {project.type}
                  </span>
                  {index === 0 && (
                    <span className="font-mono text-mono-xs uppercase tracking-[0.16em] text-terminal-text-secondary/80">
                      primary
                    </span>
                  )}
                </div>

                <div className="mt-2 flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                  <div className="min-w-0 flex-1">
                    <h4 className="text-lg font-semibold leading-snug text-terminal-text md:text-xl">
                      {project.title}
                    </h4>
                    <p className="mt-1 text-sm text-terminal-text-secondary/90">
                      {project.scope}
                    </p>
                    <p className="mt-2 max-w-3xl text-sm leading-7 text-terminal-text-secondary">
                      {project.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-4 lg:flex-col lg:items-end lg:gap-2">
                    {project.link && <ExternalLink href={project.link} label="Live" />}
                    <ExternalLink href={project.github} label="Repo" />
                  </div>
                </div>

                <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 font-mono text-mono-xs text-terminal-text-secondary/70">
                  {project.technologies.map((technology) => (
                    <span key={technology}>{technology}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        {archiveProjects.length > 0 && (
          <section>
          <div className="mb-4 flex items-center gap-3">
            <h3 className="font-mono text-mono-xs uppercase tracking-[0.22em] text-terminal-text-secondary">
              archivo
            </h3>
            <span className="h-px flex-1 bg-terminal-border/40"></span>
          </div>

            <div className="space-y-0">
              {archiveProjects.map((project) => (
                <article
                  key={project.title}
                  className="flex flex-col gap-1 border-t border-terminal-border/30 py-3 md:flex-row md:items-baseline md:justify-between md:gap-4"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-mono-xs uppercase tracking-[0.16em] text-terminal-text-secondary/60">
                        {project.type}
                      </span>
                      <h4 className="text-sm font-medium text-terminal-text">
                        {project.title}
                      </h4>
                    </div>
                    <p className="mt-0.5 max-w-2xl text-sm text-terminal-text-secondary/80">
                      {project.scope}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-x-3 gap-y-1 font-mono text-mono-xs text-terminal-text-secondary/60">
                    {project.link && <ExternalLink href={project.link} label="Live" />}
                    <ExternalLink href={project.github} label="Repo" />
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ProjectsSection;
