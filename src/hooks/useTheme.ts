import { useState, useEffect } from 'react';
import { DEFAULT_THEME } from '../constants/themes';

/**
 * Tipos de temas disponibles en la aplicación
 */
export type ThemeType = 'one-dark' | 'light' | 'ayu' | 'github-dark';

/**
 * Obtiene el tema guardado en localStorage de forma segura
 * @returns {ThemeType} El tema guardado o el tema por defecto
 */
const getSavedTheme = (): ThemeType => {
  try {
    const savedTheme = localStorage.getItem('theme');
    return (savedTheme as ThemeType) || DEFAULT_THEME;
  } catch (error) {
    console.warn('localStorage no disponible, usando tema por defecto:', error);
    return DEFAULT_THEME;
  }
};

/**
 * Guarda el tema en localStorage de forma segura
 * @param {ThemeType} theme - El tema a guardar
 */
const saveTheme = (theme: ThemeType): void => {
  try {
    localStorage.setItem('theme', theme);
  } catch (error) {
    console.warn('No se pudo guardar el tema en localStorage:', error);
  }
};

/**
 * Hook personalizado para gestionar el tema de la aplicación
 * 
 * Centraliza toda la lógica relacionada con el tema:
 * - Lee el tema inicial desde localStorage (con manejo de errores)
 * - Actualiza el atributo data-theme en el HTML
 * - Persiste el tema en localStorage (con manejo de errores)
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
  const [theme, setThemeState] = useState<ThemeType>(DEFAULT_THEME);

  useEffect(() => {
    // Leer tema inicial desde localStorage
    const savedTheme = getSavedTheme();
    setThemeState(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  /**
   * Cambia el tema de la aplicación
   * @param {ThemeType} newTheme - El nuevo tema a aplicar
   */
  const setTheme = (newTheme: ThemeType) => {
    setThemeState(newTheme);
    saveTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return { theme, setTheme };
}
