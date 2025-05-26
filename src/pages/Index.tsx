
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

const Index = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
      </div>
    </ThemeProvider>
  );
};

export default Index;
