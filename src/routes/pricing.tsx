import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, Sparkles, Rocket, Bot, Share2 } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { ParticleField } from "@/components/ParticleField";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing Plans | Affordable AI Marketing for Small Businesses – Elevate Social" },
      { name: "description", content: "Simple, transparent pricing for AI-powered marketing, automation, and web design. Choose the plan that fits your small business budget and growth goals." },
      { property: "og:title", content: "Pricing Plans | Affordable AI Marketing for Small Businesses – Elevate Social" },
      { property: "og:description", content: "Transparent, affordable pricing for AI marketing, automation, and web design. Built for small businesses." },
      { name: "twitter:title", content: "Pricing Plans | Affordable AI Marketing for Small Businesses – Elevate Social" },
      { name: "twitter:description", content: "Transparent, affordable pricing for AI marketing, automation, and web design. Built for small businesses." },
    ],
    links: [{ rel: "canonical", href: "https://elevatesocially.com/pricing" }],
  }),
  component: PricingPage,
});

const tiers = [
  {
    icon: Rocket, name: "Business Presence Launch", price: "$149", suffix: "one-time",
    desc: "Get your business looking professional online in days, not months.",
    includes: ["Facebook Setup", "Instagram Setup", "LinkedIn Setup", "Professional Bio Writing", "CTA Optimization", "Keywords & Hashtags"],
    best: ["New businesses", "Local services", "Startups"],
    cta: "Launch My Presence",
  },
  {
    icon: Share2, name: "AI Content Engine", price: "$299", suffix: "/mo",
    desc: "AI-powered content systems that keep your brand consistent and growing.",
    includes: ["30-Day Content Calendar", "30 Captions", "Hashtag Strategy", "Content Planning", "Canva Design Briefs"],
    best: ["Restaurants", "Service businesses", "Growing brands"],
    cta: "Start Growing",
  },
  {
    icon: Bot, name: "AI Workflow Automation Setup", price: "$299", suffix: "one-time",
    desc: "Practical AI workflows that capture leads, organize info, and reduce manual work.",
    includes: ["Lead Capture Workflow", "Google Sheets CRM", "Telegram/Email Alerts", "Client Intake Forms", "Booking & Follow-up"],
    best: ["Local businesses", "Contractors", "Service companies"],
    cta: "Automate My Business",
  },
  {
    icon: Sparkles, name: "AI Growth System", price: "$499", suffix: "/mo", featured: true,
    desc: "Complete AI system for lead generation and business automation.",
    includes: ["Lead Capture Systems", "AI Automation", "Client Onboarding Automation", "Appointment Booking Workflows", "AI Assistant Setup"],
    best: ["Established businesses", "Contractors", "Scaling brands"],
    cta: "Get the Full System",
  },
];

function PricingPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-animated text-white">
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="absolute inset-0 bg-mesh animate-drift" />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/20 via-navy/50 to-navy" />
        <div className="pointer-events-none absolute -top-32 right-0 h-96 w-96 rounded-full bg-electric/30 blur-3xl animate-float" />
        <div className="pointer-events-none absolute -bottom-40 left-0 h-96 w-96 rounded-full bg-purple/25 blur-3xl animate-float" style={{ animationDelay: "2s" }} />
        <ParticleField count={18} />

        <div className="relative mx-auto max-w-4xl px-6 py-24 text-center md:py-32">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan/30 bg-cyan/10 px-4 py-1.5 text-xs font-semibold text-cyan backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" /> Pricing
            </div>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="mt-5 font-display text-5xl font-bold md:text-6xl">
              Choose your <span className="text-shimmer">growth path</span>
            </h1>
          </Reveal>
          <Reveal delay={240}>
            <p className="mt-6 text-lg text-white/75">
              Four packages designed to launch, grow, and automate your business.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-6 md:grid-cols-2">
          {tiers.map((t, i) => (
            <Reveal key={t.name} variant="up" delay={i * 100}>
              <div
                className={`relative flex flex-col rounded-3xl border p-8 transition hover:-translate-y-1 ${
                  t.featured
                    ? "gradient-border border-transparent bg-navy text-white shadow-glow lg:-mt-4"
                    : "border-border bg-card hover:border-cyan/40 hover:shadow-glow"
                }`}
              >
                {t.featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-gold px-3 py-1 text-xs font-bold text-white shadow-glow">
                    Most Popular
                  </span>
                )}
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${t.featured ? "bg-gradient-gold text-white" : "bg-gradient-accent text-white"} transition hover:scale-110 hover:rotate-3`}>
                  <t.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-display text-xl font-semibold">{t.name}</h3>
                <div className="mt-3">
                  <span className="text-xs font-medium text-cyan">Starting at</span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="font-display text-5xl font-bold">{t.price}</span>
                  <span className={`text-sm ${t.featured ? "text-white/60" : "text-muted-foreground"}`}>{t.suffix}</span>
                </div>
                <p className={`mt-3 text-sm ${t.featured ? "text-white/70" : "text-muted-foreground"}`}>{t.desc}</p>

                <div className="mt-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-cyan">Includes</p>
                  <ul className="mt-3 space-y-2.5">
                    {t.includes.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cyan" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-cyan">Best For</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {t.best.map((b) => (
                      <span key={b} className={`rounded-full px-3 py-1 text-xs ${t.featured ? "bg-white/10 text-white/80" : "bg-secondary text-secondary-foreground"}`}>{b}</span>
                    ))}
                  </div>
                </div>

                <Link
                  to="/contact"
                  className={`btn-premium mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3.5 text-sm font-semibold transition ${
                    t.featured ? "bg-gradient-gold text-white shadow-glow hover:opacity-95" : "bg-primary text-primary-foreground hover:opacity-90"
                  }`}
                >
                  {t.cta} <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal variant="zoom" delay={200}>
          <div className="mt-12 rounded-3xl border border-electric/30 bg-gradient-to-br from-card to-secondary/40 p-10 md:p-14">
            <div className="grid gap-8 lg:grid-cols-[2fr_1fr] lg:items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-electric/10 px-3 py-1 text-xs font-semibold text-electric">
                  <Sparkles className="h-3.5 w-3.5" /> Custom Solutions
                </div>
                <h2 className="mt-4 font-display text-3xl font-bold md:text-4xl">Need something different?</h2>
                <p className="mt-3 text-muted-foreground">We create customized AI-powered solutions tailored to your business goals.</p>
              </div>
              <Link
                to="/contact"
                className="btn-premium inline-flex items-center justify-center gap-2 rounded-full bg-gradient-gold px-6 py-3.5 text-sm font-semibold text-white shadow-glow"
              >
                Request a Custom Proposal <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
