"use client";

import { useState } from "react";
import Image from "next/image";
import { stockPhotoUrl } from "@/lib/stockPhoto";

type Props = {
  query: string;
  seed: number;
  tone: [string, string];
  alt: string;
  className?: string;
  decorative?: boolean;
  priority?: boolean;
  sizes?: string;
  width?: number;
  height?: number;
};

/**
 * Real, keyword-relevant photography (via LoremFlickr) layered over the
 * brand's gradient+grain treatment. The gradient always renders first (so
 * there's no flash of blank space while the photo loads) and is the
 * permanent result if the photo ever fails to fetch — a broken remote
 * image degrades to on-brand design, never a broken-image icon.
 */
export function StockImage({
  query,
  seed,
  tone,
  alt,
  className = "",
  decorative = false,
  priority = false,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  width = 1200,
  height = 1500,
}: Props) {
  const [errored, setErrored] = useState(false);

  return (
    <div
      className={`grain relative overflow-hidden bg-ink ${className}`}
      style={{ backgroundImage: `linear-gradient(155deg, ${tone[0]} 0%, ${tone[1]} 100%)` }}
      role={errored && !decorative ? "img" : undefined}
      aria-label={errored && !decorative ? alt : undefined}
    >
      {!errored ? (
        <Image
          src={stockPhotoUrl(query, seed, width, height)}
          alt={decorative ? "" : alt}
          aria-hidden={decorative ? true : undefined}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
          onError={() => setErrored(true)}
        />
      ) : null}
    </div>
  );
}
