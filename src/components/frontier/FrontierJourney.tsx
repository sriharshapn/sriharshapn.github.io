import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Compass, MapPin } from 'lucide-react';
import { FRONTIER_TRAIL } from '../../data/frontierData';

interface FrontierJourneyProps {
  onBackToMap: () => void;
}

export const FrontierJourney: React.FC<FrontierJourneyProps> = ({ onBackToMap }) => {
  return (
    <div className="relative min-h-[92vh] w-full pt-20 pb-16 px-4 sm:px-6 flex flex-col items-center justify-center">
      {/* Top Header & Return to Map */}
      <div className="w-full max-w-5xl mx-auto mb-6 flex flex-col sm:flex-row items-center justify-between gap-3 z-20">
        <button
          onClick={onBackToMap}
          type="button"
          className="group inline-flex items-center space-x-2 px-4 py-2 rounded-xl border border-[#B18A57]/60 bg-[#251D17]/90 text-[#D7C19C] hover:text-[#FFF5EA] hover:border-[#D4AF7A] transition-all shadow-md cursor-pointer self-start"
        >
          <ArrowLeft className="w-4 h-4 text-[#B18A57] group-hover:-translate-x-1 transition-transform" />
          <span className="font-['Cinzel'] text-xs font-bold uppercase tracking-wider">
            Return to World Map
          </span>
        </button>

        <div className="flex items-center space-x-2 text-right">
          <Compass className="w-4 h-4 text-[#B18A57]" />
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#B18A57]">
            Horseshoe Overlook Waypoint · The Trail
          </span>
        </div>
      </div>

      {/* Main Trail Container */}
      <div className="w-full max-w-5xl rounded-3xl p-6 sm:p-10 bg-[#211914] border-4 border-[#3D2D20] shadow-[0_25px_70px_rgba(0,0,0,0.95)] z-20 space-y-8">
        {/* Header */}
        <div className="border-b-2 border-[#543E30] pb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs text-[#B18A57]">✦</span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#B18A57]">
                Horseshoe Overlook Ridge · The Expedition Ledger
              </span>
            </div>
            <h2 className="font-['Cinzel'] text-2xl sm:text-4xl font-black text-[#FFF5EA] tracking-wide uppercase">
              The Frontier Trail
            </h2>
          </div>
          <p className="font-['Playfair_Display'] text-xs sm:text-sm italic text-[#D7C19C]/80 max-w-sm">
            &ldquo;We cannot change what is done, but we can build upon every mile traveled.&rdquo;
          </p>
        </div>

        {/* Trail Milestones Timeline */}
        <div className="relative pl-6 sm:pl-10 space-y-8">
          {/* Vertical Trail Rope Line */}
          <div className="absolute left-2 sm:left-4 top-2 bottom-4 w-1 bg-gradient-to-b from-[#783D32] via-[#B18A57] to-[#543E30] rounded-full" />

          {FRONTIER_TRAIL.map((milestone, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative p-5 sm:p-6 rounded-2xl bg-[#2A1F18] border-2 border-[#493426] hover:border-[#B18A57] transition-colors shadow-lg space-y-3"
            >
              {/* Trail Marker Knot Icon */}
              <div className="absolute -left-[30px] sm:-left-[42px] top-6 w-8 h-8 rounded-full bg-[#171512] border-2 border-[#B18A57] flex items-center justify-center shadow-md">
                <span className="font-['Cinzel'] text-xs font-bold text-[#D4AF7A]">
                  0{idx + 1}
                </span>
              </div>

              {/* Milestone Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-[#543E30]/50 pb-2">
                <div>
                  <span className="font-mono text-xs font-bold text-[#D4AF7A] uppercase tracking-wider block">
                    {milestone.period}
                  </span>
                  <h3 className="font-['Cinzel'] text-lg sm:text-xl font-bold text-[#FFF5EA] uppercase tracking-wide">
                    {milestone.title}
                  </h3>
                </div>
                <div className="flex items-center space-x-1 text-xs font-mono text-[#A58252]">
                  <MapPin className="w-3.5 h-3.5 text-[#B18A57]" />
                  <span>{milestone.locationName}</span>
                </div>
              </div>

              {/* Description */}
              <p className="font-['Playfair_Display'] text-xs sm:text-sm text-[#D7C19C] leading-relaxed">
                {milestone.description}
              </p>

              {/* Skills Tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {milestone.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-0.5 rounded-full bg-[#1B140F] border border-[#543E30] text-[#D7C19C] text-[10px] font-mono"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
