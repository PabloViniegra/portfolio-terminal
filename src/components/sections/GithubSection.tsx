import React from 'react';
import type { GithubItem } from '../../types/content';
import SectionHeader from './SectionHeader';

interface GithubSectionProps {
  github: GithubItem;
}

const GithubSection: React.FC<GithubSectionProps> = ({ github }) => {
  return (
    <div className="font-sans">
      <SectionHeader verb="tail" args="github/contribution.log" meta={github.period} />
      <p className="max-w-3xl text-sm leading-7 text-terminal-text-secondary">{github.summary}</p>
      <p className="mt-4 font-mono text-2xl font-semibold text-terminal-accent">{github.contributions} <span className="text-sm font-normal text-terminal-text-secondary">contribuciones públicas</span></p>
      <div className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {github.months.map((month) => (
          <div key={month.label} className="border-t border-terminal-border/40 pt-2">
            <div className="flex items-center justify-between gap-3 font-mono text-mono-xs text-terminal-text-secondary">
              <span>{month.label}</span>
              <span className="text-terminal-text">{month.contributions}</span>
            </div>
          </div>
        ))}
      </div>
      <a href={github.profileUrl} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex font-mono text-mono-xs uppercase tracking-[0.16em] text-terminal-accent underline underline-offset-4 focus:outline-none focus:ring-1 focus:ring-terminal-accent/50">Ver perfil en GitHub ↗</a>
    </div>
  );
};

export default GithubSection;
