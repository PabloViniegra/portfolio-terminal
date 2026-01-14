import { useState, useEffect, useRef, useCallback } from "react";
import type { KeyboardEvent } from "react";
import CommandSuggestions from "./CommandSuggestions";

/**
 * Representa una sugerencia de comando
 * @typedef {Object} Suggestion
 * @property {string} command - El comando sugerido
 * @property {string} description - Descripción del comando
 */
type Suggestion = {
  command: string;
  description: string;
};

/**
 * Lista de comandos disponibles con sus descripciones
 * @constant
 */
const COMMAND_SUGGESTIONS: Suggestion[] = [
  { command: '/home', description: 'Ir a la página de inicio' },
  { command: '/experience', description: 'Ver experiencia laboral' },
  { command: '/projects', description: 'Ver proyectos destacados' },
  { command: '/skills', description: 'Ver habilidades técnicas' },
  { command: '/contact', description: 'Información de contacto' },
  { command: '/cv', description: 'Descargar mi CV' },
  { command: '/rain', description: 'Siéntete un hacker' },
  { command: '/help', description: 'Mostrar ayuda' },
  { command: '/clear', description: 'Limpiar la terminal' },
];

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

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (disabled) return;

    if (e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'Tab') {
      if (showSuggestions && suggestions.length > 0) {
        e.preventDefault();
        
        switch (e.key) {
          case 'ArrowDown':
            setSelectedSuggestion(prev => 
              prev < suggestions.length - 1 ? prev + 1 : 0
            );
            return;
            
          case 'ArrowUp':
            setSelectedSuggestion(prev => 
              prev > 0 ? prev - 1 : suggestions.length - 1
            );
            return;
            
          case 'Tab':
            if (suggestions.length > 0) {
              e.preventDefault();
              setInput(suggestions[selectedSuggestion].command);
              setShowSuggestions(false);
            }
            return;
        }
      } 
      else if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        e.preventDefault();
        
        if (e.key === 'ArrowUp' && temporaryInput === '') {
          setTemporaryInput(input);
        }
        
        const historyCommand = onHistoryNavigate(e.key === 'ArrowUp' ? 'up' : 'down');
        
        if (e.key === 'ArrowDown' && historyCommand === '' && temporaryInput !== '') {
          setInput(temporaryInput);
          setTemporaryInput('');
        } else if (historyCommand !== '') {
          setInput(historyCommand);
        }
      }
    }
    else if (e.key === 'Escape') {
      if (showSuggestions) {
        e.preventDefault();
        setShowSuggestions(false);
      }
    }
    
    
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