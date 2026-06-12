import { useEffect, useRef, useState } from "react";

interface CounterProps {
  to: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}

export function Counter({ to, duration = 1600, suffix = "", prefix = "", className = "" }: CounterProps) {
  const ref = useRef<HTMLSpanElement | null>(null);
  // Initialise with the final value so SSR and no-JS / no-IO clients always
  // see the real number instead of a zero placeholder.
  const [val, setVal] = useState(to);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setVal(to);
      return;
    }
    // Reset to 0 on the client so the count-up animation is visible.
    setVal(0);
    let raf = 0;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !started.current) {
            started.current = true;
            try {
              const start = performance.now();
              const step = (now: number) => {
                const t = Math.min(1, (now - start) / duration);
                const eased = 1 - Math.pow(1 - t, 3);
                setVal(Math.round(to * eased));
                if (t < 1) raf = requestAnimationFrame(step);
              };
              raf = requestAnimationFrame(step);
            } catch {
              setVal(to);
            }
            io.disconnect();
          }
        });
      },
      { threshold: 0.25, rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);
    // Safety net: if for any reason the observer never fires (e.g. element
    // already past viewport on mobile, reduced-motion shortcuts), make sure
    // the final value is shown shortly after mount.
    const fallback = window.setTimeout(() => {
      if (!started.current) setVal(to);
    }, 1200);
    return () => {
      io.disconnect();
      window.clearTimeout(fallback);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [to, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {val.toLocaleString()}
      {suffix}
    </span>
  );
}
