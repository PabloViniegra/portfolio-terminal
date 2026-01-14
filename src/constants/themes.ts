import type { ThemeType } from '../hooks/useTheme';

/**
 * Constantes de temas disponibles en la aplicación
 * @module constants/themes
 */

/**
 * Representa un tema de la aplicación
 * @interface Theme
 * @property {ThemeType} id - Identificador único del tema
 * @property {string} name - Nombre visible del tema
 * @property {string} color - Clase de Tailwind para el color representativo
 */
export interface Theme {
  id: ThemeType;
  name: string;
  color: string;
}

/**
 * Lista de temas disponibles en la aplicación
 * @constant
 */
export const THEMES: readonly Theme[] = [
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
] as const;

/**
 * Tema por defecto de la aplicación
 * @constant
 */
export const DEFAULT_THEME: ThemeType = 'one-dark';
