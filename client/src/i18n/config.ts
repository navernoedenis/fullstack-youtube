import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import { z } from "zod";
import { zodI18nMap } from "zod-i18n-map";

import zodGermanyLanguage from "zod-i18n-map/locales/de/zod.json";
import zodEnglishLanguage from "zod-i18n-map/locales/en/zod.json";
import zodFranceLanguage from "zod-i18n-map/locales/fr/zod.json";

import GermanyLanguage from "./de/translation.json";
import EnglishLanguage from "./en/translation.json";
import FranceLanguage from "./fr/translation.json";
import UkraineLanguage from "./uk/translation.json";

export type Language = "de" | "en" | "fr" | "uk";

export const languages: Record<Language, string> = {
  de: "Germany",
  en: "English",
  fr: "France",
  uk: "Ukrainian",
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    detection: {
      caches: ["localStorage"],
      lookupLocalStorage: "i18nextLng",
      order: ["localStorage"],
    },
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    resources: {
      de: { translation: GermanyLanguage, zod: zodGermanyLanguage },
      en: { translation: EnglishLanguage, zod: zodEnglishLanguage },
      fr: { translation: FranceLanguage, zod: zodFranceLanguage },
      uk: { translation: UkraineLanguage, zod: zodEnglishLanguage },
    },
  });

z.setErrorMap(zodI18nMap);

export default i18n;
