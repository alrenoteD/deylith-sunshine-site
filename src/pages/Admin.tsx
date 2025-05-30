import { useState, useEffect } from 'react';
import { ThemeProvider } from 'next-themes';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Plus, Trash2, Settings, Save, Eye, Upload, BarChart3 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ThemeSettingsComponent from '../components/admin/ThemeSettings';
import ChatSettingsComponent from '../components/admin/ChatSettings';

interface FAQ {
  id: number;
  pergunta: string;
  resposta: string;
}

interface Contact {
  id: string;
  type: string;
  value: string;
  icon: string;
  label: string;
}

interface UseCase {
  title: string;
  description: string;
  results: string;
}

interface Content {
  hero: {
    title: string;
    highlight: string;
    subtitle: string;
    ctaText: string;
    ctaWhatsapp: string;
  };
  about: {
    title: string;
    description: string;
  };
}

interface Stats {
  companies: string;
  savings: string;
  roi: string;
  availability: string;
}

interface ThemeSettings {
  primaryColor: string;
  secondaryColor: string;
  gradientStart: string;
  gradientEnd: string;
  neonEnabled: boolean;
  robotPrimaryColor: string;
  robotSecondaryColor: string;
  techTertiary: string;
}

interface ChatSettings {
  enabled: boolean;
  endpoint: string;
  welcomeMessage: string;
  embedCode: string;
}

interface FooterContent {
  description: string;
  servicesTitle: string;
  services: string[];
  contactTitle: string;
  copyright: string;
}

interface CustomSection {
  id: string;
  title: string;
  content: string;
  backgroundColor: string;
  textColor: string;
  showCard: boolean;
  enabled: boolean;
}

