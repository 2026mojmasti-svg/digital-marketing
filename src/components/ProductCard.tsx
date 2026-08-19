"use client";

import Link from "next/link";
import { useState } from "react";
import type { Product } from "@/lib/types";
import { StockImage } from "./StockImage";
import { PriceDisplay } from "./PriceDisplay";
import { useCart } from "@/lib/store";
import { trackEvent } from "@/lib/analytics";

export function ProductCard({ product, listName = "Product Grid" }: { product: Product; listName?: string }) {
  const [quickAddOpen, setQuickAddOpen] = useState(false);
  const addItem = useCart((s) => s.addItem);
  const availableSizes = Array.from(new Set(product.variants.filter((v) => v.inStock).map((v) => v.size)));
  const primaryColor = product.variants[0]?.color ?? product.colorway;

  return (
    <article className="group relative">
      <Link
        href={`/product/${product.handle}`}
        className="block"
        onClick={() =>
          trackEvent({
            name: "select_item",
            params: {
              item_list_name: listName,
              items: [
                {
                  item_id: product.id,
                  item_name: product.name,
                  price: product.price.amount,
                  item_category: product.categoryLabel,
                },
              ],
            },
          })
        }
      >
        <div className="relative aspect-[4/5] overflow-hidden bg-bone-dim">
          <StockImage
            query={product.images[0].query}
            seed={product.images[0].seed}
            tone={product.images[0].tone}
            alt={product.images[0].alt}
            sizes="(min-width: 1024px) 33vw, 50vw"
            className="absolute inset-0"
          />
          {product.images[1] ? (
            <StockImage
              query={product.images[1].query}
              seed={product.images[1].seed}
              tone={product.images[1].tone}
              alt=""
              decorative
              sizes="(min-width: 1024px) 33vw, 50vw"
              className="crossfade-b absolute inset-0"
            />
          ) : null}
          {product.limitedDrop ? (
            <span className="absolute left-3 top-3 z-[2] bg-ink px-2.5 py-1 font-sans text-[11px] font-medium uppercase tracking-wider text-bone">
              Limited Drop
            </span>
          ) : null}
          <span
            aria-hidden="true"
            className="absolute right-3 top-3 z-[2] flex h-8 w-8 items-center justify-center rounded-full bg-bone/90 text-ink opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          >
            +
          </span>
        </div>
        <div className="mt-3 flex items-start justify-between gap-3">
          <div>
            <h3 className="font-serif text-lg leading-tight">{product.name}</h3>
            <p className="mt-1 text-sm text-ink-soft/80">{product.categoryLabel}</p>
          </div>
          <PriceDisplay price={product.price} className="whitespace-nowrap font-sans text-sm" />
        </div>
      </Link>

      {/* Quick-add-to-bag on hover (desktop) / tap (mobile) */}
      <div className="mt-2 hidden md:block">
        {quickAddOpen ? (
          <div className="flex flex-wrap gap-1.5" role="group" aria-label={`Quick add ${product.name} to bag`}>
            {availableSizes.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => {
                  addItem(product, size, primaryColor);
                  setQuickAddOpen(false);
                }}
                className="border border-ink px-2.5 py-1 text-xs transition-colors hover:bg-ink hover:text-bone focus-visible:bg-ink focus-visible:text-bone"
              >
                {size}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setQuickAddOpen(false)}
              className="px-2 py-1 text-xs text-ink-soft/70 underline-offset-2 hover:underline"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setQuickAddOpen(true)}
            className="w-full translate-y-1 border border-ink/0 py-2 text-center text-xs uppercase tracking-wider opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:border-ink group-hover:opacity-100 focus-visible:translate-y-0 focus-visible:border-ink focus-visible:opacity-100"
          >
            Quick Add
          </button>
        )}
      </div>
    </article>
  );
}
