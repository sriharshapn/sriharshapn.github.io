import React, { useRef, useState, useEffect } from 'react';
import { motion, useSpring } from 'framer-motion';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number; // max tilt degrees (default 6)
  spotlightColor?: string; // spotlight color
}

export const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className = '',
  maxTilt = 6,
  spotlightColor = 'rgba(16, 185, 129, 0.08)',
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [spotlightPos, setSpotlightPos] = useState({ x: 0, y: 0 });
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setIsTouchDevice(window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window);
  }, []);

  // Smooth springs for rotation
  const rotateX = useSpring(0, { stiffness: 260, damping: 22 });
  const rotateY = useSpring(0, { stiffness: 260, damping: 22 });
  const scale = useSpring(1, { stiffness: 260, damping: 22 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouchDevice || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setSpotlightPos({ x, y });

    // Normalized coordinates from -1 to 1
    const normX = (x / rect.width) * 2 - 1;
    const normY = (y / rect.height) * 2 - 1;

    rotateY.set(normX * maxTilt);
    rotateX.set(-normY * maxTilt);
  };

  const handleMouseEnter = () => {
    if (isTouchDevice) return;
    setIsHovered(true);
    scale.set(1.012);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    rotateX.set(0);
    rotateY.set(0);
    scale.set(1);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: isTouchDevice ? 0 : rotateX,
        rotateY: isTouchDevice ? 0 : rotateY,
        scale: isTouchDevice ? 1 : scale,
        transformStyle: 'preserve-3d',
      }}
      className={`relative perspective-1000 ${className}`}
    >
      {/* Inner dynamic spotlight overlay following cursor */}
      {!isTouchDevice && (
        <div
          className={`pointer-events-none absolute -inset-px rounded-2xl transition-opacity duration-300 z-10 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            background: `radial-gradient(400px circle at ${spotlightPos.x}px ${spotlightPos.y}px, ${spotlightColor}, transparent 75%)`,
          }}
        />
      )}

      {/* Subtle shifting border highlight on hover */}
      <div className="relative h-full w-full rounded-2xl overflow-hidden">
        {children}
      </div>
    </motion.div>
  );
};
