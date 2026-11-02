import React from 'react';
import { motion } from 'framer-motion';
import { 
  Terminal, 
  MapPin, 
  GraduationCap, 
  Code2, 
  Cpu, 
  Layers, 
  ExternalLink, 
  CheckCircle2, 
  Sparkles,
  Globe2,
  Activity
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { InteractiveTerminal } from './InteractiveTerminal';
import { TiltCard } from './TiltCard';
import { GithubIcon, LinkedinIcon } from './SocialIcons';

export const About: React.FC = () => {
  return (
    <section 
      id="about" 
      className="py-24 lg:py-32 relative border-t border-zinc-900 bg-[#080B11] text-zinc-100 overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/12 w-96 h-96 bg-emerald-500/5 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute bottom-1/4 right-1/12 w-96 h-96 bg-violet-600/5 blur-[140px] pointer-events-none rounded-full" />
      

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-3 mb-12 lg:mb-16"
        >
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-zinc-900/90 border border-zinc-800 text-xs font-mono uppercase tracking-[0.12em] text-lime-400">
            <Terminal className="w-3.5 h-3.5" />
            <span>01 // DEVELOPER WORKSPACE & IDENTITY</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
            <div>
              <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-bold text-white tracking-[-0.03em] leading-tight">
                About Me
              </h2>
              <p className="text-zinc-400 text-sm sm:text-base max-w-2xl font-mono mt-2">
                Bridging AI theory with practical software engineering, computer vision, and systems architecture.
              </p>
            </div>

            {/* Live Telemetry Metadata Pill */}
            <div className="flex items-center space-x-3 px-3.5 py-1.5 rounded-lg bg-zinc-900/60 border border-zinc-800 text-xs font-mono uppercase tracking-[0.08em] text-zinc-400 self-start lg:self-auto">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>ONLINE</span>
              </span>
              <span className="text-zinc-600">|</span>
              <span>BENGALURU, IN</span>
              <span className="text-zinc-600">|</span>
              <span className="text-zinc-300">BMSCE AIML</span>
            </div>
          </div>
        </motion.div>

        {/* Editorial Two-Column Workspace Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* ========================================================
              LEFT COLUMN: Editorial Portrait & Personal Identity
             ======================================================== */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 space-y-6"
          >
            {/* Portrait Card with 3D Tilt */}
            <TiltCard maxTilt={5} className="w-full">
              <div className="p-4 sm:p-5 rounded-2xl bg-zinc-950/90 border border-zinc-800/90 shadow-2xl relative group">
                
                {/* Tech Crosshair Corners */}
                <div className="absolute top-2 left-2 text-[10px] font-mono text-zinc-600 select-none">+</div>
                <div className="absolute top-2 right-2 text-[10px] font-mono text-zinc-600 select-none">+</div>
                <div className="absolute bottom-2 left-2 text-[10px] font-mono text-zinc-600 select-none">+</div>
                <div className="absolute bottom-2 right-2 text-[10px] font-mono text-zinc-600 select-none">+</div>

                {/* Portrait Image Frame */}
                <div className="relative aspect-[4/5] rounded-xl overflow-hidden border border-zinc-800 bg-zinc-900">
                  <img
                    src="./profile.jpg"
                    alt={personalInfo.name}
                    className="w-full h-full object-cover object-top filter grayscale contrast-105 group-hover:grayscale-0 group-hover:scale-102 transition-all duration-700 ease-out"
                    loading="lazy"
                  />

                  {/* Gradient Overlay for Editorial Depth */}
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />

                  {/* Coordinate Overlay (Top Left) */}
                  <div className="absolute top-3 left-3 px-2 py-1 rounded bg-zinc-950/80 border border-zinc-800/80 backdrop-blur-md text-[10px] font-mono text-zinc-400">
                    <span className="text-lime-400">LAT:</span> 12.9716° N / <span className="text-lime-400">LON:</span> 77.5946° E
                  </div>

                  {/* Status Overlay (Top Right) */}
                  <div className="absolute top-3 right-3 flex items-center space-x-1.5 px-2 py-1 rounded bg-zinc-950/80 border border-zinc-800/80 backdrop-blur-md text-[10px] font-mono text-emerald-400">
                    <Activity className="w-3 h-3 animate-pulse" />
                    <span>SYS_ACTIVE</span>
                  </div>

                  {/* Bottom Portrait Caption */}
                  <div className="absolute bottom-3 left-3 right-3 p-3 rounded-lg bg-zinc-950/85 border border-zinc-800/80 backdrop-blur-md">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-xs font-mono font-bold text-white tracking-wide">
                          {personalInfo.name}
                        </h4>
                        <p className="text-[11px] font-mono text-lime-400">
                          {personalInfo.title}
                        </p>
                      </div>
                      <span className="text-[10px] font-mono text-zinc-400 bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800">
                        BMSCE // '29
                      </span>
                    </div>
                  </div>
                </div>

                {/* Identity Quick Highlights */}
                <div className="mt-4 pt-4 border-t border-zinc-800/80 space-y-2.5">
                  <div className="flex items-start space-x-2 text-xs">
                    <GraduationCap className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-zinc-200 block">
                        {personalInfo.degree}
                      </span>
                      <span className="text-zinc-400 text-[11px]">
                        {personalInfo.college}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 text-xs text-zinc-400 font-mono">
                    <MapPin className="w-3.5 h-3.5 text-violet-400 shrink-0" />
                    <span>Autonomous VTU • Bengaluru, Karnataka, India</span>
                  </div>
                </div>

                {/* Action Links */}
                <div className="mt-4 pt-3 border-t border-zinc-800/60 flex items-center justify-between text-xs font-mono">
                  <a
                    href={personalInfo.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1.5 text-zinc-400 hover:text-white transition-colors"
                  >
                    <GithubIcon className="w-3.5 h-3.5 text-zinc-300" />
                    <span>github.com/sriharshapn</span>
                  </a>

                  <a
                    href={personalInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1 text-zinc-400 hover:text-emerald-400 transition-colors"
                  >
                    <LinkedinIcon className="w-3.5 h-3.5 text-zinc-300" />
                    <ExternalLink className="w-3 h-3 text-zinc-500" />
                  </a>
                </div>

              </div>
            </TiltCard>

            {/* Multilingual Competencies Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-zinc-950/60 border border-zinc-800/80 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                <span className="flex items-center gap-1.5 text-zinc-300">
                  <Globe2 className="w-3.5 h-3.5 text-lime-400" />
                  <span>COMMUNICATION LANGUAGES</span>
                </span>
                <span className="text-[11px] text-zinc-500">4 Languages</span>
              </div>

              <div className="flex flex-wrap gap-2 text-xs font-mono">
                <span className="px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 text-zinc-200">
                  English <span className="text-zinc-500 text-[10px]">(Professional)</span>
                </span>
                <span className="px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 text-zinc-200">
                  Kannada <span className="text-lime-400 text-[10px]">(Native)</span>
                </span>
                <span className="px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 text-zinc-200">
                  Telugu <span className="text-lime-400 text-[10px]">(Native)</span>
                </span>
                <span className="px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 text-zinc-200">
                  Hindi <span className="text-zinc-500 text-[10px]">(Conversational)</span>
                </span>
              </div>
            </div>
          </motion.div>

          {/* ========================================================
              RIGHT COLUMN: Interactive Terminal & Editorial Narrative
             ======================================================== */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 space-y-8"
          >
            {/* The Interactive Terminal Component */}
            <InteractiveTerminal />

            {/* Editorial Narrative Biography */}
            <div className="p-6 sm:p-8 rounded-2xl bg-zinc-950/60 border border-zinc-800/80 space-y-5 backdrop-blur-md">
              <div className="flex items-center space-x-2 text-xs font-mono text-lime-400">
                <Code2 className="w-4 h-4" />
                <span>EDITORIAL PROFILE & PERSPECTIVE</span>
              </div>

              <div className="space-y-4 text-zinc-200 text-sm sm:text-base leading-relaxed font-normal">
                {personalInfo.aboutParagraphs.map((paragraph, idx) => (
                  <p key={idx} className="text-zinc-300">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Engineering Focus Badges */}
              <div className="pt-4 border-t border-zinc-800/80 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/80 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-mono text-lime-400 font-bold">
                    <Cpu className="w-3.5 h-3.5" />
                    <span>AI & CV</span>
                  </div>
                  <p className="text-[11px] text-zinc-400 leading-tight">
                    Vision inspection, PaddleOCR, OpenCV & multi-modal Gemini models.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/80 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-mono text-violet-400 font-bold">
                    <Layers className="w-3.5 h-3.5" />
                    <span>BACKEND APIs</span>
                  </div>
                  <p className="text-[11px] text-zinc-400 leading-tight">
                    FastAPI, Express.js, PostgreSQL, Cloud Firestore & async pipelines.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/80 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-400 font-bold">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>SIMULATION</span>
                  </div>
                  <p className="text-[11px] text-zinc-400 leading-tight">
                    Orbital mechanics solvers, UAV flight dynamics & Three.js visuals.
                  </p>
                </div>
              </div>

              {/* Engineering Mindset & Collaboration Integrity */}
              <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-lg bg-zinc-900/30 border border-zinc-800/60 flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-mono font-semibold text-zinc-200 block">
                      Systems-First Thinking
                    </span>
                    <span className="text-zinc-400 text-[11px]">
                      Designing components for real-world constraints—from schema and API latency to edge inference.
                    </span>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-zinc-900/30 border border-zinc-800/60 flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-mono font-semibold text-zinc-200 block">
                      Collaborative Integrity
                    </span>
                    <span className="text-zinc-400 text-[11px]">
                      Clear demarcation of personal contributions in SIH 2026 and hackathon team repositories.
                    </span>
                  </div>
                </div>
              </div>

            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
};
