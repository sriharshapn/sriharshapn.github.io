import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-[2.5px] bg-slate-900/40 pointer-events-none">
      <motion.div
        style={{ scaleX }}
        className="h-full origin-left bg-gradient-to-r from-emerald-400 via-teal-300 to-violet-500 shadow-sm shadow-emerald-400/30"
      />
    </div>
  );
};
