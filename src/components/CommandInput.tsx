import { useState, useEffect, useRef, useCallback } from "react";
import type { KeyboardEvent } from "react";
import CommandSuggestions from "./CommandSuggestions";
import { COMMAND_SUGGESTIONS, type Suggestion } from "../constants/suggestions";

/**
 * Props del componente CommandInput
 * @interface Props
 * @property {(input: string) => void} onCommand - Callback ejecutado cuando se envía un comando
 * @property {(direction: 'up' | 'down') => string} onHistoryNavigate - Callback para navegar por el historial
 * @property {boolean} [disabled=false] - Si el input está deshabilitado
 */
type Props = {
  onCommand: (input: string) => void;
  onHistoryNavigate: (direction: 'up' | 'down') => string;
  disabled?: boolean;
};

/**
 * Componente de entrada de comandos para la terminal
 * 
 * Proporciona un campo de entrada con características avanzadas:
 * - Autocompletado de comandos con Tab
 * - Navegación por historial con flechas arriba/abajo
 * - Sugerencias en tiempo real
 * - Navegación por sugerencias con flechas
 * 
 * @component
 * @param {Props} props - Props del componente
 * @returns {JSX.Element} Campo de entrada de comandos
 * 
 * @example
 * ```tsx
 * <CommandInput
 *   onCommand={(cmd) => console.log(cmd)}
 *   onHistoryNavigate={(dir) => getPreviousCommand(dir)}
 *   disabled={false}
 * />
 * ```
 */
export default function CommandInput({ onCommand, onHistoryNavigate, disabled = false }: Props) {
  const [input, setInput] = useState("");
  const [temporaryInput, setTemporaryInput] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState(0);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

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
    if (showSuggestions && suggestions.length > 0 && 
        (e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'Tab')) {
      handleSuggestionNavigation(e);
      return;
    }

    // Manejar navegación por historial
    if (!showSuggestions && (e.key === 'ArrowUp' || e.key === 'ArrowDown')) {
      handleHistoryNavigation(e);
      return;
    }

    // Manejar Tab para autocompletar cuando no hay sugerencias visibles
    if (e.key === 'Tab' && !showSuggestions) {
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
        <div className="flex items-center relative">
          <span className="text-terminal-prompt font-mono font-bold mr-2">$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onKeyUp={handleKeyUp}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            className="command-input flex-1 bg-transparent outline-none"
            disabled={disabled}
            autoFocus
            aria-label="Comando de terminal"
            placeholder={disabled ? 'Procesando comando...' : 'Escribe un comando...'}
          />
        </div>
        <div className="absolute left-0 right-0 -top-1 transform -translate-y-full">
          <CommandSuggestions
            suggestions={suggestions}
            selectedIndex={selectedSuggestion}
            onSelect={selectSuggestion}
            visible={showSuggestions && !disabled}
          />
        </div>
      </form>
    </div>
  );
}