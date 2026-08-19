export type Money = {
  amount: number;
  currency: "USD";
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
  images: { alt: string; tone: [string, string] }[];
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
};

export type JournalPost = {
  slug: string;
  title: string;
  dek: string;
  date: string;
  tone: [string, string];
  body: string[];
  shopThe: string[]; // product handles referenced in the story
};
