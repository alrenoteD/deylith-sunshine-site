
import { useState, useEffect } from 'react';
import { ThemeProvider } from 'next-themes';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Trash2, Settings, Save, Eye, Upload, BarChart3 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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

const Admin = () => {
  const [mounted, setMounted] = useState(false);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [content, setContent] = useState<Content | null>(null);
  const [stats, setStats] = useState<Stats>({
    companies: '200+',
    savings: '80%',
    roi: '300%',
    availability: '24/7'
  });
  const [activeTab, setActiveTab] = useState('faqs');
  const { toast } = useToast();

  useEffect(() => {
    setMounted(true);
    loadData();
  }, []);

  const loadData = async () => {
    try {
      // Simular carregamento dos dados (em produção, viria de uma API)
      const faqsData = await import('../data/faqs.json');
      const contentData = await import('../data/content.json');
      
      setFaqs(faqsData.default);
      setContent(contentData.default);
      
      // Simular dados de contato
      setContacts([
        { id: '1', type: 'whatsapp', value: '5548992111496', icon: '📱', label: 'WhatsApp' },
        { id: '2', type: 'email', value: 'maycondouglas@deylith.dev', icon: '📧', label: 'Email' },
        { id: '3', type: 'website', value: 'deylith.dev', icon: '🌐', label: 'Website' },
        { id: '4', type: 'location', value: 'Içara, SC - Atendimento Mundial', icon: '📍', label: 'Localização' },
      ]);

      // Carregar stats salvos
      const savedStats = localStorage.getItem('stats');
      if (savedStats) {
        setStats(JSON.parse(savedStats));
      }
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
    toast({
      title: "Sucesso",
      description: "FAQs salvos com sucesso!"
    });
  };

  const saveContent = () => {
    localStorage.setItem('content', JSON.stringify(content));
    toast({
      title: "Sucesso",
      description: "Conteúdo salvo com sucesso!"
    });
  };

  const saveContacts = () => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
    toast({
      title: "Sucesso",
      description: "Contatos salvos com sucesso!"
    });
  };

  const saveStats = () => {
    localStorage.setItem('stats', JSON.stringify(stats));
    toast({
      title: "Sucesso",
      description: "Estatísticas salvas com sucesso!"
    });
  };

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

  const handleIconUpload = (contactId: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Em produção, você faria upload para um servidor
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        updateContact(contactId, 'icon', imageUrl);
      };
      reader.readAsDataURL(file);
    }
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
            <TabsList className="grid w-full grid-cols-5 glass-effect">
              <TabsTrigger value="faqs">FAQs</TabsTrigger>
              <TabsTrigger value="content">Conteúdo</TabsTrigger>
              <TabsTrigger value="contacts">Contatos</TabsTrigger>
              <TabsTrigger value="stats">Estatísticas</TabsTrigger>
              <TabsTrigger value="settings">Configurações</TabsTrigger>
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

            {/* Settings Tab */}
            <TabsContent value="settings" className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Configurações</h2>
              </div>

              <Card className="glass-effect tech-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    Configurações Gerais
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-foreground/70">
                    Configurações avançadas e integrações serão implementadas em versões futuras.
                  </p>
                  <div className="grid gap-4">
                    <div>
                      <Label>URL da API</Label>
                      <Input placeholder="https://api.deylith.dev" disabled />
                    </div>
                    <div>
                      <Label>Chave de API</Label>
                      <Input type="password" placeholder="sk-..." disabled />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Admin;
