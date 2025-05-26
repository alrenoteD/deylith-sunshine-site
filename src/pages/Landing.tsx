
import { useState, useEffect } from 'react';
import { ThemeProvider } from 'next-themes';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Benefits from '../components/Benefits';
import Charts from '../components/Charts';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { MessageCircle, Target, Settings, Brain } from 'lucide-react';

const Landing = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const services = [
    {
      title: "Atendimento Automatizado",
      description: "Chatbots inteligentes que respondem clientes 24/7 com a mesma qualidade de um atendente humano.",
      icon: MessageCircle
    },
    {
      title: "SDR Virtual",
      description: "Agentes que qualificam leads, agendam reuniões e nutrem prospects automaticamente.",
      icon: Target
    },
    {
      title: "Automação de Processos",
      description: "Automatizamos tarefas repetitivas como emissão de boletos, follow-ups e relatórios.",
      icon: Settings
    },
    {
      title: "Assistente Inteligente",
      description: "IA que ajuda sua equipe com informações, agendamentos e gerenciamento de tarefas.",
      icon: Brain
    }
  ];

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <main>
          <Hero />
          
          {/* Brief Services Section */}
          <section className="py-16 bg-background">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12 animate-fade-in">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
                  O que Oferecemos
                </h2>
                <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
                  Criamos agentes IA personalizados que automatizam processos e escalam seu atendimento
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {services.map((service, index) => {
                  const IconComponent = service.icon;
                  
                  return (
                    <Card
                      key={index}
                      className="glass-effect hover:scale-105 transition-all duration-300 border-primary/20 animate-slide-in-left tech-card group"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <CardContent className="p-6 text-center">
                        <div className="w-12 h-12 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors neon-glow">
                          <IconComponent className="w-6 h-6 text-primary" />
                        </div>
                        <h3 className="text-lg font-semibold mb-2 text-foreground">
                          {service.title}
                        </h3>
                        <p className="text-sm text-foreground/70 leading-relaxed">
                          {service.description}
                        </p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </section>

          <Benefits />
          <Charts />
          <FAQ />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Landing;
