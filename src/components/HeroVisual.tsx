import React, { useEffect, useRef } from 'react';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  color: string;
  pulsePhase: number;
  connections: number[];
}

interface Packet {
  sourceIdx: number;
  targetIdx: number;
  progress: number;
  speed: number;
  color: string;
}

export const HeroVisual: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 600);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 500);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.parentElement.clientWidth;
      height = canvas.parentElement.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Color palette: deep charcoal, subtle emerald & violet accents
    const colors = ['#10B981', '#8B5CF6', '#06B6D4', '#6366F1'];

    // Generate balanced node count based on screen size
    const nodeCount = Math.floor(Math.min(Math.max(width / 24, 26), 48));
    const nodes: Node[] = [];

    for (let i = 0; i < nodeCount; i++) {
      const baseRadius = Math.random() * 2 + 2;
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: baseRadius,
        baseRadius,
        color: colors[Math.floor(Math.random() * colors.length)],
        pulsePhase: Math.random() * Math.PI * 2,
        connections: []
      });
    }

    const packets: Packet[] = [];
    const maxPackets = 14;

    let mouseX = -1000;
    let mouseY = -1000;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    const connectionDistance = Math.min(width * 0.28, 140);

    const render = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      // Subtle background ambient gradient
      const radial = ctx.createRadialGradient(
        width * 0.5,
        height * 0.5,
        20,
        width * 0.5,
        height * 0.5,
        Math.max(width, height) * 0.7
      );
      radial.addColorStop(0, 'rgba(16, 185, 129, 0.04)');
      radial.addColorStop(0.5, 'rgba(139, 92, 246, 0.03)');
      radial.addColorStop(1, 'transparent');
      ctx.fillStyle = radial;
      ctx.fillRect(0, 0, width, height);

      // Update and draw connections
      for (let i = 0; i < nodes.length; i++) {
        nodes[i].connections = [];
        const n1 = nodes[i];

        // Move nodes
        n1.x += n1.vx;
        n1.y += n1.vy;

        // Bounce from walls with soft margin
        if (n1.x < 15) { n1.x = 15; n1.vx *= -1; }
        if (n1.x > width - 15) { n1.x = width - 15; n1.vx *= -1; }
        if (n1.y < 15) { n1.y = 15; n1.vy *= -1; }
        if (n1.y > height - 15) { n1.y = height - 15; n1.vy *= -1; }

        // Interaction with mouse
        const dxMouse = mouseX - n1.x;
        const dyMouse = mouseY - n1.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        if (distMouse < 120 && distMouse > 0) {
          const force = (120 - distMouse) / 120;
          n1.x -= (dxMouse / distMouse) * force * 1.5;
          n1.y -= (dyMouse / distMouse) * force * 1.5;
          n1.radius = n1.baseRadius + force * 2.5;
        } else {
          n1.radius = n1.baseRadius + Math.sin(time * 0.003 + n1.pulsePhase) * 0.6;
        }

        // Connect with nearby nodes
        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j];
          const dx = n2.x - n1.x;
          const dy = n2.y - n1.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            n1.connections.push(j);
            const alpha = (1 - dist / connectionDistance) * 0.28;
            
            const grad = ctx.createLinearGradient(n1.x, n1.y, n2.x, n2.y);
            grad.addColorStop(0, n1.color.replace(')', `, ${alpha})`).replace('rgb', 'rgba').replace('#10B981', `rgba(16, 185, 129, ${alpha})`).replace('#8B5CF6', `rgba(139, 92, 246, ${alpha})`));
            grad.addColorStop(1, n2.color.replace(')', `, ${alpha})`).replace('rgb', 'rgba').replace('#10B981', `rgba(16, 185, 129, ${alpha})`).replace('#8B5CF6', `rgba(139, 92, 246, ${alpha})`));

            ctx.beginPath();
            ctx.strokeStyle = grad;
            ctx.lineWidth = 1;
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.stroke();

            // Randomly spawn data packet between connected nodes
            if (packets.length < maxPackets && Math.random() < 0.006) {
              packets.push({
                sourceIdx: i,
                targetIdx: j,
                progress: 0,
                speed: 0.012 + Math.random() * 0.015,
                color: Math.random() > 0.5 ? '#10B981' : '#A78BFA'
              });
            }
          }
        }
      }

      // Update and draw data packets traveling along edges
      for (let p = packets.length - 1; p >= 0; p--) {
        const packet = packets[p];
        packet.progress += packet.speed;
        if (packet.progress >= 1) {
          packets.splice(p, 1);
          continue;
        }

        const source = nodes[packet.sourceIdx];
        const target = nodes[packet.targetIdx];
        if (!source || !target) {
          packets.splice(p, 1);
          continue;
        }

        const px = source.x + (target.x - source.x) * packet.progress;
        const py = source.y + (target.y - source.y) * packet.progress;

        ctx.beginPath();
        ctx.arc(px, py, 2.2, 0, Math.PI * 2);
        ctx.fillStyle = packet.color;
        ctx.shadowColor = packet.color;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Draw nodes
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        ctx.beginPath();
        ctx.arc(n.x, n.y, Math.max(1, n.radius), 0, Math.PI * 2);
        ctx.fillStyle = n.color;
        ctx.shadowColor = n.color;
        ctx.shadowBlur = n.radius > 3 ? 10 : 4;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Inner glowing core
        ctx.beginPath();
        ctx.arc(n.x, n.y, Math.max(0.6, n.radius * 0.4), 0, Math.PI * 2);
        ctx.fillStyle = '#FFFFFF';
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className="relative w-full h-full min-h-[380px] md:min-h-[460px] flex items-center justify-center rounded-2xl overflow-hidden border border-slate-800/80 bg-slate-950/40 backdrop-blur-sm group">
      {/* Background radial accent glow */}
      <div className="absolute inset-0 bg-radial from-emerald-500/10 via-violet-600/5 to-transparent pointer-events-none" />
      
      {/* Interactive Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full absolute inset-0 cursor-crosshair z-0"
        title="Interactive neural graph representation"
      />

      {/* Floating telemetry indicators */}
      <div className="absolute top-4 left-4 z-10 flex items-center space-x-2 text-[11px] font-mono text-slate-400 bg-slate-900/80 px-3 py-1.5 rounded-full border border-slate-800/90 shadow-sm backdrop-blur-md">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-slate-300">NEURAL GRAPH ENGINE</span>
        <span className="text-slate-600">•</span>
        <span className="text-emerald-400">ACTIVE</span>
      </div>

      <div className="absolute bottom-4 right-4 z-10 flex items-center space-x-2 text-[11px] font-mono text-slate-400 bg-slate-900/80 px-3 py-1.5 rounded-full border border-slate-800/90 shadow-sm backdrop-blur-md">
        <span className="text-slate-400">TOUCH / HOVER INTERACTION</span>
      </div>

      {/* Subtle Central Core Badge */}
      <div className="z-10 pointer-events-none text-center px-4 py-3 rounded-xl bg-slate-900/60 border border-slate-800/60 backdrop-blur-md max-w-[280px]">
        <div className="text-xs uppercase tracking-widest text-violet-400 font-mono font-semibold mb-1">
          Systems & AI Architecture
        </div>
        <div className="text-[13px] text-slate-300 font-medium">
          Perception • Backends • Simulations
        </div>
      </div>
    </div>
  );
};
