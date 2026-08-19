type Props = {
  tone: [string, string];
  alt: string;
  className?: string;
  label?: string;
  decorative?: boolean;
};

/**
 * Stand-in for campaign/product photography. Renders a warm-graded gradient
 * with the shared grain texture so the layout reads correctly without real
 * assets — swap for next/image once photography is available (same aspect
 * boxes, same alt strategy).
 */
export function ProductImage({ tone, alt, className = "", label, decorative = false }: Props) {
  return (
    <div
      role={decorative ? undefined : "img"}
      aria-label={decorative ? undefined : alt}
      aria-hidden={decorative ? true : undefined}
      className={`grain relative overflow-hidden bg-ink ${className}`}
      style={{
        backgroundImage: `linear-gradient(155deg, ${tone[0]} 0%, ${tone[1]} 100%)`,
      }}
    >
      {label ? (
        <span className="absolute bottom-3 left-3 z-[2] font-serif text-sm italic text-bone/80">
          {label}
        </span>
      ) : null}
    </div>
  );
}
