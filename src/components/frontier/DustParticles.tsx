import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  baseOpacity: number;
  flickerSpeed: number;
  color: string;
}

export const DustParticles: React.FC<{ count?: number; embersOnly?: boolean }> = ({ 
  count = 65,
  embersOnly = false
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const onResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    const particles: Particle[] = [];
    const colors = embersOnly 
      ? ['#B18A57', '#D4AF7A', '#E89D52', '#C86D3B'] 
      : ['#D7C19C', '#B18A57', '#E8DCC5', '#A58252', '#E89D52'];

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2.2 + 0.6,
        speedX: (Math.random() - 0.45) * 0.4,
        speedY: -Math.random() * 0.5 - 0.15, // gently rising
        opacity: Math.random() * 0.6 + 0.2,
        baseOpacity: Math.random() * 0.5 + 0.2,
        flickerSpeed: Math.random() * 0.04 + 0.01,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    let time = 0;
    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.speedX + Math.sin(time + p.y * 0.01) * 0.2;
        p.y += p.speedY;

        // Wrap around edges
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        const currentOpacity = p.baseOpacity + Math.sin(time * p.flickerSpeed * 20) * 0.2;

        ctx.save();
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0.05, Math.min(0.85, currentOpacity));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Optional soft glow for larger embers
        if (p.size > 1.8) {
          ctx.globalAlpha = currentOpacity * 0.3;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 2.5, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
    };
  }, [count, embersOnly]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-10 h-full w-full opacity-70"
      aria-hidden="true"
    />
  );
};
