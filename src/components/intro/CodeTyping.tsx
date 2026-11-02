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
      className="flex items-center justify-center font-mono text-sm sm:text-base md:text-xl text-zinc-100 tracking-wider select-none pointer-events-none transition-opacity duration-300"
      style={{ opacity: textOpacity }}
    >
      {/* Code Text with crisp monospace typography */}
      <span className="text-white font-medium whitespace-pre">
        {text}
      </span>

      {/* Blinking Monospace Cursor - Remains visible to complete the command-line feel */}
      <span 
        className={`inline-block w-2 sm:w-2.5 h-4 sm:h-5 ml-1 bg-white align-middle transition-opacity duration-100 ${
          cursorVisible ? 'opacity-100' : 'opacity-0'
        }`}
        aria-hidden="true"
      />

      {/* Minimalist 2D Vector Line-Art Graduation Cap (Appears at the end of the code) */}
      {showCapIcon && (
        <svg
          ref={capIconRef}
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="inline-block ml-2 w-5 h-5 sm:w-6 sm:h-6 align-middle text-white filter drop-shadow-[0_0_6px_rgba(255,255,255,0.35)] transition-all duration-300"
          aria-hidden="true"
        >
          {/* Mortarboard Rhombus Top Outline */}
          <path
            d="M12 4.5 L21.5 9 L12 13.5 L2.5 9 Z"
            stroke="#FFFFFF"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          {/* Skull Cap Head Fitting Underside */}
          <path
            d="M6.5 11.2 V15 C6.5 17 8.9 18.8 12 18.8 C15.1 18.8 17.5 17 17.5 15 V11.2"
            stroke="#FFFFFF"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          {/* Restrained Tassel Detail */}
          <path
            d="M19.5 9.8 V15.2"
            stroke="#FFFFFF"
            strokeWidth="1.25"
            strokeLinecap="round"
          />
          <circle cx="19.5" cy="16" r="1.0" fill="#FFFFFF" />
        </svg>
      )}
    </div>
  );
};
