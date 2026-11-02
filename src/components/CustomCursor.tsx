import React, { useEffect, useState, useRef } from 'react';

export const CustomCursor: React.FC = () => {
  const [enabled, setEnabled] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  // Raw mouse position
  const mousePos = useRef({ x: -100, y: -100 });
  // Interpolated follower position
  const followerPos = useRef({ x: -100, y: -100 });

  const dotRef = useRef<HTMLDivElement | null>(null);
  const followerRef = useRef<HTMLDivElement | null>(null);
  const spotlightRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Check if device is desktop with fine pointer and no reduced motion preference
    const isTouch = window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isTouch || prefersReducedMotion) {
      setEnabled(false);
      return;
    }

    setEnabled(true);

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      // Check if hovering over interactive element
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest('a, button, input, textarea, select, [role="button"], [data-cursor="interactive"]');
        setIsHovered(!!interactive);
      }
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    const onMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    // High performance animation loop using Lerp
    let animationFrameId: number;
    const render = () => {
      // Lerp for smooth lag effect
      const ease = 0.16;
      followerPos.current.x += (mousePos.current.x - followerPos.current.x) * ease;
      followerPos.current.y += (mousePos.current.y - followerPos.current.y) * ease;

      // Update dot position instantly
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0)`;
      }

      // Update follower position with smooth spring lerp
      if (followerRef.current) {
        followerRef.current.style.transform = `translate3d(${followerPos.current.x}px, ${followerPos.current.y}px, 0)`;
      }

      // Update background mouse spotlight
      if (spotlightRef.current) {
        spotlightRef.current.style.transform = `translate3d(${mousePos.current.x - 300}px, ${mousePos.current.y - 300}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [isVisible]);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden" aria-hidden="true">
      {/* Dynamic Background Ambient Mouse Spotlight */}
      <div
        ref={spotlightRef}
        className={`fixed top-0 left-0 w-[600px] h-[600px] rounded-full bg-radial from-emerald-500/[0.04] via-violet-500/[0.02] to-transparent blur-2xl transition-opacity duration-500 pointer-events-none ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ willChange: 'transform' }}
      />

      {/* Inner precise dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 -ml-1 -mt-1 w-2 h-2 rounded-full bg-emerald-400 transition-opacity duration-200 pointer-events-none shadow-sm shadow-emerald-400/50 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        } ${isHovered ? 'scale-150 bg-teal-300' : 'scale-100'}`}
        style={{ willChange: 'transform' }}
      />

      {/* Outer fluid follower ring */}
      <div
        ref={followerRef}
        className={`fixed top-0 left-0 transition-[width,height,background-color,border-color,opacity] duration-200 ease-out pointer-events-none rounded-full border ${
          isVisible ? 'opacity-100' : 'opacity-0'
        } ${
          isHovered
            ? '-ml-7 -mt-7 w-14 h-14 border-emerald-400/60 bg-emerald-500/10 backdrop-blur-[1px] shadow-lg shadow-emerald-500/15'
            : '-ml-4 -mt-4 w-8 h-8 border-slate-600/60 bg-slate-400/[0.02]'
        }`}
        style={{ willChange: 'transform' }}
      />
    </div>
  );
};
