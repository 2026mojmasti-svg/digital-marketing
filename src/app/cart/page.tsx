"use client";

import Link from "next/link";
import { useCart, cartTotal, FREE_SHIPPING_THRESHOLD } from "@/lib/store";
import { useMounted } from "@/lib/useMounted";
import { PriceDisplay } from "@/components/PriceDisplay";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ExitIntentSaveCart } from "@/components/ExitIntentSaveCart";
import { trackEvent } from "@/lib/analytics";

export default function CartPage() {
  const lines = useCart((s) => s.lines);
  const removeItem = useCart((s) => s.removeItem);
  const updateQuantity = useCart((s) => s.updateQuantity);
  const mounted = useMounted();

  const total = mounted ? cartTotal(lines) : 0;
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - total);
  const progress = Math.min(100, (total / FREE_SHIPPING_THRESHOLD) * 100);

  return (
    <div className="mx-auto max-w-[1100px] px-5 py-10 md:px-10">
      <ExitIntentSaveCart />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Bag" }]} />
      <h1 className="mt-4 font-serif text-4xl md:text-5xl">Your Bag</h1>

      {!mounted ? null : lines.length === 0 ? (
        <div className="py-24 text-center">
          <p className="text-sm text-ink-soft/70">Your bag is empty.</p>
          <Link
            href="/shop"
            className="mt-6 inline-block border border-ink px-7 py-3.5 text-sm uppercase tracking-wider hover:bg-ink hover:text-bone"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="border-b border-line pb-4">
              <div className="h-1 w-full bg-bone-dim">
                <div className="h-1 bg-accent transition-all duration-500" style={{ width: `${progress}%` }} />
              </div>
              <p className="mt-2 text-xs text-ink-soft/80">
                {remaining > 0
                  ? `Add $${remaining.toFixed(0)} more for free shipping.`
                  : "You've unlocked free shipping."}
              </p>
            </div>
            <ul className="divide-y divide-line">
              {lines.map((line) => (
                <li key={`${line.productId}-${line.size}-${line.color}`} className="flex gap-5 py-6">
                  <div className="h-32 w-24 shrink-0 bg-bone-dim" />
                  <div className="flex-1">
                    <div className="flex justify-between gap-2">
                      <Link href={`/product/${line.handle}`} className="font-serif text-lg hover:text-accent-text">
                        {line.name}
                      </Link>
                      <PriceDisplay price={{ amount: line.price * line.quantity, currency: "USD" }} />
                    </div>
                    <p className="mt-1 text-sm text-ink-soft/70">
                      {line.color} / {line.size}
                    </p>
                    <div className="mt-3 flex items-center gap-4">
                      <label className="text-xs uppercase tracking-wider text-ink-soft/70" htmlFor={`qty-${line.productId}-${line.size}-${line.color}`}>
                        Qty
                      </label>
                      <select
                        id={`qty-${line.productId}-${line.size}-${line.color}`}
                        value={line.quantity}
                        onChange={(e) =>
                          updateQuantity(line.productId, line.size, line.color, Number(e.target.value))
                        }
                        className="border border-line bg-transparent px-2 py-1 text-sm"
                      >
                        {Array.from({ length: 5 }, (_, i) => i + 1).map((n) => (
                          <option key={n} value={n}>
                            {n}
                          </option>
                        ))}
                      </select>
                      <Link
                        href={`/product/${line.handle}`}
                        className="text-xs uppercase tracking-wider underline-offset-4 hover:underline"
                      >
                        Edit size/color
                      </Link>
                      <button
                        type="button"
                        onClick={() => removeItem(line.productId, line.size, line.color)}
                        className="text-xs uppercase tracking-wider text-ink-soft/70 underline-offset-4 hover:text-accent-text hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="h-fit border border-line p-6 lg:sticky lg:top-24">
            <h2 className="font-serif text-xl">Order Summary</h2>
            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <dt>Subtotal</dt>
                <dd>
                  <PriceDisplay price={{ amount: total, currency: "USD" }} />
                </dd>
              </div>
              <div className="flex justify-between text-ink-soft/70">
                <dt>Shipping</dt>
                <dd>{remaining > 0 ? "Calculated at checkout" : "Free"}</dd>
              </div>
              <div className="flex justify-between text-ink-soft/70">
                <dt>Tax</dt>
                <dd>Calculated at checkout</dd>
              </div>
            </dl>
            <Link
              href="/checkout"
              onClick={() =>
                trackEvent({
                  name: "begin_checkout",
                  params: {
                    currency: "USD",
                    value: total,
                    items: lines.map((l) => ({
                      item_id: l.productId,
                      item_name: l.name,
                      price: l.price,
                      item_category: l.category,
                      item_variant: `${l.color} / ${l.size}`,
                      quantity: l.quantity,
                    })),
                  },
                })
              }
              className="mt-6 block w-full bg-ink py-4 text-center text-sm uppercase tracking-wider text-bone transition-opacity hover:opacity-90"
            >
              Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
