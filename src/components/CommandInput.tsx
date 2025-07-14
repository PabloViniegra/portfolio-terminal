import { useState, useEffect, useRef, useCallback } from "react";
import type { KeyboardEvent } from "react";
import CommandSuggestions from "./CommandSuggestions";

type Suggestion = {
  command: string;
  description: string;
};

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
  const formRef = useRef<HTMLFormElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  const updateSuggestions = useCallback((value: string) => {
    // Solo mostramos sugerencias si el input comienza con '/'
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
    
    // Solo mostramos sugerencias si el input comienza con '/'
    if (value.startsWith('/')) {
      updateSuggestions(value);
    } else {
      // Ocultamos las sugerencias si el usuario borra la '/'
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

    // Manejar teclas de navegación solo si no estamos en modo de edición normal
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'Tab') {
      // Si hay sugerencias visibles, manejamos la navegación entre ellas
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
      // Si no hay sugerencias visibles, manejamos la navegación del historial
      else if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        e.preventDefault();
        
        // Guardar el input actual solo si es la primera vez que presionamos arriba
        if (e.key === 'ArrowUp' && temporaryInput === '') {
          setTemporaryInput(input);
        }
        
        // Obtener el comando del historial
        const historyCommand = onHistoryNavigate(e.key === 'ArrowUp' ? 'up' : 'down');
        
        // Actualizar el input con el comando del historial o restaurar el input temporal
        if (e.key === 'ArrowDown' && historyCommand === '' && temporaryInput !== '') {
          setInput(temporaryInput);
          setTemporaryInput('');
        } else if (historyCommand !== '') {
          setInput(historyCommand);
        }
      }
    }
    // Cerrar sugerencias con Escape
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
    <div className="relative">
      <form onSubmit={handleSubmit} className="w-full">
        <div className="flex items-center">
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
            className="command-input flex-1"
            disabled={disabled}
            autoFocus
            aria-label="Comando de terminal"
            placeholder={disabled ? 'Procesando comando...' : 'Escribe un comando...'}
          />
        </div>
      </form>
      <CommandSuggestions
        suggestions={suggestions}
        selectedIndex={selectedSuggestion}
        onSelect={selectSuggestion}
        visible={showSuggestions && !disabled}
      />
    </div>
  );
}