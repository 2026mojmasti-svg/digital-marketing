import type { Category, JournalPost, Product } from "./types";

export const CATEGORIES: Category[] = [
  {
    slug: "outerwear",
    label: "Outerwear",
    description: "Coats and jackets cut for movement, built for weather.",
    tone: ["#C25E3A", "#8C4128"],
    query: "trenchcoat,fashion,coat",
    seed: 11,
  },
  {
    slug: "tailoring",
    label: "Tailoring",
    description: "Structured pieces with a relaxed, undone finish.",
    tone: ["#3A3C2E", "#14120F"],
    query: "blazer,fashion,tailoring",
    seed: 31,
  },
  {
    slug: "knitwear",
    label: "Knitwear",
    description: "Heavyweight yarns, brushed finishes, off-duty ease.",
    tone: ["#8C7A5E", "#4A3F2D"],
    query: "sweater,wool,fashion",
    seed: 51,
  },
  {
    slug: "accessories",
    label: "Accessories",
    description: "The details that finish the look.",
    tone: ["#6E6259", "#2B2822"],
    query: "leather,bag,fashion",
    seed: 71,
  },
];

const SIZES = ["XS", "S", "M", "L", "XL"];

function makeVariants(colors: string[], skipSizes: string[] = []): Product["variants"] {
  const variants: Product["variants"] = [];
  colors.forEach((color) => {
    SIZES.forEach((size) => {
      const out = skipSizes.includes(`${color}-${size}`);
      variants.push({
        id: `${color}-${size}`.toLowerCase(),
        size,
        color,
        inStock: !out,
        inventory: out ? 0 : Math.floor(Math.random() * 12) + 1,
      });
    });
  });
  return variants;
}

