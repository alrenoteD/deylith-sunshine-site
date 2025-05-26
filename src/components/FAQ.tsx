
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';
import faqsData from '../data/faqs.json';

const FAQ = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (id: number) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  return (
    <section id="faq" className="py-20 hero-gradient">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 gradient-text">
            Perguntas Frequentes
          </h2>
          <p className="text-lg md:text-xl text-foreground/80">
            Tire suas dúvidas sobre agentes IA
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {faqsData.map((faq, index) => (
            <Card
              key={faq.id}
              className="glass-effect border-primary/20 animate-slide-in-left"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-0">
                <Button
                  variant="ghost"
                  onClick={() => toggleItem(faq.id)}
                  className="w-full p-6 justify-between text-left hover:bg-primary/5 rounded-lg"
                >
                  <span className="text-lg font-medium text-foreground">
                    {faq.pergunta}
                  </span>
                  {openItems.includes(faq.id) ? (
                    <ChevronUp className="w-5 h-5 text-primary" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-primary" />
                  )}
                </Button>
                
                {openItems.includes(faq.id) && (
                  <div className="px-6 pb-6 animate-fade-in">
                    <p className="text-foreground/80 leading-relaxed">
                      {faq.resposta}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-lg text-foreground/80 mb-6">
            Ainda tem dúvidas? Fale diretamente conosco!
          </p>
          <Button
            size="lg"
            onClick={() => window.open('https://wa.me/5511999999999?text=Olá! Tenho algumas dúvidas sobre agentes IA.', '_blank')}
            className="daylight-gradient text-white hover:opacity-90 transition-opacity animate-pulse-glow text-lg px-8 py-6"
          >
            💬 Falar no WhatsApp
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
