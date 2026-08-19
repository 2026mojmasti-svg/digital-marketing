import Link from "next/link";
import { RealPhoto } from "./RealPhoto";
import { PRODUCTS } from "@/lib/data";

export function LookbookSplit() {
  const trench = PRODUCTS.find((p) => p.handle === "wool-trench-coat")!;

  return (
    <section aria-labelledby="lookbook-heading" className="grid grid-cols-1 md:grid-cols-2">
      <div className="relative aspect-[4/5] md:aspect-auto">
        <RealPhoto
          src="/images/grey-trench-coat-closeup.jpg"
          alt="Trench coat styling, editorial shot"
          sizes="(min-width: 768px) 50vw, 100vw"
          className="absolute inset-0"
        />
      </div>
      <div className="flex flex-col justify-center bg-ink px-8 py-16 text-bone md:px-16">
        <p className="text-xs uppercase tracking-[0.3em] text-bone/70">Shop the Look</p>
        <h2 id="lookbook-heading" className="mt-3 font-serif text-4xl italic md:text-5xl">
          The Trench, Reconsidered
        </h2>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-bone/80">{trench.caption}</p>
        <Link
          href={`/product/${trench.handle}`}
          className="mt-8 inline-block w-fit border border-bone px-7 py-3.5 text-sm uppercase tracking-wider transition-colors hover:bg-bone hover:text-ink"
        >
          Shop the Coat
        </Link>
      </div>
    </section>
  );
}
