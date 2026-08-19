"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import type { SortKey } from "@/lib/data";

const SIZES = ["XS", "S", "M", "L", "XL"];
const COLORS = ["Bone", "Ink", "Rust", "Olive", "Denim Blue", "Indigo", "Berry", "Black"];
const PRICE_CAPS = [
  { label: "Any price", value: "" },
  { label: "Under ₹1,500", value: "1500" },
  { label: "Under ₹3,000", value: "3000" },
  { label: "Under ₹5,000", value: "5000" },
];

export function FilterSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const activeSizes = params.get("size")?.split(",").filter(Boolean) ?? [];
  const activeColors = params.get("color")?.split(",").filter(Boolean) ?? [];
  const maxPrice = params.get("maxPrice") ?? "";
  const sort = (params.get("sort") as SortKey) ?? "featured";

  function setParam(key: string, value: string | null) {
    const next = new URLSearchParams(params.toString());
    if (value) next.set(key, value);
    else next.delete(key);
    router.push(`${pathname}?${next.toString()}`, { scroll: false });
  }

  function toggleMulti(key: "size" | "color", value: string) {
    const current = key === "size" ? activeSizes : activeColors;
    const next = current.includes(value) ? current.filter((v) => v !== value) : [...current, value];
    setParam(key, next.length ? next.join(",") : null);
  }

  return (
    <aside className="md:sticky md:top-24 md:h-fit md:w-64 md:shrink-0" aria-label="Filter products">
      <div className="mb-6">
        <label htmlFor="sort" className="mb-2 block text-xs uppercase tracking-wider text-ink-soft/70">
          Sort
        </label>
        <select
          id="sort"
          value={sort}
          onChange={(e) => setParam("sort", e.target.value === "featured" ? null : e.target.value)}
          className="w-full border border-ink bg-transparent px-3 py-2 text-sm"
        >
          <option value="featured">Featured</option>
          <option value="newest">Newest</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
      </div>

      <fieldset className="mb-6 border-t border-line pt-6">
        <legend className="mb-3 text-xs uppercase tracking-wider text-ink-soft/70">Size</legend>
        <div className="flex flex-wrap gap-2">
          {SIZES.map((size) => {
            const active = activeSizes.includes(size);
            return (
              <button
                key={size}
                type="button"
                aria-pressed={active}
                onClick={() => toggleMulti("size", size)}
                className={`border px-3 py-1.5 text-xs transition-colors ${
                  active ? "border-ink bg-ink text-bone" : "border-line hover:border-ink"
                }`}
              >
                {size}
              </button>
            );
          })}
        </div>
      </fieldset>

      <fieldset className="mb-6 border-t border-line pt-6">
        <legend className="mb-3 text-xs uppercase tracking-wider text-ink-soft/70">Color</legend>
        <div className="space-y-2">
          {COLORS.map((color) => {
            const id = `color-${color}`;
            return (
              <div key={color} className="flex items-center gap-2">
                <input
                  id={id}
                  type="checkbox"
                  checked={activeColors.includes(color)}
                  onChange={() => toggleMulti("color", color)}
                  className="h-4 w-4 accent-accent"
                />
                <label htmlFor={id} className="text-sm">
                  {color}
                </label>
              </div>
            );
          })}
        </div>
      </fieldset>

      <fieldset className="border-t border-line pt-6">
        <legend className="mb-3 text-xs uppercase tracking-wider text-ink-soft/70">Price</legend>
        <div className="space-y-2">
          {PRICE_CAPS.map((cap) => (
            <div key={cap.label} className="flex items-center gap-2">
              <input
                id={`price-${cap.value}`}
                type="radio"
                name="maxPrice"
                checked={maxPrice === cap.value}
                onChange={() => setParam("maxPrice", cap.value || null)}
                className="h-4 w-4 accent-accent"
              />
              <label htmlFor={`price-${cap.value}`} className="text-sm">
                {cap.label}
              </label>
            </div>
          ))}
        </div>
      </fieldset>

      {(activeSizes.length || activeColors.length || maxPrice) ? (
        <button
          type="button"
          onClick={() => router.push(pathname, { scroll: false })}
          className="mt-6 text-xs uppercase tracking-wider text-accent-text underline-offset-4 hover:underline"
        >
          Clear filters
        </button>
      ) : null}
    </aside>
  );
}
