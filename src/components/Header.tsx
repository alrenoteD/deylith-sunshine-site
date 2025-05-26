
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { Moon, Sun, Menu, X } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'glass-effect shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg daylight-gradient flex items-center justify-center">
              <span className="text-white font-bold text-lg">D</span>
            </div>
            <span className="text-xl font-bold gradient-text">Deylith.dev</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('about')}
              className="text-foreground/80 hover:text-foreground transition-colors"
            >
              Sobre
            </button>
            <button
              onClick={() => scrollToSection('services')}
              className="text-foreground/80 hover:text-foreground transition-colors"
            >
              Serviços
            </button>
            <button
              onClick={() => scrollToSection('benefits')}
              className="text-foreground/80 hover:text-foreground transition-colors"
            >
              Benefícios
            </button>
            <button
              onClick={() => scrollToSection('faq')}
              className="text-foreground/80 hover:text-foreground transition-colors"
            >
              FAQ
            </button>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>
            
            <Button
              onClick={() => window.open('https://wa.me/5511999999999?text=Olá! Gostaria de saber mais sobre agentes IA para minha empresa.', '_blank')}
              className="hidden md:inline-flex daylight-gradient text-white hover:opacity-90 transition-opacity animate-pulse-glow"
            >
              Fale Conosco
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 glass-effect rounded-lg p-4 animate-fade-in">
            <div className="flex flex-col space-y-4">
              <button
                onClick={() => scrollToSection('about')}
                className="text-left text-foreground/80 hover:text-foreground transition-colors"
              >
                Sobre
              </button>
              <button
                onClick={() => scrollToSection('services')}
                className="text-left text-foreground/80 hover:text-foreground transition-colors"
              >
                Serviços
              </button>
              <button
                onClick={() => scrollToSection('benefits')}
                className="text-left text-foreground/80 hover:text-foreground transition-colors"
              >
                Benefícios
              </button>
              <button
                onClick={() => scrollToSection('faq')}
                className="text-left text-foreground/80 hover:text-foreground transition-colors"
              >
                FAQ
              </button>
              <Button
                onClick={() => window.open('https://wa.me/5511999999999?text=Olá! Gostaria de saber mais sobre agentes IA para minha empresa.', '_blank')}
                className="daylight-gradient text-white hover:opacity-90 transition-opacity"
              >
                Fale Conosco
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
