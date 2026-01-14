'use client';

import { useEffect, useRef, useCallback } from 'react';

interface MatrixRainProps {
  onDeactivate?: () => void;
}

const MatrixRain: React.FC<MatrixRainProps> = ({ onDeactivate }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const columnsRef = useRef<number[]>([]);
  const fontSize = 14;
  const characters = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';

  const init = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const columns = Math.floor(canvas.width / fontSize);
    columnsRef.current = Array(columns).fill(0);

    ctx.fillStyle = '#0f0';
    ctx.font = `${fontSize}px monospace`;
  }, []);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Fondo semi-transparente para efecto de desvanecimiento
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = `${fontSize}px monospace`;

    columnsRef.current.forEach((yPos, index) => {
      const text = characters.charAt(Math.floor(Math.random() * characters.length));
      const x = index * fontSize;
      
      // Color verde brillante para el carácter principal
      ctx.fillStyle = '#0f0';
      ctx.fillText(text, x, yPos);
      
      // Efecto de brillo adicional
      if (Math.random() > 0.95) {
        ctx.fillStyle = '#fff';
        ctx.fillText(text, x, yPos);
      }
      
      // Reiniciar columna o avanzar
      if (yPos > canvas.height || Math.random() > 0.975) {
        columnsRef.current[index] = 0;
      } else {
        columnsRef.current[index] = yPos + fontSize;
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
        style={{ opacity: 0.6 }}
      />
    </div>
  );
};

export default MatrixRain;