export const PRODUCTS: Product[] = [
  {
    id: "p1",
    handle: "wool-trench-coat",
    name: "Wool Trench Coat",
    category: "outerwear",
    categoryLabel: "Outerwear",
    price: { amount: 42900, currency: "INR" },
    caption: "A silhouette that does the talking — double-breasted, floor-skimming, unbothered by weather.",
    description:
      "Cut from a heavyweight Italian wool blend, the trench falls just below the knee with a belted waist and storm flap. Built for the commute, the airport, the after-party.",
    fabric: "80% wool, 18% nylon, 2% elastane",
    care: "Dry clean only. Store on a wide hanger.",
    colorway: "Rust / Ink",
    variants: makeVariants(["Rust", "Ink"], ["rust-xs"]),
    images: [
      { alt: "Wool trench coat, front view on model", tone: ["#C25E3A", "#8C4128"], query: "trenchcoat,model,fashion", seed: 11 },
      { alt: "Wool trench coat, styled with boots on location", tone: ["#8C4128", "#3A2013"], query: "trenchcoat,street,style", seed: 12 },
      { alt: "Wool trench coat, detail of belt and storm flap", tone: ["#D9784F", "#C25E3A"], query: "coat,wool,texture", seed: 13 },
      { alt: "Wool trench coat, back view", tone: ["#A64F30", "#5C2C19"], query: "trenchcoat,fashion,back", seed: 14 },
    ],
    limitedDrop: true,
    rating: 4.7,
    reviewCount: 3,
    reviews: [
      { id: "r1", author: "M. Alvarez", rating: 5, title: "Worth every rupee", body: "The wool is substantial without being stiff. Runs true to size.", date: "2026-06-02" },
      { id: "r2", author: "J. Okafor", rating: 4, title: "Beautiful cut", body: "Slightly long on me at 5'4\" but tailoring fixed it easily.", date: "2026-05-14" },
      { id: "r3", author: "R. Chen", rating: 5, title: "Editorial in real life", body: "Photographs exactly like it looks in person — rare.", date: "2026-04-29" },
    ],
  },
  {
    id: "p2",
    handle: "quilted-field-jacket",
    name: "Quilted Field Jacket",
    category: "outerwear",
    categoryLabel: "Outerwear",
    price: { amount: 27900, currency: "INR" },
    caption: "Diamond-quilted, four-pocket, built like it has somewhere to be.",
    description:
      "A field jacket reworked in a matte quilted shell with a soft brushed lining. Four utility pockets, a stand collar, and a boxy body that layers over anything.",
    fabric: "Shell: 100% nylon. Lining: 100% recycled polyester fill.",
    care: "Machine wash cold, hang dry.",
    colorway: "Bone / Olive",
    variants: makeVariants(["Bone", "Olive"]),
    images: [
      { alt: "Quilted field jacket, front view", tone: ["#3A3C2E", "#14120F"], query: "fieldjacket,fashion,jacket", seed: 21 },
      { alt: "Quilted field jacket, lifestyle shot walking", tone: ["#4A4D3A", "#242619"], query: "jacket,street,style", seed: 22 },
      { alt: "Quilted field jacket, pocket detail", tone: ["#5C5F49", "#3A3C2E"], query: "jacket,pocket,detail", seed: 23 },
    ],
    rating: 4.5,
    reviewCount: 2,
    reviews: [
      { id: "r4", author: "P. Novak", rating: 4, title: "Great everyday layer", body: "Lighter than it looks, keeps the wind out.", date: "2026-03-11" },
      { id: "r5", author: "S. Idris", rating: 5, title: "Perfect boxy fit", body: "Sized up one for the oversized look shown online.", date: "2026-02-27" },
    ],
  },
  {
    id: "p3",
    handle: "raw-hem-blazer",
    name: "Raw-Hem Blazer",
    category: "tailoring",
    categoryLabel: "Tailoring",
    price: { amount: 32900, currency: "INR" },
    caption: "Sharp shoulders, unfinished edges — tailoring that refuses to sit still.",
    description:
      "A single-breasted blazer with a deconstructed, raw-cut hem and lapel. Fully canvassed shoulders for structure, left otherwise unlined for drape.",
    fabric: "100% Italian wool suiting",
    care: "Dry clean only.",
    colorway: "Ink",
    variants: makeVariants(["Ink"]),
    images: [
      { alt: "Raw-hem blazer, front view", tone: ["#3A3C2E", "#14120F"], query: "blazer,fashion,tailoring", seed: 31 },
      { alt: "Raw-hem blazer, hem detail close-up", tone: ["#242619", "#14120F"], query: "blazer,hem,detail", seed: 32 },
      { alt: "Raw-hem blazer, styled open over knitwear", tone: ["#4A4D3A", "#242619"], query: "blazer,street,style", seed: 33 },
    ],
    rating: 4.8,
    reviewCount: 2,
    reviews: [
      { id: "r6", author: "T. Bergström", rating: 5, title: "The shoulder is everything", body: "Structured but never stiff. Best blazer I own.", date: "2026-07-01" },
      { id: "r7", author: "L. Duarte", rating: 4.5, title: "Runs slightly large", body: "Sized down and it's perfect now.", date: "2026-06-18" },
    ],
  },
  {
    id: "p4",
    handle: "wide-leg-wool-trouser",
    name: "Wide-Leg Wool Trouser",
    category: "tailoring",
    categoryLabel: "Tailoring",
    price: { amount: 21900, currency: "INR" },
    caption: "A pleat that moves. A break that's exactly right.",
    description:
      "High-rise wide-leg trousers in a fluid wool blend, finished with a double pleat and a clean break at the ankle.",
    fabric: "92% wool, 8% elastane",
    care: "Dry clean only.",
    colorway: "Bone / Ink",
    variants: makeVariants(["Bone", "Ink"]),
    images: [
      { alt: "Wide-leg wool trouser, front view", tone: ["#8C7A5E", "#4A3F2D"], query: "trousers,fashion,wool", seed: 41 },
      { alt: "Wide-leg wool trouser, walking motion shot", tone: ["#6E6259", "#2B2822"], query: "trousers,walking,street", seed: 42 },
    ],
    rating: 4.6,
    reviewCount: 2,
    reviews: [
      { id: "r8", author: "N. Petrov", rating: 5, title: "Movement is unreal", body: "Fabric has real weight and swing. Tailored to my ankle length.", date: "2026-05-30" },
      { id: "r9", author: "A. Kim", rating: 4, title: "Great with heels or flats", body: "Break is perfect either way.", date: "2026-04-09" },
    ],
  },
  {
    id: "p5",
    handle: "brushed-wool-crewneck",
    name: "Brushed Wool Crewneck",
    category: "knitwear",
    categoryLabel: "Knitwear",
    price: { amount: 13900, currency: "INR" },
    caption: "Heavy enough to wear alone, soft enough to live in.",
    description:
      "A brushed-finish crewneck knit in a chunky gauge, garment-washed for a broken-in feel from the first wear.",
    fabric: "70% wool, 30% recycled cotton",
    care: "Hand wash cold, dry flat.",
    colorway: "Bone / Rust / Ink",
    variants: makeVariants(["Bone", "Rust", "Ink"]),
    images: [
      { alt: "Brushed wool crewneck, front view", tone: ["#8C7A5E", "#4A3F2D"], query: "sweater,wool,fashion", seed: 51 },
      { alt: "Brushed wool crewneck, texture detail", tone: ["#A6947A", "#6E6259"], query: "knitwear,texture,wool", seed: 52 },
      { alt: "Brushed wool crewneck, styled layered look", tone: ["#4A3F2D", "#241E14"], query: "sweater,street,style", seed: 53 },
    ],
    rating: 4.9,
    reviewCount: 3,
    reviews: [
      { id: "r10", author: "H. Voss", rating: 5, title: "Best sweater I own", body: "Softened up beautifully after one wash.", date: "2026-07-20" },
      { id: "r11", author: "C. Reyes", rating: 5, title: "True to size", body: "Chunky but not bulky. Layers well.", date: "2026-06-05" },
      { id: "r12", author: "D. Marsh", rating: 4.5, title: "Warm without overheating", body: "Great transitional-weather weight.", date: "2026-05-01" },
    ],
  },
  {
    id: "p6",
    handle: "cable-knit-vest",
    name: "Cable-Knit Vest",
    category: "knitwear",
    categoryLabel: "Knitwear",
    price: { amount: 11900, currency: "INR" },
    caption: "Layer-first knitwear for the in-between season.",
    description: "A cropped cable-knit vest designed to sit over shirting or under outerwear. Ribbed trims throughout.",
    fabric: "100% merino wool",
    care: "Hand wash cold, dry flat.",
    colorway: "Olive",
    variants: makeVariants(["Olive"]),
    images: [
      { alt: "Cable-knit vest, front view", tone: ["#3A3C2E", "#14120F"], query: "sweater,vest,fashion", seed: 61 },
      { alt: "Cable-knit vest, layered styling shot", tone: ["#5C5F49", "#3A3C2E"], query: "knitwear,street,style", seed: 62 },
    ],
    rating: 4.4,
    reviewCount: 2,
    reviews: [
      { id: "r13", author: "E. Frank", rating: 4, title: "Great layering piece", body: "Cropped length is exactly as pictured.", date: "2026-03-22" },
      { id: "r14", author: "Y. Tanaka", rating: 5, title: "Versatile", body: "Works over a shirt or under a coat.", date: "2026-02-14" },
    ],
  },
  {
    id: "p7",
    handle: "leather-belt-bag",
    name: "Leather Belt Bag",
    category: "accessories",
    categoryLabel: "Accessories",
    price: { amount: 17900, currency: "INR" },
    caption: "Small enough to disappear, sturdy enough to matter.",
    description: "A vegetable-tanned leather belt bag with an adjustable strap and a single magnetic-close pocket.",
    fabric: "100% vegetable-tanned leather",
    care: "Wipe clean with a dry cloth. Condition leather every 6 months.",
    colorway: "Ink",
    variants: [{ id: "ink-os", size: "One Size", color: "Ink", inStock: true, inventory: 14 }],
    images: [
      { alt: "Leather belt bag, product shot", tone: ["#2B2822", "#14120F"], query: "leather,bag,fashion", seed: 71 },
      { alt: "Leather belt bag, worn on model", tone: ["#4A4130", "#2B2822"], query: "handbag,street,style", seed: 72 },
    ],
    rating: 4.7,
    reviewCount: 2,
    reviews: [
      { id: "r15", author: "V. Osei", rating: 5, title: "Fits everything I need", body: "Phone, cards, keys, lip balm — all fits.", date: "2026-06-28" },
      { id: "r16", author: "K. Lindqvist", rating: 4.5, title: "Leather is gorgeous", body: "Will only get better with age.", date: "2026-05-19" },
    ],
  },
  {
    id: "p8",
    handle: "wool-scarf",
    name: "Oversized Wool Scarf",
    category: "accessories",
    categoryLabel: "Accessories",
    price: { amount: 7900, currency: "INR" },
    caption: "The last thing you put on, the first thing people notice.",
    description: "An oversized scarf in a soft brushed wool with fringed edges, generous enough to wrap twice.",
    fabric: "100% wool",
    care: "Dry clean only.",
    colorway: "Rust",
    variants: [{ id: "rust-os", size: "One Size", color: "Rust", inStock: true, inventory: 22 }],
    images: [
      { alt: "Oversized wool scarf, styled shot", tone: ["#C25E3A", "#8C4128"], query: "scarf,wool,fashion", seed: 81 },
      { alt: "Oversized wool scarf, fringe detail", tone: ["#D9784F", "#C25E3A"], query: "scarf,fringe,detail", seed: 82 },
    ],
    rating: 4.8,
    reviewCount: 1,
    reviews: [{ id: "r17", author: "B. Laurent", rating: 5, title: "Impossibly soft", body: "Gift for myself, no regrets.", date: "2026-07-04" }],
  },
];

