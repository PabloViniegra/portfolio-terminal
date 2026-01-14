/**
 * Constantes de comandos disponibles en la terminal
 * @module constants/commands
 */

/**
 * Comandos disponibles en la terminal
 * @constant
 */
export const COMMANDS = {
  RAIN: '/rain',
  CLEAR: '/clear',
  HELP: '/help',
  HOME: '/home',
  EXPERIENCE: '/experience',
  PROJECTS: '/projects',
  SKILLS: '/skills',
  CONTACT: '/contact',
  CV: '/cv',
} as const;

/**
 * Tipo derivado de los comandos disponibles
 */
export type CommandType = typeof COMMANDS[keyof typeof COMMANDS];

/**
 * Configuración de delays para la simulación de procesamiento de comandos
 * @constant
 */
export const COMMAND_DELAYS = {
  MIN: 200,
  MAX: 400,
} as const;
