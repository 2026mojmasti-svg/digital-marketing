"use client";

// GA4-shaped ecommerce event dispatch. Swap the transport (currently
// window.gtag + dataLayer push) for Segment/CDP by editing sendEvent only —
// call sites never change.

type Item = {
  item_id: string;
  item_name: string;
  price: number;
  item_category?: string;
  item_variant?: string;
  quantity?: number;
};

type EcommerceEvent =
  | { name: "view_item_list"; params: { item_list_name: string; items: Item[] } }
  | { name: "select_item"; params: { item_list_name: string; items: Item[] } }
  | { name: "view_item"; params: { currency: "USD"; value: number; items: Item[] } }
  | { name: "add_to_cart"; params: { currency: "USD"; value: number; items: Item[] } }
  | { name: "remove_from_cart"; params: { currency: "USD"; value: number; items: Item[] } }
  | { name: "add_to_wishlist"; params: { currency: "USD"; value: number; items: Item[] } }
  | { name: "begin_checkout"; params: { currency: "USD"; value: number; items: Item[] } }
  | {
      name: "purchase";
      params: { currency: "USD"; value: number; transaction_id: string; shipping: number; items: Item[] };
    };

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(event: EcommerceEvent) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event: event.name, ecommerce: event.params });
  window.gtag?.("event", event.name, event.params);
  if (process.env.NODE_ENV === "development") {
    console.debug("[analytics]", event.name, event.params);
  }
}
