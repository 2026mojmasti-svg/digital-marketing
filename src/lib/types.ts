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
  photoAlt?: string;
};

/**
 * `tone` is the gradient fallback (used while the photo loads and if it
 * ever fails to fetch); `query`/`seed` locate a real, keyword-relevant
 * photo via LoremFlickr — see src/components/StockImage.tsx.
 */
export type EditorialImage = {
  alt: string;
  tone: [string, string];
  query: string;
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
  query: string;
  seed: number;
};

export type JournalPost = {
  slug: string;
  title: string;
  dek: string;
  date: string;
  tone: [string, string];
  query: string;
  seed: number;
  body: string[];
  shopThe: string[]; // product handles referenced in the story
};
