import type { PatternType } from "@/lib/types";

/**
 * Renders the <pattern> def for a given fabric type. `id` must be unique
 * per page (callers pass a React useId-derived value) since SVG pattern
 * ids are global to the document.
 */
export function FabricPattern({ id, type, tone }: { id: string; type: PatternType; tone: [string, string] }) {
  const [light, dark] = tone;

  switch (type) {
    case "rib":
      return (
        <pattern id={id} width="8" height="8" patternUnits="userSpaceOnUse">
          <rect width="8" height="8" fill={light} />
          <rect x="0" width="3" height="8" fill={dark} opacity="0.35" />
        </pattern>
      );
    case "quilt":
      return (
        <pattern id={id} width="26" height="26" patternUnits="userSpaceOnUse">
          <rect width="26" height="26" fill={light} />
          <path
            d="M0,0 L26,26 M26,0 L0,26"
            stroke={dark}
            strokeWidth="1.2"
            opacity="0.4"
            fill="none"
          />
        </pattern>
      );
    case "houndstooth":
      return (
        <pattern id={id} width="16" height="16" patternUnits="userSpaceOnUse">
          <rect width="16" height="16" fill={light} />
          <path d="M0,0 L8,0 L8,8 L16,8 L16,16 L8,16 L8,8 L0,8 Z" fill={dark} opacity="0.5" />
        </pattern>
      );
    case "pinstripe":
      return (
        <pattern id={id} width="10" height="10" patternUnits="userSpaceOnUse">
          <rect width="10" height="10" fill={light} />
          <rect x="0" width="1.4" height="10" fill={dark} opacity="0.55" />
        </pattern>
      );
    case "sequin":
      return (
        <pattern id={id} width="14" height="14" patternUnits="userSpaceOnUse">
          <rect width="14" height="14" fill={light} />
          <circle cx="3" cy="3" r="2.2" fill={dark} opacity="0.85" />
          <circle cx="10" cy="8" r="2.2" fill={dark} opacity="0.6" />
          <circle cx="4" cy="11" r="2.2" fill={dark} opacity="0.7" />
        </pattern>
      );
    case "denim":
      return (
        <pattern id={id} width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect width="6" height="6" fill={light} />
          <rect x="0" width="2" height="6" fill={dark} opacity="0.3" />
        </pattern>
      );
    default:
      return (
        <pattern id={id} width="1" height="1" patternUnits="objectBoundingBox">
          <rect width="1" height="1" fill={light} />
        </pattern>
      );
  }
}