export function getAllProducts(): Product[] {
  return PRODUCTS;
}

export function getProductByHandle(handle: string): Product | undefined {
  return PRODUCTS.find((p) => p.handle === handle);
}

export function getProductsByCategory(slug: string): Product[] {
  return PRODUCTS.filter((p) => p.category === slug);
}

export function getCategory(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, limit);
}

export type SortKey = "featured" | "price-asc" | "price-desc" | "newest";

export function sortProducts(products: Product[], sort: SortKey): Product[] {
  const list = [...products];
  switch (sort) {
    case "price-asc":
      return list.sort((a, b) => a.price.amount - b.price.amount);
    case "price-desc":
      return list.sort((a, b) => b.price.amount - a.price.amount);
    case "newest":
      return list.reverse();
    default:
      return list;
  }
}

export function filterProducts(
  products: Product[],
  filters: { size?: string[]; color?: string[]; maxPrice?: number }
): Product[] {
  return products.filter((p) => {
    if (filters.maxPrice && p.price.amount > filters.maxPrice) return false;
    if (filters.size?.length) {
      const hasSize = p.variants.some((v) => filters.size!.includes(v.size) && v.inStock);
      if (!hasSize) return false;
    }
    if (filters.color?.length) {
      const hasColor = p.variants.some((v) => filters.color!.includes(v.color));
      if (!hasColor) return false;
    }
    return true;
  });
}

