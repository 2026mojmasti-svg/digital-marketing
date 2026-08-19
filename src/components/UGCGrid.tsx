import { StockImage } from "./StockImage";

const SLOTS: { tone: [string, string]; query: string; seed: number }[] = [
  { tone: ["#C25E3A", "#8C4128"], query: "streetstyle,fashion,outfit", seed: 201 },
  { tone: ["#3A3C2E", "#14120F"], query: "outfit,street,fashion", seed: 202 },
  { tone: ["#8C7A5E", "#4A3F2D"], query: "fashion,model,street", seed: 203 },
  { tone: ["#6E6259", "#2B2822"], query: "streetstyle,outfit,fashion", seed: 204 },
  { tone: ["#D9784F", "#C25E3A"], query: "fashion,coat,street", seed: 205 },
  { tone: ["#4A4D3A", "#242619"], query: "outfit,fashion,style", seed: 206 },
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
        {SLOTS.map((slot, i) => (
          <li key={i} className="aspect-square">
            <StockImage
              query={slot.query}
              seed={slot.seed}
              tone={slot.tone}
              alt={`Customer photo ${i + 1} wearing Ferrous, shared on Instagram`}
              sizes="(min-width: 768px) 16vw, 33vw"
              width={800}
              height={800}
              className="h-full w-full"
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
