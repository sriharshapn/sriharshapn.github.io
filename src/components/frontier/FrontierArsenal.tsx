import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Crosshair, Terminal, Code2, Brain, Layers, Database, Cpu, ShieldCheck } from 'lucide-react';
import { skillCategories } from '../../data/frontierData';

interface FrontierArsenalProps {
  onBackToMap: () => void;
}

// Rich technical annotations based on Sri Harsha's verified projects
const SKILL_APPLICATIONS: Record<string, string> = {
  Python: 'Primary language for machine learning, computer vision, and scientific astrodynamic simulations.',
  C: 'Low-level systems programming, memory management, and numerical computational physics engines.',
  JavaScript: 'Full-stack client and server orchestration, interactive graphics, and asynchronous microservices.',
  TypeScript: 'Type-safe frontend architectures, Next.js route handlers, and production enterprise clients.',
  'Machine Learning': 'Classification algorithms, feature extraction, and predictive agronomic intelligence.',
  'Computer Vision': 'Object detection, label bounding box segmentation, and image preprocessing pipelines.',
  OpenCV: 'Contour analysis, morphological transformations, and visual thresholding for label inspection.',
  PaddleOCR: 'Optical character recognition engine extracting packaged commodity textual data.',
  YOLO: 'Real-time object detection models for rapid bounding box localization.',
  'Gemini API': 'Multimodal vision and LLM integration for regulatory compliance and civic issue triage.',
  'Image Processing': 'Noise reduction, perspective rectification, and color space thresholding.',
  React: 'Reactive component architectures, custom canvas integrations, and dynamic state management.',
  Vite: 'Blazing fast bundle orchestration, HMR tooling, and optimized production chunking.',
  'Tailwind CSS': 'Utility-first responsive design, modern fluid layouts, and bespoke styling systems.',
  FastAPI: 'High-performance Python asynchronous REST endpoints for deep learning model inference.',
  'Node.js': 'Backend runtime powering REST services, authentication verification, and server jobs.',
  'Express.js': 'Minimalist server routing, middleware authentication, and API contract design.',
  'Next.js': 'Hybrid server-client application architecture with integrated serverless API routes.',
  'REST APIs': 'Contract-driven HTTP interface design, status code standardization, and payload validation.',
  SQL: 'Relational data modeling, query optimization, indexing, and transactional integrity.',
  SQLite: 'Embedded transactional database storage for local applications and testing.',
  Firebase: 'Cloud infrastructure powering authentication tokens and real-time synchronization.',
  Firestore: 'NoSQL document database schemas with indexed queries and offline persistence.',
  PostgreSQL: 'Robust relational database management system supporting student event ticketing.',
  Pandas: 'Data wrangling, analytical table structures, and dataset preprocessing for training.',
  NumPy: 'High-performance N-dimensional array mathematics and vectorized numerical solvers.',
  Git: 'Distributed version control, branch management, collaborative rebase, and code review.',
  GitHub: 'Open-source collaboration, pull requests, issue tracking, and automated CI/CD workflows.',
  Tauri: 'Lightweight desktop application runtime leveraging web frontends and native system security.',
  ONNX: 'Cross-platform open neural network exchange runtime for accelerated model inference.',
  Vercel: 'Continuous cloud deployment, edge functions, and preview environment pipelines.',
  'Google Apps Script': 'Serverless automation scripting integrating spreadsheet logic and custom APIs.',
  'Google Sheets': 'Lightweight structured database for automated business inventory tracking.',
  'Three.js': 'WebGL 3D graphics rendering, shaders, custom spline geometries, and cameras.',
  Electron: 'Desktop application packaging cross-compiled for engineering simulation tools.',
  Recharts: 'Data visualization charts and statistical distribution dashboards.'
};

