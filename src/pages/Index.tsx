
import { useState, useEffect } from 'react';
import { ThemeProvider } from 'next-themes';
import Header from '../components/Header';
import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import Benefits from '../components/Benefits';
import HowItWorks from '../components/HowItWorks';
import EconomySimulator from '../components/EconomySimulator';
import Charts from '../components/Charts';
import UseCases from '../components/UseCases';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';
import RobotHead from '../components/RobotHead';
import CustomSection from '../components/CustomSection';

const Index = () => {
  const [mounted, setMounted] = useState(false);
  const [customSections, setCustomSections] = useState([]);
  const [themeSettings, setThemeSettings] = useState({
    robotPrimaryColor: '#1e40af',
    robotSecondaryColor: '#3b82f6'
  });

  useEffect(() => {
    console.log('Index component mounting...');
    setMounted(true);
    
    // Load custom sections
    const savedSections = localStorage.getItem('customSections');
    if (savedSections) {
      try {
        setCustomSections(JSON.parse(savedSections));
      } catch (error) {
        console.error('Error parsing custom sections:', error);
      }
    }

    // Load theme settings
    const savedTheme = localStorage.getItem('themeSettings');
    if (savedTheme) {
      try {
        setThemeSettings(JSON.parse(savedTheme));
      } catch (error) {
        console.error('Error parsing theme settings:', error);
      }
    }
  }, []);

  const handleChatClick = () => {
    // This will be handled by the RobotHead component itself now
  };

  if (!mounted) {
    return null;
  }

  console.log('Rendering Index component...');

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <main>
          <Hero />
          
          {/* About section with updated gradient */}
          <section className="py-16 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-emerald-900/30 dark:via-teal-900/30 dark:to-cyan-900/30">
            <About />
          </section>
          
          <Services />
          <Benefits />
          
          {/* How It Works - NEW */}
          <HowItWorks />
          
          {/* Economy Simulator */}
          <EconomySimulator />
          
          <Charts />
          
          {/* Use Cases section with updated gradient */}
          <section className="py-16 bg-gradient-to-br from-orange-50 via-amber-50 to-rose-50 dark:from-orange-900/30 dark:via-amber-900/30 dark:to-rose-900/30">
            <UseCases />
          </section>
          
          {/* Custom Sections */}
          {customSections
            .filter((section: any) => section.enabled)
            .map((section: any) => (
              <CustomSection
                key={section.id}
                title={section.title}
                content={section.content}
                backgroundColor={section.backgroundColor}
                textColor={section.textColor}
                showCard={section.showCard}
              />
            ))}
          
          <FAQ />
        </main>
        
        {/* Footer with updated gradient */}
        <div className="bg-gradient-to-br from-slate-900 via-gray-900 to-black dark:from-slate-950 dark:via-gray-950 dark:to-black">
          <Footer />
        </div>
        
        <RobotHead 
          primaryColor={themeSettings.robotPrimaryColor}
          secondaryColor={themeSettings.robotSecondaryColor}
          onChatClick={handleChatClick} 
        />
      </div>
    </ThemeProvider>
  );
};

export default Index;
