/**
 * Constantes de sugerencias de comandos
 * @module constants/suggestions
 */

/**
 * Representa una sugerencia de comando
 * @interface Suggestion
 * @property {string} command - El comando sugerido
 * @property {string} description - Descripción del comando
 */
export interface Suggestion {
  command: string;
  description: string;
}

/**
 * Lista de comandos disponibles con sus descripciones
 * @constant
 */
export const COMMAND_SUGGESTIONS: readonly Suggestion[] = [
  { command: '/home', description: 'Ir a la página de inicio' },
  { command: '/experience', description: 'Ver experiencia laboral' },
  { command: '/projects', description: 'Ver proyectos destacados' },
  { command: '/skills', description: 'Ver habilidades técnicas' },
  { command: '/contact', description: 'Información de contacto' },
  { command: '/cv', description: 'Descargar mi CV' },
  { command: '/rain', description: 'Siéntete un hacker' },
  { command: '/help', description: 'Mostrar ayuda' },
  { command: '/clear', description: 'Limpiar la terminal' },
] as const;
