
import { Button } from '@/components/ui/button';
import contentData from '../data/content.json';

const Hero = () => {
  const { hero } = contentData;

  return (
    <section className="min-h-screen hero-gradient flex items-center justify-center pt-20 relative overflow-hidden">
      {/* Tech background effects */}
      <div className="absolute inset-0 bg-neon-grid opacity-10"></div>
      
      {/* Floating tech elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-tech-purple/30 rounded-full blur-3xl animate-float"></div>
      <div className="absolute top-40 right-20 w-40 h-40 bg-tech-pink/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-tech-orange/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
      <div className="absolute bottom-40 right-1/3 w-36 h-36 bg-tech-cyan/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>

      {/* Matrix rain effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-0.5 h-0.5 bg-tech-purple/40 matrix-rain"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center animate-fade-in">
          <div className="mb-8">
            <div className="inline-block p-1 rounded-full bg-gradient-to-r from-tech-purple via-tech-pink to-tech-orange mb-6">
              <div className="bg-background rounded-full px-6 py-2">
                <span className="text-sm font-medium gradient-text">🚀 Tecnologia de Ponta em IA</span>
              </div>
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            {hero.title}
            <br />
            <span className="gradient-text relative">
              {hero.highlight}
              <div className="absolute -inset-1 bg-gradient-to-r from-tech-purple via-tech-pink to-tech-orange rounded-lg blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-foreground/80 mb-8 max-w-4xl mx-auto leading-relaxed">
            {hero.subtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button
              size="lg"
              onClick={() => window.open(hero.ctaWhatsapp, '_blank')}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 text-lg px-8 py-6 shadow-lg border-0 font-semibold"
            >
              <span className="flex items-center gap-2">
                📱 {hero.ctaText}
              </span>
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              onClick={() => {
                const element = document.getElementById('benefits');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-lg px-8 py-6 border-2 hover:bg-primary/10 transition-all duration-300 tech-card neon-glow group"
            >
              <span className="group-hover:gradient-text transition-all duration-300">
                Ver Benefícios
              </span>
            </Button>
          </div>

          {/* Tech stats display */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { label: "Empresas Atendidas", value: "200+" },
              { label: "Economia Média", value: "80%" },
              { label: "Disponibilidade", value: "24/7" },
              { label: "ROI Médio", value: "300%" }
            ].map((stat, index) => (
              <div
                key={index}
                className="glass-effect p-4 rounded-lg tech-card hover:neon-glow transition-all duration-300"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="text-2xl font-bold gradient-text">{stat.value}</div>
                <div className="text-sm text-foreground/70">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-1 h-8 bg-gradient-to-b from-tech-purple to-transparent rounded-full"></div>
      </div>
    </section>
  );
};

export default Hero;