export const JOURNAL_POSTS: JournalPost[] = [
  {
    slug: "how-to-style-a-wool-trench-coat",
    title: "How to Style a Wool Trench Coat, Four Ways",
    dek: "One coat, four registers — office, off-duty, evening, transit day.",
    date: "2026-08-01",
    tone: ["#C25E3A", "#8C4128"],
    query: "trenchcoat,street,fashion",
    seed: 102,
    body: [
      "The trench is the rare coat that argues for itself in every context — thrown over tailoring for the office, cinched over knitwear for the weekend, left open over a slip dress for the evening.",
      "Our styling team pulled four looks built around the Wool Trench Coat, each restrained to a two-color base with one point of contrast.",
      "For transit days, size up and layer the Brushed Wool Crewneck underneath — the trench's belted waist keeps the silhouette from ballooning.",
    ],
    shopThe: ["wool-trench-coat", "brushed-wool-crewneck", "wide-leg-wool-trouser"],
  },
  {
    slug: "the-case-for-a-raw-hem",
    title: "The Case for a Raw Hem",
    dek: "Why unfinished edges read as more considered, not less.",
    date: "2026-07-12",
    tone: ["#3A3C2E", "#14120F"],
    query: "blazer,fashion,tailoring",
    seed: 103,
    body: [
      "A raw hem is a small refusal — a piece that declines to be fully resolved. On tailoring, it reads as intentional undoing rather than accident.",
      "The Raw-Hem Blazer keeps its shoulder fully canvassed while leaving the body unlined, so the drape softens with wear instead of stiffening.",
    ],
    shopThe: ["raw-hem-blazer", "wide-leg-wool-trouser"],
  },
  {
    slug: "cold-weather-layering-guide",
    title: "A Layering Guide for the First Real Cold Snap",
    dek: "Three pieces, worn in the right order, outperform one heavy coat.",
    date: "2026-06-20",
    tone: ["#8C7A5E", "#4A3F2D"],
    query: "knitwear,layers,fashion",
    seed: 104,
    body: [
      "Layering is a sequencing problem before it's a styling one: base for warmth, mid for insulation, outer for weather.",
      "Start with the Cable-Knit Vest as your mid layer — cropped enough to disappear under the Quilted Field Jacket without adding bulk at the waist.",
    ],
    shopThe: ["cable-knit-vest", "quilted-field-jacket", "wool-scarf"],
  },
];

export function getJournalPost(slug: string): JournalPost | undefined {
  return JOURNAL_POSTS.find((j) => j.slug === slug);
}
