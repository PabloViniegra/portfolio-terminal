import React from 'react';
import SectionHeader from './SectionHeader';

interface CertificationsSectionProps {
  certifications: { year: string; title: string; issuer: string; description: string }[];
}

const CertificationsSection: React.FC<CertificationsSectionProps> = ({ certifications }) => (
  <div className="font-sans">
    <SectionHeader verb="list" args="certifications" meta={`${certifications.length} credenciales`} />
    <div className="space-y-0">
      {certifications.map((certification) => (
        <article key={certification.title} className="border-t border-terminal-border/40 py-5 first:border-t-0 first:pt-0">
          <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between">
            <h3 className="text-base font-semibold text-terminal-text">{certification.title}</h3>
            <time className="font-mono text-mono-xs uppercase tracking-[0.16em] text-terminal-text-secondary">{certification.year}</time>
          </div>
          <p className="mt-1 font-mono text-mono-xs uppercase tracking-[0.16em] text-terminal-accent">{certification.issuer}</p>
          <p className="mt-2 max-w-3xl text-sm leading-7 text-terminal-text-secondary">{certification.description}</p>
        </article>
      ))}
    </div>
  </div>
);

export default CertificationsSection;
