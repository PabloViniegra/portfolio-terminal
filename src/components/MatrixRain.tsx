import { useEffect, useRef, useCallback } from 'react';
import { MATRIX_CONFIG } from '../constants/matrixRain';

/**
 * Props del componente MatrixRain
 * @interface MatrixRainProps
 * @property {() => void} [onDeactivate] - Callback ejecutado cuando se desactiva el efecto
 */
interface MatrixRainProps {
  onDeactivate?: () => void;
}

/**
 * Componente que renderiza el efecto Matrix Rain
 * 
 * Crea un efecto visual de lluvia de caracteres estilo Matrix sobre un canvas.
 * El efecto puede desactivarse presionando Ctrl+C.
 * 
 * @component
 * @param {MatrixRainProps} props - Props del componente
 * @returns {JSX.Element} Canvas con el efecto Matrix Rain
 * 
 * @example
 * ```tsx
 * <MatrixRain onDeactivate={() => setShowRain(false)} />
 * ```
 */
const MatrixRain: React.FC<MatrixRainProps> = ({ onDeactivate }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const columnsRef = useRef<number[]>([]);

  const init = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const columns = Math.floor(canvas.width / MATRIX_CONFIG.FONT_SIZE);
    columnsRef.current = Array(columns).fill(0);

    ctx.fillStyle = '#0f0';
    ctx.font = `${MATRIX_CONFIG.FONT_SIZE}px monospace`;
  }, []);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Fondo semi-transparente para efecto de desvanecimiento
    ctx.fillStyle = `rgba(0, 0, 0, ${MATRIX_CONFIG.FADE_OPACITY})`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = `${MATRIX_CONFIG.FONT_SIZE}px monospace`;

    columnsRef.current.forEach((yPos, index) => {
      const text = MATRIX_CONFIG.CHARACTERS.charAt(
        Math.floor(Math.random() * MATRIX_CONFIG.CHARACTERS.length)
      );
      const x = index * MATRIX_CONFIG.FONT_SIZE;
      
      // Color verde brillante para el carácter principal
      ctx.fillStyle = '#0f0';
      ctx.fillText(text, x, yPos);
      
      // Efecto de brillo adicional
      if (Math.random() > MATRIX_CONFIG.BRIGHT_PROBABILITY) {
        ctx.fillStyle = '#fff';
        ctx.fillText(text, x, yPos);
      }
      
      // Reiniciar columna o avanzar
      if (yPos > canvas.height || Math.random() > MATRIX_CONFIG.RESET_PROBABILITY) {
        columnsRef.current[index] = 0;
      } else {
        columnsRef.current[index] = yPos + MATRIX_CONFIG.FONT_SIZE;
      }
    });

    animationRef.current = requestAnimationFrame(draw);
  }, []);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.ctrlKey && e.key === 'c') {
      e.preventDefault();
      if (onDeactivate) {
        onDeactivate();
      }
    }
  }, [onDeactivate]);

  useEffect(() => {
    init();
    animationRef.current = requestAnimationFrame(draw);

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [init, draw, handleKeyDown]);

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        init();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [init]);

  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
        style={{ opacity: MATRIX_CONFIG.CANVAS_OPACITY }}
        aria-hidden="true"
      />
    </div>
  );
};

export default MatrixRain;
