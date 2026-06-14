import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ChatBot } from "@/components/ChatBot";import { GoogleTranslateBridge } from "@/components/GoogleTranslateBridge";
import logo from "@/assets/logo.png";
import "@/i18n";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-7xl font-bold text-gold">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold">This page didn't load</h1>
        <p className="mt-2 text-sm text-muted-foreground">Try again or head home.</p>
        <div className="mt-6 flex justify-center gap-2">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground"
          >
            Try again
          </button>
          <a href="/" className="rounded-full border border-input px-5 py-2.5 text-sm font-medium">
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Elevate Social — Grow Smarter. Automate Faster. Scale Further." },
      { name: "description", content: "AI-powered social media marketing and business automation agency helping small businesses worldwide grow, generate leads, and scale." },
      { property: "og:site_name", content: "Elevate Social" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:title", content: "Elevate Social — Grow Smarter. Automate Faster. Scale Further." },
      { name: "twitter:title", content: "Elevate Social — Grow Smarter. Automate Faster. Scale Further." },
      { property: "og:description", content: "AI-powered social media marketing and business automation agency helping small businesses worldwide grow, generate leads, and scale." },
      { name: "twitter:description", content: "AI-powered social media marketing and business automation agency helping small businesses worldwide grow, generate leads, and scale." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/a72c2cd0-43fd-4227-a08a-6bc462b0fa4d/id-preview-2e8b8798--dd493c23-2777-4545-9e33-2fdde941f057.lovable.app-1781148726068.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/a72c2cd0-43fd-4227-a08a-6bc462b0fa4d/id-preview-2e8b8798--dd493c23-2777-4545-9e33-2fdde941f057.lovable.app-1781148726068.png" },
        { name: "google-site-verification", content: "vRcacka93KC1ZsRfyXJT917jcRSS4q6S6VCt1AmWL2k" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/png", href: logo },
      { rel: "apple-touch-icon", href: logo },
      { rel: "canonical", href: "https://elevatesocially.com/" },
    ],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": ["Organization", "LocalBusiness"],
            "@id": "https://elevatesocially.com/#organization",
            "name": "Elevate Social",
            "description": "AI-powered marketing, automation, content creation, website design, and business growth agency helping small businesses increase customers and improve operations.",
            "url": "https://elevatesocially.com",
            "logo": "https://elevatesocially.com/logo.png",
            "email": "masalaminglecatering@gmail.com",
            "address": { "@type": "PostalAddress", "addressCountry": "CA" },
            "priceRange": "$$",
            "areaServed": "Canada",
            "knowsAbout": ["AI Marketing", "Business Automation", "Website Design", "Content Creation", "SEO", "Local SEO", "Email Marketing"]
          },
          {
            "@type": "WebSite",
            "@id": "https://elevatesocially.com/#website",
            "url": "https://elevatesocially.com",
            "name": "Elevate Social",
            "description": "AI-powered marketing and business growth agency for small businesses",
            "publisher": { "@id": "https://elevatesocially.com/#organization" },
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://elevatesocially.com/?s={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          },
          {
            "@type": "Service",
            "provider": { "@id": "https://elevatesocially.com/#organization" },
            "name": "AI Marketing and Automation Services",
            "description": "AI-powered marketing, social media management, website design, business automation, content creation, and SEO services for small businesses.",
            "areaServed": "Canada",
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Elevate Social Services",
              "itemListElement": [
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "AI-Powered Marketing" } },
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Website Design and Development" } },
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Business Automation" } },
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Content Creation" } },
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "SEO and Local SEO" } },
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "AI Chatbots" } },
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Email and SMS Marketing" } }
              ]
            }
          },
          {
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What services does Elevate Social offer?",
                "acceptedAnswer": { "@type": "Answer", "text": "Elevate Social offers AI-powered marketing, website design, business automation, content creation, SEO, AI chatbots, and email and SMS marketing for small and local businesses." }
              },
              {
                "@type": "Question",
                "name": "Who does Elevate Social serve?",
                "acceptedAnswer": { "@type": "Answer", "text": "We serve restaurants, contractors, landscapers, cleaning services, plumbers, local retail, and small businesses with 1 to 50 employees." }
              },
              {
                "@type": "Question",
                "name": "How does Elevate Social use AI?",
                "acceptedAnswer": { "@type": "Answer", "text": "We use AI to automate marketing workflows, generate content, build chatbots, analyze customer data, and optimize campaigns so small businesses grow without adding staff." }
              }
            ]
          }
        ]
      })
    }]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body>{children}<Scripts /></body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1"><Outlet /></main>
        <SiteFooter />
        <GoogleTranslateBridge />
        <ChatBot />
      </div>
    </QueryClientProvider>
  );
}
