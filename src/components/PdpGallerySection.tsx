"use client";

import { useState } from "react";
import type { Product } from "@/lib/types";
import { ImageGallery } from "./ImageGallery";
import { BuyBox } from "./BuyBox";
import { getColorTone } from "@/lib/colorTones";

/** Lifts color state between BuyBox and ImageGallery so hovering or picking
 * a color swatch live-previews it on the gallery art, not just on click. */
export function PdpGallerySection({ product }: { product: Product }) {
  const [committedColor, setCommittedColor] = useState<string>(product.variants[0]?.color ?? "");
  const [hoverColor, setHoverColor] = useState<string | null>(null);

  const activeColor = hoverColor ?? committedColor;
  const toneOverride = getColorTone(activeColor, product.images[0].tone);

  return (
    <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:gap-16">
      <ImageGallery images={product.images} toneOverride={toneOverride} />
      <div id="buy-box" className="md:sticky md:top-24 md:h-fit">
        <BuyBox product={product} onColorChange={setCommittedColor} onColorHover={setHoverColor} />
      </div>
    </div>
  );
}
