import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { AcademicWork } from './components/AcademicWork';
import { Events } from './components/Events';
import { GitHubStats } from './components/GitHubStats';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ScrollProgress } from './components/ScrollProgress';
import { CustomCursor } from './components/CustomCursor';
import { BackgroundAmbient } from './components/BackgroundAmbient';
import { GlobalDotMatrix } from './components/GlobalDotMatrix';
import { SmoothScroll } from './components/SmoothScroll';

export const App: React.FC = () => {
  return (
    <SmoothScroll>
      <div className="relative min-h-screen bg-[#080B11] text-zinc-100 selection:bg-emerald-500/30 selection:text-emerald-200 overflow-x-hidden">
        {/* Top scroll progress indicator */}
        <ScrollProgress />

        {/* Continuous full-page interactive dot-matrix background across the entire portfolio */}
        <GlobalDotMatrix />

        {/* Desktop custom cursor & mouse follower spotlight */}
        <CustomCursor />

        {/* Background ambient lighting */}
        <BackgroundAmbient />

        {/* Navigation */}
        <Navbar />

        {/* Main Content Sections */}
        <main className="relative z-10">
          <Hero />
          <About />
          <Skills />
          <Projects />
          <AcademicWork />
          <Events />
          <GitHubStats />
          <Contact />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </SmoothScroll>
  );
};

export default App;
