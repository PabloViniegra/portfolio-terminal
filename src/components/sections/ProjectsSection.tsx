import React from 'react';

interface ProjectItem {
  title: string;
  description: string;
  link?: string;
  github: string;
  technologies: string[];
}

const ProjectsSection: React.FC = () => {
  const projects: ProjectItem[] = [
    {
      title: "PromptLazy",
      description: "Aplicación web para optimizar y mejorar prompts perezosos con IA. Empieza a darle a tus LLMMS prompts de verdad.",
      link: "https://prompt-lazy.netlify.app/",
      github: "https://github.com/PabloViniegra/promptlazy-frontend",
      technologies: ["Vue JS", "TypeScript", "Vite", "Tailwind CSS", "Git", "pnpm", "Tanstack Query", "Shadcn UI", "Python", "FastAPI", "Vitest"]
    },
    {
      title: "Weather App",
      description: "Aplicación sencilla y minimalista para conocer el tiempo meteorológico en la zona que indiques. Incluye pronóstico del tiempo para los días siguientes.",
      link: "https://tututu-weather-app.onrender.com/",
      github: "https://github.com/PabloViniegra/tututu-weather-app",
      technologies: ["Vue JS", "TypeScript", "Vite", "Tailwind CSS", "Git", "Flowbite", "RapidAPI", "npm"]
    },
    {
        title: "Amazon Web Scrapper",
        description: "Script de Python para scrappear productos de Amazon y exportarlo a json, xslx o un csv. Además puedes asignarle distintas localizaciones para que extraiga las búsquedas de tu país. ¡Prueba a extraer tus búsquedas!",
        link: "",
        github: "https://github.com/PabloViniegra/amazon-web-scrapper",
        technologies: ["Python", "Git"]
    },
    {
        title: "The Binding of Isaac Platinum Remake",
        description: "Se trata de un reboot visual para la mítica página de Platinum God, que es una guía de los objetos del famoso videojuego The Binding of Isaac. He implementado un diseño más moderno y minimalista, con una mejor experiencia de usuario. ¡Descubre los objetos!",
        link: "https://tboi-platinum-remake.netlify.app/",
        github: "https://github.com/PabloViniegra/tboi-app",
        technologies: ["Python", "FastAPI", "Git", "Tailwind CSS", "Vue JS", "TypeScript", "Vite", "Tanstack Query", "npm", "Pinia"]
    },
    {
        title: "Trello Clone!",
        description: "Clon de la famosa aplicación Trello, que permite la gestión de tareas y proyectos de forma visual. Puedes crear, editar y eliminar tareas, así como moverlas entre las distintas columnas. ¡Crea tu propio tablero!",
        link: "https://trello-clone-pvp.netlify.app/",
        github: "https://github.com/PabloViniegra/trello-clone-app",
        technologies: ["Python", "FastAPI", "Git", "Vue JS", "Pinia", "Tailwind CSS", "Vite", "npm", "TypeScript", "Tanstack Query"]
    },
    {
        title: "Dragon Ball App",
        description: "Aplicación web que muestra información sobre los personajes de la famosa serie de anime Dragon Ball. Puedes buscar personajes por su nombre, ver su descripción, ver su imagen y conocer otros datos. ¡Descubre a tus personajes favoritos!",
        link: "https://bola-dragon-app.netlify.app/",
        github: "https://github.com/PabloViniegra/dragonball-app",
        technologies: ["TypeScript", "Vue JS", "Tailwind CSS", "Pinia", "Tanstack Query", "npm", "Vite", "Git"]
    },
    {
        title: "MMO Games",
        description: "Aplicación web de contenido dinámico que presenta los últimos videojuegos y noticias relacionado sobre todo con los MMO's. La aplicación se conecta a una API externa para obtener los datos de los juegos y noticias. ¡Descubre los últimos juegos MMO!",
        link: "https://mmo-games.onrender.com/",
        github: "https://github.com/PabloViniegra/mmo-games",
        technologies: ["TypeScript", "Vue JS", "Tailwind CSS", "Vite", "Git", "npm", "RapidAPI", "CSS"]
    }
  ];

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
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="hover:underline text-terminal-accent">
                    {project.title}
                  </a>
                ) : (
                  project.title
                )}
                <span className="text-terminal-comment text-sm ml-2">
                  # <a href={project.github} target="_blank" rel="noopener noreferrer" className="hover:underline">[código]</a>
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
