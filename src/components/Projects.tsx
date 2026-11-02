import React, { useRef } from 'react';
import { 
  ExternalLink, 
  FolderGit2, 
  User, 
  Users, 
  Cpu, 
  Sparkles, 
  AlertCircle,
  CheckCircle2,
  ScanLine,
  Activity,
  MapPin,
  Compass,
  QrCode,
  Package
} from 'lucide-react';
import { motion, useScroll, useTransform, type Variants } from 'framer-motion';
import { featuredProjects, type FeaturedProject } from '../data/portfolioData';
import { GithubIcon } from './SocialIcons';
import { TiltCard } from './TiltCard';
import { MagneticButton } from './MagneticButton';

const customEase = [0.16, 1, 0.3, 1] as const;

// Word reveal animation variants
const projectTitleVariants: Variants = {
  hidden: { y: '115%', opacity: 0, rotate: 1 },
  visible: (i: number) => ({
    y: '0%',
    opacity: 1,
    rotate: 0,
    transition: {
      duration: 0.7,
      delay: 0.1 + i * 0.08,
      ease: customEase,
    },
  }),
};

// Bespoke interactive UI preview window for each featured project
const ProjectVisualPreview: React.FC<{ project: FeaturedProject; index: number }> = ({ project, index }) => {
  return (
    <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-xl overflow-hidden bg-slate-950 border border-slate-800 group-hover:border-slate-700 transition-all duration-500 shadow-2xl flex flex-col justify-between">
      {/* Top Window Bar */}
      <div className="px-4 py-2.5 bg-slate-900/90 border-b border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
        <div className="flex items-center space-x-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          <span className="ml-2 text-slate-500 text-[10px]">sys://{project.id}.view</span>
        </div>

        <div className="flex items-center space-x-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[10px] text-emerald-400 uppercase tracking-wider">LIVE_READY</span>
        </div>
      </div>

      {/* Main Preview Surface with Dynamic Project Graphics */}
      <div className="relative flex-1 p-5 sm:p-6 flex flex-col justify-between overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900/70 to-slate-950">
        {/* Subtle grid backdrop */}
        <div 
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, #94a3b8 1px, transparent 0)',
            backgroundSize: '24px 24px',
          }}
        />

        {/* Project Specific Graphic Elements */}
        {project.id === 'paarakhmetric' && (
          <div className="relative z-10 space-y-4">
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded bg-emerald-950/60 border border-emerald-800/60 text-[11px] font-mono text-emerald-400">
                <ScanLine className="w-3.5 h-3.5" />
                <span>LEGAL METROLOGY OCR PIPELINE</span>
              </div>
              <span className="text-[10px] font-mono text-slate-500">SIH 2026 // RULE 2011</span>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-900/90 border border-slate-800/90 space-y-2">
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className="text-slate-300">Package Label Inspection:</span>
                <span className="text-emerald-400 font-bold">98.4% Confidence</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                <div className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full w-[98%]" />
              </div>
              <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pt-1">
                <span>FastAPI + Gemini Vision</span>
                <span>Firestore IndexedDB</span>
              </div>
            </div>
          </div>
        )}

        {project.id === 'kisansathi' && (
          <div className="relative z-10 space-y-4">
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded bg-teal-950/60 border border-teal-800/60 text-[11px] font-mono text-teal-400">
                <Activity className="w-3.5 h-3.5" />
                <span>AGRONOMIC RADAR & NDVI LAYER</span>
              </div>
              <span className="text-[10px] font-mono text-slate-500">EARTH ENGINE</span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-[11px] font-mono">
              <div className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800">
                <span className="text-slate-400 text-[10px] block">Vegetation Health:</span>
                <span className="text-teal-300 font-bold">Optimal NDVI 0.72</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800">
                <span className="text-slate-400 text-[10px] block">Weather Intelligence:</span>
                <span className="text-emerald-400 font-bold">Open-Meteo Synced</span>
              </div>
            </div>
          </div>
        )}

        {project.id === 'jan-sathi' && (
          <div className="relative z-10 space-y-4">
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded bg-violet-950/60 border border-violet-800/60 text-[11px] font-mono text-violet-400">
                <MapPin className="w-3.5 h-3.5" />
                <span>CIVIC INCIDENT TRIAGE ENGINE</span>
              </div>
              <span className="text-[10px] font-mono text-slate-500">3-HR SPRINT</span>
            </div>

            <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800 flex items-center justify-between text-[11px] font-mono">
              <div>
                <span className="text-slate-400 block text-[10px]">Triage Classification:</span>
                <span className="text-white font-bold">Automated Department Routing</span>
              </div>
              <span className="px-2 py-0.5 rounded bg-emerald-950 border border-emerald-800/60 text-emerald-400 text-[10px]">
                PRIORITY_1
              </span>
            </div>
          </div>
        )}

        {project.id === 'drone-aero-lab' && (
          <div className="relative z-10 space-y-4">
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded bg-sky-950/60 border border-sky-800/60 text-[11px] font-mono text-sky-400">
                <Compass className="w-3.5 h-3.5" />
                <span>QUADCOPTER FLIGHT DYNAMICS HUD</span>
              </div>
              <span className="text-[10px] font-mono text-slate-500">DJI REFERENCE</span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-[10px] font-mono text-center">
              <div className="p-2 rounded bg-slate-900 border border-slate-800 text-slate-300">
                <div className="text-sky-400 font-bold">PITCH</div>
                <div>+2.14°</div>
              </div>
              <div className="p-2 rounded bg-slate-900 border border-slate-800 text-slate-300">
                <div className="text-emerald-400 font-bold">ROLL</div>
                <div>-0.42°</div>
              </div>
              <div className="p-2 rounded bg-slate-900 border border-slate-800 text-slate-300">
                <div className="text-violet-400 font-bold">THRUST</div>
                <div>14.2 N</div>
              </div>
            </div>
          </div>
        )}

        {project.id === 'saree-godown' && (
          <div className="relative z-10 space-y-4">
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded bg-amber-950/60 border border-amber-800/60 text-[11px] font-mono text-amber-400">
                <Package className="w-3.5 h-3.5" />
                <span>HYBRID INVENTORY INTELLIGENCE</span>
              </div>
              <span className="text-[10px] font-mono text-slate-500">UDUPU</span>
            </div>

            <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800 flex items-center justify-between text-[11px] font-mono">
              <div>
                <span className="text-slate-400 text-[10px] block">Cloud Database Sync:</span>
                <span className="text-white font-bold">Apps Script & Sheets Two-Way</span>
              </div>
              <span className="px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-amber-300 text-[10px]">
                ACTIVE_FEED
              </span>
            </div>
          </div>
        )}

        {project.id === 'college-event-manager' && (
          <div className="relative z-10 space-y-4">
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded bg-emerald-950/60 border border-emerald-800/60 text-[11px] font-mono text-emerald-400">
                <QrCode className="w-3.5 h-3.5" />
                <span>DYNAMIC QR REGISTRATION & SCANNER</span>
              </div>
              <span className="text-[10px] font-mono text-slate-500">EVENT_OPS</span>
            </div>

            <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800 flex items-center justify-between text-[11px] font-mono">
              <div>
                <span className="text-slate-400 text-[10px] block">Live Attendance Flow:</span>
                <span className="text-white font-bold">Camera QR Check-in Validated</span>
              </div>
              <span className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px]">
                ZERO_QUEUE
              </span>
            </div>
          </div>
        )}

        {/* Fallback graphic indicator */}
        {!['paarakhmetric', 'kisansathi', 'jan-sathi', 'drone-aero-lab', 'saree-godown', 'college-event-manager'].includes(project.id) && (
          <div className="relative z-10 p-4 rounded-lg bg-slate-900/90 border border-slate-800 text-xs font-mono text-slate-300">
            <span>Engineering Architecture Preview</span>
          </div>
        )}

        {/* Bottom Metadata Bar inside Window */}
        <div className="relative z-10 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
          <span className="text-slate-500">{project.category}</span>
          <span className="text-emerald-400/90">0{index + 1} // ARCH</span>
        </div>
      </div>
    </div>
  );
};

