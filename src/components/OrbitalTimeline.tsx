import React, { useEffect, useRef, useState, useCallback } from 'react';
import { type FeaturedProject } from '../data/portfolioData';

interface OrbitalTimelineProps {
  projects: FeaturedProject[];
  selectedIndex: number;
  onSelectProject: (index: number) => void;
}

interface NodePosition {
  index: number;
  id: string;
  name: string;
  category: string;
  numberStr: string;
  angleDeg: number;
  x: number;
  y: number;
  labelX: number;
  labelY: number;
  labelAlign: 'start' | 'middle' | 'end';
}

// Ellipse parameters for viewBox="0 0 1000 420"
const CX = 500;
const CY = 210;
const RX = 390; // Semi-major axis (horizontal)
const RY = 130; // Semi-minor axis (vertical)

export const OrbitalTimeline: React.FC<OrbitalTimelineProps> = ({
  projects,
  selectedIndex,
  onSelectProject,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [totalLength, setTotalLength] = useState<number>(1750);
  const [energyPos, setEnergyPos] = useState<number>(0);
  const animFrameRef = useRef<number | null>(null);

  // Exact angles for 6 nodes distributed symmetrically around the ellipse
  // 01: Top-Left (210°) -> 02: Top-Center (270°) -> 03: Top-Right (330°)
  // 04: Bottom-Right (30°) -> 05: Bottom-Center (90°) -> 06: Bottom-Left (150°)
  const nodeAngles = [210, 270, 330, 30, 90, 150];

  // Calculate node positions around ellipse
  const nodes: NodePosition[] = projects.map((p, i) => {
    const angleDeg = nodeAngles[i] ?? (i * 60);
    const angleRad = (angleDeg * Math.PI) / 180;
    const x = CX + RX * Math.cos(angleRad);
    const y = CY + RY * Math.sin(angleRad);

    // Smart label positioning based on quadrant
    let labelX = x;
    let labelY = y;
    let labelAlign: 'start' | 'middle' | 'end' = 'middle';

    if (angleDeg === 210) {
      // 01 Top-Left
      labelX = x - 28;
      labelY = y - 36;
      labelAlign = 'end';
    } else if (angleDeg === 270) {
      // 02 Top-Center
      labelX = x;
      labelY = y - 40;
      labelAlign = 'middle';
    } else if (angleDeg === 330) {
      // 03 Top-Right
      labelX = x + 28;
      labelY = y - 36;
      labelAlign = 'start';
    } else if (angleDeg === 30) {
      // 04 Bottom-Right
      labelX = x + 28;
      labelY = y + 44;
      labelAlign = 'start';
    } else if (angleDeg === 90) {
      // 05 Bottom-Center
      labelX = x;
      labelY = y + 48;
      labelAlign = 'middle';
    } else if (angleDeg === 150) {
      // 06 Bottom-Left
      labelX = x - 28;
      labelY = y + 44;
      labelAlign = 'end';
    }

    return {
      index: i,
      id: p.id,
      name: p.name,
      category: p.category,
      numberStr: `0${i + 1}`,
      angleDeg,
      x,
      y,
      labelX,
      labelY,
      labelAlign,
    };
  });

  // Calculate total path length on mount
  useEffect(() => {
    if (pathRef.current) {
      const len = pathRef.current.getTotalLength();
      if (len > 0) setTotalLength(len);
    }
  }, []);

  // Compute target position on path for each node
  // The path starts at Left Apex (x = CX - RX, y = CY, theta = 180°)
  // Parameter theta increases clockwise: 180° -> 210° (01) -> 270° (02) -> 330° (03) -> 360/0° -> 30° (04) -> 90° (05) -> 150° (06) -> 180°
  const getNodePathOffset = useCallback(
    (index: number): number => {
      if (!pathRef.current || totalLength === 0) return 0;
      const angle = nodeAngles[index] ?? 0;
      // Clockwise normalized fraction from 180°
      let diff = angle - 180;
      if (diff < 0) diff += 360;
      const fraction = diff / 360;
      return fraction * totalLength;
    },
    [totalLength]
  );

  // Target energy trail position based on selected index
  const targetOffsetRef = useRef<number>(0);
  const isSeekingRef = useRef<boolean>(false);

  useEffect(() => {
    targetOffsetRef.current = getNodePathOffset(selectedIndex);
    isSeekingRef.current = true;
  }, [selectedIndex, getNodePathOffset]);

  // Continuous flowing energy trail animation
  useEffect(() => {
    let currentPos = getNodePathOffset(selectedIndex);
    let lastTime = performance.now();

    const loop = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      const target = targetOffsetRef.current;

      // Smooth seek towards selected node, or continuous gentle travel
      if (isSeekingRef.current && totalLength > 0) {
        // Calculate shortest direction on circular perimeter
        let delta = target - (currentPos % totalLength);
        if (delta > totalLength / 2) delta -= totalLength;
        if (delta < -totalLength / 2) delta += totalLength;

        if (Math.abs(delta) > 5) {
          currentPos += delta * 0.14;
        } else {
          currentPos = target;
          isSeekingRef.current = false;
        }
      } else {
        // Idle continuous cruising speed around the oval
        currentPos = (currentPos + dt * 45) % totalLength;
      }

      setEnergyPos(currentPos);
      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [totalLength, getNodePathOffset, selectedIndex]);

  // Current coordinate of the traveling energy particle head
  const [headCoord, setHeadCoord] = useState<{ x: number; y: number }>({ x: CX - RX, y: CY });
  useEffect(() => {
    if (pathRef.current && totalLength > 0) {
      try {
        const pt = pathRef.current.getPointAtLength(energyPos % totalLength);
        setHeadCoord({ x: pt.x, y: pt.y });
      } catch {
        // fallback
      }
    }
  }, [energyPos, totalLength]);

  // Full closed ellipse SVG path starting at Left Apex and running clockwise
  const ellipsePathD = `M ${CX - RX} ${CY} A ${RX} ${RY} 0 1 1 ${CX + RX} ${CY} A ${RX} ${RY} 0 1 1 ${CX - RX} ${CY} Z`;

  return (
    <div className="relative w-full overflow-hidden select-none">
      {/* Decorative HUD Technical Header Bar */}
      <div className="flex items-center justify-between pb-4 text-[11px] font-mono text-zinc-500 uppercase tracking-widest px-2 sm:px-6">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-lime-400 animate-pulse" />
          <span className="text-zinc-400 font-semibold">ORBIT_SYS // 06 NODES ACTIVE</span>
        </div>
        <div className="hidden sm:flex items-center space-x-4">
          <span className="text-zinc-600">PLANE: ISOMETRIC_ELLIPTICAL</span>
          <span className="text-lime-400/90 font-bold">LOCKED: 0{selectedIndex + 1} {projects[selectedIndex]?.name.toUpperCase()}</span>
        </div>
      </div>

      {/* Main SVG Orbital Canvas */}
      <div className="relative w-full aspect-[2.38/1] max-w-5xl mx-auto flex items-center justify-center">
        <svg
          ref={svgRef}
          viewBox="0 0 1000 420"
          className="w-full h-full overflow-visible"
          aria-label="Orbital Project Timeline"
        >
          <defs>
            {/* Luminous Electric Lime & White Glow Filters */}
            <filter id="orbital-glow" x="-25%" y="-25%" width="150%" height="150%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <filter id="orbital-glow-intense" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="blur1" />
              <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur2" />
              <feMerge>
                <feMergeNode in="blur1" />
                <feMergeNode in="blur2" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Linear Gradient for flowing energy stroke */}
            <linearGradient id="energyTrailGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#a3e635" stopOpacity="0.9" />
              <stop offset="60%" stopColor="#bef264" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.0" />
            </linearGradient>

            {/* Radial Gradient for Active Selected Node Halo */}
            <radialGradient id="nodeActiveHalo" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#a3e635" stopOpacity="0.4" />
              <stop offset="60%" stopColor="#84cc16" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#080B11" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* ==========================================================
              SECONDARY TECHNICAL GUIDES & DOTTED PATHS
             ========================================================== */}
          {/* Subtle Outer Dotted Orbit */}
          <ellipse
            cx={CX}
            cy={CY}
            rx={RX + 26}
            ry={RY + 16}
            fill="none"
            stroke="rgba(255, 255, 255, 0.07)"
            strokeWidth="1"
            strokeDasharray="3 8"
          />

          {/* Subtle Inner Dotted Orbit */}
          <ellipse
            cx={CX}
            cy={CY}
            rx={RX - 24}
            ry={RY - 14}
            fill="none"
            stroke="rgba(255, 255, 255, 0.05)"
            strokeWidth="1"
            strokeDasharray="2 6"
          />

          {/* Central Coordinate Crosshairs & Telemetry */}
          <line
            x1={CX - 80}
            y1={CY}
            x2={CX + 80}
            y2={CY}
            stroke="rgba(255, 255, 255, 0.06)"
            strokeWidth="1"
            strokeDasharray="2 4"
          />
          <line
            x1={CX}
            y1={CY - 30}
            x2={CX}
            y2={CY + 30}
            stroke="rgba(255, 255, 255, 0.06)"
            strokeWidth="1"
            strokeDasharray="2 4"
          />
          <circle cx={CX} cy={CY} r="2.5" fill="rgba(163, 230, 53, 0.5)" />
          <text
            x={CX}
            y={CY + 16}
            textAnchor="middle"
            fill="rgba(255, 255, 255, 0.18)"
            fontSize="8"
            fontFamily="monospace"
            letterSpacing="0.1em"
          >
            SYS_CENTER // 500:210
          </text>

          {/* West & East Apex Cardinal Markers */}
          <g opacity="0.3">
            <line x1={CX - RX - 8} y1={CY} x2={CX - RX + 8} y2={CY} stroke="#ffffff" strokeWidth="1" />
            <text x={CX - RX - 14} y={CY + 3} textAnchor="end" fill="#71717a" fontSize="8" fontFamily="monospace">180° W</text>
            <line x1={CX + RX - 8} y1={CY} x2={CX + RX + 8} y2={CY} stroke="#ffffff" strokeWidth="1" />
            <text x={CX + RX + 14} y={CY + 3} textAnchor="start" fill="#71717a" fontSize="8" fontFamily="monospace">000° E</text>
          </g>

          {/* ==========================================================
              PRIMARY OVAL ORBIT PATH
             ========================================================== */}
          <path
            ref={pathRef}
            d={ellipsePathD}
            fill="none"
            stroke="rgba(255, 255, 255, 0.22)"
            strokeWidth="1.25"
          />

          {/* ==========================================================
              FLOWING LUMINOUS ENERGY TRAIL (Continuous Travelling Arc)
             ========================================================== */}
          {totalLength > 0 && (
            <path
              d={ellipsePathD}
              fill="none"
              stroke="#bef264"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray={`140 ${totalLength - 140}`}
              strokeDashoffset={-energyPos}
              filter="url(#orbital-glow)"
              opacity="0.85"
            />
          )}

          {/* Traveling Energy Head Spark */}
          <circle
            cx={headCoord.x}
            cy={headCoord.y}
            r="4.5"
            fill="#ffffff"
            filter="url(#orbital-glow-intense)"
          />
          <circle
            cx={headCoord.x}
            cy={headCoord.y}
            r="9"
            fill="none"
            stroke="#a3e635"
            strokeWidth="1.5"
            opacity="0.75"
          />

          {/* ==========================================================
              SIX ORBITAL PROJECT NODES (Interactive & Selectable)
             ========================================================== */}
          {nodes.map((node) => {
            const isSelected = selectedIndex === node.index;
            const isHovered = hoveredIndex === node.index;

            return (
              <g
                key={node.id}
                className="cursor-pointer transition-transform duration-300"
                onClick={() => onSelectProject(node.index)}
                onMouseEnter={() => setHoveredIndex(node.index)}
                onMouseLeave={() => setHoveredIndex(null)}
                tabIndex={0}
                role="button"
                aria-label={`Select Project ${node.numberStr}: ${node.name}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectProject(node.index);
                  }
                }}
              >
                {/* Active Selected Node Halo */}
                {isSelected && (
                  <>
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r="40"
                      fill="url(#nodeActiveHalo)"
                      className="animate-pulse"
                    />
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r="26"
                      fill="none"
                      stroke="#a3e635"
                      strokeWidth="1"
                      strokeDasharray="4 4"
                      opacity="0.6"
                    />
                  </>
                )}

                {/* Node Outer Ring */}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={isSelected ? 19 : isHovered ? 17 : 15}
                  fill="#080B11"
                  stroke={isSelected ? '#a3e635' : isHovered ? '#ffffff' : 'rgba(255, 255, 255, 0.28)'}
                  strokeWidth={isSelected ? 2.5 : isHovered ? 2 : 1.25}
                  filter={isSelected ? 'url(#orbital-glow)' : undefined}
                  className="transition-all duration-300"
                />

                {/* Inner Indicator Core */}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={isSelected ? 5 : isHovered ? 3.5 : 2}
                  fill={isSelected ? '#ffffff' : isHovered ? '#a3e635' : 'rgba(255, 255, 255, 0.45)'}
                  className="transition-all duration-300"
                />

                {/* Project Number Display inside/near node */}
                <text
                  x={node.x}
                  y={node.y + 4.5}
                  textAnchor="middle"
                  fill={isSelected ? '#bef264' : isHovered ? '#ffffff' : '#a1a1aa'}
                  fontSize={isSelected ? '10.5' : '9.5'}
                  fontWeight={isSelected ? 'bold' : 'normal'}
                  fontFamily="monospace"
                  letterSpacing="0.05em"
                  className="pointer-events-none transition-colors duration-200"
                >
                  {node.numberStr}
                </text>

                {/* ======================================================
                    FLOATING NODE LABEL (Project Name & Identity Preview)
                   ====================================================== */}
                <g
                  className="transition-all duration-300"
                  opacity={isSelected ? 1 : isHovered ? 0.95 : 0.65}
                >
                  {/* Subtle connector tick */}
                  <line
                    x1={node.x}
                    y1={node.angleDeg < 180 ? node.y + 19 : node.y - 19}
                    x2={node.labelX}
                    y2={node.angleDeg < 180 ? node.labelY - 14 : node.labelY + 8}
                    stroke={isSelected ? 'rgba(163, 230, 53, 0.4)' : 'rgba(255, 255, 255, 0.12)'}
                    strokeWidth="1"
                    strokeDasharray="2 3"
                  />

                  {/* Node Project Name Badge */}
                  <text
                    x={node.labelX}
                    y={node.labelY}
                    textAnchor={node.labelAlign}
                    fill={isSelected ? '#ffffff' : isHovered ? '#e4e4e7' : '#94a3b8'}
                    fontSize={isSelected ? '12' : '10.5'}
                    fontWeight={isSelected ? '700' : '500'}
                    fontFamily="Space Grotesk, sans-serif"
                    letterSpacing="-0.01em"
                    className="select-none"
                  >
                    {node.name}
                  </text>

                  {/* Supporting Category Tag */}
                  <text
                    x={node.labelX}
                    y={node.labelY + 13}
                    textAnchor={node.labelAlign}
                    fill={isSelected ? '#a3e635' : '#71717a'}
                    fontSize="8.5"
                    fontFamily="monospace"
                    letterSpacing="0.08em"
                    className="select-none uppercase"
                  >
                    {node.category}
                  </text>
                </g>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Mobile-Friendly Selectable Project Node Strip (< 768px) */}
      <div className="md:hidden mt-4 pt-3 border-t border-zinc-900/90 flex items-center justify-between gap-1 overflow-x-auto pb-1 px-1">
        {projects.map((p, idx) => {
          const isSelected = selectedIndex === idx;
          return (
            <button
              key={p.id}
              onClick={() => onSelectProject(idx)}
              type="button"
              className={`flex-1 min-w-[50px] py-2 px-1.5 rounded-lg border text-center transition-all duration-200 cursor-pointer ${
                isSelected
                  ? 'bg-lime-950/50 border-lime-400 text-lime-300 shadow-[0_0_12px_rgba(163,230,53,0.3)]'
                  : 'bg-zinc-950/80 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
              }`}
            >
              <div className="text-[10px] font-mono font-bold">0{idx + 1}</div>
              <div className="text-[9px] font-sans truncate mt-0.5">{p.name.split(' ')[0]}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
