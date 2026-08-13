import { useEffect, useRef, useState, useCallback } from 'react';
import { MATRIX_CONFIG } from '../constants/matrixRain';

interface MatrixRainProps {
  onDeactivate?: () => void;
}

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const MatrixRain: React.FC<MatrixRainProps> = ({ onDeactivate }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(0);
  const columnsRef = useRef<number[]>([]);
  const [exiting, setExiting] = useState(false);

  const init = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const columns = Math.floor(canvas.width / MATRIX_CONFIG.FONT_SIZE);
    columnsRef.current = Array(columns).fill(0);

    ctx.font = `${MATRIX_CONFIG.FONT_SIZE}px monospace`;
  }, []);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = `rgba(0, 0, 0, ${MATRIX_CONFIG.FADE_OPACITY})`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = `${MATRIX_CONFIG.FONT_SIZE}px monospace`;

    columnsRef.current.forEach((yPos, index) => {
      const text = MATRIX_CONFIG.CHARACTERS.charAt(
        Math.floor(Math.random() * MATRIX_CONFIG.CHARACTERS.length)
      );
      const x = index * MATRIX_CONFIG.FONT_SIZE;

      ctx.fillStyle = '#0f0';
      ctx.fillText(text, x, yPos);

      if (Math.random() > MATRIX_CONFIG.BRIGHT_PROBABILITY) {
        ctx.fillStyle = '#fff';
        ctx.fillText(text, x, yPos);
      }

      if (yPos > canvas.height || Math.random() > MATRIX_CONFIG.RESET_PROBABILITY) {
        columnsRef.current[index] = 0;
      } else {
        columnsRef.current[index] = yPos + MATRIX_CONFIG.FONT_SIZE;
      }
    });

    animationRef.current = requestAnimationFrame(draw);
  }, []);

  const handleDeactivate = useCallback(() => {
    setExiting(true);
    window.setTimeout(() => {
      onDeactivate?.();
    }, 320);
  }, [onDeactivate]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'c') {
        e.preventDefault();
        handleDeactivate();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleDeactivate]);

  useEffect(() => {
    if (prefersReducedMotion()) {
      return;
    }

    init();
    animationRef.current = requestAnimationFrame(draw);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [init, draw]);

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
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none transition-opacity duration-300"
      style={{
        zIndex: 'var(--z-base)',
        opacity: exiting ? 0 : 1,
      }}
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
        style={{ opacity: MATRIX_CONFIG.CANVAS_OPACITY }}
      />
    </div>
  );
};

export default MatrixRain;
