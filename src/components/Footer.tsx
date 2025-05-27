
import { Button } from '@/components/ui/button';
import Logo from './Logo';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <Logo size="md" />
              <span className="text-xl font-bold gradient-text">Deylith.dev</span>
            </div>
            <p className="text-foreground/70 mb-6 leading-relaxed">
              Especialistas em agentes IA personalizados. Automatizamos processos e escalamos negócios através da inteligência artificial.
            </p>
            <Button
              onClick={() => window.open('https://wa.me/5548992111496?text=Olá! Gostaria de saber mais sobre agentes IA.', '_blank')}
              className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white hover:opacity-90 transition-opacity"
            >
              📱 Entre em Contato
            </Button>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-foreground">Serviços</h3>
            <ul className="space-y-2 text-foreground/70">
              <li>Atendimento Automatizado</li>
              <li>SDR Virtual</li>
              <li>Automação de Processos</li>
              <li>Assistente Inteligente</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-foreground">Contato</h3>
            <ul className="space-y-2 text-foreground/70">
              <li>📧 maycondouglas@deylith.dev</li>
              <li>📱 (48) 99211-1496</li>
              <li>🌐 deylith.dev</li>
              <li>📍 Içara, SC - Atendimento Mundial</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-foreground/60 text-sm">
            © {currentYear} Deylith.dev. Todos os direitos reservados.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-foreground/60 hover:text-foreground transition-colors text-sm">
              Política de Privacidade
            </a>
            <a href="#" className="text-foreground/60 hover:text-foreground transition-colors text-sm">
              Termos de Uso
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
