import React, { useState, useEffect } from 'react';
import { X, ZoomIn, ZoomOut, RotateCcw, ExternalLink, Download, Award, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  imageSrc: string;
  pdfSrc: string;
  recipient: string;
  issuer: string;
  date: string;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  title,
  imageSrc,
  pdfSrc,
  recipient,
  issuer,
  date,
}) => {
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.25, 2.5));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.25, 0.75));
  const handleResetZoom = () => setZoomLevel(1);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Certificate viewer: ${title}`}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6"
        >
          {/* Animated Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Animated Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 15 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden z-10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Top Bar */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-800 bg-slate-950/80">
              <div className="flex items-center space-x-2.5">
                <div className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white tracking-tight flex items-center gap-1.5">
                    <span>{title}</span>
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  </h3>
                  <p className="text-[11px] font-mono text-slate-400">
                    Verified Certificate of Participation • {date}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                {/* Zoom Controls */}
                <div className="hidden sm:flex items-center space-x-1 bg-slate-900 px-2 py-1 rounded-lg border border-slate-800 text-xs font-mono">
                  <button
                    type="button"
                    onClick={handleZoomOut}
                    disabled={zoomLevel <= 0.75}
                    aria-label="Zoom out"
                    className="p-1 hover:text-white text-slate-400 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  >
                    <ZoomOut className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-12 text-center text-[11px] text-slate-300 select-none">
                    {Math.round(zoomLevel * 100)}%
                  </span>
                  <button
                    type="button"
                    onClick={handleZoomIn}
                    disabled={zoomLevel >= 2.5}
                    aria-label="Zoom in"
                    className="p-1 hover:text-white text-slate-400 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={handleResetZoom}
                    aria-label="Reset zoom"
                    className="p-1 hover:text-white text-slate-400 ml-1 border-l border-slate-800 pl-1.5 transition-colors"
                    title="Reset zoom"
                  >
                    <RotateCcw className="w-3 h-3" />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close modal"
                  className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Certificate Display Area with Zoom */}
            <div className="flex-1 overflow-auto p-4 sm:p-6 flex items-center justify-center bg-slate-950/90 min-h-[320px] max-h-[68vh]">
              <div
                className="transition-transform duration-200 ease-out origin-center rounded-lg overflow-hidden shadow-2xl border border-slate-800 max-w-full"
                style={{ transform: `scale(${zoomLevel})` }}
              >
                <img
                  src={imageSrc}
                  alt={`Certificate for ${recipient} - ${title}`}
                  className="w-full h-auto object-contain max-h-[62vh] rounded-md select-none"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Modal Bottom Action Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between px-5 py-3.5 border-t border-slate-800 bg-slate-950/95 gap-3">
              <div className="text-xs text-slate-400 font-mono text-center sm:text-left">
                <span className="text-slate-200 font-medium">Presented to:</span> {recipient} • <span className="text-slate-200 font-medium">Issuer:</span> {issuer}
              </div>

              <div className="flex items-center space-x-3 w-full sm:w-auto justify-end">
                <a
                  href={pdfSrc}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono transition-colors flex items-center gap-1.5"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open PDF</span>
                </a>

                <a
                  href={pdfSrc}
                  download="Sri_Harsha_The_Beginner_Hackathon_Certificate.pdf"
                  className="px-4 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs font-mono transition-colors flex items-center gap-1.5 shadow-md shadow-emerald-950/40 active:scale-95"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
