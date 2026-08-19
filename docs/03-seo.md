# SEO

## Structured data (implemented)

`src/lib/jsonld.ts` builds JSON-LD, rendered via `<JsonLd data={...} />`
(`src/components/JsonLd.tsx`, a `<script type="application/ld+json">`).

- **Organization + WebSite** — sitewide, in `src/app/layout.tsx`.
- **Product + Offer + AggregateRating + Review** — on every PDP
  (`productJsonLd` in `src/app/product/[handle]/page.tsx`).
- **BreadcrumbList** — on category, product, and journal-article pages.

Example (`productJsonLd`, trimmed):

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Wool Trench Coat",
  "sku": "p1",
  "brand": { "@type": "Brand", "name": "Ferrous" },
  "offers": {
    "@type": "Offer",
    "url": "https://ferrous-example.com/product/wool-trench-coat",
    "priceCurrency": "INR",
    "price": 6990,
    "availability": "https://schema.org/InStock",
    "itemCondition": "https://schema.org/NewCondition"
  },
  "aggregateRating": { "@type": "AggregateRating", "ratingValue": 4.7, "reviewCount": 3 },
  "review": [
    {
      "@type": "Review",
      "author": { "@type": "Person", "name": "M. Alvarez" },
      "reviewRating": { "@type": "Rating", "ratingValue": 5, "bestRating": 5 },
      "name": "Worth every cent",
      "reviewBody": "The wool is substantial without being stiff. Runs true to size."
    }
  ]
}
```

## Metadata template

Every route exports `metadata` (static) or `generateMetadata` (dynamic).
Pattern used throughout:

```tsx
export async function generateMetadata({ params }): Promise<Metadata> {
  const product = getProductByHandle((await params).handle);
  return {
    title: `${product.name} — ${product.categoryLabel}`,   // "%s | Ferrous" template applies the brand suffix
    description: product.description,                       // unique per product, not manufacturer boilerplate
    alternates: { canonical: `/product/${product.handle}` }, // fixed, ignores ?size=/?sort= query params
    openGraph: { title: `${product.name} — ${product.categoryLabel} | Ferrous`, description: product.caption },
  };
}
```

The title template (`"%s | Ferrous"`) is set once in the root layout
(`src/app/layout.tsx`), so every page only needs to supply its own
fragment. `metadataBase` is also set there so relative OG image URLs
resolve correctly.

## URL structure

Clean, human-readable, no query-string-only product pages:
`/shop/womens-outerwear` → implemented as `/shop/[category]` with slugs
like `/shop/outerwear`; `/product/wool-trench-coat`. Filters
(`?size=M&color=Rust`) layer on top of `/shop` and `/shop/[category]` but
never gate content behind a query string — the canonical tag on every
listing page points at the bare category URL regardless of active filters,
which is the standard fix for filter/sort duplicate-content risk.

## Content

Every product has hand-written copy (`caption`, `description`, `fabric`,
`care` in `src/lib/data.ts`) rather than spec-sheet boilerplate. The
Journal (`/journal`) targets long-tail intent — "How to Style a Wool
Trench Coat, Four Ways", "A Layering Guide for the First Real Cold Snap" —
and each article's "Shop the Story" module links directly to the products
it discusses, which is also the internal-linking path from
high-intent editorial content back to transactional PDPs.

## Technical

- **Sitemap:** `src/app/sitemap.ts` — auto-generated from the product,
  category, and journal-post lists, served at `/sitemap.xml`.
- **Robots:** `src/app/robots.ts` — disallows `/cart`, `/checkout`,
  `/account`, `/api/`; points at the sitemap.
- **Out-of-stock handling:** not yet needed (mock catalog has no
  permanently-discontinued products), but the pattern to follow once a
  real backend exists: return a `410 Gone` (permanently discontinued) or a
  `308` redirect to the replacement/category page (temporarily
  out-of-stock but restocking) from the PDP route handler — never a silent
  200 with "sold out" text, which leaves a dead page indexed.
- **Pagination:** `/shop` and `/shop/[category]` use "Load More"
  (client-side reveal, no new URL) rather than paginated URLs, so there's
  no `rel=next/prev` or deep-pagination-noindex problem to manage — the
  crawlable page always shows the same canonical URL.
