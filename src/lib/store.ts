"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "./types";
import { trackEvent } from "./analytics";

export type CartLine = {
  productId: string;
  handle: string;
  name: string;
  price: number;
  size: string;
  color: string;
  quantity: number;
  category: string;
};

type CartState = {
  lines: CartLine[];
  isDrawerOpen: boolean;
  lastAnnouncement: string;
  openDrawer: () => void;
  closeDrawer: () => void;
  addItem: (product: Product, size: string, color: string, quantity?: number) => void;
  removeItem: (productId: string, size: string, color: string) => void;
  updateQuantity: (productId: string, size: string, color: string, quantity: number) => void;
  clear: () => void;
};

export const FREE_SHIPPING_THRESHOLD = 15000;

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      lines: [],
      isDrawerOpen: false,
      lastAnnouncement: "",
      openDrawer: () => set({ isDrawerOpen: true }),
      closeDrawer: () => set({ isDrawerOpen: false }),
      addItem: (product, size, color, quantity = 1) => {
        const lines = [...get().lines];
        const idx = lines.findIndex(
          (l) => l.productId === product.id && l.size === size && l.color === color
        );
        if (idx > -1) {
          lines[idx] = { ...lines[idx], quantity: lines[idx].quantity + quantity };
        } else {
          lines.push({
            productId: product.id,
            handle: product.handle,
            name: product.name,
            price: product.price.amount,
            size,
            color,
            quantity,
            category: product.categoryLabel,
          });
        }
        set({
          lines,
          isDrawerOpen: true,
          lastAnnouncement: `${product.name} (${size}, ${color}) added to bag.`,
        });
        trackEvent({
          name: "add_to_cart",
          params: {
            currency: "INR",
            value: product.price.amount * quantity,
            items: [
              {
                item_id: product.id,
                item_name: product.name,
                price: product.price.amount,
                item_category: product.categoryLabel,
                item_variant: `${color} / ${size}`,
                quantity,
              },
            ],
          },
        });
      },
      removeItem: (productId, size, color) => {
        const removed = get().lines.find(
          (l) => l.productId === productId && l.size === size && l.color === color
        );
        set({
          lines: get().lines.filter(
            (l) => !(l.productId === productId && l.size === size && l.color === color)
          ),
          lastAnnouncement: removed ? `${removed.name} removed from bag.` : get().lastAnnouncement,
        });
        if (removed) {
          trackEvent({
            name: "remove_from_cart",
            params: {
              currency: "INR",
              value: removed.price * removed.quantity,
              items: [
                {
                  item_id: removed.productId,
                  item_name: removed.name,
                  price: removed.price,
                  item_variant: `${removed.color} / ${removed.size}`,
                  quantity: removed.quantity,
                },
              ],
            },
          });
        }
      },
      updateQuantity: (productId, size, color, quantity) => {
        set({
          lines: get()
            .lines.map((l) =>
              l.productId === productId && l.size === size && l.color === color
                ? { ...l, quantity: Math.max(1, quantity) }
                : l
            ),
        });
      },
      clear: () => set({ lines: [] }),
    }),
    { name: "cart-storage" }
  )
);

export function cartTotal(lines: CartLine[]) {
  return lines.reduce((sum, l) => sum + l.price * l.quantity, 0);
}

export function cartCount(lines: CartLine[]) {
  return lines.reduce((sum, l) => sum + l.quantity, 0);
}

type WishlistState = {
  productIds: string[];
  toggle: (product: Product) => void;
  has: (productId: string) => boolean;
};

export const useWishlist = create<WishlistState>()(
  persist(
    (set, get) => ({
      productIds: [],
      has: (productId) => get().productIds.includes(productId),
      toggle: (product) => {
        const exists = get().productIds.includes(product.id);
        set({
          productIds: exists
            ? get().productIds.filter((id) => id !== product.id)
            : [...get().productIds, product.id],
        });
        if (!exists) {
          trackEvent({
            name: "add_to_wishlist",
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
      },
    }),
    { name: "wishlist-storage" }
  )
);
