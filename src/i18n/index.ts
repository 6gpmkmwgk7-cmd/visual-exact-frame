import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { resources } from "./resources";

export const SUPPORTED_LANGUAGES = [
  { code: "en", label: "English", native: "English" },
  { code: "fr", label: "French", native: "Français" },
  { code: "es", label: "Spanish", native: "Español" },
  { code: "ar", label: "Arabic", native: "العربية" },
  { code: "ur", label: "Urdu", native: "اردو" },
  { code: "hi", label: "Hindi", native: "हिन्दी" },
  { code: "bn", label: "Bengali", native: "বাংলা" },
  { code: "zh", label: "Chinese", native: "中文" },
] as const;

export const RTL_LANGUAGES = ["ar", "ur"];

const getSavedLanguage = () => {
  if (typeof window === "undefined") return "en";

  const savedLanguage = window.localStorage.getItem("site_translate_lang");

  const isSupported = SUPPORTED_LANGUAGES.some(
    (language) => language.code === savedLanguage
  );

  return isSupported && savedLanguage ? savedLanguage : "en";
};

const initialLanguage = getSavedLanguage();

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources,
    lng: initialLanguage,
    fallbackLng: "en",
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
  });
}

export function applyLanguage(lng: string) {
  i18n.changeLanguage(lng);

  if (typeof document !== "undefined") {
    document.documentElement.lang = lng;
    document.documentElement.dir = RTL_LANGUAGES.includes(lng) ? "rtl" : "ltr";
  }

  if (typeof window !== "undefined") {
    window.localStorage.setItem("site_translate_lang", lng);
  }
}

if (typeof document !== "undefined") {
  document.documentElement.lang = initialLanguage;
  document.documentElement.dir = RTL_LANGUAGES.includes(initialLanguage)
    ? "rtl"
    : "ltr";
}

export default i18n;
