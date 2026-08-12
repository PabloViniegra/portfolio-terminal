import React from 'react';
import type { Suggestion } from '../constants/suggestions';

type CommandSuggestionsProps = {
  suggestions: Suggestion[];
  selectedIndex: number;
  onSelect: (command: string) => void;
  visible: boolean;
  listboxId: string;
};

const CommandSuggestions: React.FC<CommandSuggestionsProps> = ({
  suggestions,
  selectedIndex,
  onSelect,
  visible,
  listboxId,
}) => {
  if (!visible || suggestions.length === 0) return null;

  const activeOptionId = `${listboxId}-opt-${selectedIndex}`;

  return (
    <div className="relative w-full">
      <div
        className="absolute bottom-full left-0 right-0 mb-1 suggestions-dropdown"
        style={{ zIndex: 'var(--z-dropdown)' }}
      >
        <div className="suggestions-dropdown-inner">
          <ul
            id={`${listboxId}-listbox`}
            role="listbox"
            aria-label="Sugerencias de comandos"
            aria-activedescendant={activeOptionId}
            className="py-1 bg-terminal-bg"
          >
            {suggestions.map((suggestion, index) => {
              const optionId = `${listboxId}-listbox-opt-${index}`;
              const isSelected = index === selectedIndex;
              return (
                <li
                  key={suggestion.command}
                  id={optionId}
                  role="option"
                  aria-selected={isSelected}
                  className={`px-4 py-2.5 text-sm cursor-pointer flex justify-between items-center transition-colors duration-150 ${
                    isSelected
                      ? 'bg-terminal-accent/10 text-terminal-accent'
                      : 'text-terminal-text hover:bg-terminal-bg-secondary'
                  }`}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    onSelect(suggestion.command);
                  }}
                >
                  <span className="font-mono text-terminal-accent/90">{suggestion.command}</span>
                  <span className="text-terminal-text-secondary ml-4 text-right">{suggestion.description}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CommandSuggestions;
