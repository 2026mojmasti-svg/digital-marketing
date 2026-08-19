# Conversion Rate Optimization — Findings

Format: **Issue → Why it hurts conversion → Fix.** Items marked ✅ are
already implemented in this build; items marked ⚠️ are open gaps with a
concrete recommendation.

## PDP

**✅ Size availability shown before add-to-cart.**
`BuyBox` (`src/components/BuyBox.tsx`) disables out-of-stock sizes
(strikethrough, `disabled`, `aria-pressed`) inline in the size selector,
so a shopper never picks a size only to be told at checkout it's gone.

**✅ Low-stock urgency, truthfully sourced.**
When the selected variant has ≤3 units (`selectedVariant.inventory <= 3`
in `BuyBox`), an inline "Only N left in this size" message appears — driven
by the same `inventory` number the size selector uses, not a separate
marketing flag, so it can't drift from reality into manipulative territory.

**✅ Shipping/returns visible without a click.**
The buy box ends with a static list — free shipping over ₹15,000, free
30-day returns, 1–2 day dispatch — visible on page load, not behind an
accordion.

**⚠️ Reviews/UGC are below the fold, not above it.**
*Why it hurts:* Trust signals (rating, review count) do appear in the buy
box (`ReviewStars` next to the price), but the review list itself and the
"Worn by customers" UGC grid sit after the fabric/care accordion, requiring
a scroll past the primary CTA.
*Fix:* Surface the top 1–2 review snippets (star + one-line quote) directly
under the price in `BuyBox`, keeping the full list where it is — this is a
layout change to `src/app/product/[handle]/page.tsx`, not a data change.

## Cart

**✅ Free-shipping progress bar.** Both `CartDrawer` and `/cart` show a
progress bar against `FREE_SHIPPING_THRESHOLD` (₹15,000) with the exact
remaining amount ("Add ₹1,850 more for free shipping").

**✅ Inline quantity edit.** Quantity is a `<select>` inline per line item
in both the drawer and the full cart page — no navigation required.

**⚠️ Size/color edit is a link-out, not inline.**
*Why it hurts:* "Edit size/color" on the cart page routes back to the PDP
rather than swapping the variant in place — an extra page load and a
re-decision point where a shopper can abandon.
*Fix:* Replace the link with an inline popover reusing `BuyBox`'s color/size
selector logic, calling `removeItem` + `addItem` with the new variant on
confirm. Deferred here because it duplicates `BuyBox`'s variant-selection
UI; worth extracting into a shared `VariantSelector` component first.

**✅ Exit-intent save-cart for logged-out users.**
`ExitIntentSaveCart` fires once per session when the cursor crosses the
top of the viewport with items still in the bag, offering to email a link
back to the cart (the email-send itself is stubbed — wire it to the real
transactional-email provider once one exists).

## Checkout

**✅ Guest checkout, no forced account creation.** The `/checkout` flow
never requires sign-in; it links to `/account` for shoppers who want it
but proceeds without it.

**✅ Progress indicator.** Three-step (Information → Shipping → Payment)
indicator at the top of `/checkout`, `aria-current="step"` on the active
step for screen readers.

**✅ One-tap payment options.** Apple Pay / Google Pay / PayPal buttons sit
above the form, not buried at the bottom — for a shopper who already has
one of these set up, checkout is one tap, not three steps of form fields.

**✅ Total cost shown early.** The order summary (subtotal, shipping, tax
estimate, total) is visible in the sticky sidebar from step 1 — not
revealed for the first time on a final "review" screen, which is the
single biggest driver of surprise-cost abandonment.

**⚠️ Minimal fields, but not maximally minimal.**
*Why it hurts:* Each step still asks for standard fields (email, name,
full address, card details) — reasonable, but every additional required
field measurably drops completion rate.
*Fix:* Once a real payment processor is wired in, replace the manual
card-number/expiry/CVC fields with that processor's hosted/embedded field
(Shopify Payments, Stripe Elements) — this also removes raw card data from
passing through the app's own state, which is a PCI-scope reduction, not
just a CRO one.

## Mobile

**✅ Sticky add-to-cart bar.** `MobileStickyBar` appears after 480px of
scroll on the PDP, keeping price + "Add to Bag"/"Reserve" reachable without
scrolling back to the top.

**✅ Tap targets ≥44px.** The mobile sticky CTA button is `min-h-[44px]
min-w-[44px]`; size/color swatches and quick-add buttons use `py-2`+
padding that clears 44px including the tap padding, per Tailwind's default
line-height stacking.

## Post-purchase

**✅ Confirmation with clear next step.** `/checkout`'s success state shows
the order ID and sets delivery-time expectations ("3–5 business days")
without extra clicks.

**⚠️ No abandoned-cart or review-request email flow.**
*Why it hurts:* Both are among the highest-ROI lifecycle emails for
fashion e-commerce (abandoned cart recovers 5–10% of otherwise-lost
revenue industry-wide; review requests compound the trust signals used
above the fold on the PDP).
*Fix:* Out of scope for a frontend-only build — these require a
transactional email provider (Klaviyo/Postmark) and a backend order/event
store to trigger from. The `purchase` and cart-mutation analytics events
already fired in this build (`src/lib/analytics.ts`) are the same events a
real ESP integration would key off of, so the instrumentation is already
in place for whoever wires up the email side.
