import React, { useState, useEffect, useCallback, useRef } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Compass
} from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { featuredProjects } from '../data/portfolioData';
import { OrbitalTimeline } from './OrbitalTimeline';
import { ProjectDetailPanel } from './ProjectDetailPanel';

export const Projects: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const containerRef = useRef<HTMLElement>(null);

  // Parallax subtle scroll movement for the section header
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });
  const headerY = useTransform(scrollYProgress, [0, 1], [-16, 16]);

  const totalProjects = featuredProjects.length;

  const handlePrev = useCallback(() => {
    setSelectedIndex((prev) => (prev - 1 + totalProjects) % totalProjects);
  }, [totalProjects]);

  const handleNext = useCallback(() => {
    setSelectedIndex((prev) => (prev + 1) % totalProjects);
  }, [totalProjects]);

  // Keyboard navigation for orbital project selection (Left/Right Arrows)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is typing in an input/textarea
      const tag = (e.target as HTMLElement)?.tagName?.toLowerCase();
      if (tag === 'input' || tag === 'textarea') return;

      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePrev, handleNext]);

  const selectedProject = featuredProjects[selectedIndex] || featuredProjects[0];

  return (
    <section 
      ref={containerRef}
      id="projects" 
      tabIndex={0}
      aria-label="Selected Work - Orbital Project Timeline"
      className="py-20 lg:py-28 relative border-t border-zinc-900 bg-transparent overflow-hidden focus:outline-none"
    >
      {/* Background Ambient Lighting Accents */}
      <div className="absolute top-1/4 left-1/4 w-[650px] h-[650px] bg-lime-500/5 blur-[160px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-10 w-[550px] h-[550px] bg-emerald-500/5 blur-[160px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ========================================================
            1. SECTION INTRODUCTION
            Heading: SELECTED WORK
            Supporting label: AN ORBIT OF IDEAS & ENGINEERING
           ======================================================== */}
        <motion.div
          style={{ y: headerY }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 lg:mb-16"
        >
          {/* Section Heading & Masked Editorial Typography */}
          <div className="space-y-3">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-mono uppercase tracking-[0.14em] text-lime-400">
              <Compass className="w-3.5 h-3.5 text-lime-400 animate-spin" style={{ animationDuration: '14s' }} />
              <span>03 // SELECTED WORK</span>
            </div>

            <div className="overflow-hidden">
              <motion.h2 
                initial={{ y: '100%' }}
                whileInView={{ y: '0%' }}
                viewport={{ once: true }}
                transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                className="text-[clamp(2.5rem,6vw,4.5rem)] font-extrabold text-white tracking-[-0.035em] leading-[0.95] font-sans"
              >
                SELECTED WORK
              </motion.h2>
            </div>

            <motion.p 
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-xs sm:text-sm font-mono tracking-[0.18em] uppercase text-zinc-400"
            >
              AN ORBIT OF IDEAS & ENGINEERING
            </motion.p>
          </div>

          {/* Interactive Prev/Next Controls & Keyboard Telemetry */}
          <div className="flex items-center space-x-3 self-start md:self-end">
            <div className="hidden sm:flex items-center space-x-2 mr-2 text-[11px] font-mono text-zinc-500 uppercase tracking-wider">
              <span>KEYS:</span>
              <kbd className="px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-300">←</kbd>
              <kbd className="px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-300">→</kbd>
            </div>

            {/* Previous Project Button */}
            <button
              onClick={handlePrev}
              type="button"
              aria-label="Previous Project"
              className="p-2.5 sm:p-3 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white transition-all cursor-pointer shadow-md group"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-x-0.5 transition-transform" />
            </button>

            {/* Current Position Indicator */}
            <div className="px-4 py-2 rounded-xl bg-zinc-950/90 border border-zinc-800/90 text-xs sm:text-sm font-mono tracking-wider text-zinc-300">
              <span className="text-lime-400 font-bold">0{selectedIndex + 1}</span>
              <span className="text-zinc-600 mx-1.5">/</span>
              <span>0{totalProjects}</span>
            </div>

            {/* Next Project Button */}
            <button
              onClick={handleNext}
              type="button"
              aria-label="Next Project"
              className="p-2.5 sm:p-3 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white transition-all cursor-pointer shadow-md group"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </motion.div>

        {/* ========================================================
            2. MAIN ORBITAL TIMELINE CANVAS
            Horizontally elongated elliptical orbit with energy trail
           ======================================================== */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="relative bg-zinc-950/60 rounded-3xl border border-zinc-800/80 p-3 sm:p-6 shadow-2xl backdrop-blur-sm"
        >
          <OrbitalTimeline
            projects={featuredProjects}
            selectedIndex={selectedIndex}
            onSelectProject={(index) => setSelectedIndex(index)}
          />
        </motion.div>

        {/* ========================================================
            3. DETAILED PROJECT INFORMATION BELOW THE ORBIT
            Two-column editorial showcase (Left: Details, Right: Preview)
           ======================================================== */}
        <ProjectDetailPanel
          project={selectedProject}
          index={selectedIndex}
          totalProjects={totalProjects}
        />

      </div>
    </section>
  );
};
