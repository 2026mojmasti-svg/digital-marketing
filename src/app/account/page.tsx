"use client";

import { useWishlist } from "@/lib/store";
import { useMounted } from "@/lib/useMounted";
import { PRODUCTS } from "@/lib/data";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ProductCard } from "@/components/ProductCard";
import { PriceDisplay } from "@/components/PriceDisplay";

const MOCK_ORDERS = [
  { id: "FR-482913", date: "2026-07-28", status: "Delivered", total: 6990 },
  { id: "FR-471205", date: "2026-06-14", status: "Delivered", total: 4280 },
];

const STYLE_TAGS = ["Editorial", "Minimal", "Autumn Palette", "Outerwear-Led"];

export default function AccountPage() {
  const wishlistIds = useWishlist((s) => s.productIds);
  const mounted = useMounted();
  const savedProducts = PRODUCTS.filter((p) => wishlistIds.includes(p.id));

  return (
    <div className="mx-auto max-w-[1100px] px-5 py-10 md:px-10">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Account" }]} />
      <h1 className="mt-4 font-serif text-4xl md:text-5xl">Account</h1>

      <section aria-labelledby="style-profile" className="mt-10 border-t border-line pt-8">
        <h2 id="style-profile" className="font-serif text-2xl">
          Style Profile
        </h2>
        <ul className="mt-3 flex flex-wrap gap-2">
          {STYLE_TAGS.map((tag) => (
            <li key={tag} className="border border-line px-3 py-1 text-xs uppercase tracking-wider">
              {tag}
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="order-history" className="mt-10 border-t border-line pt-8">
        <h2 id="order-history" className="font-serif text-2xl">
          Order History
        </h2>
        <table className="mt-4 w-full border-collapse text-left text-sm">
          <caption className="sr-only">Your recent orders</caption>
          <thead>
            <tr className="border-b border-ink text-xs uppercase tracking-wider text-ink-soft/70">
              <th scope="col" className="py-2">Order</th>
              <th scope="col" className="py-2">Date</th>
              <th scope="col" className="py-2">Status</th>
              <th scope="col" className="py-2 text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_ORDERS.map((o) => (
              <tr key={o.id} className="border-b border-line">
                <td className="py-3">{o.id}</td>
                <td className="py-3">{new Date(o.date).toLocaleDateString("en-US", { dateStyle: "medium" })}</td>
                <td className="py-3">{o.status}</td>
                <td className="py-3 text-right">
                  <PriceDisplay price={{ amount: o.total, currency: "INR" }} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section aria-labelledby="wishlist" className="mt-10 border-t border-line pt-8">
        <h2 id="wishlist" className="font-serif text-2xl">
          Saved Items
        </h2>
        {!mounted ? null : savedProducts.length === 0 ? (
          <p className="mt-4 text-sm text-ink-soft/70">Nothing saved yet — tap the heart on any product.</p>
        ) : (
          <ul className="mt-6 grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-4">
            {savedProducts.map((p) => (
              <li key={p.id}>
                <ProductCard product={p} listName="Saved Items" />
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
