
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';

const UseCases = () => {
  const [useCases, setUseCases] = useState([
    {
      title: "E-commerce",
      description: "Atendimento 24/7, recuperação de carrinho abandonado, suporte pós-venda automatizado.",
      results: "87% menos tempo de resposta"
    },
    {
      title: "Clínicas e Consultórios",
      description: "Agendamento automático, lembretes de consulta, triagem inicial de pacientes.",
      results: "89% redução em no-shows"
    },
    {
      title: "Imobiliárias",
      description: "Qualificação de leads, agendamento de visitas, follow-up automático.",
      results: "156% aumento em conversões"
    },
    {
      title: "Escritórios de Advocacia",
      description: "Triagem de casos, agendamento de consultas, acompanhamento processual.",
      results: "67% mais eficiência operacional"
    },
    {
      title: "Consultorias",
      description: "Qualificação de prospects, agendamento de reuniões, nurturing automatizado.",
      results: "234% aumento em reuniões qualificadas"
    },
    {
      title: "Lojas Físicas",
      description: "Atendimento WhatsApp, reserva de produtos, suporte técnico automatizado.",
      results: "78% melhoria na satisfação"
    }
  ]);

  useEffect(() => {
    // Load saved use cases
    const saved = localStorage.getItem('useCases');
    if (saved) {
      setUseCases(JSON.parse(saved));
    }
  }, []);

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 gradient-text">
            Casos de Uso Mais Comuns
          </h2>
          <p className="text-lg md:text-xl text-foreground/80">
            Veja como diferentes setores se beneficiam dos nossos agentes IA
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {useCases.map((useCase, index) => (
            <Card
              key={index}
              className="glass-effect hover:scale-105 transition-all duration-300 border-primary/20 animate-slide-in-left group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold mb-4 text-foreground group-hover:text-primary transition-colors">
                  {useCase.title}
                </h3>
                <p className="text-foreground/70 mb-4 leading-relaxed">
                  {useCase.description}
                </p>
                <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                  {useCase.results}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCases;
