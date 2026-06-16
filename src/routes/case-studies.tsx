import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, UtensilsCrossed, Info } from "lucide-react";

export const Route = createFileRoute("/case-studies")({
  head: () => ({
    meta: [
      { title: "Case Studies | Real Results for Small Businesses – Elevate Social" },
      { name: "description", content: "See how Elevate Social has helped restaurants, contractors, landscapers, and local businesses grow with AI marketing, automation, and web design. Real results." },
      { property: "og:title", content: "Case Studies | Real Results for Small Businesses – Elevate Social" },
      { property: "og:description", content: "Real growth stories from small businesses using Elevate Social's AI marketing and automation services." },
      { name: "twitter:title", content: "Case Studies | Real Results for Small Businesses – Elevate Social" },
      { name: "twitter:description", content: "Real growth stories from small businesses using Elevate Social's AI marketing and automation services." },
    ],
    links: [{ rel: "canonical", href: "https://www.elevatesocially.com/case-studies" }],
  }),
  component: CaseStudiesPage,
});

function CaseStudiesPage() {
  return (
    <>
      <section className="bg-navy py-24 text-white">
        <div className="mx-auto max-w-4xl px-6">
          <p className="text-sm font-semibold uppercase tracking-wider text-gold">Case Studies</p>
          <h1 className="mt-3 font-display text-5xl font-bold md:text-6xl">
            How we approach <span className="text-gold">growth</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white/75">
            Real client stories from our first cohort launching soon. In the meantime, here's
            an example of how the Elevate Growth Engine™ works in practice.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-24">
        {/* Demonstration label */}
        <div className="flex items-start gap-3 rounded-xl border border-gold/30 bg-gold/10 p-4 text-sm">
          <Info className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
          <div>
            <p className="font-semibold text-foreground">Demonstration Project</p>
            <p className="mt-1 text-muted-foreground">
              The following is a sample to illustrate our approach. It is not a real client
              result. Real client outcomes will be published as our case studies launch.
            </p>
          </div>
        </div>

        <article className="mt-10 overflow-hidden rounded-3xl border border-border bg-card shadow-elegant">
          <div className="bg-gradient-hero p-10 text-white">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-gold text-navy">
              <UtensilsCrossed className="h-7 w-7" />
            </div>
            <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-gold">
              Sample Project
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold md:text-4xl">
              Restaurant Growth Strategy
            </h2>
          </div>

          <div className="space-y-10 p-10">
            <Block label="Challenge">
              Low visibility and inconsistent content.
            </Block>
            <Block label="Solution">
              Created a content calendar, brand messaging strategy, and engagement plan.
            </Block>
            <Block label="Potential Outcome">
              Improved consistency, stronger brand presence, and increased customer awareness.
            </Block>
          </div>
        </article>
      </section>

      <section className="bg-gradient-hero py-24 text-white">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="font-display text-4xl font-bold md:text-5xl">Be our next success story</h2>
          <p className="mx-auto mt-4 max-w-xl text-white/75">
            Apply for a free growth audit and we'll show you the exact playbook for your business.
          </p>
          <Link to="/free-audit" className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-gold px-7 py-3.5 text-sm font-semibold text-navy shadow-gold">
            Apply for Free Audit <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}

function Block({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wider text-gold">{label}</p>
      <p className="mt-3 text-lg leading-relaxed">{children}</p>
    </div>
  );
}
