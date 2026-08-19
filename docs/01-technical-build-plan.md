# Technical Build Plan

This describes the stack and architecture actually implemented in this repo,
and the decisions behind it.

## Stack

- **Next.js 16 (App Router) + TypeScript + Tailwind CSS v4** — SSG/ISR for
  catalog and editorial pages, RSC by default, file-system routing matches
  the sitemap in the creative brief one-to-one.
- **Headless commerce backend: not wired to a live provider in this build.**
  `src/lib/data.ts` is a typed mock catalog (`Product`, `Category`,
  `JournalPost` in `src/lib/types.ts`) shaped like a normalized Storefront
  API response — swapping in a real backend means replacing the functions in
  `data.ts` (`getAllProducts`, `getProductByHandle`, etc.) with fetch calls;
  no page or component changes.
  - **Recommendation: Shopify Storefront API.** Best fit for a
    fashion/apparel brand — mature variant/inventory model (size × color),
    built-in checkout and payment compliance (PCI, Apple/Google Pay), and a
    GraphQL API that maps directly onto the `Product`/`ProductVariant`
    shapes already used here. Medusa is the right call instead if the brand
    needs full backend customization (custom fulfillment logic, self-hosted);
    Commerce.js is lighter but less actively maintained — not recommended
    for a production build in 2026.
- **CMS for editorial content: not wired in this build** (Journal posts are
  in `data.ts`). Recommend **Sanity** for the Journal/lookbook content —
  its portable-text model and image pipeline suit an editorial,
  shop-the-story pattern better than Contentful's stricter content-type
  model, and its Next.js integration (`next-sanity`) supports on-demand ISR
  revalidation via webhooks.
- **Image handling:** no real campaign photography exists yet, so
  `src/components/StockImage.tsx` sources real, keyword-relevant photos
  from LoremFlickr (public, no API key, deterministic per `query`+`seed`)
  through `next/image` (`fill`, per-slot `sizes`), layered over the
  brand's gradient+grain treatment — the gradient renders immediately
  (no blank flash while the photo loads) and becomes the permanent result
  if a given photo ever fails to fetch, via the `<Image>` `onError`
  handler. Swapping in licensed campaign photography later means changing
  only `src` construction in that one component (or replacing `query`/
  `seed` with a real asset URL per product in `data.ts`) — no layout or
  page changes, since the aspect-ratio containers are already correct.
  LoremFlickr is placeholder-grade stock imagery, not licensed brand
  photography — swap it out before an actual launch.
- **State:** Zustand (`src/lib/store.ts`) for cart and wishlist — client
  state that must persist across route changes and survive a refresh
  (`persist` middleware → localStorage). Filter/sort state lives in the URL
  (`useSearchParams`/`router.push`) rather than a client store, so filtered
  views are shareable/bookmarkable/back-button-safe and the product list
  itself is fetched server-side per navigation — no client-side data-fetching
  library (SWR/React Query) is needed because there's no live backend to
  poll; once one exists, product/inventory reads on the PDP would move to
  SWR with a short revalidation interval instead of relying solely on ISR.

## Component architecture

| Component | Responsibility | Key props/state |
|---|---|---|
| `ProductCard` | Grid tile: image crossfade, quick-add | `product`, `listName` (for `select_item` analytics) |
| `FilterSidebar` | Size/color/price filter + sort, URL-driven | reads/writes `useSearchParams` |
| `ImageGallery` | PDP gallery: thumbnail rail + zoom | local `active`/`zoom` state |
| `CartDrawer` | Slide-out cart, focus-trapped dialog | reads `useCart`, live-region announcements |
| `SizeGuideModal` | Focus-trapped modal with measurement table | local `open` state |
| `PriceDisplay` | Formats `Money`, strikes `compareAtPrice` | `price`, `compareAt` |
| `ReviewStars` | Star rating + screen-reader label | `rating`, `reviewCount`, `hideCount` |
| `BuyBox` | Color/size selection, add-to-bag/reserve, wishlist | `product`; owns selected variant state |
| `Accordion` | Fabric/care/shipping disclosure | `items` (title/content pairs) |

## State management

- **Cart & wishlist → Zustand + `persist`** (client state, must survive
  navigation and refresh, no server round-trip needed for a client-only
  demo cart). `cartTotal`/`cartCount` are pure selectors, not stored state,
  to avoid derived-state bugs.
- **Filter/sort → URL search params** (server state expressed in the URL).
  `/shop` and `/shop/[category]` are `async` Server Components that read
  `searchParams` and call `filterProducts`/`sortProducts` server-side —
  filtering never ships the full catalog to the client.
- **Hydration-safe "mounted" flag → `useSyncExternalStore`**
  (`src/lib/useMounted.ts`) instead of `useState` + `useEffect`, so
  localStorage-backed counts (bag count, wishlist count) don't cause a
  hydration mismatch or a cascading re-render.

## Routing structure (implemented)

```
/                          → Home
/shop                      → All products, filter/sort via searchParams
/shop/[category]           → Category listing (generateStaticParams over 4 categories)
/product/[handle]          → PDP (generateStaticParams over all products, ISR)
/cart                      → Full cart page
/checkout                  → Single-page, 3-step checkout
/account                   → Order history + wishlist + style profile
/journal                   → Editorial index
/journal/[slug]            → Shop-the-story article
/sitemap.xml, /robots.txt  → generated (src/app/sitemap.ts, robots.ts)
/api/vitals                → Core Web Vitals beacon sink
```

## Data fetching strategy

| Route | Strategy | Why |
|---|---|---|
| `/`, `/journal`, `/journal/[slug]` | Static (SSG) | Editorial content changes rarely |
| `/shop/[category]`, `/product/[handle]` | SSG + ISR (`revalidate = 300` on PDP) | Static shell for speed, revalidated every 5 min so price/stock don't go stale on a real backend |
| `/shop`, `/shop/[category]` with filters | Dynamic (server-rendered per navigation) | `searchParams`-driven filtering must run per-request |
| `/cart`, `/checkout`, `/account` | Client-rendered | Reads client-only state (localStorage cart/wishlist); excluded from the sitemap and disallowed in `robots.ts` |

## File/folder tree

```
src/
  app/
    layout.tsx                 fonts, header/footer, JSON-LD, web-vitals
    page.tsx                   Home
    sitemap.ts / robots.ts
    api/vitals/route.ts
    shop/page.tsx
    shop/[category]/page.tsx
    shop/loading.tsx           skeleton
    product/[handle]/page.tsx
    cart/page.tsx
    checkout/page.tsx
    account/page.tsx
    journal/page.tsx
    journal/[slug]/page.tsx
  components/                  ProductCard, FilterSidebar, ImageGallery,
                                CartDrawer, SizeGuideModal, BuyBox,
                                Header, Footer, Hero, CategoryTiles,
                                LookbookSplit, NewArrivalsCarousel, UGCGrid,
                                Newsletter, Accordion, Breadcrumbs, JsonLd,
                                ExitIntentSaveCart, MobileStickyBar,
                                WebVitalsReporter, view/list trackers
  lib/
    types.ts                   Product / Category / JournalPost / Review
    data.ts                    mock catalog + filter/sort helpers
    store.ts                   cart + wishlist (Zustand)
    analytics.ts                GA4-shaped event dispatch
    jsonld.ts                  Product/Offer/Breadcrumb/Org/WebSite schema
    useMounted.ts
```
