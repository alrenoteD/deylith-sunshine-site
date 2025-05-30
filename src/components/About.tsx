
import { Card, CardContent } from '@/components/ui/card';
import { Rocket, Target, BarChart3 } from 'lucide-react';
import contentData from '../data/content.json';

const About = () => {
  // Add safety check
  const aboutData = contentData?.about;
  
  if (!aboutData) {
    console.log('About data not found in contentData');
    return null;
  }

  const iconMap = {
    "🚀 Inovação": Rocket,
    "🎯 Personalização": Target,
    "📊 Resultados": BarChart3,
  };

  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 gradient-text">
            {aboutData.title || "Sobre Nós"}
          </h2>
          <p className="text-lg md:text-xl text-foreground/80 leading-relaxed mb-8">
            {aboutData.description || "Descrição sobre a empresa"}
          </p>
          
          {/* Mission Statement */}
          <div className="glass-card p-6 md:p-8 mb-8 text-left">
            <h3 className="text-xl md:text-2xl font-semibold mb-4 gradient-text">🤖 O que fazemos</h3>
            <p className="text-foreground/80 leading-relaxed mb-4">
              {aboutData.mission || "Nossa missão"}
            </p>
            <div className="bg-primary/5 rounded-lg p-4 border-l-4 border-primary">
              <p className="text-sm md:text-base text-foreground/70 italic">
                {aboutData.tools || "Nossas ferramentas"}
              </p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 animate-slide-in-left">
          {(aboutData.values || []).map((value, index) => {
            const IconComponent = iconMap[value.title as keyof typeof iconMap] || Target;
            
            return (
              <Card
                key={index}
                className="glass-card hover:scale-105 transition-all duration-300 border-primary/20"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center hover:from-primary/30 hover:to-primary/20 transition-all duration-300">
                    <IconComponent className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-foreground hover:text-primary transition-colors">
                    {value.title || `Valor ${index + 1}`}
                  </h3>
                  <p className="text-foreground/70 leading-relaxed">
                    {value.description || "Descrição do valor"}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default About;
