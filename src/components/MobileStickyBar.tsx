"use client";

import { useEffect, useState } from "react";
import type { Product } from "@/lib/types";
import { PriceDisplay } from "./PriceDisplay";

export function MobileStickyBar({ product }: { product: Product }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 480);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 flex items-center justify-between gap-4 border-t border-line bg-bone/95 px-5 py-3 backdrop-blur md:hidden">
      <div>
        <p className="font-serif text-base leading-tight">{product.name}</p>
        <PriceDisplay price={product.price} className="text-sm" />
      </div>
      <button
        type="button"
        onClick={() => {
          document.getElementById("buy-box")?.scrollIntoView({ behavior: "smooth", block: "center" });
        }}
        className="min-h-[44px] min-w-[44px] bg-ink px-5 text-sm uppercase tracking-wider text-bone"
      >
        {product.limitedDrop ? "Reserve" : "Add to Bag"}
      </button>
    </div>
  );
}
