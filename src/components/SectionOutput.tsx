import React from 'react';
import ExperienceSection from './sections/ExperienceSection';
import ProjectsSection from './sections/ProjectsSection';
import SkillsSection from './sections/SkillsSection';
import ContactSection from './sections/ContactSection';

type Props = {
  section: 'home' | 'experience' | 'projects' | 'skills' | 'contact';
};

const SectionOutput: React.FC<Props> = ({ section }) => {
  switch (section) {
    case 'home':
      return (
        <div className="font-mono">
          <div className="mb-2">
            <span className="text-terminal-prompt">$ </span>
            <span className="text-terminal-accent">echo</span>
            <span> "¡Hola! Soy Pablo, fullstack developer"</span>
          </div>
          <div className="mb-4 text-terminal-text">
            ¡Hola! Soy Pablo, fullstack developer
          </div>
          
          <div className="mb-2">
            <span className="text-terminal-prompt">$ </span>
            <span className="text-terminal-accent">echo</span>
            <span> "Sobre mí:"</span>
          </div>
          <div className="mb-2 text-terminal-text">
            Apasionado por la tecnología y la resolución de problemas.
          </div>
          
          <div className="text-terminal-text-secondary italic text-sm mt-4">
            <span className="text-terminal-comment"># </span>
            "La programación es solo un medio, y el fin es solucionar tus problemas."
          </div>
        </div>
      );

    case 'experience':
      return <ExperienceSection />;

    case 'projects':
      return <ProjectsSection />;

    case 'skills':
      return <SkillsSection />;

    case 'contact':
      return <ContactSection />;

    default:
      return null;
  }
};

export default SectionOutput;
