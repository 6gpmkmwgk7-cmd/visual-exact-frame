import { createFileRoute, Link } from "@tanstack/react-router";
import { Share2, PenTool, Sparkles, Globe, Bot, TrendingUp, ArrowRight, CheckCircle2, Star } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { ParticleField } from "@/components/ParticleField";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Our Services | AI Marketing, Automation & Web Design – Elevate Social" },
      { name: "description", content: "Explore Elevate Social's full suite of services: AI-powered marketing, website design, business automation, content creation, SEO, chatbots, and email marketing for small businesses." },
      { property: "og:title", content: "Our Services | AI Marketing, Automation & Web Design – Elevate Social" },
      { property: "og:description", content: "AI marketing, website design, automation, SEO, chatbots, and more — built specifically for small and local businesses." },
      { name: "twitter:title", content: "Our Services | AI Marketing, Automation & Web Design – Elevate Social" },
      { name: "twitter:description", content: "AI marketing, website design, automation, SEO, chatbots, and more — built specifically for small and local businesses." },
    ],
    links: [{ rel: "canonical", href: "https://www.elevatesocially.com/services" }],
  }),
  component: ServicesPage,
});

const services = [
  {
    icon: Share2, title: "Social Media Management",
    included: ["Content planning", "Monthly content calendars", "Post scheduling", "Profile optimization", "Community engagement guidance", "Performance reviews"],
    benefits: ["Consistent online presence", "Improved brand awareness", "Stronger customer engagement", "Better visibility"],
  },
  {
    icon: PenTool, title: "Content Creation",
    included: ["Captions", "Carousel concepts", "Promotional campaigns", "Educational content", "Hashtag research", "Content strategy"],
    benefits: ["More engagement", "Professional appearance", "Improved audience trust", "Higher consistency"],
  },
  {
    icon: Sparkles, title: "Branding",
    included: ["Brand identity guidance", "Messaging framework", "Color palette recommendations", "Logo direction", "Positioning strategy"],
    benefits: ["Professional image", "Better recognition", "Stronger trust", "Consistent communication"],
  },
  {
    icon: Globe, title: "Website Design",
    included: ["Conversion-focused design", "Mobile optimization", "Service pages", "Contact forms", "Lead capture systems"],
    benefits: ["More inquiries", "Better credibility", "Improved user experience", "Stronger online presence"],
  },
  {
    icon: Bot, title: "AI Automation",
    included: ["Workflow automation", "Lead tracking systems", "CRM automation", "Appointment scheduling", "Reporting systems", "AI assistants"],
    benefits: ["Time savings", "Faster operations", "Improved customer experience", "Reduced manual work"],
  },
  {
    icon: TrendingUp, title: "Growth Consulting",
    included: ["Business audits", "Marketing strategy", "Funnel optimization", "Customer acquisition planning", "Growth roadmaps"],
    benefits: ["Clear direction", "Better decision-making", "Increased efficiency", "Long-term growth"],
  },
];

function ServicesPage() {
  return (
    <>
      {/* Animated hero */}
      <section className="relative overflow-hidden bg-gradient-animated text-white">
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="absolute inset-0 bg-mesh animate-drift" />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/20 via-navy/50 to-navy" />
        <div className="pointer-events-none absolute -top-32 left-0 h-96 w-96 rounded-full bg-purple/30 blur-3xl animate-float" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-80 w-80 rounded-full bg-cyan/20 blur-3xl animate-float" style={{ animationDelay: "3s" }} />
        <ParticleField count={18} />

        <div className="relative mx-auto max-w-4xl px-6 py-24 md:py-32">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-wider text-cyan">Services</p>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="mt-3 font-display text-5xl font-bold md:text-6xl">
              Growth solutions for <span className="text-shimmer">modern businesses</span>
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-6 max-w-2xl text-lg text-white/75">
              Everything your business needs to build visibility, attract customers, and scale efficiently.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="space-y-8">
          {services.map((s, i) => (
            <Reveal key={s.title} variant="up" delay={i * 60}>
              <div className="group overflow-hidden rounded-3xl border border-border bg-card shadow-elegant transition hover:border-cyan/30 hover:shadow-glow">
                <div className="grid lg:grid-cols-[1fr_2fr]">
                  <div className="bg-gradient-hero p-10 text-white transition group-hover:opacity-95">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-gold text-white transition group-hover:scale-110 group-hover:rotate-3">
                      <s.icon className="h-7 w-7" />
                    </div>
                    <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-cyan">
                      0{i + 1} · Service
                    </p>
                    <h2 className="mt-2 font-display text-3xl font-bold">{s.title}</h2>
                  </div>
                  <div className="grid gap-8 p-10 md:grid-cols-2">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-electric">What's Included</p>
                      <ul className="mt-4 space-y-2.5">
                        {s.included.map((x) => (
                          <li key={x} className="flex items-start gap-2 text-sm">
                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cyan" />
                            <span>{x}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-electric">Benefits</p>
                      <ul className="mt-4 space-y-2.5">
                        {s.benefits.map((x) => (
                          <li key={x} className="flex items-start gap-2 text-sm">
                            <Star className="mt-0.5 h-4 w-4 shrink-0 text-cyan" />
                            <span>{x}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden bg-gradient-hero py-24 text-white">
        <div className="absolute inset-0 grid-pattern opacity-10" />
        <ParticleField count={12} />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <Reveal>
            <h2 className="font-display text-4xl font-bold md:text-5xl">Not sure where to start?</h2>
            <p className="mt-4 text-white/75">Get a free audit and we'll tell you exactly what to focus on.</p>
          </Reveal>
          <Reveal delay={120}>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link to="/free-audit" className="btn-premium inline-flex items-center gap-2 rounded-full bg-gradient-gold px-7 py-3.5 text-sm font-semibold text-white shadow-gold">
                Get Free Audit <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/pricing" className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur hover:bg-white/10">
                See Pricing
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
