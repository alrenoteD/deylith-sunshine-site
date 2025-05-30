
import { Card, CardContent } from '@/components/ui/card';
import { MessageCircle, Target, Settings, Brain, Calendar, Building } from 'lucide-react';
import contentData from '../data/content.json';

const iconMap = {
  messageCircle: MessageCircle,
  target: Target,
  settings: Settings,
  brain: Brain,
  calendar: Calendar,
  building: Building,
};

const Services = () => {
  const { services } = contentData;

  return (
    <section id="services" className="py-20 hero-gradient">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 gradient-text">
            {services.title}
          </h2>
          <p className="text-lg md:text-xl text-foreground/80">
            {services.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.items.map((service, index) => {
            // Fallback to MessageCircle if icon is not found in the map
            const IconComponent = iconMap[service.icon as keyof typeof iconMap] || MessageCircle;
            
            return (
              <Card
                key={index}
                className="glass-effect hover:scale-105 transition-all duration-300 border-primary/20 animate-slide-in-left group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <IconComponent className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-foreground">
                    {service.title}
                  </h3>
                  <p className="text-foreground/70 leading-relaxed">
                    {service.description}
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

export default Services;
