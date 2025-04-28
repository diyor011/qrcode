import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Tarjima fayllarni import qilamiz
import uzTranslation from './locales/uz/translation.json';
import ruTranslation from './locales/ru/translation.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      uz: {
        translation: uzTranslation
      },
      ru: {
        translation: ruTranslation
      }
    },
    lng: 'ru', // 👉 Default til: O'zbek tili
    fallbackLng: 'ru', // 👉 Agar til topilmasa, O'zbek tili ishlatiladi
    interpolation: {
      escapeValue: false // React uchun escapeValue kerak emas
    }
  });

export default i18n;
