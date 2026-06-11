import { useState } from "react";
import { X, Mail, Lock, User, Eye, EyeOff, Sparkles, CheckCircle2, ArrowRight } from "lucide-react";

type Mode = "login" | "signup";

interface AuthModalProps {
  onClose: () => void;
  defaultMode?: Mode;
}

export function AuthModal({ onClose, defaultMode = "login" }: AuthModalProps) {
  const [mode, setMode] = useState<Mode>(defaultMode);
  const [show, setShow] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDone(true);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-navy/80 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-navy shadow-[0_0_80px_rgba(6,182,212,0.2)]">
        {/* Top glow bar */}
        <div className="h-1 w-full bg-gradient-gold" />

        <div className="p-8">
          <button
            onClick={onClose}
            className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/60 transition hover:bg-white/20"
          >
            <X className="h-4 w-4" />
          </button>

          {/* Logo / Brand */}
          <div className="flex items-center gap-2 mb-6">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-gold shadow-glow">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <span className="font-display text-lg font-semibold text-white">
              Elevate <span className="text-cyan">Socials</span>
            </span>
          </div>

          {done ? (
            <div className="py-8 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-gold shadow-glow">
                <CheckCircle2 className="h-8 w-8 text-white" />
              </div>
              <h3 className="mt-5 font-display text-2xl font-bold text-white">
                {mode === "signup" ? "Account Created!" : "Welcome back!"}
              </h3>
              <p className="mt-2 text-sm text-white/60">
                {mode === "signup"
                  ? "Your account is ready. We'll be in touch soon."
                  : "You're now signed in to your account."}
              </p>
              <button
                onClick={onClose}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-gold px-6 py-3 text-sm font-semibold text-white shadow-glow"
              >
                Continue <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <>
              {/* Tab switcher */}
              <div className="mb-6 flex rounded-2xl border border-white/10 bg-white/5 p-1">
                {(["login", "signup"] as Mode[]).map((m) => (
                  <button
                    key={m}
                    onClick={() => setMode(m)}
                    className={`flex-1 rounded-xl py-2.5 text-sm font-semibold capitalize transition ${
                      mode === m
                        ? "bg-gradient-gold text-white shadow-glow"
                        : "text-white/50 hover:text-white/80"
                    }`}
                  >
                    {m === "login" ? "Sign In" : "Sign Up"}
                  </button>
                ))}
              </div>

              <h2 className="font-display text-2xl font-bold text-white">
                {mode === "login" ? "Welcome back" : "Create your account"}
              </h2>
              <p className="mt-1 text-sm text-white/50">
                {mode === "login"
                  ? "Sign in to manage your AI growth dashboard."
                  : "Join Elevate Socials and start growing with AI."}
              </p>

              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                {mode === "signup" && (
                  <AuthField icon={<User className="h-4 w-4" />} placeholder="Full name" type="text" required />
                )}
                <AuthField icon={<Mail className="h-4 w-4" />} placeholder="Email address" type="email" required />
                <div className="relative">
                  <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/40">
                    <Lock className="h-4 w-4" />
                  </div>
                  <input
                    type={show ? "text" : "password"}
                    required
                    placeholder="Password"
                    className="w-full rounded-xl border border-white/15 bg-white/5 pl-11 pr-11 py-3 text-sm text-white placeholder-white/40 outline-none transition focus:border-cyan focus:ring-2 focus:ring-cyan/20"
                  />
                  <button
                    type="button"
                    onClick={() => setShow(!show)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70"
                  >
                    {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>

                {mode === "signup" && (
                  <div className="flex items-start gap-2.5">
                    <input type="checkbox" required id="terms" className="mt-0.5 h-4 w-4 accent-cyan" />
                    <label htmlFor="terms" className="text-xs text-white/50 leading-relaxed">
                      I agree to the <span className="text-cyan cursor-pointer hover:underline">Terms of Service</span> and <span className="text-cyan cursor-pointer hover:underline">Privacy Policy</span>
                    </label>
                  </div>
                )}

                <button
                  type="submit"
                  className="btn-premium mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-gold py-3.5 text-sm font-semibold text-white shadow-glow transition hover:opacity-95"
                >
                  {mode === "login" ? "Sign In" : "Create Account"}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>

              {mode === "login" && (
                <p className="mt-4 text-center text-xs text-white/40">
                  <span className="cursor-pointer text-cyan hover:underline">Forgot password?</span>
                </p>
              )}

              <p className="mt-4 text-center text-xs text-white/40">
                {mode === "login" ? "Don't have an account? " : "Already have an account? "}
                <button
                  onClick={() => setMode(mode === "login" ? "signup" : "login")}
                  className="text-cyan hover:underline"
                >
                  {mode === "login" ? "Sign up free" : "Sign in"}
                </button>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function AuthField({ icon, placeholder, type, required }: { icon: React.ReactNode; placeholder: string; type: string; required?: boolean }) {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/40">{icon}</div>
      <input
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-xl border border-white/15 bg-white/5 py-3 pl-11 pr-4 text-sm text-white placeholder-white/40 outline-none transition focus:border-cyan focus:ring-2 focus:ring-cyan/20"
      />
    </div>
  );
}
