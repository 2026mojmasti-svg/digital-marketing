"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

export function Hero() {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;
    function onScroll() {
      if (!bgRef.current) return;
      const y = window.scrollY;
      bgRef.current.style.transform = `translateY(${y * 0.15}px) scale(1.08)`;
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="relative h-[92vh] min-h-[560px] overflow-hidden bg-ink">
      <div
        ref={bgRef}
        className="grain absolute inset-0"
        style={{
          backgroundImage: "linear-gradient(155deg, #C25E3A 0%, #8C4128 45%, #14120F 100%)",
        }}
        role="img"
        aria-label="Autumn campaign: a model in the Wool Trench Coat against a rust-toned backdrop"
      />
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
