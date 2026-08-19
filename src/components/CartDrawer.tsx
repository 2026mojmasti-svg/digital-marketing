"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { useCart, cartTotal, FREE_SHIPPING_THRESHOLD } from "@/lib/store";
import { PriceDisplay } from "./PriceDisplay";

export function CartDrawer() {
  const isOpen = useCart((s) => s.isDrawerOpen);
  const closeDrawer = useCart((s) => s.closeDrawer);
  const lines = useCart((s) => s.lines);
  const removeItem = useCart((s) => s.removeItem);
  const updateQuantity = useCart((s) => s.updateQuantity);
  const lastAnnouncement = useCart((s) => s.lastAnnouncement);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const total = cartTotal(lines);
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - total);
  const progress = Math.min(100, (total / FREE_SHIPPING_THRESHOLD) * 100);

  useEffect(() => {
    if (isOpen) closeBtnRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") closeDrawer();
      if (e.key === "Tab" && panelRef.current) {
        const focusable = panelRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
    if (isOpen) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, closeDrawer]);

  return (
    <>
      <div aria-live="polite" role="status" className="sr-only">
        {lastAnnouncement}
      </div>
      {isOpen ? (
        <div className="fixed inset-0 z-50">
          <button
            aria-label="Close bag"
            className="absolute inset-0 bg-ink/40"
            onClick={closeDrawer}
          />
          <div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Shopping bag"
            className="animate-fade-rise absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-bone shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-line px-6 py-5">
              <h2 className="font-serif text-2xl">Your Bag</h2>
              <button
                ref={closeBtnRef}
                type="button"
                onClick={closeDrawer}
                className="text-sm uppercase tracking-wider underline-offset-4 hover:underline"
              >
                Close
              </button>
            </div>

            <div className="border-b border-line px-6 py-4">
              <div className="h-1 w-full bg-bone-dim">
                <div
                  className="h-1 bg-accent transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="mt-2 text-xs text-ink-soft/80">
                {remaining > 0
                  ? `Add ₹${remaining.toLocaleString("en-IN")} more for free shipping.`
                  : "You've unlocked free shipping."}
              </p>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4">
              {lines.length === 0 ? (
                <p className="py-12 text-center text-sm text-ink-soft/70">Your bag is empty.</p>
              ) : (
                <ul className="space-y-6">
                  {lines.map((line) => (
                    <li key={`${line.productId}-${line.size}-${line.color}`} className="flex gap-4">
                      <div className="h-24 w-20 shrink-0 bg-bone-dim" />
                      <div className="flex-1">
                        <div className="flex justify-between gap-2">
                          <Link
                            href={`/product/${line.handle}`}
                            onClick={closeDrawer}
                            className="font-serif text-base hover:text-accent-text"
                          >
                            {line.name}
                          </Link>
                          <PriceDisplay
                            price={{ amount: line.price * line.quantity, currency: "INR" }}
                            className="text-sm"
                          />
                        </div>
                        <p className="mt-1 text-xs text-ink-soft/70">
                          {line.color} / {line.size}
                        </p>
                        <div className="mt-2 flex items-center gap-3">
                          <label className="sr-only" htmlFor={`qty-${line.productId}-${line.size}-${line.color}`}>
                            Quantity for {line.name}
                          </label>
                          <select
                            id={`qty-${line.productId}-${line.size}-${line.color}`}
                            value={line.quantity}
                            onChange={(e) =>
                              updateQuantity(line.productId, line.size, line.color, Number(e.target.value))
                            }
                            className="border border-line bg-transparent px-2 py-1 text-xs"
                          >
                            {Array.from({ length: 5 }, (_, i) => i + 1).map((n) => (
                              <option key={n} value={n}>
                                {n}
                              </option>
                            ))}
                          </select>
                          <button
                            type="button"
                            onClick={() => removeItem(line.productId, line.size, line.color)}
                            className="text-xs text-ink-soft/70 underline-offset-2 hover:text-accent-text hover:underline"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {lines.length > 0 ? (
              <div className="border-t border-line px-6 py-6">
                <div className="mb-4 flex items-center justify-between text-sm">
                  <span>Subtotal</span>
                  <PriceDisplay price={{ amount: total, currency: "INR" }} />
                </div>
                <Link
                  href="/checkout"
                  onClick={closeDrawer}
                  className="block w-full bg-ink py-4 text-center text-sm uppercase tracking-wider text-bone transition-opacity hover:opacity-90"
                >
                  Checkout
                </Link>
                <Link
                  href="/cart"
                  onClick={closeDrawer}
                  className="mt-3 block w-full border border-ink py-4 text-center text-sm uppercase tracking-wider hover:bg-bone-dim"
                >
                  View Bag
                </Link>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
}
