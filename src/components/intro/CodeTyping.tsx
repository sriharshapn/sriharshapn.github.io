import React from 'react';

interface CodeTypingProps {
  text: string;
  cursorVisible: boolean;
  showCapIcon: boolean;
  capIconRef?: React.RefObject<SVGSVGElement | null>;
  textOpacity?: number;
}

export const CodeTyping: React.FC<CodeTypingProps> = ({
  text,
  cursorVisible,
  showCapIcon,
  capIconRef,
  textOpacity = 1,
}) => {
  return (
    <div 
      className="flex items-center justify-center font-mono text-sm sm:text-base md:text-lg text-zinc-100 tracking-wider select-none pointer-events-none transition-opacity duration-300"
      style={{ opacity: textOpacity }}
    >
      {/* Code Text */}
      <span className="text-zinc-100 font-medium whitespace-pre">
        {text}
      </span>

      {/* Blinking Monospace Cursor */}
      {!showCapIcon && (
        <span 
          className={`inline-block w-2 sm:w-2.5 h-4 sm:h-5 ml-1 bg-zinc-100 align-middle transition-opacity duration-100 ${
            cursorVisible ? 'opacity-100' : 'opacity-0'
          }`}
          aria-hidden="true"
        />
      )}

      {/* Line-Art 2D Graduation Cap Vector Icon */}
      {showCapIcon && (
        <svg
          ref={capIconRef}
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="inline-block ml-2 w-5 h-5 sm:w-6 sm:h-6 align-middle transform transition-all duration-300 ease-out text-white filter drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]"
          aria-hidden="true"
        >
          {/* Mortarboard Rhombus Top Outline */}
          <path
            d="M12 4 L22 9 L12 14 L2 9 Z"
            stroke="#FFFFFF"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          {/* Skull Cap Underside Arch */}
          <path
            d="M6 11.5 V15.5 C6 17.5 8.7 19.5 12 19.5 C15.3 19.5 18 17.5 18 15.5 V11.5"
            stroke="#FFFFFF"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          {/* Tassel Cord & Pendant */}
          <path
            d="M20 10 V16"
            stroke="#10B981"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
          <circle cx="20" cy="16.8" r="1.2" fill="#10B981" />
        </svg>
      )}
    </div>
  );
};
