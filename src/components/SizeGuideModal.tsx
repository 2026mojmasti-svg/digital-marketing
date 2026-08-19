"use client";

import { useEffect, useRef, useState } from "react";

const ROWS = [
  { size: "XS", chest: '32-33"', waist: '25-26"', hips: '35-36"' },
  { size: "S", chest: '34-35"', waist: '27-28"', hips: '37-38"' },
  { size: "M", chest: '36-38"', waist: '29-31"', hips: '39-41"' },
  { size: "L", chest: '39-41"', waist: '32-34"', hips: '42-44"' },
  { size: "XL", chest: '42-44"', waist: '35-37"', hips: '45-47"' },
];

export function SizeGuideModal() {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (open) dialogRef.current?.focus();
  }, [open]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    }
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        className="text-xs uppercase tracking-wider underline-offset-4 hover:underline"
      >
        Size Guide
      </button>
      {open ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <button aria-label="Close size guide" className="absolute inset-0 bg-ink/50" onClick={() => setOpen(false)} />
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="size-guide-title"
            tabIndex={-1}
            className="animate-fade-rise relative z-10 max-h-[85vh] w-full max-w-lg overflow-y-auto bg-bone p-8 shadow-2xl"
          >
            <div className="flex items-center justify-between">
              <h2 id="size-guide-title" className="font-serif text-2xl">
                Size Guide
              </h2>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-sm uppercase tracking-wider underline-offset-4 hover:underline"
              >
                Close
              </button>
            </div>
            <table className="mt-6 w-full border-collapse text-left text-sm">
              <caption className="sr-only">Body measurements by size, in inches</caption>
              <thead>
                <tr className="border-b border-ink">
                  <th scope="col" className="py-2">Size</th>
                  <th scope="col" className="py-2">Chest</th>
                  <th scope="col" className="py-2">Waist</th>
                  <th scope="col" className="py-2">Hips</th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map((r) => (
                  <tr key={r.size} className="border-b border-line">
                    <th scope="row" className="py-2 font-normal">{r.size}</th>
                    <td className="py-2">{r.chest}</td>
                    <td className="py-2">{r.waist}</td>
                    <td className="py-2">{r.hips}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-4 text-xs text-ink-soft/70">
              Measurements in inches. Between sizes? We recommend sizing up for outerwear and knitwear.
            </p>
          </div>
        </div>
      ) : null}
    </>
  );
}
