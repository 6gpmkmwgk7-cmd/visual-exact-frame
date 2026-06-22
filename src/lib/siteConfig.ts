const env = import.meta.env;
export const SITE_NAME = "Elevate Social";

// ── First-time visitor promo ──────────────────────────────────────────────────
const PROMO_CODE   = env.VITE_PROMO_CODE    || "";
const PROMO_PARAM  = env.VITE_PROMO_PARAM   || "prefilled_promo_code";
const FIRST_VISIT_KEY = "es_returning";

export function isFirstTimeVisitor(): boolean {
  return !localStorage.getItem(FIRST_VISIT_KEY);
}
export function markVisitorAsReturning(): void {
  localStorage.setItem(FIRST_VISIT_KEY, "1");
}
export function withPromo(url: string): string {
  if (!url) return url;
  if (!isFirstTimeVisitor() || !PROMO_CODE) return url;
  const sep = url.includes("?") ? "&" : "?";
  return `${url}${sep}${PROMO_PARAM}=${encodeURIComponent(PROMO_CODE)}`;
}

// ── Stripe Payment Links ──────────────────────────────────────────────────────
export const STRIPE_LINKS = {
  businessPresence: env.VITE_STRIPE_BUSINESS_PRESENCE_URL || "https://buy.stripe.com/5kQbJ34X69ky4yn34G3ZK00",
  contentEngine:    env.VITE_STRIPE_CONTENT_ENGINE_URL    || "https://buy.stripe.com/cNi3cxblufIWfd1fRs3ZK01",
  aiAutomation:     env.VITE_STRIPE_AUTOMATION_URL        || "https://buy.stripe.com/cNi28tblu7cq0i734G3ZK02",
  growthSystem:     env.VITE_STRIPE_GROWTH_SYSTEM_URL     || "https://buy.stripe.com/9B6fZjdtC9kyc0PcFg3ZK03",
} as const;

// ── PayPal NCP Payment Links ──────────────────────────────────────────────────
export const PAYPAL_ENABLED = env.VITE_ENABLE_PAYPAL === "true";
export const PAYPAL_LINKS = {
  'business-launch': {
    regular:    "https://www.paypal.com/ncp/payment/8YSATM2BUPHEN",
    firstTimer: null,
  },
  'ai-content': {
    regular:    "https://www.paypal.com/ncp/payment/GCCV8YC3T9UMU",
    firstTimer: "https://www.paypal.com/ncp/payment/367XXQA4G8U2G",
  },
  'ai-workflow': {
    regular:    "https://www.paypal.com/ncp/payment/2DMJTWP4L9KTG",
    firstTimer: "https://www.paypal.com/ncp/payment/MHCVUB8F6VDZC",
  },
  'ai-growth': {
    regular:    "https://www.paypal.com/ncp/payment/9R5PRE3643XK4",
    firstTimer: null,
  },
} as const;
export const N8N_WEBHOOK_URL  = env.VITE_N8N_FRONTEND_AGENT_URL || "https://elevatedsocial111.app.n8n.cloud/webhook/elevate-social-frontend-agent";

// ── Dynamic Checkout (n8n → Stripe Checkout Sessions) ─────────────────────────
export const CHECKOUT_WEBHOOK_URL = env.VITE_N8N_CHECKOUT_WEBHOOK_URL || "https://elevatedsocial111.app.n8n.cloud/webhook/elevate-social-create-checkout";
