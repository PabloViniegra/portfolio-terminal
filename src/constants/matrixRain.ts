/**
 * Constantes para el efecto Matrix Rain
 * @module constants/matrixRain
 */

/**
 * Configuración del efecto Matrix Rain
 * @constant
 */
export const MATRIX_CONFIG = {
  /**
   * Tamaño de la fuente en píxeles
   */
  FONT_SIZE: 14,
  
  /**
   * Caracteres utilizados en el efecto Matrix
   * Incluye números binarios y caracteres japoneses katakana
   */
  CHARACTERS: '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン',
  
  /**
   * Opacidad del fondo para el efecto de desvanecimiento
   */
  FADE_OPACITY: 0.05,
  
  /**
   * Probabilidad de que un carácter brille en blanco (0-1)
   */
  BRIGHT_PROBABILITY: 0.95,
  
  /**
   * Probabilidad de que una columna se reinicie (0-1)
   */
  RESET_PROBABILITY: 0.975,
  
  /**
   * Opacidad del canvas completo
   */
  CANVAS_OPACITY: 0.6,
} as const;
