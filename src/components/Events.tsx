import React, { useState } from 'react';
import { 
  Trophy, 
  Calendar, 
  ExternalLink, 
  Eye, 
  Clock, 
  CheckCircle2, 
  FileCheck2,
  AlertCircle
} from 'lucide-react';
import { motion } from 'framer-motion';
import { eventItems, personalInfo } from '../data/portfolioData';
import { CertificateModal } from './CertificateModal';
import { TiltCard } from './TiltCard';
import { MagneticButton } from './MagneticButton';

export const Events: React.FC = () => {
  const [activeModalEvent, setActiveModalEvent] = useState<string | null>(null);

  const beginnerHackathon = eventItems.find((e) => e.id === 'beginner-hackathon-2026');

  return (
    <section id="events" className="py-20 lg:py-28 relative border-t border-slate-900 bg-slate-950/30 overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-emerald-500/5 blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 left-10 w-[450px] h-[450px] bg-violet-600/5 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-3 mb-12 lg:mb-16"
        >
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono uppercase tracking-[0.12em] text-emerald-400">
            <Trophy className="w-3.5 h-3.5" />
            <span>05 // HACKATHONS & CREDENTIALS</span>
          </div>

          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-bold text-white tracking-[-0.03em] leading-tight">
            Hackathons & Events
          </h2>

          <p className="text-slate-400 text-sm sm:text-base max-w-2xl font-sans mt-2">
            Competitive technical sprints, hackathons, and verified participation certificates.
          </p>
        </motion.div>

        {/* Events Grid with Sequential Timeline Entrance */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
          {eventItems.map((event, index) => {
            const hasModalCert = event.certificateType === 'local_modal';
            const hasExternalCert = event.certificateType === 'external_url';
            const isPending = event.certificateType === 'none';

            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.7, delay: index * 0.14, ease: [0.16, 1, 0.3, 1] }}
              >
                <TiltCard maxTilt={4} spotlightColor="rgba(16, 185, 129, 0.08)">
                  <div className="h-full p-6 sm:p-7 rounded-2xl bg-gradient-to-b from-slate-900/60 to-slate-950/80 border border-slate-800/90 hover:border-slate-700/80 transition-all duration-300 flex flex-col justify-between shadow-xl group">
                    <div className="space-y-4">
                      
                      {/* Card Header: Organizer & Status Badge */}
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="text-xs font-mono uppercase tracking-[0.12em] text-slate-400">
                          {event.organizer}
                        </span>

                        {/* Status Pill */}
                        <div
                          className={`inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono uppercase tracking-[0.08em] border ${
                            hasModalCert || hasExternalCert
                              ? 'bg-emerald-950/40 border-emerald-800/50 text-emerald-300'
                              : 'bg-slate-900 border-slate-800 text-slate-400'
                          }`}
                        >
                          {hasModalCert || hasExternalCert ? (
                            <>
                              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                              <span>{event.statusBadge}</span>
                            </>
                          ) : (
                            <>
                              <Clock className="w-3 h-3 text-amber-400" />
                              <span>{event.statusBadge}</span>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Title & Date (Animated Independently) */}
                      <div className="space-y-2">
                        <motion.h3 
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.55, delay: 0.1 + index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                          className="text-xl sm:text-2xl font-bold text-white tracking-[-0.02em] group-hover:text-emerald-300 transition-colors"
                        >
                          {event.title}
                        </motion.h3>
                        
                        <motion.div 
                          initial={{ opacity: 0, x: -8 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.55, delay: 0.18 + index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                          className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-400"
                        >
                          {event.date && (
                            <span className="flex items-center gap-1.5 text-slate-300">
                              <Calendar className="w-3.5 h-3.5 text-slate-500" />
                              <span>{event.date}</span>
                            </span>
                          )}
                          {event.project && (
                            <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-violet-300">
                              Project: {event.project}
                            </span>
                          )}
                          {event.track && (
                            <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-teal-300">
                              Track: {event.track}
                            </span>
                          )}
                        </motion.div>
                      </div>

                      {/* Description */}
                      <p className="text-slate-300 text-sm leading-relaxed font-sans">
                        {event.description}
                      </p>

                      {/* Certificate / Verification Notice */}
                      {event.certificateNotice && (
                        <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 text-xs font-mono text-slate-400 space-y-1">
                          <div className="flex items-center gap-1.5 text-slate-300 font-semibold uppercase tracking-[0.08em]">
                            {hasModalCert || hasExternalCert ? (
                              <FileCheck2 className="w-3.5 h-3.5 text-emerald-400" />
                            ) : (
                              <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
                            )}
                            <span>Verification Detail:</span>
                          </div>
                          <p className="text-[11px] text-slate-400 leading-normal font-mono">
                            {event.certificateNotice}
                          </p>
                        </div>
                      )}

                    </div>

                    {/* Card Action Area */}
                    <div className="pt-5 mt-5 border-t border-slate-800/80 flex items-center justify-between">
                      {hasModalCert && (
                        <MagneticButton pullFactor={0.15} className="w-full">
                          <button
                            type="button"
                            onClick={() => setActiveModalEvent(event.id)}
                            className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-teal-400 text-slate-950 font-bold text-xs font-mono uppercase tracking-[0.08em] transition-all flex items-center justify-center gap-2 shadow-md shadow-emerald-950/40 active:scale-95 group/cert"
                          >
                            <Eye className="w-4 h-4 group-hover/cert:scale-110 transition-transform" />
                            <span className="relative">
                              <span>View Verified Certificate</span>
                              <span className="absolute left-0 -bottom-0.5 w-0 group-hover/cert:w-full h-0.5 bg-slate-950/70 transition-all duration-300" />
                            </span>
                          </button>
                        </MagneticButton>
                      )}

                      {hasExternalCert && event.certificateUrl && (
                        <a
                          href={event.certificateUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-200 hover:text-white text-xs font-mono uppercase tracking-[0.08em] transition-all flex items-center justify-center gap-2 group/ext"
                        >
                          <span className="relative">
                            <span>View Certificate Credential</span>
                            <span className="absolute left-0 -bottom-0.5 w-0 group-hover/ext:w-full h-0.5 bg-emerald-400 transition-all duration-300" />
                          </span>
                          <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover/ext:translate-x-0.5 group-hover/ext:-translate-y-0.5 transition-transform" />
                        </a>
                      )}

                      {isPending && (
                        <div className="w-full py-2 px-3 rounded-lg bg-slate-950/60 border border-slate-800 text-center text-xs font-mono text-slate-500 uppercase tracking-[0.06em]">
                          Participation Recorded • Awaiting Organizer Results
                        </div>
                      )}
                    </div>

                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* Interactive Certificate Modal */}
      {beginnerHackathon && (
        <CertificateModal
          isOpen={activeModalEvent === 'beginner-hackathon-2026'}
          onClose={() => setActiveModalEvent(null)}
          title={beginnerHackathon.title}
          imageSrc={beginnerHackathon.certificateImageUrl || './certificates/the-beginner-hackathon-bmsce.png'}
          pdfSrc={beginnerHackathon.certificatePdfUrl || './certificates/the-beginner-hackathon-bmsce.pdf'}
          recipient={personalInfo.name}
          issuer="Protocol Club & Dept of CSE, BMSCE"
          date="March 5, 2026"
        />
      )}
    </section>
  );
};
