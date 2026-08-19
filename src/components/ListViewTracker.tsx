"use client";

import { useEffect } from "react";
import type { Product } from "@/lib/types";
import { trackEvent } from "@/lib/analytics";

export function ListViewTracker({ products, listName }: { products: Product[]; listName: string }) {
  useEffect(() => {
    if (products.length === 0) return;
    trackEvent({
      name: "view_item_list",
      params: {
        item_list_name: listName,
        items: products.slice(0, 12).map((p) => ({
          item_id: p.id,
          item_name: p.name,
          price: p.price.amount,
          item_category: p.categoryLabel,
        })),
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listName, products.length]);
  return null;
}
