import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { LookbookSplit } from "@/components/LookbookSplit";
import { NewArrivalsCarousel } from "@/components/NewArrivalsCarousel";
import { CategoryTiles } from "@/components/CategoryTiles";
import { FindYourFit } from "@/components/FindYourFit";
import { UGCGrid } from "@/components/UGCGrid";
import { PRODUCTS } from "@/lib/data";

export const metadata: Metadata = {
  title: "Ferrous — Considered Clothing",
  description:
    "From daily staples to party edits — considered outerwear, tailoring, knitwear, and going-out pieces. Autumn Collection Chapter I is live.",
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <Hero />
      <section aria-labelledby="brand-strip" className="border-y border-line bg-bone-dim">
        <div className="mx-auto max-w-[1600px] px-5 py-10 md:px-10">
          <h2 id="brand-strip" className="sr-only">
            Brand story
          </h2>
          <p className="max-w-3xl font-serif text-2xl italic leading-snug md:text-3xl">
            &ldquo;One wardrobe, every register — the tee you reach for daily, the coat that
            outlasts the season, the dress for the night you didn&rsquo;t plan for.&rdquo;
          </p>
        </div>
      </section>
      <LookbookSplit />
      <NewArrivalsCarousel products={PRODUCTS.slice(0, 8)} />
      <CategoryTiles />
      <FindYourFit />
      <UGCGrid />
    </>
  );
}
