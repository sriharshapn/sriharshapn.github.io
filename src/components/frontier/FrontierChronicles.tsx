import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Newspaper, Award, ExternalLink, X, FileText } from 'lucide-react';
import { eventItems, type EventItem } from '../../data/frontierData';

interface FrontierChroniclesProps {
  onBackToMap: () => void;
}

export const FrontierChronicles: React.FC<FrontierChroniclesProps> = ({ onBackToMap }) => {
  const [selectedCert, setSelectedCert] = useState<EventItem | null>(null);

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
          <span className="font-['ChineseRocks'] text-xs font-bold uppercase tracking-wider">
            Return to World Map
          </span>
        </button>

        <div className="flex items-center space-x-2 text-right">
          <Newspaper className="w-4 h-4 text-[#B18A57]" />
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#B18A57]">
            Strawberry Waypoint · Frontier Gazette
          </span>
        </div>
      </div>

      {/* Main Vintage Newspaper Broadside Container */}
      <div 
        className="w-full max-w-5xl rounded-3xl p-6 sm:p-10 bg-[#D7C19C] text-[#251D17] border-4 border-[#543E30] shadow-[0_25px_70px_rgba(0,0,0,0.95)] z-20 space-y-6"
        style={{
          backgroundImage: `
            radial-gradient(circle at 50% 50%, rgba(255, 248, 235, 0.4) 0%, rgba(190, 160, 120, 0.7) 100%),
            repeating-linear-gradient(0deg, rgba(73, 52, 38, 0.02) 0px, rgba(73, 52, 38, 0.02) 1px, transparent 1px, transparent 4px)
          `,
          boxShadow: '0 25px 80px rgba(0,0,0,0.95), inset 0 0 60px rgba(73,52,38,0.3)'
        }}
      >
        {/* Newspaper Masthead */}
        <div className="text-center border-b-4 border-[#251D17] pb-4 space-y-2">
          <div className="flex items-center justify-between text-[9px] sm:text-[10.5px] font-mono uppercase tracking-[0.2em] text-[#78593A] border-b border-[#543E30]/40 pb-1.5">
            <span>Special Hackathon & Credentials Edition</span>
            <span>Strawberry, Big Valley · Established 1899</span>
            <span>Price: Five Cents</span>
          </div>

          <h2 className="font-['ChineseRocks','Rye'] text-3xl sm:text-5xl md:text-6xl text-[#251D17] uppercase tracking-wider">
            The Strawberry Gazette
          </h2>

          <div className="flex items-center justify-center space-x-4 text-xs font-mono tracking-widest text-[#783D32] border-t border-[#543E30]/40 pt-1.5">
            <span>DISPATCHES FROM HACKATHONS, SPRINTS & TECHNICAL COMMISSIONS</span>
          </div>
        </div>

        {/* Newspaper Grid Layout (Articles & Verified Credentials) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {eventItems.map((event, idx) => {
            const hasLocalCert = event.certificateType === 'local_modal';
            const hasExternalCert = event.certificateType === 'external_url';

            return (
              <motion.article
                key={event.id}
                whileHover={{ y: -3 }}
                className="p-5 rounded-2xl bg-[#C8B08B]/40 border-2 border-[#A88B67] shadow-sm flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2.5">
                  {/* Article Metadata Bar */}
                  <div className="flex items-center justify-between border-b border-[#543E30]/30 pb-2 text-[10px] font-mono">
                    <span className="font-bold text-[#783D32] uppercase tracking-wider">
                      {event.date || 'Record ' + (idx + 1)}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-[#251D17] text-[#D7C19C] uppercase tracking-wider font-semibold text-[9px]">
                      {event.statusBadge}
                    </span>
                  </div>

                  {/* Headline */}
                  <h3 className="font-['ChineseRocks'] text-lg sm:text-xl font-black text-[#251D17] leading-tight uppercase">
                    {event.title}
                  </h3>

                  {/* Organizer Subhead */}
                  <div className="font-mono text-xs text-[#543E30]">
                    <span className="font-bold text-[#783D32]">Organizer: </span>
                    <span>{event.organizer}</span>
                  </div>

                  {event.project && (
                    <div className="font-mono text-[11px] text-[#251D17] bg-[#D7C19C] px-2.5 py-1 rounded border border-[#A88B67]">
                      <span className="text-[#783D32] font-bold">Featured Initiative: </span>
                      <span>{event.project}</span>
                    </div>
                  )}

                  {/* Article Body */}
                  <p className="font-['Playfair_Display'] text-xs sm:text-[13px] leading-relaxed text-[#3B2C21] indent-3">
                    {event.description}
                  </p>

                  {/* Official Notice */}
                  {event.certificateNotice && (
                    <p className="font-mono text-[10px] text-[#78593A] italic bg-[#E2D2B8]/70 p-2 rounded border border-[#A88B67]/70">
                      {event.certificateNotice}
                    </p>
                  )}
                </div>

                {/* Interactive Certificate Actions */}
                <div className="pt-3 border-t border-[#A88B67]/60 flex items-center justify-between">
                  {hasLocalCert && (
                    <button
                      onClick={() => setSelectedCert(event)}
                      type="button"
                      className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#783D32] text-white hover:bg-[#8D473A] font-mono text-xs uppercase tracking-wider transition-all shadow cursor-pointer"
                    >
                      <Award className="w-3.5 h-3.5 text-[#E2B77A]" />
                      <span>Inspect Certificate</span>
                    </button>
                  )}

                  {hasExternalCert && event.certificateUrl && (
                    <a
                      href={event.certificateUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#251D17] text-[#FFF5EA] hover:bg-[#34271E] font-mono text-xs uppercase tracking-wider transition-all shadow cursor-pointer"
                    >
                      <span>Verify Credential</span>
                      <ExternalLink className="w-3 h-3 text-[#B18A57]" />
                    </a>
                  )}

                  {!hasLocalCert && !hasExternalCert && (
                    <span className="font-mono text-[10px] text-[#78593A] uppercase tracking-wider">
                      Archived Field Record
                    </span>
                  )}
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>

      {/* ========================================================
          LOCAL CERTIFICATE VIEWER MODAL
         ======================================================== */}
      <AnimatePresence>
        {selectedCert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              className="relative w-full max-w-3xl rounded-3xl p-6 bg-[#251D17] text-[#E8DCC5] border-2 border-[#B18A57] shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between border-b border-[#B18A57]/30 pb-3">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#B18A57]">
                    Official Verified Credential
                  </span>
                  <h3 className="font-['ChineseRocks'] text-xl font-bold text-white uppercase">
                    {selectedCert.title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedCert(null)}
                  type="button"
                  className="p-1.5 rounded-full bg-[#171512] text-[#D7C19C] hover:text-white border border-[#B18A57]/40 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Certificate Image or Embed */}
              <div className="relative aspect-[16/11] rounded-xl overflow-hidden border-2 border-[#543E30] bg-[#171512] shadow-inner flex items-center justify-center">
                {selectedCert.certificateImageUrl ? (
                  <img
                    src={selectedCert.certificateImageUrl}
                    alt={selectedCert.title}
                    className="w-full h-full object-contain"
                  />
                ) : selectedCert.certificatePdfUrl ? (
                  <iframe
                    src={selectedCert.certificatePdfUrl}
                    title={selectedCert.title}
                    className="w-full h-full"
                  />
                ) : (
                  <div className="text-center p-6 font-mono text-sm text-[#A58252]">
                    Certificate record confirmed on file.
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-between pt-2">
                <span className="font-mono text-xs text-[#D7C19C]/80">
                  {selectedCert.certificateNotice}
                </span>

                {selectedCert.certificatePdfUrl && (
                  <a
                    href={selectedCert.certificatePdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#B18A57] text-[#171512] font-mono text-xs font-bold uppercase transition-colors"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Open Full PDF</span>
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
