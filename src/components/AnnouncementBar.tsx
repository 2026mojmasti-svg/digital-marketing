const MESSAGES = [
  "Free shipping on orders over ₹2,999",
  "Easy 30-day returns",
  "Secure checkout",
];

/** Sitewide trust-signal strip — the messages that matter most to a
 * first-time visitor, visible before they scroll past the header. */
export function AnnouncementBar() {
  return (
    <div className="bg-ink py-2 text-center text-bone">
      <p className="mx-auto flex max-w-[1600px] flex-wrap items-center justify-center gap-x-3 gap-y-1 px-5 text-[11px] uppercase tracking-wider md:text-xs">
        {MESSAGES.map((m, i) => (
          <span key={m} className="flex items-center gap-3">
            {m}
            {i < MESSAGES.length - 1 ? <span aria-hidden="true" className="text-bone/40">·</span> : null}
          </span>
        ))}
      </p>
    </div>
  );
}
