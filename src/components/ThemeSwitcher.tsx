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
        className={`flex items-center space-x-2 px-3 py-2 text-sm rounded-md transition-all duration-200
          bg-terminal-bg border border-terminal-border shadow-sm
          text-terminal-text hover:bg-terminal-bg-secondary hover:border-terminal-accent/30
          focus:outline-none focus:ring-1 focus:ring-terminal-accent focus:ring-opacity-50`}
        aria-label="Cambiar tema"
        aria-expanded={isOpen}
      >
        <span className={`w-3 h-3 rounded-full ${currentThemeData.color}`}></span>
        <span className="hidden md:inline">{currentThemeData.name}</span>
        <span className="ml-1">▼</span>
      </button>

      {isOpen && (
        <div className={`absolute right-0 mt-1 w-48 rounded-md shadow-xl py-1 z-30 overflow-hidden
          bg-terminal-bg border border-terminal-border/80 backdrop-blur-sm
          transform transition-all duration-200 ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
          style={{
            background: 'rgba(var(--terminal-bg-rgb), 0.95)',
            backdropFilter: 'blur(8px)'
          }}>
          {themes.map((theme) => (
            <button
              key={theme.id}
              onClick={() => setTheme(theme.id)}
              className={`w-full text-left px-4 py-2.5 text-sm flex items-center space-x-3
                transition-all duration-150 ${currentTheme === theme.id
                  ? 'bg-terminal-accent/15 text-terminal-accent font-medium'
                  : 'text-terminal-text hover:bg-terminal-bg-secondary'}`}
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
