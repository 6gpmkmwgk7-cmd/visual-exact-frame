import { useMemo } from "react";

interface ParticleFieldProps {
  count?: number;
  className?: string;
}

export function ParticleField({ count = 22, className = "" }: ParticleFieldProps) {
  const particles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const size = 3 + Math.random() * 7;
        return {
          id: i,
          left: `${Math.random() * 100}%`,
          size,
          duration: 12 + Math.random() * 16,
          delay: -Math.random() * 20,
          drift: `${(Math.random() - 0.5) * 160}px`,
          opacity: 0.4 + Math.random() * 0.5,
        };
      }),
    [count],
  );

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {particles.map((p) => (
        <span
          key={p.id}
          className="particle"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            opacity: p.opacity,
            ["--drift" as string]: p.drift,
          }}
        />
      ))}
    </div>
  );
}
