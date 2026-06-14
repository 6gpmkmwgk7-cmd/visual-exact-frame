import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service – Elevate Social" },
      { name: "description", content: "Read Elevate Social's terms of service governing use of our AI marketing, automation, website design, and business growth agency services." },
    ],
    links: [{ rel: "canonical", href: "https://elevatesocially.com/terms" }],
  }),
  component: TermsPage,
});

const sections = [
  { title: "Services", body: "Elevate Social provides AI-powered content creation, social media management, website services, business automation, and related marketing solutions. The specific scope of each engagement is defined in the proposal or agreement provided to the client." },
  { title: "Payment Terms", body: "Payments are due as outlined in your service agreement or invoice. Recurring services are billed in advance on a monthly basis unless stated otherwise. Late payments may result in temporary suspension of services." },
  { title: "Refund Policy", body: "Due to the custom and time-intensive nature of our work, payments are generally non-refundable once work has commenced. Refund requests are evaluated on a case-by-case basis." },
  { title: "Intellectual Property", body: "Final deliverables become the client's property upon full payment. Elevate Social retains the right to reference completed work for portfolio and marketing purposes unless otherwise agreed." },
  { title: "Limitation of Liability", body: "Elevate Social is not liable for indirect, incidental, or consequential damages arising from the use of our services. Our total liability is limited to the amount paid for the specific service in question." },
  { title: "Project Timelines", body: "Timelines are estimated based on scope and client responsiveness. Delays in feedback, content delivery, or approvals from the client may impact final delivery dates." },
  { title: "Client Responsibilities", body: "Clients are responsible for providing accurate brand information, timely feedback, access to required accounts, and any content or assets necessary for project completion." },
  { title: "Updates to Terms", body: "We may update these Terms periodically. Continued use of our services after changes are posted constitutes acceptance of the updated terms." },
];

function TermsPage() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-24">
      <p className="text-sm font-semibold uppercase tracking-wider text-electric">Legal</p>
      <h1 className="mt-3 font-display text-5xl font-bold">Terms & Conditions</h1>
      <p className="mt-4 text-sm text-muted-foreground">Last updated: January 2026</p>
      <p className="mt-8 text-lg leading-relaxed text-muted-foreground">
        These Terms govern your use of Elevate Social's website and services. By engaging with us,
        you agree to the following terms.
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
