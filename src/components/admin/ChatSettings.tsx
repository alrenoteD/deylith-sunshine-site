
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { MessageCircle, Save, Download, Info } from 'lucide-react';

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
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
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
            <div className="flex items-center gap-2 mb-2">
              <Label>Código Embed do Chat</Label>
              <Info className="w-4 h-4 text-blue-500" />
            </div>
            <Textarea
              value={chatSettings.embedCode}
              onChange={(e) => setChatSettings({ ...chatSettings, embedCode: e.target.value })}
              placeholder='Exemplo: <iframe src="https://widget.intercom.io/widget/..." width="100%" height="400"></iframe>'
              rows={4}
              className="font-mono text-sm"
            />
            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg mt-2">
              <p className="text-xs text-blue-700 dark:text-blue-300 mb-2">
                <strong>Como usar o código embed:</strong>
              </p>
              <ul className="text-xs text-blue-600 dark:text-blue-400 space-y-1">
                <li>• Para Tawk.to: Copie o código JavaScript fornecido</li>
                <li>• Para Intercom: Use o iframe do widget</li>
                <li>• Para Zendesk: Cole o snippet do Web Widget</li>
                <li>• Para Crisp: Insira o código de instalação</li>
              </ul>
              <p className="text-xs text-blue-600 dark:text-blue-400 mt-2">
                Se preenchido, substituirá o chat interno e mostrará seu widget externo.
              </p>
            </div>
          </div>

          <div>
            <Label>Mensagem de Boas-vindas</Label>
            <Textarea
              value={chatSettings.welcomeMessage}
              onChange={(e) => setChatSettings({ ...chatSettings, welcomeMessage: e.target.value })}
              rows={2}
              placeholder="Olá! Como posso ajudar você hoje?"
            />
            <p className="text-xs text-foreground/60 mt-1">
              Usada apenas quando não há código embed configurado
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChatSettingsComponent;
