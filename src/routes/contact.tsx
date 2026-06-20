import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Instagram, Facebook, Clock, CheckCircle2, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { ParticleField } from "@/components/ParticleField";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us | Get a Free Consultation – Elevate Social" },
      { name: "description", content: "Ready to grow your business with AI? Contact Elevate Social for a free consultation. We help restaurants, contractors, landscapers, and local businesses get more customers." },
      { property: "og:title", content: "Contact Us | Get a Free Consultation – Elevate Social" },
      { property: "og:description", content: "Get in touch with Elevate Social for a free consultation. Let's build your AI-powered marketing strategy." },
      { name: "twitter:title", content: "Contact Us | Get a Free Consultation – Elevate Social" },
      { name: "twitter:description", content: "Get in touch with Elevate Social for a free consultation. Let's build your AI-powered marketing strategy." },
    ],
    links: [{ rel: "canonical", href: "https://www.elevatesocially.com/contact" }],
  }),
  component: ContactPage,
});

const serviceOptions = ["Social Media Management", "Content Creation", "Branding", "Website Design", "AI Automation", "Growth Consulting"];

const altContacts = [
  { icon: Mail, label: "Email", value: "socialselavates@gmail.com", href: "mailto:socialselavates@gmail.com" },
    { icon: Facebook, label: "Facebook", value: "Elevate Social", href: "https://www.facebook.com/profile.php?id=61590247691371" },
    { icon: Instagram, label: "Instagram", value: "@elevates_social", href: "https://www.instagram.com/elevates_social?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" },
];

const callTopics = ["Current challenges", "Growth opportunities", "Marketing strategy", "Automation possibilities"];

