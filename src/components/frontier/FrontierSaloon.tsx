import React, { useState } from 'react';
import { 
  ArrowLeft, 
  MessageSquare, 
  MapPin, 
  Send, 
  Copy, 
  Check, 
  ExternalLink
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './BrandIcons';
import { personalInfo } from '../../data/frontierData';

interface FrontierSaloonProps {
  onBackToMap: () => void;
}

export const FrontierSaloon: React.FC<FrontierSaloonProps> = ({ onBackToMap }) => {
  const [copied, setCopied] = useState(false);
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  const handleSendTelegraph = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoUrl = `mailto:${personalInfo.email}?subject=${encodeURIComponent(
      subject || 'Frontier Inquiry from ' + (name || 'Explorer')
    )}&body=${encodeURIComponent(
      `Name: ${name || 'N/A'}\n\nMessage:\n${message}`
    )}`;
    window.location.href = mailtoUrl;
  };

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
          <MessageSquare className="w-4 h-4 text-[#B18A57]" />
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#B18A57]">
            Van Horn Waypoint · The Saloon & Telegraph
          </span>
        </div>
      </div>

      {/* Main Saloon Interior Container */}
      <div className="w-full max-w-5xl rounded-3xl p-6 sm:p-10 bg-[#221812] border-4 border-[#3D291C] shadow-[0_25px_70px_rgba(0,0,0,0.95)] z-20 space-y-8 relative overflow-hidden">
        {/* Warm Lantern Ambient Light Effect */}
        <div 
          className="absolute -top-24 right-1/4 w-80 h-80 rounded-full pointer-events-none blur-[90px] opacity-35"
          style={{ background: 'radial-gradient(circle, #D4AF7A 0%, #B18A57 40%, transparent 70%)' }}
        />

        {/* Header Block */}
        <div className="border-b-2 border-[#543E30] pb-6 space-y-2 text-center sm:text-left relative z-10">
          <div className="flex items-center justify-center sm:justify-start space-x-2">
            <span className="text-xs text-[#B18A57]">✦</span>
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#B18A57]">
              Van Horn Trading Post & Saloon · 1899
            </span>
          </div>

          <h2 className="font-['Cinzel'] text-2xl sm:text-4xl lg:text-5xl font-black text-[#FFF5EA] tracking-wide uppercase">
            THE TRAIL DOESN&apos;T END HERE.
          </h2>

          <p className="font-['Playfair_Display'] italic text-base sm:text-xl text-[#D4AF7A]">
            &ldquo;Got an idea worth pursuing? Let&apos;s build something together.&rdquo;
          </p>
        </div>

        {/* Two-Column Grid: Verified Telegraph Links (Left) & Direct Message Dispatcher (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
          {/* Left Column: Official Telegraph Wires & Profiles */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-4 rounded-xl bg-[#1B130E] border border-[#543E30] space-y-3">
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#B18A57] block font-bold">
                Frontier Telegraph Station
              </span>
              <p className="font-['Playfair_Display'] text-xs text-[#D7C19C]/90 leading-relaxed">
                Connect directly for engineering opportunities, technical collaborations, AI/ML research inquiries, or project commissions.
              </p>
            </div>

            {/* Direct Email Action with Copy Button */}
            <div className="p-4 rounded-xl bg-[#2A1D15] border border-[#493426] space-y-2">
              <span className="font-mono text-[9.5px] uppercase tracking-wider text-[#A58252]">
                Electronic Mail Wire:
              </span>
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-xs sm:text-sm text-[#FFF5EA] font-semibold truncate">
                  {personalInfo.email}
                </span>
                <button
                  onClick={handleCopyEmail}
                  type="button"
                  aria-label="Copy email address"
                  className="px-3 py-1.5 rounded-lg border border-[#B18A57]/60 bg-[#171512] text-xs font-mono text-[#D7C19C] hover:text-white hover:border-[#D4AF7A] transition-colors flex items-center space-x-1.5 shrink-0 cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[#B18A57]" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Social & Code Profiles */}
            <div className="space-y-2">
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full p-3.5 rounded-xl bg-[#2A1D15] hover:bg-[#34241A] border border-[#493426] hover:border-[#B18A57] transition-all flex items-center justify-between text-[#E8DCC5] group"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-[#171512] text-[#B18A57]">
                    <GithubIcon className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <span className="font-['Cinzel'] text-xs font-bold block uppercase tracking-wider">
                      GitHub Repositories
                    </span>
                    <span className="font-mono text-[10px] text-[#A58252]">
                      github.com/sriharshapn
                    </span>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-[#B18A57] group-hover:translate-x-0.5 transition-transform" />
              </a>

              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full p-3.5 rounded-xl bg-[#2A1D15] hover:bg-[#34241A] border border-[#493426] hover:border-[#B18A57] transition-all flex items-center justify-between text-[#E8DCC5] group"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-[#171512] text-[#B18A57]">
                    <LinkedinIcon className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <span className="font-['Cinzel'] text-xs font-bold block uppercase tracking-wider">
                      LinkedIn Network
                    </span>
                    <span className="font-mono text-[10px] text-[#A58252]">
                      Professional Profile
                    </span>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-[#B18A57] group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>

            {/* Location Pill */}
            <div className="flex items-center space-x-2 text-xs font-mono text-[#A58252] pt-2">
              <MapPin className="w-4 h-4 text-[#783D32]" />
              <span>{personalInfo.location} · {personalInfo.collegeShort}</span>
            </div>
          </div>

          {/* Right Column: Interactive Saloon Dispatch Form */}
          <div className="lg:col-span-7 p-6 rounded-2xl bg-[#D7C19C] text-[#251D17] border-2 border-[#543E30] shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b-2 border-[#543E30]/40 pb-2.5">
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#783D32] font-bold">
                Frontier Telegraph Form
              </span>
              <span className="font-mono text-[9px] uppercase px-2 py-0.5 rounded bg-[#251D17] text-[#D7C19C]">
                Direct Dispatch
              </span>
            </div>

            <form onSubmit={handleSendTelegraph} className="space-y-4">
              <div>
                <label className="block font-['Cinzel'] text-xs font-bold text-[#251D17] uppercase tracking-wider mb-1">
                  Your Name / Identity:
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. John Marston or Arthur Morgan"
                  className="w-full p-2.5 rounded-lg bg-[#EAE0CD] border border-[#A88B67] text-xs font-mono text-[#251D17] focus:outline-none focus:border-[#783D32]"
                />
              </div>

              <div>
                <label className="block font-['Cinzel'] text-xs font-bold text-[#251D17] uppercase tracking-wider mb-1">
                  Dispatch Subject:
                </label>
                <input
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g. Engineering Opportunity / Contract"
                  className="w-full p-2.5 rounded-lg bg-[#EAE0CD] border border-[#A88B67] text-xs font-mono text-[#251D17] focus:outline-none focus:border-[#783D32]"
                />
              </div>

              <div>
                <label className="block font-['Cinzel'] text-xs font-bold text-[#251D17] uppercase tracking-wider mb-1">
                  Message / Inquiry:
                </label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Transmit your message or inquiry across the wire..."
                  className="w-full p-2.5 rounded-lg bg-[#EAE0CD] border border-[#A88B67] text-xs font-mono text-[#251D17] focus:outline-none focus:border-[#783D32]"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="font-mono text-[9.5px] text-[#78593A]">
                  Dispatches directly to sriharshapn@gmail.com
                </span>

                <button
                  type="submit"
                  className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-[#783D32] hover:bg-[#8D473A] text-white font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-md cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Transmit Telegraph</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
