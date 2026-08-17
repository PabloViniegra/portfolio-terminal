import { useState, useEffect, useRef, useId } from "react";
import type { KeyboardEvent } from "react";
import CommandSuggestions from "./CommandSuggestions";
import type { Suggestion } from "../constants/suggestions";

type Props = {
  onCommand: (input: string) => void;
  onHistoryNavigate: (direction: 'up' | 'down') => string;
  suggestions: readonly Suggestion[];
  disabled?: boolean;
};

export default function CommandInput({ onCommand, onHistoryNavigate, suggestions: availableSuggestions, disabled = false }: Props) {
  const [input, setInput] = useState("");
  const [temporaryInput, setTemporaryInput] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState(0);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const listboxId = useId();
  const hasVisibleSuggestions = showSuggestions && suggestions.length > 0;

  const updateSuggestions = (value: string) => {
    if (!value.startsWith('/') || value.trim() === '') {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const inputValue = value.toLowerCase().substring(1);
    const filtered = availableSuggestions.filter(suggestion =>
      suggestion.command.substring(1).startsWith(inputValue)
    );
    
    setSuggestions(filtered);
    setShowSuggestions(filtered.length > 0);
    setSelectedSuggestion(0);
  };

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
      // SAFETY: mousedown always targets a DOM Element (subtype of Node); never null at this point.
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
    if (disabled) return;
    if (document.activeElement && document.activeElement !== document.body) return;
    inputRef.current?.focus();
  }, [disabled]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() === '' || disabled) return;
    onCommand(input);
    setInput('');
    setTemporaryInput(null);
    setShowSuggestions(false);
  };

  const handleSuggestionNavigation = (e: KeyboardEvent<HTMLInputElement>) => {
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
  };

  const handleHistoryNavigation = (e: KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    
    const direction = e.key === 'ArrowUp' ? 'up' : 'down';
    
    if (direction === 'up' && temporaryInput === null) {
      setTemporaryInput(input);
    }
    
    const historyCommand = onHistoryNavigate(direction);
    
    if (direction === 'down' && historyCommand === '' && temporaryInput !== null) {
      setInput(temporaryInput);
      setTemporaryInput(null);
    } else if (historyCommand !== '') {
      setInput(historyCommand);
    }
  };

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

  return (
    <div className="relative w-full">
      <form onSubmit={handleSubmit} className="w-full relative">
        <div className="rounded-2xl border border-terminal-border/80 bg-terminal-bg-secondary/60 px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] transition-colors duration-200 focus-within:border-terminal-accent/40">
          <div className="mb-2 flex items-center justify-between gap-3">
            <span className="font-mono text-mono-xs uppercase tracking-[0.22em] text-terminal-text-secondary">
              command input
            </span>
            <span className="hidden font-mono text-mono-xs uppercase tracking-[0.22em] text-terminal-text-secondary md:inline">
              /help · tab · history
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
              onFocus={() => {
                if (input.startsWith('/')) {
                  updateSuggestions(input);
                } else {
                  setShowSuggestions(false);
                }
              }}
              onBlur={() => window.setTimeout(() => setShowSuggestions(false), 200)}
              className="command-input flex-1 bg-transparent outline-none text-base"
              disabled={disabled}
              autoFocus
              role="combobox"
              aria-label="Comando de terminal"
              aria-haspopup="listbox"
              aria-autocomplete="list"
              aria-expanded={hasVisibleSuggestions}
              aria-controls={hasVisibleSuggestions ? `${listboxId}-listbox` : undefined}
              aria-activedescendant={hasVisibleSuggestions ? `${listboxId}-listbox-opt-${selectedSuggestion}` : undefined}
              placeholder={disabled ? 'Procesando comando...' : 'Prueba con /contact, /projects o /experience'}
            />
          </div>
          <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 font-mono text-mono-xs text-terminal-text-secondary/70">
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
