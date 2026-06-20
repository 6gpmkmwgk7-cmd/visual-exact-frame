import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, BadgeCheck, CheckCircle2, Sparkles, Rocket, Bot, Zap, Star, Loader2 } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { ParticleField } from "@/components/ParticleField";
import { PAYPAL_ENABLED, CHECKOUT_WEBHOOK_URL, isFirstTimeVisitor, markVisitorAsReturning } from "@/lib/siteConfig";

export const Route = createFileRoute("/pricing")({
  component: PricingPage,
});

const tiers = [
  {
    icon: Rocket, name: "Business Presence Launch", planId: "businessPresence",
    originalPrice: 149, discountedPrice: null as number | null,
    billingType: "one-time" as const, discountPercent: null as number | null,
    badge: null as string | null, firstTimeOnly: false, featured: false,
    desc: "Get your business looking professional online in days, not months.",
    includes: ["Facebook Business Page Setup","Instagram Business Profile Setup","LinkedIn Company Page Setup","Professional Bio & Brand Voice Writing","CTA Optimization Across All Platforms","Industry Keywords & Hashtag Strategy"],
    best: "New businesses, local services & startups",
    cta: "Launch My Presence",
  },
  {
    icon: Zap, name: "AI Content Engine", planId: "contentEngine",
    originalPrice: 299, discountedPrice: 224 as number | null,
    billingType: "monthly" as const, discountPercent: 25 as number | null,
    badge: "25% OFF First Month" as string | null, firstTimeOnly: true, featured: false,
    desc: "AI-powered content systems that keep your brand consistent and growing every month.",
    includes: ["30-Day Content Calendar (Monthly)","30 Branded Captions Written For You","Strategic Hashtag Research","Content Topic & Trend Planning","Canva Design Briefs & Templates"],
    best: "Restaurants, service businesses & growing brands",
    cta: "Start Content Engine",
  },
  {
    icon: Bot, name: "AI Workflow Automation", planId: "aiAutomation",
    originalPrice: 299, discountedPrice: 224 as number | null,
    billingType: "one-time" as const, discountPercent: 25 as number | null,
    badge: "25% OFF First Order" as string | null, firstTimeOnly: true, featured: false,
    desc: "Practical AI workflows that capture leads, organize info, and reduce manual work.",
    includes: ["Lead Capture Automation Workflow","Google Sheets CRM Integration","Telegram / Email Instant Alerts","Client Intake Form Automation","Appointment Booking & Follow-Up Flow"],
    best: "Local businesses, contractors & service companies",
    cta: "Automate My Business",
  },
  {
    icon: Star, name: "AI Growth System", planId: "growthSystem",
    originalPrice: 499, discountedPrice: null as number | null,
    billingType: "monthly" as const, discountPercent: null as number | null,
    badge: "Most Popular" as string | null, firstTimeOnly: false, featured: true,
    desc: "Complete done-for-you AI system: content + leads + automation + growth every month.",
    includes: ["Everything in AI Content Engine","Lead Capture & Follow-Up Automation","Client Onboarding Automation","Appointment Booking Workflows","AI Business Assistant Setup","Priority Support & Monthly Review"],
    best: "Established businesses, contractors & scaling brands",
    cta: "Get the Full System",
  },
];

const CHECKOUT_KEYS: Record<string, string> = {
  businessPresence: "business-launch",
  contentEngine:    "ai-content",
  aiAutomation:     "ai-workflow",
  growthSystem:     "ai-growth",
};

const N8N_KEYS: Record<string, string> = {
  businessPresence: "business_presence",
  contentEngine:    "content_engine",
  aiAutomation:     "automation",
  growthSystem:     "growth_system",
};

