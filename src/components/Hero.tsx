import React from 'react';
import { ArrowDown, MapPin, GraduationCap, ArrowRight } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { HeroVisual } from './HeroVisual';
import { GithubIcon } from './SocialIcons';

export const Hero: React.FC = () => {
  return (
    <section id="home" className="relative min-h-[640px] lg:min-h-[780px] pt-24 pb-16 lg:pt-32 lg:pb-20 flex items-center justify-center overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-gradient-to-tr from-emerald-500/10 via-violet-600/10 to-transparent blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute -top-10 left-10 w-72 h-72 bg-emerald-500/5 blur-[100px] pointer-events-none rounded-full" />
      <div className="absolute top-1/2 right-10 w-80 h-80 bg-violet-600/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Status Pills */}
            <div className="inline-flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-xs text-slate-300 font-mono backdrop-blur-md shadow-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-emerald-300 font-semibold">{personalInfo.title}</span>
              </div>

              <div className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 text-xs text-slate-400 font-mono">
                <GraduationCap className="w-3.5 h-3.5 text-violet-400" />
                <span>{personalInfo.collegeShort}</span>
              </div>

              <div className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 text-xs text-slate-400 font-mono">
                <MapPin className="w-3.5 h-3.5 text-slate-500" />
                <span>Bengaluru</span>
              </div>
            </div>

            {/* Name & Headline */}
            <div className="space-y-3">
              <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                <span className="block text-slate-100">Sri Harsha</span>
                <span className="block text-slate-100">Penugondla Nagaraja</span>
              </h1>
              <p className="text-lg sm:text-xl lg:text-2xl font-semibold bg-gradient-to-r from-emerald-400 via-teal-300 to-violet-400 bg-clip-text text-transparent">
                "{personalInfo.heroSubtitle}"
              </p>
            </div>

            {/* Narrative summary */}
            <p className="text-slate-300 text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl font-normal">
              Artificial Intelligence and Machine Learning engineering student at <span className="text-slate-100 font-medium">BMSCE Bengaluru</span>.
              Passionate about bridging AI models with production-grade engineering—spanning computer vision, OCR, scalable backend architectures, and physics simulations.
            </p>

            {/* CTAs and Links */}
            <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
              <a
                href="#projects"
                className="w-full sm:w-auto text-center px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-bold text-sm tracking-wide transition-all shadow-lg shadow-emerald-950/40 hover:shadow-emerald-500/25 active:scale-95 flex items-center justify-center gap-2 group"
              >
                <span>View Projects</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#contact"
                className="w-full sm:w-auto text-center px-6 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800/90 border border-slate-800 hover:border-slate-700 text-slate-200 font-semibold text-sm tracking-wide transition-all active:scale-95 shadow-sm"
              >
                Contact Me
              </a>

              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-slate-950/80 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white font-mono text-sm tracking-tight transition-all flex items-center justify-center gap-2.5 group"
              >
                <GithubIcon className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                <span>github.com/sriharshapn</span>
              </a>
            </div>

            {/* Engineering Highlights Quick Bar */}
            <div className="pt-6 border-t border-slate-800/70 grid grid-cols-3 gap-4 max-w-xl">
              <div>
                <div className="text-xl sm:text-2xl font-mono font-bold text-white flex items-center gap-1">
                  <span>6</span>
                  <span className="text-emerald-400 text-lg">+</span>
                </div>
                <div className="text-xs text-slate-400 font-mono uppercase tracking-wider mt-0.5">
                  Featured Projects
                </div>
              </div>

              <div>
                <div className="text-xl sm:text-2xl font-mono font-bold text-white flex items-center gap-1">
                  <span>3</span>
                  <span className="text-violet-400 text-lg">+</span>
                </div>
                <div className="text-xs text-slate-400 font-mono uppercase tracking-wider mt-0.5">
                  Hackathon Events
                </div>
              </div>

              <div>
                <div className="text-xl sm:text-2xl font-mono font-bold text-white flex items-center gap-1">
                  <span>BMSCE</span>
                </div>
                <div className="text-xs text-slate-400 font-mono uppercase tracking-wider mt-0.5">
                  AI & ML Dept
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Subtle Animated Visual Element */}
          <div className="lg:col-span-5 w-full">
            <HeroVisual />
          </div>

        </div>

        {/* Scroll down indicator */}
        <div className="mt-10 lg:mt-14 flex justify-center">
          <a
            href="#about"
            className="inline-flex items-center gap-2 text-xs font-mono text-slate-500 hover:text-emerald-400 transition-colors p-2 rounded-full focus:outline-none focus:ring-1 focus:ring-emerald-500"
            aria-label="Scroll to About section"
          >
            <span>DISCOVER MORE</span>
            <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  );
};
