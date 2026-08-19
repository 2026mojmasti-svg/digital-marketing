# Accessibility Audit — WCAG 2.2 AA

## Color contrast

**Issue found and fixed:** the initial palette used the brand accent
(`#C25E3A`, rust) directly as text color on the bone background. Contrast
ratio ≈ 3.98:1 — passes the 3:1 bar for large text and non-text UI, but
fails the 4.5:1 bar for normal-size text (WCAG 1.4.3).

**Fix:** added a second token, `--color-accent-text` (`#A34A2C`), used
wherever the accent appears as *readable text* at normal size — error
messages, low-stock warnings, hover states on body-size links (`BuyBox`,
`FilterSidebar`, `CartDrawer`, `/cart`, `/checkout`, `/product/[handle]`).
Contrast ≈ 5.4:1, clears AA with margin. The original `--color-accent`
stays in use for large text (≥24px headings, where 3:1 applies — e.g. the
journal card title hover), non-text UI (progress bar fill, focus outline,
borders), and decorative icon glyphs. A "drop mode" variant of the token
(`#E39169`) is defined for the inverted (`data-mode="drop"`) high-contrast
palette so the same rule holds when ink/bone are swapped.

Ink-on-bone body text (`#14120F` on `#F7F5F1`) is ≈ 17.9:1 — far above AA.

## Keyboard navigation

- **Mega-menu** (`Header.tsx`): trigger is a real `<button>` with
  `aria-expanded`/`aria-haspopup`; `Escape` closes it; a `mousedown`
  listener outside the menu closes it; all destination links remain
  standard `<Link>` elements, so Tab order and Enter-to-activate work with
  no custom handling.
- **Filter sidebar**: native `<select>`, `<input type="checkbox">`, and
  `<input type="radio">` — full keyboard support comes from the browser,
  not custom JS.
- **Cart drawer** (`CartDrawer.tsx`): implemented as a focus-trapped
  `role="dialog"` — focus moves to the close button on open, `Tab`/`Shift+Tab`
  wraps within the panel, `Escape` closes it. Same pattern in
  `SizeGuideModal` and `ExitIntentSaveCart`.
- **Checkout**: standard form semantics (`<fieldset>`/`<legend>` per step,
  `autoComplete` attributes for autofill), so keyboard and screen-reader
  users get the same step-by-step flow as pointer users.

## Focus states

`:focus-visible` is styled once, globally, in `globals.css`:
```css
:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 3px;
  border-radius: 1px;
}
```
This replaces the browser-default blue outline with the brand accent
everywhere, rather than requiring every interactive component to redefine
it — and the accent passes the 3:1 non-text contrast bar required for
focus indicators (WCAG 2.4.11).

## Alt text strategy

`ProductImage` (`src/components/ProductImage.tsx`) takes an explicit
`decorative` prop:
- `decorative={false}` (default): renders `role="img"` + `aria-label` with
  a real description ("Wool trench coat, front view on model" — descriptive,
  written per-image in `src/lib/data.ts`, never a generic "product photo").
- `decorative={true}`: renders `aria-hidden="true"`, used for the second
  (crossfade) image in `ProductCard` and gallery thumbnails, where the
  primary image already carries the description and a repeated
  announcement would be noise for screen-reader users.

## Forms, errors, and live regions

- Every form input has a associated `<label>` (visually hidden via
  `sr-only` where the design calls for a placeholder-only look, e.g.
  newsletter email).
- `BuyBox`'s "select a size" validation error is a `role="status"`
  paragraph — announced without requiring focus to move.
- Cart mutations (add/remove) announce through a sitewide
  `aria-live="polite"` region in `CartDrawer` (`lastAnnouncement` in the
  Zustand store), so "Wool Trench Coat (M, Rust) added to bag" reaches
  screen-reader users even when the drawer opens without a focus change.
- The size guide table uses `<caption>`, `<th scope="col">`/`scope="row"`,
  so its data is navigable by table shortcuts, not just visually.

## Reduced motion

- Global rule in `globals.css` collapses all animation/transition duration
  to near-zero under `prefers-reduced-motion: reduce`, plus
  `scroll-behavior: auto`.
- `Hero`'s scroll-parallax explicitly checks
  `matchMedia("(prefers-reduced-motion: reduce)")` before attaching the
  scroll listener at all, rather than relying solely on the CSS override —
  belt-and-suspenders, since a JS-driven `transform` write on every scroll
  frame is itself the kind of motion this preference exists to suppress.
