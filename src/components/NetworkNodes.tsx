/**
 * Animated workflow / network diagram. Pure SVG + CSS.
 */
export function NetworkNodes({ className = "" }: { className?: string }) {
  const nodes = [
    { x: 60, y: 90, label: "Lead" },
    { x: 200, y: 40, label: "AI" },
    { x: 200, y: 140, label: "CRM" },
    { x: 340, y: 90, label: "Booking" },
    { x: 480, y: 60, label: "Email" },
    { x: 480, y: 130, label: "SMS" },
  ];
  const edges: Array<[number, number]> = [
    [0, 1], [0, 2], [1, 3], [2, 3], [3, 4], [3, 5],
  ];

  return (
    <svg
      viewBox="0 0 540 200"
      className={`h-full w-full ${className}`}
      role="img"
      aria-label="Animated AI workflow diagram"
    >
      <defs>
        <linearGradient id="edgeGrad" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="#06B6D4" />
          <stop offset="100%" stopColor="#8B5CF6" />
        </linearGradient>
        <radialGradient id="nodeGrad">
          <stop offset="0%" stopColor="#67E8F9" />
          <stop offset="70%" stopColor="#2563EB" />
          <stop offset="100%" stopColor="#1E3A8A" />
        </radialGradient>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" />
        </filter>
      </defs>

      {edges.map(([a, b], i) => {
        const n1 = nodes[a];
        const n2 = nodes[b];
        return (
          <line
            key={i}
            x1={n1.x}
            y1={n1.y}
            x2={n2.x}
            y2={n2.y}
            stroke="url(#edgeGrad)"
            strokeWidth="1.5"
            strokeOpacity="0.9"
            className="animate-dash-flow"
            style={{ animationDelay: `${i * 300}ms` }}
          />
        );
      })}

      {nodes.map((n, i) => (
        <g key={n.label} style={{ animationDelay: `${i * 220}ms` }} className="animate-node-pulse">
          <circle cx={n.x} cy={n.y} r="14" fill="url(#nodeGrad)" filter="url(#glow)" opacity="0.6" />
          <circle cx={n.x} cy={n.y} r="9" fill="url(#nodeGrad)" />
          <text
            x={n.x}
            y={n.y + 32}
            textAnchor="middle"
            fontSize="10"
            fontFamily="Inter, sans-serif"
            fill="rgba(255,255,255,0.75)"
            fontWeight="600"
          >
            {n.label}
          </text>
        </g>
      ))}
    </svg>
  );
}
