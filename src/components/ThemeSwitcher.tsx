import { useEffect, useRef, useState, type KeyboardEvent } from 'react';

import { getTheme, THEMES } from '../constants/themes';
import { useTheme, type ThemeType } from '../hooks/useTheme';

const ThemeSwitcher = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme: currentTheme, setTheme: changeTheme } = useTheme();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // SAFETY: mousedown always targets a DOM Element (subtype of Node); never null at this point.
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // React handles this at the root before document listeners run, so the
  // fullscreen Escape handler in Terminal sees defaultPrevented and stays put.
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'Escape' || !isOpen) return;
    event.preventDefault();
    setIsOpen(false);
    triggerRef.current?.focus();
  };

  const handleThemeChange = (themeId: ThemeType) => {
    changeTheme(themeId);
    setIsOpen(false);
  };

  const currentThemeData = getTheme(currentTheme);

  return (
    <div className="relative" ref={dropdownRef} onKeyDown={handleKeyDown}>
      <button
        ref={triggerRef}
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        className="header-control"
        aria-label="Cambiar tema"
        aria-expanded={isOpen}
      >
        <span className={`h-3 w-3 rounded-full ${currentThemeData.color}`} aria-hidden="true"></span>
        <span>{currentThemeData.name}</span>
        <span className="hidden text-xs text-terminal-text-secondary md:inline">tema</span>
      </button>

      <div
        data-state={isOpen ? 'open' : 'closed'}
        className="absolute right-0 mt-2 w-52 origin-top-right overflow-hidden border border-terminal-border/80 bg-terminal-bg/95 py-1 shadow-(--shadow-terminal) transition-[opacity,transform] duration-150 ease-out data-[state=closed]:pointer-events-none data-[state=closed]:scale-95 data-[state=closed]:opacity-0"
        style={{ zIndex: 'var(--z-dropdown)' }}
        role="menu"
        aria-label="Selector de tema"
        inert={!isOpen}
      >
        {THEMES.map((theme) => (
          <button
            key={theme.id}
            onClick={() => handleThemeChange(theme.id)}
            type="button"
            className={`flex min-h-11 w-full items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors duration-(--motion-fast) focus:outline-none focus-visible:ring-1 focus-visible:ring-terminal-accent/50 focus-visible:ring-inset ${
              currentTheme === theme.id
                ? 'bg-terminal-accent/10 text-terminal-accent font-medium'
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
