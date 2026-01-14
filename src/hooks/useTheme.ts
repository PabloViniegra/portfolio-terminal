import { useState, useEffect } from 'react';

/**
 * Tipos de temas disponibles en la aplicación
 */
export type ThemeType = 'one-dark' | 'light' | 'ayu' | 'github-dark';

/**
 * Hook personalizado para gestionar el tema de la aplicación
 * 
 * Centraliza toda la lógica relacionada con el tema:
 * - Lee el tema inicial desde localStorage
 * - Actualiza el atributo data-theme en el HTML
 * - Persiste el tema en localStorage
 * - Proporciona una función para cambiar el tema
 * 
 * @returns {Object} Objeto con el tema actual y función para cambiarlo
 * @property {ThemeType} theme - El tema actualmente activo
 * @property {(newTheme: ThemeType) => void} setTheme - Función para cambiar el tema
 * 
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { theme, setTheme } = useTheme();
 *   
 *   return (
 *     <button onClick={() => setTheme('light')}>
 *       Tema actual: {theme}
 *     </button>
 *   );
 * }
 * ```
 */
export function useTheme() {
  const [theme, setThemeState] = useState<ThemeType>('one-dark');

  useEffect(() => {
    // Leer tema inicial desde localStorage
    const savedTheme = (localStorage.getItem('theme') as ThemeType) || 'one-dark';
    setThemeState(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  /**
   * Cambia el tema de la aplicación
   * @param {ThemeType} newTheme - El nuevo tema a aplicar
   */
  const setTheme = (newTheme: ThemeType) => {
    setThemeState(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return { theme, setTheme };
}
