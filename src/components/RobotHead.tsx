
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useTheme } from 'next-themes';
import { MessageCircle } from 'lucide-react';

interface RobotHeadProps {
  primaryColor?: string;
  secondaryColor?: string;
  onChatClick?: () => void;
}

const RobotHead: React.FC<RobotHeadProps> = ({ 
  primaryColor = '#8B5CF6', 
  secondaryColor = '#EC4899',
  onChatClick 
}) => {
  const robotRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [eyePosition, setEyePosition] = useState({ x: 0, y: 0 });
  const [expression, setExpression] = useState<'neutral' | 'happy' | 'excited' | 'thinking'>('neutral');
  const [isBlinking, setIsBlinking] = useState(false);
  const { theme } = useTheme();

  // Calculate eye movement based on mouse position
  const updateEyePosition = useCallback((e: MouseEvent) => {
    if (robotRef.current) {
      const rect = robotRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      
      // Limit eye movement range
      const maxMove = 3;
      const eyeX = Math.max(-maxMove, Math.min(maxMove, deltaX / 30));
      const eyeY = Math.max(-maxMove, Math.min(maxMove, deltaY / 30));
      
      setEyePosition({ x: eyeX, y: eyeY });
      
      // Head rotation based on mouse
      const rotateX = (deltaY / window.innerHeight) * 15;
      const rotateY = (deltaX / window.innerWidth) * 15;
      
      setMousePosition({ x: rotateY, y: -rotateX });
    }
  }, []);

  // Detect hover over interactive elements
  const detectHoverElements = useCallback((e: MouseEvent) => {
    const target = e.target as Element;
    const interactiveElements = ['button', 'a', '[role="button"]'];
    const isInteractive = interactiveElements.some(selector => 
      target.closest(selector) !== null
    );
    
    if (isInteractive) {
      const elementText = target.textContent?.toLowerCase() || '';
      if (elementText.includes('fale conosco') || elementText.includes('whatsapp')) {
        setExpression('excited');
      } else if (elementText.includes('benefícios')) {
        setExpression('happy');
      } else {
        setExpression('thinking');
      }
    } else {
      setExpression('neutral');
    }
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      updateEyePosition(e);
      detectHoverElements(e);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [updateEyePosition, detectHoverElements]);

  // Blinking animation
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 150);
    }, 3000 + Math.random() * 2000);

    return () => clearInterval(blinkInterval);
  }, []);

  // Theme-responsive colors
  const getRobotColors = () => {
    if (theme === 'dark') {
      return {
        head: 'from-indigo-600 to-purple-700',
        accent: primaryColor,
        secondary: secondaryColor
      };
    }
    return {
      head: 'from-purple-400 to-pink-500',
      accent: primaryColor,
      secondary: secondaryColor
    };
  };

  const colors = getRobotColors();

  const getEyeShape = () => {
    switch (expression) {
      case 'happy':
        return 'rounded-full';
      case 'excited':
        return 'rounded-lg';
      case 'thinking':
        return 'rounded-full scale-90';
      default:
        return 'rounded-full';
    }
  };

  const getMouthShape = () => {
    switch (expression) {
      case 'happy':
        return 'w-6 h-2 bg-white/80 rounded-full';
      case 'excited':
        return 'w-5 h-3 bg-white/80 rounded-full';
      case 'thinking':
        return 'w-3 h-1 bg-white/60 rounded-full';
      default:
        return 'w-4 h-1 bg-white/60 rounded-full';
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <div
        ref={robotRef}
        className="w-20 h-20 perspective-1000 cursor-pointer"
        style={{
          transform: `rotateX(${mousePosition.y}deg) rotateY(${mousePosition.x}deg)`,
          transition: 'transform 0.1s ease-out'
        }}
        onClick={onChatClick}
      >
        <div className="relative w-full h-full transform-gpu hover:scale-110 transition-transform duration-300">
          {/* Robot head */}
          <div className={`w-16 h-16 mx-auto bg-gradient-to-br ${colors.head} rounded-2xl shadow-lg border-2 border-white/20 relative overflow-hidden`}>
            {/* Shine effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent animate-pulse"></div>
            
            {/* Eyes */}
            <div className="flex justify-center items-center mt-4 space-x-2">
              <div 
                className={`w-3 h-3 bg-cyan-400 shadow-lg shadow-cyan-400/50 transition-all duration-200 ${getEyeShape()} ${isBlinking ? 'scale-y-0' : 'scale-y-100'}`}
                style={{
                  transform: `translate(${eyePosition.x}px, ${eyePosition.y}px)`
                }}
              >
                <div className="w-1 h-1 bg-white/80 rounded-full ml-0.5 mt-0.5"></div>
              </div>
              <div 
                className={`w-3 h-3 bg-cyan-400 shadow-lg shadow-cyan-400/50 transition-all duration-200 ${getEyeShape()} ${isBlinking ? 'scale-y-0' : 'scale-y-100'}`}
                style={{
                  transform: `translate(${eyePosition.x}px, ${eyePosition.y}px)`
                }}
              >
                <div className="w-1 h-1 bg-white/80 rounded-full ml-0.5 mt-0.5"></div>
              </div>
            </div>
            
            {/* Mouth */}
            <div className="flex justify-center mt-2">
              <div className={getMouthShape()}></div>
            </div>
            
            {/* Antenna */}
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
              <div className="w-1 h-3 bg-white/40 rounded-full"></div>
              <div 
                className="w-2 h-2 rounded-full -mt-1 animate-ping"
                style={{ backgroundColor: colors.accent }}
              ></div>
            </div>

            {/* Status indicators */}
            <div className="absolute top-1 right-1 flex space-x-1">
              <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse"></div>
              <div className="w-1 h-1 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            </div>
          </div>
          
          {/* Chat indicator */}
          <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shadow-lg animate-bounce">
            <MessageCircle className="w-3 h-3 text-white" />
          </div>
          
          {/* 3D shadow */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl pointer-events-none"></div>
        </div>
      </div>
    </div>
  );
};

export default RobotHead;
