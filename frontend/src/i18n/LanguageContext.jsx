import React, { createContext, useContext, useState } from 'react';
import { en } from './en';
import { es } from './es';
import { pt } from './pt';

const allTranslations = { en, es, pt };
const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(() => localStorage.getItem('hik-lang') || 'en');

  const changeLang = (newLang) => {
    setLang(newLang);
    localStorage.setItem('hik-lang', newLang);
  };

  return (
    <LanguageContext.Provider value={{
      lang,
      t: allTranslations[lang] || allTranslations.en,
      changeLang,
      languages: [
        { code: 'en', label: 'EN' },
        { code: 'es', label: 'ES' },
        { code: 'pt', label: 'PT' }
      ]
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => useContext(LanguageContext);
