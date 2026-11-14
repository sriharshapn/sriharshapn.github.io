import React, { useState } from 'react';
import { 
  Map, 
  BookOpen, 
  Crosshair, 
  Scroll, 
  Newspaper, 
  Compass, 
  MessageSquare,
  Menu,
  X,
  Mail
} from 'lucide-react';
import { GithubIcon } from './BrandIcons';
import { type FrontierSectionId, FRONTIER_LOCATIONS } from '../../data/frontierData';
import { FrontierAudioToggle } from './FrontierAudioToggle';

interface FrontierQuickNavProps {
  currentSection: FrontierSectionId;
  onNavigate: (section: FrontierSectionId) => void;
  isAudioPlaying: boolean;
  onToggleAudio: () => void;
}

const SECTION_ICONS: Record<FrontierSectionId, React.ReactNode> = {
  map: <Map className="h-3.5 w-3.5" />,
  journal: <BookOpen className="h-3.5 w-3.5" />,
  arsenal: <Crosshair className="h-3.5 w-3.5" />,
  'mission-board': <Scroll className="h-3.5 w-3.5" />,
  chronicles: <Newspaper className="h-3.5 w-3.5" />,
  journey: <Compass className="h-3.5 w-3.5" />,
  saloon: <MessageSquare className="h-3.5 w-3.5" />
};

export const FrontierQuickNav: React.FC<FrontierQuickNavProps> = ({
  currentSection,
  onNavigate,
  isAudioPlaying,
  onToggleAudio
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSelect = (id: FrontierSectionId) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#171512]/90 border-b border-[#B18A57]/30 backdrop-blur-md shadow-[0_4px_25px_rgba(0,0,0,0.8)]">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
        {/* Brand / Logo */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => handleSelect('map')}
            className="flex items-center space-x-2 text-left group cursor-pointer"
            type="button"
          >
            <div className="w-8 h-8 rounded-full border border-[#B18A57] bg-[#251D17] flex items-center justify-center shadow-inner group-hover:border-[#D4AF7A] transition-colors">
              <Compass className="w-4 h-4 text-[#B18A57] group-hover:rotate-45 transition-transform duration-500" />
            </div>
            <div>
              <span className="block font-['ChineseRocks'] text-xs sm:text-sm font-bold tracking-widest text-[#E8DCC5] group-hover:text-[#D4AF7A] transition-colors uppercase">
                Sri Harsha
              </span>
              <span className="block font-['ChineseRocks'] text-[10px] uppercase tracking-[0.2em] text-[#B18A57]">
                The Frontier · 1899
              </span>
            </div>
          </button>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-1" aria-label="Frontier Map Locations">
          <button
            onClick={() => handleSelect('map')}
            type="button"
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-['ChineseRocks'] uppercase tracking-wider transition-all cursor-pointer ${
              currentSection === 'map'
                ? 'bg-[#B18A57]/20 text-[#D4AF7A] border border-[#B18A57]/60 shadow-[0_0_12px_rgba(177,138,87,0.25)]'
                : 'text-[#D7C19C]/70 hover:text-[#E8DCC5] hover:bg-[#251D17]'
            }`}
          >
            <Map className="w-3.5 h-3.5 text-[#B18A57]" />
            <span>World Map</span>
          </button>

          {FRONTIER_LOCATIONS.map((loc) => {
            const isActive = currentSection === loc.id;
            return (
              <button
                key={loc.id}
                onClick={() => handleSelect(loc.id)}
                type="button"
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-['ChineseRocks'] uppercase tracking-wider transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#B18A57]/20 text-[#D4AF7A] border border-[#B18A57]/60 shadow-[0_0_12px_rgba(177,138,87,0.25)]'
                    : 'text-[#D7C19C]/70 hover:text-[#E8DCC5] hover:bg-[#251D17]'
                }`}
              >
                {SECTION_ICONS[loc.id]}
                <span>{loc.tagline}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Actions: Audio Toggle & Quick Links */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          <FrontierAudioToggle isPlaying={isAudioPlaying} onToggle={onToggleAudio} />

          <a
            href="https://github.com/sriharshapn"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="hidden sm:flex h-9 w-9 items-center justify-center rounded-full border border-[#B18A57]/50 bg-[#251D17] text-[#D7C19C] hover:text-[#D4AF7A] hover:border-[#B18A57] transition-all shadow-md cursor-pointer"
          >
            <GithubIcon className="w-4 h-4" />
          </a>

          <a
            href="mailto:sriharshapn@gmail.com"
            aria-label="Send Email"
            className="hidden sm:flex h-9 w-9 items-center justify-center rounded-full border border-[#B18A57]/50 bg-[#251D17] text-[#D7C19C] hover:text-[#D4AF7A] hover:border-[#B18A57] transition-all shadow-md cursor-pointer"
          >
            <Mail className="w-4 h-4" />
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            type="button"
            aria-label="Toggle navigation menu"
            className="lg:hidden p-2 rounded-lg border border-[#B18A57]/50 bg-[#251D17] text-[#D7C19C] hover:text-[#E8DCC5] cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#B18A57]/30 bg-[#1D1914]/98 px-4 py-4 space-y-2 shadow-2xl backdrop-blur-xl">
          <p className="font-mono text-[10px] uppercase tracking-widest text-[#B18A57] px-2 pb-1 border-b border-[#B18A57]/20">
            Frontier Waypoints & Territories
          </p>

          <button
            onClick={() => handleSelect('map')}
            type="button"
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-serif cursor-pointer ${
              currentSection === 'map'
                ? 'bg-[#B18A57]/25 text-[#D4AF7A] border border-[#B18A57]'
                : 'text-[#E8DCC5] hover:bg-[#251D17]'
            }`}
          >
            <div className="flex items-center space-x-2.5">
              <Map className="w-4 h-4 text-[#B18A57]" />
              <span>The World Map</span>
            </div>
            <span className="font-mono text-[10px] text-[#A58252]">All Regions</span>
          </button>

          {FRONTIER_LOCATIONS.map((loc) => {
            const isActive = currentSection === loc.id;
            return (
              <button
                key={loc.id}
                onClick={() => handleSelect(loc.id)}
                type="button"
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-serif cursor-pointer ${
                  isActive
                    ? 'bg-[#B18A57]/25 text-[#D4AF7A] border border-[#B18A57]'
                    : 'text-[#E8DCC5] hover:bg-[#251D17]'
                }`}
              >
                <div className="flex items-center space-x-2.5">
                  {SECTION_ICONS[loc.id]}
                  <div className="text-left">
                    <span className="block font-medium">{loc.name}</span>
                    <span className="block font-mono text-[10px] text-[#B18A57]">{loc.tagline}</span>
                  </div>
                </div>
                <span className="font-mono text-[9px] uppercase tracking-wider text-[#A58252] bg-[#251D17] px-2 py-0.5 rounded border border-[#B18A57]/30">
                  {loc.badge}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
