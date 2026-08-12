import React from 'react';

interface SectionHeaderProps {
  verb: string;
  args?: string;
  meta?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ verb, args, meta }) => (
  <div className="mb-5 flex items-center justify-between gap-4">
    <div className="flex items-center gap-2 font-mono text-sm">
      <span className="text-terminal-prompt" aria-hidden="true">$</span>
      <span className="text-terminal-accent">{verb}</span>
      {args && <span className="text-terminal-text-secondary">{args}</span>}
    </div>
    {meta && (
      <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-terminal-text-secondary">
        {meta}
      </span>
    )}
  </div>
);

export default SectionHeader;
