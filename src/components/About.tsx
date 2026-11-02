import React from 'react';
import { BookOpen, Code2, Globe2, Sparkles, Terminal, CheckCircle2, UserCheck } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-20 lg:py-28 relative border-t border-slate-900 bg-slate-950/30">
      {/* Background subtle glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-emerald-500/5 blur-[130px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-violet-600/5 blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="space-y-2 mb-12 lg:mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-emerald-400">
            <UserCheck className="w-3.5 h-3.5" />
            <span>BACKGROUND & IDENTITY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            About Me
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl font-mono">
            Bridging AI theory with practical software engineering and applied problem-solving.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Personal Statement & Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-md space-y-4 shadow-xl">
              <div className="flex items-center space-x-2 text-xs font-mono text-violet-400 mb-2">
                <Terminal className="w-4 h-4" />
                <span>PERSONAL INTRODUCTION</span>
              </div>

              {personalInfo.aboutParagraphs.map((paragraph, idx) => (
                <p
                  key={idx}
                  className="text-slate-200 text-base sm:text-lg leading-relaxed font-normal"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Core Values / Engineering Mindset */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-xl bg-slate-900/30 border border-slate-800/60 space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-semibold">
                  <Code2 className="w-4 h-4" />
                  <span>SYSTEMS THINKING</span>
                </div>
                <p className="text-slate-300 text-xs leading-relaxed">
                  Focusing on how components fit together—from database schema and backend APIs to inference speed, edge constraints, and user interface responsiveness.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-slate-900/30 border border-slate-800/60 space-y-2">
                <div className="flex items-center gap-2 text-violet-400 font-mono text-xs font-semibold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>TRANSPARENT COLLABORATION</span>
                </div>
                <p className="text-slate-300 text-xs leading-relaxed">
                  Clear demarcation of individual vs collaborative contributions in hackathons and group engineering efforts, valuing open collaboration and code integrity.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Institutional Details & Highlights */}
          <div className="lg:col-span-5 space-y-5">
            
            {/* Education Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900/80 to-slate-950/80 border border-slate-800 space-y-4 shadow-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-xs font-mono text-emerald-400">
                  <BookOpen className="w-4 h-4" />
                  <span>EDUCATION</span>
                </div>
                <span className="text-[11px] font-mono text-slate-400 bg-slate-800/80 px-2.5 py-0.5 rounded-full border border-slate-700">
                  2025 – 2029
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white tracking-tight">
                  {personalInfo.degree}
                </h3>
                <p className="text-slate-300 text-sm font-medium mt-1">
                  {personalInfo.college}
                </p>
                <p className="text-xs font-mono text-slate-400 mt-0.5">
                  Autonomous College under VTU • Bengaluru, Karnataka
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800/80 space-y-2 text-xs text-slate-300 font-mono">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>Tier-1 Engineering Institution (State Merit)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
                  <span>AI, Machine Learning, Computer Vision & Systems</span>
                </div>
              </div>
            </div>

            {/* Technical Domains Card */}
            <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80 space-y-3">
              <div className="flex items-center space-x-2 text-xs font-mono text-violet-400">
                <Sparkles className="w-4 h-4" />
                <span>TECHNICAL PROFILE</span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 flex items-start gap-2.5">
                  <span className="text-emerald-400 font-bold font-mono">01.</span>
                  <div>
                    <span className="text-slate-200 font-semibold block">Computer Vision & OCR</span>
                    <span className="text-slate-400">Label inspection, segmentation, PaddleOCR, OpenCV & Gemini Vision.</span>
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 flex items-start gap-2.5">
                  <span className="text-violet-400 font-bold font-mono">02.</span>
                  <div>
                    <span className="text-slate-200 font-semibold block">Backend & Distributed APIs</span>
                    <span className="text-slate-400">FastAPI, Express.js, PostgreSQL, Cloud Firestore & RESTful design.</span>
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 flex items-start gap-2.5">
                  <span className="text-teal-400 font-bold font-mono">03.</span>
                  <div>
                    <span className="text-slate-200 font-semibold block">Simulation & Computational Modeling</span>
                    <span className="text-slate-400">UAV thrust models, velocity-Verlet numerical solvers, and orbital physics.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Multilingual Card */}
            <div className="p-5 rounded-2xl bg-slate-900/30 border border-slate-800/70 space-y-2.5">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Globe2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>LANGUAGES</span>
                </span>
                <span className="text-[11px] text-slate-500">Communication</span>
              </div>

              <div className="flex flex-wrap gap-2 text-xs font-mono">
                <span className="px-2.5 py-1 rounded-md bg-slate-800/80 border border-slate-700/80 text-slate-200">
                  English <span className="text-slate-500 text-[10px]">(Professional)</span>
                </span>
                <span className="px-2.5 py-1 rounded-md bg-slate-800/80 border border-slate-700/80 text-slate-200">
                  Kannada <span className="text-emerald-400 text-[10px]">(Native)</span>
                </span>
                <span className="px-2.5 py-1 rounded-md bg-slate-800/80 border border-slate-700/80 text-slate-200">
                  Telugu <span className="text-emerald-400 text-[10px]">(Native)</span>
                </span>
                <span className="px-2.5 py-1 rounded-md bg-slate-800/80 border border-slate-700/80 text-slate-200">
                  Hindi <span className="text-slate-500 text-[10px]">(Conversational)</span>
                </span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
