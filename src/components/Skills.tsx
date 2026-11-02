import React, { useState, useRef } from 'react';
import { 
  Code, 
  Brain, 
  Layers, 
  Database, 
  Cpu, 
  Sparkles,
  Terminal
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { skillCategories } from '../data/portfolioData';

export const Skills: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 80%', 'end 30%'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.001,
  });

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'code':
        return <Code className="w-5 h-5 text-emerald-400" />;
      case 'brain':
        return <Brain className="w-5 h-5 text-violet-400" />;
      case 'layers':
        return <Layers className="w-5 h-5 text-teal-400" />;
      case 'database':
        return <Database className="w-5 h-5 text-indigo-400" />;
      case 'cpu':
        return <Cpu className="w-5 h-5 text-emerald-400" />;
      default:
        return <Terminal className="w-5 h-5 text-slate-400" />;
    }
  };

  const filteredCategories = selectedCategory === 'all'
    ? skillCategories
    : skillCategories.filter((c) => c.title === selectedCategory);

  return (
    <section 
      ref={sectionRef}
      id="skills" 
      className="py-20 lg:py-28 relative border-t border-slate-900 bg-[#080B11] overflow-hidden"
    >
      {/* Background accents */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-emerald-500/5 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-violet-600/5 blur-[120px] pointer-events-none rounded-full" />

      {/* Decorative Animated Circuit Line between skill nodes */}
      <div className="absolute inset-0 pointer-events-none z-0 hidden lg:block opacity-25">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <motion.path
            d="M 120,180 L 450,180 L 520,260 L 980,260 L 1040,340 L 1320,340"
            fill="none"
            stroke="url(#skillGradient)"
            strokeWidth="1.5"
            strokeDasharray="6 6"
            style={{ pathLength: smoothProgress }}
          />
          <motion.path
            d="M 180,480 L 500,480 L 580,560 L 920,560 L 1000,480 L 1300,480"
            fill="none"
            stroke="url(#skillGradient)"
            strokeWidth="1.5"
            strokeDasharray="4 8"
            style={{ pathLength: smoothProgress }}
          />
          <defs>
            <linearGradient id="skillGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10B981" />
              <stop offset="50%" stopColor="#2DD4BF" />
              <stop offset="100%" stopColor="#8B5CF6" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Viewport Animation */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 lg:mb-16 gap-6"
        >
          <div className="space-y-3">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono uppercase tracking-[0.12em] text-emerald-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>02 // TECHNICAL REPERTOIRE</span>
            </div>

            <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-bold text-white tracking-[-0.03em] leading-tight">
              Skills & Technologies
            </h2>

            <p className="text-slate-400 text-sm sm:text-base max-w-2xl font-mono">
              Technologies, frameworks, and libraries utilized and explored across projects, simulations, and hackathons.
            </p>
          </div>

          {/* Filter Pills with Layout Animation */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-slate-900/80 border border-slate-800 max-w-full overflow-x-auto">
            <button
              type="button"
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-200 ${
                selectedCategory === 'all'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-xs'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              All Categories
            </button>
            {skillCategories.map((cat) => (
              <button
                type="button"
                key={cat.title}
                onClick={() => setSelectedCategory(cat.title)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-200 whitespace-nowrap ${
                  selectedCategory === cat.title
                    ? 'bg-violet-500/20 text-violet-300 border border-violet-500/40 shadow-xs'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {cat.title}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Categories Grid with Sequential Viewport Entrance */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredCategories.map((category, idx) => (
              <motion.div
                key={category.title}
                layout
                initial={{ opacity: 0, y: 30, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                transition={{ duration: 0.55, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="p-6 rounded-2xl bg-slate-900/40 hover:bg-slate-900/70 border border-slate-800/90 hover:border-slate-700/80 transition-all duration-300 group flex flex-col justify-between shadow-lg hover:shadow-xl hover:shadow-black/40"
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 group-hover:border-emerald-500/30 group-hover:bg-slate-900 transition-colors">
                      {getCategoryIcon(category.icon)}
                    </div>
                    <span className="text-[11px] font-mono text-slate-500 bg-slate-950 px-2 py-0.5 rounded-full border border-slate-800">
                      {category.skills.length} Items
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white tracking-tight mb-1.5 group-hover:text-emerald-300 transition-colors">
                    {category.title}
                  </h3>
                  
                  <p className="text-xs text-slate-400 leading-relaxed mb-5">
                    {category.description}
                  </p>
                </div>

                {/* Skills Tags with Staggered Upward Movement & Micro-Hover */}
                <div className="flex flex-wrap gap-2 pt-3 border-t border-slate-800/60">
                  {category.skills.map((skill, skillIdx) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, y: 8 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.35, delay: 0.15 + skillIdx * 0.025, ease: 'easeOut' }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-950/80 hover:bg-slate-800 border border-slate-800/80 hover:border-emerald-500/40 text-xs font-mono text-slate-300 hover:text-emerald-300 transition-colors shadow-2xs cursor-default"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/70" />
                      <span>{skill}</span>
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Explanatory Note regarding authentic representation */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 p-4 rounded-xl bg-slate-900/20 border border-slate-800/60 flex items-center justify-between text-xs font-mono text-slate-400"
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Technologies listed reflect genuine hands-on application and exploratory development across projects.</span>
          </div>
          <span className="text-slate-500 hidden sm:inline">No fabricated percentages or subjective ratings</span>
        </motion.div>

      </div>
    </section>
  );
};
