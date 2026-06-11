import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Menu, X, LogIn, UserPlus, Sparkles } from "lucide-react";
import logo from "@/assets/logo.png";
import { AuthModal } from "@/components/AuthModal";
import { LanguageSelector } from "@/components/LanguageSelector";

const nav = [
  { to: "/", key: "nav.home" },
  { to: "/ai-solutions", key: "nav.ai_solutions" },
  { to: "/services", key: "nav.services" },
  { to: "/pricing", key: "nav.pricing" },
  { to: "/free-audit", key: "nav.free_audit" },
  { to: "/about", key: "nav.about" },
  { to: "/contact", key: "nav.contact" },
] as const;

export function SiteHeader() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup" | null>(null);

  return (
    <>
      <header className="sticky top-0 z-50">
        <div className="relative overflow-hidden border-b border-white/10 bg-[radial-gradient(ellipse_at_top_left,#1e3a8a_0%,transparent_55%),radial-gradient(ellipse_at_top_right,#4c1d95_0%,transparent_55%),linear-gradient(135deg,#020617_0%,#0b1437_50%,#0a0f2c_100%)]">
          <div className="absolute inset-0 grid-pattern opacity-[0.07] pointer-events-none" />
          <div className="absolute -left-24 top-1/2 -translate-y-1/2 h-56 w-56 rounded-full bg-cyan/25 blur-[90px] pointer-events-none" />
          <div className="absolute left-1/2 -top-20 h-48 w-[40rem] -translate-x-1/2 rounded-full bg-blue-500/15 blur-[100px] pointer-events-none" />
          <div className="absolute -right-24 top-1/2 -translate-y-1/2 h-56 w-56 rounded-full bg-purple/25 blur-[90px] pointer-events-none" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan/40 to-transparent" />

          <div className="relative mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-5 md:py-7">
            <Link to="/" className="group flex items-center gap-5 md:gap-7 min-w-0">
              <span className="relative shrink-0">
                <span
                  aria-hidden
                  className="absolute -inset-[3px] rounded-full opacity-80 blur-[2px] transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background:
                      "conic-gradient(from 0deg, #06B6D4, #2563EB, #8B5CF6, #06B6D4)",
                  }}
                />

                <img
                  src={logo}
                  alt="Elevate Social Agency"
                  className="relative h-[72px] w-[72px] md:h-[88px] md:w-[88px] object-contain bg-white p-2 rounded-full ring-1 ring-white/40 shadow-[0_8px_40px_-4px_rgba(6,182,212,0.55)] transition-all duration-500 group-hover:scale-[1.04] group-hover:shadow-[0_10px_60px_-4px_rgba(6,182,212,0.75)] animate-logo-in"
                />

                <span className="pointer-events-none absolute -inset-2 rounded-full ring-2 ring-cyan/20 animate-ping-soft" />
              </span>

              <span className="flex flex-col leading-none min-w-0">
                <span className="font-display text-[2rem] sm:text-4xl md:text-[2.75rem] font-black tracking-tight text-white drop-shadow-[0_2px_18px_rgba(6,182,212,0.25)]">
                  <span className="text-white">Elevate</span>{" "}
                  <span
                    style={{
                      background:
                        "linear-gradient(95deg, #22D3EE 0%, #60A5FA 40%, #A78BFA 75%, #22D3EE 100%)",
                      backgroundSize: "200% 100%",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      color: "transparent",
                    }}
                  >
                    Socials
                  </span>
                </span>

                <span className="mt-2.5 flex items-center gap-2.5">
                  <span className="text-[11px] font-bold uppercase tracking-[0.32em] text-white/60">
                    {t("header.agency")}
                  </span>

                  <span className="h-3 w-px bg-white/20" />

                  <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan/40 bg-gradient-to-r from-cyan/15 via-blue-500/10 to-purple/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-cyan-200 shadow-[0_0_18px_-4px_rgba(6,182,212,0.6)] backdrop-blur">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan/70 opacity-75" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-cyan" />
                    </span>

                    <Sparkles className="h-2.5 w-2.5" /> {t("header.ai_powered")}
                  </span>
                </span>

                <span className="mt-2 hidden text-[11px] font-medium tracking-wide text-white/45 md:block">
                  {t("header.tagline")}
                </span>
              </span>
            </Link>

            <div className="hidden items-center gap-2 lg:flex shrink-0">
              <LanguageSelector />

              <button
                onClick={() => setAuthMode("login")}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/5 px-4 py-2.5 text-sm font-medium text-white/80 backdrop-blur transition hover:border-cyan/40 hover:bg-white/10 hover:text-white"
              >
                <LogIn className="h-3.5 w-3.5" /> {t("cta.sign_in")}
              </button>

              <Link
                to="/free-audit"
                className="btn-premium inline-flex items-center gap-1.5 rounded-full bg-gradient-gold px-5 py-2.5 text-sm font-bold text-white shadow-glow transition hover:scale-105"
              >
                {t("cta.book_free_audit")}
              </Link>
            </div>

            <button
              onClick={() => setOpen(!open)}
              className="relative flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white shadow-[0_0_20px_-6px_rgba(6,182,212,0.6)] backdrop-blur transition hover:border-cyan/50 hover:bg-white/10 lg:hidden"
              aria-label="Menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <div className="bg-background/95 border-b border-border/60 backdrop-blur-lg">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
            <nav className="hidden items-center gap-1 lg:flex">
              {nav.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  className="relative px-4 py-3.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:scale-x-0 after:bg-gradient-gold after:transition-transform hover:after:scale-x-100"
                  activeProps={{
                    className: "text-foreground after:scale-x-100",
                  }}
                  activeOptions={{ exact: n.to === "/" }}
                >
                  {t(n.key)}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2 py-2 lg:hidden">
              <button
                onClick={() => setAuthMode("login")}
                className="inline-flex items-center gap-1 rounded-full border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground"
              >
                <LogIn className="h-3 w-3" /> {t("cta.sign_in")}
              </button>

              <button
                onClick={() => setAuthMode("signup")}
                className="inline-flex items-center gap-1 rounded-full bg-gradient-gold px-3 py-1.5 text-xs font-semibold text-white"
              >
                <UserPlus className="h-3 w-3" /> {t("cta.sign_up")}
              </button>
            </div>

            <Link
              to="/free-audit"
              className="hidden rounded-full bg-navy text-white border border-cyan/30 px-5 py-2 text-xs font-semibold tracking-wide transition hover:shadow-glow hover:border-cyan/60 lg:inline-flex"
            >
              {t("cta.free_ai_audit")}
            </Link>
          </div>
        </div>

        {open && (
          <div className="relative z-[70] border-b border-border bg-background/98 backdrop-blur-lg lg:hidden">
            <div className="flex flex-col px-6 py-4">
              <div className="mb-4 rounded-2xl border border-cyan/20 bg-gradient-to-br from-navy/95 to-[#0b1437]/95 p-3 shadow-[0_16px_45px_-24px_rgba(6,182,212,0.9)]">
                <div className="mb-2 text-[11px] font-bold uppercase tracking-[0.22em] text-cyan/80">
                  {t("lang.label")}
                </div>

                <LanguageSelector variant="mobile" />
              </div>

              {nav.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  onClick={() => setOpen(false)}
                  className="border-b border-border/40 py-3 text-sm font-medium last:border-0"
                >
                  {t(n.key)}
                </Link>
              ))}

              <div className="mt-4 flex flex-col gap-2">
                <button
                  onClick={() => {
                    setOpen(false);
                    setAuthMode("login");
                  }}
                  className="inline-flex items-center justify-center gap-1.5 rounded-full border border-border px-5 py-2.5 text-sm font-medium"
                >
                  <LogIn className="h-3.5 w-3.5" /> {t("cta.sign_in")}
                </button>

                <button
                  onClick={() => {
                    setOpen(false);
                    setAuthMode("signup");
                  }}
                  className="inline-flex items-center justify-center gap-1.5 rounded-full bg-gradient-gold px-5 py-2.5 text-sm font-semibold text-white shadow-glow"
                >
                  <UserPlus className="h-3.5 w-3.5" /> {t("cta.sign_up_free")}
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {authMode && (
        <AuthModal defaultMode={authMode} onClose={() => setAuthMode(null)} />
      )}
    </>
  );
}
