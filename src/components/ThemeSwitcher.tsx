import { useEffect, useRef, useState } from 'react';

import { THEMES } from '../constants/themes';
import { useTheme, type ThemeType } from '../hooks/useTheme';

const ThemeSwitcher = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme: currentTheme, setTheme: changeTheme } = useTheme();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleThemeChange = (themeId: ThemeType) => {
    changeTheme(themeId);
    setIsOpen(false);
  };

  const currentThemeData = THEMES.find((theme) => theme.id === currentTheme) || THEMES[0];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-lg border border-terminal-border/70 bg-terminal-bg-secondary/60 px-3 py-2 text-sm text-terminal-text transition-all duration-200 hover:border-terminal-accent/40 hover:text-terminal-accent focus:outline-none focus:ring-1 focus:ring-terminal-accent/50 active:scale-[0.96]"
        aria-label="Cambiar tema"
        aria-expanded={isOpen}
      >
        <span className={`h-3 w-3 rounded-full ${currentThemeData.color}`} aria-hidden="true"></span>
        <span className="hidden md:inline">{currentThemeData.name}</span>
        <span className="inline md:hidden">{currentThemeData.abbreviation}</span>
        <span className="text-xs text-terminal-text-secondary">theme</span>
      </button>

      <div
        data-state={isOpen ? 'open' : 'closed'}
        className="absolute right-0 mt-2 w-52 origin-top-right overflow-hidden rounded-xl border border-terminal-border/80 bg-terminal-bg/95 py-1 shadow-xl backdrop-blur-sm transition-[opacity,transform] duration-150 ease-out data-[state=closed]:pointer-events-none data-[state=closed]:scale-95 data-[state=closed]:opacity-0"
        style={{ zIndex: 'var(--z-dropdown)' }}
        role="menu"
        aria-label="Selector de tema"
        inert={!isOpen}
      >
        {THEMES.map((theme) => (
          <button
            key={theme.id}
            onClick={() => handleThemeChange(theme.id)}
            className={`flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors duration-150 focus:outline-none focus:ring-1 focus:ring-terminal-accent/50 focus:ring-inset active:scale-[0.96] ${
              currentTheme === theme.id
                ? 'bg-terminal-accent/12 text-terminal-accent font-medium'
                : 'text-terminal-text hover:bg-terminal-bg-secondary/80'
            }`}
            role="menuitem"
            aria-label={`Cambiar al tema ${theme.name}`}
            aria-pressed={currentTheme === theme.id}
          >
            <span className={`h-3 w-3 rounded-full ${theme.color}`} aria-hidden="true"></span>
            <span>{theme.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ThemeSwitcher;