const CATEGORY_ICONS: Record<number, React.ReactNode> = {
  0: <Code2 className="w-4 h-4 text-[#B18A57]" />,
  1: <Brain className="w-4 h-4 text-[#B18A57]" />,
  2: <Layers className="w-4 h-4 text-[#B18A57]" />,
  3: <Database className="w-4 h-4 text-[#B18A57]" />,
  4: <Cpu className="w-4 h-4 text-[#B18A57]" />
};

export const FrontierArsenal: React.FC<FrontierArsenalProps> = ({ onBackToMap }) => {
  const [activeCategoryIdx, setActiveCategoryIdx] = useState<number>(0);
  const [selectedSkill, setSelectedSkill] = useState<string>(skillCategories[0].skills[0]);

  const currentCategory = skillCategories[activeCategoryIdx];

  return (
    <div className="relative min-h-[92vh] w-full pt-20 pb-16 px-4 sm:px-6 flex flex-col items-center justify-center">
      {/* Top Header & Return to Map */}
      <div className="w-full max-w-6xl mx-auto mb-6 flex flex-col sm:flex-row items-center justify-between gap-3 z-20">
        <button
          onClick={onBackToMap}
          type="button"
          className="group inline-flex items-center space-x-2 px-4 py-2 rounded-xl border border-[#B18A57]/60 bg-[#251D17]/90 text-[#D7C19C] hover:text-[#FFF5EA] hover:border-[#D4AF7A] transition-all shadow-md cursor-pointer self-start"
        >
          <ArrowLeft className="w-4 h-4 text-[#B18A57] group-hover:-translate-x-1 transition-transform" />
          <span className="font-['ChineseRocks'] text-xs font-bold uppercase tracking-wider">
            Return to World Map
          </span>
        </button>

        <div className="flex items-center space-x-2 text-right">
          <Crosshair className="w-4 h-4 text-[#B18A57]" />
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#B18A57]">
            Saint Denis Waypoint · Technical Arsenal
          </span>
        </div>
      </div>

      {/* Main Arsenal Trunk / Weapons Satchel Container */}
      <div className="w-full max-w-6xl rounded-3xl p-4 sm:p-7 bg-[#211914] border-4 border-[#3D2D20] shadow-[0_25px_70px_rgba(0,0,0,0.95)] z-20 space-y-6">
        {/* Title Bar & Stamped Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-2 border-[#543E30] pb-5">
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#B18A57]">
                Saint Denis Munitions & Instruments · 1899
              </span>
            </div>
            <h2 className="font-['ChineseRocks'] text-2xl sm:text-3xl font-black text-[#FFF5EA] tracking-wide uppercase">
              The Technical Arsenal
            </h2>
          </div>
          <p className="font-['Playfair_Display'] text-xs sm:text-sm italic text-[#D7C19C]/80 max-w-md">
            Every piece of software requires the right caliber of tool. Browse the verified languages, frameworks, and engines in Sri Harsha&apos;s working satchel.
          </p>
        </div>

        {/* Category Navigation Tabs */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 custom-scrollbar">
          {skillCategories.map((cat, idx) => {
            const isActive = activeCategoryIdx === idx;
            return (
              <button
                key={cat.title}
                onClick={() => {
                  setActiveCategoryIdx(idx);
                  setSelectedSkill(cat.skills[0]);
                }}
                type="button"
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl border text-xs font-serif whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'border-[#D4AF7A] bg-[#B18A57] text-[#171512] font-bold shadow-[0_0_20px_rgba(177,138,87,0.4)]'
                    : 'border-[#543E30] bg-[#2C211A] text-[#D7C19C] hover:border-[#B18A57] hover:bg-[#34271E]'
                }`}
              >
                {CATEGORY_ICONS[idx]}
                <span className="font-['ChineseRocks'] uppercase tracking-wider">{cat.title}</span>
              </button>
            );
          })}
        </div>

        {/* Category Purpose Description */}
        <div className="p-3.5 rounded-xl bg-[#291F18] border border-[#543E30] flex items-center justify-between text-xs text-[#D7C19C]">
          <span className="font-mono text-[11px] text-[#D4AF7A]">
            CATEGORY PURPOSE:
          </span>
          <span className="font-['Playfair_Display'] italic text-xs sm:text-sm">
            {currentCategory.description}
          </span>
        </div>

        {/* Two-Column Grid: Collectible Inventory Cards (Left) & Weapon Details Dossier (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Collectible Skill Items Grid */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-3">
            {currentCategory.skills.map((skill) => {
              const isSelected = selectedSkill === skill;
              return (
                <motion.button
                  key={skill}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setSelectedSkill(skill)}
                  type="button"
                  className={`p-3.5 rounded-2xl border-2 text-left transition-all duration-200 cursor-pointer flex flex-col justify-between min-h-[92px] ${
                    isSelected
                      ? 'border-[#D4AF7A] bg-[#783D32] text-[#FFF5EA] shadow-[0_0_20px_rgba(212,175,122,0.35)]'
                      : 'border-[#493426] bg-[#271E17] text-[#D7C19C] hover:border-[#B18A57] hover:bg-[#31251D]'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="font-mono text-[8.5px] uppercase tracking-wider opacity-70">
                      Caliber
                    </span>
                    <span className="text-[10px] text-[#D4AF7A]">★</span>
                  </div>

                  <div>
                    <h4 className="font-['ChineseRocks'] text-sm sm:text-base font-bold tracking-wide uppercase">
                      {skill}
                    </h4>
                  </div>

                  <div className="flex items-center justify-between w-full pt-1 border-t border-black/20 text-[9px] font-mono">
                    <span className="text-[#D4AF7A]">VERIFIED</span>
                    <span className="opacity-60">EQUIPPED</span>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Detailed Skill Inspection Dossier (Right Column) */}
          <div className="lg:col-span-5 p-5 sm:p-6 rounded-2xl bg-[#D7C19C] text-[#251D17] border-2 border-[#543E30] shadow-xl space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b-2 border-[#543E30]/40 pb-2">
                <span className="font-mono text-[9px] uppercase tracking-widest text-[#78593A] font-bold">
                  Instrument Specifications
                </span>
                <span className="px-2 py-0.5 rounded bg-[#783D32] text-white font-mono text-[9px] uppercase tracking-wider font-semibold">
                  Active Asset
                </span>
              </div>

              <div>
                <h3 className="font-['ChineseRocks'] text-2xl font-black text-[#251D17] uppercase tracking-wide">
                  {selectedSkill}
                </h3>
                <p className="font-mono text-[10px] text-[#78593A] uppercase tracking-wider">
                  Category: {currentCategory.title}
                </p>
              </div>

              {/* Verified Application Text */}
              <div className="p-3.5 rounded-xl bg-[#C8B08B]/60 border border-[#A88B67] space-y-1">
                <div className="flex items-center space-x-1 text-[#783D32] text-[10px] font-mono font-bold uppercase">
                  <Terminal className="w-3 h-3" />
                  <span>Practical Field Deployment:</span>
                </div>
                <p className="font-['Playfair_Display'] text-xs sm:text-[13px] leading-relaxed text-[#251D17]">
                  {SKILL_APPLICATIONS[selectedSkill] || `Actively deployed across Sri Harsha's core technical projects and academic research.`}
                </p>
              </div>

              {/* Readiness stamp */}
              <div className="p-3 rounded-xl bg-[#E2D2B8]/80 border border-[#A88B67] flex items-center space-x-2.5 text-xs">
                <ShieldCheck className="w-4 h-4 text-[#783D32] shrink-0" />
                <span className="font-mono text-[10.5px] text-[#3B2C21]">
                  Verified in production repositories and hackathon builds.
                </span>
              </div>
            </div>

            {/* Bottom Arsenal Footer */}
            <div className="pt-3 border-t border-[#A88B67]/60 flex items-center justify-between text-[10px] font-mono text-[#78593A]">
              <span>Saint Denis Arsenal · 1899</span>
              <span className="font-bold text-[#783D32]">READY FOR COMBAT</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
