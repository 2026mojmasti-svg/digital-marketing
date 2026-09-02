import Link from "next/link";
import { CATEGORIES } from "@/lib/data";
import { FERROUS_MAP_URL } from "@/lib/location";
import { Newsletter } from "./Newsletter";

export function Footer() {
  return (
    <footer className="border-t border-line bg-bone">
      <div className="mx-auto max-w-[1600px] px-5 py-16 md:px-10">
        <Newsletter />
        <div className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-5">
          <div>
            <h2 className="text-xs uppercase tracking-wider text-ink-soft/70">Shop</h2>
            <ul className="mt-4 space-y-2">
              {CATEGORIES.map((c) => (
                <li key={c.slug}>
                  <Link href={`/shop/${c.slug}`} className="nav-link text-sm">
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-xs uppercase tracking-wider text-ink-soft/70">Company</h2>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/journal" className="nav-link text-sm">
                  Journal
                </Link>
              </li>
              <li>
                <Link href="/account" className="nav-link text-sm">
                  Account
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-xs uppercase tracking-wider text-ink-soft/70">Help</h2>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/faq#shipping" className="nav-link text-sm">
                  Shipping &amp; Returns
                </Link>
              </li>
              <li>
                <Link href="/faq#sizing" className="nav-link text-sm">
                  Size Guide
                </Link>
              </li>
              <li>
                <Link href="/faq" className="nav-link text-sm">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-xs uppercase tracking-wider text-ink-soft/70">Follow</h2>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="#" className="nav-link text-sm">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" className="nav-link text-sm">
                  Pinterest
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-xs uppercase tracking-wider text-ink-soft/70">Visit</h2>
            <div className="mt-4 space-y-2 text-sm">
              <p>FERROUS</p>
              <a
                href={FERROUS_MAP_URL}
                target="_blank"
                rel="noreferrer"
                className="nav-link text-sm"
              >
                Get directions
              </a>
            </div>
          </div>
        </div>
        <p className="mt-16 text-xs text-ink-soft/60">© {new Date().getFullYear()} Ferrous. All rights reserved.</p>
      </div>
    </footer>
  );
}
