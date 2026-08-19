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
- **Image handling:** no real campaign photography exists yet. An earlier
  pass tried sourcing real photos from a public hotlink service
  (LoremFlickr) — it turned out unreliable in production (Vercel's
  server-side image optimization frequently failed to fetch it, so most
  slots silently fell back to a plain gradient). This build replaced that
  with `src/components/art/` — a self-contained inline-SVG illustration
  system with zero network dependency, so it can't fail the same way:
  - `GarmentArt` — flat-sketch garment silhouettes (front/back/detail),
    built from hand-authored SVG paths per `GarmentType` in
    `silhouettes.ts`, filled with a fabric `<pattern>` (`Patterns.tsx`)
    keyed to the product's `PatternType` (rib, quilt, houndstooth,
    pinstripe, sequin, denim).
  - `FigureArt` — an abstract croquis figure wearing the garment (the
    "worn" frame), reusing the same silhouette data overlaid on a body
    outline. Takes a `fit: "cover" | "contain"` prop — `"contain"` is
    required for very wide containers (Hero, category tiles); `"cover"`
    (default) crops to fill, which is correct for portrait-ish boxes but
    would zoom in on just the torso in a wide one.
  - `AvatarArt` — deterministic abstract customer-avatar illustrations
    (varied hairstyle/skin tone/background by seed) standing in for
    review and UGC "photos."
  - `EditorialArt` — dispatches to `GarmentArt` or `FigureArt` based on
    an `EditorialImage`'s `frame`.

  **Update:** real photography has since been added for a subset of
  slots. The user supplied 11 candidate photos (self-attributed as
  sourced from Unsplash); 3 were excluded before use — one carried a
  visible "Unsplash+" watermark (that tier requires a paid license, and a
  watermarked image is explicitly not a licensed download), and two were
  real photos of branded products with visible trademarks/logos (a
  Gucci-monogram print, a Ferragamo bag with its nameplate legible) —
  using either as this fictional brand's own product photography would
  misrepresent an affiliation that doesn't exist. The remaining 8 are
  saved under `public/images/` and wired in via `EditorialImage.photo`
  (an optional local path) — `EditorialArt` renders `RealPhoto`
  (`next/image`, local file, no network dependency at request time)
  whenever `photo` is set, falling back to the SVG art otherwise.
  Deliberately *not* attached to any product's own `images` array on the
  PDP/product-card level: none of the 8 photos are an exact color/style
  match for a specific SKU's purchasable variants, and showing a
  different-colored version of a garment as if it were the literal
  product photo would misrepresent what a customer is buying. They're
  used instead in editorial/mood contexts where that distinction doesn't
  apply — the hero, the lookbook module, 5 of 6 category tiles, and 3 of
  5 journal covers. Full photographic coverage of the PDP galleries would
  need one real photo per product/colorway, which wasn't available.

  Swapping in licensed campaign photography later means replacing these
  components' internals with `next/image`, keeping the same
  `EditorialImage` shape (`alt`, `tone` as a loading-state/fallback
  color) — no page-level changes, since the aspect-ratio containers are
  already correct.

  **Update 2:** a second batch of 28 candidate photos was supplied
  (self-attributed as sourced from Unsplash), this time including people
  portraits (for review/UGC avatars) and knitwear product shots. 6 were
  excluded before use: a jeans close-up with a legible "Madewell" waistband
  label, a bag with "ASHOKA" embossed on the flap, a shirt with a legible
  "NET…" neck tag, a folded shirt with a legible "nimble made" tag, and two
  graphic tees with printed brand-style slogans ("TÂY SƠN brotherhood" and
  "ACTIVE SEASON / Move Your Soul") — all real or real-looking third-party
  branding, the same category of risk as the Gucci/Ferragamo exclusions
  above. The remaining 22 were saved under `public/images/`:
  - `Review.avatarPhoto` (optional, on top of the existing `avatarSeed`) —
    a real customer photo, used in place of the illustrated avatar when
    set. `src/components/ReviewAvatar.tsx` picks between the two: real
    photo via `RealPhoto` when `avatarPhoto` is set, `AvatarArt` otherwise.
    Wired into 5 reviews spread across categories (one per product family:
    outerwear, knitwear, daily wear, and two party-wear), left illustrated
    everywhere else — deliberately partial, matching how a real UGC/review
    section mixes photographed and non-photographed customers rather than
    forcing every avatar to a stock photo.
  - `UGCGrid` ("Worn by You" on the homepage) — now renders 6 real people
    photos via `RealPhoto` instead of `AvatarArt`, since this section
    doesn't need to correspond to any specific product or review.
  - The Knitwear category tile (previously the one category with no
    `photo`) now has one — a crochet cardigan shot, editorial/mood use
    like the rest of the category tiles, not tied to a specific SKU.
  - The `cold-weather-layering-guide` Journal post (previously photo-less)
    now uses a knit sweater photo matching its `sweater`/`rib` tone.

  Not used: two travel/resort lookbook-style shots (a floral dress and a
  pleated skirt, both by the sea) and one more accessories product photo
  (a backpack) — saved as candidates but not used yet.

  **Update 3:** the user explicitly asked for product-listing cards
  (`ProductCard`, shown on `/shop` and `/shop/[category]`) to show real
  photography instead of the SVG illustration, e.g. seeing an actual skirt
  photo when browsing Party Wear. This is a deliberate change from Updates
  1–2's rule of never attaching a photo to a specific product's own
  `images` array unless it was an exact color/style match — the user
  understands this is a fictional/academic build and wants the visual
  upgrade even where a photo is a stylistic match rather than a literal
  SKU match (e.g. the "Sequin Mini Dress" — rendered as a black/gold
  sequin skirt shape — now uses a real photo of a black pleated skirt, not
  a sequin one).

  A third 10-photo batch was supplied for this pass; 1 was excluded (a
  scarf with a visible Gucci GG monogram print, same reasoning as the
  earlier Gucci/Ferragamo exclusions). Of the remaining 9, 5 are wired in;
  4 are unused (a grey satchel, a teal bag with glasses, three croc-effect
  bags styled together, and a woman in a cream wrap skirt) — accessories
  photos beyond what the 2-product Accessories category needed, saved as
  candidates. Combined with unused photos from Updates 1–2, 15 of the 16
  products in `PRODUCTS` now have a real photo
  on `images[0]` (and `images[1]`, kept identical or matched so the
  `ProductCard` hover crossfade never blends a photo into an illustration)
  — the one exception is the Wide-Leg Wool Trouser, left illustrated
  because no supplied photo is trouser-appropriate. Detail/back frames
  (`images[2]`/`images[3]`, PDP-gallery-only, not used in the card
  crossfade) got a photo only where a natural one existed (e.g. the trench
  coat's button detail); otherwise they stay illustrated, which is fine
  since the gallery already mixes distinct frames by design.
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
/shop/[category]           → Category listing (generateStaticParams over 6 categories)
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
