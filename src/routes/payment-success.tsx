import { createFileRoute, Link, useSearch } from '@tanstack/react-router';

export const Route = createFileRoute('/payment-success')({
  component: PaymentSuccessPage,
});

function PaymentSuccessPage() {
  const search = useSearch({ from: '/payment-success' });
  const method = ((search as any).method as string) || 'card';
  const pkg = ((search as any).package as string) || '';

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-3xl font-black text-foreground mb-3">Payment Successful! 🎉</h1>
        <p className="text-muted-foreground mb-2 text-lg">
          Thank you for choosing <strong className="text-foreground">Elevate Social</strong>.
        </p>
        <p className="text-muted-foreground mb-8 text-sm">
          We received your {method === 'paypal' ? 'PayPal' : 'card'} payment. You'll receive a confirmation email within 15 minutes.
        </p>
        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6 mb-8 text-left">
          <h2 className="font-bold text-foreground mb-3">What happens next?</h2>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex gap-2"><span className="text-emerald-500">1.</span> Check your email for your order confirmation</li>
            <li className="flex gap-2"><span className="text-emerald-500">2.</span> Our team contacts you within 24 hours</li>
            <li className="flex gap-2"><span className="text-emerald-500">3.</span> We start building your solution right away</li>
            <li className="flex gap-2"><span className="text-emerald-500">4.</span> Results delivered within agreed timeframe</li>
          </ul>
        </div>
        <p className="text-xs text-muted-foreground mb-6">
          Questions? Email us at{' '}
          <a href="mailto:socialselavates@gmail.com" className="underline hover:text-foreground transition-colors">
            socialselavates@gmail.com
          </a>
        </p>
        <Link to="/" className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-6 py-3 rounded-xl hover:opacity-90 transition-opacity">
          ← Back to Home
        </Link>
      </div>
    </main>
  );
}