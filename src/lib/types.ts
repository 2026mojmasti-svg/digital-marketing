export type Money = {
  amount: number;
  currency: "INR";
};

export type ProductVariant = {
  id: string;
  size: string;
  color: string;
  inStock: boolean;
  inventory: number;
};

export type Review = {
  id: string;
  author: string;
  rating: number;
  title: string;
  body: string;
  date: string;
  /** Seeds the deterministic AvatarArt illustration standing in for a customer photo. */
  avatarSeed: number;
};

/** Flat-sketch silhouette this image should render as art. */
export type GarmentType =
  | "trench"
  | "fieldjacket"
  | "blazer"
  | "trouser"
  | "sweater"
  | "vest"
  | "beltbag"
  | "scarf"
  | "tee"
  | "shirt"
  | "denim"
  | "wrapdress"
  | "slipdress"
  | "partytop"
  | "jumpsuit"
  | "sequindress";

/** Fabric fill rendered inside the silhouette via an SVG <pattern>. */
export type PatternType = "plain" | "rib" | "quilt" | "houndstooth" | "pinstripe" | "sequin" | "denim";

/**
 * "front"/"back"/"detail" render the flat-sketch silhouette from different
 * crops/angles; "worn" renders the abstract croquis figure wearing it —
 * see src/components/art/GarmentArt.tsx and FigureArt.tsx.
 */
export type Frame = "front" | "back" | "detail" | "worn";

/**
 * `tone` drives every art component's palette. All imagery in this build is
 * custom inline SVG (no photography, no external image host — see
 * docs/01-technical-build-plan.md for why), so there's no separate photo
 * URL/fallback to track.
 */
export type EditorialImage = {
  alt: string;
  tone: [string, string];
  garment: GarmentType;
  pattern: PatternType;
  frame: Frame;
  seed: number;
};

export type Product = {
  id: string;
  handle: string;
  name: string;
  category: string;
  categoryLabel: string;
  price: Money;
  compareAtPrice?: Money;
  caption: string;
  description: string;
  fabric: string;
  care: string;
  colorway: string;
  variants: ProductVariant[];
  images: EditorialImage[];
  limitedDrop?: boolean;
  reviews: Review[];
  rating: number;
  reviewCount: number;
};

export type Category = {
  slug: string;
  label: string;
  description: string;
  tone: [string, string];
  garment: GarmentType;
  pattern: PatternType;
};

export type JournalPost = {
  slug: string;
  title: string;
  dek: string;
  date: string;
  tone: [string, string];
  garment: GarmentType;
  pattern: PatternType;
  body: string[];
  shopThe: string[]; // product handles referenced in the story
};
