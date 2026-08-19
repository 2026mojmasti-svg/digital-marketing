"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { CATEGORIES } from "@/lib/data";
import { useCart, useWishlist, cartCount } from "@/lib/store";
import { useMounted } from "@/lib/useMounted";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const mounted = useMounted();
  const menuRef = useRef<HTMLDivElement>(null);
  const lines = useCart((s) => s.lines);
  const openDrawer = useCart((s) => s.openDrawer);
  const wishlistCount = useWishlist((s) => s.productIds.length);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setMenuOpen(false);
    }
    function onClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false);
    }
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, []);

  const count = mounted ? cartCount(lines) : 0;

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bone/95 backdrop-blur">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-5 py-4 md:px-10">
        <div ref={menuRef} className="relative flex items-center gap-8">
          <Link href="/" className="font-serif text-2xl tracking-tight">
            Ferrous
          </Link>
          <nav aria-label="Main" className="hidden items-center gap-6 md:flex">
            <button
              type="button"
              className="nav-link flex items-center gap-1 text-sm uppercase tracking-wider"
              aria-expanded={menuOpen}
              aria-haspopup="true"
              onMouseEnter={() => setMenuOpen(true)}
              onClick={() => setMenuOpen((v) => !v)}
            >
              Shop
            </button>
            <Link href="/journal" className="nav-link text-sm uppercase tracking-wider">
              Journal
            </Link>
            <Link href="/shop" className="nav-link text-sm uppercase tracking-wider">
              New Arrivals
            </Link>
          </nav>

          {menuOpen ? (
            <div
              onMouseLeave={() => setMenuOpen(false)}
              className="animate-fade-rise absolute left-0 top-full mt-4 grid w-[560px] grid-cols-2 gap-6 border border-line bg-bone p-8 shadow-xl"
            >
              {CATEGORIES.map((c) => (
                <Link
                  key={c.slug}
                  href={`/shop/${c.slug}`}
                  onClick={() => setMenuOpen(false)}
                  className="group"
                >
                  <span className="font-serif text-xl group-hover:text-accent-text">{c.label}</span>
                  <p className="mt-1 text-sm text-ink-soft/80">{c.description}</p>
                </Link>
              ))}
            </div>
          ) : null}
        </div>

        <div className="flex items-center gap-5">
          <Link href="/account" className="nav-link hidden text-sm uppercase tracking-wider md:inline">
            Account
          </Link>
          <Link href="/account" className="relative text-sm uppercase tracking-wider" aria-label={`Wishlist, ${wishlistCount} saved items`}>
            <span aria-hidden="true">Saved{wishlistCount > 0 ? ` (${wishlistCount})` : ""}</span>
          </Link>
          <button
            type="button"
            onClick={openDrawer}
            className="relative border border-ink px-4 py-2 text-sm uppercase tracking-wider transition-colors hover:bg-ink hover:text-bone"
            aria-label={`Open bag, ${count} item${count === 1 ? "" : "s"}`}
          >
            Bag ({count})
          </button>
        </div>
      </div>
    </header>
  );
}
