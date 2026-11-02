import React, { useEffect, useState, useRef } from 'react';

export const CustomCursor: React.FC = () => {
  const [enabled, setEnabled] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isClicking, setIsClicking] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isTextTarget, setIsTextTarget] = useState<boolean>(false);

  // Raw mouse position (instant)
  const mousePos = useRef({ x: -100, y: -100 });
  // Interpolated follower position
  const followerPos = useRef({ x: -100, y: -100 });

  const pointerRef = useRef<HTMLDivElement | null>(null);
  const followerRef = useRef<HTMLDivElement | null>(null);
  const spotlightRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Only enable on desktop devices with fine pointer and no reduced motion preference
    const isTouch = window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isTouch || prefersReducedMotion) {
      setEnabled(false);
      return;
    }

    setEnabled(true);
    document.documentElement.classList.add('custom-cursor-active');

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      // Check if hovering over interactive element or text input
      const target = e.target as HTMLElement | null;
      if (target) {
        const isInput = !!target.closest('input, textarea, [contenteditable="true"]');
        setIsTextTarget(isInput);

        const interactive = target.closest('a, button, [role="button"], select, [data-cursor="interactive"], input[type="submit"], input[type="button"]');
        setIsHovered(!!interactive && !isInput);
      }
    };

    const onMouseDown = () => {
      setIsClicking(true);
    };

    const onMouseUp = () => {
      setIsClicking(false);
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    const onMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown, { passive: true });
    window.addEventListener('mouseup', onMouseUp, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    // High performance animation loop using requestAnimationFrame
    let animationFrameId: number;
    const render = () => {
      // 0-latency update for the macOS pointer arrow (direct translate)
      if (pointerRef.current) {
        pointerRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0)`;
      }

      // Smooth Lerp for trailing follower ring
      const ease = 0.18;
      followerPos.current.x += (mousePos.current.x - followerPos.current.x) * ease;
      followerPos.current.y += (mousePos.current.y - followerPos.current.y) * ease;

      if (followerRef.current) {
        followerRef.current.style.transform = `translate3d(${followerPos.current.x}px, ${followerPos.current.y}px, 0)`;
      }

      // Update ambient background spotlight
      if (spotlightRef.current) {
        spotlightRef.current.style.transform = `translate3d(${mousePos.current.x - 300}px, ${mousePos.current.y - 300}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      document.documentElement.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [isVisible]);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden" aria-hidden="true">
      {/* Background Ambient Mouse Spotlight */}
      <div
        ref={spotlightRef}
        className={`fixed top-0 left-0 w-[600px] h-[600px] rounded-full bg-radial from-emerald-500/[0.035] via-violet-500/[0.015] to-transparent blur-2xl transition-opacity duration-500 pointer-events-none ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ willChange: 'transform' }}
      />

      {/* Trailing Fluid Follower Ring */}
      <div
        ref={followerRef}
        className={`fixed top-0 left-0 transition-[width,height,background-color,border-color,opacity,transform] duration-200 ease-out pointer-events-none rounded-full border ${
          isVisible && !isTextTarget ? 'opacity-100' : 'opacity-0'
        } ${
          isHovered
            ? '-ml-6 -mt-6 w-12 h-12 border-emerald-400/50 bg-emerald-500/10 shadow-lg shadow-emerald-500/20'
            : '-ml-4 -mt-4 w-8 h-8 border-zinc-600/40 bg-zinc-400/[0.02]'
        }`}
        style={{ willChange: 'transform' }}
      />

      {/* Primary Apple macOS Pointer (Zero-latency exact vector arrow) */}
      <div
        ref={pointerRef}
        className={`fixed top-0 left-0 pointer-events-none transition-opacity duration-150 select-none ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          willChange: 'transform',
        }}
      >
        <div
          className={`transition-transform duration-100 ease-out origin-top-left ${
            isClicking ? 'scale-90' : isHovered ? 'scale-105' : 'scale-100'
          }`}
          style={{
            // Hotspot alignment: placing (0, 0) at the sharp tip of the pointer
            transform: 'translate(-2px, -2px)',
          }}
        >
          {isTextTarget ? (
            /* macOS I-Beam Cursor for text fields */
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="filter drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]"
            >
              <path
                d="M7 3 H13 M10 3 V17 M7 17 H13"
                stroke="#FFFFFF"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
              <path
                d="M7 3 H13 M10 3 V17 M7 17 H13"
                stroke="#000000"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
            </svg>
          ) : isHovered ? (
            /* macOS Link Pointer (Precision Arrow with Lime Accent Pulse) */
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="filter drop-shadow-[0_2px_5px_rgba(0,0,0,0.65)]"
            >
              {/* Outer macOS arrow with crisp white outline */}
              <path
                d="M2.5 1.5 L2.5 19.5 L7.2 14.8 L11.2 23 L14.5 21.4 L10.5 13.3 L17.5 13.3 Z"
                fill="#000000"
                stroke="#FFFFFF"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Interactive Lime Core Tip Accent */}
              <circle cx="5" cy="5" r="1.5" fill="#10B981" />
            </svg>
          ) : (
            /* Standard Authentic Apple macOS Black Arrow Pointer */
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="filter drop-shadow-[0_2px_5px_rgba(0,0,0,0.65)]"
            >
              <path
                d="M2.5 1.5 L2.5 19.5 L7.2 14.8 L11.2 23 L14.5 21.4 L10.5 13.3 L17.5 13.3 Z"
                fill="#000000"
                stroke="#FFFFFF"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </div>
      </div>
    </div>
  );
};
