
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useTheme } from 'next-themes';
import ChatWidget from './ChatWidget';
import ContactPopup from './ContactPopup';

interface RobotHeadProps {
  primaryColor?: string;
  secondaryColor?: string;
  onChatClick?: () => void;
}

const RobotHead: React.FC<RobotHeadProps> = ({ 
  primaryColor = '#1e40af', 
  secondaryColor = '#3b82f6',
  onChatClick 
}) => {
  const robotRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [eyePosition, setEyePosition] = useState({ x: 0, y: 0 });
  const [expression, setExpression] = useState<'neutral' | 'happy' | 'excited' | 'thinking'>('neutral');
  const [isBlinking, setIsBlinking] = useState(false);
  const [showChatWidget, setShowChatWidget] = useState(false);
  const [showContactPopup, setShowContactPopup] = useState(false);
  const [robotPosition, setRobotPosition] = useState({ x: 0, y: 0 });
  const { theme } = useTheme();

  // Get chat settings from localStorage
  const [chatSettings, setChatSettings] = useState({
    enabled: true,
    endpoint: '',
    welcomeMessage: 'Olá! Como posso ajudar você hoje?',
    embedCode: ''
  });

  useEffect(() => {
    const savedChat = localStorage.getItem('chatSettings');
    if (savedChat) {
      setChatSettings(JSON.parse(savedChat));
    }
  }, []);

  // Show contact popup randomly every 10-20 seconds
  useEffect(() => {
    const showRandomContact = () => {
      if (!showChatWidget) {
        setShowContactPopup(true);
        setTimeout(() => setShowContactPopup(false), 3000);
      }
    };

    const interval = setInterval(showRandomContact, 15000 + Math.random() * 10000);
    return () => clearInterval(interval);
  }, [showChatWidget]);

  // Calculate eye movement based on mouse position
  const updateEyePosition = useCallback((e: MouseEvent) => {
    if (robotRef.current) {
      const rect = robotRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      setRobotPosition({ x: centerX, y: centerY });
      
      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      
      // Limit eye movement range
      const maxMove = 4;
      const eyeX = Math.max(-maxMove, Math.min(maxMove, deltaX / 25));
      const eyeY = Math.max(-maxMove, Math.min(maxMove, deltaY / 25));
      
      setEyePosition({ x: eyeX, y: eyeY });
      
      // Head rotation based on mouse
      const rotateX = (deltaY / window.innerHeight) * 10;
      const rotateY = (deltaX / window.innerWidth) * 10;
      
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
        head: 'from-slate-800 to-blue-900',
        accent: primaryColor,
        secondary: secondaryColor
      };
    }
    return {
      head: 'from-blue-400 to-indigo-500',
      accent: primaryColor,
      secondary: secondaryColor
    };
  };

  const colors = getRobotColors();

  const getEyeShape = () => {
    switch (expression) {
      case 'happy':
        return 'rounded-full scale-110';
      case 'excited':
        return 'rounded-lg scale-125';
      case 'thinking':
        return 'rounded-full scale-90';
      default:
        return 'rounded-full';
    }
  };

  const getMouthShape = () => {
    switch (expression) {
      case 'happy':
        return 'w-6 h-3 bg-white/90 rounded-full';
      case 'excited':
        return 'w-5 h-4 bg-white/90 rounded-full';
      case 'thinking':
        return 'w-3 h-1 bg-white/60 rounded-full';
      default:
        return 'w-4 h-1 bg-white/70 rounded-full';
    }
  };

  const handleRobotClick = () => {
    setShowChatWidget(!showChatWidget);
    setShowContactPopup(false);
  };

  const handleContactClick = (type: string, value: string) => {
    switch (type) {
      case 'whatsapp':
        const message = "Olá! Gostaria de conversar sobre os serviços de IA.";
        window.open(`https://wa.me/${value}?text=${encodeURIComponent(message)}`, '_blank');
        break;
      case 'phone':
        window.open(`tel:${value}`, '_blank');
        break;
      case 'email':
        window.open(`mailto:${value}`, '_blank');
        break;
      case 'website':
        window.open(`https://${value}`, '_blank');
        break;
    }
    setShowContactPopup(false);
  };

  return (
    <>
      <div className="fixed bottom-8 right-8 z-50">
        <div
          ref={robotRef}
          className="w-20 h-20 perspective-1000 cursor-pointer"
          style={{
            transform: `rotateX(${mousePosition.y}deg) rotateY(${mousePosition.x}deg)`,
            transition: 'transform 0.1s ease-out'
          }}
          onClick={handleRobotClick}
        >
          <div className="relative w-full h-full transform-gpu hover:scale-110 transition-transform duration-300">
            {/* Robot head */}
            <div className={`w-16 h-16 mx-auto bg-gradient-to-br ${colors.head} rounded-2xl shadow-xl border-2 border-white/30 relative overflow-hidden`}>
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent animate-pulse"></div>
              
              {/* Eyes */}
              <div className="flex justify-center items-center mt-4 space-x-2">
                <div 
                  className={`w-3 h-3 bg-cyan-300 shadow-lg shadow-cyan-300/50 transition-all duration-200 ${getEyeShape()} ${isBlinking ? 'scale-y-0' : 'scale-y-100'}`}
                  style={{
                    transform: `translate(${eyePosition.x}px, ${eyePosition.y}px)`
                  }}
                >
                  <div className="w-1 h-1 bg-white/90 rounded-full ml-0.5 mt-0.5"></div>
                </div>
                <div 
                  className={`w-3 h-3 bg-cyan-300 shadow-lg shadow-cyan-300/50 transition-all duration-200 ${getEyeShape()} ${isBlinking ? 'scale-y-0' : 'scale-y-100'}`}
                  style={{
                    transform: `translate(${eyePosition.x}px, ${eyePosition.y}px)`
                  }}
                >
                  <div className="w-1 h-1 bg-white/90 rounded-full ml-0.5 mt-0.5"></div>
                </div>
              </div>
              
              {/* Mouth */}
              <div className="flex justify-center mt-2">
                <div className={getMouthShape()}></div>
              </div>
              
              {/* Antenna */}
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                <div className="w-1 h-3 bg-white/50 rounded-full"></div>
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
              <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      <ContactPopup
        isVisible={showContactPopup}
        position={robotPosition}
        onContactClick={handleContactClick}
      />

      <ChatWidget
        isOpen={showChatWidget}
        onClose={() => setShowChatWidget(false)}
        position={robotPosition}
        endpoint={chatSettings.endpoint}
        welcomeMessage={chatSettings.welcomeMessage}
        embedCode={chatSettings.embedCode}
      />
    </>
  );
};

export default RobotHead;
