import React from 'react';

interface ContactItem {
  title: string;
  content: string;
  link: string;
}

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
      <div className="mb-5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 font-mono text-sm">
          <span className="text-terminal-prompt">$</span>
          <span className="text-terminal-accent">open</span>
          <span className="text-terminal-text-secondary">contact.channel</span>
        </div>
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-terminal-text-secondary">
          available
        </span>
      </div>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(16rem,0.8fr)]">
        <section>
          <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-terminal-text-secondary">
            Contact routes
          </div>
          <div className="space-y-0">
            {contactInfo.map((item) => (
              <a
                key={item.title}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-baseline justify-between gap-4 border-t border-terminal-border/40 py-3 transition-colors duration-200 hover:text-terminal-accent"
              >
                <div>
                  <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-terminal-text-secondary">
                    {item.title}
                  </div>
                  <div className="mt-0.5 text-sm font-medium text-terminal-text">
                    {item.content}
                  </div>
                </div>
                <span className="font-mono text-[11px] text-terminal-text-secondary/60">
                  →
                </span>
              </a>
            ))}
          </div>
        </section>

        <section className="border-t border-terminal-border/40 pt-4 lg:border-t-0 lg:border-l lg:border-terminal-border/40 lg:pl-8 lg:pt-0">
          <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-terminal-text-secondary">
            Status
          </div>
          <div className="mt-3 space-y-2">
            <p className="text-base font-semibold text-terminal-text">Open to fullstack roles</p>
            <p className="text-sm leading-6 text-terminal-text-secondary">{ctaMessage}</p>
          </div>

          <a
            href={`mailto:${contactEmail}`}
            className="mt-4 inline-flex items-center gap-2 border-b border-terminal-accent/40 pb-1 font-mono text-sm text-terminal-accent transition-colors duration-200 hover:border-terminal-accent"
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
