"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useCart, cartTotal } from "@/lib/store";
import { useMounted } from "@/lib/useMounted";
import { PriceDisplay } from "@/components/PriceDisplay";
import { trackEvent } from "@/lib/analytics";

const STEPS = ["Information", "Shipping", "Payment"] as const;
const SHIPPING_FLAT = 12;
const TAX_RATE = 0.0875;

export default function CheckoutPage() {
  const lines = useCart((s) => s.lines);
  const clear = useCart((s) => s.clear);
  const [step, setStep] = useState(0);
  const [orderId, setOrderId] = useState<string | null>(null);
  const mounted = useMounted();

  const subtotal = mounted ? cartTotal(lines) : 0;
  const shipping = subtotal > 250 || subtotal === 0 ? 0 : SHIPPING_FLAT;
  const tax = useMemo(() => Math.round(subtotal * TAX_RATE * 100) / 100, [subtotal]);
  const total = subtotal + shipping + tax;

  function completeOrder() {
    const id = `FR-${Math.floor(100000 + Math.random() * 900000)}`;
    trackEvent({
      name: "purchase",
      params: {
        currency: "USD",
        value: total,
        transaction_id: id,
        shipping,
        items: lines.map((l) => ({
          item_id: l.productId,
          item_name: l.name,
          price: l.price,
          item_category: l.category,
          item_variant: `${l.color} / ${l.size}`,
          quantity: l.quantity,
        })),
      },
    });
    setOrderId(id);
    clear();
  }

  if (mounted && orderId) {
    return (
      <div className="mx-auto max-w-[640px] px-5 py-24 text-center md:px-10">
        <p className="text-xs uppercase tracking-wider text-accent-text">Order Confirmed</p>
        <h1 className="mt-3 font-serif text-4xl">Thank you.</h1>
        <p className="mt-4 text-sm text-ink-soft/80">
          Order <strong>{orderId}</strong> is confirmed. A receipt and tracking link are on their way to your
          inbox — expect delivery in 3–5 business days.
        </p>
        <Link
          href="/shop"
          className="mt-8 inline-block border border-ink px-7 py-3.5 text-sm uppercase tracking-wider hover:bg-ink hover:text-bone"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  if (mounted && lines.length === 0) {
    return (
      <div className="mx-auto max-w-[640px] px-5 py-24 text-center md:px-10">
        <p className="text-sm text-ink-soft/70">Your bag is empty — add something before checking out.</p>
        <Link
          href="/shop"
          className="mt-6 inline-block border border-ink px-7 py-3.5 text-sm uppercase tracking-wider hover:bg-ink hover:text-bone"
        >
          Shop Now
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1100px] px-5 py-10 md:px-10">
      <h1 className="font-serif text-3xl">Checkout</h1>

      {/* Progress indicator */}
      <ol className="mt-6 flex items-center gap-3 text-xs uppercase tracking-wider" aria-label="Checkout progress">
        {STEPS.map((label, i) => (
          <li key={label} className="flex items-center gap-3">
            <span
              aria-current={i === step ? "step" : undefined}
              className={`flex h-6 w-6 items-center justify-center rounded-full border text-[11px] ${
                i <= step ? "border-ink bg-ink text-bone" : "border-line text-ink-soft/50"
              }`}
            >
              {i + 1}
            </span>
            <span className={i === step ? "text-ink" : "text-ink-soft/50"}>{label}</span>
            {i < STEPS.length - 1 ? <span aria-hidden="true" className="mx-1 text-ink-soft/30">—</span> : null}
          </li>
        ))}
      </ol>

      {/* One-tap payment options up top, before the form */}
      <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {["Apple Pay", "Google Pay", "PayPal"].map((method) => (
          <button
            key={method}
            type="button"
            onClick={completeOrder}
            className="border border-ink py-3 text-sm font-medium transition-colors hover:bg-ink hover:text-bone"
          >
            {method}
          </button>
        ))}
      </div>
      <div className="my-8 flex items-center gap-4 text-xs uppercase tracking-wider text-ink-soft/60">
        <span className="h-px flex-1 bg-line" /> or continue below <span className="h-px flex-1 bg-line" />
      </div>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
        <form
          className="lg:col-span-2"
          onSubmit={(e) => {
            e.preventDefault();
            if (step < STEPS.length - 1) setStep(step + 1);
            else completeOrder();
          }}
        >
          {step === 0 ? (
            <fieldset className="space-y-4">
              <legend className="mb-2 font-serif text-xl">Contact</legend>
              <p className="text-xs text-ink-soft/70">
                Have an account?{" "}
                <Link href="/account" className="underline underline-offset-2">
                  Sign in
                </Link>{" "}
                — or continue as a guest below.
              </p>
              <div>
                <label htmlFor="email" className="mb-1 block text-xs uppercase tracking-wider">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="w-full border border-ink bg-transparent px-4 py-3 text-sm outline-none focus-visible:border-accent"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="first-name" className="mb-1 block text-xs uppercase tracking-wider">
                    First name
                  </label>
                  <input
                    id="first-name"
                    required
                    autoComplete="given-name"
                    className="w-full border border-ink bg-transparent px-4 py-3 text-sm outline-none focus-visible:border-accent"
                  />
                </div>
                <div>
                  <label htmlFor="last-name" className="mb-1 block text-xs uppercase tracking-wider">
                    Last name
                  </label>
                  <input
                    id="last-name"
                    required
                    autoComplete="family-name"
                    className="w-full border border-ink bg-transparent px-4 py-3 text-sm outline-none focus-visible:border-accent"
                  />
                </div>
              </div>
            </fieldset>
          ) : null}

          {step === 1 ? (
            <fieldset className="space-y-4">
              <legend className="mb-2 font-serif text-xl">Shipping Address</legend>
              <div>
                <label htmlFor="address" className="mb-1 block text-xs uppercase tracking-wider">
                  Address
                </label>
                <input
                  id="address"
                  required
                  autoComplete="street-address"
                  className="w-full border border-ink bg-transparent px-4 py-3 text-sm outline-none focus-visible:border-accent"
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label htmlFor="city" className="mb-1 block text-xs uppercase tracking-wider">
                    City
                  </label>
                  <input
                    id="city"
                    required
                    autoComplete="address-level2"
                    className="w-full border border-ink bg-transparent px-4 py-3 text-sm outline-none focus-visible:border-accent"
                  />
                </div>
                <div>
                  <label htmlFor="state" className="mb-1 block text-xs uppercase tracking-wider">
                    State
                  </label>
                  <input
                    id="state"
                    required
                    autoComplete="address-level1"
                    className="w-full border border-ink bg-transparent px-4 py-3 text-sm outline-none focus-visible:border-accent"
                  />
                </div>
                <div>
                  <label htmlFor="zip" className="mb-1 block text-xs uppercase tracking-wider">
                    ZIP
                  </label>
                  <input
                    id="zip"
                    required
                    autoComplete="postal-code"
                    className="w-full border border-ink bg-transparent px-4 py-3 text-sm outline-none focus-visible:border-accent"
                  />
                </div>
              </div>
            </fieldset>
          ) : null}

          {step === 2 ? (
            <fieldset className="space-y-4">
              <legend className="mb-2 font-serif text-xl">Payment</legend>
              <div>
                <label htmlFor="card" className="mb-1 block text-xs uppercase tracking-wider">
                  Card number
                </label>
                <input
                  id="card"
                  required
                  inputMode="numeric"
                  autoComplete="cc-number"
                  className="w-full border border-ink bg-transparent px-4 py-3 text-sm outline-none focus-visible:border-accent"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="expiry" className="mb-1 block text-xs uppercase tracking-wider">
                    Expiry
                  </label>
                  <input
                    id="expiry"
                    required
                    placeholder="MM/YY"
                    autoComplete="cc-exp"
                    className="w-full border border-ink bg-transparent px-4 py-3 text-sm outline-none focus-visible:border-accent"
                  />
                </div>
                <div>
                  <label htmlFor="cvc" className="mb-1 block text-xs uppercase tracking-wider">
                    CVC
                  </label>
                  <input
                    id="cvc"
                    required
                    inputMode="numeric"
                    autoComplete="cc-csc"
                    className="w-full border border-ink bg-transparent px-4 py-3 text-sm outline-none focus-visible:border-accent"
                  />
                </div>
              </div>
            </fieldset>
          ) : null}

          <div className="mt-8 flex gap-3">
            {step > 0 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="border border-ink px-6 py-3.5 text-sm uppercase tracking-wider hover:bg-bone-dim"
              >
                Back
              </button>
            ) : null}
            <button
              type="submit"
              className="flex-1 bg-ink py-3.5 text-sm uppercase tracking-wider text-bone transition-opacity hover:opacity-90"
            >
              {step < STEPS.length - 1 ? "Continue" : "Place Order"}
            </button>
          </div>
        </form>

        <div className="h-fit border border-line p-6 lg:sticky lg:top-24">
          <h2 className="font-serif text-xl">Order Summary</h2>
          <ul className="mt-4 space-y-3 border-b border-line pb-4 text-sm">
            {lines.map((line) => (
              <li key={`${line.productId}-${line.size}-${line.color}`} className="flex justify-between gap-2">
                <span className="text-ink-soft/80">
                  {line.name} × {line.quantity}
                  <span className="block text-xs text-ink-soft/60">
                    {line.color} / {line.size}
                  </span>
                </span>
                <PriceDisplay price={{ amount: line.price * line.quantity, currency: "USD" }} />
              </li>
            ))}
          </ul>
          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <dt>Subtotal</dt>
              <dd>
                <PriceDisplay price={{ amount: subtotal, currency: "USD" }} />
              </dd>
            </div>
            <div className="flex justify-between">
              <dt>Shipping</dt>
              <dd>{shipping === 0 ? "Free" : <PriceDisplay price={{ amount: shipping, currency: "USD" }} />}</dd>
            </div>
            <div className="flex justify-between">
              <dt>Tax (est.)</dt>
              <dd>
                <PriceDisplay price={{ amount: tax, currency: "USD" }} />
              </dd>
            </div>
            <div className="flex justify-between border-t border-line pt-2 font-medium">
              <dt>Total</dt>
              <dd>
                <PriceDisplay price={{ amount: total, currency: "USD" }} />
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
