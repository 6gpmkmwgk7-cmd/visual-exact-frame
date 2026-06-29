import { createFileRoute, useSearch, Link } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { isFirstTimeVisitor, markVisitorAsReturning, PAYPAL_ENABLED, PAYPAL_LINKS, CHECKOUT_WEBHOOK_URL } from '@/lib/siteConfig';

const CHECKOUT_N8N_KEYS: Record<string, string> = {
  'business-launch': 'business_presence',
  'ai-content':      'content_engine',
  'ai-workflow':     'automation',
  'ai-growth':       'growth_system',
};


const PACKAGES: Record<string, {
  name: string; price: string; billing: string; description: string;
  features: string[]; color: string; popular?: boolean;
  discountedPrice?: string; firstTimeOnly?: boolean;
}> = {
  'business-launch': {
    name: 'Business Presence Launch',
    price: '$149',
    billing: 'one-time',
    description: 'Complete AI-powered online presence built for your business — website, social, SEO & branding in 48 hours.',
    features: ['Custom website setup', 'Google Business Profile', 'Social media setup', 'Basic SEO optimization', 'Brand kit creation'],
    color: 'from-blue-500 to-cyan-500',
  },
  'ai-content': {
    name: 'AI Content Engine',
    price: '$299',
    discountedPrice: '$224',
    firstTimeOnly: true,
    billing: '/mo',
    description: 'Done-for-you AI content creation — posts, captions, emails & blogs every month on autopilot.',
    features: ['30 social media posts/mo', '4 SEO blog articles/mo', 'Email marketing campaigns', 'AI video scripts', 'Monthly performance report'],
    color: 'from-purple-500 to-pink-500',
  },
  'ai-workflow': {
    name: 'AI Workflow Automation',
    price: '$299',
    discountedPrice: '$224',
    firstTimeOnly: true,
    billing: 'one-time',
    description: 'Custom AI automation system for your business — save 20+ hours per week with smart workflows.',
    features: ['Lead capture automation', 'Email follow-up sequences', 'CRM integration', 'Booking automation', 'Custom AI chatbot'],
    color: 'from-orange-500 to-yellow-500',
  },
  'ai-growth': {
    name: 'AI Growth System',
    price: '$499',
    billing: '/mo',
    description: 'Full-service AI marketing & automation — everything you need to grow your business on autopilot.',
    features: ['All Content Engine features', 'All Workflow Automation features', 'Paid ads management', 'Weekly strategy call', 'Priority support 24/7'],
    color: 'from-emerald-500 to-teal-500',
    popular: true,
  },
};

export const Route = createFileRoute('/checkout')({
  component: CheckoutPage,
});

