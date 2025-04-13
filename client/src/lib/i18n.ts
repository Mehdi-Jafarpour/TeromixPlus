import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translations
import translationEN from '../locales/en/translation.json';
import translationKA from '../locales/ka/translation.json';

// the translations
const resources = {
  en: {
    translation: translationEN
  },
  ka: {
    translation: translationKA
  }
};

i18n
  // detect user language
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next
  .use(initReactI18next)
  // init i18next
  .init({
    resources,
    fallbackLng: 'en',
    debug: false, // set to true for development
    
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    
    // common namespace used around the app
    defaultNS: 'translation',
    
    // language detection options
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    }
  });

export default i18n;