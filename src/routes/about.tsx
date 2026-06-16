import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Search, Target, PenTool, Bot, TrendingUp, BarChart3 } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { ParticleField } from "@/components/ParticleField";
import { Counter } from "@/components/Counter";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Elevate Social | AI-Powered Marketing Agency" },
      { name: "description", content: "Learn about Elevate Social — the AI-powered marketing agency helping small businesses grow with smart automation, modern websites, and results-driven marketing strategies." },
      { property: "og:title", content: "About Elevate Social | AI-Powered Marketing Agency" },
      { property: "og:description", content: "We help small businesses grow with AI marketing, automation, and web design. Learn our story and mission." },
      { name: "twitter:title", content: "About Elevate Social | AI-Powered Marketing Agency" },
      { name: "twitter:description", content: "We help small businesses grow with AI marketing, automation, and web design. Learn our story and mission." },
    ],
    links: [{ rel: "canonical", href: "https://www.elevatesocially.com/about" }],
  }),
  component: AboutPage,
});

const values = [
  { t: "Integrity", d: "We communicate honestly and deliver what we promise." },
  { t: "Innovation", d: "We continuously adopt modern tools and strategies to improve results." },
  { t: "Transparency", d: "Clients always know what work is being done and why." },
  { t: "Reliability", d: "Consistent communication and dependable execution." },
  { t: "Growth", d: "Every decision is guided by measurable business improvement." },
];

const engine = [
  { icon: Search, t: "Audit", d: "Identify opportunities and weaknesses." },
  { icon: Target, t: "Strategy", d: "Develop a tailored growth plan." },
  { icon: PenTool, t: "Content", d: "Create engaging and valuable content." },
  { icon: Bot, t: "Automation", d: "Implement systems that save time and increase efficiency." },
  { icon: TrendingUp, t: "Optimization", d: "Refine and improve continuously." },
  { icon: BarChart3, t: "Reporting", d: "Measure progress and maintain accountability." },
];

function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-animated text-white">
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="absolute inset-0 bg-mesh animate-drift" />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/20 via-navy/50 to-navy" />
        <div className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full bg-purple/30 blur-3xl animate-float" />
        <div className="pointer-events-none absolute -bottom-40 left-0 h-80 w-80 rounded-full bg-cyan/20 blur-3xl animate-float" style={{ animationDelay: "3s" }} />
        <ParticleField count={18} />

        <div className="relative mx-auto max-w-4xl px-6 py-24 md:py-32">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-wider text-cyan">About</p>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="mt-3 font-display text-5xl font-bold md:text-6xl">
              Helping Small Businesses Compete in a <span className="text-shimmer">Digital-First World</span>
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-6 max-w-2xl text-lg text-white/75">
              At Elevate Social, we combine creative marketing, strategic thinking, and AI-powered
              systems to help businesses attract customers, build trust, and grow more efficiently.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-24">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-wider text-electric">Our Story</p>
          <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">Elevate Social was created with a simple belief</h2>
        </Reveal>
        <Reveal delay={100}>
          <div className="mt-8 space-y-5 text-muted-foreground">
            <p className="border-l-2 border-electric pl-5 text-lg italic text-foreground">
              Small businesses deserve access to the same marketing strategies, technology, and
              growth systems used by larger companies.
            </p>
            <p>Many business owners are experts at their trade but struggle to find the time to manage social media, websites, branding, content creation, and customer communication.</p>
            <p className="font-medium text-foreground">Our mission is to bridge that gap.</p>
            <p>By combining human creativity with modern AI technology, we help businesses improve their online presence, automate repetitive tasks, and focus on what they do best — serving their customers.</p>
          </div>
        </Reveal>
      </section>

      <section className="bg-secondary/40 py-24">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 md:grid-cols-2">
          <Reveal variant="left">
            <div className="rounded-2xl border border-border bg-card p-8 shadow-elegant transition hover:border-cyan/40 hover:shadow-glow">
              <p className="text-xs font-semibold uppercase tracking-wider text-electric">Mission</p>
              <h3 className="mt-3 font-display text-2xl font-bold">Our Mission</h3>
              <p className="mt-4 text-muted-foreground">To help small businesses grow through modern marketing, intelligent automation, and strategic digital solutions.</p>
            </div>
          </Reveal>
          <Reveal variant="right">
            <div className="rounded-2xl border border-border bg-card p-8 shadow-elegant transition hover:border-cyan/40 hover:shadow-glow">
              <p className="text-xs font-semibold uppercase tracking-wider text-electric">Vision</p>
              <h3 className="mt-3 font-display text-2xl font-bold">Our Vision</h3>
              <p className="mt-4 text-muted-foreground">To become a trusted global growth partner for ambitious businesses seeking sustainable, technology-driven growth.</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-wider text-electric">Core Values</p>
            <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl">What guides us</h2>
          </Reveal>
        </div>
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {values.map((v, i) => (
            <Reveal key={v.t} variant="up" delay={i * 80}>
              <div className="group rounded-2xl border border-border bg-card p-7 transition hover:-translate-y-1 hover:border-cyan/40 hover:shadow-glow">
                <h3 className="font-display text-lg font-semibold text-electric group-hover:text-cyan transition">{v.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{v.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden bg-navy py-24 text-white">
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="absolute inset-0 bg-mesh" />
        <ParticleField count={14} />
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <Reveal>
              <p className="text-sm font-semibold uppercase tracking-wider text-cyan">Our Framework</p>
              <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl">The Elevate Growth Engine™</h2>
              <p className="mt-4 text-white/70">A six-step system that turns marketing into measurable growth.</p>
            </Reveal>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {engine.map((s, i) => (
              <Reveal key={s.t} variant="up" delay={i * 80}>
                <div className="group relative rounded-2xl border border-white/10 bg-white/5 p-7 backdrop-blur transition hover:border-cyan/30 hover:shadow-glow">
                  <div className="absolute right-6 top-6 font-display text-3xl font-bold text-cyan/20 transition group-hover:text-cyan/40">0{i + 1}</div>
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-gradient-gold text-white transition group-hover:scale-110 group-hover:rotate-3">
                    <s.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-semibold">{s.t}</h3>
                  <p className="mt-2 text-sm text-white/70">{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-3">
            {[
              { v: 7, suffix: "+", l: "Industries Served" },
              { v: 24, suffix: "/7", l: "Automation Uptime" },
              { v: 100, suffix: "%", l: "AI-Powered Stack" },
            ].map((c, i) => (
              <Reveal key={c.l} variant="up" delay={i * 120}>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-7 text-center backdrop-blur">
                  <Counter to={c.v} suffix={c.suffix} className="font-display text-5xl font-bold text-gradient" />
                  <p className="mt-2 text-sm font-medium text-white/60">{c.l}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-gradient-hero py-24 text-white">
        <div className="absolute inset-0 grid-pattern opacity-10" />
        <ParticleField count={12} />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <Reveal>
            <h2 className="font-display text-4xl font-bold md:text-5xl">Let's grow together</h2>
          </Reveal>
          <Reveal delay={120}>
            <Link to="/contact" className="btn-premium mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-gold px-7 py-3.5 text-sm font-semibold text-white shadow-gold">
              Book Free Strategy Call <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