function CheckoutPage() {
  const search = useSearch({ from: '/checkout' });
  const pkg = ((search as any).package as string) || 'ai-growth';
  const plan = PACKAGES[pkg] || PACKAGES['ai-growth'];
  const [firstTimer, setFirstTimer] = useState(false);
  useEffect(() => { setFirstTimer(isFirstTimeVisitor()); markVisitorAsReturning(); }, []);
  const [stripeLoading, setStripeLoading] = useState(false);
  const [stripeError, setStripeError] = useState<string | null>(null);

  const handleStripe = async () => {
    setStripeLoading(true);
    setStripeError(null);
    try {
      const res = await fetch(CHECKOUT_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ package: CHECKOUT_N8N_KEYS[pkg], firstTimer: isFirstTimeVisitor() }),
      });
      if (!res.ok) throw new Error(`Checkout unavailable (${res.status})`);
      const data = await res.json();
      if (!data.checkoutUrl) throw new Error('No checkout URL returned');
      window.location.href = data.checkoutUrl;
    } catch (err) {
      setStripeError(err instanceof Error ? err.message : 'Checkout failed. Please try again.');
      setStripeLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background py-16 px-4">
      <div className="max-w-xl mx-auto">
        <Link to="/" className="text-sm text-muted-foreground hover:text-foreground mb-8 inline-flex items-center gap-2 transition-colors">
          ← Back to packages
        </Link>

        {/* Package summary */}
        <div className="rounded-2xl border border-border bg-card p-5 sm:p-8 mb-6 mt-4">
          {plan.popular && (
            <span className="inline-block bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full mb-3">
              ⭐ MOST POPULAR
            </span>
          )}
          <span className={`inline-block text-white text-xs font-semibold px-3 py-1 rounded-full bg-gradient-to-r ${plan.color} mb-3 ml-2`}>
            {plan.billing === 'one-time' ? 'One-Time Payment' : 'Monthly Subscription'}
          </span>
          <h1 className="text-3xl font-bold text-foreground mb-2">{plan.name}</h1>
          <p className="text-muted-foreground mb-5 text-sm leading-relaxed">{plan.description}</p>
          <div className="mb-5">
            {firstTimer && plan.firstTimeOnly && plan.discountedPrice ? (
              <>
                <div className="flex items-end gap-1">
                  <span className="text-5xl font-black text-electric">{plan.discountedPrice}</span>
                  <span className="text-muted-foreground mb-1 text-lg">{plan.billing}</span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="line-through text-muted-foreground text-sm">{plan.price}</span>
                  <span className="text-xs font-semibold text-green-500">25% off</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">First-time customers only — mention this discount when you book</p>
              </>
            ) : (
              <div className="flex items-end gap-1">
                <span className="text-5xl font-black text-foreground">{plan.price}</span>
                <span className="text-muted-foreground mb-1 text-lg">{plan.billing}</span>
              </div>
            )}
          </div>
          <ul className="space-y-2">
            {plan.features.map((f) => (
              <li key={f} className="flex items-center gap-2 text-sm text-foreground">
                <span className="text-emerald-500 font-bold">✓</span> {f}
              </li>
            ))}
          </ul>
        </div>

        {/* Payment */}
        <div className="rounded-2xl border border-border bg-card p-5 sm:p-8">
          <h2 className="text-xl font-bold text-foreground mb-6">Complete Your Order</h2>

          {/* Stripe */}
          <button
            onClick={handleStripe}
            disabled={stripeLoading}
            className="w-full flex items-center justify-center gap-3 bg-[#635BFF] hover:bg-[#5144e0] text-white font-semibold py-4 px-6 rounded-xl transition-all mb-1 text-base shadow-md hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {stripeLoading ? (
              <><Loader2 className="h-5 w-5 animate-spin" /> Processing…</>
            ) : (
              <>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <rect width="24" height="24" rx="6" fill="white" fillOpacity="0.2"/>
                  <path d="M11.5 7.5c0-.8.7-1.5 1.8-1.5 1.3 0 2.2.6 2.2 1.7 0 .9-.7 1.4-2.2 1.8-2.1.5-3.6 1.4-3.6 3.3 0 2 1.7 3.2 4 3.2 1.4 0 2.8-.4 3.6-1.1l-.7-1.4c-.7.6-1.8 1-2.9 1-1.1 0-1.9-.5-1.9-1.4 0-.8.7-1.3 2.2-1.7 2.2-.6 3.6-1.4 3.6-3.4 0-1.8-1.6-3.1-3.8-3.1-1.3 0-2.5.4-3.3 1l.7 1.4c.6-.5 1.5-.9 2.6-.9z" fill="white"/>
                </svg>
                Pay with Card (Stripe)
              </>
            )}
          </button>
          {stripeError && (
            <p className="text-xs text-red-500 text-center mt-2 mb-2">{stripeError}</p>
          )}

          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 border-t border-border" />
            <span className="text-xs text-muted-foreground px-2">OR</span>
            <div className="flex-1 border-t border-border" />
          </div>

          {/* PayPal */}
          {PAYPAL_ENABLED && (
            (() => {
              const links = PAYPAL_LINKS[pkg as keyof typeof PAYPAL_LINKS];
              const url = links
                ? ((firstTimer && plan.firstTimeOnly && links.firstTimer) ? links.firstTimer : links.regular)
                : null;
              if (!url) return null;
              return (
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-3 bg-[#FFC439] hover:bg-[#f0b429] text-[#003087] font-bold py-4 px-6 rounded-xl transition-all text-base shadow-md hover:shadow-lg"
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <rect width="24" height="24" rx="6" fill="#003087"/>
                    <text x="4" y="16" fontSize="9" fontWeight="bold" fill="#FFC439">PayPal</text>
                  </svg>
                  Pay with PayPal
                </a>
              );
            })()
          )}

          <div className="mt-6 pt-5 border-t border-border text-center">
            <p className="text-xs text-muted-foreground">
              🔒 256-bit SSL encryption. Your payment is 100% secure.
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Questions? Email <a href="mailto:socialselavates@gmail.com" className="underline hover:text-foreground transition-colors">socialselavates@gmail.com</a>
            </p>
          </div>
        </div>

        {/* Other packages */}
        <div className="mt-8">
          <p className="text-sm text-muted-foreground text-center mb-4">Or explore other packages:</p>
          <div className="grid grid-cols-2 gap-3">
            {Object.entries(PACKAGES).filter(([key]) => key !== pkg).map(([key, p]) => (
              <Link
                key={key}
                to="/checkout"
                search={{ package: key } as any}
                className="rounded-xl border border-border bg-card p-4 hover:border-primary/50 transition-all text-left group"
              >
                <div className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors">{p.name}</div>
                <div className="text-lg font-bold text-foreground mt-1">{p.price}<span className="text-xs text-muted-foreground font-normal">{p.billing}</span></div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}