import React, { createContext, useContext, useEffect, useState } from 'react';
import { en } from './en';
import { es } from './es';
import { pt } from './pt';

const allTranslations = { en, es, pt };
const SUPPORTED = ['en', 'es', 'pt'];

const detectInitialLang = () => {
  try {
    const saved = localStorage.getItem('hik-lang');
    if (saved && SUPPORTED.includes(saved)) return saved;
    const browser = (navigator.language || navigator.userLanguage || 'en').slice(0, 2).toLowerCase();
    if (SUPPORTED.includes(browser)) return browser;
  } catch (e) { /* no-op */ }
  return 'en';
};

const LanguageContext = createContext(null);

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(detectInitialLang);

  useEffect(() => {
    try {
      localStorage.setItem('hik-lang', lang);
      document.documentElement.lang = lang;
    } catch (e) { /* no-op */ }
  }, [lang]);

  const changeLang = (newLang) => {
    if (SUPPORTED.includes(newLang)) setLang(newLang);
  };

  return (
    <LanguageContext.Provider value={{
      lang,
      t: allTranslations[lang] || allTranslations.en,
      changeLang,
      languages: [
        { code: 'en', label: 'EN', flag: '🇬🇧', name: 'English' },
        { code: 'es', label: 'ES', flag: '🇪🇸', name: 'Español' },
        { code: 'pt', label: 'PT', flag: '🇧🇷', name: 'Português' }
      ]
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useTranslation must be used within a LanguageProvider');
  return ctx;
};
