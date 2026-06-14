import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight, Sparkles, Sparkle, Inbox, ClipboardList, UserCog, Calendar,
  Workflow, Brain, Globe, Rocket, Cpu, CheckCircle2,
} from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { ParticleField } from "@/components/ParticleField";
import { NetworkNodes } from "@/components/NetworkNodes";

export const Route = createFileRoute("/ai-solutions")({
  head: () => ({
    meta: [
      { title: "AI Solutions for Small Business | Chatbots, Automation & More – Elevate Social" },
      { name: "description", content: "Discover how Elevate Social's AI solutions help small businesses automate marketing, deploy intelligent chatbots, generate content, and grow without adding staff." },
      { property: "og:title", content: "AI Solutions for Small Business | Chatbots, Automation & More – Elevate Social" },
      { property: "og:description", content: "AI chatbots, marketing automation, content generation, and smart workflows — built for small and local businesses." },
      { name: "twitter:title", content: "AI Solutions for Small Business | Chatbots, Automation & More – Elevate Social" },
      { name: "twitter:description", content: "AI chatbots, marketing automation, content generation, and smart workflows — built for small and local businesses." },
    ],
    links: [{ rel: "canonical", href: "https://elevatesocially.com/ai-solutions" }],
  }),
  component: AiSolutionsPage,
});

const systems = [
  { icon: Sparkle, t: "AI Content Generator", d: "Creates content ideas, captions, hashtags, and full campaigns tailored to your brand voice." },
  { icon: Inbox, t: "AI Lead Capture System", d: "Collects and organizes business inquiries from forms, social, and messaging — all in one place." },
  { icon: ClipboardList, t: "AI Proposal Generator", d: "Creates structured recommendations and client-ready proposals in minutes." },
  { icon: UserCog, t: "AI Client Onboarding", d: "Organizes new client information automatically and removes manual back-and-forth." },
  { icon: Calendar, t: "AI Social Media Assistant", d: "Builds content plans, scheduling ideas, and ongoing social media direction." },
];

const stack = [
  { name: "OpenAI", icon: Brain },
  { name: "n8n", icon: Workflow },
  { name: "Google Workspace", icon: Globe },
  { name: "Canva", icon: Sparkle },
  { name: "Lovable", icon: Rocket },
  { name: "Automation Systems", icon: Cpu },
];

const benefits = [
  "Modular systems that fit your business",
  "Built on trusted AI and automation tools",
  "No fake metrics — real, practical workflows",
  "Designed for small business operations",
];

function AiSolutionsPage() {
  return (
    <>
      {/* HERO — animated like homepage */}
      <section className="relative overflow-hidden bg-gradient-animated text-white">
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="absolute inset-0 bg-mesh animate-drift" />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/20 via-navy/50 to-navy" />
        <div className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-electric/30 blur-3xl animate-float" />
        <div className="pointer-events-none absolute -bottom-40 right-0 h-96 w-96 rounded-full bg-purple/25 blur-3xl animate-float" style={{ animationDelay: "2s" }} />
        <ParticleField count={20} />

        <div className="relative mx-auto max-w-4xl px-6 py-24 text-center md:py-32">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan/30 bg-cyan/10 px-4 py-1.5 text-xs font-semibold text-cyan backdrop-blur">
              <Cpu className="h-3.5 w-3.5" /> AI Solutions
            </div>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="mt-5 font-display text-5xl font-bold md:text-6xl">
              The <span className="text-shimmer">AI systems</span> powering your growth
            </h1>
          </Reveal>
          <Reveal delay={240}>
            <p className="mt-6 text-lg text-white/75">
              Modular AI tools that work together to handle content, leads, proposals, and
              operations for small businesses.
            </p>
          </Reveal>
          <Reveal delay={360}>
            <Link
              to="/free-audit"
              className="btn-premium mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-gold px-7 py-3.5 text-sm font-semibold text-white shadow-glow transition hover:scale-105"
            >
              Get Your Free AI Audit <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* LIVE WORKFLOW */}
      <section className="relative overflow-hidden bg-navy py-16 text-white">
        <div className="absolute inset-0 grid-pattern opacity-10" />
        <div className="relative mx-auto max-w-3xl px-6">
          <Reveal variant="zoom">
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur">
              <div className="absolute -inset-px rounded-3xl bg-gradient-to-r from-cyan/20 via-purple/20 to-electric/20 blur opacity-60 -z-10" />
              <p className="mb-3 text-center text-[10px] font-semibold uppercase tracking-wider text-cyan">
                Live workflow · Lead → AI → Booking
              </p>
              <NetworkNodes className="h-48" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* AI SYSTEMS GRID */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-wider text-electric">Our AI Modules</p>
            <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl">
              Five systems, <span className="text-gradient">one growth engine</span>
            </h2>
          </Reveal>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {systems.map((s, i) => (
            <Reveal key={s.t} variant="up" delay={i * 80}>
              <div className="group relative rounded-2xl border border-border bg-card p-7 transition hover:-translate-y-1 hover:border-cyan/40 hover:shadow-glow">
                <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-gradient-accent opacity-0 blur-2xl transition group-hover:opacity-20" />
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-accent text-white transition group-hover:scale-110 group-hover:rotate-3">
                    <s.icon className="h-6 w-6" />
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-green-400/30 bg-green-400/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-green-700 dark:text-green-300">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" /> Active
                  </span>
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold">{s.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          <Reveal variant="left">
            <div className="rounded-3xl border border-border bg-card p-10">
              <p className="text-sm font-semibold uppercase tracking-wider text-electric">Technology Stack</p>
              <h2 className="mt-3 font-display text-3xl font-bold">Modern AI tools, working together</h2>
              <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
                {stack.map((t, i) => (
                  <Reveal key={t.name} variant="up" delay={i * 60}>
                    <div className="flex flex-col items-center gap-2 rounded-xl border border-border bg-secondary/40 p-4 transition hover:border-cyan/40 hover:shadow-glow">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-accent text-white">
                        <t.icon className="h-5 w-5" />
                      </div>
                      <span className="text-center text-xs font-semibold">{t.name}</span>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal variant="right">
            <div className="rounded-3xl border border-cyan/30 bg-gradient-hero p-10 text-white shadow-glow">
              <p className="text-sm font-semibold uppercase tracking-wider text-cyan">Why it works</p>
              <h2 className="mt-3 font-display text-3xl font-bold">Practical AI, not hype</h2>
              <ul className="mt-6 space-y-3">
                {benefits.map((b, i) => (
                  <Reveal key={b} variant="up" delay={i * 80}>
                    <li className="flex items-start gap-2 text-sm text-white/85">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cyan" /> {b}
                    </li>
                  </Reveal>
                ))}
              </ul>
              <Link
                to="/free-audit"
                className="btn-premium mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-gold px-6 py-3 text-sm font-semibold text-white shadow-glow"
              >
                Get Your Free AI Growth Audit <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
