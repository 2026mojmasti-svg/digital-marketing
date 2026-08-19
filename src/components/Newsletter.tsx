"use client";

import { useState } from "react";

export function Newsletter() {
  const [status, setStatus] = useState<"idle" | "submitted">("idle");

  return (
    <div className="border-b border-line pb-12">
      <h2 className="font-serif text-3xl">Join the list</h2>
      <p className="mt-2 max-w-md text-sm text-ink-soft/80">
        Early access to drops, styling notes from the journal, one email a week.
      </p>
      <form
        className="mt-6 flex max-w-md gap-3"
        onSubmit={(e) => {
          e.preventDefault();
          setStatus("submitted");
        }}
      >
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          required
          placeholder="you@email.com"
          className="w-full border border-ink bg-transparent px-4 py-3 text-sm outline-none focus-visible:border-accent"
        />
        <button
          type="submit"
          className="whitespace-nowrap border border-ink bg-ink px-5 py-3 text-sm uppercase tracking-wider text-bone transition-colors hover:bg-transparent hover:text-ink"
        >
          {status === "submitted" ? "Thanks" : "Subscribe"}
        </button>
      </form>
      <p role="status" className="mt-2 text-xs text-accent-text">
        {status === "submitted" ? "You're on the list." : ""}
      </p>
    </div>
  );
}
