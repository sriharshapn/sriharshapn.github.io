import React from 'react';
import { motion } from 'framer-motion';
import { Compass, ChevronDown, Volume2, VolumeX } from 'lucide-react';
import { DustParticles } from './DustParticles';

interface FrontierLandingProps {
  onEnter: () => void;
  isAudioPlaying: boolean;
  onToggleAudio: () => void;
}

export const FrontierLanding: React.FC<FrontierLandingProps> = ({
  onEnter,
  isAudioPlaying,
  onToggleAudio,
}) => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#120F0D] text-[#E8DCC5] flex flex-col justify-between selection:bg-[#B18A57]/30">
      {/* 1. Atmospheric Canvas Embers & Dust */}
      <DustParticles count={50} embersOnly={true} />

      {/* 2. Layered Frontier Landscape Background with Golden-Hour Atmosphere */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Sky Gradient (Golden hour twilight into deep frontier night) */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1E1712] via-[#2A1E15] to-[#120F0D]" />

        {/* Ambient Golden Sun Ray Glow */}
        <div 
          className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none opacity-40 blur-[140px]"
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
            fill="#120F0D"
          />
        </svg>

        {/* Drifting Frontier Fog */}
        <div className="absolute bottom-0 left-0 right-0 h-72 bg-gradient-to-t from-[#120F0D] via-[#1A140F]/80 to-transparent animate-fog-slow opacity-90" />

        {/* Vignette Overlay */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 35%, rgba(18, 15, 13, 0.75) 85%, #0B0908 100%)'
          }}
        />

        {/* Subtle Film Grain */}
        <div className="absolute inset-0 film-grain pointer-events-none opacity-40" />
      </div>

      {/* 3. Top Header: Frontier Era Stamp & Audio Control */}
      <header className="relative z-20 w-full max-w-7xl mx-auto px-6 pt-8 flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <span className="h-2 w-2 rounded-full bg-[#B18A57] animate-pulse" />
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#B18A57]">
            The American Frontier · 1899
          </span>
        </div>

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
      </header>

      {/* 4. Center Main Stage: Hero Typography & Call to Exploration */}
      <main className="relative z-20 w-full max-w-5xl mx-auto px-6 py-12 text-center flex flex-col items-center justify-center">
        {/* Vintage Top Decorative Stamp */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center space-x-3 mb-6 px-4 py-1.5 rounded-full border border-[#B18A57]/40 bg-[#251D17]/80 backdrop-blur-md shadow-lg"
        >
          <span className="text-[#B18A57] text-xs">✦</span>
          <span className="font-['Cinzel'] text-[11px] sm:text-xs tracking-[0.3em] uppercase text-[#D7C19C]">
            Portfolio of an Engineer & Builder
          </span>
          <span className="text-[#B18A57] text-xs">✦</span>
        </motion.div>

        {/* Main Name Heading — Western Display Serif */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-2 mb-4"
        >
          <h1 className="font-['Rye'] text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-wider text-[#FFF5EA] drop-shadow-[0_4px_30px_rgba(0,0,0,0.95)] uppercase">
            Sri Harsha
          </h1>
          <p className="font-['Cinzel'] text-xs sm:text-sm md:text-base tracking-[0.35em] uppercase text-[#D4AF7A] font-semibold drop-shadow-md">
            Developer · Builder · Explorer
          </p>
        </motion.div>

        {/* Ornate Divider with Compass Diamond */}
        <motion.div 
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: '100%' }}
          transition={{ duration: 0.9, delay: 0.55 }}
          className="max-w-md mx-auto my-6 flex items-center justify-center space-x-4"
        >
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#B18A57]/60 to-[#B18A57]" />
          <span className="text-[#D4AF7A] text-sm font-serif">♦</span>
          <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#B18A57]/60 to-[#B18A57]" />
        </motion.div>

        {/* Core Tagline */}
        <motion.blockquote
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="font-['Playfair_Display'] italic text-lg sm:text-2xl md:text-3xl text-[#E8DCC5] max-w-2xl leading-relaxed mb-10 drop-shadow-md"
        >
          &ldquo;Every journey leaves a mark. This is mine.&rdquo;
        </motion.blockquote>

        {/* Primary Action Button: ENTER THE FRONTIER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.85 }}
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
            <span className="font-['Cinzel'] text-sm sm:text-base font-bold tracking-[0.25em] uppercase text-[#FFF5EA] group-hover:text-[#FFF]">
              Enter The Frontier
            </span>
            <span className="text-[#B18A57] group-hover:translate-x-1 transition-transform">
              →
            </span>
          </button>
        </motion.div>
      </main>

      {/* 5. Bottom Exploration Indicator */}
      <footer className="relative z-20 w-full max-w-7xl mx-auto px-6 pb-6 flex flex-col items-center">
        <button
          onClick={onEnter}
          type="button"
          className="flex flex-col items-center space-y-1.5 text-center text-[#A58252] hover:text-[#D4AF7A] transition-colors cursor-pointer group"
        >
          <span className="font-mono text-[9px] uppercase tracking-[0.25em]">
            Click to Open World Map
          </span>
          <ChevronDown className="w-4 h-4 text-[#B18A57] group-hover:translate-y-1 transition-transform animate-bounce" />
        </button>
      </footer>
    </div>
  );
};
