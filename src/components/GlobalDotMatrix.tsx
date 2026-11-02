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
  depth: number;
  colorType: 'white' | 'tint';
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

    // Pointer coordinates
    let targetMouseX = -9999;
    let targetMouseY = -9999;
    let mouseX = -9999;
    let mouseY = -9999;
    let glowX = -9999;
    let glowY = -9999;
    let glowIntensity = 0;

    // Check reduced motion preference & touch capability
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;

    // Repulsion physics parameters
    const repelRadius = isTouchDevice ? 85 : 135;
    const repelForce = isTouchDevice ? 26 : 38;
    const springK = 0.052;
    const damping = 0.83;

    // Track scroll velocity and normalized scroll progress
    let lastTime = performance.now();
    let lastScrollY = window.scrollY;
    let scrollVelocity = 0;
    let scrollProgress = 0;

    const initGrid = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);

      // Density tuned for sparse, elegant atmospheric aesthetic
      let spacing = 38;
      if (width < 768) {
        spacing = 52; // lighter density on mobile
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

          // Organic jitter to prevent mechanical computer-grid rigidity
          const jitterX = (Math.random() - 0.5) * (spacing * 0.28);
          const jitterY = (Math.random() - 0.5) * (spacing * 0.28);
          const finalX = originX + jitterX;
          const finalY = originY + jitterY;

          // Optical depth: 0.35 to 1.0
          const depth = Math.random() * 0.65 + 0.35;
          const radius = (Math.random() * 0.55 + 0.75) * (depth > 0.75 ? 1.15 : 0.9);
          const baseAlpha = (Math.random() * 0.16 + 0.12) * depth;

          dots.push({
            originX: finalX,
            originY: finalY,
            x: finalX,
            y: finalY,
            vx: 0,
            vy: 0,
            radius,
            baseAlpha,
            depth,
            colorType: 'white',
          });
        }
      }
    };

    initGrid();

    // Debounced Resize
    let resizeTimer: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        initGrid();
      }, 150);
    };

    // Pointer Tracking
    const handlePointerMove = (e: PointerEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
      if (glowX === -9999) {
        glowX = e.clientX;
        glowY = e.clientY;
        mouseX = e.clientX;
        mouseY = e.clientY;
      }
    };

    const handlePointerLeave = () => {
      targetMouseX = -9999;
      targetMouseY = -9999;
    };

    // Scroll Tracking
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;

      // Update scroll velocity with ceiling to avoid jarring snaps
      const clampedDelta = Math.max(-55, Math.min(55, delta));
      scrollVelocity += clampedDelta * 0.35;

      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      scrollProgress = Math.max(0, Math.min(1, currentScrollY / maxScroll));
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerleave', handlePointerLeave, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Animation Loop
    const render = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      // Smooth cursor lerp: quick for repulsion, slightly delayed for fluid atmospheric glow
      if (targetMouseX === -9999) {
        glowIntensity = Math.max(0, glowIntensity - dt * 1.5);
      } else {
        glowIntensity = Math.min(1, glowIntensity + dt * 3.0);
        
        // Fast physics tracking
        mouseX += (targetMouseX - mouseX) * 0.16;
        mouseY += (targetMouseY - mouseY) * 0.16;

        // Fluid delayed glow tracking
        glowX += (targetMouseX - glowX) * 0.075;
        glowY += (targetMouseY - glowY) * 0.075;
      }

      // Scroll inertia decay
      scrollVelocity *= 0.91;

      ctx.clearRect(0, 0, width, height);

      // ========================================================
      // 1. Fluid Restrained Cursor Glow Wave (Canvas Layer)
      // ========================================================
      if (!prefersReducedMotion && glowIntensity > 0.01 && glowX !== -9999) {
        const glowRadius = isTouchDevice ? 180 : 270;
        
        // Dynamic section color shift based on scroll progress:
        // Top (Hero): Emerald/Cyan -> Mid (About/Projects): Violet/Cyan -> Bottom (Contact): Emerald/Teal
        let c1 = '16, 185, 129'; // emerald
        let c2 = '56, 189, 248'; // cyan
        let c3 = '139, 92, 246'; // violet

        if (scrollProgress < 0.25) {
          // Hero
          c1 = '16, 185, 129';
          c2 = '56, 189, 248';
          c3 = '139, 92, 246';
        } else if (scrollProgress < 0.65) {
          // About, Skills, Projects
          c1 = '139, 92, 246';
          c2 = '56, 189, 248';
          c3 = '16, 185, 129';
        } else {
          // Academic, Events, Contact
          c1 = '16, 185, 129';
          c2 = '45, 212, 191';
          c3 = '139, 92, 246';
        }

        const radGrad = ctx.createRadialGradient(glowX, glowY, 0, glowX, glowY, glowRadius);
        const alphaMul = glowIntensity * 0.85;

        radGrad.addColorStop(0, `rgba(${c1}, ${0.07 * alphaMul})`);
        radGrad.addColorStop(0.35, `rgba(${c2}, ${0.045 * alphaMul})`);
        radGrad.addColorStop(0.7, `rgba(${c3}, ${0.02 * alphaMul})`);
        radGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = radGrad;
        ctx.fillRect(glowX - glowRadius, glowY - glowRadius, glowRadius * 2, glowRadius * 2);
      }

      // ========================================================
      // 2. Dots Rendering & Organic Physics Simulation
      // ========================================================
      const numDots = dots.length;
      const waveTime = time * 0.00065;

      // Gentle wave direction rotation linked to scroll position
      const scrollAngle = scrollProgress * Math.PI * 0.75;
      const cosS = Math.cos(scrollAngle);
      const sinS = Math.sin(scrollAngle);

      for (let i = 0; i < numDots; i++) {
        const dot = dots[i];

        if (prefersReducedMotion) {
          ctx.beginPath();
          ctx.arc(dot.originX, dot.originY, dot.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${dot.baseAlpha})`;
          ctx.fill();
          continue;
        }

        // Multi-frequency harmonic wave: creates an organic, breathing undulating surface
        const u = (dot.originX * cosS + dot.originY * sinS) * 0.0032;
        const v = (-dot.originX * sinS + dot.originY * cosS) * 0.0032;

        const wave1 = Math.sin(u + waveTime) * Math.cos(v * 0.8 - waveTime * 0.5) * 2.6;
        const wave2 = Math.sin((u + v) * 1.4 - waveTime * 0.7) * 1.6;
        const waveOffset = (wave1 + wave2) * dot.depth;

        // Scroll depth parallax & inertia displacement
        const scrollParallaxY = (dot.depth - 0.6) * 14 * Math.sin(scrollProgress * Math.PI);
        const scrollInertiaY = -scrollVelocity * 0.14 * dot.depth;

        let targetX = dot.originX + waveOffset * 0.7;
        let targetY = dot.originY + waveOffset + scrollParallaxY + scrollInertiaY;
        let currentAlpha = dot.baseAlpha;
        let isGlowHighlighted = false;

        // Cursor Repulsion calculation
        if (targetMouseX !== -9999 && mouseX !== -9999) {
          const dx = dot.x - mouseX;
          const dy = dot.y - mouseY;
          const distSq = dx * dx + dy * dy;
          const repelRadiusSq = repelRadius * repelRadius;

          if (distSq < repelRadiusSq && distSq > 0.0001) {
            const dist = Math.sqrt(distSq);
            // Soft quadratic falloff: strong near core, smoothly zero at boundary
            const factor = 1 - dist / repelRadius;
            const force = factor * factor * repelForce;

            const pushX = (dx / dist) * force;
            const pushY = (dy / dist) * force;

            targetX += pushX;
            targetY += pushY;

            // Restrained highlight: luminous dot aura that doesn't overpower text
            currentAlpha = Math.min(0.82, dot.baseAlpha + factor * 0.42);
            isGlowHighlighted = factor > 0.25;
          }
        }

        // Physical spring acceleration toward target
        const ax = (targetX - dot.x) * springK;
        const ay = (targetY - dot.y) * springK;

        dot.vx = (dot.vx + ax) * damping;
        dot.vy = (dot.vy + ay) * damping;

        dot.x += dot.vx;
        dot.y += dot.vy;

        // Draw dot with subtle chromatic tinting near cursor glow
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
        
        if (isGlowHighlighted) {
          ctx.fillStyle = `rgba(224, 247, 255, ${currentAlpha})`;
        } else {
          ctx.fillStyle = `rgba(255, 255, 255, ${currentAlpha})`;
        }
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
