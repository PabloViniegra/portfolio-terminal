import React from 'react';

interface ContactItem {
  title: string;
  content: string;
  link: string;
}

/**
 * Props del componente ContactSection
 * @interface ContactSectionProps
 * @property {ContactItem[]} contactInfo - Lista de información de contacto
 * @property {string} ctaMessage - Mensaje de call-to-action
 * @property {string} ctaButtonText - Texto del botón de contacto
 * @property {string} contactEmail - Email de contacto
 */
interface ContactSectionProps {
  contactInfo: ContactItem[];
  ctaMessage: string;
  ctaButtonText: string;
  contactEmail: string;
}

/**
 * Componente que muestra la sección de contacto
 * 
 * @component
 * @param {ContactSectionProps} props - Props del componente
 * @returns {JSX.Element} Sección de contacto renderizada
 * 
 * @example
 * ```tsx
 * <ContactSection 
 *   contactInfo={contacts}
 *   ctaMessage="¿Hablamos?"
 *   ctaButtonText="Contactar"
 *   contactEmail="email@example.com"
 * />
 * ```
 */
const ContactSection: React.FC<ContactSectionProps> = ({ contactInfo, ctaMessage, ctaButtonText, contactEmail }) => {
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
          <p className="text-terminal-text mb-4">{ctaMessage}</p>
          <a 
            href={`mailto:${contactEmail}`}
            className="inline-block bg-terminal-accent text-terminal-bg px-4 py-2 rounded hover:bg-opacity-90 transition-colors font-medium"
          >
            {ctaButtonText}
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
