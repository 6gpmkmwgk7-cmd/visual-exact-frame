// src/lib/siteConfig.ts — Single source of truth for Elevate Social
const env = import.meta.env;

export const SITE_NAME     = "Elevate Social";
export const SITE_URL      = env.VITE_SITE_URL     || "https://www.elevatesocially.com";
export const SITE_EMAIL    = env.VITE_SITE_EMAIL   || "socialselavates@gmail.com";
export const SITE_PHONE    = env.VITE_SITE_PHONE   || "";
export const SITE_LOCATION = "Canada";

export const GOOGLE_BUSINESS_URL = env.VITE_GOOGLE_BUSINESS_URL || "";
export const INSTAGRAM_URL       = env.VITE_INSTAGRAM_URL        || "https://www.instagram.com/elevates_social";
export const FACEBOOK_URL        = env.VITE_FACEBOOK_URL         || "https://www.facebook.com/profile.php?id=61590247691371";
export const LINKEDIN_URL        = env.VITE_LINKEDIN_URL         || "";

export const FIRST_TIMER_PROMO_CODE  = "FIRST25";
export const FIRST_TIMER_STORAGE_KEY = "elevate_returning_visitor";

export function isFirstTimeVisitor(): boolean {
  try { return !localStorage.getItem(FIRST_TIMER_STORAGE_KEY); } catch { return false; }
}
export function markVisitorAsReturning(): void {
  try { localStorage.setItem(FIRST_TIMER_STORAGE_KEY, "1"); } catch { /* ignore */ }
}
export function withPromo(stripeUrl: string): string {
  if (!stripeUrl) return "#";
  if (!isFirstTimeVisitor()) return stripeUrl;
  const sep = stripeUrl.includes("?") ? "&" : "?";
  return `${stripeUrl}${sep}prefilled_promo_code=${FIRST_TIMER_PROMO_CODE}`;
}

export const STRIPE_LINKS = {
  businessPresence: env.VITE_STRIPE_BUSINESS_PRESENCE_URL || "", // CA$149 one-time
  contentEngine:    env.VITE_STRIPE_CONTENT_ENGINE_URL    || "", // CA$299/mo
  aiAutomation:     env.VITE_STRIPE_AUTOMATION_URL        || "", // CA$299 one-time
  growthSystem:     env.VITE_STRIPE_GROWTH_SYSTEM_URL     || "", // CA$499/mo
} as const;

export const PAYPAL_ENABLED   = env.VITE_ENABLE_PAYPAL    === "true";
export const PAYPAL_CLIENT_ID = env.VITE_PAYPAL_CLIENT_ID || "";
export const N8N_WEBHOOK_URL  = env.VITE_N8N_FRONTEND_AGENT_URL || "";
