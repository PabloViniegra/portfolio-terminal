import { useState, useEffect, useRef } from 'react';

type Theme = {
  id: string;
  name: string;
  color: string;
};

const themes: Theme[] = [
  { 
    id: 'one-dark', 
    name: 'One Dark', 
    color: 'bg-[#61afef]' 
  },
  { 
    id: 'light', 
    name: 'Light', 
    color: 'bg-[#e5c07b]' 
  },
  { 
    id: 'ayu', 
    name: 'Ayu', 
    color: 'bg-[#ffb454]' 
  },
  { 
    id: 'github-dark', 
    name: 'GitHub', 
    color: 'bg-[#58a6ff]' 
  },
];

const ThemeSwitcher = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('one-dark');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'one-dark';
    setCurrentTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const setTheme = (themeId: string) => {
    setCurrentTheme(themeId);
    localStorage.setItem('theme', themeId);
    document.documentElement.setAttribute('data-theme', themeId);
    setIsOpen(false);
  };

  const currentThemeData = themes.find(theme => theme.id === currentTheme) || themes[0];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center space-x-2 px-3 py-2 text-sm rounded-md transition-colors
          bg-terminal-bg-secondary hover:bg-terminal-bg border border-terminal-border/50
          text-terminal-text hover:text-terminal-accent`}
        aria-label="Cambiar tema"
      >
        <span className={`w-3 h-3 rounded-full ${currentThemeData.color}`}></span>
        <span className="hidden md:inline">{currentThemeData.name}</span>
        <span className="ml-1">▼</span>
      </button>

      {isOpen && (
        <div className={`absolute right-0 mt-2 w-40 rounded-md shadow-lg py-1 z-50
          bg-terminal-bg-secondary border border-terminal-border/50`}>
          {themes.map((theme) => (
            <button
              key={theme.id}
              onClick={() => setTheme(theme.id)}
              className={`w-full text-left px-4 py-2 text-sm flex items-center space-x-2
                transition-colors ${currentTheme === theme.id
                  ? 'bg-terminal-accent/10 text-terminal-accent'
                  : 'text-terminal-text hover:bg-terminal-bg'}`}
            >
              <span className={`w-3 h-3 rounded-full ${theme.color}`}></span>
              <span>{theme.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ThemeSwitcher;
