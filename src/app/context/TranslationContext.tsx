'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from 'react';
import en from '../translations/en.json';
import el from '../translations/el.json';

type Language = 'en' | 'el';
const translations = { en, el };

interface TranslationContextProps {
  language: Language;
  changeLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const TranslationContext = createContext<TranslationContextProps | undefined>(undefined);

export const TranslationProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('el');

  useEffect(() => {
    const pathLocale = window.location.pathname.split('/')[1];
    if (pathLocale === 'el' || pathLocale === 'en') {
      setLanguage(pathLocale);
      localStorage.setItem('language', pathLocale);
    } else {
      const saved = localStorage.getItem('language');
      if (saved === 'el' || saved === 'en') {
        setLanguage(saved);
      }
    }
  }, []);
  

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const t = useCallback((key: string): string => {
    const langDict = translations[language] || en;
    const keys = key.split('.');
    let result: unknown = langDict;

    for (const k of keys) {
        if (typeof result === 'object' && result !== null && k in result) {
          result = (result as Record<string, unknown>)[k];
        } else {
          return key;
        }
      }
      
      return typeof result === 'string' ? result : key;
  }, [language]);

  return (
    <TranslationContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
};
