import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles } from "lucide-react";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog — Elevate Social" },
      { name: "description", content: "Insights on social media marketing, AI automation, branding, and small business growth." },
      { property: "og:title", content: "Blog — Elevate Social" },
      { property: "og:description", content: "Practical playbooks for modern small business marketing." },
      { property: "og:url", content: "/blog" },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
  }),
  component: BlogPage,
});

const categories = [
  "Social Media Marketing",
  "AI Automation",
  "Small Business Growth",
  "Website Optimization",
  "Branding Strategy",
  "Local Marketing",
  "Content Creation",
  "Business Technology",
];

const upcoming = [
  { tag: "AI Automation", title: "5 AI workflows every small business should automate this year" },
  { tag: "Social Media Marketing", title: "The 2026 small business social media playbook" },
  { tag: "Small Business Growth", title: "From 0 to 1,000 leads: a small business funnel breakdown" },
  { tag: "Branding Strategy", title: "Why your brand sounds like everyone else — and how to fix it" },
  { tag: "Website Optimization", title: "The 7 things every service-business homepage must have" },
  { tag: "Local Marketing", title: "Dominating local search: a 30-day plan for service businesses" },
];

function BlogPage() {
  return (
    <>
      <section className="bg-navy py-24 text-white">
        <div className="mx-auto max-w-4xl px-6">
          <p className="text-sm font-semibold uppercase tracking-wider text-gold">Blog</p>
          <h1 className="mt-3 font-display text-5xl font-bold md:text-6xl">
            Playbooks for <span className="text-gold">modern growth</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white/75">
            Real strategies on marketing, automation, and AI — written for busy small business owners.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Categories</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {categories.map((c) => (
            <span
              key={c}
              className="rounded-full border border-border bg-card px-4 py-2 text-xs font-medium transition hover:border-gold/40"
            >
              {c}
            </span>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {upcoming.map((p) => (
            <article key={p.title} className="group rounded-2xl border border-border bg-card p-7 transition hover:border-gold/40 hover:shadow-elegant">
              <span className="inline-flex rounded-full bg-gold/10 px-3 py-1 text-xs font-semibold text-gold">{p.tag}</span>
              <h3 className="mt-4 font-display text-lg font-semibold leading-snug">{p.title}</h3>
              <div className="mt-6 flex items-center gap-1 text-xs font-medium text-muted-foreground">
                <Sparkles className="h-3.5 w-3.5 text-gold" /> Coming soon
              </div>
            </article>
          ))}
        </div>

        <div className="mt-16 rounded-3xl border border-border bg-secondary/40 p-10 text-center md:p-14">
          <h2 className="font-display text-3xl font-bold">Get the playbooks first</h2>
          <p className="mt-3 text-muted-foreground">Book a free strategy call and get our private growth resources.</p>
          <Link to="/contact" className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground">
            Book Free Call <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
