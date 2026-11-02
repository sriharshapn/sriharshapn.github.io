import React from 'react';
import { Mail, ArrowUp } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { GithubIcon, LinkedinIcon } from './SocialIcons';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-900 bg-[#06080E] py-12 relative text-slate-400 text-xs font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-900">
          
          {/* Identity */}
          <div className="flex items-center space-x-3 text-center md:text-left">
            <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center font-bold text-xs">
              <span className="text-emerald-400">SH</span>
              <span className="text-violet-400">PN</span>
            </div>
            <div>
              <div className="text-sm font-bold text-white tracking-tight font-sans">
                {personalInfo.name}
              </div>
              <div className="text-[11px] text-slate-500">
                {personalInfo.title} • {personalInfo.collegeShort}
              </div>
            </div>
          </div>

          {/* Socials & Actions */}
          <div className="flex items-center space-x-3">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 hover:text-white transition-colors"
            >
              <GithubIcon className="w-4 h-4" />
            </a>

            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 hover:text-white transition-colors text-sky-400"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>

            <a
              href={`mailto:${personalInfo.email}`}
              aria-label="Email address"
              className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 hover:text-white transition-colors text-emerald-400"
            >
              <Mail className="w-4 h-4" />
            </a>

            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Scroll back to top"
              className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 hover:text-white transition-colors ml-2"
              title="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom Metadata */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} Sri Harsha Penugondla Nagaraja. Built with clean engineering principles.
          </div>

          <div className="flex items-center gap-2">
            <span>Engineered with React • TypeScript • Vite • Tailwind CSS</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
