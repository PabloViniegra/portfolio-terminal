import { useState, useEffect, useRef, useCallback, useId } from "react";
import type { KeyboardEvent } from "react";
import CommandSuggestions from "./CommandSuggestions";
import { COMMAND_SUGGESTIONS, type Suggestion } from "../constants/suggestions";

type Props = {
  onCommand: (input: string) => void;
  onHistoryNavigate: (direction: 'up' | 'down') => string;
  disabled?: boolean;
};

export default function CommandInput({ onCommand, onHistoryNavigate, disabled = false }: Props) {
  const [input, setInput] = useState("");
  const [temporaryInput, setTemporaryInput] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState(0);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const listboxId = useId();
  const hasVisibleSuggestions = showSuggestions && suggestions.length > 0;

  const updateSuggestions = useCallback((value: string) => {
    if (!value.startsWith('/') || value.trim() === '') {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const inputValue = value.toLowerCase().substring(1);
    const filtered = COMMAND_SUGGESTIONS.filter(suggestion =>
      suggestion.command.substring(1).startsWith(inputValue)
    );
    
    setSuggestions(filtered);
    setShowSuggestions(filtered.length > 0);
    setSelectedSuggestion(0);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);
    
    if (value.startsWith('/')) {
      updateSuggestions(value);
    } else {
      setShowSuggestions(false);
      setSuggestions([]);
    }
  };

  const selectSuggestion = (command: string) => {
    setInput(command);
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  const autocompleteSuggestion = () => {
    if (suggestions.length > 0 && showSuggestions) {
      setInput(suggestions[selectedSuggestion].command);
      setShowSuggestions(false);
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
    
    const handleClickOutside = (event: MouseEvent) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleEscape = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape' && showSuggestions) {
        setShowSuggestions(false);
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [showSuggestions]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() === '' || disabled) return;
    onCommand(input);
    setInput('');
    setTemporaryInput('');
    setShowSuggestions(false);
  };

  /**
   * Maneja la navegación por sugerencias con flechas y Tab
   * @param {KeyboardEvent<HTMLInputElement>} e - Evento de teclado
   */
  const handleSuggestionNavigation = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    
    switch (e.key) {
      case 'ArrowDown':
        setSelectedSuggestion(prev => 
          prev < suggestions.length - 1 ? prev + 1 : 0
        );
        break;
        
      case 'ArrowUp':
        setSelectedSuggestion(prev => 
          prev > 0 ? prev - 1 : suggestions.length - 1
        );
        break;
        
      case 'Tab':
        if (suggestions.length > 0) {
          setInput(suggestions[selectedSuggestion].command);
          setShowSuggestions(false);
        }
        break;
    }
  }, [suggestions, selectedSuggestion]);

  /**
   * Maneja la navegación por el historial de comandos
   * @param {KeyboardEvent<HTMLInputElement>} e - Evento de teclado
   */
  const handleHistoryNavigation = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    
    const direction = e.key === 'ArrowUp' ? 'up' : 'down';
    
    // Guardar input actual antes de navegar hacia arriba
    if (direction === 'up' && temporaryInput === '') {
      setTemporaryInput(input);
    }
    
    const historyCommand = onHistoryNavigate(direction);
    
    // Restaurar input temporal al llegar al final del historial
    if (direction === 'down' && historyCommand === '' && temporaryInput !== '') {
      setInput(temporaryInput);
      setTemporaryInput('');
    } else if (historyCommand !== '') {
      setInput(historyCommand);
    }
  }, [input, temporaryInput, onHistoryNavigate]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (disabled) return;

    // Manejar Escape
    if (e.key === 'Escape' && showSuggestions) {
      e.preventDefault();
      setShowSuggestions(false);
      return;
    }

    // Manejar navegación por sugerencias
    if (hasVisibleSuggestions &&
        (e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'Tab')) {
      handleSuggestionNavigation(e);
      return;
    }

    // Manejar navegación por historial
    if (!hasVisibleSuggestions && (e.key === 'ArrowUp' || e.key === 'ArrowDown')) {
      handleHistoryNavigation(e);
      return;
    }

    // Manejar Tab para autocompletar cuando no hay sugerencias visibles
    if (e.key === 'Tab' && !hasVisibleSuggestions) {
      e.preventDefault();
      autocompleteSuggestion();
    }
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  return (
    <div className="relative w-full">
      <form onSubmit={handleSubmit} className="w-full relative">
        <div className="rounded-2xl border border-terminal-border/80 bg-terminal-bg-secondary/60 px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] transition-colors duration-200 focus-within:border-terminal-accent/40">
          <div className="mb-2 flex items-center justify-between gap-3">
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-terminal-text-secondary">
              command input
            </span>
            <span className="hidden font-mono text-[11px] uppercase tracking-[0.22em] text-terminal-text-secondary md:inline">
              /help · tab autocomplete · history
            </span>
          </div>
          <div className="relative flex items-center">
            <span className="mr-3 font-mono text-lg font-bold text-terminal-prompt">$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onKeyUp={handleKeyUp}
              onFocus={() => {
                if (input.startsWith('/')) {
                  updateSuggestions(input);
                } else {
                  setShowSuggestions(false);
                }
              }}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              className="command-input flex-1 bg-transparent outline-none text-base"
              disabled={disabled}
              autoFocus
              role="combobox"
              aria-label="Comando de terminal"
              aria-autocomplete="list"
              aria-expanded={hasVisibleSuggestions}
              aria-controls={hasVisibleSuggestions ? `${listboxId}-listbox` : undefined}
              aria-activedescendant={hasVisibleSuggestions ? `${listboxId}-listbox-opt-${selectedSuggestion}` : undefined}
              placeholder={disabled ? 'Procesando comando...' : 'Prueba con /projects, /experience o /contact'}
            />
          </div>
          <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[11px] text-terminal-text-secondary/70">
            <span>tab · autocomplete</span>
            <span>↑↓ · history</span>
          </div>
        </div>
        <div ref={suggestionsRef} className="absolute left-0 right-0 -top-1 transform -translate-y-full">
          <CommandSuggestions
            suggestions={suggestions}
            selectedIndex={selectedSuggestion}
            onSelect={selectSuggestion}
            visible={hasVisibleSuggestions && !disabled}
            listboxId={listboxId}
          />
        </div>
      </form>
    </div>
  );
}
