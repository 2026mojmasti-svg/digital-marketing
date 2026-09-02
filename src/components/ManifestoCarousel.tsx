"use client";

import Image from "next/image";
import { useRef } from "react";
import { MANIFESTO_SLIDES } from "@/lib/campaign";

export function ManifestoCarousel() {
  const scrollerRef = useRef<HTMLUListElement>(null);

  function scrollBy(direction: 1 | -1) {
    scrollerRef.current?.scrollBy({ left: direction * 360, behavior: "smooth" });
  }

  return (
    <section id="manifesto" aria-labelledby="manifesto-heading" className="bg-ink py-16 text-bone md:py-20">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-bone/70">On Instagram</p>
            <h2 id="manifesto-heading" className="mt-2 font-serif text-4xl italic md:text-5xl">
              The Ferrous Manifesto
            </h2>
          </div>
          <div className="hidden gap-2 md:flex">
            <button
              type="button"
              onClick={() => scrollBy(-1)}
              aria-label="Scroll manifesto slides left"
              className="flex h-11 w-11 items-center justify-center border border-bone/70 transition-colors hover:bg-bone hover:text-ink"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => scrollBy(1)}
              aria-label="Scroll manifesto slides right"
              className="flex h-11 w-11 items-center justify-center border border-bone/70 transition-colors hover:bg-bone hover:text-ink"
            >
              →
            </button>
          </div>
        </div>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-bone/75">
          Six frames of form, colour, and attitude. Follow the next edit on Instagram.
        </p>
        <ul
          ref={scrollerRef}
          className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-3 md:gap-6"
          style={{ scrollbarWidth: "none" }}
        >
          {MANIFESTO_SLIDES.map((slide, index) => (
            <li key={slide.src} className="w-[78vw] shrink-0 snap-start sm:w-[48vw] md:w-80">
              <a
                href={slide.href}
                aria-label={`View slide ${index + 1} on Ferrous Instagram`}
                className="group block overflow-hidden border border-bone/20 focus-visible:outline-bone"
              >
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  width={1080}
                  height={1350}
                  sizes="(min-width: 768px) 320px, (min-width: 640px) 48vw, 78vw"
                  className="aspect-[4/5] w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </a>
            </li>
          ))}
        </ul>
        <a
          href={MANIFESTO_SLIDES[0].href}
          className="mt-7 inline-flex min-h-11 items-center border border-bone px-5 text-sm uppercase tracking-wider transition-colors hover:bg-bone hover:text-ink"
        >
          Follow @ferrous.digitalmarketing
        </a>
      </div>
    </section>
  );
}
