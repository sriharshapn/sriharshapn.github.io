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

export const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#080B11] text-slate-100 selection:bg-emerald-500/30 selection:text-emerald-200">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <AcademicWork />
        <Events />
        <GitHubStats />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default App;
