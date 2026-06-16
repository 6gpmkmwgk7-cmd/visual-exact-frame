import { createFileRoute, useSearch, Link } from '@tanstack/react-router';
import { useEffect, useState } from 'react';

// STRIPE PAYMENT LINKS — Replace with real URLs from https://dashboard.stripe.com/payment-links
const STRIPE_LINKS: Record<string, string> = {
  'business-launch': 'https://buy.stripe.com/5kQbJ34X69ky4yn34G3ZK00',
  'ai-content': 'https://buy.stripe.com/cNi3cxblufIWfd1fRs3ZK01',
  'ai-workflow': 'https://buy.stripe.com/cNi28tblu7cq0i734G3ZK02',
  'ai-growth': 'https://buy.stripe.com/9B6fZjdtC9kyc0PcFg3ZK03',
};

// PAYPAL CLIENT ID — Replace from https://developer.paypal.com/dashboard/applications
const PAYPAL_CLIENT_ID = 'AXq5plyctSjcgwWZHFOStdrxyMklS-3QwXGm5r3CNRZfwUb1AYnTPzN5PwLdeesC8PcauCmF-w6yroW1';

const PACKAGES: Record<string, {
  name: string; price: string; billing: string; description: string;
  features: string[]; color: string; popular?: boolean;
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
    billing: '/mo',
    description: 'Done-for-you AI content creation — posts, captions, emails & blogs every month on autopilot.',
    features: ['30 social media posts/mo', '4 SEO blog articles/mo', 'Email marketing campaigns', 'AI video scripts', 'Monthly performance report'],
    color: 'from-purple-500 to-pink-500',
  },
  'ai-workflow': {
    name: 'AI Workflow Automation',
    price: '$299',
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

declare global { interface Window { paypal?: any; } }

function CheckoutPage() {
  const search = useSearch({ from: '/checkout' });
  const pkg = ((search as any).package as string) || 'ai-growth';
  const plan = PACKAGES[pkg] || PACKAGES['ai-growth'];
  const [paypalLoaded, setPaypalLoaded] = useState(false);
  const [paypalRendered, setPaypalRendered] = useState(false);

  useEffect(() => {
    if (window.paypal) { setPaypalLoaded(true); return; }
    if (PAYPAL_CLIENT_ID === 'AXq5plyctSjcgwWZHFOStdrxyMklS-3QwXGm5r3CNRZfwUb1AYnTPzN5PwLdeesC8PcauCmF-w6yroW1') return;
    const script = document.createElement('script');
    script.src = `https://www.paypal.com/sdk/js?client-id=${PAYPAL_CLIENT_ID}&currency=USD`;
    script.onload = () => setPaypalLoaded(true);
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    if (!paypalLoaded || !window.paypal || paypalRendered) return;
    const container = document.getElementById('paypal-button-container');
    if (!container) return;
    const amount = plan.price.replace('$', '').replace(',', '');
    window.paypal.Buttons({
      style: { layout: 'vertical', color: 'blue', shape: 'rect', label: 'paypal', height: 48 },
      createOrder: (_data: any, actions: any) => actions.order.create({
        purchase_units: [{ amount: { value: amount }, description: plan.name }],
      }),
      onApprove: (_data: any, actions: any) =>
        actions.order.capture().then(() => {
          window.location.href = `/payment-success?method=paypal&package=${pkg}`;
        }),
      onError: () => alert('PayPal payment failed. Please try again or use card.'),
    }).render('#paypal-button-container');
    setPaypalRendered(true);
  }, [paypalLoaded, pkg, plan, paypalRendered]);

  const handleStripe = () => {
    const url = STRIPE_LINKS[pkg];
    if (!url || url.includes('REPLACE_ME')) {
      window.location.href = `mailto:socialselavates@gmail.com?subject=Order: ${plan.name}&body=I'd like to purchase the ${plan.name} package (${plan.price}${plan.billing}).`;
      return;
    }
    window.location.href = url + `?client_reference_id=${pkg}&success_url=${encodeURIComponent(window.location.origin + '/payment-success')}&cancel_url=${encodeURIComponent(window.location.origin + '/payment-cancel')}`;
  };

  return (
    <main className="min-h-screen bg-background py-16 px-4">
      <div className="max-w-xl mx-auto">
        <Link to="/" className="text-sm text-muted-foreground hover:text-foreground mb-8 inline-flex items-center gap-2 transition-colors">
          ← Back to packages
        </Link>

        {/* Package summary */}
        <div className="rounded-2xl border border-border bg-card p-8 mb-6 mt-4">
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
          <div className="flex items-end gap-1 mb-5">
            <span className="text-5xl font-black text-foreground">{plan.price}</span>
            <span className="text-muted-foreground mb-1 text-lg">{plan.billing}</span>
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
        <div className="rounded-2xl border border-border bg-card p-8">
          <h2 className="text-xl font-bold text-foreground mb-6">Complete Your Order</h2>

          {/* Stripe */}
          <button
            onClick={handleStripe}
            className="w-full flex items-center justify-center gap-3 bg-[#635BFF] hover:bg-[#5144e0] text-white font-semibold py-4 px-6 rounded-xl transition-all mb-4 text-base shadow-md hover:shadow-lg"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <rect width="24" height="24" rx="6" fill="white" fillOpacity="0.2"/>
              <path d="M11.5 7.5c0-.8.7-1.5 1.8-1.5 1.3 0 2.2.6 2.2 1.7 0 .9-.7 1.4-2.2 1.8-2.1.5-3.6 1.4-3.6 3.3 0 2 1.7 3.2 4 3.2 1.4 0 2.8-.4 3.6-1.1l-.7-1.4c-.7.6-1.8 1-2.9 1-1.1 0-1.9-.5-1.9-1.4 0-.8.7-1.3 2.2-1.7 2.2-.6 3.6-1.4 3.6-3.4 0-1.8-1.6-3.1-3.8-3.1-1.3 0-2.5.4-3.3 1l.7 1.4c.6-.5 1.5-.9 2.6-.9z" fill="white"/>
            </svg>
            Pay with Card (Stripe)
          </button>

          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 border-t border-border" />
            <span className="text-xs text-muted-foreground px-2">OR</span>
            <div className="flex-1 border-t border-border" />
          </div>

          {/* PayPal */}
          {PAYPAL_CLIENT_ID === 'AXq5plyctSjcgwWZHFOStdrxyMklS-3QwXGm5r3CNRZfwUb1AYnTPzN5PwLdeesC8PcauCmF-w6yroW1' ? (
            <button
              onClick={() => window.location.href = `mailto:socialselavates@gmail.com?subject=PayPal Order: ${plan.name}&body=I'd like to pay via PayPal for the ${plan.name} package (${plan.price}${plan.billing}).`}
              className="w-full flex items-center justify-center gap-3 bg-[#FFC439] hover:bg-[#f0b429] text-[#003087] font-bold py-4 px-6 rounded-xl transition-all text-base shadow-md hover:shadow-lg"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <rect width="24" height="24" rx="6" fill="#003087"/>
                <text x="4" y="16" fontSize="9" fontWeight="bold" fill="#FFC439">PayPal</text>
              </svg>
              Pay with PayPal
            </button>
          ) : (
            <div id="paypal-button-container" className="min-h-[52px]">
              {!paypalLoaded && (
                <div className="w-full flex items-center justify-center bg-[#FFC439]/80 text-[#003087] font-bold py-4 rounded-xl opacity-60 text-base">
                  Loading PayPal...
                </div>
              )}
            </div>
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