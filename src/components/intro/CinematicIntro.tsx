import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { GraduationCapScene } from './GraduationCapScene';
import { CodeTyping } from './CodeTyping';

interface CinematicIntroProps {
  onComplete: () => void;
}

export const CinematicIntro: React.FC<CinematicIntroProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasContainerRef = useRef<HTMLDivElement | null>(null);
  const capIconRef = useRef<SVGSVGElement | null>(null);
  const sceneRef = useRef<GraduationCapScene | null>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  // Intro states
  const [typedText, setTypedText] = useState<string>('');
  const [cursorVisible, setCursorVisible] = useState<boolean>(true);
  const [showCapIcon, setShowCapIcon] = useState<boolean>(false);
  const [textOpacity, setTextOpacity] = useState<number>(1);
  const [revealRadius, setRevealRadius] = useState<number>(0);
  const [overlayOpacity, setOverlayOpacity] = useState<number>(1);

  const fullText = '> building my future...';

  useEffect(() => {
    // Lock scrolling during intro
    document.body.style.overflow = 'hidden';
    if ((window as unknown as { __lenis?: { stop: () => void } }).__lenis) {
      (window as unknown as { __lenis?: { stop: () => void } }).__lenis?.stop();
    }

    // Initialize Three.js scene (starts with sceneOpacity: 0)
    if (canvasContainerRef.current) {
      sceneRef.current = new GraduationCapScene(canvasContainerRef.current);
    }

    // Cursor blinking interval for Scene 1
    const blinkInterval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 400);

    const animState = {
      typedIndex: 0,
      textAlpha: 1,
      revealR: 0,
    };

    // Calculate maximum radius to fully clear screen corners
    const maxRadius = Math.ceil(
      Math.hypot(window.innerWidth, window.innerHeight) * 0.95
    );

    // Initial radius matching the circular underside opening of the cap
    const initialOpeningRadius = Math.round(
      Math.min(window.innerWidth, window.innerHeight) * 0.15
    );

    // Coordinated GSAP timeline for complete intro sequence
    const tl = gsap.timeline({
      onComplete: () => {
        handleFinish();
      },
    });
    timelineRef.current = tl;

    // ========================================================
    // SCENE 1 — SINGLE LINE OF CODE (0.0s – 1.8s)
    // Types character by character in dead center of black screen
    // ========================================================
    tl.to(animState, {
      typedIndex: fullText.length,
      duration: 1.6,
      ease: 'none',
      onUpdate: () => {
        const count = Math.floor(animState.typedIndex);
        setTypedText(fullText.slice(0, count));
      },
    });

    // Hold briefly with cursor at the end
    tl.to({}, { duration: 0.25 });

    // ========================================================
    // SCENE 2 — LINE-ART GRADUATION CAP APPEARS (1.85s – 2.65s)
    // Minimalist 2D vector line-art cap appears at the end of the typed line
    // ========================================================
    tl.call(() => {
      setShowCapIcon(true);
      setCursorVisible(false);
    });

    tl.to({}, { duration: 0.75 });

    // ========================================================
    // SCENE 3 — LINE-ART TRANSFORMS INTO REALISTIC 3D CAP (2.65s – 4.25s)
    // Line-art lifts away, Three.js 3D cap fades in & morphs wireframe to solid
    // ========================================================
    tl.to(animState, {
      textAlpha: 0,
      duration: 0.45,
      ease: 'power2.in',
      onUpdate: () => {
        setTextOpacity(animState.textAlpha);
      },
    }, 'scene3_start');

    if (sceneRef.current) {
      const capScene = sceneRef.current;

      // Fade in 3D scene and lift/scale cap
      tl.to(capScene.state, {
        sceneOpacity: 1.0,
        capScale: 0.9,
        capY: 0.15,
        rotX: -0.35,
        rotY: 0.85,
        rotZ: 0.12,
        duration: 0.8,
        ease: 'power2.out',
      }, 'scene3_start+=0.1');

      // Morph wireframe to solid during movement
      tl.to(capScene.state, {
        wireframeToSolid: 1.0,
        duration: 1.2,
        ease: 'power1.inOut',
      }, 'scene3_start+=0.2');

      // ========================================================
      // SCENE 4 — CAP THROW AND SETTLEMENT (4.25s – 5.65s)
      // Celebratory toss in close foreground; circular underside faces camera directly
      // ========================================================
      // Upward toss arc
      tl.to(capScene.state, {
        capY: 1.05,
        capZ: 0.35,
        rotY: Math.PI * 1.35,
        rotZ: 0.2,
        duration: 0.65,
        ease: 'power2.out',
      }, 'toss_peak');

      // Settle down in foreground with underside facing directly towards camera
      // rotX = -Math.PI / 2 points circular underside directly at camera!
      tl.to(capScene.state, {
        capY: 0.0,
        capZ: 0.25,
        rotX: -Math.PI / 2, // Circular underside directly facing camera
        rotY: Math.PI * 2.0,
        rotZ: 0.0,
        capScale: 1.08, // Underside occupies approximately 28-32% of viewport
        duration: 0.75,
        ease: 'power2.inOut',
      }, 'toss_settle');

      // Hold settlement position briefly so circular opening is clearly perceived
      tl.to({}, { duration: 0.3 });

      // ========================================================
      // SCENE 5 — CAMERA ENTERS THE CAP & CIRCULAR WEBSITE REVEAL (5.95s – 7.35s)
      // Camera zooms straight into circular underside; circular cutout expands
      // ========================================================
      // Camera zooms directly into the center of the underside
      tl.to(capScene.state, {
        camZ: 1.15,
        duration: 1.4,
        ease: 'power2.in',
      }, 'camera_enter');

      // Expand circular cutout mask from the center of the underside
      tl.fromTo(
        animState,
        { revealR: initialOpeningRadius },
        {
          revealR: maxRadius,
          duration: 1.4,
          ease: 'power2.inOut',
          onUpdate: () => {
            setRevealRadius(animState.revealR);
          },
        },
        'camera_enter'
      );

      // Fade out overlay cleanly as circle clears viewport
      tl.to(animState, {
        duration: 0.25,
        ease: 'power1.out',
        onStart: () => {
          setOverlayOpacity(0);
        },
      }, 'camera_enter+=1.2');
    }

    return () => {
      clearInterval(blinkInterval);
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
      if (sceneRef.current) {
        sceneRef.current.dispose();
      }
      document.body.style.overflow = '';
      if ((window as unknown as { __lenis?: { start: () => void } }).__lenis) {
        (window as unknown as { __lenis?: { start: () => void } }).__lenis?.start();
      }
    };
  }, []);

  const handleFinish = () => {
    try {
      sessionStorage.setItem('portfolio_intro_seen', 'true');
    } catch {
      // ignore
    }

    document.body.style.overflow = '';
    if ((window as unknown as { __lenis?: { start: () => void } }).__lenis) {
      (window as unknown as { __lenis?: { start: () => void } }).__lenis?.start();
    }

    if (sceneRef.current) {
      sceneRef.current.dispose();
      sceneRef.current = null;
    }

    onComplete();
  };

  const handleSkip = () => {
    if (timelineRef.current) {
      timelineRef.current.kill();
    }
    handleFinish();
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 pointer-events-auto bg-[#080B11] flex items-center justify-center overflow-hidden transition-opacity duration-300"
      style={{
        opacity: overlayOpacity,
        // Circular cutout mask: inside radius is transparent (revealing the website!), outside is opaque intro overlay
        WebkitMaskImage:
          revealRadius > 0
            ? `radial-gradient(circle at 50% 50%, transparent 0px, transparent ${revealRadius}px, black ${revealRadius + 2}px, black 100%)`
            : undefined,
        maskImage:
          revealRadius > 0
            ? `radial-gradient(circle at 50% 50%, transparent 0px, transparent ${revealRadius}px, black ${revealRadius + 2}px, black 100%)`
            : undefined,
      }}
      aria-label="Cinematic Graduation Cap Introduction"
    >
      {/* 3D Three.js Canvas Container */}
      <div
        ref={canvasContainerRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
      />

      {/* Luminous Expanding Rim Accent Ring */}
      {revealRadius > 30 && revealRadius < Math.min(window.innerWidth, window.innerHeight) * 0.9 && (
        <div
          className="absolute pointer-events-none rounded-full z-15"
          style={{
            left: '50%',
            top: '50%',
            width: `${revealRadius * 2}px`,
            height: `${revealRadius * 2}px`,
            transform: 'translate(-50%, -50%)',
            boxShadow: '0 0 24px rgba(16, 185, 129, 0.45), inset 0 0 12px rgba(255, 255, 255, 0.35)',
            border: '1.5px solid rgba(16, 185, 129, 0.65)',
          }}
          aria-hidden="true"
        />
      )}

      {/* Scene 1 & 2: Center Code Typing & Line-Art Cap */}
      <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
        <CodeTyping
          text={typedText}
          cursorVisible={cursorVisible}
          showCapIcon={showCapIcon}
          capIconRef={capIconRef}
          textOpacity={textOpacity}
        />
      </div>

      {/* Minimal Skip Intro Button */}
      <button
        onClick={handleSkip}
        type="button"
        className="absolute bottom-6 right-6 z-30 px-3.5 py-1.5 rounded-full border border-zinc-800 bg-zinc-950/80 hover:bg-zinc-900 text-[11px] font-mono tracking-wider text-zinc-400 hover:text-white uppercase transition-all duration-200 backdrop-blur-md cursor-pointer flex items-center space-x-1.5 shadow-lg group"
      >
        <span>Skip Intro</span>
        <span className="text-emerald-400 group-hover:translate-x-0.5 transition-transform duration-150">
          →
        </span>
      </button>
    </div>
  );
};
