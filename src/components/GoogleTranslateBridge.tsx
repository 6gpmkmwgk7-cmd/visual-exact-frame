import { useEffect } from "react";
import { applyLanguage } from "@/i18n";

function getSavedLanguage() {
  if (typeof window === "undefined") return "en";
  return window.localStorage.getItem("site_translate_lang") || "en";
}

export function GoogleTranslateBridge() {
  useEffect(() => {
    applyLanguage(getSavedLanguage());
  }, []);

  return null;
}
