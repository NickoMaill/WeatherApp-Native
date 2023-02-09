import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import langResource from './fr/fr.json';

export const resources = {
    fr: {
        translation: langResource
    }
}

i18n.use(initReactI18next).init({
    compatibilityJSON: 'v3',
    resources,
    lng: 'fr',
    fallbackLng: 'fr',
    interpolation: {
      escapeValue: false,
    },
});