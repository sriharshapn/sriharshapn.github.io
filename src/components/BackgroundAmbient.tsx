import React from 'react';

export const BackgroundAmbient: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {/* Floating Emerald Ambient Glow */}
      <div className="absolute -top-32 -left-32 w-[650px] h-[650px] rounded-full bg-emerald-500/[0.035] blur-[140px] animate-float-slow" />

      {/* Floating Violet Ambient Glow */}
      <div className="absolute top-1/3 -right-32 w-[600px] h-[600px] rounded-full bg-violet-600/[0.035] blur-[150px] animate-float-reverse" />

      {/* Subtle Lower Teal Ambient Glow */}
      <div className="absolute bottom-10 left-1/4 w-[500px] h-[500px] rounded-full bg-teal-500/[0.025] blur-[140px] animate-float-slow" />
    </div>
  );
};
