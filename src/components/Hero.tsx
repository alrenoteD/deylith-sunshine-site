
import { Button } from '@/components/ui/button';
import contentData from '../data/content.json';

const Hero = () => {
  const { hero } = contentData;

  return (
    <section className="min-h-screen hero-gradient flex items-center justify-center pt-16 md:pt-20 relative overflow-hidden">
      {/* Tech background effects */}
      <div className="absolute inset-0 bg-neon-grid opacity-10"></div>
      
      {/* Floating tech elements - adjusted for mobile */}
      <div className="absolute top-20 left-4 md:left-10 w-24 md:w-32 h-24 md:h-32 bg-tech-purple/30 rounded-full blur-3xl animate-float"></div>
      <div className="absolute top-32 md:top-40 right-4 md:right-20 w-32 md:w-40 h-32 md:h-40 bg-tech-pink/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-20 left-1/4 w-20 md:w-24 h-20 md:h-24 bg-tech-orange/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
      <div className="absolute bottom-32 md:bottom-40 right-1/3 w-28 md:w-36 h-28 md:h-36 bg-tech-cyan/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>

      {/* Matrix rain effect - reduced for mobile */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute w-0.5 h-0.5 bg-tech-purple/40 matrix-rain hidden md:block"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center animate-fade-in">
          <div className="mb-6 md:mb-8">
            <div className="inline-block p-1 rounded-full bg-gradient-to-r from-tech-purple via-tech-pink to-tech-orange mb-4 md:mb-6">
              <div className="bg-background rounded-full px-4 md:px-6 py-2">
                <span className="text-xs md:text-sm font-medium gradient-text">🚀 Soluções Inteligentes de Automação</span>
              </div>
            </div>
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold mb-4 md:mb-6 leading-tight px-2">
            Transformamos Processos
            <br />
            <span className="gradient-text relative">
              Empresariais com IA
              <div className="absolute -inset-1 bg-gradient-to-r from-tech-purple via-tech-pink to-tech-orange rounded-lg blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
            </span>
          </h1>
          
          <p className="text-lg md:text-xl lg:text-2xl text-foreground/80 mb-6 md:mb-8 max-w-4xl mx-auto leading-relaxed px-2">
            Automatize tarefas repetitivas, aumente a eficiência operacional e reduza custos com nossas soluções inteligentes personalizadas
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center mb-8 md:mb-12 px-4">
            <Button
              size="lg"
              onClick={() => window.open('https://wa.me/5548992111496?text=Olá! Gostaria de solicitar uma demonstração gratuita das soluções de IA.', '_blank')}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 text-base md:text-lg px-6 md:px-8 py-4 md:py-6 shadow-lg border-0 font-semibold w-full sm:w-auto"
            >
              <span className="flex items-center gap-2">
                🎯 Solicite uma Demonstração Gratuita
              </span>
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              onClick={() => {
                const element = document.getElementById('benefits');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-base md:text-lg px-6 md:px-8 py-4 md:py-6 border-2 hover:bg-primary/10 transition-all duration-300 tech-card neon-glow group w-full sm:w-auto"
            >
              <span className="group-hover:gradient-text transition-all duration-300">
                Ver Como Funciona
              </span>
            </Button>
          </div>

          {/* Stats indicators - restored and mobile optimized */}
          <div className="mt-8 md:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto px-4">
            <div className="luxury-card p-4 md:p-6 rounded-xl text-center tech-card">
              <div className="text-2xl md:text-3xl font-bold gradient-text mb-2">24/7</div>
              <div className="text-sm md:text-base text-foreground/70">Atendimento Contínuo</div>
            </div>
            
            <div className="luxury-card p-4 md:p-6 rounded-xl text-center tech-card">
              <div className="text-2xl md:text-3xl font-bold gradient-text mb-2">300%</div>
              <div className="text-sm md:text-base text-foreground/70">ROI em 6 meses</div>
            </div>
            
            <div className="luxury-card p-4 md:p-6 rounded-xl text-center tech-card">
              <div className="text-2xl md:text-3xl font-bold gradient-text mb-2">90%</div>
              <div className="text-sm md:text-base text-foreground/70">Economia de Custos</div>
            </div>
          </div>

          {/* Trust indicators - mobile optimized */}
          <div className="mt-8 md:mt-12 flex flex-wrap justify-center items-center gap-4 md:gap-8 opacity-70 px-4">
            <div className="flex items-center gap-2 text-xs md:text-sm text-foreground/60">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              Certificações em IA
            </div>
            <div className="flex items-center gap-2 text-xs md:text-sm text-foreground/60">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              Suporte 24/7
            </div>
            <div className="flex items-center gap-2 text-xs md:text-sm text-foreground/60">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
              Implementação Rápida
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-1 h-6 md:h-8 bg-gradient-to-b from-tech-purple to-transparent rounded-full"></div>
      </div>
    </section>
  );
};

export default Hero;
