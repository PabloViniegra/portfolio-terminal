import React from 'react';

type Suggestion = {
  command: string;
  description: string;
};

type CommandSuggestionsProps = {
  suggestions: Suggestion[];
  selectedIndex: number;
  onSelect: (command: string) => void;
  visible: boolean;
};

const CommandSuggestions: React.FC<CommandSuggestionsProps> = ({
  suggestions,
  selectedIndex,
  onSelect,
  visible,
}) => {
  if (!visible || suggestions.length === 0) return null;

  return (
    <div className="relative w-full">
      <div 
        className="absolute bottom-full left-0 right-0 mb-1 rounded-md shadow-lg z-50 overflow-hidden"
        style={{
          backgroundColor: 'var(--terminal-bg)',
          border: '1px solid var(--terminal-border)'
        }}
      >
        <div 
          className="rounded-md shadow-inner"
          style={{
            backgroundColor: 'var(--terminal-bg)',
            border: '1px solid var(--terminal-border)'
          }}
        >
          <ul className="py-1" style={{ backgroundColor: 'var(--terminal-bg)' }}>
          {suggestions.map((suggestion, index) => (
            <li
              key={suggestion.command}
              className={`px-4 py-2.5 text-sm cursor-pointer flex justify-between items-center ${
                index === selectedIndex
                  ? 'bg-terminal-accent/10 text-terminal-accent'
                  : 'text-terminal-text hover:bg-terminal-bg-secondary'
              } transition-colors duration-150`}
              onMouseDown={(e) => {
                e.preventDefault(); // Evitar que el input pierda el foco
                onSelect(suggestion.command);
              }}
            >
              <span className="font-mono text-terminal-accent/90">{suggestion.command}</span>
              <span className="text-terminal-text-secondary ml-4 text-right">{suggestion.description}</span>
            </li>
          ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CommandSuggestions;
