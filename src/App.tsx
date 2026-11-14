import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { type FrontierSectionId } from './data/frontierData';
import { useFrontierAudio } from './hooks/useFrontierAudio';
import { DustParticles } from './components/frontier/DustParticles';
import { FrontierQuickNav } from './components/frontier/FrontierQuickNav';
import { FrontierLanding } from './components/frontier/FrontierLanding';
import { FrontierMap } from './components/frontier/FrontierMap';
import { FrontierJournal } from './components/frontier/FrontierJournal';
import { FrontierArsenal } from './components/frontier/FrontierArsenal';
import { FrontierMissionBoard } from './components/frontier/FrontierMissionBoard';
import { FrontierChronicles } from './components/frontier/FrontierChronicles';
import { FrontierJourney } from './components/frontier/FrontierJourney';
import { FrontierSaloon } from './components/frontier/FrontierSaloon';
import { FrontierCustomCursor } from './components/frontier/FrontierCustomCursor';

export const App: React.FC = () => {
  const getInitialView = (): 'landing' | FrontierSectionId => {
    if (typeof window === 'undefined') return 'landing';
    const hash = window.location.hash.replace('#', '') as FrontierSectionId;
    const validViews: FrontierSectionId[] = ['map', 'journal', 'arsenal', 'mission-board', 'chronicles', 'journey', 'saloon'];
    return validViews.includes(hash) ? hash : 'landing';
  };

  const [currentView, setCurrentView] = useState<'landing' | FrontierSectionId>(getInitialView);
  const { isPlaying, toggleSound } = useFrontierAudio();

  React.useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as FrontierSectionId;
      const validViews: FrontierSectionId[] = ['map', 'journal', 'arsenal', 'mission-board', 'chronicles', 'journey', 'saloon'];
      if (validViews.includes(hash)) {
        setCurrentView(hash);
      } else if (!hash) {
        setCurrentView('landing');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleEnterFrontier = () => {
    setCurrentView('map');
    window.location.hash = 'map';
  };

  const handleNavigate = (section: FrontierSectionId) => {
    setCurrentView(section);
    window.location.hash = section;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-[#171512] text-[#E8DCC5] selection:bg-[#B18A57]/30 selection:text-[#FFF5EA] overflow-x-hidden">
      {/* 1. Global Custom Frontier Compass Cursor on Desktop */}
      <FrontierCustomCursor />

      {/* 2. Global Atmospheric Floating Embers & Dust Particles */}
      <DustParticles count={45} />

      {/* 3. Global Film Grain & Vignette Overlay */}
      <div className="pointer-events-none fixed inset-0 z-30 film-grain opacity-35" aria-hidden="true" />

      {/* 4. Top Quick-Nav Bar (Shown on Map & All Waypoint Sub-Sections) */}
      {currentView !== 'landing' && (
        <FrontierQuickNav
          currentSection={currentView}
          onNavigate={handleNavigate}
          isAudioPlaying={isPlaying}
          onToggleAudio={toggleSound}
        />
      )}

      {/* 5. Main Active View with Cinematic AnimatePresence Transitions */}
      <main className="relative z-10 w-full min-h-screen">
        <AnimatePresence mode="wait">
          {currentView === 'landing' && (
            <motion.div
              key="landing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <FrontierLanding
                onEnter={handleEnterFrontier}
                isAudioPlaying={isPlaying}
                onToggleAudio={toggleSound}
              />
            </motion.div>
          )}

          {currentView === 'map' && (
            <motion.div
              key="map"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.03 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <FrontierMap
                onSelectLocation={handleNavigate}
                activeLocation={currentView}
              />
            </motion.div>
          )}

          {currentView === 'journal' && (
            <motion.div
              key="journal"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <FrontierJournal onBackToMap={() => handleNavigate('map')} />
            </motion.div>
          )}

          {currentView === 'arsenal' && (
            <motion.div
              key="arsenal"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <FrontierArsenal onBackToMap={() => handleNavigate('map')} />
            </motion.div>
          )}

          {currentView === 'mission-board' && (
            <motion.div
              key="mission-board"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <FrontierMissionBoard onBackToMap={() => handleNavigate('map')} />
            </motion.div>
          )}

          {currentView === 'chronicles' && (
            <motion.div
              key="chronicles"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <FrontierChronicles onBackToMap={() => handleNavigate('map')} />
            </motion.div>
          )}

          {currentView === 'journey' && (
            <motion.div
              key="journey"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <FrontierJourney onBackToMap={() => handleNavigate('map')} />
            </motion.div>
          )}

          {currentView === 'saloon' && (
            <motion.div
              key="saloon"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <FrontierSaloon onBackToMap={() => handleNavigate('map')} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* 6. Subtle Western Footer (Always Present on Inner Pages) */}
      {currentView !== 'landing' && (
        <footer className="relative z-20 border-t border-[#B18A57]/20 bg-[#120F0D] py-6 text-center text-xs font-mono text-[#A58252]">
          <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
            <span>THE FRONTIER · PORTFOLIO OF SRI HARSHA · 1899</span>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => handleNavigate('map')}
                type="button"
                className="hover:text-[#D4AF7A] underline cursor-pointer"
              >
                World Map
              </button>
              <span>•</span>
              <a
                href="https://github.com/sriharshapn"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#D4AF7A] underline"
              >
                GitHub
              </a>
              <span>•</span>
              <button
                onClick={() => handleNavigate('saloon')}
                type="button"
                className="hover:text-[#D4AF7A] underline cursor-pointer"
              >
                Telegraph & Contact
              </button>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};

export default App;
