import React from 'react';
import type { Suggestion } from '../constants/suggestions';

/**
 * Props del componente CommandSuggestions
 * @interface CommandSuggestionsProps
 * @property {Suggestion[]} suggestions - Lista de sugerencias de comandos
 * @property {number} selectedIndex - Índice de la sugerencia seleccionada
 * @property {(command: string) => void} onSelect - Callback al seleccionar una sugerencia
 * @property {boolean} visible - Si las sugerencias deben mostrarse
 */
type CommandSuggestionsProps = {
  suggestions: Suggestion[];
  selectedIndex: number;
  onSelect: (command: string) => void;
  visible: boolean;
};

/**
 * Componente que muestra sugerencias de comandos
 * 
 * @component
 * @param {CommandSuggestionsProps} props - Props del componente
 * @returns {JSX.Element | null} Lista de sugerencias o null si no hay sugerencias
 * 
 * @example
 * ```tsx
 * <CommandSuggestions
 *   suggestions={filteredSuggestions}
 *   selectedIndex={0}
 *   onSelect={(cmd) => setInput(cmd)}
 *   visible={showSuggestions}
 * />
 * ```
 */
const CommandSuggestions: React.FC<CommandSuggestionsProps> = ({
  suggestions,
  selectedIndex,
  onSelect,
  visible,
}) => {
  if (!visible || suggestions.length === 0) return null;

  return (
    <div className="relative w-full">
      <div className="absolute bottom-full left-0 right-0 mb-1 z-50 suggestions-dropdown">
        <div className="suggestions-dropdown-inner">
          <ul className="py-1 bg-terminal-bg">
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
