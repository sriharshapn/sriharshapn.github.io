import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  size?: number;
}

export const GithubIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', size, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    width={size || 20}
    height={size || 20}
    fill="currentColor"
    aria-hidden="true"
    className={className}
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
    />
  </svg>
);

export const LinkedinIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', size, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    width={size || 20}
    height={size || 20}
    fill="currentColor"
    aria-hidden="true"
    className={className}
    {...props}
  >
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.64 1.64 0 1 0 0-3.28 1.64 1.64 0 0 0 0 3.28M7.85 18.5V10.13H5.06v8.37h2.79z" />
  </svg>
);

export const SheriffStarIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', size, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    width={size || 20}
    height={size || 20}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    <circle cx="12" cy="12" r="3" stroke="currentColor" fill="none" opacity="0.6" />
    <circle cx="12" cy="2" r="1" fill="currentColor" />
    <circle cx="22" cy="9.27" r="1" fill="currentColor" />
    <circle cx="18.18" cy="21.02" r="1" fill="currentColor" />
    <circle cx="5.82" cy="21.02" r="1" fill="currentColor" />
    <circle cx="2" cy="9.27" r="1" fill="currentColor" />
  </svg>
);

export const CompassRoseIcon: React.FC<IconProps> = ({ className = 'w-6 h-6', size, ...props }) => (
  <svg
    viewBox="0 0 64 64"
    width={size || 24}
    height={size || 24}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    className={className}
    {...props}
  >
    <circle cx="32" cy="32" r="30" stroke="currentColor" strokeDasharray="3 3" opacity="0.5" />
    <circle cx="32" cy="32" r="26" stroke="currentColor" opacity="0.8" />
    <circle cx="32" cy="32" r="6" fill="currentColor" opacity="0.4" />
    {/* North Point */}
    <polygon points="32,4 35,28 32,32 29,28" fill="#B18A57" stroke="#B18A57" />
    {/* South Point */}
    <polygon points="32,60 35,36 32,32 29,36" fill="#493426" stroke="#493426" />
    {/* East Point */}
    <polygon points="60,32 36,35 32,32 36,29" fill="#B18A57" stroke="#B18A57" />
    {/* West Point */}
    <polygon points="4,32 28,35 32,32 28,29" fill="#493426" stroke="#493426" />
    {/* Intermediate points */}
    <polygon points="52,12 34,30 32,32 30,34" fill="#D7C19C" opacity="0.6" />
    <polygon points="12,52 30,34 32,32 34,30" fill="#D7C19C" opacity="0.6" />
    <polygon points="12,12 30,30 32,32 34,34" fill="#D7C19C" opacity="0.6" />
    <polygon points="52,52 34,34 32,32 30,30" fill="#D7C19C" opacity="0.6" />
  </svg>
);

export const LanternIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', size, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    width={size || 20}
    height={size || 20}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M9 3h6M12 3v3M8 6h8l1 4H7l1-4z" />
    <path d="M7 10h10v8a2 2 0 01-2 2H9a2 2 0 01-2-2v-8z" />
    <path d="M6 20h12v2H6z" />
    <circle cx="12" cy="14" r="2" fill="#B18A57" stroke="none" />
    <line x1="12" y1="10" x2="12" y2="12" />
  </svg>
);

export const TelegraphKeyIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', size, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    width={size || 20}
    height={size || 20}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M2 18h20v3H2z" />
    <path d="M5 18v-4h3v4" />
    <path d="M16 18v-6h3v6" />
    <path d="M6 14l12-4" />
    <circle cx="18" cy="10" r="2" fill="#B18A57" />
  </svg>
);

export const CornerFlourish: React.FC<{
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  className?: string;
  size?: number;
}> = ({ position, className = 'text-[#B18A57]', size = 20 }) => {
  const transform =
    position === 'top-left'
      ? 'rotate(0)'
      : position === 'top-right'
      ? 'rotate(90)'
      : position === 'bottom-right'
      ? 'rotate(180)'
      : 'rotate(270)';

  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      className={className}
      style={{ transformOrigin: 'center', transform }}
    >
      <path d="M2 2h8v2H4v6H2V2zm4 4h4v2H8v2H6V6z" />
    </svg>
  );
};
