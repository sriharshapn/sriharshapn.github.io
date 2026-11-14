import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, GraduationCap, Compass, Sparkles, MapPin } from 'lucide-react';
import { personalInfo } from '../../data/frontierData';

interface FrontierJournalProps {
  onBackToMap: () => void;
}

export const FrontierJournal: React.FC<FrontierJournalProps> = ({ onBackToMap }) => {
  return (
    <div className="relative min-h-[92vh] w-full pt-20 pb-16 px-4 sm:px-6 flex flex-col items-center justify-center">
      {/* Top Waypoint Bar */}
      <div className="w-full max-w-5xl mx-auto mb-6 flex items-center justify-between z-20">
        <button
          onClick={onBackToMap}
          type="button"
          className="group inline-flex items-center space-x-2 px-4 py-2 rounded-xl border border-[#B18A57]/60 bg-[#251D17]/90 text-[#D7C19C] hover:text-[#FFF5EA] hover:border-[#D4AF7A] transition-all shadow-md cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-[#B18A57] group-hover:-translate-x-1 transition-transform" />
          <span className="font-['Cinzel'] text-xs font-bold uppercase tracking-wider">
            Return to World Map
          </span>
        </button>

        <div className="flex items-center space-x-2 text-right">
          <span className="h-2 w-2 rounded-full bg-[#B18A57]" />
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#B18A57]">
            Valentine Waypoint · Field Journal
          </span>
        </div>
      </div>

      {/* Main Open Leather Field Journal Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-5xl rounded-3xl p-3 sm:p-6 bg-[#3B2A1E] border-4 border-[#251D17] shadow-[0_25px_70px_rgba(0,0,0,0.95)] z-20"
        style={{
          boxShadow: '0 20px 60px rgba(0,0,0,0.85), inset 0 0 40px rgba(0,0,0,0.6)'
        }}
      >
        {/* Leather Stitching Border */}
        <div className="rounded-2xl p-1 sm:p-2 border border-dashed border-[#B18A57]/40 bg-[#2C1F16]">
          {/* Inner Two-Page Spread */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 bg-[#D7C19C] rounded-xl overflow-hidden shadow-inner text-[#251D17] relative">
            {/* Center Book Spine Shadow */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-8 -translate-x-1/2 pointer-events-none z-10 bg-gradient-to-r from-black/25 via-black/10 to-transparent" />
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-8 -translate-x-1/2 pointer-events-none z-10 bg-gradient-to-l from-black/25 via-black/10 to-transparent" />

            {/* Bookmark Red Ribbon */}
            <div className="absolute top-0 right-12 w-6 h-20 bg-[#783D32] shadow-md z-20 pointer-events-none rounded-b-sm border-x border-[#54221A]">
              <div className="absolute bottom-0 left-0 right-0 h-4 bg-transparent border-t-8 border-transparent border-b-0 border-l-[12px] border-l-[#783D32] border-r-[12px] border-r-[#783D32]" />
            </div>

            {/* ========================================================
                LEFT PAGE: PORTRAIT DAGUERREOTYPE & ABOUT SRI HARSHA
               ======================================================== */}
            <div className="p-6 sm:p-8 space-y-6 border-b lg:border-b-0 lg:border-r border-[#B4966E]/50 relative">
              {/* Journal Page Header */}
              <div className="flex items-center justify-between border-b-2 border-[#543E30]/40 pb-3">
                <div>
                  <span className="font-mono text-[9px] uppercase tracking-widest text-[#78593A] block">
                    Vol. 1 · Frontier Entries
                  </span>
                  <h3 className="font-['Cinzel'] text-xl sm:text-2xl font-black tracking-wide text-[#251D17] uppercase">
                    Notes From The Trail
                  </h3>
                </div>
                <BookOpen className="w-5 h-5 text-[#783D32]" />
              </div>

              {/* Daguerreotype Portrait & Identity Card */}
              <div className="flex flex-col sm:flex-row items-center gap-5 p-4 rounded-xl bg-[#C8B08B]/40 border border-[#A88B67] shadow-sm">
                <div className="relative group shrink-0">
                  {/* Photo Frame with Vintage Corner Tabs */}
                  <div className="relative w-28 h-32 rounded border-2 border-[#543E30] overflow-hidden bg-[#251D17] shadow-md">
                    <img
                      src="/profile.jpg"
                      alt={personalInfo.name}
                      className="w-full h-full object-cover sepia-[0.35] contrast-110 group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#251D17]/40 via-transparent to-transparent pointer-events-none" />
                  </div>
                  {/* Corner Tabs */}
                  <span className="absolute -top-1 -left-1 w-2.5 h-2.5 border-t-2 border-l-2 border-[#543E30]" />
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 border-t-2 border-r-2 border-[#543E30]" />
                  <span className="absolute -bottom-1 -left-1 w-2.5 h-2.5 border-b-2 border-l-2 border-[#543E30]" />
                  <span className="absolute -bottom-1 -right-1 w-2.5 h-2.5 border-b-2 border-r-2 border-[#543E30]" />
                </div>

                <div className="space-y-1.5 text-center sm:text-left">
                  <span className="inline-block px-2 py-0.5 rounded bg-[#783D32] text-white text-[9.5px] font-mono uppercase tracking-wider font-semibold">
                    Engineer & Builder
                  </span>
                  <h4 className="font-['Cinzel'] text-base font-bold text-[#251D17]">
                    {personalInfo.name}
                  </h4>
                  <p className="font-mono text-[10px] text-[#543E30]">
                    {personalInfo.title}
                  </p>
                  <div className="flex items-center justify-center sm:justify-start space-x-1 text-[10.5px] text-[#78593A]">
                    <MapPin className="w-3 h-3 text-[#783D32]" />
                    <span>{personalInfo.location}</span>
                  </div>
                </div>
              </div>

              {/* Authentic About Paragraphs */}
              <div className="space-y-3 text-xs sm:text-[13px] font-['Playfair_Display'] leading-relaxed text-[#3B2C21]">
                {personalInfo.aboutParagraphs.map((para, idx) => (
                  <p key={idx} className="indent-4">
                    {para}
                  </p>
                ))}
              </div>

              {/* Hand-drawn separator */}
              <div className="pt-2 flex items-center justify-center space-x-3 text-[#78593A]">
                <div className="h-[1px] w-16 bg-[#78593A]/50" />
                <span className="text-xs">❧</span>
                <div className="h-[1px] w-16 bg-[#78593A]/50" />
              </div>
            </div>

            {/* ========================================================
                RIGHT PAGE: EDUCATION, APPROACH & METHODOLOGY
               ======================================================== */}
            <div className="p-6 sm:p-8 space-y-6 flex flex-col justify-between">
              <div className="space-y-6">
                {/* Right Page Header */}
                <div className="flex items-center justify-between border-b-2 border-[#543E30]/40 pb-3">
                  <div>
                    <span className="font-mono text-[9px] uppercase tracking-widest text-[#78593A] block">
                      Chapter II · Disciplines
                    </span>
                    <h3 className="font-['Cinzel'] text-xl sm:text-2xl font-black tracking-wide text-[#251D17] uppercase">
                      Education & Craft
                    </h3>
                  </div>
                  <GraduationCap className="w-5 h-5 text-[#783D32]" />
                </div>

                {/* Formal Education Stamp */}
                <div className="p-4 rounded-xl border border-[#A88B67] bg-[#E2D2B8]/60 space-y-2 shadow-sm">
                  <div className="flex items-center space-x-2 text-[#783D32]">
                    <GraduationCap className="w-4 h-4" />
                    <span className="font-['Cinzel'] text-xs font-bold tracking-wider uppercase">
                      Academic Degree
                    </span>
                  </div>
                  <h4 className="font-['Cinzel'] text-base font-extrabold text-[#251D17]">
                    {personalInfo.degree}
                  </h4>
                  <p className="font-mono text-xs font-semibold text-[#543E30]">
                    {personalInfo.college}
                  </p>
                  <p className="font-['Playfair_Display'] text-xs italic text-[#78593A] pt-1">
                    Focused on artificial intelligence algorithms, mathematical machine learning models, computer vision pipelines, and system architectures.
                  </p>
                </div>

                {/* Engineering Philosophy & Approach */}
                <div className="space-y-2.5">
                  <div className="flex items-center space-x-2 text-[#783D32]">
                    <Sparkles className="w-4 h-4" />
                    <h4 className="font-['Cinzel'] text-xs font-bold tracking-wider uppercase">
                      Engineering Approach
                    </h4>
                  </div>
                  <p className="font-['Playfair_Display'] text-xs sm:text-[13px] leading-relaxed text-[#3B2C21] indent-4">
                    I believe in understanding software systems down to their foundations. Rather than relying on superficial abstractions, my work focuses on building functional, production-ready systems — from computer vision OCR engines that inspect physical labels to high-performance C physics numerical integrators.
                  </p>
                </div>

                {/* Core Focus Areas */}
                <div className="space-y-2 pt-1">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#78593A] block font-bold">
                    Primary Arenas of Focus:
                  </span>
                  <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                    <div className="p-2 rounded bg-[#C8B08B]/50 border border-[#A88B67] flex items-center space-x-1.5">
                      <span className="text-[#783D32] font-bold">✦</span>
                      <span>Computer Vision & OCR</span>
                    </div>
                    <div className="p-2 rounded bg-[#C8B08B]/50 border border-[#A88B67] flex items-center space-x-1.5">
                      <span className="text-[#783D32] font-bold">✦</span>
                      <span>Backend & Scalable APIs</span>
                    </div>
                    <div className="p-2 rounded bg-[#C8B08B]/50 border border-[#A88B67] flex items-center space-x-1.5">
                      <span className="text-[#783D32] font-bold">✦</span>
                      <span>Multimodal AI Integration</span>
                    </div>
                    <div className="p-2 rounded bg-[#C8B08B]/50 border border-[#A88B67] flex items-center space-x-1.5">
                      <span className="text-[#783D32] font-bold">✦</span>
                      <span>Scientific Simulation</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Ink Signature at Bottom of Journal */}
              <div className="pt-4 border-t border-[#A88B67]/60 flex items-center justify-between">
                <div>
                  <span className="font-mono text-[9px] uppercase tracking-wider text-[#78593A]">
                    Verified Field Record
                  </span>
                  <p className="font-['Playfair_Display'] italic text-base font-bold text-[#251D17]">
                    Sri Harsha P. N.
                  </p>
                </div>

                <button
                  onClick={onBackToMap}
                  type="button"
                  className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-[#251D17] text-[#D7C19C] hover:text-white font-['Cinzel'] text-xs font-bold uppercase transition-all shadow cursor-pointer"
                >
                  <Compass className="w-3.5 h-3.5 text-[#B18A57]" />
                  <span>Resume Trail</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