function ContactPage() {
  const [sent, setSent] = useState(false);
  const [services, setServices] = useState<string[]>([]);
  const [sending, setSending] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const toggle = (s: string) => setServices((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (sending) return;
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      name: String(fd.get("name") || "").trim(),
      business: String(fd.get("business") || "").trim(),
      email: String(fd.get("email") || "").trim(),
      phone: String(fd.get("phone") || "").trim(),
      industry: String(fd.get("industry") || "").trim(),
      website: String(fd.get("website") || "").trim(),
      budget: String(fd.get("budget") || "").trim(),
      services,
      message: String(fd.get("message") || "").trim(),
      timestamp: new Date().toISOString(),
    };
    setSending(true);
    setErrorMsg("");
    try {
      const ctrl = new AbortController();
      setTimeout(() => ctrl.abort(), 35000);
      const res = await fetch(import.meta.env.VITE_N8N_INTAKE_WEBHOOK_URL || "", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: ctrl.signal,
      });
      if (!res.ok) throw new Error("Failed");
      setSent(true);
    } catch {
      setErrorMsg("Something went wrong. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-animated text-white">
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="absolute inset-0 bg-mesh animate-drift" />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/20 via-navy/50 to-navy" />
        <div className="pointer-events-none absolute -top-32 right-0 h-96 w-96 rounded-full bg-electric/25 blur-3xl animate-float" />
        <div className="pointer-events-none absolute -bottom-40 -left-20 h-80 w-80 rounded-full bg-purple/20 blur-3xl animate-float" style={{ animationDelay: "2s" }} />
        <ParticleField count={18} />

        <div className="relative mx-auto max-w-4xl px-6 py-24 md:py-32">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-wider text-cyan">Contact</p>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="mt-3 font-display text-5xl font-bold md:text-6xl">
              Let's build your next stage of <span className="text-shimmer">growth</span>
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-6 max-w-2xl text-lg text-white/75">Tell us about your business and we'll explore opportunities together.</p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="grid gap-10 lg:grid-cols-5">
          <Reveal variant="left" className="lg:col-span-2">
            <div>
              <div className="rounded-2xl border border-cyan/30 bg-card p-7 shadow-glow">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-electric">
                  <Clock className="h-3.5 w-3.5" /> 30 Minutes · Free
                </div>
                <h2 className="mt-3 font-display text-2xl font-bold">Free Growth Strategy Call</h2>
                <p className="mt-2 text-sm text-muted-foreground">A no-obligation conversation to discuss:</p>
                <ul className="mt-4 space-y-2.5">
                  {callTopics.map((c) => (
                    <li key={c} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cyan" />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Other ways to reach us</p>
                <div className="mt-4 space-y-3">
                  {altContacts.map((c) => (
                    <a key={c.label} href={c.href} className="group flex items-center gap-3 rounded-xl border border-border bg-card p-4 transition hover:border-cyan/40 hover:shadow-glow">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-accent text-white transition group-hover:scale-110">
                        <c.icon className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">{c.label}</p>
                        <p className="text-sm font-medium">{c.value}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal variant="right" className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="rounded-3xl border border-border bg-card p-8 shadow-elegant">
              {sent ? (
                <div className="py-12 text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gradient-gold text-white shadow-glow">
                    <CheckCircle2 className="h-7 w-7" />
                  </div>
                  <h3 className="mt-5 font-display text-2xl font-bold">You're booked in</h3>
                  <p className="mt-2 text-sm text-muted-foreground">We'll be in touch within 24 hours.</p>
                </div>
              ) : (
                <>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Name" name="name" required />
                    <Field label="Business Name" name="business" required />
                    <Field label="Email" name="email" type="email" required />
                    <Field label="Phone Number" name="phone" />
                    <Field label="Industry" name="industry" />
                    <Field label="Website" name="website" placeholder="https://" />
                    <div className="sm:col-span-2">
                      <label className="text-sm font-medium">Monthly Budget</label>
                      <select name="budget" className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-cyan focus:ring-2 focus:ring-cyan/30">
                        <option value="">Not sure yet</option>
                        <option value="Under $300">Under $300</option>
                        <option value="$300–$700">$300–$700</option>
                        <option value="$700–$1,500">$700–$1,500</option>
                        <option value="$1,500–$3,000">$1,500–$3,000</option>
                        <option value="$3,000+">$3,000+</option>
                      </select>
                    </div>
                  </div>

                  <div className="mt-5">
                    <label className="text-sm font-medium">What services are you interested in?</label>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {serviceOptions.map((s) => {
                        const active = services.includes(s);
                        return (
                          <button type="button" key={s} onClick={() => toggle(s)}
                            className={`rounded-full border px-4 py-2 text-xs font-medium transition ${active ? "border-cyan bg-cyan/10 text-foreground" : "border-border bg-background text-muted-foreground hover:border-cyan/40"}`}>
                            {active && "✓ "}{s}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="mt-5">
                    <label className="text-sm font-medium">Describe your goals</label>
                    <textarea rows={4} name="message" className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-cyan focus:ring-2 focus:ring-cyan/30" placeholder="Where are you today, and where do you want to be?" />
                  </div>

                  {errorMsg && <p className="mt-3 text-center text-sm text-red-400">{errorMsg}</p>}
            <button type="submit" disabled={sending} className="btn-premium mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-gold px-6 py-4 text-sm font-semibold text-white shadow-glow transition hover:opacity-95">
                    {sending ? "Sending…" : <>Book My Free Consultation <ArrowRight className="h-4 w-4" /></>}
                  </button>
                  <p className="mt-3 text-center text-xs text-muted-foreground">We'll never share your info. Reply within 24h.</p>
                </>
              )}
            </form>

            <p className="mt-4 text-center text-sm text-muted-foreground">
              Prefer a free audit first?{" "}
              <Link to="/free-audit" className="font-semibold text-electric hover:underline">Request your free audit</Link>
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function Field({ label, name, type = "text", required, placeholder }: { label: string; name: string; type?: string; required?: boolean; placeholder?: string }) {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      <input name={name} type={type} required={required} placeholder={placeholder}
        className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-cyan focus:ring-2 focus:ring-cyan/30" />
    </div>
  );
}
