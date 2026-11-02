import React, { useState, useEffect, useRef } from 'react';
import { Terminal as TerminalIcon, RotateCcw, FastForward, CornerDownLeft } from 'lucide-react';
import { terminalIntroSequence, availableInteractiveCommands } from '../data/terminalData';

interface InteractiveHistoryItem {
  command: string;
  output: string[];
  isInteractive?: boolean;
}

interface InteractiveTerminalProps {
  className?: string;
  onNavigateSection?: (sectionId: string) => void;
}

export const InteractiveTerminal: React.FC<InteractiveTerminalProps> = ({
  className = '',
  onNavigateSection,
}) => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Completed steps history
  const [history, setHistory] = useState<InteractiveHistoryItem[]>([]);
  // Current step index being typed
  const [activeStepIdx, setActiveStepIdx] = useState<number>(0);
  // Current typed command characters
  const [currentTypedCommand, setCurrentTypedCommand] = useState<string>('');
  // Revealed output lines for the current step
  const [revealedOutputLines, setRevealedOutputLines] = useState<string[]>([]);
  // Animation state: 'idle' | 'typing_cmd' | 'pause_before_output' | 'revealing_output' | 'pause_next' | 'completed'
  const [phase, setPhase] = useState<'idle' | 'typing_cmd' | 'pause_before_output' | 'revealing_output' | 'pause_next' | 'completed'>('idle');
  
  // Interactive command line state
  const [inputValue, setInputValue] = useState<string>('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyPointer, setHistoryPointer] = useState<number>(-1);

  // Has animation started (for viewport detection)
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const [isReducedMotion, setIsReducedMotion] = useState<boolean>(false);

  // Check reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);
    if (mediaQuery.matches) {
      skipToCompleted();
    }
  }, []);

  // Intersection Observer to trigger on first viewport entry
  useEffect(() => {
    if (hasStarted || isReducedMotion) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
          startSequence();
        }
      },
      { threshold: 0.25 }
    );

    if (terminalRef.current) {
      observer.observe(terminalRef.current);
    }

    return () => observer.disconnect();
  }, [hasStarted, isReducedMotion]);

  // Auto-scroll container to bottom smoothly
  const scrollToBottom = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentTypedCommand, revealedOutputLines, history, phase]);

  // Start sequence from step 0
  const startSequence = () => {
    setHistory([]);
    setActiveStepIdx(0);
    setCurrentTypedCommand('');
    setRevealedOutputLines([]);
    setPhase('typing_cmd');
  };

  // Replay animation
  const handleReplay = () => {
    startSequence();
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  // Skip animation to fully completed state immediately
  const skipToCompleted = () => {
    const allCompleted: InteractiveHistoryItem[] = terminalIntroSequence.map((step) => ({
      command: step.command,
      output: step.output,
    }));
    setHistory(allCompleted);
    setCurrentTypedCommand('');
    setRevealedOutputLines([]);
    setPhase('completed');
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  // Sequence state machine
  useEffect(() => {
    if (isReducedMotion) return;
    let timer: ReturnType<typeof setTimeout> | undefined;

    if (phase === 'typing_cmd') {
      const step = terminalIntroSequence[activeStepIdx];
      if (!step) {
        setPhase('completed');
        return;
      }

      if (currentTypedCommand.length < step.command.length) {
        // Type next character with natural slight jitter
        const delay = 24 + Math.random() * 20;
        timer = setTimeout(() => {
          setCurrentTypedCommand(step.command.slice(0, currentTypedCommand.length + 1));
        }, delay);
      } else {
        // Command finished typing -> pause before revealing output
        setPhase('pause_before_output');
      }
    } else if (phase === 'pause_before_output') {
      timer = setTimeout(() => {
        setPhase('revealing_output');
      }, 260);
    } else if (phase === 'revealing_output') {
      const step = terminalIntroSequence[activeStepIdx];
      if (revealedOutputLines.length < step.output.length) {
        timer = setTimeout(() => {
          setRevealedOutputLines((prev) => [...prev, step.output[prev.length]]);
        }, 110);
      } else {
        // Output completely revealed -> pause before moving to next step
        setPhase('pause_next');
      }
    } else if (phase === 'pause_next') {
      timer = setTimeout(() => {
        const step = terminalIntroSequence[activeStepIdx];
        // Commit active step to history
        setHistory((prev) => [
          ...prev,
          {
            command: step.command,
            output: step.output,
          },
        ]);
        // Reset active fields
        setCurrentTypedCommand('');
        setRevealedOutputLines([]);

        if (activeStepIdx + 1 < terminalIntroSequence.length) {
          setActiveStepIdx((prev) => prev + 1);
          setPhase('typing_cmd');
        } else {
          setPhase('completed');
        }
      }, 380);
    }

    return () => clearTimeout(timer);
  }, [phase, currentTypedCommand, revealedOutputLines, activeStepIdx, isReducedMotion]);

  // Execute an interactive command
  const executeCommand = (rawCmd: string) => {
    const trimmed = rawCmd.trim();
    if (!trimmed) return;

    const lower = trimmed.toLowerCase();

    // Update command recall history
    setCommandHistory((prev) => [trimmed, ...prev.filter((c) => c !== trimmed)]);
    setHistoryPointer(-1);

    if (lower === 'clear') {
      setHistory([]);
      return;
    }

    if (lower === 'replay') {
      handleReplay();
      return;
    }

    let outputResult: string[] = [];

    switch (lower) {
      case 'help':
        outputResult = [
          'Interactive Terminal — Available Commands:',
          ...availableInteractiveCommands.map(
            (c) => `  ${c.name.padEnd(16, ' ')} : ${c.description}`
          ),
          '',
          'Tip: Click command buttons below for 1-tap execution.'
        ];
        break;

      case 'whoami':
        outputResult = ['Sri Harsha Penugondla Nagaraja'];
        break;

      case 'role':
        outputResult = ['AI/ML Engineering Student'];
        break;

      case 'education':
        outputResult = [
          'B.E. Artificial Intelligence and Machine Learning',
          'BMS College of Engineering, Bengaluru',
          'Autonomous College under VTU • Tier-1 Institution'
        ];
        break;

      case 'interests':
        outputResult = [
          'Artificial Intelligence',
          'Machine Learning',
          'Computer Vision',
          'Backend Engineering',
          'Full-Stack Development'
        ];
        break;

      case 'current_focus':
        outputResult = [
          'Building intelligent systems',
          'Exploring emerging technologies',
          'Solving real-world problems'
        ];
        break;

      case 'status':
        outputResult = ['Always learning. Always building.'];
        break;

      case 'about':
        outputResult = [
          "I'm Sri Harsha Penugondla Nagaraja, an AI/ML engineering student at BMSCE, Bengaluru.",
          "Passionate about computer vision, OCR, applied machine learning, distributed backend architectures, and physics simulation systems."
        ];
        break;

      case 'skills':
        outputResult = [
          'Core Stack & Explored Technologies:',
          '  Languages   : Python, C, JavaScript, TypeScript',
          '  AI / CV     : Computer Vision, OpenCV, PaddleOCR, YOLO, Gemini API, PyTorch/ONNX',
          '  Full-Stack  : React, Vite, Tailwind CSS, FastAPI, Node.js, Express.js, Next.js',
          '  Databases   : PostgreSQL, Cloud Firestore, Firebase, SQLite',
          '',
          'Navigating to Skills section...'
        ];
        setTimeout(() => {
          const el = document.getElementById('skills');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
          if (onNavigateSection) onNavigateSection('skills');
        }, 500);
        break;

      case 'projects':
        outputResult = [
          'Selected Featured Projects:',
          '  1. PaarakhMetric   : Legal Metrology AI label inspection (SIH 2026)',
          '  2. KisanSathi       : AI agricultural advisory & disease diagnosis',
          '  3. Saree Godown     : Hybrid inventory intelligence system',
          '  4. Presentation Pro : Gesture-controlled computer vision presenter',
          '  5. College Manager  : Multi-role event management platform',
          '  6. Artemis II       : Lunar free-return trajectory orbital simulation',
          '',
          'Navigating to Featured Projects...'
        ];
        setTimeout(() => {
          const el = document.getElementById('projects');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
          if (onNavigateSection) onNavigateSection('projects');
        }, 500);
        break;

      case 'contact':
        outputResult = [
          'Contact & Direct Coordinates:',
          '  Email     : sriharshapn@gmail.com',
          '  GitHub    : https://github.com/sriharshapn',
          '  LinkedIn  : https://www.linkedin.com/in/sri-harsha-penugondla-nagaraja-663021239/',
          '  Location  : Bengaluru, Karnataka, India',
          '',
          'Navigating to Contact section...'
        ];
        setTimeout(() => {
          const el = document.getElementById('contact');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
          if (onNavigateSection) onNavigateSection('contact');
        }, 500);
        break;

      default:
        outputResult = [
          `zsh: command not found: ${trimmed}`,
          `Type 'help' to inspect available system commands.`
        ];
        break;
    }

    setHistory((prev) => [
      ...prev,
      {
        command: trimmed,
        output: outputResult,
        isInteractive: true,
      },
    ]);
  };

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    executeCommand(inputValue);
    setInputValue('');
  };

  // Keyboard navigation for command history (Up / Down arrows)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const nextPointer = Math.min(historyPointer + 1, commandHistory.length - 1);
        setHistoryPointer(nextPointer);
        setInputValue(commandHistory[nextPointer] || '');
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyPointer > 0) {
        const nextPointer = historyPointer - 1;
        setHistoryPointer(nextPointer);
        setInputValue(commandHistory[nextPointer] || '');
      } else if (historyPointer === 0) {
        setHistoryPointer(-1);
        setInputValue('');
      }
    }
  };

  const isTypingActive = phase !== 'completed' && phase !== 'idle';

  return (
    <div
      ref={terminalRef}
      className={`rounded-2xl border border-zinc-800/90 bg-[#0A0D14]/95 backdrop-blur-xl shadow-2xl overflow-hidden transition-all duration-300 flex flex-col min-h-[460px] h-[520px] max-h-[600px] ${className}`}
      onClick={() => inputRef.current?.focus()}
    >
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800/80 bg-zinc-950/70 select-none">
        {/* Window controls */}
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-zinc-700/80 hover:bg-rose-500/80 transition-colors" title="Close" />
          <div className="w-3 h-3 rounded-full bg-zinc-700/80 hover:bg-amber-500/80 transition-colors" title="Minimize" />
          <div className="w-3 h-3 rounded-full bg-zinc-700/80 hover:bg-emerald-500/80 transition-colors" title="Expand" />
          <span className="hidden sm:inline-block text-[11px] font-mono text-zinc-500 ml-2">
            zsh — 80x24
          </span>
        </div>

        {/* Center Title */}
        <div className="flex items-center space-x-2 text-xs font-mono text-zinc-300">
          <TerminalIcon className="w-3.5 h-3.5 text-lime-400" />
          <span className="font-semibold text-zinc-200">sriharsha@bmsce: ~ (zsh)</span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-2">
          {isTypingActive && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                skipToCompleted();
              }}
              className="inline-flex items-center space-x-1 px-2 py-0.5 rounded text-[11px] font-mono text-zinc-400 hover:text-white bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-colors"
              title="Fast-forward typing animation"
            >
              <FastForward className="w-3 h-3 text-amber-400" />
              <span className="hidden sm:inline">Skip</span>
            </button>
          )}

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleReplay();
            }}
            className="inline-flex items-center space-x-1 px-2 py-0.5 rounded text-[11px] font-mono text-zinc-400 hover:text-white bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-colors"
            title="Replay sequence"
          >
            <RotateCcw className="w-3 h-3 text-lime-400" />
            <span className="hidden sm:inline">Replay</span>
          </button>

          <div className="hidden sm:flex items-center space-x-1 pl-1">
            <span
              className={`w-2 h-2 rounded-full ${
                isTypingActive ? 'bg-amber-400 animate-ping' : 'bg-emerald-400'
              }`}
            />
            <span className="text-[10px] font-mono text-zinc-500">
              {isTypingActive ? 'BUSY' : 'READY'}
            </span>
          </div>
        </div>
      </div>

      {/* Terminal Screen / Output Body */}
      <div
        ref={scrollContainerRef}
        className="flex-1 p-5 sm:p-6 overflow-y-auto font-mono text-xs sm:text-sm text-zinc-300 leading-relaxed space-y-4 select-text"
      >
        {/* Completed History */}
        {history.map((item, index) => (
          <div key={index} className="space-y-1.5 animate-fadeIn">
            <div className="flex items-center space-x-2 text-zinc-100">
              <span className="text-lime-400 font-bold select-none">$</span>
              <span className="font-semibold text-white tracking-wide">{item.command}</span>
            </div>
            {item.output.length > 0 && (
              <div className="pl-3 sm:pl-4 border-l border-zinc-800/80 space-y-0.5 text-zinc-300/95 font-normal">
                {item.output.map((line, lineIdx) => (
                  <div key={lineIdx} className={line === '' ? 'h-2' : ''}>
                    {line}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* Active Auto-Typing Step */}
        {isTypingActive && (
          <div className="space-y-1.5">
            {/* Command currently being typed */}
            <div className="flex items-center space-x-2 text-zinc-100">
              <span className="text-lime-400 font-bold select-none">$</span>
              <span className="font-semibold text-white tracking-wide">
                {currentTypedCommand}
              </span>
              {phase === 'typing_cmd' && (
                <span className="inline-block w-2 h-4 bg-lime-400 animate-pulse ml-0.5" />
              )}
            </div>

            {/* Revealed lines for active command */}
            {revealedOutputLines.length > 0 && (
              <div className="pl-3 sm:pl-4 border-l border-zinc-800/80 space-y-0.5 text-zinc-300/95 font-normal">
                {revealedOutputLines.map((line, lineIdx) => (
                  <div key={lineIdx} className={line === '' ? 'h-2' : ''}>
                    {line}
                  </div>
                ))}
                {(phase === 'revealing_output' || phase === 'pause_before_output') && (
                  <span className="inline-block w-2 h-3.5 bg-zinc-400/80 animate-pulse ml-1" />
                )}
              </div>
            )}
          </div>
        )}

        {/* Interactive Prompt Line (Active when sequence completed or user clicks inside) */}
        {!isTypingActive && (
          <form onSubmit={handleInputSubmit} className="pt-2 flex items-center space-x-2">
            <span className="text-lime-400 font-bold select-none text-sm">$</span>
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type 'help', 'projects', 'skills', or 'contact'..."
              className="flex-1 bg-transparent border-none outline-none font-mono text-xs sm:text-sm text-white placeholder-zinc-600 focus:ring-0 p-0"
              autoComplete="off"
              spellCheck="false"
            />
            <button
              type="submit"
              className="text-zinc-600 hover:text-lime-400 transition-colors p-1"
              title="Execute command"
            >
              <CornerDownLeft className="w-3.5 h-3.5" />
            </button>
          </form>
        )}
      </div>

      {/* Quick Interactive Command Chips */}
      <div className="px-4 py-2.5 bg-zinc-950/90 border-t border-zinc-800/80 flex items-center justify-between flex-wrap gap-2 text-xs font-mono select-none">
        <span className="text-[11px] text-zinc-500 uppercase tracking-wider hidden sm:inline">
          Quick Commands:
        </span>
        <div className="flex items-center flex-wrap gap-1.5">
          {['whoami', 'skills', 'projects', 'contact', 'help', 'clear'].map((cmd) => (
            <button
              key={cmd}
              onClick={(e) => {
                e.stopPropagation();
                executeCommand(cmd);
                inputRef.current?.focus();
              }}
              className="px-2 py-0.5 rounded bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-lime-300 text-[11px] transition-colors"
            >
              ${cmd}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
