import { ProductImage } from "./ProductImage";

const TONES: [string, string][] = [
  ["#C25E3A", "#8C4128"],
  ["#3A3C2E", "#14120F"],
  ["#8C7A5E", "#4A3F2D"],
  ["#6E6259", "#2B2822"],
  ["#D9784F", "#C25E3A"],
  ["#4A4D3A", "#242619"],
];

export function UGCGrid() {
  return (
    <section aria-labelledby="ugc-heading" className="mx-auto max-w-[1600px] px-5 py-20 md:px-10">
      <div className="flex items-baseline justify-between">
        <h2 id="ugc-heading" className="font-serif text-3xl md:text-4xl">
          Worn by You
        </h2>
        <a href="#" className="nav-link text-sm uppercase tracking-wider">
          @ferrous.studio
        </a>
      </div>
      <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
        {TONES.map((tone, i) => (
          <li key={i} className="aspect-square">
            <ProductImage
              tone={tone}
              alt={`Customer photo ${i + 1} wearing Ferrous, shared on Instagram`}
              className="h-full w-full"
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
