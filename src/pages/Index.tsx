
import { useState, useEffect } from 'react';
import { ThemeProvider } from 'next-themes';
import Header from '../components/Header';
import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import Benefits from '../components/Benefits';
import Charts from '../components/Charts';
import UseCases from '../components/UseCases';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';
import RobotHead from '../components/RobotHead';

const Index = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleChatClick = () => {
    // Simple chat implementation - opens WhatsApp for now
    const message = "Olá! Gostaria de conversar com um agente sobre IA para minha empresa.";
    window.open(`https://wa.me/5548992111496?text=${encodeURIComponent(message)}`, '_blank');
  };

  if (!mounted) {
    return null;
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <main>
          <Hero />
          <About />
          <Services />
          <Benefits />
          <Charts />
          <UseCases />
          <FAQ />
        </main>
        <Footer />
        <RobotHead onChatClick={handleChatClick} />
      </div>
    </ThemeProvider>
  );
};

export default Index;
