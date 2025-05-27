
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Palette, Save } from 'lucide-react';

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

interface ThemeSettingsProps {
  themeSettings: ThemeSettings;
  setThemeSettings: (settings: ThemeSettings) => void;
  onSave: () => void;
}

const ThemeSettingsComponent: React.FC<ThemeSettingsProps> = ({
  themeSettings,
  setThemeSettings,
  onSave
}) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Personalização Visual</h2>
        <Button onClick={onSave} variant="outline" className="neon-glow">
          <Save className="w-4 h-4 mr-2" />
          Salvar Tema
        </Button>
      </div>

      <Card className="glass-effect tech-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="w-5 h-5" />
            Cores Principais
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-3">
          <div>
            <Label>Cor Primária</Label>
            <Input
              type="color"
              value={themeSettings.primaryColor}
              onChange={(e) => setThemeSettings({ ...themeSettings, primaryColor: e.target.value })}
            />
          </div>
          <div>
            <Label>Cor Secundária</Label>
            <Input
              type="color"
              value={themeSettings.secondaryColor}
              onChange={(e) => setThemeSettings({ ...themeSettings, secondaryColor: e.target.value })}
            />
          </div>
          <div>
            <Label>Cor Terciária</Label>
            <Input
              type="color"
              value={themeSettings.techTertiary}
              onChange={(e) => setThemeSettings({ ...themeSettings, techTertiary: e.target.value })}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="glass-effect tech-card">
        <CardHeader>
          <CardTitle>Robô Virtual</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <div>
            <Label>Cor Primária do Robô</Label>
            <Input
              type="color"
              value={themeSettings.robotPrimaryColor}
              onChange={(e) => setThemeSettings({ ...themeSettings, robotPrimaryColor: e.target.value })}
            />
          </div>
          <div>
            <Label>Cor Secundária do Robô</Label>
            <Input
              type="color"
              value={themeSettings.robotSecondaryColor}
              onChange={(e) => setThemeSettings({ ...themeSettings, robotSecondaryColor: e.target.value })}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="glass-effect tech-card">
        <CardHeader>
          <CardTitle>Efeitos Visuais</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <Switch
              id="neon-effects"
              checked={themeSettings.neonEnabled}
              onCheckedChange={(checked) => setThemeSettings({ ...themeSettings, neonEnabled: checked })}
            />
            <Label htmlFor="neon-effects">Ativar Efeitos Neon</Label>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ThemeSettingsComponent;
