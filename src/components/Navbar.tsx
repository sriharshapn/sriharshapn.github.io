import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Cpu } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { GithubIcon } from './SocialIcons';

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Academic Work', href: '#academic' },
  { label: 'Events & Certs', href: '#events' },
  { label: 'Contact', href: '#contact' },
];

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ['home', 'about', 'skills', 'projects', 'academic', 'events', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#080B11]/90 backdrop-blur-md border-b border-slate-800/80 shadow-lg shadow-black/30 py-3.5'
          : 'bg-transparent py-5 border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo / Monogram */}
          <a
            href="#home"
            className="flex items-center space-x-3 group focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded-lg p-1"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 via-slate-900 to-violet-500/20 border border-slate-700/80 flex items-center justify-center text-slate-100 font-mono font-bold text-sm tracking-wider group-hover:border-emerald-500/50 transition-colors shadow-sm">
              <span className="text-emerald-400 group-hover:text-emerald-300">SH</span>
              <span className="text-violet-400 group-hover:text-violet-300">PN</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-slate-100 tracking-tight flex items-center gap-1.5">
                {personalInfo.shortName}
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              </span>
              <span className="text-[11px] font-mono text-slate-400 tracking-wider uppercase">
                AI / ML • BMSCE
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2 bg-slate-900/60 p-1.5 rounded-full border border-slate-800/80 backdrop-blur-md">
            {navItems.map((item) => {
              const sectionId = item.href.replace('#', '');
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all duration-200 ${
                    isActive
                      ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 shadow-xs'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Action Button & GitHub Link */}
          <div className="hidden md:flex items-center space-x-3">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="p-2 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 hover:bg-slate-800 transition-all flex items-center gap-2 text-xs font-mono"
            >
              <GithubIcon className="w-4 h-4 text-slate-300" />
              <span className="hidden lg:inline">sriharshapn</span>
              <ArrowUpRight className="w-3 h-3 text-slate-500" />
            </a>

            <a
              href="#contact"
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-teal-400 text-slate-950 font-semibold text-xs tracking-wide transition-all shadow-md shadow-emerald-950/40 hover:shadow-emerald-500/20 active:scale-95"
            >
              Get in Touch
            </a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex md:hidden items-center space-x-2">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="p-2 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-white"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-200 hover:text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              aria-label="Toggle navigation menu"
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="w-5 h-5 text-emerald-400" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="md:hidden border-b border-slate-800 bg-[#080B11]/98 backdrop-blur-xl px-4 pt-4 pb-6 space-y-2 animate-in fade-in slide-in-from-top-4 duration-200 shadow-2xl">
          <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-800/80 px-2 text-xs font-mono text-slate-400">
            <span className="flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-emerald-400" /> Navigation
            </span>
            <span className="text-[11px] text-slate-500">Sri Harsha P N</span>
          </div>

          <div className="flex flex-col space-y-1">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-200 hover:text-emerald-300 hover:bg-slate-900/90 border border-transparent hover:border-slate-800 transition-all flex items-center justify-between"
              >
                <span>{item.label}</span>
                <span className="text-xs font-mono text-slate-600">→</span>
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-800/80 flex flex-col gap-2">
            <a
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="w-full text-center py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 text-slate-950 font-semibold text-xs tracking-wide shadow-md"
            >
              Get in Touch
            </a>
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="w-full text-center py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 font-mono text-xs flex items-center justify-center gap-2"
            >
              <GithubIcon className="w-4 h-4" /> View GitHub Profile
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
