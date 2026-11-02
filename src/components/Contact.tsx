import React, { useState } from 'react';
import { 
  Mail, 
  Copy, 
  Check, 
  Send, 
  MessageSquare, 
  MapPin, 
  ArrowUpRight, 
  ShieldCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { personalInfo } from '../data/portfolioData';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import { MagneticButton } from './MagneticButton';

export const Contact: React.FC = () => {
  const [copied, setCopied] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    message: ''
  });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subjectEncoded = encodeURIComponent(
      formData.subject || `Inquiry from Portfolio — ${formData.name || 'Visitor'}`
    );
    const bodyEncoded = encodeURIComponent(
      `Hi Sri Harsha,\n\n${formData.message}\n\nBest regards,\n${formData.name}`
    );
    window.location.href = `mailto:${personalInfo.email}?subject=${subjectEncoded}&body=${bodyEncoded}`;
  };

  return (
    <section id="contact" className="py-20 lg:py-28 relative border-t border-slate-900 bg-slate-950/60">
      {/* Background accents */}
      <div className="absolute top-1/2 left-1/3 w-[500px] h-[500px] bg-emerald-500/5 blur-[160px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-violet-600/5 blur-[140px] pointer-events-none rounded-full" />

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
            <Mail className="w-3.5 h-3.5" />
            <span>LET'S CONNECT</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Contact & Collaboration
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl font-mono">
            Open to engineering internships, AI/ML research collaborations, and hackathon projects.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Direct Contact Info & Socials */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 space-y-6"
          >
            
            {/* Status / Availability Banner */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900/80 to-slate-950 border border-slate-800 hover:border-slate-700 space-y-3 shadow-xl transition-all duration-300">
              <div className="flex items-center space-x-2 text-xs font-mono text-emerald-400 font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>CURRENT STATUS</span>
              </div>
              <h3 className="text-lg font-bold text-white tracking-tight">
                Seeking AI/ML Engineering & Backend Opportunities
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Currently pursuing B.E. in Artificial Intelligence & Machine Learning at BMSCE, Bengaluru. Interested in practical problem-solving in computer vision, OCR, scalable systems, and numerical modeling.
              </p>
              <div className="pt-2 flex items-center gap-2 text-xs font-mono text-slate-400">
                <MapPin className="w-3.5 h-3.5 text-slate-500" />
                <span>{personalInfo.location}</span>
              </div>
            </div>

            {/* Email Card with Copy Interaction */}
            <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80 hover:border-slate-700/80 space-y-4 transition-all duration-300">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-xs font-mono text-violet-400 font-semibold">
                  <Mail className="w-4 h-4" />
                  <span>DIRECT EMAIL</span>
                </div>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-800/80 hover:bg-slate-700 text-[11px] font-mono text-slate-300 hover:text-white transition-all active:scale-95"
                  aria-label="Copy email address"
                >
                  <AnimatePresence mode="wait">
                    {copied ? (
                      <motion.span
                        key="copied"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="inline-flex items-center gap-1 text-emerald-400"
                      >
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span>Copied!</span>
                      </motion.span>
                    ) : (
                      <motion.span
                        key="copy"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="inline-flex items-center gap-1"
                      >
                        <Copy className="w-3 h-3 text-slate-400" />
                        <span>Copy Email</span>
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              </div>

              <div>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="text-base sm:text-lg font-mono font-semibold text-white hover:text-emerald-400 transition-colors break-all"
                >
                  {personalInfo.email}
                </a>
                <p className="text-xs text-slate-400 mt-1">
                  Click to open default email client directly.
                </p>
              </div>
            </div>

            {/* Professional Profiles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl bg-slate-900/40 hover:bg-slate-900/80 border border-slate-800/80 hover:border-slate-700 transition-all flex items-center justify-between group"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 group-hover:text-white group-hover:border-slate-700 transition-colors">
                    <GithubIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-mono font-bold text-white block">GitHub</span>
                    <span className="text-[11px] font-mono text-slate-400">@sriharshapn</span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-600 group-hover:text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl bg-slate-900/40 hover:bg-slate-900/80 border border-slate-800/80 hover:border-slate-700 transition-all flex items-center justify-between group"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 group-hover:text-white group-hover:border-slate-700 transition-colors">
                    <LinkedinIcon className="w-4 h-4 text-sky-400" />
                  </div>
                  <div>
                    <span className="text-xs font-mono font-bold text-white block">LinkedIn</span>
                    <span className="text-[11px] font-mono text-slate-400">Connect Profile</span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-600 group-hover:text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>

          </motion.div>

          {/* Right Column: Genuine Email Dispatch Composer */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7"
          >
            <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-slate-900/60 to-slate-950 border border-slate-800 space-y-5 shadow-xl">
              <div className="space-y-1">
                <div className="flex items-center space-x-2 text-xs font-mono text-emerald-400 font-semibold">
                  <MessageSquare className="w-4 h-4" />
                  <span>COMPOSE DIRECT MESSAGE</span>
                </div>
                <h3 className="text-xl font-bold text-white tracking-tight">
                  Send a Direct Note
                </h3>
                <p className="text-xs text-slate-400 font-mono">
                  This form formats and opens your system email application with your message pre-loaded.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="name" className="text-xs font-mono text-slate-300 block">
                      Your Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      placeholder="e.g. Alex Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-200 placeholder:text-slate-600 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="subject" className="text-xs font-mono text-slate-300 block">
                      Subject
                    </label>
                    <input
                      id="subject"
                      type="text"
                      required
                      placeholder="e.g. Internship Inquiry / Project Discussion"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-200 placeholder:text-slate-600 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="message" className="text-xs font-mono text-slate-300 block">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    placeholder="Describe your project, team opportunity, or discussion topic..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-200 placeholder:text-slate-600 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-colors resize-none"
                  />
                </div>

                <MagneticButton pullFactor={0.15} className="w-full">
                  <button
                    type="submit"
                    className="w-full py-3 px-5 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-teal-400 text-slate-950 font-bold text-xs font-mono tracking-wide transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/40 active:scale-98 group/send"
                  >
                    <Send className="w-3.5 h-3.5 group-hover/send:translate-x-1 group-hover/send:-translate-y-0.5 transition-transform" />
                    <span>Launch Email Client to Send Message</span>
                  </button>
                </MagneticButton>
              </form>

              <div className="flex items-center gap-2 text-[11px] font-mono text-slate-500 border-t border-slate-800/80 pt-3">
                <ShieldCheck className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <span>Dispatches directly to {personalInfo.email} without 3rd party tracking or data storage.</span>
              </div>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
