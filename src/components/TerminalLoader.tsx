import React from 'react';

const TerminalLoader: React.FC = () => {
  return (
    <div className="flex items-center space-x-2 py-1">
      <span className="text-terminal-text-secondary">$</span>
      <div className="flex space-x-1">
        <div className="w-2 h-2 rounded-full bg-[#61afef] animate-bounce" style={{ animationDelay: '0ms' }}></div>
        <div className="w-2 h-2 rounded-full bg-[#98c379] animate-bounce" style={{ animationDelay: '150ms' }}></div>
        <div className="w-2 h-2 rounded-full bg-[#e5c07b] animate-bounce" style={{ animationDelay: '300ms' }}></div>
      </div>
    </div>
  );
};

export default TerminalLoader;
