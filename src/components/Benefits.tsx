
import { Card, CardContent } from '@/components/ui/card';
import contentData from '../data/content.json';

const Benefits = () => {
  const { benefits } = contentData;

  return (
    <section id="benefits" className="py-20 bg-background relative overflow-hidden">
      {/* Tech background effects */}
      <div className="absolute inset-0 bg-neon-grid opacity-5"></div>
      <div className="absolute top-20 right-20 w-40 h-40 bg-tech-purple/20 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 left-20 w-32 h-32 bg-tech-pink/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }}></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 gradient-text">
            {benefits.title}
          </h2>
          <p className="text-lg md:text-xl text-foreground/80">
            {benefits.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.items.map((benefit, index) => (
            <Card
              key={index}
              className="glass-effect hover:scale-105 transition-all duration-500 border-primary/20 animate-slide-in-right group tech-card relative overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Neon border effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-tech-purple via-tech-pink to-tech-orange rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-sm"></div>
              
              <CardContent className="p-8 text-center relative z-10">
                <div className="relative mb-6">
                  <div className="text-4xl md:text-5xl font-bold gradient-text mb-4 group-hover:scale-110 transition-transform duration-500 relative">
                    {benefit.percentage}
                    
                    {/* Floating particles */}
                    <div className="absolute -top-2 -right-2 w-2 h-2 bg-tech-purple/60 rounded-full animate-ping"></div>
                    <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-tech-pink/60 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
                  </div>
                  
                  {/* Progress bar effect */}
                  <div className="w-full h-1 bg-foreground/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-tech-purple to-tech-pink rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-1000 origin-left"
                      style={{ transitionDelay: `${index * 0.2}s` }}
                    ></div>
                  </div>
                </div>

                <h3 className="text-xl font-semibold mb-3 text-foreground group-hover:gradient-text transition-all duration-300">
                  {benefit.title}
                </h3>
                
                <p className="text-foreground/70 group-hover:text-foreground/90 transition-colors duration-300">
                  {benefit.description}
                </p>

                {/* Tech corner accents */}
                <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-tech-purple/30 group-hover:border-tech-purple/60 transition-colors duration-300"></div>
                <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-tech-pink/30 group-hover:border-tech-pink/60 transition-colors duration-300"></div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to action */}
        <div className="text-center mt-16">
          <div className="inline-block p-1 rounded-full bg-gradient-to-r from-tech-purple via-tech-pink to-tech-orange">
            <div className="bg-background rounded-full px-8 py-3">
              <p className="gradient-text font-medium">
                💡 Pronto para transformar seu negócio? Fale conosco!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
