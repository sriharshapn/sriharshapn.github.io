import React, { useRef } from 'react';
import { 
  Orbit, 
  Terminal, 
  BookMarked, 
  ArrowUpRight, 
  Activity
} from 'lucide-react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { academicProjects } from '../data/portfolioData';
import { GithubIcon } from './SocialIcons';
import { TiltCard } from './TiltCard';

export const AcademicWork: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  // Scroll-linked progress for drawing the vertical timeline connector
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 75%', 'end 45%'],
  });

  const timelineHeight = useSpring(useTransform(scrollYProgress, [0, 1], ['0%', '100%']), {
    stiffness: 110,
    damping: 26,
    restDelta: 0.001,
  });

  return (
    <section 
      ref={sectionRef}
      id="academic" 
      className="py-20 lg:py-28 relative border-t border-slate-900 bg-[#080B11] overflow-hidden"
    >
      {/* Background accents */}
      <div className="absolute top-1/2 left-10 w-80 h-80 bg-teal-500/5 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-violet-600/5 blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-3 mb-16 lg:mb-20"
        >
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono uppercase tracking-[0.12em] text-violet-400">
            <BookMarked className="w-3.5 h-3.5" />
            <span>04 // ACADEMIC & TECHNICAL EXPLORATIONS</span>
          </div>

          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-bold text-white tracking-[-0.03em] leading-tight">
            Academic & Technical Work
          </h2>

          <p className="text-slate-400 text-sm sm:text-base max-w-2xl font-sans mt-2">
            Focused computational assignments, numerical physics simulations, and coursework problem-solving at BMSCE.
          </p>
        </motion.div>

        {/* Timeline Layout with Dynamic Vertical Connector */}
        <div className="relative">
          
          {/* Animated Central/Left Timeline Track (Visible on md and up) */}
          <div className="absolute left-4 md:left-8 top-4 bottom-4 w-px bg-slate-800/80 hidden sm:block">
            <motion.div
              style={{ height: timelineHeight }}
              className="w-full bg-gradient-to-b from-emerald-400 via-teal-300 to-violet-500 shadow-[0_0_10px_#10b981]"
            />
          </div>

          {/* Staggered Timeline Items */}
          <div className="space-y-10 sm:space-y-12 sm:pl-16">
            {academicProjects.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -32 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.7, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                {/* Timeline node marker (Left aligned with track on sm+) */}
                <div className="hidden sm:flex absolute -left-16 top-6 -translate-x-1/2 w-7 h-7 rounded-full bg-slate-950 border border-slate-700 items-center justify-center shadow-lg shadow-black/80 z-20">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                </div>

                <TiltCard maxTilt={4} spotlightColor="rgba(139, 92, 246, 0.08)">
                  <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/40 hover:bg-slate-900/70 border border-slate-800/90 hover:border-slate-700/80 transition-all duration-300 flex flex-col justify-between group shadow-lg hover:shadow-xl hover:shadow-violet-950/20">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                      
                      {/* Left: Metadata & Assignment Icon */}
                      <div className="lg:col-span-4 space-y-4">
                        <div className="flex items-center space-x-3">
                          <div className="p-3 rounded-xl bg-slate-950/90 border border-slate-800 text-emerald-400 group-hover:text-emerald-300 group-hover:border-slate-700 transition-colors">
                            {item.id === 'artemis-ii' && <Orbit className="w-6 h-6" />}
                            {item.id === 'two-body-problem' && <Activity className="w-6 h-6 text-violet-400" />}
                            {item.id === 'c-travel-budget-planner' && <Terminal className="w-6 h-6 text-teal-400" />}
                          </div>

                          <div>
                            <span className="text-[10px] font-mono uppercase tracking-[0.1em] text-violet-300 bg-violet-950/40 px-2.5 py-1 rounded-full border border-violet-800/40">
                              {item.type}
                            </span>
                            <span className="text-[11px] font-mono uppercase tracking-[0.08em] text-slate-400 block mt-1">
                              {item.category}
                            </span>
                          </div>
                        </div>

                        <h3 className="text-xl sm:text-2xl font-bold text-white tracking-[-0.02em] group-hover:text-emerald-300 transition-colors">
                          {item.name}
                        </h3>

                        {/* Tech tags */}
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {item.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-[10px] font-mono tracking-[0.04em] text-slate-300"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Right: Description & Focus Areas */}
                      <div className="lg:col-span-8 space-y-4 border-t lg:border-t-0 lg:border-l border-slate-800/80 pt-4 lg:pt-0 lg:pl-8">
                        <p className="text-slate-300 text-sm leading-relaxed font-sans">
                          {item.description}
                        </p>

                        <div className="space-y-1.5 pt-1">
                          <span className="text-[11px] font-mono uppercase tracking-[0.1em] text-slate-400 block">
                            Focus Areas & Computational Methods:
                          </span>
                          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-400 font-sans">
                            {item.highlights.map((hl, i) => (
                              <li key={i} className="flex items-start gap-2 bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/60">
                                <span className="text-emerald-400 text-[10px] mt-0.5">•</span>
                                <span className="text-slate-300 text-xs leading-relaxed">{hl}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Assignment Link */}
                        <div className="pt-2">
                          <a
                            href={item.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex py-2 px-4 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs font-mono uppercase tracking-[0.08em] text-slate-300 hover:text-white transition-all items-center gap-2 group/link"
                          >
                            <GithubIcon className="w-3.5 h-3.5 text-slate-400 group-hover/link:scale-110 transition-transform" />
                            <span>View Assignment Code</span>
                            <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 group-hover/link:text-emerald-400 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                          </a>
                        </div>
                      </div>

                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
