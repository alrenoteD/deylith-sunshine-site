
import { useState, useEffect } from 'react';

interface ChatSettings {
  enabled: boolean;
  endpoint: string;
  welcomeMessage: string;
  embedCode: string;
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

export const useSettings = () => {
  const [chatSettings, setChatSettings] = useState<ChatSettings>({
    enabled: true,
    endpoint: '',
    welcomeMessage: 'Olá! Como posso ajudar você hoje?',
    embedCode: ''
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

  useEffect(() => {
    const savedChat = localStorage.getItem('chatSettings');
    if (savedChat) {
      setChatSettings(JSON.parse(savedChat));
    }

    const savedTheme = localStorage.getItem('themeSettings');
    if (savedTheme) {
      setThemeSettings(JSON.parse(savedTheme));
    }
  }, []);

  const saveChatSettings = (settings: ChatSettings) => {
    setChatSettings(settings);
    localStorage.setItem('chatSettings', JSON.stringify(settings));
  };

  const saveThemeSettings = (settings: ThemeSettings) => {
    setThemeSettings(settings);
    localStorage.setItem('themeSettings', JSON.stringify(settings));
    
    // Apply theme changes to CSS variables
    document.documentElement.style.setProperty('--primary-color', settings.primaryColor);
    document.documentElement.style.setProperty('--secondary-color', settings.secondaryColor);
    document.documentElement.style.setProperty('--tech-tertiary', settings.techTertiary);
  };

  return {
    chatSettings,
    themeSettings,
    saveChatSettings,
    saveThemeSettings
  };
};
