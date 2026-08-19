import Link from "next/link";
import { CATEGORIES } from "@/lib/data";
import { EditorialArt } from "./art/EditorialArt";

// Asymmetric sizing on purpose — breaks the predictable 3-up grid.
const SPANS = ["md:col-span-7", "md:col-span-5", "md:col-span-4", "md:col-span-8", "md:col-span-6", "md:col-span-6"];

export function CategoryTiles() {
  return (
    <section aria-labelledby="categories-heading" className="mx-auto max-w-[1600px] px-5 py-20 md:px-10">
      <h2 id="categories-heading" className="font-serif text-3xl md:text-4xl">
        Shop by Category
      </h2>
      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-12">
        {CATEGORIES.map((c, i) => (
          <Link
            key={c.slug}
            href={`/shop/${c.slug}`}
            className={`group relative block aspect-[16/9] overflow-hidden md:aspect-[4/3] ${SPANS[i]}`}
          >
            <EditorialArt
              image={{
                alt: `${c.label} category`,
                tone: c.tone,
                garment: c.garment,
                pattern: c.pattern,
                frame: "worn",
                seed: i,
                photo: c.photo,
              }}
              fit="contain"
              className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 z-[2]">
              <h3 className="font-serif text-3xl text-bone">{c.label}</h3>
              <span className="nav-link text-sm uppercase tracking-wider text-bone/90">Shop now</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
