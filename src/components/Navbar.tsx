import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Cpu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { personalInfo } from '../data/portfolioData';
import { GithubIcon } from './SocialIcons';
import { MagneticButton } from './MagneticButton';

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
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#080B11]/92 backdrop-blur-xl border-b border-slate-800/80 shadow-lg shadow-black/40 py-3'
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
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 via-slate-900 to-violet-500/20 border border-slate-700/80 flex items-center justify-center text-slate-100 font-mono font-bold text-sm tracking-wider group-hover:border-emerald-500/60 transition-all duration-300 group-hover:shadow-md group-hover:shadow-emerald-500/10">
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

          {/* Desktop Navigation Links with Animated Layout Pill */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-1.5 bg-slate-900/60 p-1.5 rounded-full border border-slate-800/80 backdrop-blur-md">
            {navItems.map((item) => {
              const sectionId = item.href.replace('#', '');
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  className={`relative px-3.5 py-1.5 rounded-full font-mono text-[11px] lg:text-xs uppercase tracking-[0.08em] font-medium transition-colors duration-200 ${
                    isActive ? 'text-emerald-300' : 'text-zinc-300 hover:text-white'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                      className="absolute inset-0 bg-emerald-500/15 border border-emerald-500/35 rounded-full shadow-xs"
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </a>
              );
            })}
          </nav>

          {/* Action Button & GitHub Link with Magnetic Hover */}
          <div className="hidden md:flex items-center space-x-3">
            <MagneticButton pullFactor={0.25}>
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="p-2 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 hover:bg-slate-800/90 transition-all flex items-center gap-2 text-xs font-mono group"
              >
                <GithubIcon className="w-4 h-4 text-slate-300 group-hover:scale-110 transition-transform" />
                <span className="hidden lg:inline">sriharshapn</span>
                <ArrowUpRight className="w-3 h-3 text-slate-500 group-hover:text-emerald-400 transition-colors" />
              </a>
            </MagneticButton>

            <MagneticButton pullFactor={0.25}>
              <a
                href="#contact"
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-teal-400 text-slate-950 font-semibold text-xs tracking-wide transition-all shadow-md shadow-emerald-950/40 hover:shadow-emerald-500/25 active:scale-95 inline-block"
              >
                Get in Touch
              </a>
            </MagneticButton>
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
              className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-200 hover:text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors"
              aria-label="Toggle navigation menu"
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="w-5 h-5 text-emerald-400" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu with Framer Motion AnimatePresence */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden border-b border-slate-800 bg-[#080B11]/98 backdrop-blur-2xl px-4 pt-3 pb-6 space-y-2 overflow-hidden shadow-2xl"
          >
            <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-800/80 px-2 text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-emerald-400" /> Navigation
              </span>
              <span className="text-[11px] text-slate-500">Sri Harsha P N</span>
            </div>

            <div className="flex flex-col space-y-1">
              {navItems.map((item, idx) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.04 }}
                  className="px-3.5 py-2.5 rounded-xl font-mono text-xs uppercase tracking-[0.08em] font-medium text-zinc-200 hover:text-emerald-300 hover:bg-zinc-900/90 border border-transparent hover:border-zinc-800 transition-all flex items-center justify-between"
                >
                  <span>{item.label}</span>
                  <span className="text-xs font-mono text-zinc-600">→</span>
                </motion.a>
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
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
