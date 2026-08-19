"use client";

import { useId } from "react";
import type { EditorialImage } from "@/lib/types";
import { SILHOUETTES, FIGURE_SILHOUETTE } from "./silhouettes";
import { FabricPattern } from "./Patterns";

type Props = {
  image: EditorialImage;
  className?: string;
  toneOverride?: [string, string];
  decorative?: boolean;
  /** "cover" (default) fills the box, cropping as needed — right for
   * portrait-ish boxes. "contain" fits the whole figure without cropping —
   * use it for very wide containers (Hero, category tiles), where "cover"
   * would zoom in on the torso and cut off the head and legs. */
  fit?: "cover" | "contain";
};

const LOWER_BODY_TYPES = new Set(["trouser", "denim"]);

function garmentPlacement(garment: string) {
  if (garment === "beltbag") return "translate(56,178) scale(0.44)";
  if (garment === "scarf") return "translate(52,58) scale(0.48)";
  if (LOWER_BODY_TYPES.has(garment)) return "translate(28,150) scale(0.72)";
  if (garment === "jumpsuit") return "translate(28,52) scale(0.72)";
  return "translate(28,48) scale(0.72)";
}

/** Abstract croquis figure wearing the garment — the "worn" frame. */
export function FigureArt({ image, className = "", toneOverride, decorative = false, fit = "cover" }: Props) {
  const patternId = useId();
  const spec = SILHOUETTES[image.garment];
  const tone = toneOverride ?? image.tone;
  const skin = "#D8C4AC";

  return (
    <div
      className={className}
      role={decorative ? undefined : "img"}
      aria-label={decorative ? undefined : image.alt}
      aria-hidden={decorative ? true : undefined}
    >
      {/* See GarmentArt for why the caller's positioning className and this
          component's own layout classes are kept on separate elements. */}
      <div
        className="grain relative h-full w-full overflow-hidden bg-bone-dim"
        style={fit === "contain" ? { backgroundImage: `linear-gradient(155deg, ${tone[0]}33 0%, ${tone[1]}22 100%)` } : undefined}
      >
        <svg
          viewBox={FIGURE_SILHOUETTE.viewBox}
          className="h-full w-full"
          preserveAspectRatio={fit === "contain" ? "xMidYMid meet" : "xMidYMid slice"}
          aria-hidden="true"
        >
          <defs>
            <FabricPattern id={patternId} type={image.pattern} tone={tone} />
          </defs>
          <path d={FIGURE_SILHOUETTE.arms} fill={skin} opacity="0.9" />
          <path d={FIGURE_SILHOUETTE.path} fill={skin} />
          <g transform={garmentPlacement(image.garment)}>
            <path d={spec.path} fill={`url(#${patternId})`} stroke={tone[1]} strokeWidth="2.4" strokeLinejoin="round" />
            {spec.details?.slice(0, 3).map((d, i) => (
              <path
                key={i}
                d={d}
                fill="none"
                stroke={tone[1]}
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.7"
              />
            ))}
          </g>
        </svg>
      </div>
    </div>
  );
}
