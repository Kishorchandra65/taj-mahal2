import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
// import LanguageDetector from 'i18next-browser-languagedetector'; // You can remove this if you want to force Dutch

import en from './locales/en.json';
import nl from './locales/nl.json';
import de from './locales/de.json'; 

i18n
  // .use(LanguageDetector) // REMOVE this to stop auto-detecting English
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      nl: { translation: nl },
      de: { translation: de },
    },
    lng: 'nl', // <--- THIS FORCES DUTCH AS THE DEFAULT
    fallbackLng: 'nl', // Fallback to Dutch if a key is missing
    interpolation: {
      escapeValue: false,
    },
    // If you keep LanguageDetector, ensure it only checks localStorage, not 'navigator'
    // detection: {
    //   order: ['localStorage'],
    //   caches: ['localStorage'],
    // },
  });

export default i18n;