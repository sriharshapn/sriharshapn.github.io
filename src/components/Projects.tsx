import React from 'react';
import { 
  ExternalLink, 
  FolderGit2, 
  User, 
  Users, 
  Cpu, 
  Sparkles, 
  AlertCircle,
  CheckCircle2
} from 'lucide-react';
import { motion } from 'framer-motion';
import { featuredProjects } from '../data/portfolioData';
import { GithubIcon } from './SocialIcons';
import { TiltCard } from './TiltCard';
import { MagneticButton } from './MagneticButton';

export const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-20 lg:py-28 relative border-t border-slate-900 bg-slate-950/40">
      {/* Background accents */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-emerald-500/5 blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-violet-600/5 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Viewport Animation */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-3 mb-12 lg:mb-16"
        >
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono uppercase tracking-[0.12em] text-emerald-400">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>03 // PORTFOLIO SHOWCASE</span>
          </div>
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-bold text-white tracking-[-0.03em] leading-tight">
            Featured Projects
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl font-sans mt-2">
            Key applications, hackathon innovations, and production systems developed with authentic roles and contributions.
          </p>
        </motion.div>

        {/* Project Cards Grid with TiltCard 3D Interactive Effect */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: (index % 2) * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <TiltCard maxTilt={5} spotlightColor="rgba(16, 185, 129, 0.09)">
                <div className="h-full rounded-2xl bg-gradient-to-b from-slate-900/70 to-slate-950/90 border border-slate-800/90 hover:border-slate-700/80 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-emerald-950/20 group">
                  
                  <div className="p-6 sm:p-7 space-y-5">
                    
                    {/* Header: Project Index, Category & Type Badge */}
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-mono font-bold text-emerald-400/90 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 tracking-[0.08em]">
                          0{index + 1}
                        </span>
                        <span className="text-xs font-mono uppercase tracking-[0.12em] text-slate-400">
                          {project.category}
                        </span>
                      </div>

                      {/* Collaborative vs Individual Badge */}
                      <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono uppercase tracking-[0.08em] border bg-slate-950/80 border-slate-800 text-slate-300">
                        {project.collaborative ? (
                          <>
                            <Users className="w-3 h-3 text-violet-400" />
                            <span>Collaborative Team</span>
                          </>
                        ) : (
                          <>
                            <User className="w-3 h-3 text-emerald-400" />
                            <span>Individual Build</span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Project Title & Event Badge */}
                    <div className="space-y-1.5">
                      <h3 className="text-[clamp(1.25rem,2.2vw,1.75rem)] font-bold text-white tracking-[-0.02em] group-hover:text-emerald-300 transition-colors flex items-center justify-between">
                        <span>{project.name}</span>
                      </h3>

                      {project.eventBadge && (
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-violet-950/30 border border-violet-800/40 text-[11px] font-mono uppercase tracking-[0.08em] text-violet-300">
                          <Sparkles className="w-3 h-3 text-violet-400" />
                          <span>{project.eventBadge}</span>
                        </div>
                      )}
                    </div>

                    {/* Description */}
                    <p className="text-slate-300 text-sm leading-relaxed font-sans">
                      {project.description}
                    </p>

                    {/* Role & Specific Contribution Badge */}
                    <div className="p-3.5 rounded-xl bg-slate-950/90 border border-slate-800/90 space-y-1 group-hover:border-slate-700/70 transition-colors">
                      <div className="flex items-center space-x-1.5 text-xs font-mono uppercase tracking-[0.1em] text-emerald-400 font-semibold">
                        <Cpu className="w-3.5 h-3.5" />
                        <span>My Role & Contribution:</span>
                      </div>
                      <p className="text-xs text-slate-300 leading-normal font-sans">
                        {project.myRole}
                      </p>
                    </div>

                    {/* Technical Highlights */}
                    {project.keyHighlights && project.keyHighlights.length > 0 && (
                      <div className="space-y-1.5 pt-1">
                        <span className="text-[11px] font-mono uppercase tracking-[0.1em] text-slate-400 block">
                          Engineering Highlights:
                        </span>
                        <ul className="space-y-1 text-xs text-slate-400 font-sans">
                          {project.keyHighlights.map((hl, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400/80 shrink-0 mt-0.5" />
                              <span className="text-slate-300">{hl}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Notice Pill (Transparency requirement) */}
                    {project.highlightNotice && (
                      <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 flex items-start gap-2 text-[11px] text-slate-400 font-mono tracking-[0.02em]">
                        <AlertCircle className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
                        <span>{project.highlightNotice}</span>
                      </div>
                    )}

                  </div>

                  {/* Card Footer: Tech tags + Links */}
                  <div className="p-6 pt-4 border-t border-slate-800/80 bg-slate-950/40 space-y-4">
                    
                    {/* Tech Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-[11px] font-mono tracking-[0.04em] text-slate-300 hover:text-emerald-300 hover:border-emerald-500/30 transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Action Links with Magnetic Hover */}
                    <div className="flex items-center gap-3 pt-2">
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-xs font-mono uppercase tracking-[0.08em] text-slate-200 hover:text-white transition-all flex items-center justify-center gap-2 group/btn"
                      >
                        <GithubIcon className="w-4 h-4 text-slate-400 group-hover/btn:scale-110 transition-transform" />
                        <span>View Repository</span>
                      </a>

                      {project.liveUrl && (
                        <MagneticButton pullFactor={0.2}>
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="py-2.5 px-4 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 text-xs font-mono uppercase tracking-[0.08em] text-emerald-300 hover:text-emerald-200 transition-all flex items-center justify-center gap-2 group/demo"
                          >
                            <span>Live Demo</span>
                            <ExternalLink className="w-3.5 h-3.5 group-hover/demo:translate-x-0.5 group-hover/demo:-translate-y-0.5 transition-transform" />
                          </a>
                        </MagneticButton>
                      )}
                    </div>

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
