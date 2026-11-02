import React, { useEffect, useRef, useState, useCallback } from 'react';
import { 
  ExternalLink, 
  User, 
  Users, 
  Cpu, 
  Sparkles, 
  ScanLine,
  Activity,
  MapPin,
  Compass,
  QrCode,
  Package,
  Navigation,
  ChevronDown,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { featuredProjects, type FeaturedProject } from '../../data/portfolioData';
import { HighwayScene } from './HighwayScene';
import { GithubIcon } from '../SocialIcons';
import { TiltCard } from '../TiltCard';
import { MagneticButton } from '../MagneticButton';

// Checkpoint layout side mapping
const CHECKPOINT_SIDES: ('left' | 'right')[] = [
  'left',  // 01 PaarakhMetric
  'right', // 02 KisanSathi
  'left',  // 03 Jan Sathi
  'right', // 04 Drone Aero Lab
  'left',  // 05 Udupu
  'right', // 06 College Event Manager
];

// Bespoke interactive UI preview window for each featured project
const ProjectBespokePreview: React.FC<{ project: FeaturedProject; index: number }> = ({ project, index }) => {
  return (
    <div className="relative w-full aspect-[16/9.5] rounded-xl overflow-hidden bg-[#0A0E17]/95 border border-zinc-800 shadow-xl flex flex-col justify-between group-hover:border-zinc-700 transition-all duration-300">
      {/* Top Window Chrome Bar */}
      <div className="px-3 py-1.5 bg-zinc-900/90 border-b border-zinc-800/80 flex items-center justify-between text-[10px] font-mono text-zinc-400">
        <div className="flex items-center space-x-1.5">
          <span className="w-2 h-2 rounded-full bg-rose-500/80" />
          <span className="w-2 h-2 rounded-full bg-amber-500/80" />
          <span className="w-2 h-2 rounded-full bg-emerald-500/80" />
          <span className="ml-1.5 text-zinc-500 text-[9.5px]">gtr://cp-0{index + 1}/{project.id}</span>
        </div>

        <div className="flex items-center space-x-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-lime-400 animate-pulse" />
          <span className="text-[9.5px] text-lime-400 uppercase tracking-wider font-semibold">VERIFIED</span>
        </div>
      </div>

      {/* Main Preview Surface with Dynamic Project Graphics */}
      <div className="relative flex-1 p-3.5 sm:p-4 flex flex-col justify-between overflow-hidden bg-gradient-to-br from-zinc-950 via-zinc-900/80 to-zinc-950">
        {/* 01. PaarakhMetric */}
        {project.id === 'paarakhmetric' && (
          <div className="relative z-10 space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center space-x-1.5 px-2 py-0.5 rounded bg-lime-950/60 border border-lime-800/60 text-[10px] font-mono text-lime-400">
                <ScanLine className="w-3 h-3" />
                <span>LEGAL METROLOGY OCR PIPELINE</span>
              </div>
              <span className="text-[9px] font-mono text-zinc-500">SIH 2026 // RULE 2011</span>
            </div>

            <div className="p-2.5 rounded-lg bg-zinc-900/90 border border-zinc-800 space-y-1.5">
              <div className="flex items-center justify-between text-[10.5px] font-mono">
                <span className="text-zinc-300">Package Label Inspection:</span>
                <span className="text-lime-400 font-bold">98.4% Confidence</span>
              </div>
              <div className="w-full bg-zinc-800 rounded-full h-1.5 overflow-hidden">
                <div className="bg-gradient-to-r from-lime-500 to-emerald-400 h-full w-[98%]" />
              </div>
              <div className="flex items-center justify-between text-[9px] font-mono text-zinc-400 pt-0.5">
                <span>FastAPI + Gemini Vision</span>
                <span>Firestore & IndexedDB</span>
              </div>
            </div>
          </div>
        )}

        {/* 02. KisanSathi */}
        {project.id === 'kisansathi' && (
          <div className="relative z-10 space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center space-x-1.5 px-2 py-0.5 rounded bg-teal-950/60 border border-teal-800/60 text-[10px] font-mono text-teal-300">
                <Activity className="w-3 h-3" />
                <span>AGRONOMIC RADAR & NDVI LAYER</span>
              </div>
              <span className="text-[9px] font-mono text-zinc-500">EARTH ENGINE</span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
              <div className="p-2 rounded-lg bg-zinc-900/90 border border-zinc-800">
                <span className="text-zinc-400 text-[9px] block">Vegetation Health:</span>
                <span className="text-teal-300 font-bold">NDVI 0.72</span>
              </div>
              <div className="p-2 rounded-lg bg-zinc-900/90 border border-zinc-800">
                <span className="text-zinc-400 text-[9px] block">Weather Intelligence:</span>
                <span className="text-lime-400 font-bold">Open-Meteo</span>
              </div>
            </div>
          </div>
        )}

        {/* 03. Jan Sathi */}
        {project.id === 'jan-sathi' && (
          <div className="relative z-10 space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center space-x-1.5 px-2 py-0.5 rounded bg-violet-950/60 border border-violet-800/60 text-[10px] font-mono text-violet-300">
                <MapPin className="w-3 h-3" />
                <span>CIVIC INCIDENT TRIAGE ENGINE</span>
              </div>
              <span className="text-[9px] font-mono text-zinc-500">3-HR SPRINT</span>
            </div>

            <div className="p-2.5 rounded-lg bg-zinc-900/90 border border-zinc-800 flex items-center justify-between text-[10px] font-mono">
              <div>
                <span className="text-zinc-400 block text-[9px]">Triage Classification:</span>
                <span className="text-white font-bold">Automated Routing</span>
              </div>
              <span className="px-2 py-0.5 rounded bg-lime-950 border border-lime-800/60 text-lime-400 text-[9px] font-bold">
                PRIORITY_1
              </span>
            </div>
          </div>
        )}

        {/* 04. Drone Aero Lab */}
        {project.id === 'drone-aero-lab' && (
          <div className="relative z-10 space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center space-x-1.5 px-2 py-0.5 rounded bg-sky-950/60 border border-sky-800/60 text-[10px] font-mono text-sky-400">
                <Compass className="w-3 h-3" />
                <span>QUADCOPTER FLIGHT HUD</span>
              </div>
              <span className="text-[9px] font-mono text-zinc-500">DJI REFERENCE</span>
            </div>

            <div className="grid grid-cols-3 gap-1.5 text-[9.5px] font-mono text-center">
              <div className="p-1.5 rounded bg-zinc-900 border border-zinc-800">
                <div className="text-sky-400 font-bold">PITCH</div>
                <div>+2.14°</div>
              </div>
              <div className="p-1.5 rounded bg-zinc-900 border border-zinc-800">
                <div className="text-lime-400 font-bold">ROLL</div>
                <div>-0.42°</div>
              </div>
              <div className="p-1.5 rounded bg-zinc-900 border border-zinc-800">
                <div className="text-violet-400 font-bold">THRUST</div>
                <div>14.2 N</div>
              </div>
            </div>
          </div>
        )}

        {/* 05. Udupu */}
        {(project.id === 'udupu' || project.id === 'saree-godown') && (
          <div className="relative z-10 space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center space-x-1.5 px-2 py-0.5 rounded bg-amber-950/60 border border-amber-800/60 text-[10px] font-mono text-amber-400">
                <Package className="w-3 h-3" />
                <span>INVENTORY INTELLIGENCE</span>
              </div>
              <span className="text-[9px] font-mono text-zinc-500">UDUPU</span>
            </div>

            <div className="p-2.5 rounded-lg bg-zinc-900/90 border border-zinc-800 flex items-center justify-between text-[10px] font-mono">
              <div>
                <span className="text-zinc-400 text-[9px] block">Database Sync:</span>
                <span className="text-white font-bold">Apps Script & Sheets</span>
              </div>
              <span className="px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[9px] font-semibold">
                ACTIVE_FEED
              </span>
            </div>
          </div>
        )}

        {/* 06. College Event Manager */}
        {project.id === 'college-event-manager' && (
          <div className="relative z-10 space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center space-x-1.5 px-2 py-0.5 rounded bg-lime-950/60 border border-lime-800/60 text-[10px] font-mono text-lime-400">
                <QrCode className="w-3 h-3" />
                <span>DYNAMIC QR SCANNER</span>
              </div>
              <span className="text-[9px] font-mono text-zinc-500">EVENT_OPS</span>
            </div>

            <div className="p-2.5 rounded-lg bg-zinc-900/90 border border-zinc-800 flex items-center justify-between text-[10px] font-mono">
              <div>
                <span className="text-zinc-400 text-[9px] block">Live Attendance:</span>
                <span className="text-white font-bold">Camera QR Check-in</span>
              </div>
              <span className="px-2 py-0.5 rounded bg-lime-500/10 border border-lime-500/30 text-lime-400 text-[9px] font-semibold">
                ZERO_QUEUE
              </span>
            </div>
          </div>
        )}

        {/* Bottom bar */}
        <div className="relative z-10 pt-2 border-t border-zinc-800/80 flex items-center justify-between text-[10px] font-mono text-zinc-400">
          <span className="text-zinc-500">{project.category}</span>
          <span className="text-lime-400 font-semibold">CHECKPOINT 0{index + 1}</span>
        </div>
      </div>
    </div>
  );
};

export const HighwayProjects: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HighwayScene | null>(null);

  const [activeProjectIndex, setActiveProjectIndex] = useState<number>(0);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  // Initialize Three.js 3D Highway Scene
  useEffect(() => {
    if (canvasRef.current) {
      sceneRef.current = new HighwayScene(canvasRef.current, (index) => {
        setActiveProjectIndex(index);
      });
    }

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollable = containerRef.current.clientHeight - window.innerHeight;
      if (totalScrollable <= 0) return;

      const progress = -rect.top / totalScrollable;
      const clamped = Math.max(0, Math.min(1, progress));
      setScrollProgress(clamped);

      if (sceneRef.current) {
        sceneRef.current.setScrollProgress(clamped);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (sceneRef.current) {
        sceneRef.current.dispose();
      }
    };
  }, []);

  const totalProjects = featuredProjects.length;

  // Normalized progress targets mapped to spline checkpoints
  const CHECKPOINT_TARGET_PROGRESS = [0.066, 0.242, 0.428, 0.615, 0.791, 0.956];

  const scrollToStation = useCallback((idx: number) => {
    setActiveProjectIndex(idx);
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const docTop = rect.top + window.scrollY;
    const totalScrollable = containerRef.current.clientHeight - window.innerHeight;
    const targetRatio = CHECKPOINT_TARGET_PROGRESS[idx] ?? (idx / (totalProjects - 1));
    const targetY = docTop + targetRatio * totalScrollable;

    const lenis = (window as unknown as { __lenis?: { scrollTo: (y: number, opts?: unknown) => void } }).__lenis;
    if (lenis) {
      lenis.scrollTo(targetY);
    } else {
      window.scrollTo({ top: targetY, behavior: 'smooth' });
    }
  }, [totalProjects]);

  const activeProject = featuredProjects[activeProjectIndex] || featuredProjects[0];
  const activeSide = CHECKPOINT_SIDES[activeProjectIndex] ?? 'left';

  return (
    <section 
      ref={containerRef}
      id="projects"
      className="relative bg-[#080B11] text-zinc-100 min-h-[500vh] border-t border-zinc-900"
      aria-label="Selected Work - 3D Elevated Highway Journey"
    >
      {/* ----------------------------------------------------------------
          1. STICKY 3D ELEVATED HIGHWAY VIEWPORT
          Suspended road, Nissan GT-R R35, pillars, streetlights & camera
         ---------------------------------------------------------------- */}
      <div className="sticky top-0 h-screen w-full overflow-hidden z-10">
        {/* Three.js Canvas Mount */}
        <div ref={canvasRef} className="absolute inset-0 w-full h-full" />

        {/* Section Header HUD Bar Overlay (Clean, slim single-row bar safely below Navbar) */}
        <div className="absolute top-[72px] sm:top-[78px] left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between z-20 pointer-events-none">
          <div className="flex items-center space-x-2.5 pointer-events-auto">
            <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-zinc-950/90 border border-zinc-800 text-[10px] font-mono uppercase tracking-widest text-lime-400 backdrop-blur-md shadow-lg">
              <Navigation className="w-3 h-3 text-lime-400 animate-pulse" />
              <span>03 // 3D HIGHWAY</span>
            </div>
            <h2 className="text-base sm:text-xl font-black text-white tracking-tight font-sans drop-shadow-md">
              SELECTED WORK
            </h2>
          </div>

          {/* Vehicle Telemetry & Checkpoint Selector HUD */}
          <div className="flex items-center space-x-2 pointer-events-auto">
            <div className="hidden lg:flex items-center space-x-2 px-3 py-1 rounded-xl bg-zinc-950/85 border border-zinc-800/90 backdrop-blur-md text-[10.5px] font-mono shadow-xl">
              <span className="text-zinc-500">VEHICLE:</span>
              <span className="text-zinc-200 font-bold">NISSAN GT-R R35</span>
              <span className="text-zinc-600">•</span>
              <span className="text-lime-400 font-bold">0{activeProjectIndex + 1}/0{totalProjects}</span>
            </div>

            {/* Checkpoint selector pills */}
            <div className="flex items-center space-x-1 sm:space-x-1.5 p-0.5 rounded-xl bg-zinc-950/80 border border-zinc-800/80 backdrop-blur-md">
              {featuredProjects.map((p, pIdx) => {
                const isActive = activeProjectIndex === pIdx;
                return (
                  <button
                    key={p.id}
                    onClick={() => scrollToStation(pIdx)}
                    type="button"
                    aria-label={`Jump to ${p.name}`}
                    className={`w-6 h-6 sm:w-7 sm:h-7 rounded-lg text-[10.5px] font-mono font-bold transition-all duration-200 cursor-pointer flex items-center justify-center ${
                      isActive
                        ? 'bg-lime-950 border border-lime-400 text-lime-300 shadow-[0_0_12px_rgba(163,230,53,0.4)]'
                        : 'text-zinc-500 hover:text-white hover:bg-zinc-800/50'
                    }`}
                  >
                    0{pIdx + 1}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ----------------------------------------------------------------
            2. ACTIVE CHECKPOINT EDITORIAL CARD (ALTERNATING LEFT & RIGHT)
            Complementing the winding road curves without obstructing the highway
           ---------------------------------------------------------------- */}
        <div className="absolute inset-0 pointer-events-none z-20 flex items-end pb-14 pt-28 md:items-start md:pt-[128px] md:pb-12">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProject.id}
                initial={{ 
                  opacity: 0, 
                  x: activeSide === 'left' ? -35 : 35,
                  scale: 0.96 
                }}
                animate={{ 
                  opacity: 1, 
                  x: 0,
                  scale: 1 
                }}
                exit={{ 
                  opacity: 0, 
                  x: activeSide === 'left' ? -25 : 25,
                  scale: 0.96 
                }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className={`w-full max-w-md xl:max-w-lg pointer-events-auto ${
                  activeSide === 'left' ? 'mr-auto md:ml-2 lg:ml-6' : 'ml-auto md:mr-2 lg:mr-6'
                }`}
              >
                <div className="p-4 sm:p-5 rounded-3xl bg-zinc-950/85 border border-zinc-800/90 backdrop-blur-xl shadow-2xl space-y-3 hover:border-zinc-700/80 transition-colors max-h-[62vh] md:max-h-[74vh] overflow-y-auto">
                  {/* Station Marker Header */}
                  <div className="flex items-center justify-between gap-2 border-b border-zinc-800/80 pb-3">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-mono font-bold text-lime-400 bg-lime-500/10 px-2.5 py-0.5 rounded border border-lime-500/30 tracking-wider">
                        CHECKPOINT 0{activeProjectIndex + 1} // 0{totalProjects}
                      </span>
                      <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-400 truncate max-w-[150px]">
                        {activeProject.category}
                      </span>
                    </div>

                    {/* Collaborative vs Individual Build Badge */}
                    <div className="flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full text-[10.5px] font-mono uppercase tracking-wider border bg-zinc-900 border-zinc-800 text-zinc-300 shrink-0">
                      {activeProject.collaborative ? (
                        <>
                          <Users className="w-3 h-3 text-violet-400" />
                          <span>Team</span>
                        </>
                      ) : (
                        <>
                          <User className="w-3 h-3 text-lime-400" />
                          <span>Individual</span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Project Title & Event Badge */}
                  <div className="space-y-1.5">
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight font-sans">
                      {activeProject.name}
                    </h3>

                    {activeProject.eventBadge && (
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-violet-950/40 border border-violet-800/40 text-[10px] font-mono uppercase tracking-wider text-violet-300">
                        <Sparkles className="w-3 h-3 text-violet-400" />
                        <span>{activeProject.eventBadge}</span>
                      </div>
                    )}
                  </div>

                  {/* Narrative Description */}
                  <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed font-sans line-clamp-3">
                    {activeProject.description}
                  </p>

                  {/* Authentic Role & Contribution Highlight */}
                  <div className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800/90 border-l-2 border-l-lime-400 space-y-1 shadow-md">
                    <div className="flex items-center space-x-1.5 text-[11px] font-mono uppercase tracking-wider text-lime-400 font-semibold">
                      <Cpu className="w-3 h-3" />
                      <span>My Role & Contribution:</span>
                    </div>
                    <p className="text-xs text-zinc-300 font-sans leading-normal">
                      {activeProject.myRole}
                    </p>
                  </div>

                  {/* Bespoke Interactive UI Preview Card */}
                  <TiltCard maxTilt={3} spotlightColor="rgba(163, 230, 53, 0.08)">
                    <ProjectBespokePreview project={activeProject} index={activeProjectIndex} />
                  </TiltCard>

                  {/* Technology Badges */}
                  <div className="flex flex-wrap gap-1.5 pt-0.5">
                    {activeProject.technologies.slice(0, 6).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-[10px] font-mono tracking-wide text-zinc-300"
                      >
                        {tech}
                      </span>
                    ))}
                    {activeProject.technologies.length > 6 && (
                      <span className="px-2 py-0.5 rounded bg-zinc-900/50 text-[10px] font-mono text-zinc-500">
                        +{activeProject.technologies.length - 6} more
                      </span>
                    )}
                  </div>

                  {/* Action Links: GitHub Repository & Live Demo */}
                  <div className="flex items-center justify-between gap-3 pt-1 border-t border-zinc-800/80">
                    <div className="flex items-center gap-2">
                      <a
                        href={activeProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-2 px-3.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-[11px] font-mono uppercase tracking-wider text-zinc-200 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
                      >
                        <GithubIcon className="w-3.5 h-3.5 text-zinc-400" />
                        <span>Repository</span>
                      </a>

                      {activeProject.liveUrl && (
                        <MagneticButton pullFactor={0.2}>
                          <a
                            href={activeProject.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="py-2 px-3.5 rounded-lg bg-lime-500/15 hover:bg-lime-500/25 border border-lime-500/40 text-[11px] font-mono uppercase tracking-wider text-lime-300 hover:text-lime-200 transition-all flex items-center gap-1.5 cursor-pointer shadow-md shadow-lime-950/40"
                          >
                            <span>Live Demo</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </MagneticButton>
                      )}
                    </div>

                    {/* Step Navigation Controls */}
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => scrollToStation((activeProjectIndex - 1 + totalProjects) % totalProjects)}
                        type="button"
                        aria-label="Previous Checkpoint"
                        className="p-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-white cursor-pointer"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => scrollToStation((activeProjectIndex + 1) % totalProjects)}
                        type="button"
                        aria-label="Next Checkpoint"
                        className="p-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-white cursor-pointer"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Scroll Progress indicator & prompt at bottom */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-zinc-950/80 border border-zinc-800/80 backdrop-blur-md text-[11px] font-mono text-zinc-400 z-20 pointer-events-none">
          <ChevronDown className="w-3.5 h-3.5 text-lime-400 animate-bounce" />
          <span>DRIVING DOWN HIGHWAY</span>
          <span className="text-zinc-600">|</span>
          <span className="text-lime-400 font-bold">{Math.round(scrollProgress * 100)}%</span>
        </div>
      </div>
    </section>
  );
};
