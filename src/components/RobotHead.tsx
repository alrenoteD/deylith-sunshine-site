
import React, { useEffect, useRef, useState } from 'react';

const RobotHead: React.FC = () => {
  const robotRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (robotRef.current) {
        const rect = robotRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const deltaX = e.clientX - centerX;
        const deltaY = e.clientY - centerY;
        
        const angle = Math.atan2(deltaY, deltaX);
        const rotateX = (deltaY / window.innerHeight) * 30;
        const rotateY = (deltaX / window.innerWidth) * 30;
        
        setMousePosition({ x: rotateY, y: -rotateX });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <div
        ref={robotRef}
        className="w-20 h-20 perspective-1000"
        style={{
          transform: `rotateX(${mousePosition.y}deg) rotateY(${mousePosition.x}deg)`,
          transition: 'transform 0.1s ease-out'
        }}
      >
        <div className="relative w-full h-full transform-gpu">
          {/* Cabeça do robô */}
          <div className="w-16 h-16 mx-auto bg-gradient-to-br from-tech-purple to-tech-pink rounded-2xl shadow-lg border-2 border-white/20 relative overflow-hidden">
            {/* Brilho */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent animate-pulse"></div>
            
            {/* Olhos */}
            <div className="flex justify-center items-center mt-4 space-x-2">
              <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse shadow-lg shadow-cyan-400/50"></div>
              <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse shadow-lg shadow-cyan-400/50" style={{ animationDelay: '0.5s' }}></div>
            </div>
            
            {/* Boca */}
            <div className="flex justify-center mt-2">
              <div className="w-4 h-1 bg-white/60 rounded-full"></div>
            </div>
            
            {/* Antena */}
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
              <div className="w-1 h-3 bg-white/40 rounded-full"></div>
              <div className="w-2 h-2 bg-tech-orange rounded-full -mt-1 animate-ping"></div>
            </div>
          </div>
          
          {/* Reflexos 3D */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-2xl pointer-events-none"></div>
        </div>
      </div>
    </div>
  );
};

export default RobotHead;
