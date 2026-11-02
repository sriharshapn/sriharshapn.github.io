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
    <section id="events" className="py-20 lg:py-28 relative border-t border-slate-900 bg-slate-950/30">
      {/* Background accents */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-emerald-500/5 blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 left-10 w-[450px] h-[450px] bg-violet-600/5 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Viewport Animation */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-2 mb-12 lg:mb-16"
        >
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-emerald-400">
            <Trophy className="w-3.5 h-3.5" />
            <span>COMPETITIONS & CREDENTIALS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Hackathons & Events
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl font-mono">
            Competitive technical sprints, hackathons, and verified participation certificates.
          </p>
        </motion.div>

        {/* Events Grid with TiltCard and Staggered Viewport Entrance */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
          {eventItems.map((event, index) => {
            const hasModalCert = event.certificateType === 'local_modal';
            const hasExternalCert = event.certificateType === 'external_url';
            const isPending = event.certificateType === 'none';

            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: (index % 2) * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <TiltCard maxTilt={4} spotlightColor="rgba(16, 185, 129, 0.08)">
                  <div className="h-full p-6 sm:p-7 rounded-2xl bg-gradient-to-b from-slate-900/60 to-slate-950/80 border border-slate-800/90 hover:border-slate-700/80 transition-all duration-300 flex flex-col justify-between shadow-xl group">
                    <div className="space-y-4">
                      
                      {/* Card Header: Organizer & Status Badge */}
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                          {event.organizer}
                        </span>

                        {/* Status Pill */}
                        <div
                          className={`inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono border ${
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

                      {/* Title & Date */}
                      <div className="space-y-1">
                        <h3 className="text-xl font-bold text-white group-hover:text-emerald-300 transition-colors">
                          {event.title}
                        </h3>
                        
                        <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-400">
                          {event.date && (
                            <span className="flex items-center gap-1.5">
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
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-slate-300 text-sm leading-relaxed">
                        {event.description}
                      </p>

                      {/* Certificate / Verification Notice */}
                      {event.certificateNotice && (
                        <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 text-xs font-mono text-slate-400 space-y-1">
                          <div className="flex items-center gap-1.5 text-slate-300 font-semibold">
                            {hasModalCert || hasExternalCert ? (
                              <FileCheck2 className="w-3.5 h-3.5 text-emerald-400" />
                            ) : (
                              <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
                            )}
                            <span>Verification Detail:</span>
                          </div>
                          <p className="text-[11px] text-slate-400 leading-normal">
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
                            className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-teal-400 text-slate-950 font-bold text-xs font-mono tracking-wide transition-all flex items-center justify-center gap-2 shadow-md shadow-emerald-950/40 active:scale-95 group/cert"
                          >
                            <Eye className="w-4 h-4 group-hover/cert:scale-110 transition-transform" />
                            <span>View Verified Certificate</span>
                          </button>
                        </MagneticButton>
                      )}

                      {hasExternalCert && event.certificateUrl && (
                        <a
                          href={event.certificateUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-200 hover:text-white text-xs font-mono transition-all flex items-center justify-center gap-2 group/ext"
                        >
                          <span>View Certificate Credential</span>
                          <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover/ext:translate-x-0.5 group-hover/ext:-translate-y-0.5 transition-transform" />
                        </a>
                      )}

                      {isPending && (
                        <div className="w-full py-2 px-3 rounded-lg bg-slate-950/60 border border-slate-800 text-center text-xs font-mono text-slate-500">
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

      {/* Interactive Certificate Modal for The Beginner Hackathon */}
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
