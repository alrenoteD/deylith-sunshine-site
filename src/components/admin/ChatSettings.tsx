
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { MessageCircle, Save, Download } from 'lucide-react';

interface ChatSettings {
  enabled: boolean;
  endpoint: string;
  welcomeMessage: string;
  embedCode: string;
}

interface ChatSettingsProps {
  chatSettings: ChatSettings;
  setChatSettings: (settings: ChatSettings) => void;
  onSave: () => void;
  onDownloadLogo: () => void;
}

const ChatSettingsComponent: React.FC<ChatSettingsProps> = ({
  chatSettings,
  setChatSettings,
  onSave,
  onDownloadLogo
}) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Configurações</h2>
        <div className="flex gap-2">
          <Button onClick={onDownloadLogo} variant="outline" className="neon-glow">
            <Download className="w-4 h-4 mr-2" />
            Baixar Logo
          </Button>
          <Button onClick={onSave} variant="outline" className="neon-glow">
            <Save className="w-4 h-4 mr-2" />
            Salvar Config
          </Button>
        </div>
      </div>

      <Card className="glass-effect tech-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5" />
            Chat com IA
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Switch
              id="chat-enabled"
              checked={chatSettings.enabled}
              onCheckedChange={(checked) => setChatSettings({ ...chatSettings, enabled: checked })}
            />
            <Label htmlFor="chat-enabled">Ativar Chat com IA no Robô</Label>
          </div>
          <div>
            <Label>Endpoint da IA</Label>
            <Input
              value={chatSettings.endpoint}
              onChange={(e) => setChatSettings({ ...chatSettings, endpoint: e.target.value })}
              placeholder="https://api.openai.com/v1/chat/completions"
            />
            <p className="text-xs text-foreground/60 mt-1">
              Configure o endpoint do seu serviço de IA (OpenAI, Claude, etc.)
            </p>
          </div>
          <div>
            <Label>Código Embed do Chat</Label>
            <Textarea
              value={chatSettings.embedCode}
              onChange={(e) => setChatSettings({ ...chatSettings, embedCode: e.target.value })}
              placeholder="Cole aqui o código embed do seu chat (iframe, script, etc.)"
              rows={4}
            />
            <p className="text-xs text-foreground/60 mt-1">
              Código HTML para incorporar um chat externo (Tawk.to, Intercom, etc.)
            </p>
          </div>
          <div>
            <Label>Mensagem de Boas-vindas</Label>
            <Textarea
              value={chatSettings.welcomeMessage}
              onChange={(e) => setChatSettings({ ...chatSettings, welcomeMessage: e.target.value })}
              rows={2}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChatSettingsComponent;
