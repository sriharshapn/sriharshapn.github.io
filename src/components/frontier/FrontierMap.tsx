import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, 
  Crosshair, 
  Scroll, 
  Newspaper, 
  Compass, 
  MessageSquare,
  List,
  Map as MapIcon,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { 
  type FrontierSectionId, 
  FRONTIER_LOCATIONS, 
  type FrontierLocation 
} from '../../data/frontierData';

interface FrontierMapProps {
  onSelectLocation: (id: FrontierSectionId) => void;
  activeLocation?: FrontierSectionId;
}

const LOCATION_ICONS: Record<FrontierSectionId, React.ReactNode> = {
  journal: <BookOpen className="w-4 h-4 text-[#FFF5EA]" />,
  arsenal: <Crosshair className="w-4 h-4 text-[#FFF5EA]" />,
  'mission-board': <Scroll className="w-4 h-4 text-[#FFF5EA]" />,
  chronicles: <Newspaper className="w-4 h-4 text-[#FFF5EA]" />,
  journey: <Compass className="w-4 h-4 text-[#FFF5EA]" />,
  saloon: <MessageSquare className="w-4 h-4 text-[#FFF5EA]" />,
  map: <MapIcon className="w-4 h-4 text-[#FFF5EA]" />
};

export const FrontierMap: React.FC<FrontierMapProps> = ({ 
  onSelectLocation,
  activeLocation 
}) => {
  const [hoveredLoc, setHoveredLoc] = useState<FrontierLocation | null>(null);
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');

  return (
    <div className="relative min-h-[92vh] w-full pt-16 pb-12 px-3 sm:px-6 flex flex-col items-center justify-center">
      {/* 1. Header Banner: Map Title & View Mode Toggle */}
      <div className="w-full max-w-7xl mx-auto mb-4 flex flex-col sm:flex-row items-center justify-between gap-3 z-20">
        <div>
          <div className="flex items-center space-x-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#B18A57]">
              The Official Cartography · Frontier Territory
            </span>
            <span className="text-[#B18A57]">•</span>
            <span className="font-mono text-[10px] text-[#A58252]">1899 Survey</span>
          </div>
          <h2 className="font-['ChineseRocks'] text-xl sm:text-3xl font-extrabold text-[#FFF5EA] tracking-wider uppercase">
            World Map & Waypoints
          </h2>
        </div>

        {/* View Toggle (Map Canvas vs Structured List for mobile/fast browsing) */}
        <div className="flex items-center space-x-2 bg-[#251D17] p-1 rounded-xl border border-[#B18A57]/40 shadow-md">
          <button
            onClick={() => setViewMode('map')}
            type="button"
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-serif transition-colors cursor-pointer ${
              viewMode === 'map'
                ? 'bg-[#B18A57] text-[#171512] font-bold shadow'
                : 'text-[#D7C19C] hover:text-[#FFF]'
            }`}
          >
            <MapIcon className="w-3.5 h-3.5" />
            <span>Interactive Map</span>
          </button>
          <button
            onClick={() => setViewMode('list')}
            type="button"
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-serif transition-colors cursor-pointer ${
              viewMode === 'list'
                ? 'bg-[#B18A57] text-[#171512] font-bold shadow'
                : 'text-[#D7C19C] hover:text-[#FFF]'
            }`}
          >
            <List className="w-3.5 h-3.5" />
            <span>Directory View</span>
          </button>
        </div>
      </div>

      {/* 2. Main Map Container (Aged Parchment Cartography Canvas) */}
      {viewMode === 'map' ? (
        <div className="relative w-full max-w-7xl aspect-[16/10] min-h-[580px] max-h-[820px] rounded-3xl overflow-hidden border-2 border-[#543E30] shadow-[0_20px_60px_rgba(0,0,0,0.9)] bg-[#D7C19C] text-[#251D17]">
          {/* Authentic Parchment Texture Overlay */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-90"
            style={{
              backgroundImage: `
                radial-gradient(circle at 50% 50%, rgba(255, 248, 235, 0.4) 0%, rgba(180, 150, 110, 0.7) 100%),
                repeating-linear-gradient(0deg, rgba(73, 52, 38, 0.02) 0px, rgba(73, 52, 38, 0.02) 1px, transparent 1px, transparent 4px)
              `
            }}
          />

          {/* Vignette & Paper Aging Stains */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              boxShadow: 'inset 0 0 100px rgba(50, 35, 20, 0.55), inset 0 0 40px rgba(20, 12, 8, 0.7)'
            }}
          />

          {/* Cartographic SVG Illustration Layer (Rivers, Mountains, Trails, Compass) */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none select-none opacity-80"
            viewBox="0 0 1200 750"
            preserveAspectRatio="none"
          >
            <defs>
              {/* Pattern for forest trees */}
              <pattern id="forestPattern" width="24" height="24" patternUnits="userSpaceOnUse">
                <path d="M12,4 L6,16 L18,16 Z M12,14 L12,20" stroke="#78593A" strokeWidth="1" fill="none" opacity="0.45" />
              </pattern>
            </defs>

            {/* Topography Contour Elevation Curves */}
            <path
              d="M 50,180 Q 250,80 500,160 T 900,120 T 1150,180"
              fill="none"
              stroke="#A88B67"
              strokeWidth="1.2"
              strokeDasharray="4 4"
            />
            <path
              d="M 80,240 Q 300,160 550,220 T 950,180 T 1120,260"
              fill="none"
              stroke="#A88B67"
              strokeWidth="0.8"
              strokeDasharray="3 3"
            />
            <path
              d="M 120,320 Q 350,240 600,300 T 1000,280"
              fill="none"
              stroke="#A88B67"
              strokeWidth="0.8"
            />

            {/* Mountains (Northern Grizzly Ridges) */}
            <g stroke="#543E30" strokeWidth="1.5" fill="none">
              <path d="M 150,120 L 190,70 L 230,120 M 190,70 L 190,120" />
              <path d="M 220,130 L 260,80 L 300,130 M 260,80 L 260,130" />
              <path d="M 290,115 L 340,60 L 390,115 M 340,60 L 340,115" />
              <path d="M 500,100 L 550,45 L 600,100 M 550,45 L 550,100" />
              <path d="M 580,110 L 630,55 L 680,110 M 630,55 L 630,110" />
              <path d="M 820,120 L 870,65 L 920,120 M 870,65 L 870,120" />
              <path d="M 900,130 L 950,80 L 1000,130 M 950,80 L 950,130" />
            </g>

            {/* Forest patches */}
            <rect x="120" y="220" width="130" height="90" fill="url(#forestPattern)" />
            <rect x="750" y="320" width="160" height="110" fill="url(#forestPattern)" />
            <rect x="420" y="440" width="180" height="100" fill="url(#forestPattern)" />

            {/* Winding Rivers (Dakota & Kamassa Rivers into Flat Iron Lake) */}
            <g stroke="#3A5C68" fill="none" strokeLinecap="round" opacity="0.75">
              {/* Dakota River flowing past Valentine */}
              <path
                d="M 280,0 Q 260,140 336,255 T 420,380 T 456,555"
                strokeWidth="4"
              />
              {/* Tributary into Flat Iron Lake */}
              <path
                d="M 336,255 Q 216,360 216,412 T 264,555"
                strokeWidth="2.5"
              />
              {/* Flat Iron Lake contour */}
              <path
                d="M 360,540 C 420,500 600,480 720,550 C 800,600 780,720 620,740 C 460,760 380,680 360,540 Z"
                fill="#4D707D"
                opacity="0.35"
                strokeWidth="2"
              />
              {/* Kamassa River past Saint Denis */}
              <path
                d="M 936,120 Q 984,270 960,390 T 960,510 T 960,650"
                strokeWidth="4.5"
              />
            </g>

            {/* Trails and Wagon Roads (Dotted lines connecting the 6 locations) */}
            <g stroke="#783D32" strokeWidth="2" strokeDasharray="6 6" fill="none" opacity="0.6">
              {/* Valentine to Horseshoe Overlook */}
              <path d="M 336,255 Q 468,260 600,285" />
              {/* Horseshoe Overlook to Van Horn */}
              <path d="M 600,285 Q 780,240 936,195" />
              {/* Valentine to Strawberry */}
              <path d="M 336,255 Q 240,330 216,412" />
              {/* Strawberry to Blackwater */}
              <path d="M 216,412 Q 312,480 456,555" />
              {/* Horseshoe Overlook to Saint Denis */}
              <path d="M 600,285 Q 768,400 960,510" />
              {/* Blackwater to Saint Denis (across river crossing) */}
              <path d="M 456,555 Q 720,600 960,510" />
            </g>

            {/* Territory Watermarks / Gothic Region Names */}
            <text x="310" y="160" fontFamily="Cinzel" fontSize="20" fill="#78593A" letterSpacing="6" opacity="0.65" fontWeight="bold">
              NEW HANOVER
            </text>
            <text x="800" y="440" fontFamily="Cinzel" fontSize="20" fill="#78593A" letterSpacing="6" opacity="0.65" fontWeight="bold">
              LEMOYNE
            </text>
            <text x="180" y="600" fontFamily="Cinzel" fontSize="20" fill="#78593A" letterSpacing="6" opacity="0.65" fontWeight="bold">
              WEST ELIZABETH
            </text>
            <text x="560" y="80" fontFamily="Cinzel" fontSize="18" fill="#78593A" letterSpacing="6" opacity="0.5" fontWeight="bold">
              AMBARINO
            </text>
            <text x="860" y="230" fontFamily="Cinzel" fontSize="16" fill="#78593A" letterSpacing="5" opacity="0.55" fontWeight="bold">
              ROANOKE RIDGE
            </text>
            <text x="490" y="620" fontFamily="Playfair Display" fontStyle="italic" fontSize="18" fill="#3A5C68" letterSpacing="3" opacity="0.7">
              Flat Iron Lake
            </text>

            {/* Decorative Explorer Compass Rose (Top Right) */}
            <g transform="translate(1060, 110)">
              <circle r="46" fill="none" stroke="#78593A" strokeWidth="1.5" strokeDasharray="3 3" />
              <circle r="38" fill="none" stroke="#543E30" strokeWidth="1" />
              {/* Cardinal Points */}
              <polygon points="0,-48 7,-10 0,0 -7,-10" fill="#783D32" />
              <polygon points="0,48 7,10 0,0 -7,10" fill="#543E30" />
              <polygon points="48,0 10,7 0,0 10,-7" fill="#543E30" />
              <polygon points="-48,0 -10,7 0,0 -10,-7" fill="#543E30" />
              {/* Letters */}
              <text x="-4" y="-52" fontFamily="Cinzel" fontSize="12" fill="#783D32" fontWeight="bold">N</text>
              <text x="-4" y="64" fontFamily="Cinzel" fontSize="12" fill="#543E30" fontWeight="bold">S</text>
              <text x="54" y="4" fontFamily="Cinzel" fontSize="12" fill="#543E30" fontWeight="bold">E</text>
              <text x="-66" y="4" fontFamily="Cinzel" fontSize="12" fill="#543E30" fontWeight="bold">W</text>
            </g>
          </svg>

          {/* 3. Interactive Location Waypoint Pins */}
          {FRONTIER_LOCATIONS.map((loc) => {
            const isHovered = hoveredLoc?.id === loc.id;
            const isActive = activeLocation === loc.id;

            return (
              <div
                key={loc.id}
                style={{
                  left: `${loc.coordinates.x}%`,
                  top: `${loc.coordinates.y}%`,
                  transform: 'translate(-50%, -50%)',
                }}
                className="absolute z-30"
              >
                {/* Clickable Waypoint Button */}
                <button
                  onClick={() => onSelectLocation(loc.id)}
                  onMouseEnter={() => setHoveredLoc(loc)}
                  onMouseLeave={() => setHoveredLoc(null)}
                  onFocus={() => setHoveredLoc(loc)}
                  onBlur={() => setHoveredLoc(null)}
                  type="button"
                  aria-label={`Travel to ${loc.name} (${loc.tagline})`}
                  className="group relative flex flex-col items-center cursor-pointer focus:outline-none"
                >
                  {/* Outer Pulsing Beacon */}
                  <span className="absolute -inset-2.5 rounded-full bg-[#B18A57]/30 animate-ping pointer-events-none" />

                  {/* Marker Circle */}
                  <div className={`relative flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border-2 transition-all duration-300 shadow-xl ${
                    isActive || isHovered
                      ? 'border-[#D4AF7A] bg-[#783D32] scale-110 shadow-[0_0_25px_rgba(212,175,122,0.8)]'
                      : 'border-[#543E30] bg-[#251D17] hover:border-[#B18A57] hover:scale-105'
                  }`}>
                    {LOCATION_ICONS[loc.id]}

                    {/* Small Star Emblem */}
                    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#B18A57] text-[8px] font-bold text-[#171512]">
                      ★
                    </span>
                  </div>

                  {/* Town Nameplate Underneath */}
                  <div className="mt-1.5 px-2.5 py-0.5 rounded-md bg-[#251D17]/90 border border-[#B18A57]/60 shadow-lg text-center backdrop-blur-sm transition-transform group-hover:scale-105">
                    <span className="block font-['ChineseRocks'] text-[11px] sm:text-xs font-bold text-[#FFF5EA] uppercase tracking-wider whitespace-nowrap">
                      {loc.name}
                    </span>
                    <span className="block font-mono text-[8.5px] uppercase tracking-widest text-[#D4AF7A]">
                      {loc.tagline}
                    </span>
                  </div>
                </button>
              </div>
            );
          })}

          {/* 4. Hover Dossier Preview (Bottom Center of Map) */}
          <div className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-md z-30 pointer-events-none">
            <AnimatePresence>
              {hoveredLoc && (
                <motion.div
                  initial={{ opacity: 0, y: 12, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="p-4 rounded-2xl bg-[#1D1612]/95 border-2 border-[#B18A57] shadow-2xl text-[#E8DCC5] backdrop-blur-md space-y-2 pointer-events-auto"
                >
                  <div className="flex items-center justify-between border-b border-[#B18A57]/30 pb-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-[#D4AF7A] text-xs font-serif">✦</span>
                      <span className="font-['ChineseRocks'] text-sm font-bold text-[#FFF5EA] uppercase tracking-wider">
                        {hoveredLoc.name} · {hoveredLoc.region}
                      </span>
                    </div>
                    <span className="font-mono text-[9px] uppercase px-2 py-0.5 rounded bg-[#783D32] text-[#FFF5EA]">
                      {hoveredLoc.badge}
                    </span>
                  </div>

                  <p className="font-['Playfair_Display'] text-xs sm:text-sm text-[#D7C19C] leading-relaxed">
                    {hoveredLoc.description}
                  </p>

                  <div className="pt-1 flex items-center justify-between">
                    <span className="font-mono text-[9px] text-[#A58252] uppercase tracking-widest">
                      Destination: {hoveredLoc.tagline}
                    </span>
                    <button
                      onClick={() => onSelectLocation(hoveredLoc.id)}
                      type="button"
                      className="inline-flex items-center space-x-1 font-['ChineseRocks'] text-[11px] font-bold text-[#D4AF7A] hover:text-white uppercase tracking-wider cursor-pointer"
                    >
                      <span>Explore</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* 5. Map Legend & Quick Guide (Top Left of Map) */}
          <div className="absolute top-4 left-4 z-20 hidden md:block max-w-[210px] p-3 rounded-xl bg-[#251D17]/85 border border-[#543E30] text-[#D7C19C] text-[10px] backdrop-blur-sm pointer-events-none shadow-md">
            <div className="flex items-center space-x-1.5 font-['ChineseRocks'] font-bold text-[#FFF5EA] uppercase tracking-wider border-b border-[#543E30] pb-1 mb-1.5">
              <Sparkles className="w-3 h-3 text-[#B18A57]" />
              <span>Map Legend</span>
            </div>
            <ul className="space-y-1 font-mono text-[9px] text-[#A58252]">
              <li>✦ Click any marker to open section</li>
              <li>✦ Red dashed line = Frontier Trails</li>
              <li>✦ 6 territories across the frontier</li>
            </ul>
          </div>
        </div>
      ) : (
        /* Alternative Directory List View for Mobile & Direct Access */
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-4 z-20">
          {FRONTIER_LOCATIONS.map((loc) => (
            <motion.div
              key={loc.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="p-5 rounded-2xl border-2 border-[#543E30] bg-[#251D17]/95 hover:border-[#B18A57] transition-all shadow-xl space-y-3 cursor-pointer group"
              onClick={() => onSelectLocation(loc.id)}
            >
              <div className="flex items-center justify-between border-b border-[#B18A57]/30 pb-2.5">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full border border-[#B18A57] bg-[#171512] flex items-center justify-center text-[#B18A57] group-hover:bg-[#783D32] group-hover:text-white transition-colors">
                    {LOCATION_ICONS[loc.id]}
                  </div>
                  <div>
                    <h3 className="font-['ChineseRocks'] text-base font-bold text-[#FFF5EA] uppercase tracking-wider group-hover:text-[#D4AF7A]">
                      {loc.name}
                    </h3>
                    <p className="font-mono text-[10px] uppercase text-[#B18A57] tracking-widest">
                      {loc.tagline} · {loc.region}
                    </p>
                  </div>
                </div>
                <span className="font-mono text-[9.5px] uppercase tracking-wider px-2 py-0.5 rounded bg-[#171512] border border-[#B18A57]/40 text-[#D7C19C]">
                  {loc.badge}
                </span>
              </div>

              <p className="font-['Playfair_Display'] text-xs text-[#D7C19C]/90 leading-relaxed">
                {loc.description}
              </p>

              <div className="flex items-center justify-between pt-1">
                <span className="font-mono text-[10px] text-[#A58252]">
                  Click to travel to waypoint
                </span>
                <span className="font-['ChineseRocks'] text-xs font-bold text-[#B18A57] group-hover:text-[#D4AF7A] flex items-center space-x-1">
                  <span>Enter {loc.tagline}</span>
                  <span>→</span>
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};
