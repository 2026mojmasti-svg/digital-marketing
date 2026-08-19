import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  className?: string;
  decorative?: boolean;
  priority?: boolean;
  sizes?: string;
};

/**
 * Real photography (local files under public/images/, so no network
 * dependency at request time) — used for the slots that have a genuine
 * photo instead of the SVG illustration. `next/image` handles
 * responsive sizing, lazy-loading, and modern-format negotiation
 * (AVIF/WebP) automatically.
 *
 * `className` (the caller's positioning — "absolute inset-0", "h-full
 * w-full", etc.) goes on an outer div with no classes of its own, and the
 * component's own layout ("relative", sizing, overflow) goes on a nested
 * inner div. Putting a hardcoded `relative` in the same class string as a
 * caller-supplied `absolute` is a same-property conflict Tailwind resolves
 * by generation order, not source order — sometimes the wrong one wins.
 * Two elements means the two can never collide.
 */
export function RealPhoto({ src, alt, className = "", decorative = false, priority = false, sizes = "100vw" }: Props) {
  return (
    <div className={className}>
      <div className="relative h-full w-full overflow-hidden bg-bone-dim">
        <Image
          src={src}
          alt={decorative ? "" : alt}
          aria-hidden={decorative ? true : undefined}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      </div>
    </div>
  );
}
