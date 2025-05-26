
import { Card, CardContent } from '@/components/ui/card';
import contentData from '../data/content.json';

const Benefits = () => {
  const { benefits } = contentData;

  return (
    <section id="benefits" className="py-20 bg-background">
      <div className="container mx-auto px-4">
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
              className="glass-effect hover:scale-105 transition-all duration-300 border-primary/20 animate-slide-in-right group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-8 text-center">
                <div className="text-4xl md:text-5xl font-bold gradient-text mb-4 group-hover:scale-110 transition-transform">
                  {benefit.percentage}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">
                  {benefit.title}
                </h3>
                <p className="text-foreground/70">
                  {benefit.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
