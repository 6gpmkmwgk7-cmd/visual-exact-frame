/**
 * Pure-SVG animated AI dashboard mockup.
 * Lightweight: no JS animations, CSS-only.
 */
export function AIDashboardMockup({ className = "" }: { className?: string }) {
  const bars = [40, 65, 52, 78, 60, 88, 72];
  return (
    <div className={`relative ${className}`}>
      {/* Glow */}
      <div className="absolute -inset-6 rounded-3xl bg-gradient-to-tr from-cyan/30 via-electric/20 to-purple/30 blur-2xl opacity-70" />
      <div className="relative rounded-2xl border border-white/10 bg-[#0B1733]/90 p-5 shadow-2xl backdrop-blur">
        {/* Window chrome */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-400/80" />
          </div>
          <span className="text-[10px] font-mono text-cyan/70">elevate.ai / sample dashboard</span>
          <span className="inline-flex items-center gap-1 rounded-full border border-green-400/30 bg-green-400/10 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-green-300">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-400" />
            Live
          </span>
        </div>

        {/* Stats row */}
        <div className="mt-4 grid grid-cols-3 gap-3">
          {[
            { l: "Posts Generated", v: "1,284" },
            { l: "Automations", v: "37" },
            { l: "Leads Captured", v: "412" },
          ].map((s) => (
            <div key={s.l} className="rounded-lg border border-white/10 bg-white/[0.04] p-2.5">
              <p className="text-[9px] uppercase tracking-wider text-white/50">{s.l}</p>
              <p className="mt-1 font-display text-base font-bold text-white">{s.v}</p>
              <div className="mt-1 h-1 w-full overflow-hidden rounded-full bg-white/10">
                <div className="h-full w-2/3 bg-gradient-to-r from-cyan to-purple" />
              </div>
            </div>
          ))}
        </div>

        {/* Chart */}
        <div className="mt-4 rounded-lg border border-white/10 bg-white/[0.03] p-3">
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-white/60">Engagement</p>
            <p className="text-[10px] text-cyan">+24.6%</p>
          </div>
          <svg viewBox="0 0 280 90" className="mt-2 h-24 w-full">
            <defs>
              <linearGradient id="barGrad" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#67E8F9" />
                <stop offset="100%" stopColor="#8B5CF6" />
              </linearGradient>
              <linearGradient id="lineGrad" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0%" stopColor="#06B6D4" />
                <stop offset="100%" stopColor="#8B5CF6" />
              </linearGradient>
            </defs>
            {bars.map((h, i) => (
              <rect
                key={i}
                x={10 + i * 38}
                y={90 - h}
                width="24"
                height={h}
                rx="3"
                fill="url(#barGrad)"
                className="animate-bar-grow"
                style={{ animationDelay: `${i * 120}ms` }}
              />
            ))}
            <path
              d="M22 60 L60 40 L98 50 L136 25 L174 38 L212 18 L250 28"
              fill="none"
              stroke="url(#lineGrad)"
              strokeWidth="2"
              strokeLinecap="round"
              className="animate-dash-flow"
            />
          </svg>
        </div>

        {/* Activity */}
        <div className="mt-3 space-y-1.5">
          {[
            "AI generated 12 captions for @local-bistro",
            "Lead captured · qualified · booked",
            "Workflow synced to Google Calendar",
          ].map((t, i) => (
            <div
              key={t}
              className="flex items-center gap-2 rounded border border-white/5 bg-white/[0.03] px-2 py-1.5 text-[10px] text-white/70"
              style={{ animation: "fade-in 600ms ease-out both", animationDelay: `${800 + i * 200}ms` }}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-cyan animate-pulse" />
              {t}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
