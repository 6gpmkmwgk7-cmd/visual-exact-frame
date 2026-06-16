import { createFileRoute, Link, useSearch } from '@tanstack/react-router';

export const Route = createFileRoute('/payment-cancel')({
  component: PaymentCancelPage,
});

function PaymentCancelPage() {
  const search = useSearch({ from: '/payment-cancel' });
  const pkg = ((search as any).package as string) || '';

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="w-20 h-20 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01M12 2a10 10 0 100 20A10 10 0 0012 2z" />
          </svg>
        </div>
        <h1 className="text-3xl font-black text-foreground mb-3">Payment Cancelled</h1>
        <p className="text-muted-foreground mb-8 text-base leading-relaxed">
          No problem — your payment was cancelled and you were not charged.
          Come back whenever you're ready!
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
          <Link
            to="/checkout"
            search={pkg ? { package: pkg } as any : undefined}
            className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-semibold px-6 py-3 rounded-xl hover:opacity-90 transition-opacity"
          >
            Try Again
          </Link>
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 border border-border text-foreground font-semibold px-6 py-3 rounded-xl hover:bg-card transition-colors"
          >
            Back to Home
          </Link>
        </div>
        <p className="text-xs text-muted-foreground">
          Have questions?{' '}
          <a href="mailto:socialselavates@gmail.com" className="underline hover:text-foreground transition-colors">
            Contact us
          </a>{' '}
          — we're happy to help.
        </p>
      </div>
    </main>
  );
}