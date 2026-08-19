"use client";

import { useRef } from "react";
import { ProductCard } from "./ProductCard";
import type { Product } from "@/lib/types";

export function NewArrivalsCarousel({ products }: { products: Product[] }) {
  const scrollerRef = useRef<HTMLUListElement>(null);

  function scrollBy(dir: 1 | -1) {
    scrollerRef.current?.scrollBy({ left: dir * 360, behavior: "smooth" });
  }

  return (
    <section aria-labelledby="new-arrivals-heading" className="mx-auto max-w-[1600px] px-5 py-20 md:px-10">
      <div className="flex items-baseline justify-between">
        <h2 id="new-arrivals-heading" className="font-serif text-3xl md:text-4xl">
          New Arrivals
        </h2>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => scrollBy(-1)}
            aria-label="Scroll new arrivals left"
            className="flex h-9 w-9 items-center justify-center border border-ink hover:bg-ink hover:text-bone"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => scrollBy(1)}
            aria-label="Scroll new arrivals right"
            className="flex h-9 w-9 items-center justify-center border border-ink hover:bg-ink hover:text-bone"
          >
            →
          </button>
        </div>
      </div>
      <ul
        ref={scrollerRef}
        className="mt-8 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4"
        style={{ scrollbarWidth: "none" }}
      >
        {products.map((p) => (
          <li key={p.id} className="w-64 shrink-0 snap-start md:w-80">
            <ProductCard product={p} listName="New Arrivals" />
          </li>
        ))}
      </ul>
    </section>
  );
}
