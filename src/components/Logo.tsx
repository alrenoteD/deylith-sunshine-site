
import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-16 h-16'
  };

  return (
    <div className={`${sizeClasses[size]} ${className} relative`}>
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Gradiente de fundo */}
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8B5CF6" />
            <stop offset="25%" stopColor="#EC4899" />
            <stop offset="50%" stopColor="#F97316" />
            <stop offset="75%" stopColor="#EAB308" />
            <stop offset="100%" stopColor="#10B981" />
          </linearGradient>
          <linearGradient id="innerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FBBF24" />
            <stop offset="100%" stopColor="#F59E0B" />
          </linearGradient>
        </defs>
        
        {/* Círculo externo com gradiente */}
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="url(#logoGradient)"
          className="animate-pulse"
        />
        
        {/* Círculo interno */}
        <circle
          cx="50"
          cy="50"
          r="35"
          fill="url(#innerGradient)"
        />
        
        {/* Letra D estilizada */}
        <path
          d="M35 25 H45 Q65 25 65 50 Q65 75 45 75 H35 Z M45 35 H45 Q55 35 55 50 Q55 65 45 65 H45 Z"
          fill="white"
          className="drop-shadow-lg"
        />
        
        {/* Raios de luz */}
        <g className="animate-spin" style={{ animationDuration: '20s' }}>
          <line x1="50" y1="5" x2="50" y2="15" stroke="white" strokeWidth="2" opacity="0.8" />
          <line x1="78.5" y1="21.5" x2="71.5" y2="28.5" stroke="white" strokeWidth="2" opacity="0.6" />
          <line x1="95" y1="50" x2="85" y2="50" stroke="white" strokeWidth="2" opacity="0.8" />
          <line x1="78.5" y1="78.5" x2="71.5" y2="71.5" stroke="white" strokeWidth="2" opacity="0.6" />
          <line x1="50" y1="95" x2="50" y2="85" stroke="white" strokeWidth="2" opacity="0.8" />
          <line x1="21.5" y1="78.5" x2="28.5" y2="71.5" stroke="white" strokeWidth="2" opacity="0.6" />
          <line x1="5" y1="50" x2="15" y2="50" stroke="white" strokeWidth="2" opacity="0.8" />
          <line x1="21.5" y1="21.5" x2="28.5" y2="28.5" stroke="white" strokeWidth="2" opacity="0.6" />
        </g>
      </svg>
    </div>
  );
};

export default Logo;
