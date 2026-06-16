import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Share2, Globe, Sparkles, TrendingUp, CheckCircle2, ArrowRight, Loader2, AlertTriangle,
  UtensilsCrossed, Wrench, Home as HomeIcon, Store, Briefcase, Rocket, AlertCircle,
} from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { ParticleField } from "@/components/ParticleField";

export const Route = createFileRoute("/free-audit")({
  head: () => ({
    meta: [
      { title: "Free Marketing Audit | AI Analysis of Your Business – Elevate Social" },
      { name: "description", content: "Get a free AI-powered marketing audit for your small business. Elevate Social will analyse your online presence, SEO, and growth opportunities — no cost, no obligation." },
      { property: "og:title", content: "Free Marketing Audit | AI Analysis of Your Business – Elevate Social" },
      { property: "og:description", content: "Free AI marketing audit for your small business. Discover quick wins and growth opportunities in minutes." },
      { name: "twitter:title", content: "Free Marketing Audit | AI Analysis of Your Business – Elevate Social" },
      { name: "twitter:description", content: "Free AI marketing audit for your small business. Discover quick wins and growth opportunities in minutes." },
    ],
    links: [{ rel: "canonical", href: "https://www.elevatesocially.com/free-audit" }],
  }),
  component: FreeAuditPage,
});

const deliverables = [
  { icon: Share2, t: "Social Media Review", d: "Profile optimization recommendations." },
  { icon: Globe, t: "Website Analysis", d: "User experience and conversion insights." },
  { icon: Sparkles, t: "Branding Assessment", d: "Consistency and positioning review." },
  { icon: TrendingUp, t: "Growth Recommendations", d: "Practical actions to improve results." },
];

const who = [
  { icon: UtensilsCrossed, label: "Restaurants" },
  { icon: Wrench, label: "Contractors" },
  { icon: HomeIcon, label: "Home Service Businesses" },
  { icon: Store, label: "Retail Stores" },
  { icon: Briefcase, label: "Professional Services" },
  { icon: Rocket, label: "Growing Startups" },
];

const reasons = ["Weak messaging", "Poor visibility", "Inconsistent branding", "Lack of automation", "Ineffective content"];

const INTAKE_WEBHOOK_URL =
  import.meta.env.VITE_N8N_INTAKE_WEBHOOK_URL || "";

function FreeAuditPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      name: String(fd.get("name") || "").trim(),
      email: String(fd.get("email") || "").trim(),
      businessName: String(fd.get("business") || "").trim(),
      businessType: String(fd.get("businessType") || "").trim(),
      website: String(fd.get("website") || "").trim(),
      message: String(fd.get("message") || "").trim(),
      timestamp: new Date().toISOString(),
    };
    setStatus("sending");
    setErrorMsg("");
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 35000);
      const res = await fetch(INTAKE_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
      if (!res.ok) throw new Error(`Request failed (${res.status})`);
      clearTimeout(timeoutId);
      setStatus("sent");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Network error");
      setStatus("error");
    }
  };

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-animated text-white">
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="absolute inset-0 bg-mesh animate-drift" />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/20 via-navy/50 to-navy" />
        <div className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-cyan/20 blur-3xl animate-float" />
        <div className="pointer-events-none absolute -bottom-40 right-0 h-80 w-80 rounded-full bg-purple/20 blur-3xl animate-float" style={{ animationDelay: "2s" }} />
        <ParticleField count={18} />

        <div className="relative mx-auto max-w-4xl px-6 py-24 text-center md:py-32">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan/30 bg-cyan/10 px-4 py-1.5 text-xs font-medium text-cyan backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" /> 100% Free · No Obligation
            </div>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="mt-6 font-display text-5xl font-bold leading-tight md:text-6xl">
              Is your business missing <span className="text-shimmer">growth opportunities?</span>
            </h1>
          </Reveal>
          <Reveal delay={240}>
            <p className="mt-6 text-lg text-white/75">Get a complimentary audit of your online presence.</p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-wider text-electric">What You'll Receive</p>
            <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl">A full review, on the house</h2>
          </Reveal>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {deliverables.map((d, i) => (
            <Reveal key={d.t} variant="up" delay={i * 80}>
              <div className="group rounded-2xl border border-border bg-card p-7 transition hover:-translate-y-1 hover:border-cyan/40 hover:shadow-glow">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-hero text-cyan transition group-hover:scale-110 group-hover:rotate-3">
                  <d.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold">{d.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{d.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-secondary/40 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <Reveal>
              <p className="text-sm font-semibold uppercase tracking-wider text-electric">Who Is This For?</p>
              <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl">Built for your business</h2>
            </Reveal>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {who.map((w, i) => (
              <Reveal key={w.label} variant="up" delay={i * 60}>
                <div className="group flex items-center gap-3 rounded-2xl border border-border bg-card p-5 transition hover:border-cyan/40 hover:shadow-glow">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-accent text-white transition group-hover:scale-110">
                    <w.icon className="h-5 w-5" />
                  </div>
                  <span className="font-medium">{w.label}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-6 py-24 lg:grid-cols-2">
        <Reveal variant="left">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-electric">Why Request an Audit?</p>
            <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl">Most businesses lose opportunities because of:</h2>
            <p className="mt-5 text-muted-foreground">We'll help identify these opportunities — and give you a clear plan to fix them.</p>
          </div>
        </Reveal>
        <Reveal variant="right">
          <div className="space-y-3">
            {reasons.map((r, i) => (
              <Reveal key={r} variant="up" delay={i * 60}>
                <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 transition hover:border-cyan/40">
                  <AlertCircle className="h-5 w-5 shrink-0 text-electric" />
                  <span className="text-sm font-medium">{r}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="relative overflow-hidden bg-gradient-hero py-24 text-white">
        <div className="absolute inset-0 grid-pattern opacity-10" />
        <ParticleField count={12} />
        <div className="relative mx-auto max-w-2xl px-6">
          <Reveal variant="zoom">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur md:p-10">
              <p className="text-xs font-semibold uppercase tracking-wider text-cyan">Audit Request</p>
              <h2 className="mt-2 font-display text-3xl font-bold">Request Your Free Audit</h2>
              {status === "sent" ? (
                <div className="mt-8 rounded-xl bg-white/10 p-8 text-center">
                  <CheckCircle2 className="mx-auto h-10 w-10 text-cyan" />
                  <h3 className="mt-4 font-display text-xl font-bold">Thanks!</h3>
                  <p className="mt-2 text-sm text-white/75">
                    We'll review your business and reply within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                  <DarkField label="Name" name="name" required />
                  <DarkField label="Business" name="business" required />
                  <DarkField label="Business Type" name="businessType" placeholder="e.g. Restaurant, Contractor" />
                  <DarkField label="Email" name="email" type="email" required />
                  <DarkField label="Website" name="website" placeholder="https://" />
                  <div>
                    <label className="text-sm font-medium">Biggest Marketing Challenge</label>
                    <textarea name="message" rows={4} className="mt-2 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/40 outline-none transition focus:border-cyan focus:ring-2 focus:ring-cyan/30" placeholder="What's holding your growth back?" />
                  </div>
                  {status === "error" && (
                    <div className="flex items-start gap-2 rounded-xl border border-red-400/30 bg-red-500/10 p-3 text-sm text-red-100">
                      <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                      <span>
                        Something went wrong sending your request. Please try again or
                        email us directly.
                        {errorMsg ? <span className="block text-xs text-white/60">({errorMsg})</span> : null}
                      </span>
                    </div>
                  )}
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="btn-premium inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-gold px-6 py-4 text-sm font-semibold text-white shadow-glow transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {status === "sending" ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" /> Sending…
                      </>
                    ) : (
                      <>
                        Get My Free Audit <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function DarkField({ label, name, type = "text", required, placeholder }: { label: string; name: string; type?: string; required?: boolean; placeholder?: string }) {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      <input name={name} type={type} required={required} placeholder={placeholder}
        className="mt-2 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/40 outline-none transition focus:border-cyan focus:ring-2 focus:ring-cyan/30" />
    </div>
  );
}
