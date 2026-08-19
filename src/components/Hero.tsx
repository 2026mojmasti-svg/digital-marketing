"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { EditorialArt } from "./art/EditorialArt";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    let scrollY = 0;
    let mouseX = 0;
    let mouseY = 0;

    function paint() {
      if (!bgRef.current) return;
      bgRef.current.style.transform = `translate(${mouseX}px, ${scrollY * 0.15 + mouseY}px) scale(1.08)`;
    }
    function onScroll() {
      scrollY = window.scrollY;
      paint();
    }
    function onMouseMove(e: MouseEvent) {
      const rect = sectionRef.current?.getBoundingClientRect();
      if (!rect) return;
      const relX = (e.clientX - rect.left) / rect.width - 0.5;
      const relY = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX = relX * -18;
      mouseY = relY * -12;
      paint();
    }
    const section = sectionRef.current;
    window.addEventListener("scroll", onScroll, { passive: true });
    section?.addEventListener("mousemove", onMouseMove);
    return () => {
      window.removeEventListener("scroll", onScroll);
      section?.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[92vh] min-h-[560px] overflow-hidden bg-ink">
      <div ref={bgRef} className="absolute inset-0">
        <EditorialArt
          image={{
            alt: "Autumn campaign: an illustrated figure in the Wool Trench Coat against a rust-toned backdrop",
            tone: ["#C25E3A", "#8C4128"],
            garment: "trench",
            pattern: "plain",
            frame: "worn",
            seed: 100,
          }}
          fit="contain"
          className="h-full w-full"
        />
      </div>
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-ink/75 via-ink/10 to-transparent" />
      <div className="relative z-[2] mx-auto flex h-full max-w-[1600px] flex-col justify-end px-5 pb-16 md:px-10 md:pb-24">
        <p className="mb-3 text-xs uppercase tracking-[0.3em] text-bone/80">Autumn Collection — Chapter I</p>
        <h1 className="max-w-4xl font-serif text-[clamp(2.75rem,3vw+2.25rem,7.5rem)] leading-[0.95] text-bone">
          Weather
          <br />
          <span className="italic">as material.</span>
        </h1>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Link
            href="/shop"
            className="border border-bone bg-bone px-7 py-3.5 text-sm uppercase tracking-wider text-ink transition-colors hover:bg-transparent hover:text-bone"
          >
            Shop the Collection
          </Link>
          <Link
            href="/journal/how-to-style-a-wool-trench-coat"
            className="nav-link text-sm uppercase tracking-wider text-bone"
          >
            Read the Story
          </Link>
        </div>
      </div>
    </section>
  );
}
