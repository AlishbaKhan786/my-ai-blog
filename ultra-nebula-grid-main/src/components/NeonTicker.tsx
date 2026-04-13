export function NeonTicker() {
  return (
    <div className="neon-ticker-bar fixed top-0 left-0 right-0 z-50 overflow-hidden border-b border-primary/20 bg-background/80 backdrop-blur-md">
      <div className="neon-ticker-content flex whitespace-nowrap py-1.5">
        {Array.from({ length: 8 }).map((_, i) => (
          <span
            key={i}
            className="mx-8 inline-block font-mono text-xs font-bold uppercase tracking-[0.3em] text-primary"
            style={{
              textShadow:
                "0 0 8px var(--color-primary), 0 0 20px var(--color-primary)",
            }}
          >
            ⚠ UNDER CONSTRUCTION ⚠
          </span>
        ))}
      </div>
    </div>
  );
}
