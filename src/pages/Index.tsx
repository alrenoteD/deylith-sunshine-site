
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
import CustomSection from '../components/CustomSection';

const Index = () => {
  const [mounted, setMounted] = useState(false);
  const [customSections, setCustomSections] = useState([]);
  const [themeSettings, setThemeSettings] = useState({
    robotPrimaryColor: '#1e40af',
    robotSecondaryColor: '#3b82f6'
  });

  useEffect(() => {
    setMounted(true);
    
    // Load custom sections
    const savedSections = localStorage.getItem('customSections');
    if (savedSections) {
      setCustomSections(JSON.parse(savedSections));
    }

    // Load theme settings
    const savedTheme = localStorage.getItem('themeSettings');
    if (savedTheme) {
      setThemeSettings(JSON.parse(savedTheme));
    }
  }, []);

  const handleChatClick = () => {
    // This will be handled by the RobotHead component itself now
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
          
          {/* About section with different background */}
          <section className="py-16 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20">
            <About />
          </section>
          
          <Services />
          <Benefits />
          <Charts />
          
          {/* Use Cases section with different background */}
          <section className="py-16 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20">
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
        
        {/* Footer with different background */}
        <div className="bg-gradient-to-br from-slate-900 to-blue-900">
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
