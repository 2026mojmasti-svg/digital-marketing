"use client";

import { useEffect, useRef, useState } from "react";
import { useCart } from "@/lib/store";

// Fires once per session when a logged-out visitor's cursor leaves toward
// the browser chrome with items still in the bag — offers to email the
// cart instead of losing the session to abandonment.
export function ExitIntentSaveCart() {
  const lines = useCart((s) => s.lines);
  const [show, setShow] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const firedRef = useRef(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (lines.length === 0) return;
    function onLeave(e: MouseEvent) {
      if (firedRef.current) return;
      if (e.clientY <= 0) {
        firedRef.current = true;
        setShow(true);
      }
    }
    document.addEventListener("mouseleave", onLeave);
    return () => document.removeEventListener("mouseleave", onLeave);
  }, [lines.length]);

  useEffect(() => {
    if (show) dialogRef.current?.focus();
  }, [show]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button aria-label="Dismiss" className="absolute inset-0 bg-ink/50" onClick={() => setShow(false)} />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="exit-intent-title"
        tabIndex={-1}
        className="animate-fade-rise relative z-10 max-w-sm bg-bone p-8 text-center shadow-2xl"
      >
        <h2 id="exit-intent-title" className="font-serif text-2xl">
          Save your bag?
        </h2>
        {submitted ? (
          <p className="mt-3 text-sm text-ink-soft/80">Sent — check your inbox.</p>
        ) : (
          <>
            <p className="mt-3 text-sm text-ink-soft/80">
              We&rsquo;ll email you a link back to your bag so it&rsquo;s here when you are.
            </p>
            <form
              className="mt-5 flex flex-col gap-3"
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
            >
              <label htmlFor="exit-email" className="sr-only">
                Email address
              </label>
              <input
                id="exit-email"
                type="email"
                required
                placeholder="you@email.com"
                className="border border-ink bg-transparent px-4 py-3 text-sm outline-none focus-visible:border-accent"
              />
              <button type="submit" className="bg-ink py-3 text-sm uppercase tracking-wider text-bone">
                Email My Bag
              </button>
            </form>
          </>
        )}
        <button
          type="button"
          onClick={() => setShow(false)}
          className="mt-4 text-xs uppercase tracking-wider text-ink-soft/60 underline-offset-4 hover:underline"
        >
          No thanks
        </button>
      </div>
    </div>
  );
}
