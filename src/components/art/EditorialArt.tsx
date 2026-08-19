import type { EditorialImage } from "@/lib/types";
import { GarmentArt } from "./GarmentArt";
import { FigureArt } from "./FigureArt";

type Props = {
  image: EditorialImage;
  className?: string;
  toneOverride?: [string, string];
  decorative?: boolean;
  /** Only affects the "worn" frame (FigureArt) — see its prop doc. */
  fit?: "cover" | "contain";
};

/** Picks the right illustration for an EditorialImage's frame. */
export function EditorialArt({ image, className, toneOverride, decorative, fit }: Props) {
  if (image.frame === "worn") {
    return (
      <FigureArt image={image} className={className} toneOverride={toneOverride} decorative={decorative} fit={fit} />
    );
  }
  return <GarmentArt image={image} className={className} toneOverride={toneOverride} decorative={decorative} />;
}
