import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface FrontierAudioToggleProps {
  isPlaying: boolean;
  onToggle: () => void;
}

export const FrontierAudioToggle: React.FC<FrontierAudioToggleProps> = ({ isPlaying, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      type="button"
      aria-label={isPlaying ? 'Mute ambient frontier sound' : 'Enable ambient frontier sound'}
      className="group relative flex items-center space-x-2.5 rounded-full border border-[#B18A57]/60 bg-[#251D17]/85 px-3.5 py-1.5 shadow-[0_4px_20px_rgba(0,0,0,0.6)] backdrop-blur-md transition-all duration-300 hover:border-[#B18A57] hover:bg-[#34271E] hover:shadow-[0_0_18px_rgba(177,138,87,0.35)] cursor-pointer"
      title={isPlaying ? 'Mute frontier ambiance' : 'Play ambient frontier wind & campfire (synthesized, 0 data)'}
    >
      <div className="relative flex h-5 w-5 items-center justify-center">
        {isPlaying ? (
          <>
            <Volume2 className="h-4 w-4 text-[#D4AF7A] transition-transform group-hover:scale-110" />
            <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-[#B18A57] animate-ping" />
          </>
        ) : (
          <VolumeX className="h-4 w-4 text-[#A58252] transition-transform group-hover:scale-110" />
        )}
      </div>

      <div className="flex flex-col text-left">
        <span className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-[#B18A57]">
          {isPlaying ? 'Ambiance Active' : 'Sound Off'}
        </span>
        <span className="hidden font-serif text-[10px] italic text-[#D7C19C]/70 sm:inline">
          {isPlaying ? 'Campfire & Wind' : 'Click to Enable'}
        </span>
      </div>
    </button>
  );
};
