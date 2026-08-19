# Analytics & Experimentation Setup

## Ecommerce event tracking

`src/lib/analytics.ts` defines a GA4-shaped `trackEvent` dispatcher — typed
union of the standard ecommerce events, pushed to `window.dataLayer` and
`window.gtag` (both no-ops until a real GA4/GTM snippet is added, so the
call sites are already correct and won't need to change). Wired at every
point the brief calls for:

| Event | Fired from | Includes |
|---|---|---|
| `view_item_list` | `ListViewTracker`, mounted on `/shop` and `/shop/[category]` | list name, first 12 items with id/price/category |
| `select_item` | `ProductCard` click | list name the click came from (grid, carousel, "Complete the Look", etc.) |
| `view_item` | `PdpViewTracker`, mounted on the PDP | product id/price/category |
| `add_to_cart` | `useCart.addItem` | variant (`color / size`), quantity, line value |
| `remove_from_cart` | `useCart.removeItem` | same shape, fired before the line is dropped |
| `add_to_wishlist` | `useWishlist.toggle` | fired only on add, not remove |
| `begin_checkout` | "Checkout" link from `/cart` | full cart contents, cart value |
| `purchase` | `/checkout` on order completion | transaction id, shipping, full line items |

Firing `add_to_cart`/`remove_from_cart` from inside the Zustand store
(rather than duplicating the call at every UI call site — `ProductCard`
quick-add, `BuyBox`, `MobileStickyBar`) means every present and future
"add to bag" entry point reports correctly with no risk of a missed call
site.

## Funnel dashboards

Not built (no GA4 property connected in this environment), but the event
set above is exactly what a GA4 Funnel Exploration needs for
`view_item → add_to_cart → begin_checkout → purchase`, segmented by
`device_category` — no additional instrumentation required once a real
GA4 property is connected; this is a dashboard-configuration task in GA4
itself, not a code task.

## A/B testing scaffold

Not implemented — there's no live traffic to test against in this build.
Recommended approach when it's needed: **Vercel Edge Config** for
low-latency variant assignment (read at the edge before render, no
client-side flash of the control), read into a server component near the
root of the page being tested (e.g. `Hero`'s layout variant, `ImageGallery`
style, or checkout field order) and passed down as a prop — keeps the
variant decision server-side so it doesn't cost an extra client fetch or
cause a layout shift on load. Statsig/Optimizely are the better call over
Edge Config once experiments need statistical analysis/auto-stopping built
in rather than manual GA4 funnel comparison.

## Core Web Vitals monitoring

**Implemented.** `WebVitalsReporter` (`src/components/WebVitalsReporter.tsx`)
uses `useReportWebVitals` from `next/web-vitals` and beacons every metric
(LCP, INP, CLS, TTFB, FCP) to `/api/vitals` via `navigator.sendBeacon`
(falls back to `fetch(..., keepalive: true)`). The route handler
(`src/app/api/vitals/route.ts`) is a stub sink — logs in development;
production would forward each metric to GA4 (Measurement Protocol), a CDP,
or a metrics store like Datadog/Grafana instead. Because this ships in
every page load rather than only in local Lighthouse runs, a real
regression (e.g. an unoptimized image landing in a future PR) shows up in
production traffic within minutes, not at the next manual audit.
