
import React, { useState, useRef, useEffect } from 'react';
import { Send, X, MessageCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatWidgetProps {
  isOpen: boolean;
  onClose: () => void;
  position: { x: number; y: number };
  endpoint?: string;
  welcomeMessage?: string;
  embedCode?: string;
}

const ChatWidget: React.FC<ChatWidgetProps> = ({
  isOpen,
  onClose,
  position,
  endpoint,
  welcomeMessage = "Olá! Como posso ajudar você hoje?",
  embedCode
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: welcomeMessage,
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const embedRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Load embed code when widget opens
  useEffect(() => {
    if (isOpen && embedCode && embedRef.current) {
      // Clear previous content
      embedRef.current.innerHTML = '';
      
      // Insert the embed code
      embedRef.current.innerHTML = embedCode;
      
      // Execute any scripts in the embed code
      const scripts = embedRef.current.querySelectorAll('script');
      scripts.forEach(script => {
        const newScript = document.createElement('script');
        Array.from(script.attributes).forEach(attr => {
          newScript.setAttribute(attr.name, attr.value);
        });
        if (script.src) {
          newScript.src = script.src;
        } else {
          newScript.textContent = script.textContent;
        }
        script.parentNode?.replaceChild(newScript, script);
      });
    }
  }, [isOpen, embedCode]);

  const sendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      if (endpoint) {
        // Simulated AI response for now - replace with actual endpoint call
        setTimeout(() => {
          const aiResponse: Message = {
            id: (Date.now() + 1).toString(),
            text: "Obrigado pela sua mensagem! Nossa equipe entrará em contato em breve. Para atendimento imediato, você pode usar nosso WhatsApp.",
            isUser: false,
            timestamp: new Date()
          };
          setMessages(prev => [...prev, aiResponse]);
          setIsLoading(false);
        }, 1500);
      } else {
        // Fallback response
        const fallbackResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: "Chat IA não configurado. Por favor, entre em contato via WhatsApp para atendimento imediato!",
          isUser: false,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, fallbackResponse]);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.error('Error sending message:', error);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!isOpen) return null;

  // Calculate responsive positioning
  const isMobile = window.innerWidth < 768;
  const widgetWidth = isMobile ? Math.min(320, window.innerWidth - 32) : 320;
  const widgetHeight = isMobile ? Math.min(400, window.innerHeight - 100) : 400;
  
  const leftPosition = isMobile ? 16 : Math.min(position.x, window.innerWidth - widgetWidth - 16);
  const topPosition = isMobile ? 80 : Math.max(position.y - widgetHeight, 20);

  return (
    <Card 
      className="fixed z-[60] bg-background/95 backdrop-blur-lg border-primary/20 shadow-2xl"
      style={{
        width: `${widgetWidth}px`,
        height: `${widgetHeight}px`,
        left: `${leftPosition}px`,
        top: `${topPosition}px`,
      }}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-3 md:p-4 border-b border-primary/20">
          <div className="flex items-center gap-2">
            <MessageCircle className="w-4 h-4 md:w-5 md:h-5 text-primary" />
            <span className="font-semibold text-sm md:text-base">Chat IA</span>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        {embedCode ? (
          <div className="flex-1 p-2 md:p-4 overflow-hidden">
            <div 
              ref={embedRef} 
              className="w-full h-full overflow-auto"
              style={{ minHeight: '200px' }}
            />
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-3 md:p-4 space-y-3 md:space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] md:max-w-[80%] p-2 md:p-3 rounded-lg ${
                      message.isUser
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-foreground'
                    }`}
                  >
                    <p className="text-xs md:text-sm">{message.text}</p>
                    <span className="text-xs opacity-70">
                      {message.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-muted p-2 md:p-3 rounded-lg">
                    <Loader2 className="w-3 h-3 md:w-4 md:h-4 animate-spin" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-3 md:p-4 border-t border-primary/20">
              <div className="flex gap-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Digite sua mensagem..."
                  disabled={isLoading}
                  className="text-sm md:text-base"
                />
                <Button 
                  onClick={sendMessage} 
                  disabled={isLoading || !inputValue.trim()}
                  size="sm"
                >
                  <Send className="w-3 h-3 md:w-4 md:h-4" />
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </Card>
  );
};

export default ChatWidget;
