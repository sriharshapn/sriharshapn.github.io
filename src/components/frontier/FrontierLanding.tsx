import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, ChevronDown, Volume2, VolumeX, FastForward } from 'lucide-react';
import { DustParticles } from './DustParticles';

interface FrontierLandingProps {
  onEnter: () => void;
  isAudioPlaying: boolean;
  onToggleAudio: () => void;
}

type IntroPhase = 'cowboy' | 'quote' | 'title';

export const FrontierLanding: React.FC<FrontierLandingProps> = ({
  onEnter,
  isAudioPlaying,
  onToggleAudio,
}) => {
  const [phase, setPhase] = useState<IntroPhase>('cowboy');

  useEffect(() => {
    // Stage 1: Cowboy reveal (0 to 1.6s)
    const timer1 = setTimeout(() => {
      setPhase('quote');
    }, 1600);

    // Stage 2: Quote display & letter-spacing expand (1.6s to 4.6s), then fade out
    const timer2 = setTimeout(() => {
      setPhase('title');
    }, 4800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const handleSkipIntro = () => {
    setPhase('title');
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#0F0C0A] text-[#E8DCC5] flex flex-col justify-between selection:bg-[#B18A57]/30">
      {/* 1. Atmospheric Canvas Embers & Dust */}
      <DustParticles count={55} embersOnly={true} />

      {/* 2. Layered Frontier Landscape Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Sky Gradient (Golden hour twilight into deep frontier night) */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#18120E] via-[#241911] to-[#0F0C0A]" />

        {/* Ambient Golden Sun Ray Glow */}
        <div 
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] rounded-full pointer-events-none opacity-45 blur-[150px]"
          style={{
            background: 'radial-gradient(circle, rgba(232, 157, 82, 0.45) 0%, rgba(177, 138, 87, 0.25) 45%, transparent 70%)'
          }}
        />

        {/* Distant Mountain Ridges SVG */}
        <svg 
          className="absolute bottom-0 w-full h-[65vh] min-h-[420px] object-cover opacity-60"
          preserveAspectRatio="none" 
          viewBox="0 0 1440 600"
          aria-hidden="true"
        >
          {/* Back high jagged mountains */}
          <path
            d="M0,320 L120,240 L260,310 L410,180 L540,280 L700,160 L850,290 L1020,190 L1180,270 L1320,210 L1440,300 L1440,600 L0,600 Z"
            fill="#231913"
            opacity="0.55"
          />
          {/* Middle mountain peaks */}
          <path
            d="M0,370 L160,280 L320,380 L480,260 L640,360 L780,240 L940,350 L1100,270 L1260,370 L1440,290 L1440,600 L0,600 Z"
            fill="#1B140F"
            opacity="0.8"
          />
          {/* Foreground pine ridges & rolling hills */}
          <path
            d="M0,450 Q180,390 360,440 T720,410 T1080,450 T1440,400 L1440,600 L0,600 Z"
            fill="#0F0C0A"
          />
        </svg>

        {/* Cowboy Lone Rider Silhouette on the Rocky Ridge */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 pointer-events-none z-10 flex flex-col items-center">
          <svg
            viewBox="0 0 200 240"
            className="w-32 sm:w-44 h-auto text-[#0B0907] drop-shadow-[0_0_25px_rgba(0,0,0,0.95)] opacity-90 transition-opacity duration-1000"
            fill="currentColor"
            aria-hidden="true"
          >
            {/* Rocky Outcrop Base */}
            <path d="M10,230 Q60,200 100,205 Q140,200 190,235 L200,240 L0,240 Z" />
            
            {/* Cowboy Silhouette */}
            {/* Boots & Legs */}
            <path d="M85,160 L82,210 L75,212 L73,205 L80,160 Z" />
            <path d="M105,160 L108,212 L116,214 L117,206 L108,160 Z" />
            
            {/* Long Duster Coat flowing in wind */}
            <path d="M78,110 Q65,150 55,195 Q75,190 95,185 Q115,190 135,195 Q125,150 114,110 Z" />
            
            {/* Torso & Belt */}
            <path d="M82,90 L78,135 Q96,140 114,135 L110,90 Z" />
            
            {/* Gun Holster */}
            <path d="M112,125 Q122,140 118,155 Q114,152 110,135 Z" />
            
            {/* Shoulders & Arms */}
            <path d="M72,92 Q62,115 65,140 L72,138 Q70,118 78,92 Z" />
            <path d="M120,92 Q128,115 125,140 L118,138 Q122,118 114,92 Z" />
            
            {/* Neck / Bandana */}
            <path d="M90,75 L86,92 L106,92 L102,75 Z" />
            
            {/* Head */}
            <ellipse cx="96" cy="68" rx="8" ry="10" />
            
            {/* Classic Wide-Brim Stetson Cowboy Hat */}
            <path d="M60,62 Q96,52 132,62 Q124,56 112,46 Q96,44 80,46 Q68,56 60,62 Z" />
            <path d="M80,46 Q96,38 112,46 L108,58 Q96,55 84,58 Z" />
          </svg>
        </div>

        {/* Drifting Frontier Fog */}
        <div className="absolute bottom-0 left-0 right-0 h-80 bg-gradient-to-t from-[#0F0C0A] via-[#1A140F]/85 to-transparent animate-fog-slow opacity-95" />

        {/* Vignette Overlay */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 30%, rgba(15, 12, 10, 0.8) 80%, #080605 100%)'
          }}
        />

        {/* Film Grain Texture */}
        <div className="absolute inset-0 film-grain pointer-events-none opacity-40" />
      </div>

      {/* 3. Top Header: Frontier Era Stamp & Audio / Skip Controls */}
      <header className="relative z-20 w-full max-w-7xl mx-auto px-6 pt-8 flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <span className="h-2 w-2 rounded-full bg-[#B18A57] animate-pulse" />
          <span className="font-['ChineseRocks'] text-xs uppercase tracking-[0.25em] text-[#B18A57]">
            The American Frontier · 1899
          </span>
        </div>

        <div className="flex items-center space-x-3">
          {/* Skip Intro Button (Visible only during intro phases) */}
          {phase !== 'title' && (
            <button
              onClick={handleSkipIntro}
              type="button"
              className="flex items-center space-x-1.5 rounded-full border border-[#B18A57]/30 bg-[#1D1612]/60 px-3 py-1 backdrop-blur-md text-[10px] font-mono uppercase tracking-wider text-[#D7C19C] hover:text-[#FFF] hover:border-[#B18A57] transition-all cursor-pointer"
            >
              <span>Skip Intro</span>
              <FastForward className="w-3 h-3 text-[#B18A57]" />
            </button>
          )}

          {/* Audio Toggle Button */}
          <button
            onClick={onToggleAudio}
            type="button"
            aria-label={isAudioPlaying ? 'Mute ambient sound' : 'Unmute ambient sound'}
            className="group flex items-center space-x-2 rounded-full border border-[#B18A57]/40 bg-[#1D1612]/70 px-3.5 py-1.5 backdrop-blur-md transition-all hover:border-[#B18A57] hover:bg-[#2A1F18] cursor-pointer"
          >
            {isAudioPlaying ? (
              <Volume2 className="h-3.5 w-3.5 text-[#D4AF7A]" />
            ) : (
              <VolumeX className="h-3.5 w-3.5 text-[#A58252]" />
            )}
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#D7C19C]">
              {isAudioPlaying ? 'Audio On' : 'Audio Off'}
            </span>
          </button>
        </div>
      </header>

      {/* 4. Center Main Stage: Opening Quote vs Dramatic Title Reveal */}
      <main className="relative z-20 w-full max-w-5xl mx-auto px-6 py-12 text-center flex flex-col items-center justify-center min-h-[500px]">
        <AnimatePresence mode="wait">
          {/* ========================================================
              PHASE 2: THE CINEMATIC INTRO QUOTE
              "We're more ghosts than people."
             ======================================================== */}
          {phase === 'quote' && (
            <motion.div
              key="intro-quote"
              initial={{ opacity: 0, scale: 0.98, letterSpacing: '0.08em' }}
              animate={{ opacity: 1, scale: 1, letterSpacing: '0.22em' }}
              exit={{ opacity: 0, scale: 1.03, transition: { duration: 0.9, ease: 'easeInOut' } }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-3xl mx-auto space-y-4 px-4 py-8"
            >
              <span className="text-[#B18A57] text-xs font-serif opacity-75">✦</span>

              <blockquote className="font-['Playfair_Display'] italic text-2xl sm:text-3xl md:text-4xl text-[#E8DCC5] leading-relaxed drop-shadow-[0_4px_30px_rgba(0,0,0,0.95)]">
                &ldquo;We&apos;re more ghosts than people.&rdquo;
              </blockquote>

              <div className="h-[1px] w-24 mx-auto bg-gradient-to-r from-transparent via-[#B18A57]/60 to-transparent pt-2" />
            </motion.div>
          )}

          {/* ========================================================
              PHASE 3: DRAMATIC TITLE REVEAL
              SRI HARSHA
              DEVELOPER · BUILDER · EXPLORER
             ======================================================== */}
          {phase === 'title' && (
            <motion.div
              key="main-title"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center justify-center space-y-4"
            >
              {/* Vintage Top Decorative Stamp */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="inline-flex items-center space-x-3 mb-2 px-4 py-1.5 rounded-full border border-[#B18A57]/40 bg-[#251D17]/80 backdrop-blur-md shadow-lg"
              >
                <span className="text-[#B18A57] text-xs">✦</span>
                <span className="font-['ChineseRocks'] text-[12px] sm:text-xs tracking-[0.3em] uppercase text-[#D7C19C]">
                  Portfolio of an Engineer & Builder
                </span>
                <span className="text-[#B18A57] text-xs">✦</span>
              </motion.div>

              {/* Main Name Heading — Western Display Serif */}
              <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 24 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 1.1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-2 mb-2"
              >
                <h1 className="font-['ChineseRocks','Rye'] text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-wider text-[#FFF5EA] drop-shadow-[0_4px_35px_rgba(0,0,0,0.98)] uppercase">
                  Sri Harsha
                </h1>
                <p className="font-['ChineseRocks','Cinzel'] text-xs sm:text-sm md:text-base tracking-[0.35em] uppercase text-[#D4AF7A] font-semibold drop-shadow-md">
                  Developer · Builder · Explorer
                </p>
              </motion.div>

              {/* Ornate Divider with Compass Diamond */}
              <motion.div 
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: '100%' }}
                transition={{ duration: 0.8, delay: 0.45 }}
                className="max-w-md mx-auto my-4 flex items-center justify-center space-x-4"
              >
                <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#B18A57]/60 to-[#B18A57]" />
                <span className="text-[#D4AF7A] text-sm font-serif">♦</span>
                <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#B18A57]/60 to-[#B18A57]" />
              </motion.div>

              {/* Primary Action Button: ENTER THE FRONTIER */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.65 }}
                className="pt-2"
              >
                <button
                  onClick={onEnter}
                  type="button"
                  className="group relative inline-flex items-center space-x-3 px-8 sm:px-10 py-4 sm:py-5 rounded-none border-2 border-[#B18A57] bg-[#251D17] text-[#FFF5EA] shadow-[0_8px_30px_rgba(0,0,0,0.85)] hover:bg-[#34271E] hover:border-[#D4AF7A] transition-all duration-300 hover:shadow-[0_0_35px_rgba(177,138,87,0.45)] hover:scale-[1.03] active:scale-[0.98] cursor-pointer"
                >
                  {/* Corner Decorative Brackets */}
                  <span className="absolute -top-1.5 -left-1.5 w-3 h-3 border-t-2 border-l-2 border-[#D4AF7A] pointer-events-none" />
                  <span className="absolute -top-1.5 -right-1.5 w-3 h-3 border-t-2 border-r-2 border-[#D4AF7A] pointer-events-none" />
                  <span className="absolute -bottom-1.5 -left-1.5 w-3 h-3 border-b-2 border-l-2 border-[#D4AF7A] pointer-events-none" />
                  <span className="absolute -bottom-1.5 -right-1.5 w-3 h-3 border-b-2 border-r-2 border-[#D4AF7A] pointer-events-none" />

                  <Compass className="w-5 h-5 text-[#B18A57] group-hover:text-[#D4AF7A] group-hover:rotate-90 transition-all duration-500" />
                  <span className="font-['ChineseRocks'] text-base sm:text-lg font-bold tracking-[0.25em] uppercase text-[#FFF5EA] group-hover:text-[#FFF]">
                    Enter The Frontier
                  </span>
                  <span className="text-[#B18A57] group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* 5. Bottom Exploration Indicator */}
      <footer className="relative z-20 w-full max-w-7xl mx-auto px-6 pb-6 flex flex-col items-center">
        {phase === 'title' && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            onClick={onEnter}
            type="button"
            className="flex flex-col items-center space-y-1.5 text-center text-[#A58252] hover:text-[#D4AF7A] transition-colors cursor-pointer group"
          >
            <span className="font-['ChineseRocks'] text-xs uppercase tracking-[0.25em]">
              Click to Open World Map
            </span>
            <ChevronDown className="w-4 h-4 text-[#B18A57] group-hover:translate-y-1 transition-transform animate-bounce" />
          </motion.button>
        )}
      </footer>
    </div>
  );
};
