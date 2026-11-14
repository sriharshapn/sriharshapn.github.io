import React, { useEffect, useState } from 'react';

export const FrontierCustomCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on desktop with fine mouse pointer
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const onMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (
        target?.closest('button') ||
        target?.closest('a') ||
        target?.closest('[role="button"]') ||
        target?.closest('input') ||
        target?.closest('textarea')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      className="pointer-events-none fixed z-50 transition-transform duration-75 ease-out -translate-x-1/2 -translate-y-1/2"
      style={{
        left: `${pos.x}px`,
        top: `${pos.y}px`,
      }}
      aria-hidden="true"
    >
      <div className={`relative flex items-center justify-center transition-all duration-200 ${
        isHovering ? 'scale-125' : 'scale-100'
      }`}>
        {/* Outer Reticle Ring */}
        <div className="w-7 h-7 rounded-full border border-[#D4AF7A]/60 flex items-center justify-center shadow-[0_0_10px_rgba(212,175,122,0.4)]">
          {/* Inner Dot */}
          <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF7A]" />
        </div>

        {/* Small Compass Crosshairs */}
        <div className="absolute top-0 w-[1px] h-1.5 bg-[#B18A57]" />
        <div className="absolute bottom-0 w-[1px] h-1.5 bg-[#B18A57]" />
        <div className="absolute left-0 h-[1px] w-1.5 bg-[#B18A57]" />
        <div className="absolute right-0 h-[1px] w-1.5 bg-[#B18A57]" />
      </div>
    </div>
  );
};
