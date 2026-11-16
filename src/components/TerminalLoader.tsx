import React from 'react';

const TerminalLoader: React.FC = () => {
  return (
    <div className="flex items-center gap-3 py-2 font-mono text-sm text-terminal-text-secondary" role="status">
      <span className="terminal-spinner text-terminal-prompt" aria-hidden="true" />
      <span>Ejecutando comando</span>
    </div>
  );
};

export default TerminalLoader;
