import React from 'react';

interface MarqueeTrackProps {
  direction?: 'left' | 'right';
  speedSeconds?: number;
  pauseOnHover?: boolean;
  className?: string;
  children: React.ReactNode;
}

export const MarqueeTrack: React.FC<MarqueeTrackProps> = ({
  direction = 'left',
  speedSeconds = 30,
  pauseOnHover = true,
  className = '',
  children,
}) => {
  const animClass = direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right';
  const pauseClass = pauseOnHover ? 'pause-on-hover' : '';

  return (
    <div 
      className={`relative w-full overflow-hidden select-none pointer-events-auto border-y border-zinc-800/40 bg-[#080B11]/70 backdrop-blur-[4px] ${className}`}
      style={{
        maxWidth: '100vw',
      }}
    >
      <div
        className={`${animClass} ${pauseClass} flex items-center py-2.5 sm:py-3.5`}
        style={{
          ['--marquee-duration' as string]: `${speedSeconds}s`,
        }}
      >
        {/* Track 1 */}
        <div className="flex shrink-0 items-center">
          {children}
        </div>
        {/* Track 2 (Identical twin for 100% gapless looping) */}
        <div className="flex shrink-0 items-center" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
};

// ========================================================
// Marquee 1 — After Hero
// Content: ARTIFICIAL INTELLIGENCE ✳ MACHINE LEARNING ✳ SOFTWARE ENGINEERING ✳ COMPUTER VISION ✳
// ========================================================
export const HeroMarquee: React.FC = () => {
  const items = [
    'ARTIFICIAL INTELLIGENCE',
    'MACHINE LEARNING',
    'SOFTWARE ENGINEERING',
    'COMPUTER VISION',
  ];

  return (
    <div className="relative z-20 py-2 sm:py-3">
      <MarqueeTrack direction="left" speedSeconds={28} className="border-emerald-500/15">
        {Array.from({ length: 4 }).map((_, repeatIdx) => (
          <React.Fragment key={repeatIdx}>
            {items.map((item, idx) => (
              <div key={`${repeatIdx}-${idx}`} className="flex items-center mx-4 sm:mx-6">
                <span className="font-mono text-xs sm:text-sm font-semibold tracking-[0.16em] uppercase text-zinc-300 hover:text-white transition-colors duration-200">
                  {item}
                </span>
                <span className="ml-4 sm:ml-6 text-emerald-400 font-bold text-xs sm:text-sm select-none">
                  ✳
                </span>
              </div>
            ))}
          </React.Fragment>
        ))}
      </MarqueeTrack>
    </div>
  );
};

// ========================================================
// Marquee 2 — Between About and Skills
// Content: PYTHON / C / JAVASCRIPT / TYPESCRIPT / REACT / NODE.JS / OCR /
// Only include technologies actually used in the portfolio.
// ========================================================
export const SkillsMarquee: React.FC = () => {
  const techItems = [
    'PYTHON',
    'C',
    'JAVASCRIPT',
    'TYPESCRIPT',
    'REACT',
    'NODE.JS',
    'OCR',
  ];

  return (
    <div className="relative z-20 py-2 sm:py-3">
      <MarqueeTrack direction="right" speedSeconds={24} className="border-violet-500/15">
        {Array.from({ length: 4 }).map((_, repeatIdx) => (
          <React.Fragment key={repeatIdx}>
            {techItems.map((tech, idx) => (
              <div key={`${repeatIdx}-${idx}`} className="flex items-center mx-3 sm:mx-5">
                <span className="font-mono text-xs sm:text-[13px] font-medium tracking-[0.22em] uppercase text-zinc-400 hover:text-zinc-200 transition-colors duration-200">
                  {tech}
                </span>
                <span className="ml-3 sm:ml-5 text-zinc-600 font-mono text-xs sm:text-sm select-none">
                  /
                </span>
              </div>
            ))}
          </React.Fragment>
        ))}
      </MarqueeTrack>
    </div>
  );
};

// ========================================================
// Marquee 3 — Before Featured Projects
// Content: SELECTED WORK — SELECTED WORK — SELECTED WORK —
// Requirement: Use oversized typography, alternating filled and outlined text.
// ========================================================
export const ProjectsMarquee: React.FC = () => {
  return (
    <div className="relative z-20 py-4 sm:py-6 overflow-hidden">
      <MarqueeTrack 
        direction="left" 
        speedSeconds={32} 
        className="border-zinc-800/80 bg-zinc-950/80 py-2 sm:py-4"
      >
        {Array.from({ length: 6 }).map((_, repeatIdx) => (
          <React.Fragment key={repeatIdx}>
            {/* Filled instance */}
            <div className="flex items-center mx-5 sm:mx-8">
              <span className="font-sans text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-[-0.03em] uppercase text-white hover:text-emerald-300 transition-colors duration-300">
                SELECTED WORK
              </span>
              <span className="ml-5 sm:ml-8 text-zinc-600 font-mono text-2xl sm:text-4xl select-none">
                —
              </span>
            </div>

            {/* Outlined instance */}
            <div className="flex items-center mx-5 sm:mx-8">
              <span className="font-sans text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-[-0.03em] uppercase text-stroke-white transition-all duration-300">
                SELECTED WORK
              </span>
              <span className="ml-5 sm:ml-8 text-emerald-500/50 font-mono text-2xl sm:text-4xl select-none">
                —
              </span>
            </div>
          </React.Fragment>
        ))}
      </MarqueeTrack>
    </div>
  );
};

// ========================================================
// Marquee 4 — Before Contact
// Content: ALWAYS BUILDING. ALWAYS LEARNING. ALWAYS EXPLORING.
// Requirement: Large editorial typography and slow continuous movement.
// ========================================================
export const ContactMarquee: React.FC = () => {
  const statement = [
    'ALWAYS BUILDING.',
    'ALWAYS LEARNING.',
    'ALWAYS EXPLORING.',
  ];

  return (
    <div className="relative z-20 py-3 sm:py-5">
      <MarqueeTrack 
        direction="left" 
        speedSeconds={38} 
        className="border-emerald-500/20 bg-zinc-950/60"
      >
        {Array.from({ length: 4 }).map((_, repeatIdx) => (
          <React.Fragment key={repeatIdx}>
            {statement.map((phrase, idx) => (
              <div key={`${repeatIdx}-${idx}`} className="flex items-center mx-5 sm:mx-8">
                <span className="font-sans text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-zinc-200 hover:text-white transition-colors duration-200">
                  {phrase}
                </span>
                <span className="ml-5 sm:ml-8 w-2 h-2 rounded-full bg-emerald-400 select-none shadow-xs shadow-emerald-400" />
              </div>
            ))}
          </React.Fragment>
        ))}
      </MarqueeTrack>
    </div>
  );
};
