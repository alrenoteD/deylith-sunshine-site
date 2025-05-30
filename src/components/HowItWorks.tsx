
import { Card, CardContent } from '@/components/ui/card';
import { MessageCircle, Cog, BookOpen, Rocket, BarChart3 } from 'lucide-react';
import contentData from '../data/content.json';

const HowItWorks = () => {
  // Add safety check for howItWorks data
  const howItWorksData = contentData?.howItWorks;
  
  if (!howItWorksData) {
    console.log('HowItWorks data not found in contentData');
    return null;
  }

  const iconMap = {
    "1": MessageCircle,
    "2": Cog,
    "3": BookOpen,
    "4": Rocket,
    "5": BarChart3,
  };

  return (
    <section className="py-20 hero-gradient">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 gradient-text">
            {howItWorksData.title || "Como Funciona"}
          </h2>
          <p className="text-lg md:text-xl text-foreground/80">
            {howItWorksData.subtitle || "Processo simples e eficiente"}
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-5 gap-6">
            {(howItWorksData.steps || []).map((step, index) => {
              const IconComponent = iconMap[step.number as keyof typeof iconMap] || MessageCircle;
              
              return (
                <div
                  key={index}
                  className="relative"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <Card className="glass-card hover:scale-105 transition-all duration-300 border-primary/20 h-full">
                    <CardContent className="p-6 text-center">
                      <div className="relative mb-4">
                        <div className="w-16 h-16 mx-auto bg-gradient-to-br from-primary to-primary/70 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300">
                          <IconComponent className="w-8 h-8 text-white" />
                        </div>
                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                          {step.number || index + 1}
                        </div>
                      </div>
                      
                      <h3 className="text-lg font-semibold mb-3 text-foreground hover:text-primary transition-colors">
                        {step.title || `Passo ${index + 1}`}
                      </h3>
                      
                      <p className="text-foreground/70 text-sm leading-relaxed">
                        {step.description || "Descrição do passo"}
                      </p>
                    </CardContent>
                  </Card>
                  
                  {/* Connector line */}
                  {index < (howItWorksData.steps || []).length - 1 && (
                    <div className="hidden md:block absolute top-8 -right-3 w-6 h-0.5 bg-gradient-to-r from-primary to-primary/50 z-10"></div>
                  )}
                </div>
              );
            })}
          </div>
          
          {/* CTA Section */}
          <div className="text-center mt-12">
            <div className="glass-card p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold mb-4 gradient-text">💰 Planos flexíveis, com ou sem mensalidade</h3>
              <p className="text-foreground/80 mb-6">
                Oferecemos opções sob medida, com planos mensais ou projetos pontuais. 
                A primeira conversa é sempre gratuita, e alguns modelos são testáveis por até 7 dias sem compromisso.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <div className="flex items-center gap-2 text-sm text-foreground/70">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Teste gratuito por 7 dias
                </div>
                <div className="flex items-center gap-2 text-sm text-foreground/70">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Primeira conversa gratuita
                </div>
                <div className="flex items-center gap-2 text-sm text-foreground/70">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  Cancelamento sem taxas
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
