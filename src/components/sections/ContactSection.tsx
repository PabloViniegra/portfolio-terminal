import React from 'react';

interface ContactItem {
  title: string;
  content: string;
  link: string;
}

const ContactSection: React.FC = () => {
  const contactInfo: ContactItem[] = [
    {
      title: "Email",
      content: "pablovpmadrid@gmail.com",
      link: "mailto:pablovpmadrid@gmail.com",
    },
    {
      title: "Dirección",
      content: "Móstoles, Madrid, España",
      link: "https://www.google.com/maps?q=Mostoles,+Madrid,+España",
    },
    {
      title: "LinkedIn",
      content: "linkedin.com/in/pabloviniegra",
      link: "https://linkedin.com/in/pabloviniegra",
    },
    {
      title: "GitHub",
      content: "github.com/PabloViniegra",
      link: "https://github.com/PabloViniegra",
    },
  ];

  return (
    <div className="font-mono">
      <div className="mb-6">
        <span className="text-terminal-prompt">$ </span>
        <span className="text-terminal-accent">contacto</span>
      </div>
      
      <div className="space-y-6">
        {contactInfo.map((item, index) => (
          <div key={index} className="border-l-2 border-terminal-accent pl-4 group">
            <div className="flex flex-col sm:flex-row sm:items-baseline gap-2">
              <span className="text-terminal-text font-medium">{item.title}:</span>
              <a 
                href={item.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-terminal-accent hover:underline flex items-center gap-1 transition-colors"
              >
                <span className="text-terminal-text">{item.content}</span>
                <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                  ↗
                </span>
              </a>
            </div>
          </div>
        ))}
        
        <div className="pt-4 mt-6 border-t border-terminal-border">
          <p className="text-terminal-text mb-4">¿Quieres trabajar juntos en un proyecto?</p>
          <a 
            href="mailto:pablovpmadrid@gmail.com" 
            className="inline-block bg-terminal-accent text-terminal-bg px-4 py-2 rounded hover:bg-opacity-90 transition-colors font-medium"
          >
            Enviar mensaje
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
