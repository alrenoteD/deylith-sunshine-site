
import React, { useState, useEffect } from 'react';
import { Phone, MessageCircle, Mail, Globe } from 'lucide-react';

interface ContactItem {
  type: string;
  icon: React.ComponentType<any>;
  color: string;
  label: string;
}

interface RobotContactBubbleProps {
  onContactClick: (type: string, value: string) => void;
  robotPosition: { x: number; y: number };
}

const RobotContactBubble: React.FC<RobotContactBubbleProps> = ({
  onContactClick,
  robotPosition
}) => {
  const [currentContactIndex, setCurrentContactIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const contacts: ContactItem[] = [
    { type: 'whatsapp', icon: MessageCircle, color: 'text-green-500', label: 'WhatsApp' },
    { type: 'email', icon: Mail, color: 'text-purple-500', label: 'Email' },
    { type: 'website', icon: Globe, color: 'text-orange-500', label: 'Website' },
    { type: 'phone', icon: Phone, color: 'text-blue-500', label: 'Telefone' }
  ];

  const contactValues = {
    whatsapp: '5548992111496',
    email: 'maycondouglas@deylith.dev',
    website: 'deylith.dev',
    phone: '48992111496'
  };

  useEffect(() => {
    const showBubble = () => {
      setIsVisible(true);
      // Cycle through contacts every 2 seconds
      const cycleInterval = setInterval(() => {
        setCurrentContactIndex((prev) => (prev + 1) % contacts.length);
      }, 2000);

      // Hide bubble after 8 seconds
      setTimeout(() => {
        setIsVisible(false);
        clearInterval(cycleInterval);
      }, 8000);
    };

    // Show bubble randomly every 12-20 seconds
    const randomInterval = setInterval(() => {
      showBubble();
    }, 12000 + Math.random() * 8000);

    return () => clearInterval(randomInterval);
  }, [contacts.length]);

  if (!isVisible) return null;

  const currentContact = contacts[currentContactIndex];
  const IconComponent = currentContact.icon;

  return (
    <div 
      className="fixed z-[60] animate-bounce"
      style={{
        left: robotPosition.x - 60,
        top: robotPosition.y - 80,
      }}
    >
      {/* Thought bubble */}
      <div className="relative">
        {/* Main bubble */}
        <div 
          className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-2xl p-3 shadow-xl border border-gray-200/50 dark:border-gray-700/50 cursor-pointer hover:scale-110 transition-transform duration-300"
          onClick={() => onContactClick(currentContact.type, contactValues[currentContact.type as keyof typeof contactValues])}
        >
          <IconComponent className={`w-6 h-6 ${currentContact.color}`} />
        </div>
        
        {/* Bubble tail - small circles leading to robot */}
        <div className="absolute -bottom-4 left-6">
          <div className="w-3 h-3 bg-white/80 dark:bg-gray-800/80 rounded-full animate-pulse"></div>
        </div>
        <div className="absolute -bottom-6 left-8">
          <div className="w-2 h-2 bg-white/60 dark:bg-gray-800/60 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
        </div>
        <div className="absolute -bottom-7 left-10">
          <div className="w-1 h-1 bg-white/40 dark:bg-gray-800/40 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    </div>
  );
};

export default RobotContactBubble;
