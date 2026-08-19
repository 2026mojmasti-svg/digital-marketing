import { AvatarArt } from "./art/AvatarArt";

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
      <ul className="mt-8 grid grid-cols-3 gap-3 sm:grid-cols-6">
        {Array.from({ length: 6 }, (_, i) => (
          <li key={i} className="aspect-square">
            <AvatarArt
              seed={i + 40}
              alt={`Customer ${i + 1} wearing Ferrous, shared on Instagram`}
              className="h-full w-full"
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
