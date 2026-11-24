import React from 'react';

interface SectionHeaderProps {
  verb: string;
  args?: string;
  meta?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ verb, args, meta }) => (
  <div className="mb-5 flex flex-wrap items-center gap-x-4 gap-y-2">
    <h2 className="flex shrink-0 items-baseline gap-2">
      <span className="font-mono text-sm text-terminal-prompt" aria-hidden="true">$</span>
      <span className="font-pixel text-xl font-medium uppercase tracking-[-0.01em] text-terminal-accent md:text-2xl">{verb}</span>
      {args && <> <span className="font-mono text-sm text-terminal-text-secondary">{args}</span></>}
    </h2>
    <span className="section-rule flex-1 text-terminal-accent" aria-hidden="true"></span>
    {meta && (
      <span className="shrink-0 font-pixel text-mono-sm uppercase tracking-[0.16em] text-terminal-text-secondary">
        {meta}
      </span>
    )}
  </div>
);

export default SectionHeader;