const Admin = () => {
  const [mounted, setMounted] = useState(false);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [content, setContent] = useState<Content | null>(null);
  const [useCases, setUseCases] = useState<UseCase[]>([]);
  const [stats, setStats] = useState<Stats>({
    companies: '200+',
    savings: '80%',
    roi: '300%',
    availability: '24/7'
  });
  const [themeSettings, setThemeSettings] = useState<ThemeSettings>({
    primaryColor: '#6366f1',
    secondaryColor: '#8b5cf6',
    gradientStart: '#6366f1',
    gradientEnd: '#8b5cf6',
    neonEnabled: true,
    robotPrimaryColor: '#6366f1',
    robotSecondaryColor: '#8b5cf6',
    techTertiary: '#10b981'
  });
  const [chatSettings, setChatSettings] = useState<ChatSettings>({
    enabled: true,
    endpoint: '',
    welcomeMessage: 'Olá! Como posso ajudar você hoje?',
    embedCode: ''
  });
  const [footerContent, setFooterContent] = useState<FooterContent>({
    description: 'Especialistas em agentes IA personalizados. Automatizamos processos e escalamos negócios através da inteligência artificial.',
    servicesTitle: 'Serviços',
    services: ['Atendimento Automatizado', 'SDR Virtual', 'Automação de Processos', 'Assistente Inteligente'],
    contactTitle: 'Contato',
    copyright: 'Todos os direitos reservados.'
  });
  const [customSections, setCustomSections] = useState([
    {
      id: '1',
      title: 'Sobre o Fundador',
      content: 'Maycon Douglas é especialista em IA e automação, com mais de 5 anos de experiência desenvolvendo soluções inteligentes para empresas de todos os portes.',
      backgroundColor: 'bg-background',
      textColor: 'text-foreground',
      showCard: true,
      enabled: true
    },
    {
      id: '2',
      title: 'Nossa Missão',
      content: 'Democratizar o acesso à inteligência artificial, tornando-a acessível e prática para empresas que buscam inovação e eficiência operacional.',
      backgroundColor: 'bg-muted/50',
      textColor: 'text-foreground',
      showCard: false,
      enabled: true
    }
  ]);
  const [activeTab, setActiveTab] = useState('faqs');
  const { toast } = useToast();

  useEffect(() => {
    setMounted(true);
    loadData();
  }, []);

  const loadData = async () => {
    try {
      // Load existing data
      const faqsData = await import('../data/faqs.json');
      const contentData = await import('../data/content.json');
      
      setFaqs(faqsData.default);
      setContent(contentData.default);
      
      // Load use cases
      setUseCases([
        {
          title: "E-commerce",
          description: "Atendimento 24/7, recuperação de carrinho abandonado, suporte pós-venda automatizado.",
          results: "87% menos tempo de resposta"
        },
        {
          title: "Clínicas e Consultórios",
          description: "Agendamento automático, lembretes de consulta, triagem inicial de pacientes.",
          results: "89% redução em no-shows"
        },
        {
          title: "Imobiliárias",
          description: "Qualificação de leads, agendamento de visitas, follow-up automático.",
          results: "156% aumento em conversões"
        },
        {
          title: "Escritórios de Advocacia",
          description: "Triagem de casos, agendamento de consultas, acompanhamento processual.",
          results: "67% mais eficiência operacional"
        },
        {
          title: "Consultorias",
          description: "Qualificação de prospects, agendamento de reuniões, nurturing automatizado.",
          results: "234% aumento em reuniões qualificadas"
        },
        {
          title: "Lojas Físicas",
          description: "Atendimento WhatsApp, reserva de produtos, suporte técnico automatizado.",
          results: "78% melhoria na satisfação"
        }
      ]);
      
      // Load contacts
      setContacts([
        { id: '1', type: 'whatsapp', value: '5548992111496', icon: '📱', label: 'WhatsApp' },
        { id: '2', type: 'email', value: 'maycondouglas@deylith.dev', icon: '📧', label: 'Email' },
        { id: '3', type: 'website', value: 'deylith.dev', icon: '🌐', label: 'Website' },
        { id: '4', type: 'location', value: 'Içara, SC - Atendimento Mundial', icon: '📍', label: 'Localização' },
      ]);

      // Load saved settings
      const savedStats = localStorage.getItem('stats');
      if (savedStats) setStats(JSON.parse(savedStats));

      const savedTheme = localStorage.getItem('themeSettings');
      if (savedTheme) setThemeSettings(JSON.parse(savedTheme));

      const savedChat = localStorage.getItem('chatSettings');
      if (savedChat) setChatSettings(JSON.parse(savedChat));

      const savedFooter = localStorage.getItem('footerContent');
      if (savedFooter) setFooterContent(JSON.parse(savedFooter));

      const savedUseCases = localStorage.getItem('useCases');
      if (savedUseCases) setUseCases(JSON.parse(savedUseCases));

      const savedCustomSections = localStorage.getItem('customSections');
      if (savedCustomSections) setCustomSections(JSON.parse(savedCustomSections));

    } catch (error) {
      toast({
        title: "Erro",
        description: "Falha ao carregar dados",
        variant: "destructive"
      });
    }
  };

  const saveFAQs = () => {
    localStorage.setItem('faqs', JSON.stringify(faqs));
    toast({ title: "Sucesso", description: "FAQs salvos com sucesso!" });
  };

  const saveContent = () => {
    localStorage.setItem('content', JSON.stringify(content));
    toast({ title: "Sucesso", description: "Conteúdo salvo com sucesso!" });
  };

  const saveContacts = () => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
    toast({ title: "Sucesso", description: "Contatos salvos com sucesso!" });
  };

  const saveStats = () => {
    localStorage.setItem('stats', JSON.stringify(stats));
    toast({ title: "Sucesso", description: "Estatísticas salvas com sucesso!" });
  };

  const saveUseCases = () => {
    localStorage.setItem('useCases', JSON.stringify(useCases));
    toast({ title: "Sucesso", description: "Casos de uso salvos com sucesso!" });
  };

  const saveThemeSettings = () => {
    localStorage.setItem('themeSettings', JSON.stringify(themeSettings));
    // Apply theme changes to CSS variables
    document.documentElement.style.setProperty('--primary-color', themeSettings.primaryColor);
    document.documentElement.style.setProperty('--secondary-color', themeSettings.secondaryColor);
    document.documentElement.style.setProperty('--tech-tertiary', themeSettings.techTertiary);
    toast({ title: "Sucesso", description: "Configurações de tema salvas!" });
  };

  const saveChatSettings = () => {
    localStorage.setItem('chatSettings', JSON.stringify(chatSettings));
    toast({ title: "Sucesso", description: "Configurações de chat salvas!" });
  };

  const saveFooterContent = () => {
    localStorage.setItem('footerContent', JSON.stringify(footerContent));
    toast({ title: "Sucesso", description: "Conteúdo do rodapé salvo!" });
  };

  const saveCustomSections = () => {
    localStorage.setItem('customSections', JSON.stringify(customSections));
    toast({ title: "Sucesso", description: "Seções personalizadas salvas!" });
  };

  const downloadLogo = () => {
    // Create SVG logo with Instagram-inspired gradient
    const svg = `
      <svg viewBox="0 0 120 40" xmlns="http://www.w3.org/2000/svg" width="240" height="80">
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style="stop-color:#6366f1;stop-opacity:1" />
            <stop offset="25%" style="stop-color:#8b5cf6;stop-opacity:1" />
            <stop offset="50%" style="stop-color:#ec4899;stop-opacity:1" />
            <stop offset="75%" style="stop-color:#f97316;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#10b981;stop-opacity:1" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        <!-- Sun rays -->
        <g transform="translate(20,20)" filter="url(#glow)">
          <path d="M0,-12 L2,-8 L0,-4 L-2,-8 Z" fill="url(#logoGradient)" opacity="0.8">
            <animateTransform attributeName="transform" type="rotate" values="0;360" dur="8s" repeatCount="indefinite"/>
          </path>
          <path d="M8.5,-8.5 L10.5,-6.5 L8.5,-4.5 L6.5,-6.5 Z" fill="url(#logoGradient)" opacity="0.6">
            <animateTransform attributeName="transform" type="rotate" values="0;360" dur="8s" repeatCount="indefinite"/>
          </path>
          <path d="M12,0 L8,2 L4,0 L8,-2 Z" fill="url(#logoGradient)" opacity="0.8">
            <animateTransform attributeName="transform" type="rotate" values="0;360" dur="8s" repeatCount="indefinite"/>
          </path>
          <path d="M8.5,8.5 L6.5,6.5 L8.5,4.5 L10.5,6.5 Z" fill="url(#logoGradient)" opacity="0.6">
            <animateTransform attributeName="transform" type="rotate" values="0;360" dur="8s" repeatCount="indefinite"/>
          </path>
          <path d="M0,12 L-2,8 L0,4 L2,8 Z" fill="url(#logoGradient)" opacity="0.8">
            <animateTransform attributeName="transform" type="rotate" values="0;360" dur="8s" repeatCount="indefinite"/>
          </path>
          <path d="M-8.5,8.5 L-6.5,6.5 L-8.5,4.5 L-10.5,6.5 Z" fill="url(#logoGradient)" opacity="0.6">
            <animateTransform attributeName="transform" type="rotate" values="0;360" dur="8s" repeatCount="indefinite"/>
          </path>
          <path d="M-12,0 L-8,-2 L-4,0 L-8,2 Z" fill="url(#logoGradient)" opacity="0.8">
            <animateTransform attributeName="transform" type="rotate" values="0;360" dur="8s" repeatCount="indefinite"/>
          </path>
          <path d="M-8.5,-8.5 L-10.5,-6.5 L-8.5,-4.5 L-6.5,-6.5 Z" fill="url(#logoGradient)" opacity="0.6">
            <animateTransform attributeName="transform" type="rotate" values="0;360" dur="8s" repeatCount="indefinite"/>
          </path>
          
          <!-- Central circle -->
          <circle cx="0" cy="0" r="4" fill="url(#logoGradient)" opacity="0.9"/>
        </g>
        
        <!-- Company name -->
        <text x="45" y="25" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="url(#logoGradient)">
          Deylith
        </text>
      </svg>
    `;

    const blob = new Blob([svg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'deylith-logo.svg';
    a.click();
    URL.revokeObjectURL(url);
    
    toast({ title: "Sucesso", description: "Logo baixada com sucesso!" });
  };

  // FAQ functions
  const addFAQ = () => {
    const newFAQ: FAQ = {
      id: Math.max(...faqs.map(f => f.id), 0) + 1,
      pergunta: '',
      resposta: ''
    };
    setFaqs([...faqs, newFAQ]);
  };

  const updateFAQ = (id: number, field: keyof FAQ, value: string) => {
    setFaqs(faqs.map(faq => 
      faq.id === id ? { ...faq, [field]: value } : faq
    ));
  };

  const deleteFAQ = (id: number) => {
    setFaqs(faqs.filter(faq => faq.id !== id));
  };

  // Contact functions
  const addContact = () => {
    const newContact: Contact = {
      id: Date.now().toString(),
      type: '',
      value: '',
      icon: '📞',
      label: ''
    };
    setContacts([...contacts, newContact]);
  };

  const updateContact = (id: string, field: keyof Contact, value: string) => {
    setContacts(contacts.map(contact => 
      contact.id === id ? { ...contact, [field]: value } : contact
    ));
  };

  const deleteContact = (id: string) => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  // Use case functions
  const addUseCase = () => {
    const newUseCase: UseCase = {
      title: '',
      description: '',
      results: ''
    };
    setUseCases([...useCases, newUseCase]);
  };

  const updateUseCase = (index: number, field: keyof UseCase, value: string) => {
    setUseCases(useCases.map((useCase, i) => 
      i === index ? { ...useCase, [field]: value } : useCase
    ));
  };

  const deleteUseCase = (index: number) => {
    setUseCases(useCases.filter((_, i) => i !== index));
  };

  // Icon upload handler
  const handleIconUpload = (contactId: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        updateContact(contactId, 'icon', result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Custom section functions
  const addCustomSection = () => {
    const newSection: CustomSection = {
      id: Date.now().toString(),
      title: '',
      content: '',
      backgroundColor: 'bg-background',
      textColor: 'text-foreground',
      showCard: true,
      enabled: true
    };
    setCustomSections([...customSections, newSection]);
  };

  const updateCustomSection = (id: string, field: keyof CustomSection, value: string | boolean) => {
    setCustomSections(customSections.map(section => 
      section.id === id ? { ...section, [field]: value } : section
    ));
  };

  const deleteCustomSection = (id: string) => {
    setCustomSections(customSections.filter(section => section.id !== id));
  };

  if (!mounted) {
    return null;
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <div className="min-h-screen bg-background text-foreground">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold gradient-text mb-4">
              Painel de Administração
            </h1>
            <p className="text-foreground/70">
              Configure o conteúdo do website Deylith.dev
            </p>
            <div className="flex justify-center gap-4 mt-4">
              <Button
                onClick={() => window.open('/', '_blank')}
                variant="outline"
                className="neon-glow"
              >
                <Eye className="w-4 h-4 mr-2" />
                Ver Site
              </Button>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid w-full grid-cols-8 glass-effect">
              <TabsTrigger value="faqs">FAQs</TabsTrigger>
              <TabsTrigger value="content">Conteúdo</TabsTrigger>
              <TabsTrigger value="contacts">Contatos</TabsTrigger>
              <TabsTrigger value="usecases">Casos de Uso</TabsTrigger>
              <TabsTrigger value="stats">Estatísticas</TabsTrigger>
              <TabsTrigger value="theme">Tema</TabsTrigger>
              <TabsTrigger value="sections">Seções</TabsTrigger>
              <TabsTrigger value="settings">Config</TabsTrigger>
            </TabsList>

            {/* FAQs Tab */}
            <TabsContent value="faqs" className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Gerenciar FAQs</h2>
                <div className="flex gap-2">
                  <Button onClick={addFAQ} className="daylight-gradient">
                    <Plus className="w-4 h-4 mr-2" />
                    Adicionar FAQ
                  </Button>
                  <Button onClick={saveFAQs} variant="outline" className="neon-glow">
                    <Save className="w-4 h-4 mr-2" />
                    Salvar
                  </Button>
                </div>
              </div>

              <div className="grid gap-4">
                {faqs.map((faq) => (
                  <Card key={faq.id} className="glass-effect tech-card">
                    <CardContent className="p-6">
                      <div className="grid gap-4">
                        <div>
                          <Label htmlFor={`pergunta-${faq.id}`}>Pergunta</Label>
                          <Input
                            id={`pergunta-${faq.id}`}
                            value={faq.pergunta}
                            onChange={(e) => updateFAQ(faq.id, 'pergunta', e.target.value)}
                            placeholder="Digite a pergunta..."
                          />
                        </div>
                        <div>
                          <Label htmlFor={`resposta-${faq.id}`}>Resposta</Label>
                          <Textarea
                            id={`resposta-${faq.id}`}
                            value={faq.resposta}
                            onChange={(e) => updateFAQ(faq.id, 'resposta', e.target.value)}
                            placeholder="Digite a resposta..."
                            rows={3}
                          />
                        </div>
                        <div className="flex justify-end">
                          <Button
                            onClick={() => deleteFAQ(faq.id)}
                            variant="destructive"
                            size="sm"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Content Tab */}
            <TabsContent value="content" className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Gerenciar Conteúdo</h2>
                <Button onClick={saveContent} variant="outline" className="neon-glow">
                  <Save className="w-4 h-4 mr-2" />
                  Salvar
                </Button>
              </div>

              {content && (
                <div className="grid gap-6">
                  <Card className="glass-effect tech-card">
                    <CardHeader>
                      <CardTitle>Seção Hero</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                      <div>
                        <Label>Título</Label>
                        <Input
                          value={content.hero.title}
                          onChange={(e) => setContent({
                            ...content,
                            hero: { ...content.hero, title: e.target.value }
                          })}
                        />
                      </div>
                      <div>
                        <Label>Destaque</Label>
                        <Input
                          value={content.hero.highlight}
                          onChange={(e) => setContent({
                            ...content,
                            hero: { ...content.hero, highlight: e.target.value }
                          })}
                        />
                      </div>
                      <div>
                        <Label>Subtítulo</Label>
                        <Textarea
                          value={content.hero.subtitle}
                          onChange={(e) => setContent({
                            ...content,
                            hero: { ...content.hero, subtitle: e.target.value }
                          })}
                        />
                      </div>
                      <div>
                        <Label>Texto do Botão</Label>
                        <Input
                          value={content.hero.ctaText}
                          onChange={(e) => setContent({
                            ...content,
                            hero: { ...content.hero, ctaText: e.target.value }
                          })}
                        />
                      </div>
                      <div>
                        <Label>Link WhatsApp</Label>
                        <Input
                          value={content.hero.ctaWhatsapp}
                          onChange={(e) => setContent({
                            ...content,
                            hero: { ...content.hero, ctaWhatsapp: e.target.value }
                          })}
                        />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="glass-effect tech-card">
                    <CardHeader>
                      <CardTitle>Seção Sobre</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                      <div>
                        <Label>Título</Label>
                        <Input
                          value={content.about.title}
                          onChange={(e) => setContent({
                            ...content,
                            about: { ...content.about, title: e.target.value }
                          })}
                        />
                      </div>
                      <div>
                        <Label>Descrição</Label>
                        <Textarea
                          value={content.about.description}
                          onChange={(e) => setContent({
                            ...content,
                            about: { ...content.about, description: e.target.value }
                          })}
                          rows={4}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </TabsContent>

            {/* Contacts Tab */}
            <TabsContent value="contacts" className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Gerenciar Contatos</h2>
                <div className="flex gap-2">
                  <Button onClick={addContact} className="daylight-gradient">
                    <Plus className="w-4 h-4 mr-2" />
                    Adicionar Contato
                  </Button>
                  <Button onClick={saveContacts} variant="outline" className="neon-glow">
                    <Save className="w-4 h-4 mr-2" />
                    Salvar
                  </Button>
                </div>
              </div>

              <div className="grid gap-4">
                {contacts.map((contact) => (
                  <Card key={contact.id} className="glass-effect tech-card">
                    <CardContent className="p-6">
                      <div className="grid gap-4 md:grid-cols-6">
                        <div>
                          <Label>Tipo</Label>
                          <Input
                            value={contact.type}
                            onChange={(e) => updateContact(contact.id, 'type', e.target.value)}
                            placeholder="whatsapp, email..."
                          />
                        </div>
                        <div>
                          <Label>Valor</Label>
                          <Input
                            value={contact.value}
                            onChange={(e) => updateContact(contact.id, 'value', e.target.value)}
                            placeholder="Número, email..."
                          />
                        </div>
                        <div>
                          <Label>Ícone</Label>
                          <div className="flex gap-2">
                            <Input
                              value={contact.icon}
                              onChange={(e) => updateContact(contact.id, 'icon', e.target.value)}
                              placeholder="📱, 📧..."
                              className="flex-1"
                            />
                            <Button
                              size="sm"
                              onClick={() => document.getElementById(`icon-upload-${contact.id}`)?.click()}
                              className="daylight-gradient"
                            >
                              <Upload className="w-4 h-4" />
                            </Button>
                            <input
                              id={`icon-upload-${contact.id}`}
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => handleIconUpload(contact.id, e)}
                            />
                          </div>
                        </div>
                        <div>
                          <Label>Label</Label>
                          <Input
                            value={contact.label}
                            onChange={(e) => updateContact(contact.id, 'label', e.target.value)}
                            placeholder="WhatsApp, Email..."
                          />
                        </div>
                        <div className="flex items-center justify-center">
                          {contact.icon.startsWith('data:') ? (
                            <img src={contact.icon} alt="Icon" className="w-8 h-8 rounded" />
                          ) : (
                            <span className="text-2xl">{contact.icon}</span>
                          )}
                        </div>
                        <div className="flex items-end">
                          <Button
                            onClick={() => deleteContact(contact.id)}
                            variant="destructive"
                            size="sm"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Use Cases Tab */}
            <TabsContent value="usecases" className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Gerenciar Casos de Uso</h2>
                <div className="flex gap-2">
                  <Button onClick={addUseCase} className="daylight-gradient">
                    <Plus className="w-4 h-4 mr-2" />
                    Adicionar Caso
                  </Button>
                  <Button onClick={saveUseCases} variant="outline" className="neon-glow">
                    <Save className="w-4 h-4 mr-2" />
                    Salvar
                  </Button>
                </div>
              </div>

              <div className="grid gap-4">
                {useCases.map((useCase, index) => (
                  <Card key={index} className="glass-effect tech-card">
                    <CardContent className="p-6">
                      <div className="grid gap-4">
                        <div>
                          <Label>Título</Label>
                          <Input
                            value={useCase.title}
                            onChange={(e) => updateUseCase(index, 'title', e.target.value)}
                            placeholder="Ex: E-commerce"
                          />
                        </div>
                        <div>
                          <Label>Descrição</Label>
                          <Textarea
                            value={useCase.description}
                            onChange={(e) => updateUseCase(index, 'description', e.target.value)}
                            placeholder="Descreva como a IA ajuda neste setor..."
                            rows={3}
                          />
                        </div>
                        <div>
                          <Label>Resultado</Label>
                          <Input
                            value={useCase.results}
                            onChange={(e) => updateUseCase(index, 'results', e.target.value)}
                            placeholder="Ex: 87% menos tempo de resposta"
                          />
                        </div>
                        <div className="flex justify-end">
                          <Button
                            onClick={() => deleteUseCase(index)}
                            variant="destructive"
                            size="sm"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Stats Tab */}
            <TabsContent value="stats" className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Gerenciar Estatísticas</h2>
                <Button onClick={saveStats} variant="outline" className="neon-glow">
                  <Save className="w-4 h-4 mr-2" />
                  Salvar
                </Button>
              </div>

              <Card className="glass-effect tech-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Estatísticas do Hero
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label>Empresas Atendidas</Label>
                    <Input
                      value={stats.companies}
                      onChange={(e) => setStats({ ...stats, companies: e.target.value })}
                      placeholder="200+"
                    />
                  </div>
                  <div>
                    <Label>Economia Média</Label>
                    <Input
                      value={stats.savings}
                      onChange={(e) => setStats({ ...stats, savings: e.target.value })}
                      placeholder="80%"
                    />
                  </div>
                  <div>
                    <Label>Disponibilidade</Label>
                    <Input
                      value={stats.availability}
                      onChange={(e) => setStats({ ...stats, availability: e.target.value })}
                      placeholder="24/7"
                    />
                  </div>
                  <div>
                    <Label>ROI Médio</Label>
                    <Input
                      value={stats.roi}
                      onChange={(e) => setStats({ ...stats, roi: e.target.value })}
                      placeholder="300%"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Theme Tab */}
            <TabsContent value="theme" className="space-y-4">
              <ThemeSettingsComponent
                themeSettings={themeSettings}
                setThemeSettings={setThemeSettings}
                onSave={saveThemeSettings}
              />
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings" className="space-y-4">
              <ChatSettingsComponent
                chatSettings={chatSettings}
                setChatSettings={setChatSettings}
                onSave={saveChatSettings}
                onDownloadLogo={downloadLogo}
              />
            </TabsContent>

            {/* New Custom Sections Tab */}
            <TabsContent value="sections" className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Seções Personalizadas</h2>
                <div className="flex gap-2">
                  <Button onClick={addCustomSection} className="daylight-gradient">
                    <Plus className="w-4 h-4 mr-2" />
                    Adicionar Seção
                  </Button>
                  <Button onClick={saveCustomSections} variant="outline" className="neon-glow">
                    <Save className="w-4 h-4 mr-2" />
                    Salvar
                  </Button>
                </div>
              </div>

              <div className="grid gap-4">
                {customSections.map((section) => (
                  <Card key={section.id} className="glass-effect tech-card">
                    <CardContent className="p-6">
                      <div className="grid gap-4">
                        <div className="flex items-center justify-between">
                          <Label>Seção Ativa</Label>
                          <Switch
                            checked={section.enabled}
                            onCheckedChange={(checked) => updateCustomSection(section.id, 'enabled', checked)}
                          />
                        </div>
                        <div>
                          <Label>Título</Label>
                          <Input
                            value={section.title}
                            onChange={(e) => updateCustomSection(section.id, 'title', e.target.value)}
                            placeholder="Título da seção..."
                          />
                        </div>
                        <div>
                          <Label>Conteúdo</Label>
                          <Textarea
                            value={section.content}
                            onChange={(e) => updateCustomSection(section.id, 'content', e.target.value)}
                            placeholder="Conteúdo da seção (HTML permitido)..."
                            rows={4}
                          />
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <Label>Cor de Fundo</Label>
                            <Input
                              value={section.backgroundColor}
                              onChange={(e) => updateCustomSection(section.id, 'backgroundColor', e.target.value)}
                              placeholder="bg-background"
                            />
                          </div>
                          <div>
                            <Label>Cor do Texto</Label>
                            <Input
                              value={section.textColor}
                              onChange={(e) => updateCustomSection(section.id, 'textColor', e.target.value)}
                              placeholder="text-foreground"
                            />
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Switch
                              checked={section.showCard}
                              onCheckedChange={(checked) => updateCustomSection(section.id, 'showCard', checked)}
                            />
                            <Label>Mostrar como Card</Label>
                          </div>
                          <Button
                            onClick={() => deleteCustomSection(section.id)}
                            variant="destructive"
                            size="sm"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Admin;
