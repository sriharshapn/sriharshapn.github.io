import React from 'react';
import { 
  ExternalLink, 
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
  Package,
  Terminal
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { type FeaturedProject } from '../data/portfolioData';
import { GithubIcon } from './SocialIcons';
import { TiltCard } from './TiltCard';
import { MagneticButton } from './MagneticButton';

interface ProjectDetailPanelProps {
  project: FeaturedProject;
  index: number;
  totalProjects: number;
}

// Bespoke interactive UI preview window for each of the 6 projects
const ProjectBespokePreview: React.FC<{ project: FeaturedProject; index: number }> = ({ project, index }) => {
  return (
    <div className="relative w-full aspect-[16/11] sm:aspect-[16/10] rounded-2xl overflow-hidden bg-[#0A0E17] border border-zinc-800 shadow-2xl flex flex-col justify-between group-hover:border-zinc-700 transition-all duration-500">
      {/* Top Window Chrome Bar */}
      <div className="px-4 py-2.5 bg-zinc-900/90 border-b border-zinc-800/80 flex items-center justify-between text-[11px] font-mono text-zinc-400">
        <div className="flex items-center space-x-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          <span className="ml-2 text-zinc-500 text-[10px]">sys://orbital/{project.id}.view</span>
        </div>

        <div className="flex items-center space-x-2">
          <span className="w-1.5 h-1.5 rounded-full bg-lime-400 animate-pulse" />
          <span className="text-[10px] text-lime-400 uppercase tracking-wider font-semibold">ONLINE // VERIFIED</span>
        </div>
      </div>

      {/* Main Preview Surface with Dynamic Project Graphics */}
      <div className="relative flex-1 p-5 sm:p-6 flex flex-col justify-between overflow-hidden bg-gradient-to-br from-zinc-950 via-zinc-900/70 to-zinc-950">
        {/* Subtle grid backdrop */}
        <div 
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, #a3e635 1px, transparent 0)',
            backgroundSize: '24px 24px',
          }}
        />

        {/* 01. PaarakhMetric */}
        {project.id === 'paarakhmetric' && (
          <div className="relative z-10 space-y-3.5">
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded bg-lime-950/60 border border-lime-800/60 text-[11px] font-mono text-lime-400">
                <ScanLine className="w-3.5 h-3.5" />
                <span>LEGAL METROLOGY OCR PIPELINE</span>
              </div>
              <span className="text-[10px] font-mono text-zinc-500">SIH 2026 // RULE 2011</span>
            </div>

            <div className="p-3.5 rounded-lg bg-zinc-900/90 border border-zinc-800 space-y-2">
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className="text-zinc-300">Package Label Inspection:</span>
                <span className="text-lime-400 font-bold">98.4% Confidence</span>
              </div>
              <div className="w-full bg-zinc-800 rounded-full h-1.5 overflow-hidden">
                <div className="bg-gradient-to-r from-lime-500 to-emerald-400 h-full w-[98%]" />
              </div>
              <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400 pt-1">
                <span>FastAPI + Gemini Vision</span>
                <span>Firestore & IndexedDB</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
              <div className="p-2 rounded bg-zinc-900/80 border border-zinc-800/80">
                <span className="text-zinc-500 block">Bounding Box:</span>
                <span className="text-zinc-200">MRP, Mfg Date, Net Qty</span>
              </div>
              <div className="p-2 rounded bg-zinc-900/80 border border-zinc-800/80">
                <span className="text-zinc-500 block">Compliance State:</span>
                <span className="text-lime-400 font-bold">PASSED (Rule 2011)</span>
              </div>
            </div>
          </div>
        )}

        {/* 02. KisanSathi */}
        {project.id === 'kisansathi' && (
          <div className="relative z-10 space-y-3.5">
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded bg-teal-950/60 border border-teal-800/60 text-[11px] font-mono text-teal-300">
                <Activity className="w-3.5 h-3.5" />
                <span>AGRONOMIC RADAR & NDVI LAYER</span>
              </div>
              <span className="text-[10px] font-mono text-zinc-500">EARTH ENGINE</span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-[11px] font-mono">
              <div className="p-3 rounded-lg bg-zinc-900/90 border border-zinc-800 space-y-1">
                <span className="text-zinc-400 text-[10px] block">Vegetation Health:</span>
                <span className="text-teal-300 font-bold text-sm">NDVI 0.72</span>
                <span className="text-[9px] text-zinc-500 block">Optimal Canopy Vigour</span>
              </div>
              <div className="p-3 rounded-lg bg-zinc-900/90 border border-zinc-800 space-y-1">
                <span className="text-zinc-400 text-[10px] block">Weather Intelligence:</span>
                <span className="text-lime-400 font-bold text-sm">Open-Meteo</span>
                <span className="text-[9px] text-zinc-500 block">Real-time Agro Forecast</span>
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-zinc-900/80 border border-zinc-800/80 flex items-center justify-between text-[10px] font-mono text-zinc-400">
              <span>Pathology Diagnosis: Gemini API</span>
              <span className="text-teal-400">Active Node.js API</span>
            </div>
          </div>
        )}

        {/* 03. Jan Sathi */}
        {project.id === 'jan-sathi' && (
          <div className="relative z-10 space-y-3.5">
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded bg-violet-950/60 border border-violet-800/60 text-[11px] font-mono text-violet-300">
                <MapPin className="w-3.5 h-3.5" />
                <span>CIVIC INCIDENT TRIAGE ENGINE</span>
              </div>
              <span className="text-[10px] font-mono text-zinc-500">3-HR SPRINT</span>
            </div>

            <div className="p-3.5 rounded-lg bg-zinc-900/90 border border-zinc-800 flex items-center justify-between text-[11px] font-mono">
              <div>
                <span className="text-zinc-400 block text-[10px]">Triage Classification:</span>
                <span className="text-white font-bold">Automated Department Routing</span>
              </div>
              <span className="px-2 py-0.5 rounded bg-lime-950 border border-lime-800/60 text-lime-400 text-[10px] font-bold">
                PRIORITY_1
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
              <div className="p-2 rounded bg-zinc-900/80 border border-zinc-800/80">
                <span className="text-zinc-500 block">Intake Modality:</span>
                <span className="text-zinc-200">Photo + Geolocation</span>
              </div>
              <div className="p-2 rounded bg-zinc-900/80 border border-zinc-800/80">
                <span className="text-zinc-500 block">API Framework:</span>
                <span className="text-violet-400">Next.js API Routes</span>
              </div>
            </div>
          </div>
        )}

        {/* 04. Drone Aero Lab */}
        {project.id === 'drone-aero-lab' && (
          <div className="relative z-10 space-y-3.5">
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded bg-sky-950/60 border border-sky-800/60 text-[11px] font-mono text-sky-400">
                <Compass className="w-3.5 h-3.5" />
                <span>QUADCOPTER FLIGHT DYNAMICS HUD</span>
              </div>
              <span className="text-[10px] font-mono text-zinc-500">DJI REFERENCE</span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-[10px] font-mono text-center">
              <div className="p-2.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-300">
                <div className="text-sky-400 font-bold">PITCH</div>
                <div className="text-sm font-semibold mt-0.5">+2.14°</div>
              </div>
              <div className="p-2.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-300">
                <div className="text-lime-400 font-bold">ROLL</div>
                <div className="text-sm font-semibold mt-0.5">-0.42°</div>
              </div>
              <div className="p-2.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-300">
                <div className="text-violet-400 font-bold">THRUST</div>
                <div className="text-sm font-semibold mt-0.5">14.2 N</div>
              </div>
            </div>

            <div className="p-2 rounded bg-zinc-900/80 border border-zinc-800/80 flex items-center justify-between text-[10px] font-mono text-zinc-400">
              <span>Simulation Engine: Three.js 3D</span>
              <span className="text-sky-400">Electron Desktop</span>
            </div>
          </div>
        )}

        {/* 05. Udupu */}
        {(project.id === 'udupu' || project.id === 'saree-godown') && (
          <div className="relative z-10 space-y-3.5">
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded bg-amber-950/60 border border-amber-800/60 text-[11px] font-mono text-amber-400">
                <Package className="w-3.5 h-3.5" />
                <span>HYBRID INVENTORY INTELLIGENCE</span>
              </div>
              <span className="text-[10px] font-mono text-zinc-500">UDUPU</span>
            </div>

            <div className="p-3.5 rounded-lg bg-zinc-900/90 border border-zinc-800 flex items-center justify-between text-[11px] font-mono">
              <div>
                <span className="text-zinc-400 text-[10px] block">Cloud Database Sync:</span>
                <span className="text-white font-bold">Apps Script & Sheets Two-Way</span>
              </div>
              <span className="px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[10px] font-semibold">
                ACTIVE_FEED
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
              <div className="p-2 rounded bg-zinc-900/80 border border-zinc-800/80">
                <span className="text-zinc-500 block">Frontend Stack:</span>
                <span className="text-zinc-200">React + Vite + Recharts</span>
              </div>
              <div className="p-2 rounded bg-zinc-900/80 border border-zinc-800/80">
                <span className="text-zinc-500 block">Asset Storage:</span>
                <span className="text-amber-400">Google Drive API</span>
              </div>
            </div>
          </div>
        )}

        {/* 06. College Event Manager */}
        {project.id === 'college-event-manager' && (
          <div className="relative z-10 space-y-3.5">
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded bg-lime-950/60 border border-lime-800/60 text-[11px] font-mono text-lime-400">
                <QrCode className="w-3.5 h-3.5" />
                <span>DYNAMIC QR REGISTRATION & SCANNER</span>
              </div>
              <span className="text-[10px] font-mono text-zinc-500">EVENT_OPS</span>
            </div>

            <div className="p-3.5 rounded-lg bg-zinc-900/90 border border-zinc-800 flex items-center justify-between text-[11px] font-mono">
              <div>
                <span className="text-zinc-400 text-[10px] block">Live Attendance Flow:</span>
                <span className="text-white font-bold">Camera QR Check-in Validated</span>
              </div>
              <span className="px-2 py-0.5 rounded bg-lime-500/10 border border-lime-500/30 text-lime-400 text-[10px] font-semibold">
                ZERO_QUEUE
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
              <div className="p-2 rounded bg-zinc-900/80 border border-zinc-800/80">
                <span className="text-zinc-500 block">Backend Database:</span>
                <span className="text-zinc-200">PostgreSQL + Express</span>
              </div>
              <div className="p-2 rounded bg-zinc-900/80 border border-zinc-800/80">
                <span className="text-zinc-500 block">Scanning Library:</span>
                <span className="text-lime-400">html5-qrcode</span>
              </div>
            </div>
          </div>
        )}

        {/* Fallback graphic indicator if unmatched */}
        {!['paarakhmetric', 'kisansathi', 'jan-sathi', 'drone-aero-lab', 'udupu', 'saree-godown', 'college-event-manager'].includes(project.id) && (
          <div className="relative z-10 p-4 rounded-lg bg-zinc-900/90 border border-zinc-800 text-xs font-mono text-zinc-300">
            <span>Engineering Architecture Preview</span>
          </div>
        )}

        {/* Bottom Metadata Bar inside Window */}
        <div className="relative z-10 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-[11px] font-mono text-zinc-400">
          <span className="text-zinc-500">{project.category}</span>
          <span className="text-lime-400 font-semibold">0{index + 1} // ORBITAL_ACTIVE</span>
        </div>
      </div>
    </div>
  );
};

