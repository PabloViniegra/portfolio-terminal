import React from "react";

/**
 * Representa un proyecto del portfolio
 * @interface ProjectItem
 * @property {string} title - Título del proyecto
 * @property {string} description - Descripción del proyecto
 * @property {string} [link] - URL del proyecto en producción (opcional)
 * @property {string} github - URL del repositorio en GitHub
 * @property {string[]} technologies - Tecnologías utilizadas en el proyecto
 */
interface ProjectItem {
  title: string;
  description: string;
  link?: string;
  github: string;
  technologies: string[];
}

/**
 * Props del componente ProjectsSection
 * @interface ProjectsSectionProps
 * @property {ProjectItem[]} projects - Lista de proyectos
 */
interface ProjectsSectionProps {
  projects: ProjectItem[];
}

/**
 * Componente que muestra la sección de proyectos
 * 
 * @component
 * @param {ProjectsSectionProps} props - Props del componente
 * @returns {JSX.Element} Sección de proyectos renderizada
 * 
 * @example
 * ```tsx
 * <ProjectsSection projects={projects} />
 * ```
 */
const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projects }) => {
  return (
    <div className="font-mono">
      <div className="mb-4">
        <span className="text-terminal-prompt">$ </span>
        <span className="text-terminal-accent">ls</span>
        <span> -la /proyectos/</span>
      </div>

      <div className="space-y-8">
        {projects.map((project, idx) => (
          <div key={idx} className="border-l-2 border-terminal-accent pl-4">
            <div className="flex flex-col sm:flex-row sm:items-baseline gap-2">
              <h3 className="text-terminal-text font-bold">
                {project.link ? (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline text-terminal-accent"
                  >
                    {project.title}
                  </a>
                ) : (
                  project.title
                )}
                <span className="text-terminal-comment text-sm ml-2">
                  #{" "}
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    [código]
                  </a>
                </span>
              </h3>
            </div>
            <p className="my-2 text-terminal-text">{project.description}</p>
            <div className="flex flex-wrap gap-2 mt-3">
              {project.technologies.map((tech, techIdx) => (
                <span
                  key={techIdx}
                  className="px-2 py-1 bg-terminal-bg-secondary text-xs rounded border border-terminal-border"
                  title={tech}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsSection;
