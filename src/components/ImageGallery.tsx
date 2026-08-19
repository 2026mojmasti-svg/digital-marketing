"use client";

import { useRef, useState } from "react";
import { EditorialArt } from "./art/EditorialArt";
import type { Product } from "@/lib/types";

const DRAG_THRESHOLD = 36;

export function ImageGallery({
  images,
  toneOverride,
}: {
  images: Product["images"];
  toneOverride?: [string, string];
}) {
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState(false);
  const dragStartX = useRef<number | null>(null);
  const dragged = useRef(false);

  function step(delta: 1 | -1) {
    setActive((i) => (i + delta + images.length) % images.length);
  }

  function onPointerDown(e: React.PointerEvent) {
    dragStartX.current = e.clientX;
    dragged.current = false;
  }
  function onPointerMove(e: React.PointerEvent) {
    if (dragStartX.current === null) return;
    const delta = e.clientX - dragStartX.current;
    if (Math.abs(delta) > DRAG_THRESHOLD) {
      step(delta > 0 ? -1 : 1);
      dragStartX.current = e.clientX;
      dragged.current = true;
    }
  }
  function onPointerUp() {
    dragStartX.current = null;
  }
  function onClick() {
    if (dragged.current) {
      dragged.current = false;
      return;
    }
    setZoom((z) => !z);
  }
  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowRight") step(1);
    if (e.key === "ArrowLeft") step(-1);
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setZoom((z) => !z);
    }
  }

  return (
    <div>
      <div className="flex gap-3">
        <div className="hidden w-20 shrink-0 flex-col gap-3 md:flex" role="tablist" aria-label="Product images">
          {images.map((img, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={active === i}
              aria-label={`View image ${i + 1}: ${img.alt}`}
              onClick={() => setActive(i)}
              className={`aspect-[4/5] w-full border transition-colors ${
                active === i ? "border-ink" : "border-line hover:border-ink-soft"
              }`}
            >
              <EditorialArt image={img} decorative toneOverride={toneOverride} className="h-full w-full" />
            </button>
          ))}
        </div>

        <div
          role="button"
          tabIndex={0}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
          onClick={onClick}
          onKeyDown={onKeyDown}
          aria-label={`${images[active].alt}. Drag or use arrow keys to view other angles. Press to ${
            zoom ? "zoom out" : "zoom in"
          }.`}
          className={`relative aspect-[4/5] w-full flex-1 touch-pan-y select-none overflow-hidden bg-bone-dim outline-none focus-visible:ring-2 focus-visible:ring-accent ${
            zoom ? "cursor-zoom-out" : "cursor-grab active:cursor-grabbing"
          }`}
        >
          <EditorialArt
            image={images[active]}
            toneOverride={toneOverride}
            className={`pointer-events-none h-full w-full transition-transform duration-500 ${
              zoom ? "scale-150" : "scale-100"
            }`}
          />
          <span
            aria-hidden="true"
            className="absolute bottom-3 left-1/2 z-[2] -translate-x-1/2 whitespace-nowrap bg-ink/70 px-3 py-1 text-[11px] uppercase tracking-wider text-bone"
          >
            ⟷ Drag to spin · {active + 1}/{images.length}
          </span>
        </div>
      </div>

      {/* Mobile thumbnail scrubber */}
      <div className="mt-3 flex gap-2 overflow-x-auto md:hidden" role="tablist" aria-label="Product images">
        {images.map((img, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={active === i}
            aria-label={`View image ${i + 1}: ${img.alt}`}
            onClick={() => setActive(i)}
            className={`aspect-[4/5] w-16 shrink-0 border ${active === i ? "border-ink" : "border-line"}`}
          >
            <EditorialArt image={img} decorative toneOverride={toneOverride} className="h-full w-full" />
          </button>
        ))}
      </div>
    </div>
  );
}
