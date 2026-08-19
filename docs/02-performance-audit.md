# Performance Audit — Core Web Vitals

Audited against the six points in the performance brief, against this
repo's actual implementation.

## 1. Images

**Status: implemented via `next/image`, with a graceful-degradation gap
worth calling out.**
- ✅ Every product/campaign image renders through `StockImage`
  (`src/components/StockImage.tsx`), which wraps `next/image` (`fill`,
  per-slot `sizes`, `priority` only on the hero/PDP-gallery/journal-hero
  images actually above the fold) inside a fixed `aspect-[4/5]` /
  `aspect-square` box, so CLS stays 0 regardless of whether the photo
  loads. `next/image` serves AVIF→WebP→JPEG automatically based on the
  request's `Accept` header — no manual `<picture>` needed.
- ✅ The underlying photo source (LoremFlickr, real keyword-matched stock
  photography, chosen because this build environment has no network
  access to hand-verify specific asset URLs — see
  `docs/01-technical-build-plan.md`) is not the risk it would be for CLS,
  because the gradient+grain background renders immediately underneath
  the `<Image>` on every load; the photo composites on top once it
  arrives, it doesn't reflow anything into place.
- ⚠️ **Gap:** swapping in licensed campaign photography means putting real
  asset URLs in place of `stockPhotoUrl()`'s LoremFlickr construction (or
  adding a `src` field to `EditorialImage` in `types.ts` and branching on
  it) — at that point, also add `placeholder="blur"` +
  `blurDataURL`/`blurhash` per image (generated at CMS-upload time), which
  the current placeholder-photo setup deliberately skips since a blurred
  gradient is already the loading state.

## 2. Fonts

**Status: done.**
- ✅ Fraunces (serif) and Inter (grotesk) are loaded via `next/font/google`
  in `src/app/layout.tsx` — this self-hosts the font files at build time
  (no runtime request to `fonts.googleapis.com`), subsets to `latin`, and
  sets `display: "swap"` automatically. Only the weights actually used
  (`400/500/600` + italic for Fraunces) are pulled, not the full family.
- ✅ No manual `<link rel="preload">` needed — `next/font` injects the
  necessary preload hints into the document head itself.

## 3. JS

**Status: mostly addressed by the framework; a few explicit calls remain.**
- ✅ Route-level code-splitting is automatic under the App Router — each
  route segment is its own chunk.
- ✅ Interactive-only components are marked `"use client"` at the leaf
  (`CartDrawer`, `BuyBox`, `FilterSidebar`, etc.) rather than at the layout
  level, so the RSC tree stays server-rendered wherever possible (Header
  and Footer shells are server components; only the pieces that touch
  Zustand/`useState` hydrate client-side).
- ✅ Tailwind v4's JIT compiler ships only the utility classes actually
  referenced in the codebase — no manual purge config needed.
- ⚠️ **Not yet present because there's no third-party embed to defer**:
  when a chat widget, reviews widget, or a real analytics SDK (GA4/Segment)
  is added, load it with `next/script strategy="lazyOnload"` (or
  `"worker"` if Partytown is introduced), not a blocking `<script>` tag —
  `WebVitalsReporter` shows the pattern to follow (client component,
  `sendBeacon`, no blocking work on the main thread at load).

## 4. Critical rendering path

**Status: framework-handled.**
- ✅ Next.js inlines critical CSS per route automatically; there's no
  manual "above the fold" CSS split to maintain.
- ⚠️ **Gap:** no `preconnect`/`dns-prefetch` hints exist yet because there
  is no external CDN/image host or payment gateway configured. Once one
  exists (e.g. Shopify CDN for images, Stripe/Shopify Payments for
  checkout), add to `app/layout.tsx`:
  ```tsx
  <link rel="preconnect" href="https://cdn.shopify.com" />
  <link rel="preconnect" href="https://checkout.shopify.com" crossOrigin="" />
  ```

## 5. Caching / CDN / ISR

**Status: implemented for the PDP, extendable.**
- ✅ `export const revalidate = 300;` on `src/app/product/[handle]/page.tsx`
  — product pages are statically generated (`generateStaticParams`) and
  revalidate every 5 minutes, so price/inventory drift is bounded without a
  full rebuild.
- ✅ Static assets (JS/CSS chunks) get content-hashed filenames from the
  Next.js build, so they're safe to cache with `immutable, max-age=31536000`
  at the CDN — this is the default on Vercel; if self-hosting, set that
  header explicitly in front of `_next/static/*`.
- ⚠️ **Recommendation:** apply the same `revalidate` pattern to
  `/shop/[category]` once it's fully static (today it reads `searchParams`
  per-request for filtering, which is correct for filtered views but means
  the *unfiltered* category page is needlessly dynamic — consider
  splitting into a static unfiltered page plus a client-side filter that
  narrows an already-fetched list, if the catalog stays small enough to
  ship client-side).

## 6. Targets

Not yet measured against a live Lighthouse run in this environment (no
real photography, no production deploy). Given the placeholder-image
architecture (zero image bytes on the homepage above the fold) and
self-hosted, subsetted fonts, the structural risk to LCP/CLS is low; the
real test is once photography and a live backend are wired in — re-run
Lighthouse (mobile, throttled) at that point and treat LCP > 2.5s or
CLS > 0.1 as a blocking regression, not a follow-up.
