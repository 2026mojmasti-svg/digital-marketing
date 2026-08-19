"use client";

import { useEffect } from "react";
import type { Product } from "@/lib/types";
import { trackView } from "./BuyBox";

export function PdpViewTracker({ product }: { product: Product }) {
  useEffect(() => {
    trackView(product);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product.id]);
  return null;
}
