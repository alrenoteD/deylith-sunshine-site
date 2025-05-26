
import { Button } from '@/components/ui/button';
import contentData from '../data/content.json';

const Hero = () => {
  const { hero } = contentData;

  return (
    <section className="min-h-screen hero-gradient flex items-center justify-center pt-20">
      <div className="container mx-auto px-4">
        <div className="text-center animate-fade-in">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            {hero.title}
            <br />
            <span className="gradient-text">{hero.highlight}</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-foreground/80 mb-8 max-w-4xl mx-auto leading-relaxed">
            {hero.subtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              onClick={() => window.open(hero.ctaWhatsapp, '_blank')}
              className="daylight-gradient text-white hover:opacity-90 transition-all duration-300 transform hover:scale-105 animate-pulse-glow text-lg px-8 py-6"
            >
              📱 {hero.ctaText}
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              onClick={() => {
                const element = document.getElementById('about');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-lg px-8 py-6 border-2 hover:bg-primary/10 transition-all duration-300"
            >
              Saiba Mais
            </Button>
          </div>
        </div>
        
        {/* Floating elements for visual appeal */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-sky-400/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-sunrise-400/20 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-primary/20 rounded-full blur-xl animate-pulse delay-500"></div>
      </div>
    </section>
  );
};

export default Hero;
