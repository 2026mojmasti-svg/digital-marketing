"use client";

import { useMemo, useState } from "react";
import { getProductsByCategory } from "@/lib/data";
import { ProductCard } from "./ProductCard";

const OCCASIONS = [
  { label: "Daily Wear", category: "daily-wear" },
  { label: "Office & Tailoring", category: "tailoring" },
  { label: "Party Night", category: "party-wear" },
  { label: "Cold Weather", category: "outerwear" },
] as const;

const PALETTES = [
  { label: "Neutral", keyword: "Bone" },
  { label: "Warm Rust", keyword: "Rust" },
  { label: "Deep Jewel", keyword: "Berry" },
  { label: "Indigo", keyword: "Indigo" },
] as const;

export function FindYourFit() {
  const [step, setStep] = useState(0);
  const [occasion, setOccasion] = useState<(typeof OCCASIONS)[number] | null>(null);
  const [palette, setPalette] = useState<(typeof PALETTES)[number] | null>(null);

  const results = useMemo(() => {
    if (!occasion) return [];
    const inCategory = getProductsByCategory(occasion.category);
    const matched = palette ? inCategory.filter((p) => p.colorway.includes(palette.keyword)) : [];
    const pool = matched.length > 0 ? matched : inCategory;
    return [...pool].sort((a, b) => b.rating - a.rating).slice(0, 3);
  }, [occasion, palette]);

  function reset() {
    setStep(0);
    setOccasion(null);
    setPalette(null);
  }

  return (
    <section aria-labelledby="fyf-heading" className="border-y border-line bg-bone-dim">
      <div className="mx-auto max-w-[1600px] px-5 py-20 md:px-10">
        <div className="flex flex-col items-start gap-2 md:flex-row md:items-baseline md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-ink-soft/60">Two Questions</p>
            <h2 id="fyf-heading" className="mt-2 font-serif text-3xl md:text-4xl">
              Find Your Fit
            </h2>
          </div>
          {step > 0 ? (
            <button
              type="button"
              onClick={reset}
              className="text-xs uppercase tracking-wider underline-offset-4 hover:underline"
            >
              Start Over
            </button>
          ) : null}
        </div>

        {/* Progress dots */}
        <div className="mt-6 flex gap-2" aria-hidden="true">
          {[0, 1, 2].map((i) => (
            <span key={i} className={`h-1 w-8 ${i <= step ? "bg-ink" : "bg-line"}`} />
          ))}
        </div>

        {step === 0 ? (
          <fieldset className="mt-8">
            <legend className="mb-4 font-serif text-xl">What are you dressing for?</legend>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {OCCASIONS.map((o) => (
                <button
                  key={o.category}
                  type="button"
                  onClick={() => {
                    setOccasion(o);
                    setStep(1);
                  }}
                  className="border border-ink bg-bone px-4 py-6 text-sm uppercase tracking-wider transition-colors hover:bg-ink hover:text-bone"
                >
                  {o.label}
                </button>
              ))}
            </div>
          </fieldset>
        ) : null}

        {step === 1 ? (
          <fieldset className="mt-8">
            <legend className="mb-4 font-serif text-xl">Pick a palette</legend>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {PALETTES.map((p) => (
                <button
                  key={p.keyword}
                  type="button"
                  onClick={() => {
                    setPalette(p);
                    setStep(2);
                  }}
                  className="border border-ink bg-bone px-4 py-6 text-sm uppercase tracking-wider transition-colors hover:bg-ink hover:text-bone"
                >
                  {p.label}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setStep(0)}
              className="mt-4 text-xs uppercase tracking-wider text-ink-soft/70 underline-offset-4 hover:underline"
            >
              ← Back
            </button>
          </fieldset>
        ) : null}

        {step === 2 && occasion ? (
          <div className="mt-8">
            <p className="mb-6 text-sm text-ink-soft/80">
              For <strong>{occasion.label}</strong>
              {palette ? (
                <>
                  {" "}
                  in <strong>{palette.label}</strong>
                </>
              ) : null}
              , we&rsquo;d start here:
            </p>
            {results.length > 0 ? (
              <ul className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3">
                {results.map((p) => (
                  <li key={p.id}>
                    <ProductCard product={p} listName="Find Your Fit" />
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-ink-soft/70">No exact palette match — try a different combination.</p>
            )}
          </div>
        ) : null}
      </div>
    </section>
  );
}
