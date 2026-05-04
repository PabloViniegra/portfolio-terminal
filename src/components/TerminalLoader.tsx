import React from 'react';

const TerminalLoader: React.FC = () => {
  return (
    <div className="flex items-center gap-3 py-2">
      <span className="font-mono text-xs uppercase tracking-[0.22em] text-terminal-text-secondary">
        executing
      </span>
      <div className="flex items-center gap-1">
        <div className="h-1.5 w-6 rounded-full bg-terminal-accent/80 animate-pulse"></div>
        <div className="h-1.5 w-3 rounded-full bg-terminal-text-secondary/50 animate-pulse" style={{ animationDelay: '120ms' }}></div>
        <div className="h-1.5 w-2 rounded-full bg-terminal-text-secondary/30 animate-pulse" style={{ animationDelay: '240ms' }}></div>
      </div>
    </div>
  );
};

export default TerminalLoader;
