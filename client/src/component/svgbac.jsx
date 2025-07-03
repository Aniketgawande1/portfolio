import React from 'react';
import Aurora from './Aurora';
import Iridescence from './Iridescence';

const BackgroundSVG = () => {
  return (
    <div className="absolute inset-0 w-full h-full z-0">
      {/* Aurora Background Effect */}
      <Aurora
        colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
        blend={0.5}
        amplitude={1.0}
        speed={0.5}
      />
      
      {/* Iridescence Effect */}
      <Iridescence
        color={[1, 1, 1]}
        mouseReact={false}
        amplitude={0.1}
        speed={1.0}
      />
      
      {/* SVG Overlay */}
      <svg 
        className="absolute inset-0 w-full h-full opacity-30" 
        viewBox="0 0 1000 1000" 
        xmlns="http://www.w3.org/2000/svg"
      >
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.2" />
        </linearGradient>
        <linearGradient id="grad2" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#6366F1" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#EC4899" stopOpacity="0.1" />
        </linearGradient>
      </defs>
      
      {/* Abstract shapes */}
      <circle cx="150" cy="150" r="80" fill="url(#grad1)" />
      <circle cx="850" cy="150" r="120" fill="url(#grad2)" />
      <circle cx="150" cy="850" r="100" fill="url(#grad2)" />
      <circle cx="850" cy="850" r="70" fill="url(#grad1)" />
      
      {/* Connection lines */}
      <path d="M150,150 Q500,100 850,150" stroke="#4F46E5" strokeWidth="1" fill="none" opacity="0.2" />
      <path d="M150,850 Q500,900 850,850" stroke="#8B5CF6" strokeWidth="1" fill="none" opacity="0.2" />
      <path d="M150,150 Q100,500 150,850" stroke="#3B82F6" strokeWidth="1" fill="none" opacity="0.2" />
      <path d="M850,150 Q900,500 850,850" stroke="#EC4899" strokeWidth="1" fill="none" opacity="0.2" />
      
      {/* Center elements */}
      <path d="M300,300 Q500,100 700,300 Q900,500 700,700 Q500,900 300,700 Q100,500 300,300" 
        stroke="#6366F1" strokeWidth="1" fill="none" opacity="0.1" />
      
      {/* Grid patterns */}
      <g opacity="0.05">
        {Array.from({ length: 10 }).map((_, i) => (
          <line 
            key={`hline-${i}`} 
            x1="0" 
            y1={i * 100} 
            x2="1000" 
            y2={i * 100} 
            stroke="#CBD5E1" 
            strokeWidth="1" 
          />
        ))}
        {Array.from({ length: 10 }).map((_, i) => (
          <line 
            key={`vline-${i}`} 
            x1={i * 100} 
            y1="0" 
            x2={i * 100} 
            y2="1000" 
            stroke="#CBD5E1" 
            strokeWidth="1" 
          />
        ))}
      </g>
    </svg>
    </div>
  );
};

export default BackgroundSVG;