export function ReviewStars({
  rating,
  reviewCount,
  hideCount = false,
  className = "",
}: {
  rating: number;
  reviewCount: number;
  hideCount?: boolean;
  className?: string;
}) {
  const stars = Array.from({ length: 5 }, (_, i) => i < Math.round(rating));
  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      <span className="sr-only">{`Rated ${rating} out of 5${hideCount ? "" : ` from ${reviewCount} review${reviewCount === 1 ? "" : "s"}`}`}</span>
      <span aria-hidden="true" className="flex gap-0.5 text-accent">
        {stars.map((filled, i) => (
          <span key={i}>{filled ? "★" : "☆"}</span>
        ))}
      </span>
      {hideCount ? null : (
        <span aria-hidden="true" className="text-xs text-ink-soft/70">
          ({reviewCount})
        </span>
      )}
    </div>
  );
}
