"use client";

import { useId } from "react";
import type { EditorialImage } from "@/lib/types";
import { SILHOUETTES } from "./silhouettes";
import { FabricPattern } from "./Patterns";

type Props = {
  image: EditorialImage;
  className?: string;
  /** Live-preview a different tone than image.tone (color-swatch hover on the PDP). */
  toneOverride?: [string, string];
  decorative?: boolean;
};

/** Flat-sketch garment illustration — front/back/detail frames. */
export function GarmentArt({ image, className = "", toneOverride, decorative = false }: Props) {
  const patternId = useId();
  const spec = SILHOUETTES[image.garment];
  const tone = toneOverride ?? image.tone;
  const isBack = image.frame === "back";
  const isDetail = image.frame === "detail";

  const [vbX, vbY, vbW, vbH] = spec.viewBox.split(" ").map(Number);
  let viewBox = spec.viewBox;
  if (isDetail) {
    const zoomW = vbW * 0.44;
    const zoomH = vbH * 0.34;
    const cx = vbX + vbW * 0.5;
    const cy = vbY + vbH * (0.32 + (image.seed % 3) * 0.16);
    viewBox = `${cx - zoomW / 2} ${cy - zoomH / 2} ${zoomW} ${zoomH}`;
  }

  return (
    <div
      className={className}
      role={decorative ? undefined : "img"}
      aria-label={decorative ? undefined : image.alt}
      aria-hidden={decorative ? true : undefined}
    >
      {/* Caller's positioning (absolute inset-0, h-full w-full, ...) lives on the
          div above with no classes of its own; this div's own layout classes
          never share a className string with a caller-supplied `position`
          utility, so the two can't lose a same-property cascade conflict. */}
      <div className="grain relative h-full w-full overflow-hidden bg-bone-dim">
        <svg viewBox={viewBox} className="h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <defs>
            <FabricPattern id={patternId} type={image.pattern} tone={tone} />
          </defs>
          <g transform={isBack ? `translate(${vbW},0) scale(-1,1)` : undefined}>
            <path d={spec.path} fill={`url(#${patternId})`} stroke={tone[1]} strokeWidth="2" strokeLinejoin="round" />
            {!isBack &&
              spec.details?.map((d, i) => (
                <path
                  key={i}
                  d={d}
                  fill="none"
                  stroke={tone[1]}
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity="0.75"
                />
              ))}
            {!isBack &&
              spec.dots?.map(([cx, cy, r], i) => <circle key={i} cx={cx} cy={cy} r={r} fill={tone[1]} opacity="0.85" />)}
            {isBack ? (
              <path
                d={`M100,${vbY + 18} L100,${vbY + vbH - 18}`}
                stroke={tone[1]}
                strokeWidth="1.4"
                opacity="0.5"
              />
            ) : null}
          </g>
        </svg>
      </div>
    </div>
  );
}
