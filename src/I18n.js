import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Tarjima fayllarni import qilamiz
import uzTranslation from './locales/uz/translation.json';
import ruTranslation from './locales/ru/translation.json';
import enTranslation from './locales/en/translation.json';
import arTranslation from './locales/ar/translation.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      uz: { translation: uzTranslation },
      ru: { translation: ruTranslation },
      en: { translation: enTranslation },
      ar: { translation: arTranslation },
    },
    lng: 'en', // Boshlang‘ich til
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    }
  });

export default i18n;
