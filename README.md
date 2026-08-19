# Ferrous — Editorial Fashion E-Commerce

A fashion e-commerce storefront built around the "Editorial Minimalism
with a Digital-Native Twist" creative direction: oversized serif/grotesk
type pairing, asymmetric magazine-style grids, a restrained neutral
palette with one seasonal accent, and a shop-the-story pattern linking
editorial content directly to products.

Next.js 16 (App Router) + TypeScript + Tailwind CSS v4 + Zustand. No
photography or live commerce backend is wired in — product imagery is a
gradient placeholder in the exact aspect boxes real photography would
occupy, and the catalog is a typed mock in `src/lib/data.ts` shaped like a
normalized headless-commerce response, so both are drop-in replaceable
without touching pages or components.

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
