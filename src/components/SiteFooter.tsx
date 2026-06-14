import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Mail, ShieldCheck } from "lucide-react";
import { useTranslation } from "react-i18next";
import logo from "@/assets/logo.png";

export function SiteFooter() {
  const { t } = useTranslation();
  return (
    <footer className="relative overflow-hidden bg-navy text-white/80">
      <div className="absolute inset-0 grid-pattern opacity-10" />
      <div className="absolute -top-32 left-1/4 h-72 w-72 rounded-full bg-electric/10 blur-3xl" />
      <div className="absolute -bottom-32 right-1/4 h-72 w-72 rounded-full bg-purple/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3">
              <img src={logo} alt="Elevate Social Agency" className="h-14 w-14 rounded-full object-contain bg-white p-1 ring-2 ring-cyan/30" />
              <span className="font-display text-xl font-bold text-white">
                Elevate <span className="text-gradient">Social</span>
              </span>
            </div>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-white/70">
              {t("footer.tagline")}
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a href="https://www.instagram.com/elevates_social?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                 className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition hover:border-cyan/40 hover:bg-cyan/10 hover:text-cyan">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="https://www.facebook.com/profile.php?id=61590247691371" target="_blank" rel="noopener noreferrer" aria-label="Facebook"
                 className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition hover:border-cyan/40 hover:bg-cyan/10 hover:text-cyan">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="mailto:socialselavates@gmail.com" aria-label="Email"
                 className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition hover:border-cyan/40 hover:bg-cyan/10 hover:text-cyan">
                <Mail className="h-4 w-4" />
                              </a>
            </div>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-cyan/30 bg-cyan/10 px-3 py-1.5 text-xs font-medium text-cyan">
              <ShieldCheck className="h-3.5 w-3.5" /> {t("footer.secure")}
            </div>
          </div>

          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-white">{t("footer.company")}</h4>
            <ul className="mt-5 space-y-3 text-sm">
              <li><Link to="/about" className="transition hover:text-cyan">{t("footer.about")}</Link></li>
              <li><Link to="/services" className="transition hover:text-cyan">{t("footer.services")}</Link></li>
              <li><Link to="/case-studies" className="transition hover:text-cyan">{t("footer.case_studies")}</Link></li>
              <li><Link to="/pricing" className="transition hover:text-cyan">{t("footer.pricing")}</Link></li>
              <li><Link to="/contact" className="transition hover:text-cyan">{t("footer.contact")}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-white">{t("footer.get_started")}</h4>
            <ul className="mt-5 space-y-3 text-sm">
              <li><Link to="/free-audit" className="transition hover:text-cyan">{t("footer.free_ai_audit")}</Link></li>
              <li><Link to="/contact" className="transition hover:text-cyan">{t("footer.book_consultation")}</Link></li>
              <li><Link to="/privacy" className="transition hover:text-cyan">{t("footer.privacy")}</Link></li>
              <li><Link to="/terms" className="transition hover:text-cyan">{t("footer.terms")}</Link></li>
            </ul>
            <Link
              to="/free-audit"
              className="mt-6 inline-flex rounded-full bg-gradient-gold px-5 py-2.5 text-sm font-bold text-white shadow-glow transition hover:scale-105"
            >
              {t("cta.book_free_audit_short")}
            </Link>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-white/50 md:flex-row">
          <p>{t("footer.copyright")}</p>
          <div className="flex items-center gap-5">
            <Link to="/privacy" className="hover:text-cyan">{t("footer.privacy_short")}</Link>
            <Link to="/terms" className="hover:text-cyan">{t("footer.terms_short")}</Link>
            <Link to="/contact" className="hover:text-cyan">{t("footer.contact")}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
