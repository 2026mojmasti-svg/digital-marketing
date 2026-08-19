import type { EditorialImage } from "@/lib/types";
import { GarmentArt } from "./GarmentArt";
import { FigureArt } from "./FigureArt";
import { RealPhoto } from "../RealPhoto";

type Props = {
  image: EditorialImage;
  className?: string;
  toneOverride?: [string, string];
  decorative?: boolean;
  /** Only affects the "worn" frame (FigureArt) — see its prop doc. */
  fit?: "cover" | "contain";
  priority?: boolean;
};

/** Picks the right illustration for an EditorialImage's frame — a real
 * photo when one is set, otherwise the SVG art system. */
export function EditorialArt({ image, className, toneOverride, decorative, fit, priority }: Props) {
  if (image.photo) {
    return (
      <RealPhoto src={image.photo} alt={image.alt} className={className} decorative={decorative} priority={priority} />
    );
  }
  if (image.frame === "worn") {
    return (
      <FigureArt image={image} className={className} toneOverride={toneOverride} decorative={decorative} fit={fit} />
    );
  }
  return <GarmentArt image={image} className={className} toneOverride={toneOverride} decorative={decorative} />;
}
