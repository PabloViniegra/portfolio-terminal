import React from 'react';
import type { ContactItem } from '../../types/content';
import SectionHeader from './SectionHeader';

interface ContactSectionProps {
  contactInfo: ContactItem[];
  ctaMessage: string;
  ctaButtonText: string;
  contactEmail: string;
}

const ContactSection: React.FC<ContactSectionProps> = ({
  contactInfo,
  ctaMessage,
  ctaButtonText,
  contactEmail,
}) => {
  return (
    <div className="font-sans">
      <SectionHeader verb="open" args="contact.channel" meta="disponible" />

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(16rem,0.8fr)]">
        <section>
          <div className="mb-4 font-mono text-mono-xs uppercase tracking-[0.22em] text-terminal-text-secondary">
            vías de contacto
          </div>
          <div className="space-y-0">
            {contactInfo.map((item) => {
              const isExternal = !item.link.startsWith('mailto:');
              return (
                <a
                  key={item.title}
                  href={item.link}
                  target={isExternal ? '_blank' : undefined}
                  rel={isExternal ? 'noopener noreferrer' : undefined}
                  aria-label={isExternal ? `${item.title}: ${item.content} (enlace externo)` : undefined}
                  className="flex items-baseline justify-between gap-4 border-t border-terminal-border/40 py-3 transition-colors duration-200 hover:text-terminal-accent focus:outline-none focus:ring-1 focus:ring-terminal-accent/50"
                >
                  <div>
                    <div className="font-mono text-mono-xs uppercase tracking-[0.18em] text-terminal-text-secondary">
                      {item.title}
                    </div>
                    <div className="mt-0.5 text-sm font-medium text-terminal-text">
                      {item.content}
                    </div>
                  </div>
                  <span className="font-mono text-mono-xs text-terminal-text-secondary/60" aria-hidden="true">
                    {isExternal ? '↗' : '→'}
                  </span>
                </a>
              );
            })}
          </div>
        </section>

        <section className="border-t border-terminal-border/40 pt-4 lg:border-t-0 lg:border-l lg:border-terminal-border/40 lg:pl-8 lg:pt-0">
          <div className="font-mono text-mono-xs uppercase tracking-[0.22em] text-terminal-text-secondary">
            status
          </div>
          <div className="mt-3 space-y-2">
            <p className="text-base font-semibold text-terminal-text">Open to fullstack roles</p>
            <p className="text-sm leading-6 text-terminal-text-secondary">{ctaMessage}</p>
          </div>

          <a
            href={`mailto:${contactEmail}`}
            className="mt-4 inline-flex items-center gap-2 border-b border-terminal-accent/40 pb-1 font-mono text-sm text-terminal-accent transition-colors duration-200 hover:border-terminal-accent focus:outline-none focus:ring-1 focus:ring-terminal-accent/50"
          >
            {ctaButtonText}
            <span>→</span>
          </a>
        </section>
      </div>
    </div>
  );
};

export default ContactSection;
