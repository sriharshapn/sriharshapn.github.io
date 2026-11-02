import React, { useRef } from 'react';
import { ArrowDown, MapPin, GraduationCap, ArrowRight, Terminal } from 'lucide-react';
import { motion, useScroll, useTransform, type Variants } from 'framer-motion';
import { personalInfo } from '../data/portfolioData';
import { GithubIcon } from './SocialIcons';
import { MagneticButton } from './MagneticButton';

const customEase = [0.16, 1, 0.3, 1] as const;

const wordRevealVariants: Variants = {
  hidden: { y: '120%', opacity: 0, rotate: 1.2 },
  visible: (delay: number) => ({
    y: '0%',
    opacity: 1,
    rotate: 0,
    transition: {
      duration: 0.85,
      delay,
      ease: customEase,
    },
  }),
};

export const Hero: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  
  // Parallax motion connected directly to viewport scrolling
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const textParallaxY = useTransform(scrollYProgress, [0, 1], [0, 65]);
  const cardParallaxY = useTransform(scrollYProgress, [0, 1], [0, 105]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.2]);

  return (
    <section 
      ref={heroRef}
      id="home" 
      className="relative min-h-[85vh] lg:min-h-[92vh] pt-28 pb-20 lg:pt-36 lg:pb-24 flex items-center justify-center overflow-hidden"
    >
      {/* Soft atmospheric ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[650px] h-[400px] bg-gradient-to-tr from-emerald-500/8 via-violet-600/8 to-transparent blur-[140px] pointer-events-none rounded-full" />

      <motion.div 
        style={{ opacity: heroOpacity }}
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 text-center lg:text-left"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Main Hero Column with Scroll Parallax */}
          <motion.div 
            style={{ y: textParallaxY }}
            className="lg:col-span-8 space-y-7"
          >
            
            {/* Status & Identity Pills */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5"
            >
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-zinc-800 text-[11px] sm:text-xs text-zinc-300 font-mono uppercase tracking-[0.1em] backdrop-blur-md shadow-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-emerald-300 font-semibold">{personalInfo.title}</span>
              </div>

              <div className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-zinc-900/80 border border-zinc-800 text-[11px] sm:text-xs text-zinc-400 font-mono uppercase tracking-[0.08em]">
                <GraduationCap className="w-3.5 h-3.5 text-violet-400" />
                <span>{personalInfo.collegeShort}</span>
              </div>

              <div className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-zinc-900/80 border border-zinc-800 text-[11px] sm:text-xs text-zinc-400 font-mono uppercase tracking-[0.08em]">
                <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                <span>Bengaluru, India</span>
              </div>
            </motion.div>

            {/* Name & Headline: Cinematic Masked Staggered Word Reveal */}
            <div className="space-y-3.5">
              <h1 className="text-[clamp(1.85rem,5.5vw,5.25rem)] sm:text-[clamp(2.5rem,6.8vw,5.75rem)] font-bold tracking-[-0.035em] text-white leading-[1.05] sm:leading-[0.98]">
                {/* Line 1: Sri Harsha */}
                <div className="overflow-hidden pb-1">
                  <motion.span
                    custom={0.08}
                    initial="hidden"
                    animate="visible"
                    variants={wordRevealVariants}
                    className="inline-block text-zinc-100 mr-3"
                  >
                    Sri
                  </motion.span>
                  <motion.span
                    custom={0.16}
                    initial="hidden"
                    animate="visible"
                    variants={wordRevealVariants}
                    className="inline-block text-zinc-100"
                  >
                    Harsha
                  </motion.span>
                </div>

                {/* Line 2: Penugondla Nagaraja */}
                <div className="overflow-hidden pb-1">
                  <motion.span
                    custom={0.24}
                    initial="hidden"
                    animate="visible"
                    variants={wordRevealVariants}
                    className="inline-block text-zinc-100 mr-3"
                  >
                    <span className="block sm:inline">Penugondla</span>
                  </motion.span>
                  <motion.span
                    custom={0.32}
                    initial="hidden"
                    animate="visible"
                    variants={wordRevealVariants}
                    className="inline-block text-zinc-100"
                  >
                    <span className="block sm:inline">Nagaraja</span>
                  </motion.span>
                </div>
              </h1>
              
              {/* Masked Subtitle */}
              <div className="overflow-hidden pt-1">
                <motion.p
                  custom={0.42}
                  initial="hidden"
                  animate="visible"
                  variants={wordRevealVariants}
                  className="text-[clamp(1.1rem,2.5vw,2.1rem)] font-semibold tracking-[-0.02em] bg-gradient-to-r from-emerald-400 via-teal-300 to-violet-400 bg-clip-text text-transparent leading-snug"
                >
                  "{personalInfo.heroSubtitle}"
                </motion.p>
              </div>
            </div>

            {/* Narrative summary with smooth upward reveal */}
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="text-zinc-300 text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl font-normal mx-auto lg:mx-0"
            >
              Artificial Intelligence and Machine Learning engineering student at{' '}
              <span className="text-white font-medium">BMSCE Bengaluru</span>.
              Passionate about building intelligent applications and exploring the intersection of AI,
              computer vision, scalable backend engineering and real-world software solutions.
            </motion.p>

            {/* CTAs and Links with Magnetic Attraction */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.58, ease: [0.16, 1, 0.3, 1] }}
              className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4"
            >
              <MagneticButton pullFactor={0.22} className="w-full sm:w-auto">
                <a
                  href="#projects"
                  className="w-full sm:w-auto text-center px-7 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-400 hover:from-emerald-400 hover:to-teal-300 text-zinc-950 font-bold text-sm tracking-wide transition-all shadow-lg shadow-emerald-950/40 hover:shadow-emerald-500/30 active:scale-95 flex items-center justify-center gap-2 group"
                >
                  <span>View Projects</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-200" />
                </a>
              </MagneticButton>

              <MagneticButton pullFactor={0.22} className="w-full sm:w-auto">
                <a
                  href="#contact"
                  className="w-full sm:w-auto text-center px-6 py-3.5 rounded-xl bg-zinc-900/90 hover:bg-zinc-800/90 border border-zinc-800 hover:border-zinc-700 text-zinc-200 font-semibold text-sm tracking-wide transition-all active:scale-95 shadow-sm inline-block"
                >
                  Contact Me
                </a>
              </MagneticButton>

              <MagneticButton pullFactor={0.2} className="w-full sm:w-auto">
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                  className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-zinc-950/90 hover:bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white font-mono text-sm tracking-tight transition-all flex items-center justify-center gap-2.5 group"
                >
                  <GithubIcon className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                  <span>github.com/sriharshapn</span>
                </a>
              </MagneticButton>
            </motion.div>

          </motion.div>

          {/* Right Column: Clean Telemetry Overview with Independent Parallax */}
          <motion.div
            style={{ y: cardParallaxY }}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-4 space-y-4 text-left"
          >
            {/* Engineering Highlights Quick Panel */}
            <div className="p-6 rounded-2xl bg-zinc-950/70 border border-zinc-800/80 backdrop-blur-md space-y-5 shadow-xl">
              <div className="flex items-center justify-between text-xs font-mono text-zinc-400 pb-3 border-b border-zinc-800/80">
                <span className="flex items-center gap-1.5 text-lime-400">
                  <Terminal className="w-3.5 h-3.5" />
                  <span>PROFILE SNAPSHOT</span>
                </span>
                <span className="text-[11px] text-zinc-500">2026</span>
              </div>

              <div className="space-y-4 text-xs font-mono">
                <div className="flex items-start justify-between">
                  <span className="text-zinc-400">Specialization</span>
                  <span className="text-zinc-200 font-semibold text-right">AI & Machine Learning</span>
                </div>

                <div className="flex items-start justify-between">
                  <span className="text-zinc-400">Institution</span>
                  <span className="text-zinc-200 font-semibold text-right">BMSCE Bengaluru</span>
                </div>

                <div className="flex items-start justify-between">
                  <span className="text-zinc-400">Hackathon Focus</span>
                  <span className="text-emerald-400 font-semibold text-right">SIH 2026 Metrology</span>
                </div>

                <div className="flex items-start justify-between">
                  <span className="text-zinc-400">Core Systems</span>
                  <span className="text-zinc-200 font-semibold text-right">CV, FastAPI, PyTorch</span>
                </div>
              </div>

              {/* Status Indicator */}
              <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between text-[11px] font-mono">
                <span className="text-zinc-500 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  SYSTEM ACTIVE
                </span>
                <span className="text-zinc-400">BENGALURU // IN</span>
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl bg-zinc-950/50 border border-zinc-800/80 backdrop-blur-sm">
                <div className="text-2xl font-mono font-bold text-white flex items-center gap-1">
                  <span>6</span>
                  <span className="text-emerald-400 text-base">+</span>
                </div>
                <div className="text-[11px] text-zinc-400 font-mono mt-0.5">
                  Featured Projects
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-zinc-950/50 border border-zinc-800/80 backdrop-blur-sm">
                <div className="text-2xl font-mono font-bold text-white flex items-center gap-1">
                  <span>3</span>
                  <span className="text-violet-400 text-base">+</span>
                </div>
                <div className="text-[11px] text-zinc-400 font-mono mt-0.5">
                  Hackathon Events
                </div>
              </div>
            </div>

          </motion.div>

        </div>

        {/* Scroll down indicator with continuous subtle floating animation */}
        <motion.div 
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
          className="mt-14 lg:mt-20 flex justify-center"
        >
          <a
            href="#about"
            className="inline-flex items-center gap-2 text-xs font-mono text-zinc-500 hover:text-emerald-400 transition-colors p-2 rounded-full focus:outline-none focus:ring-1 focus:ring-emerald-500 group"
            aria-label="Scroll to About section"
          >
            <span className="group-hover:tracking-wider transition-all">DISCOVER MORE</span>
            <motion.div
              animate={{ y: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
            >
              <ArrowDown className="w-3.5 h-3.5 text-emerald-400/80" />
            </motion.div>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};
