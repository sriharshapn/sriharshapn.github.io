import React, { useEffect, useRef } from 'react';

interface MatrixDot {
  originX: number;
  originY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseAlpha: number;
  phase: number;
  phaseSpeed: number;
  depth: number;
}

export const GlobalDotMatrix: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let dots: MatrixDot[] = [];
    let width = 0;
    let height = 0;

    // Track mouse position globally in viewport coordinates
    let mouseX = -9999;
    let mouseY = -9999;
    let targetMouseX = -9999;
    let targetMouseY = -9999;

    // Check reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Check if touch device
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;

    // Repulsion physics parameters
    const repelRadius = isTouchDevice ? 90 : 140;
    const repelForce = isTouchDevice ? 28 : 42;
    const springK = 0.055;
    const damping = 0.82;

    const initGrid = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);

      // Determine grid spacing based on viewport width (sparse, elegant density)
      let spacing = 38;
      if (width < 768) {
        spacing = 50; // lighter on mobile phones
      } else if (width < 1200) {
        spacing = 44; // tablet
      }

      const cols = Math.ceil(width / spacing) + 1;
      const rows = Math.ceil(height / spacing) + 1;
      const offsetX = (width - (cols - 1) * spacing) / 2;
      const offsetY = (height - (rows - 1) * spacing) / 2;

      dots = [];

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const originX = offsetX + c * spacing;
          const originY = offsetY + r * spacing;

          // Subtle organic jitter to avoid mechanical stiffness
          const jitterX = (Math.random() - 0.5) * (spacing * 0.25);
          const jitterY = (Math.random() - 0.5) * (spacing * 0.25);
          const finalOriginX = originX + jitterX;
          const finalOriginY = originY + jitterY;

          // Vary dot size and opacity slightly to create atmospheric depth
          const depth = Math.random() * 0.6 + 0.4; // 0.4 to 1.0
          const radius = (Math.random() * 0.6 + 0.8) * (depth > 0.8 ? 1.15 : 0.9);
          const baseAlpha = Math.random() * 0.2 + 0.12 * depth; // 0.12 - 0.32

          dots.push({
            originX: finalOriginX,
            originY: finalOriginY,
            x: finalOriginX,
            y: finalOriginY,
            vx: 0,
            vy: 0,
            radius,
            baseAlpha,
            phase: Math.random() * Math.PI * 2,
            phaseSpeed: Math.random() * 0.015 + 0.008,
            depth,
          });
        }
      }
    };

    initGrid();

    // Resize listener with debouncing
    let resizeTimer: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        initGrid();
      }, 150);
    };

    // Global Pointer Listeners
    const handlePointerMove = (e: PointerEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };

    const handlePointerLeave = () => {
      targetMouseX = -9999;
      targetMouseY = -9999;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerleave', handlePointerLeave, { passive: true });

    let lastTime = performance.now();
    let lastScrollY = window.scrollY;
    let scrollVelocity = 0;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;
      // Cap delta to prevent sudden jarring leaps on instant jump
      const clampedDelta = Math.max(-60, Math.min(60, delta));
      scrollVelocity += clampedDelta * 0.35;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    const render = (time: number) => {
      // Calculate delta time
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      // Smooth cursor position interpolation
      if (targetMouseX === -9999) {
        mouseX = -9999;
        mouseY = -9999;
      } else {
        mouseX += (targetMouseX - mouseX) * 0.2;
        mouseY += (targetMouseY - mouseY) * 0.2;
      }

      // Damped decay of scroll inertia
      scrollVelocity *= 0.91;

      ctx.clearRect(0, 0, width, height);

      // Render dots
      const numDots = dots.length;
      for (let i = 0; i < numDots; i++) {
        const dot = dots[i];

        if (prefersReducedMotion) {
          // Static render for users with reduced motion preference
          ctx.beginPath();
          ctx.arc(dot.originX, dot.originY, dot.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${dot.baseAlpha})`;
          ctx.fill();
          continue;
        }

        // Ambient wave oscillation (subtle breathing drift even when cursor is stationary)
        dot.phase += dot.phaseSpeed * dt * 60;
        const waveX = Math.sin(dot.phase) * (1.8 * dot.depth);
        const waveY = Math.cos(dot.phase * 1.3) * (1.8 * dot.depth);

        // React naturally to vertical scrolling based on particle optical depth
        const scrollDisplacementY = -scrollVelocity * 0.16 * dot.depth;

        let targetX = dot.originX + waveX;
        let targetY = dot.originY + waveY + scrollDisplacementY;
        let currentAlpha = dot.baseAlpha;

        // Cursor Repulsion calculation
        if (mouseX !== -9999 && mouseY !== -9999) {
          const dx = dot.x - mouseX;
          const dy = dot.y - mouseY;
          const distSq = dx * dx + dy * dy;
          const repelRadiusSq = repelRadius * repelRadius;

          if (distSq < repelRadiusSq && distSq > 0.0001) {
            const dist = Math.sqrt(distSq);
            // Smooth quadratic falloff: strong near center, vanishing at perimeter
            const factor = 1 - dist / repelRadius;
            const force = factor * factor * repelForce;

            const pushX = (dx / dist) * force;
            const pushY = (dy / dist) * force;

            targetX += pushX;
            targetY += pushY;

            // Subtle glow boost for dots directly in the cursor's proximity aura
            currentAlpha = Math.min(0.85, dot.baseAlpha + factor * 0.35);
          }
        }

        // Spring acceleration towards dynamic target
        const ax = (targetX - dot.x) * springK;
        const ay = (targetY - dot.y) * springK;

        dot.vx = (dot.vx + ax) * damping;
        dot.vy = (dot.vy + ay) * damping;

        dot.x += dot.vx;
        dot.y += dot.vy;

        // Draw dot
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${currentAlpha})`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerleave', handlePointerLeave);
      clearTimeout(resizeTimer);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
      }}
      aria-hidden="true"
    />
  );
};
