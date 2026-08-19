import { AvatarArt } from "./art/AvatarArt";
import { RealPhoto } from "./RealPhoto";

type Props = {
  seed: number;
  alt: string;
  className?: string;
  photo?: string;
};

/** Real customer photo when one is set, falling back to the illustrated avatar otherwise. */
export function ReviewAvatar({ seed, alt, className = "", photo }: Props) {
  if (photo) {
    return <RealPhoto src={photo} alt={alt} className={className} />;
  }
  return <AvatarArt seed={seed} alt={alt} className={className} />;
}
