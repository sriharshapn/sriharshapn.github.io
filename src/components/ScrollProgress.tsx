import React from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

export const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    restDelta: 0.001,
  });

  // Calculate percentage for subtle glow opacity
  const glowOpacity = useTransform(scrollYProgress, [0, 0.05, 0.95, 1], [0, 1, 1, 0.7]);

  return (
    <div className="fixed top-0 left-0 right-0 z-[70] h-[2px] bg-zinc-950/40 pointer-events-none backdrop-blur-xs">
      <motion.div
        style={{ scaleX }}
        className="relative h-full origin-left bg-gradient-to-r from-emerald-500 via-teal-300 to-violet-400"
      >
        {/* Glowing tracer head on the leading edge */}
        <motion.div
          style={{ opacity: glowOpacity }}
          className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-emerald-400 blur-[3px] pointer-events-none"
        />
        <motion.div
          style={{ opacity: glowOpacity }}
          className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_#34d399]"
        />
      </motion.div>
    </div>
  );
};