function PricingPage() {
  const [firstTimer, setFirstTimer] = useState(false);
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const [errorPlan, setErrorPlan] = useState<string | null>(null);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  useEffect(() => { setFirstTimer(isFirstTimeVisitor()); markVisitorAsReturning(); }, []);

  async function handleCheckout(planId: string) {
    setLoadingPlan(planId);
    setErrorPlan(null);
    setCheckoutError(null);
    try {
      const res = await fetch(CHECKOUT_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ package: N8N_KEYS[planId] }),
      });
      if (!res.ok) throw new Error(`Checkout unavailable (${res.status})`);
      const data = await res.json();
      if (!data.checkoutUrl) throw new Error("No checkout URL returned");
      window.location.href = data.checkoutUrl;
    } catch (err) {
      setErrorPlan(planId);
      setCheckoutError(err instanceof Error ? err.message : "Checkout failed. Please try again.");
      setLoadingPlan(null);
    }
  }
  return (
    <main className="min-h-screen bg-background text-foreground overflow-hidden">
      <section className="relative overflow-hidden bg-gradient-animated text-white">
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="absolute inset-0 bg-mesh animate-drift" />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/20 via-navy/50 to-navy" />
        <div className="pointer-events-none absolute -top-32 right-0 h-96 w-96 rounded-full bg-electric/25 blur-3xl animate-float" />
        <div className="pointer-events-none absolute -bottom-40 -left-20 h-80 w-80 rounded-full bg-purple/20 blur-3xl animate-float" style={{ animationDelay: "2s" }} />
        <ParticleField count={18} />
        <div className="relative z-10 max-w-3xl mx-auto px-4 pt-28 pb-16 text-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-electric/10 border border-electric/20 text-electric text-sm font-semibold mb-6">
              <BadgeCheck className="h-4 w-4" />
              {firstTimer ? "New clients: ask about our 25% welcome discount" : "Trusted by small businesses across Canada"}
            </div>
            <h1 className="font-display text-4xl md:text-6xl font-bold mb-4">Simple, Transparent Pricing</h1>
            <p className="text-lg text-white/75">No hidden fees. No long-term lock-ins. Just results.</p>
          </Reveal>
        </div>
      </section>
      <section className="pt-10 pb-24 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {tiers.map((t, i) => {
            const Icon = t.icon;
            return (
              <Reveal key={i} delay={i * 0.1}>
                <div className={`relative flex flex-col h-full rounded-3xl border p-8 transition-all duration-300 hover:shadow-2xl ${t.featured ? "border-electric bg-electric/5 shadow-electric/20 shadow-lg" : "border-border bg-card"}`}>
                  {t.badge && (
                    <div className={`absolute -top-4 ${t.featured ? "left-1/2 -translate-x-1/2" : "right-6"} px-4 py-1 rounded-full text-xs font-bold text-white ${t.featured ? "bg-electric" : "bg-green-500"}`}>
                      {t.badge}
                    </div>
                  )}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-xl bg-electric/10"><Icon className="h-6 w-6 text-electric" /></div>
                    <h2 className="text-xl font-bold">{t.name}</h2>
                  </div>
                  <div className="mb-3">
                    {firstTimer && t.firstTimeOnly && t.discountedPrice ? (
                      <>
                        <div className="flex items-baseline gap-2">
                          <span className="text-5xl font-display font-bold text-electric">${t.discountedPrice}</span>
                          {t.billingType === "monthly" && <span className="text-muted-foreground text-sm">/mo</span>}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="line-through text-muted-foreground text-sm">${t.originalPrice}</span>
                          <span className="text-xs font-semibold text-green-500">{t.discountPercent}% off</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">First-time customers only</p>
                      </>
                    ) : (
                      <div className="flex items-baseline gap-2">
                        <span className="text-5xl font-display font-bold">${t.originalPrice}</span>
                        {t.billingType === "monthly" && <span className="text-muted-foreground text-sm">/mo</span>}
                      </div>
                    )}
                    <p className="text-xs text-muted-foreground mt-1">
                      {t.billingType === "monthly" ? "Billed monthly" : "One-time payment"}
                    </p>
                  </div>
                  <p className="text-muted-foreground text-sm mb-6">{t.desc}</p>
                  <div className="flex-1 mb-6">
                    <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">What's included</p>
                    <ul className="space-y-2">
                      {t.includes.map((item, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-electric flex-shrink-0 mt-0.5" />{item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <p className="text-xs text-muted-foreground mb-5"><span className="font-semibold">Best for:</span> {t.best}</p>
                  <button
                    onClick={() => handleCheckout(t.planId)}
                    disabled={loadingPlan !== null}
                    className={`flex items-center justify-center gap-2 w-full py-3 px-6 rounded-xl font-semibold text-sm transition-all duration-200 mb-1 disabled:opacity-60 disabled:cursor-not-allowed ${t.featured ? "bg-electric text-white hover:bg-electric/90" : "bg-foreground text-background hover:bg-foreground/90"}`}
                  >
                    {loadingPlan === t.planId
                      ? <><Loader2 className="h-4 w-4 animate-spin" /> Processing…</>
                      : <>{t.cta} <ArrowRight className="h-4 w-4" /></>
                    }
                  </button>
                  {errorPlan === t.planId && checkoutError && (
                    <p className="text-xs text-red-500 text-center mb-2">{checkoutError}</p>
                  )}
                  {PAYPAL_ENABLED && (
                    <Link to="/checkout" search={{ package: CHECKOUT_KEYS[t.planId], price: String(t.originalPrice), name: t.name }}
                      className="flex items-center justify-center gap-2 w-full py-3 px-6 rounded-xl font-semibold text-sm border border-border bg-background hover:bg-muted transition-all duration-200">
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c-.013.076-.026.175-.041.254-.93 4.778-4.005 7.201-9.138 7.201h-2.19a.563.563 0 0 0-.556.479l-1.187 7.527h-.506l-.24 1.516a.56.56 0 0 0 .554.647h3.882c.46 0 .85-.334.922-.788.06-.26.76-4.852.816-5.09a.932.932 0 0 1 .923-.788h.58c3.76 0 6.705-1.528 7.565-5.946.36-1.847.174-3.388-.777-4.471z"/>
                      </svg>
                      Pay with PayPal
                    </Link>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>
        <Reveal delay={0.4}>
          <div className="max-w-3xl mx-auto mt-16 text-center rounded-3xl border border-border bg-card p-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-electric/10 border border-electric/20 text-electric text-xs font-semibold mb-4">
              <Sparkles className="h-3.5 w-3.5" /> Custom Solutions
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold mt-2 mb-3">Need something different?</h2>
            <p className="text-muted-foreground mt-3 mb-6 max-w-xl mx-auto">We create customized AI-powered solutions tailored to your business goals and budget.</p>
            <Link to="/contact" className="btn-premium inline-flex items-center justify-center gap-2 rounded-full bg-gradient-gold px-6 py-3.5 text-sm font-bold">
              Request a Custom Proposal <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </section>
    </main>
  );
}