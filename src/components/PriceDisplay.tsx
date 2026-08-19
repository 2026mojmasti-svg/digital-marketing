import type { Money } from "@/lib/types";

function format(money: Money) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: money.currency,
    maximumFractionDigits: 0,
  }).format(money.amount);
}

export function PriceDisplay({
  price,
  compareAt,
  className = "",
}: {
  price: Money;
  compareAt?: Money;
  className?: string;
}) {
  return (
    <span className={`inline-flex items-baseline gap-2 ${className}`}>
      <span>{format(price)}</span>
      {compareAt ? (
        <span className="text-ink-soft/60 line-through">{format(compareAt)}</span>
      ) : null}
    </span>
  );
}
