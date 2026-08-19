# Ferrous — Editorial Fashion E-Commerce

A fashion e-commerce storefront built around the "Editorial Minimalism
with a Digital-Native Twist" creative direction: oversized serif/grotesk
type pairing, asymmetric magazine-style grids, a restrained neutral
palette with one seasonal accent, and a shop-the-story pattern linking
editorial content directly to products. Mid-range pricing (INR) across
six categories — Daily Wear, Party Wear, Outerwear, Tailoring, Knitwear,
Accessories.

Next.js 16 (App Router) + TypeScript + Tailwind CSS v4 + Zustand. No
photography or live commerce backend is wired in:

- **Imagery** is a self-contained inline-SVG illustration system
  (`src/components/art/`) — flat-sketch garments, an abstract croquis
  figure for "worn" shots, and generated customer avatars for
  reviews/UGC. It replaced an earlier version that hotlinked real stock
  photos, which looked fine locally but silently failed on most images
  once deployed (unreliable third-party fetches from Vercel's image
  pipeline) — the illustration system has zero network dependency, so it
  can't fail that way. See `docs/01-technical-build-plan.md` for the full
  story and how to swap in licensed photography later.
- The catalog is a typed mock in `src/lib/data.ts` shaped like a
  normalized headless-commerce response, drop-in replaceable without
  touching pages or components.

**Interactive touches:** a drag-to-spin PDP gallery (cycle front/worn/
detail/back angles), live color-swatch preview (hover a color to
re-color the garment art before selecting it), a mouse-parallax hero, and
a two-question "Find Your Fit" homepage quiz that recommends products by
occasion and palette.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build
npm run start   # serve the production build
npm run lint    # eslint
```

## Pages

Home · Shop All · Category listing · Product detail · Cart · Checkout ·
Account/Wishlist · Journal (index + article, shop-the-story).

## Documentation

See [`docs/`](./docs/README.md) for the technical build plan, performance
audit, SEO implementation, CRO findings, accessibility audit, and the
analytics/experimentation setup.
