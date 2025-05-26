
import { Card, CardContent } from '@/components/ui/card';
import contentData from '../data/content.json';

const About = () => {
  const { about } = contentData;

  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 gradient-text">
            {about.title}
          </h2>
          <p className="text-lg md:text-xl text-foreground/80 leading-relaxed">
            {about.description}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 animate-slide-in-left">
          {about.values.map((value, index) => (
            <Card
              key={index}
              className="glass-effect hover:scale-105 transition-all duration-300 border-primary/20"
            >
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-4 daylight-gradient rounded-full flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">
                    {value.title.charAt(0)}
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">
                  {value.title}
                </h3>
                <p className="text-foreground/70">
                  {value.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
