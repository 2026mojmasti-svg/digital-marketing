"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { CATEGORIES } from "@/lib/data";
import { useCart, useWishlist, cartCount } from "@/lib/store";
import { useMounted } from "@/lib/useMounted";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const mounted = useMounted();
  const menuRef = useRef<HTMLDivElement>(null);
  const mobilePanelRef = useRef<HTMLDivElement>(null);
  const mobileToggleRef = useRef<HTMLButtonElement>(null);
  const lines = useCart((s) => s.lines);
  const openDrawer = useCart((s) => s.openDrawer);
  const wishlistCount = useWishlist((s) => s.productIds.length);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setMobileOpen(false);
        mobileToggleRef.current?.focus();
      }
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

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
      mobilePanelRef.current?.focus();
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    function onTab(e: KeyboardEvent) {
      if (e.key !== "Tab" || !mobilePanelRef.current) return;
      const focusable = mobilePanelRef.current.querySelectorAll<HTMLElement>('button, [href], [tabindex]:not([tabindex="-1"])');
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
    if (mobileOpen) document.addEventListener("keydown", onTab);
    return () => document.removeEventListener("keydown", onTab);
  }, [mobileOpen]);

  const count = mounted ? cartCount(lines) : 0;

  return (
    <>
    <header className="sticky top-0 z-40 border-b border-line bg-bone/95 backdrop-blur">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-5 py-4 md:px-10">
        <div ref={menuRef} className="relative flex items-center gap-4 md:gap-8">
          <button
            type="button"
            ref={mobileToggleRef}
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 md:hidden"
          >
            <span aria-hidden="true" className="h-px w-5 bg-ink" />
            <span aria-hidden="true" className="h-px w-5 bg-ink" />
            <span aria-hidden="true" className="h-px w-5 bg-ink" />
          </button>
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

      {mobileOpen ? (
        <div className="fixed inset-0 z-50 md:hidden">
          <button aria-label="Close menu" className="absolute inset-0 bg-ink/40" onClick={() => setMobileOpen(false)} />
          <div
            ref={mobilePanelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            tabIndex={-1}
            className="animate-fade-rise absolute inset-y-0 left-0 flex w-[85vw] max-w-sm flex-col overflow-y-auto bg-bone p-6 shadow-2xl outline-none"
          >
            <div className="flex items-center justify-between">
              <Link href="/" onClick={() => setMobileOpen(false)} className="font-serif text-xl">
                Ferrous
              </Link>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="text-sm uppercase tracking-wider underline-offset-4 hover:underline"
              >
                Close
              </button>
            </div>

            <nav aria-label="Mobile" className="mt-8 flex flex-col gap-1">
              <Link
                href="/shop"
                onClick={() => setMobileOpen(false)}
                className="border-b border-line py-3 font-serif text-2xl"
              >
                Shop All
              </Link>
              {CATEGORIES.map((c) => (
                <Link
                  key={c.slug}
                  href={`/shop/${c.slug}`}
                  onClick={() => setMobileOpen(false)}
                  className="border-b border-line py-3 text-sm uppercase tracking-wider text-ink-soft/80"
                >
                  {c.label}
                </Link>
              ))}
              <Link
                href="/journal"
                onClick={() => setMobileOpen(false)}
                className="border-b border-line py-3 font-serif text-2xl"
              >
                Journal
              </Link>
              <Link
                href="/account"
                onClick={() => setMobileOpen(false)}
                className="border-b border-line py-3 font-serif text-2xl"
              >
                Account
              </Link>
            </nav>
          </div>
        </div>
      ) : null}
    </>
  );
}
