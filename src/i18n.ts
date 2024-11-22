import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Import translation files directly
import en from "../public/locales/en/translation.json";
import it from "../public/locales/it/translation.json";
import es from "../public/locales/es/translation.json";
import fr from "../public/locales/fr/translation.json";

i18n
  .use(LanguageDetector) // Automatically detect language
  .use(initReactI18next) // Connects i18next with React
  .init({
    fallbackLng: "en", // Default language
    supportedLngs: ["en", "it","es","fr"], // Supported languages
    debug: true, // Enable debug mode
    interpolation: {
      escapeValue: false // React handles escaping
    },
    resources: {
      en: { translation: en }, // Directly load translations
      it: { translation: it },
      es: { translation: es },
      fr: { translation: fr },

    },
    detection: {
      order: ["querystring", "cookie", "localStorage", "navigator", "htmlTag"], // Order of detection
      caches: ["cookie"] // Cache user language in cookies
    }
  });

export default i18n;
