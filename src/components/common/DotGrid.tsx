/** Decorative 28px dot-grid overlay. Absolute + non-interactive by default;
 *  drop it as the first child of a `relative` container. */
export function DotGrid({
  className = "absolute inset-0 pointer-events-none",
}: {
  className?: string;
}) {
  return (
    <div
      className={className}
      aria-hidden="true"
      style={{
        backgroundImage: "radial-gradient(var(--grid-dot) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }}
    />
  );
}
