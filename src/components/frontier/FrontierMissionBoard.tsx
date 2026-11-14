import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  Scroll, 
  ExternalLink, 
  Sparkles, 
  X, 
  User, 
  Users, 
  Cpu
} from 'lucide-react';
import { GithubIcon } from './BrandIcons';
import { 
  featuredProjects, 
  academicProjects, 
  type FeaturedProject, 
  type AcademicProject 
} from '../../data/frontierData';

interface FrontierMissionBoardProps {
  onBackToMap: () => void;
}

type ProjectUnion = (FeaturedProject | AcademicProject) & { isAcademic?: boolean };

export const FrontierMissionBoard: React.FC<FrontierMissionBoardProps> = ({ onBackToMap }) => {
  const [selectedProject, setSelectedProject] = useState<ProjectUnion | null>(null);
  const [filterMode, setFilterMode] = useState<'all' | 'featured' | 'academic'>('all');

  const allProjects: ProjectUnion[] = [
    ...featuredProjects.map(p => ({ ...p, isAcademic: false })),
    ...academicProjects.map(p => ({ ...p, isAcademic: true }))
  ];

  const filteredProjects = allProjects.filter(p => {
    if (filterMode === 'featured') return !p.isAcademic;
    if (filterMode === 'academic') return p.isAcademic;
    return true;
  });

  return (
    <div className="relative min-h-[92vh] w-full pt-20 pb-16 px-4 sm:px-6 flex flex-col items-center justify-center">
      {/* Top Header & Return to Map */}
      <div className="w-full max-w-6xl mx-auto mb-6 flex flex-col sm:flex-row items-center justify-between gap-3 z-20">
        <button
          onClick={onBackToMap}
          type="button"
          className="group inline-flex items-center space-x-2 px-4 py-2 rounded-xl border border-[#B18A57]/60 bg-[#251D17]/90 text-[#D7C19C] hover:text-[#FFF5EA] hover:border-[#D4AF7A] transition-all shadow-md cursor-pointer self-start"
        >
          <ArrowLeft className="w-4 h-4 text-[#B18A57] group-hover:-translate-x-1 transition-transform" />
          <span className="font-['ChineseRocks'] text-xs font-bold uppercase tracking-wider">
            Return to World Map
          </span>
        </button>

        <div className="flex items-center space-x-2 text-right">
          <Scroll className="w-4 h-4 text-[#B18A57]" />
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#B18A57]">
            Blackwater Waypoint · The Mission Board
          </span>
        </div>
      </div>

      {/* Weathered Wooden Notice Board Container */}
      <div className="w-full max-w-6xl rounded-3xl p-5 sm:p-8 bg-[#231A14] border-4 border-[#3D2C1E] shadow-[0_25px_70px_rgba(0,0,0,0.95)] z-20 space-y-6">
        {/* Board Title & Saloon Post Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-2 border-[#543E30] pb-5">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs text-[#B18A57]">✦</span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#B18A57]">
                Blackwater Sheriff Office & Bounty Archive · 1899
              </span>
            </div>
            <h2 className="font-['ChineseRocks','Cinzel'] text-2xl sm:text-4xl font-black text-[#FFF5EA] tracking-wide uppercase">
              The Mission Board
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center space-x-2 bg-[#2D2118] p-1 rounded-xl border border-[#543E30]">
            <button
              onClick={() => setFilterMode('all')}
              type="button"
              className={`px-3 py-1.5 rounded-lg text-xs font-['ChineseRocks'] uppercase tracking-wider transition-colors cursor-pointer ${
                filterMode === 'all'
                  ? 'bg-[#B18A57] text-[#171512] font-bold shadow'
                  : 'text-[#D7C19C] hover:text-white'
              }`}
            >
              All Missions ({allProjects.length})
            </button>
            <button
              onClick={() => setFilterMode('featured')}
              type="button"
              className={`px-3 py-1.5 rounded-lg text-xs font-['ChineseRocks'] uppercase tracking-wider transition-colors cursor-pointer ${
                filterMode === 'featured'
                  ? 'bg-[#B18A57] text-[#171512] font-bold shadow'
                  : 'text-[#D7C19C] hover:text-white'
              }`}
            >
              Featured Works ({featuredProjects.length})
            </button>
            <button
              onClick={() => setFilterMode('academic')}
              type="button"
              className={`px-3 py-1.5 rounded-lg text-xs font-['ChineseRocks'] uppercase tracking-wider transition-colors cursor-pointer ${
                filterMode === 'academic'
                  ? 'bg-[#B18A57] text-[#171512] font-bold shadow'
                  : 'text-[#D7C19C] hover:text-white'
              }`}
            >
              Academic ({academicProjects.length})
            </button>
          </div>
        </div>

        {/* ========================================================
            PINNED POSTERS GRID (WANTED POSTERS & MISSION DOSSIERS)
           ======================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, idx) => {
            const isLeadBounty = project.id === 'paarakhmetric';

            return (
              <motion.div
                key={project.id}
                whileHover={{ y: -6, scale: 1.015 }}
                className={`relative rounded-2xl p-5 text-[#251D17] shadow-2xl transition-all duration-300 flex flex-col justify-between cursor-pointer border-2 ${
                  isLeadBounty 
                    ? 'bg-[#D7C19C] border-[#783D32] ring-2 ring-[#B18A57]/60 md:col-span-2 lg:col-span-1' 
                    : 'bg-[#D7C19C] border-[#543E30]'
                }`}
                onClick={() => setSelectedProject(project)}
                style={{
                  backgroundImage: `
                    radial-gradient(circle at 50% 50%, rgba(255, 248, 235, 0.4) 0%, rgba(190, 160, 120, 0.7) 100%),
                    repeating-linear-gradient(0deg, rgba(73, 52, 38, 0.02) 0px, rgba(73, 52, 38, 0.02) 1px, transparent 1px, transparent 4px)
                  `,
                  boxShadow: '0 12px 35px rgba(0,0,0,0.65), inset 0 0 25px rgba(60,40,25,0.3)'
                }}
              >
                {/* Brass Pushpin at top center */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-gradient-to-br from-[#E2B77A] via-[#B18A57] to-[#543E30] border border-[#251D17] shadow-md flex items-center justify-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-black/50" />
                </div>

                <div className="space-y-3 pt-2">
                  {/* Top Notice Header */}
                  <div className="flex items-center justify-between border-b-2 border-[#543E30]/40 pb-2">
                    <span className="font-['ChineseRocks'] font-black text-[11px] uppercase tracking-widest text-[#783D32]">
                      {isLeadBounty ? '★ PRIME BOUNTY ★' : `CONTRACT № 0${idx + 1}`}
                    </span>
                    <span className="font-mono text-[9px] uppercase px-2 py-0.5 rounded bg-[#251D17] text-[#D7C19C]">
                      {project.category}
                    </span>
                  </div>

                  {/* Poster Title */}
                  <div>
                    <h3 className="font-['ChineseRocks'] text-xl sm:text-2xl font-black text-[#251D17] uppercase tracking-wide leading-tight">
                      {project.name}
                    </h3>
                    {'eventBadge' in project && project.eventBadge && (
                      <span className="inline-block mt-1 font-mono text-[9px] uppercase tracking-wider text-[#783D32] font-bold">
                        {project.eventBadge}
                      </span>
                    )}
                  </div>

                  {/* Short Narrative Briefing */}
                  <p className="font-['Playfair_Display'] text-xs sm:text-[13px] text-[#3B2C21] line-clamp-3 leading-relaxed">
                    {project.description}
                  </p>

                  {/* My Role Snippet */}
                  {'myRole' in project && (
                    <div className="p-2.5 rounded-lg bg-[#C8B08B]/60 border border-[#A88B67] text-[11px] font-mono">
                      <span className="text-[#783D32] font-bold block uppercase text-[9.5px]">
                        Operative Role:
                      </span>
                      <span className="text-[#251D17] line-clamp-1">{project.myRole}</span>
                    </div>
                  )}

                  {/* Technology Badges */}
                  <div className="flex flex-wrap gap-1 pt-1">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded bg-[#251D17]/85 text-[#D7C19C] text-[9.5px] font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="px-1.5 py-0.5 rounded bg-[#251D17]/50 text-[#543E30] text-[9px] font-mono">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>
                </div>

                {/* Inspect Action Footer */}
                <div className="pt-4 mt-4 border-t border-[#A88B67]/60 flex items-center justify-between text-xs">
                  <span className="font-mono text-[10px] text-[#78593A] uppercase tracking-wider">
                    Click to Open Dossier
                  </span>
                  <span className="font-['ChineseRocks'] text-xs font-bold text-[#783D32] group-hover:underline flex items-center space-x-1">
                    <span>View Brief</span>
                    <span>→</span>
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ========================================================
          DETAILED MISSION DOSSIER MODAL
         ======================================================== */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 25 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 25 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl p-6 sm:p-8 bg-[#D7C19C] text-[#251D17] border-4 border-[#543E30] shadow-2xl space-y-5 custom-scrollbar"
              style={{
                backgroundImage: `
                  radial-gradient(circle at 50% 50%, rgba(255, 248, 235, 0.4) 0%, rgba(190, 160, 120, 0.7) 100%),
                  repeating-linear-gradient(0deg, rgba(73, 52, 38, 0.02) 0px, rgba(73, 52, 38, 0.02) 1px, transparent 1px, transparent 4px)
                `,
                boxShadow: '0 25px 80px rgba(0,0,0,0.95), inset 0 0 50px rgba(73,52,38,0.35)'
              }}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                type="button"
                aria-label="Close Dossier"
                className="absolute top-5 right-5 p-2 rounded-full border border-[#543E30] bg-[#251D17] text-[#D7C19C] hover:text-white transition-all shadow cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Dossier Header */}
              <div className="border-b-2 border-[#543E30]/50 pb-4 pr-10">
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#783D32] font-bold block mb-1">
                  Classified Mission Dossier · {selectedProject.category}
                </span>
                <h3 className="font-['ChineseRocks','Cinzel'] text-2xl sm:text-3xl font-black text-[#251D17] uppercase tracking-wide">
                  {selectedProject.name}
                </h3>
                {'eventBadge' in selectedProject && selectedProject.eventBadge && (
                  <div className="inline-flex items-center space-x-1.5 mt-2 px-3 py-1 rounded bg-[#783D32] text-white text-[10.5px] font-mono uppercase tracking-wider font-semibold">
                    <Sparkles className="w-3.5 h-3.5 text-[#E2B77A]" />
                    <span>{selectedProject.eventBadge}</span>
                  </div>
                )}
              </div>

              {/* Narrative Mission Briefing */}
              <div className="space-y-1.5">
                <h4 className="font-['ChineseRocks'] text-xs font-bold text-[#783D32] uppercase tracking-widest">
                  Mission Briefing & Problem Solved
                </h4>
                <p className="font-['Playfair_Display'] text-sm sm:text-base leading-relaxed text-[#3B2C21] indent-3">
                  {selectedProject.description}
                </p>
              </div>

              {/* Sri Harsha's Authentic Role & Contribution */}
              {'myRole' in selectedProject && (
                <div className="p-4 rounded-xl bg-[#C8B08B]/60 border border-[#A88B67] space-y-1.5">
                  <div className="flex items-center space-x-2 text-[#783D32]">
                    <Cpu className="w-4 h-4" />
                    <h4 className="font-['ChineseRocks'] text-xs font-bold uppercase tracking-wider">
                      My Role & Contribution:
                    </h4>
                  </div>
                  <p className="font-mono text-xs text-[#251D17] leading-relaxed">
                    {selectedProject.myRole}
                  </p>
                  {'collaborative' in selectedProject && (
                    <div className="flex items-center space-x-1.5 pt-1 text-[10px] font-mono text-[#78593A]">
                      {selectedProject.collaborative ? (
                        <>
                          <Users className="w-3 h-3 text-[#783D32]" />
                          <span>Collaborative Team Build (Joint Development)</span>
                        </>
                      ) : (
                        <>
                          <User className="w-3 h-3 text-[#783D32]" />
                          <span>Independent Architectural Development</span>
                        </>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Key Technical Highlights */}
              <div className="space-y-2">
                <h4 className="font-['ChineseRocks'] text-xs font-bold text-[#783D32] uppercase tracking-widest">
                  Key Technical Capabilities
                </h4>
                <ul className="space-y-1.5 text-xs font-mono text-[#3B2C21]">
                  {'keyHighlights' in selectedProject && selectedProject.keyHighlights.map((hl, i) => (
                    <li key={i} className="flex items-start space-x-2">
                      <span className="text-[#783D32] font-bold">✦</span>
                      <span>{hl}</span>
                    </li>
                  ))}
                  {'highlights' in selectedProject && selectedProject.highlights.map((hl, i) => (
                    <li key={i} className="flex items-start space-x-2">
                      <span className="text-[#783D32] font-bold">✦</span>
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technologies Applied */}
              <div className="space-y-2 pt-1 border-t border-[#A88B67]/50">
                <h4 className="font-['ChineseRocks'] text-[11px] font-bold text-[#78593A] uppercase tracking-wider">
                  Technology Stack:
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedProject.technologies.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded bg-[#251D17] text-[#D7C19C] text-[10px] font-mono tracking-wide"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Collaborative Notice if any */}
              {'highlightNotice' in selectedProject && selectedProject.highlightNotice && (
                <div className="p-3 rounded-lg bg-[#E2D2B8] border border-[#A88B67] text-[11px] font-mono text-[#543E30]">
                  {selectedProject.highlightNotice}
                </div>
              )}

              {/* Working Action Links */}
              <div className="pt-4 border-t-2 border-[#543E30]/40 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center space-x-3">
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-[#251D17] text-[#FFF5EA] hover:bg-[#34271E] border border-[#543E30] font-mono text-xs uppercase tracking-wider transition-all shadow cursor-pointer"
                  >
                    <GithubIcon className="w-4 h-4 text-[#B18A57]" />
                    <span>View Repository</span>
                  </a>

                  {'liveUrl' in selectedProject && selectedProject.liveUrl && (
                    <a
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-[#783D32] text-white hover:bg-[#8D473A] border border-[#54221A] font-mono text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer"
                    >
                      <span>Live Demonstration</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>

                <button
                  onClick={() => setSelectedProject(null)}
                  type="button"
                  className="px-4 py-2 rounded-xl text-xs font-mono text-[#543E30] hover:text-[#251D17] cursor-pointer"
                >
                  Close Dossier
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
