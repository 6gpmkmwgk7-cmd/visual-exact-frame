import { useEffect } from "react";
import { useLocation } from "@tanstack/react-router";
import i18n from "@/i18n";

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: any;
  }
}

const GOOGLE_LANG_MAP: Record<string, string> = {
  en: "en",
  fr: "fr",
  es: "es",
  ar: "ar",
  ur: "ur",
  hi: "hi",
  bn: "bn",
  zh: "zh-CN",
};

function getSelectedLanguage() {
  if (typeof window === "undefined") return "en";
  return window.localStorage.getItem("site_translate_lang") || "en";
}

function applySelectedLanguageToWidget() {
  const selected = getSelectedLanguage();

  if (selected === "en") return;

  const googleCode = GOOGLE_LANG_MAP[selected] || selected;

  window.setTimeout(() => {
    const combo = document.querySelector(".goog-te-combo") as HTMLSelectElement | null;

    if (combo) {
      combo.value = googleCode;
      combo.dispatchEvent(new Event("change"));
    }
  }, 700);
}

export function GoogleTranslateBridge() {
  const location = useLocation();

  useEffect(() => {
    // Keep the React i18n layer in English.
    // Google Translate handles the full page, including hard-coded homepage/page text.
    window.localStorage.setItem("elevate_lang", "en");
    i18n.changeLanguage("en");

    document.documentElement.lang = "en";
    document.documentElement.dir = "ltr";

    window.googleTranslateElementInit = () => {
      if (!window.google?.translate?.TranslateElement) return;

      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "en,fr,es,ar,ur,hi,bn,zh-CN",
          autoDisplay: false,
        },
        "google_translate_element"
      );

      applySelectedLanguageToWidget();
    };

    if (!document.getElementById("google-translate-script")) {
      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src =
        "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    } else {
      applySelectedLanguageToWidget();
    }
  }, []);

  useEffect(() => {
    applySelectedLanguageToWidget();
  }, [location.pathname]);

  return (
    <>
      <div id="google_translate_element" />

      <style>{`
        #google_translate_element {
          position: fixed;
          left: -9999px;
          top: -9999px;
          height: 0;
          width: 0;
          overflow: hidden;
        }

        .goog-te-banner-frame,
        .goog-te-banner-frame.skiptranslate,
        .goog-te-gadget,
        .goog-te-gadget-icon {
          display: none !important;
        }

        body {
          top: 0 !important;
        }

        body > .skiptranslate {
          display: none !important;
        }
      `}</style>
    </>
  );
}
