
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
        {/* Gradientes */}
        <defs>
          <linearGradient id="sunGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FCD34D" />
            <stop offset="25%" stopColor="#F59E0B" />
            <stop offset="50%" stopColor="#F97316" />
            <stop offset="75%" stopColor="#EC4899" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>
          <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="50%" stopColor="#06D6A0" />
            <stop offset="100%" stopColor="#38BDF8" />
          </linearGradient>
          <radialGradient id="glowGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FBBF24" stopOpacity="0.8"/>
            <stop offset="100%" stopColor="#FBBF24" stopOpacity="0"/>
          </radialGradient>
        </defs>
        
        {/* Glow effect - representing daylight */}
        <circle
          cx="50"
          cy="30"
          r="25"
          fill="url(#glowGradient)"
          className="animate-pulse"
          style={{ animationDuration: '3s' }}
        />
        
        {/* Sol estilizado - representing daylight source */}
        <circle
          cx="50"
          cy="30"
          r="12"
          fill="url(#sunGradient)"
          className="drop-shadow-lg"
        />
        
        {/* Raios de luz em movimento */}
        <g className="animate-spin" style={{ animationDuration: '20s' }} transform="translate(50,30)">
          <line x1="0" y1="-18" x2="0" y2="-22" stroke="#FCD34D" strokeWidth="2" opacity="0.8" />
          <line x1="12.7" y1="-12.7" x2="15.5" y2="-15.5" stroke="#F59E0B" strokeWidth="2" opacity="0.7" />
          <line x1="18" y1="0" x2="22" y2="0" stroke="#F97316" strokeWidth="2" opacity="0.8" />
          <line x1="12.7" y1="12.7" x2="15.5" y2="15.5" stroke="#EC4899" strokeWidth="2" opacity="0.7" />
          <line x1="0" y1="18" x2="0" y2="22" stroke="#8B5CF6" strokeWidth="2" opacity="0.8" />
          <line x1="-12.7" y1="12.7" x2="-15.5" y2="15.5" stroke="#10B981" strokeWidth="2" opacity="0.7" />
          <line x1="-18" y1="0" x2="-22" y2="0" stroke="#06D6A0" strokeWidth="2" opacity="0.8" />
          <line x1="-12.7" y1="-12.7" x2="-15.5" y2="-15.5" stroke="#38BDF8" strokeWidth="2" opacity="0.7" />
        </g>
        
        {/* Caminho/trilha representando "path" e conexão */}
        <path
          d="M25 65 Q35 55 45 62 Q55 70 65 58 Q75 45 85 55"
          stroke="url(#pathGradient)"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
          className="animate-pulse"
          style={{ animationDuration: '2s' }}
        />
        
        {/* Pontos conectivos representando dados/IA */}
        <circle cx="25" cy="65" r="3" fill="#10B981" className="animate-pulse" />
        <circle cx="45" cy="62" r="3" fill="#06D6A0" className="animate-pulse" style={{ animationDelay: '0.5s' }} />
        <circle cx="65" cy="58" r="3" fill="#38BDF8" className="animate-pulse" style={{ animationDelay: '1s' }} />
        <circle cx="85" cy="55" r="3" fill="#8B5CF6" className="animate-pulse" style={{ animationDelay: '1.5s' }} />
        
        {/* Letras D estilizadas integradas ao design */}
        <path
          d="M15 80 L15 90 L20 90 Q25 90 25 85 Q25 80 20 80 Z"
          fill="url(#sunGradient)"
          className="drop-shadow-md"
        />
        
        {/* Efeito de "enlightenment" - pequenas partículas */}
        <g className="animate-pulse" style={{ animationDuration: '4s' }}>
          <circle cx="30" cy="40" r="1" fill="#FCD34D" opacity="0.6" />
          <circle cx="70" cy="35" r="1" fill="#F97316" opacity="0.7" />
          <circle cx="40" cy="25" r="1" fill="#EC4899" opacity="0.5" />
          <circle cx="60" cy="40" r="1" fill="#8B5CF6" opacity="0.8" />
        </g>
      </svg>
    </div>
  );
};

export default Logo;