export const ProjectDetailPanel: React.FC<ProjectDetailPanelProps> = ({
  project,
  index,
  totalProjects,
}) => {
  return (
    <div className="relative mt-8 pt-8 border-t border-zinc-800/80">
      <AnimatePresence mode="wait">
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -14 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start"
        >
          {/* ========================================================
              LEFT COLUMN: EDITORIAL DETAILS & AUTHENTIC ROLE
             ======================================================== */}
          <div className="lg:col-span-6 space-y-6">
            {/* Project Index, Category & Collaborative Badge */}
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center space-x-2.5">
                <span className="text-xs font-mono font-bold text-lime-400 bg-lime-500/10 px-3 py-1 rounded-md border border-lime-500/30 tracking-wider">
                  0{index + 1} // 0{totalProjects}
                </span>
                <span className="text-xs font-mono uppercase tracking-widest text-zinc-400">
                  {project.category}
                </span>
              </div>

              {/* Collaborative vs Individual Badge */}
              <div className="flex items-center space-x-1.5 px-3 py-1 rounded-full text-[11px] font-mono uppercase tracking-wider border bg-zinc-950/80 border-zinc-800 text-zinc-300">
                {project.collaborative ? (
                  <>
                    <Users className="w-3 h-3 text-violet-400" />
                    <span>Collaborative Team</span>
                  </>
                ) : (
                  <>
                    <User className="w-3 h-3 text-lime-400" />
                    <span>Individual Build</span>
                  </>
                )}
              </div>
            </div>

            {/* Large Project Title & Event Badge */}
            <div className="space-y-2.5">
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight font-sans">
                {project.name}
              </h3>

              {project.eventBadge && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-violet-950/40 border border-violet-800/40 text-[11px] font-mono uppercase tracking-wider text-violet-300">
                  <Sparkles className="w-3.5 h-3.5 text-violet-400" />
                  <span>{project.eventBadge}</span>
                </div>
              )}
            </div>

            {/* Short Narrative Description */}
            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed font-sans">
              {project.description}
            </p>

            {/* Authentic Contribution / Role Highlight Card */}
            <div className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800/90 border-l-2 border-l-lime-400 space-y-1.5 shadow-lg">
              <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-wider text-lime-400 font-semibold">
                <Cpu className="w-3.5 h-3.5" />
                <span>My Role & Contribution:</span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-normal">
                {project.myRole}
              </p>
            </div>

            {/* Key Highlights */}
            {project.keyHighlights && project.keyHighlights.length > 0 && (
              <div className="space-y-2">
                <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 block font-semibold">
                  Engineering Highlights:
                </span>
                <ul className="space-y-1.5 text-xs sm:text-sm text-zinc-400 font-sans">
                  {project.keyHighlights.map((hl, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-lime-400 shrink-0 mt-0.5" />
                      <span className="text-zinc-300">{hl}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Transparency Notice (SIH / Hackathon) */}
            {project.highlightNotice && (
              <div className="p-3 rounded-lg bg-zinc-900/60 border border-zinc-800 flex items-start gap-2 text-[11px] text-zinc-400 font-mono tracking-wide">
                <AlertCircle className="w-3.5 h-3.5 text-zinc-500 shrink-0 mt-0.5" />
                <span>{project.highlightNotice}</span>
              </div>
            )}

            {/* Sequential Technology Badges */}
            <div className="space-y-2 pt-1">
              <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 block">
                Technology Stack:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {project.technologies.map((tech, techIdx) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.05 + techIdx * 0.03, duration: 0.25 }}
                    className="px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-[11px] font-mono tracking-wide text-zinc-300 hover:text-lime-300 hover:border-lime-500/40 transition-colors"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Repository & Demo Action Links */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-xs font-mono uppercase tracking-wider text-zinc-200 hover:text-white transition-all flex items-center justify-center gap-2 group/btn cursor-pointer shadow-md"
              >
                <GithubIcon className="w-4 h-4 text-zinc-400 group-hover/btn:scale-110 transition-transform" />
                <span>View Repository</span>
              </a>

              {project.liveUrl && (
                <MagneticButton pullFactor={0.2}>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-5 rounded-xl bg-lime-500/15 hover:bg-lime-500/25 border border-lime-500/40 text-xs font-mono uppercase tracking-wider text-lime-300 hover:text-lime-200 transition-all flex items-center justify-center gap-2 group/demo cursor-pointer shadow-md shadow-lime-950/40"
                  >
                    <span>Live Demo</span>
                    <ExternalLink className="w-3.5 h-3.5 group-hover/demo:translate-x-0.5 group-hover/demo:-translate-y-0.5 transition-transform" />
                  </a>
                </MagneticButton>
              )}
            </div>
          </div>

          {/* ========================================================
              RIGHT COLUMN: BESPOKE VISUAL PREVIEW & PARALLAX TILT
             ======================================================== */}
          <div className="lg:col-span-6">
            <TiltCard maxTilt={5} spotlightColor="rgba(163, 230, 53, 0.1)">
              <ProjectBespokePreview project={project} index={index} />
            </TiltCard>

            {/* Minimal Decorative Architecture Metadata Below Card */}
            <div className="mt-3 px-2 flex items-center justify-between text-[11px] font-mono text-zinc-500">
              <div className="flex items-center space-x-2">
                <Terminal className="w-3 h-3 text-zinc-600" />
                <span>TELEMETRY: VERIFIED_BUILD</span>
              </div>
              <div className="flex items-center space-x-2 text-zinc-600">
                <span>HASH: 0x{project.id.slice(0, 4).toUpperCase()}</span>
                <span>•</span>
                <span className="text-lime-400/80">60 FPS</span>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
