
import React from 'react';
import { Phone, MessageCircle, Mail, Globe } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface ContactPopupProps {
  isVisible: boolean;
  position: { x: number; y: number };
  onContactClick: (type: string, value: string) => void;
}

const ContactPopup: React.FC<ContactPopupProps> = ({
  isVisible,
  position,
  onContactClick
}) => {
  const contacts = [
    {
      type: 'whatsapp',
      value: '5548992111496',
      icon: MessageCircle,
      label: 'WhatsApp',
      color: 'text-green-500'
    },
    {
      type: 'phone',
      value: '48992111496',
      icon: Phone,
      label: 'Telefone',
      color: 'text-blue-500'
    },
    {
      type: 'email',
      value: 'maycondouglas@deylith.dev',
      icon: Mail,
      label: 'Email',
      color: 'text-purple-500'
    },
    {
      type: 'website',
      value: 'deylith.dev',
      icon: Globe,
      label: 'Website',
      color: 'text-orange-500'
    }
  ];

  if (!isVisible) return null;

  return (
    <Card 
      className="fixed z-[55] bg-background/95 backdrop-blur-lg border-primary/20 shadow-xl p-4 animate-scale-in"
      style={{
        left: position.x - 100,
        top: position.y - 200,
      }}
    >
      <div className="grid grid-cols-2 gap-3">
        {contacts.map((contact) => {
          const IconComponent = contact.icon;
          return (
            <button
              key={contact.type}
              onClick={() => onContactClick(contact.type, contact.value)}
              className="flex flex-col items-center p-3 rounded-lg hover:bg-primary/10 transition-all duration-300 group"
            >
              <IconComponent className={`w-6 h-6 mb-2 ${contact.color} group-hover:scale-110 transition-transform`} />
              <span className="text-xs font-medium">{contact.label}</span>
            </button>
          );
        })}
      </div>
      
      {/* Arrow pointing down to robot */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full">
        <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-primary/20"></div>
      </div>
    </Card>
  );
};

export default ContactPopup;
