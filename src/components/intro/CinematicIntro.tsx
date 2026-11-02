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

    // Cursor blinking interval for Scene 1 & 2
    const blinkInterval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 350);

    const animState = {
      typedIndex: 0,
      textAlpha: 1,
      revealR: 0,
    };

    // Calculate maximum radius to cleanly clear the farthest corner of any screen size
    const cornerDistance = Math.hypot(window.innerWidth / 2, window.innerHeight / 2);
    const maxRadius = Math.ceil(cornerDistance * 1.15);

    // Initial radius matching the circular underside opening of the cap
    const initialOpeningRadius = Math.round(
      Math.min(window.innerWidth, window.innerHeight) * 0.16
    );

    // Coordinated GSAP timeline for complete intro sequence
    const tl = gsap.timeline({
      onComplete: () => {
        handleFinish();
      },
    });
    timelineRef.current = tl;

    // ========================================================
    // SCENE 1 — CRISP CODE TYPING (0.0s – 1.35s)
    // Starts immediately (no empty black pause). Types full line in center.
    // ========================================================
    tl.to(animState, {
      typedIndex: fullText.length,
      duration: 1.25,
      delay: 0.1,
      ease: 'none',
      onUpdate: () => {
        const count = Math.min(Math.floor(animState.typedIndex), fullText.length);
        setTypedText(fullText.slice(0, count));
      },
    });

    // Hold briefly with cursor blinking so visitor can read the full text
    tl.to({}, { duration: 0.35 });

    // ========================================================
    // SCENE 2 — MINIMALIST 2D LINE-ART CAP APPEARS (1.7s – 2.35s)
    // Clean vector graduation cap appears at the end of the line
    // ========================================================
    tl.call(() => {
      setShowCapIcon(true);
    });

    // Hold line-art cap with typed text
    tl.to({}, { duration: 0.65 });

    // ========================================================
    // SCENE 3 — LINE-ART LIFTS & MORPHS INTO 3D CAP (2.35s – 3.75s)
    // Text smoothly fades out, 3D cap fades in & morphs from white line-art to solid black
    // ========================================================
    tl.to(animState, {
      textAlpha: 0,
      duration: 0.4,
      ease: 'power2.in',
      onUpdate: () => {
        setTextOpacity(animState.textAlpha);
      },
    }, 'scene3_start');

    if (sceneRef.current) {
      const capScene = sceneRef.current;

      // 3D scene fades in and scales smoothly into position
      tl.to(capScene.state, {
        sceneOpacity: 1.0,
        capScale: 0.88,
        capY: 0.15,
        rotX: -0.32,
        rotY: 0.75,
        rotZ: 0.1,
        duration: 0.85,
        ease: 'power2.out',
      }, 'scene3_start+=0.05');

      // Morph line-art wireframe into realistic solid black fabric
      tl.to(capScene.state, {
        wireframeToSolid: 1.0,
        duration: 1.05,
        ease: 'power1.inOut',
      }, 'scene3_start+=0.15');

      // ========================================================
      // SCENE 4 — CELEBRATORY TOSS & SETTLEMENT (3.75s – 5.15s)
      // Cap tosses in foreground and settles with circular underside directly facing camera
      // ========================================================
      // Upward celebratory toss arc
      tl.to(capScene.state, {
        capY: 0.85,
        capZ: 0.2,
        rotY: Math.PI * 1.25,
        rotZ: 0.15,
        duration: 0.65,
        ease: 'power2.out',
      }, 'toss_peak');

      // Settle down in close foreground with underside facing directly towards camera
      // rotX = -Math.PI / 2 aligns the circular cavity directly towards the camera!
      tl.to(capScene.state, {
        capX: 0.0,
        capY: 0.0,
        capZ: 0.0,
        rotX: -Math.PI / 2, // Circular underside facing camera directly
        rotY: 0.0,
        rotZ: 0.0,
        capScale: 0.95,     // Proportional, circular opening occupies ~28-32% of viewport
        duration: 0.75,
        ease: 'power2.inOut',
      }, 'toss_settle');

      // Hold steady settlement position briefly so the circular opening is clearly recognized
      tl.to({}, { duration: 0.45 });

      // ========================================================
      // SCENE 5 — CONTINUOUS FORWARD CAMERA PUSH & EXPANDING CIRCULAR WEBSITE REVEAL (5.6s – 7.2s)
      // Camera moves continuously towards the center of the underside;
      // circular mask expands beyond all 4 corners to reveal the website
      // ========================================================
      // Continuous camera push straight through the circular opening
      tl.to(capScene.state, {
        camZ: 0.2,
        duration: 1.5,
        ease: 'power2.in',
      }, 'camera_enter');

      // Circular cutout mask begins at center of underside opening and expands past screen corners
      tl.to(
        animState,
        {
          revealR: maxRadius,
          duration: 1.5,
          ease: 'power2.inOut',
          onStart: () => {
            animState.revealR = initialOpeningRadius;
            setRevealRadius(initialOpeningRadius);
          },
          onUpdate: () => {
            setRevealRadius(animState.revealR);
          },
        },
        'camera_enter'
      );

      // Fade out 3D cap only after camera has passed through its plane
      tl.to(capScene.state, {
        sceneOpacity: 0.0,
        duration: 0.45,
        ease: 'power1.out',
      }, 'camera_enter+=0.95');

      // Hold a moment with the mask fully beyond corners before unmounting
      tl.to({}, { duration: 0.1 });
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
      className="fixed inset-0 z-50 pointer-events-auto bg-[#080B11] flex items-center justify-center overflow-hidden"
      style={{
        // Continuous circular cutout mask: inside radius is transparent (revealing real website!), outside is opaque
        WebkitMaskImage:
          revealRadius > 0
            ? `radial-gradient(circle at 50% 50%, transparent 0px, transparent ${revealRadius}px, rgba(255, 255, 255, 0.06) ${revealRadius + 1}px, black ${revealRadius + 2}px, black 100%)`
            : undefined,
        maskImage:
          revealRadius > 0
            ? `radial-gradient(circle at 50% 50%, transparent 0px, transparent ${revealRadius}px, rgba(255, 255, 255, 0.06) ${revealRadius + 1}px, black ${revealRadius + 2}px, black 100%)`
            : undefined,
      }}
      aria-label="Cinematic Graduation Cap Introduction"
    >
      {/* 3D Three.js Canvas Container */}
      <div
        ref={canvasContainerRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
      />

      {/* Scene 1 & 2: Center Code Typing & Minimal Line-Art Cap */}
      <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none px-4">
        <CodeTyping
          text={typedText}
          cursorVisible={cursorVisible}
          showCapIcon={showCapIcon}
          capIconRef={capIconRef}
          textOpacity={textOpacity}
        />
      </div>

      {/* Minimalist Skip Intro Button */}
      <button
        onClick={handleSkip}
        type="button"
        className="absolute bottom-6 right-6 z-30 px-3.5 py-1.5 rounded-full border border-zinc-800 bg-zinc-950/80 hover:bg-zinc-900 text-[11px] font-mono tracking-wider text-zinc-400 hover:text-white uppercase transition-all duration-200 backdrop-blur-md cursor-pointer flex items-center space-x-1.5 shadow-lg group"
      >
        <span>Skip Intro</span>
        <span className="text-zinc-400 group-hover:text-white group-hover:translate-x-0.5 transition-transform duration-150">
          →
        </span>
      </button>
    </div>
  );
};
