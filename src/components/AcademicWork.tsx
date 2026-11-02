import React from 'react';
import { 
  Orbit, 
  Terminal, 
  BookMarked, 
  ArrowUpRight, 
  Activity 
} from 'lucide-react';
import { motion } from 'framer-motion';
import { academicProjects } from '../data/portfolioData';
import { GithubIcon } from './SocialIcons';
import { TiltCard } from './TiltCard';

export const AcademicWork: React.FC = () => {
  return (
    <section id="academic" className="py-20 lg:py-28 relative border-t border-slate-900 bg-[#080B11]">
      {/* Background accents */}
      <div className="absolute top-1/2 left-10 w-80 h-80 bg-teal-500/5 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-violet-600/5 blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Viewport Animation */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-3 mb-12 lg:mb-16"
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

        {/* Academic Projects Cards Grid with 3D Tilt Effect */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {academicProjects.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <TiltCard maxTilt={5} spotlightColor="rgba(139, 92, 246, 0.08)">
                <div className="h-full p-6 rounded-2xl bg-slate-900/30 hover:bg-slate-900/60 border border-slate-800/80 hover:border-slate-700/80 transition-all duration-300 flex flex-col justify-between group shadow-lg hover:shadow-xl hover:shadow-violet-950/20">
                  <div className="space-y-4">
                    
                    {/* Header Icon & Context Badge */}
                    <div className="flex items-center justify-between">
                      <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-emerald-400 group-hover:text-emerald-300 group-hover:border-slate-700 transition-colors">
                        {item.id === 'artemis-ii' && <Orbit className="w-5 h-5" />}
                        {item.id === 'two-body-problem' && <Activity className="w-5 h-5 text-violet-400" />}
                        {item.id === 'c-travel-budget-planner' && <Terminal className="w-5 h-5 text-teal-400" />}
                      </div>

                      <span className="text-[10px] font-mono uppercase tracking-[0.1em] text-violet-300 bg-violet-950/40 px-2.5 py-1 rounded-full border border-violet-800/40">
                        {item.type}
                      </span>
                    </div>

                    {/* Title & Category */}
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-white tracking-[-0.02em] group-hover:text-emerald-300 transition-colors">
                        {item.name}
                      </h3>
                      <span className="text-[11px] font-mono uppercase tracking-[0.08em] text-slate-400 block mt-0.5">
                        {item.category}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-sans">
                      {item.description}
                    </p>

                    {/* Highlights */}
                    <div className="space-y-1.5 pt-1">
                      <span className="text-[10px] font-mono uppercase tracking-[0.1em] text-slate-400 block">
                        Focus Areas:
                      </span>
                      <ul className="space-y-1 text-xs text-slate-400 font-sans">
                        {item.highlights.map((hl, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-emerald-400 text-[10px] mt-0.5">•</span>
                            <span className="text-slate-300 text-[11px] leading-tight">{hl}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                  </div>

                  {/* Bottom: Tech tags & Link */}
                  <div className="pt-5 mt-4 border-t border-slate-800/70 space-y-3">
                    <div className="flex flex-wrap gap-1.5">
                      {item.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-[10px] font-mono tracking-[0.04em] text-slate-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <a
                      href={item.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2 px-3 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs font-mono uppercase tracking-[0.08em] text-slate-300 hover:text-white transition-all flex items-center justify-between group/link"
                    >
                      <span className="flex items-center gap-2">
                        <GithubIcon className="w-3.5 h-3.5 text-slate-400 group-hover/link:scale-110 transition-transform" />
                        <span>View Assignment Code</span>
                      </span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 group-hover/link:text-emerald-400 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                    </a>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