// Individual Large Editorial Showcase Project Component
const EditorialProjectItem: React.FC<{ project: FeaturedProject; index: number }> = ({ project, index }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isEven = index % 2 === 0;

  // Scroll parallax for visual mockup
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const visualParallaxY = useTransform(scrollYProgress, [0, 1], [-22, 22]);

  // Split title words for masked reveal
  const titleWords = project.name.split(' ');

  return (
    <div
      ref={containerRef}
      className="py-12 lg:py-20 border-b border-slate-900/80 last:border-b-0"
    >
      <div className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center ${
        isEven ? '' : 'lg:flex-row-reverse'
      }`}>
        
        {/* ==========================================================
            VISUAL SHOWCASE COLUMN (With Masked Clip-Path & Parallax)
           ========================================================== */}
        <div className={`lg:col-span-7 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
          <motion.div
            style={{ y: visualParallaxY }}
            initial={{ clipPath: 'inset(8% 0% 8% 0%)', opacity: 0 }}
            whileInView={{ clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          >
            <TiltCard maxTilt={4} spotlightColor="rgba(16, 185, 129, 0.08)">
              <ProjectVisualPreview project={project} index={index} />
            </TiltCard>
          </motion.div>
        </div>

        {/* ==========================================================
            EDITORIAL DETAILS COLUMN (With Staggered Text Reveals)
           ========================================================== */}
        <div className={`lg:col-span-5 space-y-6 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
          
          {/* Index & Category Metadata */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center justify-between gap-2"
          >
            <div className="flex items-center space-x-2">
              <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-500/20 tracking-[0.08em]">
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
          </motion.div>

          {/* Project Title with Masked Word Reveal */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="space-y-2"
          >
            <h3 className="text-[clamp(1.5rem,2.8vw,2.25rem)] font-bold text-white tracking-[-0.025em] leading-tight">
              <div className="overflow-hidden pb-1 flex flex-wrap gap-x-2">
                {titleWords.map((word, wordIdx) => (
                  <motion.span
                    key={wordIdx}
                    custom={wordIdx}
                    variants={projectTitleVariants}
                    className="inline-block"
                  >
                    {word}
                  </motion.span>
                ))}
              </div>
            </h3>

            {project.eventBadge && (
              <motion.div
                variants={{
                  hidden: { opacity: 0, scale: 0.95 },
                  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, delay: 0.25 } }
                }}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-violet-950/30 border border-violet-800/40 text-[11px] font-mono uppercase tracking-[0.08em] text-violet-300"
              >
                <Sparkles className="w-3 h-3 text-violet-400" />
                <span>{project.eventBadge}</span>
              </motion.div>
            )}
          </motion.div>

          {/* Project Narrative Description */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 'some' }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="text-slate-300 text-sm leading-relaxed font-sans"
          >
            {project.description}
          </motion.p>

          {/* Role & Specific Contribution */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 'some' }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/90 space-y-1.5 hover:border-slate-700/80 transition-colors"
          >
            <div className="flex items-center space-x-1.5 text-xs font-mono uppercase tracking-[0.1em] text-emerald-400 font-semibold">
              <Cpu className="w-3.5 h-3.5" />
              <span>My Role & Contribution:</span>
            </div>
            <p className="text-xs text-slate-300 leading-normal font-sans">
              {project.myRole}
            </p>
          </motion.div>

          {/* Key Highlights */}
          {project.keyHighlights && project.keyHighlights.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 'some' }}
              transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-1.5"
            >
              <span className="text-[11px] font-mono uppercase tracking-[0.1em] text-slate-400 block">
                Engineering Highlights:
              </span>
              <ul className="space-y-1.5 text-xs text-slate-400 font-sans">
                {project.keyHighlights.map((hl, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400/80 shrink-0 mt-0.5" />
                    <span className="text-slate-300">{hl}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}

          {/* Notice Pill (Transparency requirement) */}
          {project.highlightNotice && (
            <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 flex items-start gap-2 text-[11px] text-slate-400 font-mono tracking-[0.02em]">
              <AlertCircle className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
              <span>{project.highlightNotice}</span>
            </div>
          )}

          {/* Tech Badges */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap gap-1.5 pt-1"
          >
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-[11px] font-mono tracking-[0.04em] text-slate-300 hover:text-emerald-300 hover:border-emerald-500/30 transition-colors"
              >
                {tech}
              </span>
            ))}
          </motion.div>

          {/* Action Links */}
          <div className="flex items-center gap-3 pt-3">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-xs font-mono uppercase tracking-[0.08em] text-slate-200 hover:text-white transition-all flex items-center justify-center gap-2 group/btn"
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
                  className="py-2.5 px-5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 text-xs font-mono uppercase tracking-[0.08em] text-emerald-300 hover:text-emerald-200 transition-all flex items-center justify-center gap-2 group/demo"
                >
                  <span>Live Demo</span>
                  <ExternalLink className="w-3.5 h-3.5 group-hover/demo:translate-x-0.5 group-hover/demo:-translate-y-0.5 transition-transform" />
                </a>
              </MagneticButton>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};

export const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-20 lg:py-28 relative border-t border-slate-900 bg-slate-950/40 overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-emerald-500/5 blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-violet-600/5 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-3 mb-16 lg:mb-20"
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

        {/* Large Editorial Project Showcases (Alternating Left/Right Layout) */}
        <div className="space-y-6">
          {featuredProjects.map((project, index) => (
            <EditorialProjectItem
              key={project.id}
              project={project}
              index={index}
            />
          ))}
        </div>

      </div>
    </section>
  );
};
