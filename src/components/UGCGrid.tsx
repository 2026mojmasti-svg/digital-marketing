import { RealPhoto } from "./RealPhoto";

const PHOTOS = [
  { src: "/images/portrait-woman-white-tee-01.jpg", alt: "Customer wearing Ferrous, shared on Instagram" },
  { src: "/images/portrait-man-curly-hair-hat.jpg", alt: "Customer wearing Ferrous, shared on Instagram" },
  { src: "/images/portrait-woman-bun-white-tee.jpg", alt: "Customer wearing Ferrous, shared on Instagram" },
  { src: "/images/portrait-woman-black-top-profile.jpg", alt: "Customer wearing Ferrous, shared on Instagram" },
  { src: "/images/portrait-woman-curly-hair-tan-bg.jpg", alt: "Customer wearing Ferrous, shared on Instagram" },
  { src: "/images/outfit-woman-offshoulder-top-daily.jpg", alt: "Customer wearing Ferrous, shared on Instagram" },
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
      <ul className="mt-8 grid grid-cols-3 gap-3 sm:grid-cols-6">
        {PHOTOS.map((p, i) => (
          <li key={i} className="aspect-square">
            <RealPhoto src={p.src} alt={p.alt} className="h-full w-full" />
          </li>
        ))}
      </ul>
    </section>
  );
}
