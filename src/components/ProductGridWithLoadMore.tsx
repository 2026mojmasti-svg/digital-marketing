"use client";

import { useState } from "react";
import type { Product } from "@/lib/types";
import { ProductCard } from "./ProductCard";

const PAGE_SIZE = 8;

export function ProductGridWithLoadMore({ products, listName }: { products: Product[]; listName: string }) {
  const [visible, setVisible] = useState(PAGE_SIZE);
  const shown = products.slice(0, visible);

  if (products.length === 0) {
    return (
      <p className="py-24 text-center text-sm text-ink-soft/70">
        No products match these filters. Try clearing one.
      </p>
    );
  }

  return (
    <div>
      <ul className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3">
        {shown.map((p) => (
          <li key={p.id}>
            <ProductCard product={p} listName={listName} />
          </li>
        ))}
      </ul>
      {visible < products.length ? (
        <div className="mt-12 flex justify-center">
          <button
            type="button"
            onClick={() => setVisible((v) => v + PAGE_SIZE)}
            className="border border-ink px-8 py-3.5 text-sm uppercase tracking-wider transition-colors hover:bg-ink hover:text-bone"
          >
            Load More
          </button>
        </div>
      ) : null}
    </div>
  );
}
