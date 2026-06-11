import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Globe, ChevronDown, Check } from "lucide-react";
import { SUPPORTED_LANGUAGES } from "@/i18n";

interface Props {
  variant?: "header" | "compact" | "mobile";
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

function setCookie(name: string, value: string) {
  const maxAge = 60 * 60 * 24 * 365;

  document.cookie = `${name}=${value};path=/;max-age=${maxAge}`;
  document.cookie = `${name}=${value};path=/;domain=${window.location.hostname};max-age=${maxAge}`;
}

function deleteCookie(name: string) {
  document.cookie = `${name}=;path=/;expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  document.cookie = `${name}=;path=/;domain=${window.location.hostname};expires=Thu, 01 Jan 1970 00:00:00 GMT`;
}

function switchWebsiteLanguage(code: string) {
  window.localStorage.setItem("site_translate_lang", code);

  // Keep the existing React i18n source text in English.
  // Google Translate will translate the whole page, including hard-coded text.
  window.localStorage.setItem("elevate_lang", "en");

  if (code === "en") {
    deleteCookie("googtrans");
  } else {
    const googleCode = GOOGLE_LANG_MAP[code] || code;
    setCookie("googtrans", `/en/${googleCode}`);
  }

  window.location.reload();
}

export function LanguageSelector({ variant = "header" }: Props) {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<string>("en");
  const [mounted, setMounted] = useState(false);
  const [pos, setPos] = useState<{ top: number; left: number; width: number } | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);

    const stored =
      typeof window !== "undefined"
        ? window.localStorage.getItem("site_translate_lang")
        : null;

    const initial =
      stored && SUPPORTED_LANGUAGES.some((l) => l.code === stored)
        ? stored
        : "en";

    setCurrent(initial);
  }, []);

  useLayoutEffect(() => {
    if (!open || !triggerRef.current) return;

    const compute = () => {
      const r = triggerRef.current!.getBoundingClientRect();
      const panelWidth =
        variant === "mobile"
          ? Math.min(Math.max(r.width, 260), window.innerWidth - 24)
          : 224;

      const vw = window.innerWidth;

      const left =
        variant === "mobile"
          ? Math.min(Math.max(12, r.left), vw - panelWidth - 12)
          : Math.min(Math.max(8, r.right - panelWidth), vw - panelWidth - 8);

      setPos({
        top: r.bottom + 8,
        left,
        width: panelWidth,
      });
    };

    compute();

    window.addEventListener("resize", compute);
    window.addEventListener("scroll", compute, true);

    return () => {
      window.removeEventListener("resize", compute);
      window.removeEventListener("scroll", compute, true);
    };
  }, [open, variant]);

  useEffect(() => {
    if (!open) return;

    const onClick = (e: MouseEvent) => {
      const target = e.target as Node;

      if (panelRef.current?.contains(target) || triggerRef.current?.contains(target)) {
        return;
      }

      setOpen(false);
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    window.addEventListener("mousedown", onClick);
    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("mousedown", onClick);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const active =
    SUPPORTED_LANGUAGES.find((l) => l.code === current) ?? SUPPORTED_LANGUAGES[0];

  const triggerClass =
    variant === "header"
      ? "inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/5 px-3 py-2 text-xs font-medium text-white/80 backdrop-blur transition hover:border-cyan/40 hover:bg-white/10 hover:text-white"
      : variant === "mobile"
        ? "flex w-full items-center justify-between gap-2 rounded-xl border border-cyan/25 bg-navy/90 px-4 py-3 text-sm font-semibold text-white shadow-[0_0_24px_-10px_rgba(6,182,212,0.8)] transition hover:border-cyan/50 hover:bg-navy"
        : "inline-flex items-center gap-1 rounded-full border border-border bg-background px-2.5 py-1.5 text-[11px] font-medium text-foreground transition hover:border-cyan/40 hover:text-cyan";

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={triggerClass}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Select language"
      >
        <Globe className="h-3.5 w-3.5" />
        <span>{variant === "compact" ? active.code.toUpperCase() : active.native}</span>
        <ChevronDown
          className={`h-3 w-3 opacity-70 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {mounted &&
        open &&
        pos &&
        createPortal(
          <div
            ref={panelRef}
            role="listbox"
            aria-label="Language"
            className="fixed z-[1000] max-h-[70vh] overflow-y-auto rounded-2xl border border-cyan/30 bg-[#0b1437]/98 p-1.5 shadow-[0_20px_60px_rgba(6,182,212,0.35)] backdrop-blur-xl animate-in fade-in slide-in-from-top-2"
            style={{
              top: pos.top,
              left: pos.left,
              width: pos.width,
            }}
          >
            {SUPPORTED_LANGUAGES.map((l) => {
              const isActive = l.code === current;

              return (
                <button
                  key={l.code}
                  type="button"
                  role="option"
                  aria-selected={isActive}
                  onClick={() => {
                    setCurrent(l.code);
                    setOpen(false);
                    switchWebsiteLanguage(l.code);
                  }}
                  className={`flex w-full items-center justify-between gap-2 rounded-xl px-3 py-2.5 text-left text-sm transition hover:bg-white/10 ${
                    isActive ? "bg-cyan/15 text-cyan" : "text-white/85"
                  }`}
                >
                  <span className="flex flex-col">
                    <span className="font-medium leading-tight">{l.native}</span>
                    <span className="text-[10px] uppercase tracking-wider text-white/40">
                      {l.label} · {l.code}
                    </span>
                  </span>

                  {isActive && <Check className="h-4 w-4 shrink-0 text-cyan" />}
                </button>
              );
            })}
          </div>,
          document.body,
        )}
    </>
  );
}
