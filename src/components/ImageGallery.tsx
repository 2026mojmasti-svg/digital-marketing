"use client";

import { useState } from "react";
import { StockImage } from "./StockImage";
import type { Product } from "@/lib/types";

export function ImageGallery({ images }: { images: Product["images"] }) {
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState(false);

  return (
    <div>
      <div className="flex gap-3">
        <div className="hidden w-20 shrink-0 flex-col gap-3 md:flex" role="tablist" aria-label="Product images">
          {images.map((img, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={active === i}
              aria-label={`View image ${i + 1}: ${img.alt}`}
              onClick={() => setActive(i)}
              className={`aspect-[4/5] w-full border transition-colors ${
                active === i ? "border-ink" : "border-line hover:border-ink-soft"
              }`}
            >
              <StockImage
                query={img.query}
                seed={img.seed}
                tone={img.tone}
                alt=""
                decorative
                sizes="80px"
                className="h-full w-full"
              />
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setZoom((z) => !z)}
          aria-label={zoom ? "Zoom out of product image" : "Zoom into product image"}
          className="relative aspect-[4/5] w-full flex-1 cursor-zoom-in overflow-hidden bg-bone-dim"
        >
          <StockImage
            query={images[active].query}
            seed={images[active].seed}
            tone={images[active].tone}
            alt={images[active].alt}
            priority
            sizes="(min-width: 768px) 50vw, 100vw"
            className={`h-full w-full transition-transform duration-500 ${zoom ? "scale-150 cursor-zoom-out" : "scale-100"}`}
          />
        </button>
      </div>

      {/* Mobile thumbnail scrubber */}
      <div className="mt-3 flex gap-2 overflow-x-auto md:hidden" role="tablist" aria-label="Product images">
        {images.map((img, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={active === i}
            aria-label={`View image ${i + 1}: ${img.alt}`}
            onClick={() => setActive(i)}
            className={`aspect-[4/5] w-16 shrink-0 border ${active === i ? "border-ink" : "border-line"}`}
          >
            <StockImage
              query={img.query}
              seed={img.seed}
              tone={img.tone}
              alt=""
              decorative
              sizes="64px"
              className="h-full w-full"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
