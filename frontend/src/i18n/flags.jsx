import React from 'react';

// Inline SVG flags (no external dependency, always renders)
// Source: public-domain simplified SVG flags

export const FlagGB = ({ className = '' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30" className={className} aria-hidden="true">
    <clipPath id="fgb-a"><path d="M0 0v30h60V0z" /></clipPath>
    <clipPath id="fgb-b"><path d="M30 15h30v15zv15H0zH0V0zV0h30z" /></clipPath>
    <g clipPath="url(#fgb-a)">
      <path d="M0 0v30h60V0z" fill="#012169" />
      <path d="M0 0l60 30m0-30L0 30" stroke="#fff" strokeWidth="6" />
      <path d="M0 0l60 30m0-30L0 30" clipPath="url(#fgb-b)" stroke="#C8102E" strokeWidth="4" />
      <path d="M30 0v30M0 15h60" stroke="#fff" strokeWidth="10" />
      <path d="M30 0v30M0 15h60" stroke="#C8102E" strokeWidth="6" />
    </g>
  </svg>
);

export const FlagES = ({ className = '' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 750 500" className={className} aria-hidden="true">
    <rect width="750" height="500" fill="#AA151B" />
    <rect width="750" height="250" y="125" fill="#F1BF00" />
  </svg>
);

export const FlagBR = ({ className = '' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 504" className={className} aria-hidden="true">
    <rect width="720" height="504" fill="#009C3B" />
    <path d="M360 62 L86 252 L360 442 L634 252 Z" fill="#FFDF00" />
    <circle cx="360" cy="252" r="92" fill="#002776" />
    <path d="M275 230 Q360 205 445 230 Q445 236 440 240 Q360 218 280 240 Q275 236 275 230 Z" fill="#fff" />
  </svg>
);

export const Flag = ({ code, className = 'w-5 h-[14px] rounded-sm shadow-sm overflow-hidden inline-block' }) => {
  const Wrapper = ({ children }) => (
    <span className={className} style={{ lineHeight: 0 }}>{children}</span>
  );
  if (code === 'en') return <Wrapper><FlagGB className="w-full h-full block" /></Wrapper>;
  if (code === 'es') return <Wrapper><FlagES className="w-full h-full block" /></Wrapper>;
  if (code === 'pt') return <Wrapper><FlagBR className="w-full h-full block" /></Wrapper>;
  return null;
};
