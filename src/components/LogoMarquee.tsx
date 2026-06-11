import type { ComponentType } from "react";

interface Item {
  name: string;
  icon: ComponentType<{ className?: string }>;
}

export function LogoMarquee({ items }: { items: Item[] }) {
  // Duplicate for seamless loop
  const loop = [...items, ...items];
  return (
    <div className="marquee-mask relative overflow-hidden">
      <div className="flex w-max animate-marquee gap-4">
        {loop.map((t, i) => (
          <div
            key={`${t.name}-${i}`}
            className="group flex shrink-0 items-center gap-3 rounded-2xl border border-border bg-card px-6 py-4 transition hover:border-cyan/50 hover:shadow-glow"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-accent text-white transition group-hover:scale-110">
              <t.icon className="h-5 w-5" />
            </div>
            <span className="font-display text-sm font-semibold">{t.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
