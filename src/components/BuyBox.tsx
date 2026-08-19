"use client";

import { useEffect, useMemo, useState } from "react";
import type { Product } from "@/lib/types";
import { PriceDisplay } from "./PriceDisplay";
import { ReviewStars } from "./ReviewStars";
import { SizeGuideModal } from "./SizeGuideModal";
import { useCart, useWishlist } from "@/lib/store";
import { trackEvent } from "@/lib/analytics";
import { getColorTone } from "@/lib/colorTones";

export function BuyBox({
  product,
  onColorChange,
  onColorHover,
}: {
  product: Product;
  onColorChange?: (color: string) => void;
  onColorHover?: (color: string | null) => void;
}) {
  const colors = Array.from(new Set(product.variants.map((v) => v.color)));
  const [color, setColor] = useState(colors[0]);
  const [size, setSize] = useState<string | null>(null);
  const [error, setError] = useState("");
  const addItem = useCart((s) => s.addItem);
  const wishlisted = useWishlist((s) => s.has(product.id));
  const toggleWishlist = useWishlist((s) => s.toggle);

  useEffect(() => {
    onColorChange?.(color);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [color]);

  const sizesForColor = useMemo(
    () => product.variants.filter((v) => v.color === color),
    [product.variants, color]
  );

  const selectedVariant = sizesForColor.find((v) => v.size === size);
  const lowStock = selectedVariant && selectedVariant.inStock && selectedVariant.inventory <= 3;

  function handleAdd() {
    if (!size) {
      setError("Please select a size.");
      return;
    }
    setError("");
    addItem(product, size, color);
  }

  return (
    <div>
      <p className="text-xs uppercase tracking-wider text-ink-soft/70">{product.categoryLabel}</p>
      <h1 className="mt-1 font-serif text-4xl leading-tight md:text-5xl">{product.name}</h1>
      <div className="mt-3 flex items-center gap-4">
        <PriceDisplay price={product.price} compareAt={product.compareAtPrice} className="text-lg" />
        <ReviewStars rating={product.rating} reviewCount={product.reviewCount} />
      </div>
      <p className="mt-5 max-w-md font-serif text-lg italic leading-relaxed text-ink-soft/90">
        {product.caption}
      </p>

      <div className="mt-8">
        <span className="mb-2 block text-xs uppercase tracking-wider text-ink-soft/70">
          Color — {color}
        </span>
        <div className="flex gap-2" role="group" aria-label="Select color">
          {colors.map((c) => {
            const tone = getColorTone(c, product.images[0].tone);
            return (
              <button
                key={c}
                type="button"
                aria-pressed={color === c}
                onClick={() => {
                  setColor(c);
                  setSize(null);
                }}
                onMouseEnter={() => onColorHover?.(c)}
                onMouseLeave={() => onColorHover?.(null)}
                onFocus={() => onColorHover?.(c)}
                onBlur={() => onColorHover?.(null)}
                className={`flex items-center gap-2 border px-4 py-2 text-sm transition-colors ${
                  color === c ? "border-ink bg-ink text-bone" : "border-line hover:border-ink"
                }`}
              >
                <span
                  aria-hidden="true"
                  className="h-3 w-3 rounded-full border border-ink/20"
                  style={{ backgroundImage: `linear-gradient(135deg, ${tone[0]}, ${tone[1]})` }}
                />
                {c}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-6">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs uppercase tracking-wider text-ink-soft/70">Size</span>
          <SizeGuideModal />
        </div>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Select size">
          {sizesForColor.map((v) => (
            <button
              key={v.id}
              type="button"
              disabled={!v.inStock}
              aria-pressed={size === v.size}
              onClick={() => {
                setSize(v.size);
                setError("");
              }}
              className={`relative border px-4 py-2 text-sm transition-colors ${
                !v.inStock
                  ? "cursor-not-allowed border-line text-ink-soft/40 line-through"
                  : size === v.size
                    ? "border-ink bg-ink text-bone"
                    : "border-line hover:border-ink"
              }`}
            >
              {v.size}
              {!v.inStock && <span className="sr-only"> (out of stock)</span>}
            </button>
          ))}
        </div>
        <p role="status" className="mt-2 min-h-[1.25rem] text-xs">
          {error ? <span className="text-accent-text">{error}</span> : null}
          {!error && lowStock ? (
            <span className="text-accent-text">Only {selectedVariant!.inventory} left in this size.</span>
          ) : null}
        </p>
      </div>

      <div className="mt-6 flex gap-3">
        <button
          type="button"
          onClick={handleAdd}
          className="flex-1 bg-ink py-4 text-sm uppercase tracking-wider text-bone transition-opacity hover:opacity-90"
        >
          {product.limitedDrop ? "Reserve" : "Add to Bag"}
        </button>
        <button
          type="button"
          onClick={() => toggleWishlist(product)}
          aria-pressed={wishlisted}
          aria-label={wishlisted ? "Remove from saved items" : "Save item"}
          className={`border px-5 text-sm transition-colors ${
            wishlisted ? "border-accent text-accent" : "border-ink hover:bg-bone-dim"
          }`}
        >
          {wishlisted ? "♥" : "♡"}
        </button>
      </div>

      <ul className="mt-6 space-y-1.5 border-t border-line pt-5 text-sm text-ink-soft/80">
        <li>Free shipping on orders over ₹2,999</li>
        <li>Free returns within 30 days</li>
        <li>Ships in 1–2 business days</li>
      </ul>
    </div>
  );
}

export function trackView(product: Product) {
  trackEvent({
    name: "view_item",
    params: {
      currency: "INR",
      value: product.price.amount,
      items: [
        {
          item_id: product.id,
          item_name: product.name,
          price: product.price.amount,
          item_category: product.categoryLabel,
        },
      ],
    },
  });
}
