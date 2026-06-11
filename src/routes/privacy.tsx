import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Elevate Social" },
      { name: "description", content: "How Elevate Social collects, uses, and protects your information." },
    ],
  }),
  component: PrivacyPage,
});

const sections = [
  {
    title: "Information We Collect",
    body: "We collect information you provide directly, such as name, email, phone number, business details, and any information submitted through our forms, audits, or consultations. We may also automatically collect device and usage information such as IP address, browser type, and pages visited.",
  },
  {
    title: "How We Use Information",
    body: "We use your information to deliver our services, respond to inquiries, send proposals, manage client onboarding, improve our offerings, and communicate updates relevant to your business. We never sell your personal data.",
  },
  {
    title: "Data Protection",
    body: "We implement industry-standard security measures including encryption in transit, access controls, and secure cloud infrastructure to protect your information against unauthorized access, disclosure, or misuse.",
  },
  {
    title: "Third-Party Services",
    body: "We work with trusted third-party providers (such as analytics, automation, AI, email, and payment platforms) to operate our services. These providers are bound by their own privacy commitments and only access data necessary to perform their services.",
  },
  {
    title: "Cookie Usage",
    body: "Our website uses cookies and similar technologies to remember your preferences, understand how the site is used, and improve your experience. You can control cookies through your browser settings.",
  },
  {
    title: "Analytics Usage",
    body: "We use analytics tools to understand visitor behavior and improve site performance. These tools may collect anonymized usage data such as page views, session duration, and referral sources.",
  },
  {
    title: "Contact Information",
    body: "If you have any questions about this Privacy Policy or how your data is handled, please contact us through our Contact page.",
  },
];

function PrivacyPage() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-24">
      <p className="text-sm font-semibold uppercase tracking-wider text-electric">Legal</p>
      <h1 className="mt-3 font-display text-5xl font-bold">Privacy Policy</h1>
      <p className="mt-4 text-sm text-muted-foreground">Last updated: January 2026</p>
      <p className="mt-8 text-lg leading-relaxed text-muted-foreground">
        At Elevate Social, your privacy is important to us. This policy explains how we collect,
        use, and safeguard the information you share with us.
      </p>
      <div className="mt-12 space-y-8">
        {sections.map((s) => (
          <div key={s.title} className="rounded-2xl border border-border bg-card p-7">
            <h2 className="font-display text-xl font-bold">{s.title}</h2>
            <p className="mt-3 text-muted-foreground leading-relaxed">{s.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
