import type { Category, JournalPost, Product } from "./types";

export const CATEGORIES: Category[] = [
  {
    slug: "daily-wear",
    label: "Daily Wear",
    description: "Everyday staples — soft cotton, easy denim, no-thought dressing.",
    tone: ["#5C7285", "#33465A"],
    garment: "denim",
    pattern: "denim",
    photo: "/images/yellow-tracksuit-streetwear.jpg",
  },
  {
    slug: "party-wear",
    label: "Party Wear",
    description: "For the nights that ask for a little more shine.",
    tone: ["#7A2A3A", "#3E1420"],
    garment: "sequindress",
    pattern: "sequin",
    photo: "/images/green-ruffle-dress.jpg",
  },
  {
    slug: "outerwear",
    label: "Outerwear",
    description: "Coats and jackets cut for movement, built for weather.",
    tone: ["#C25E3A", "#8C4128"],
    garment: "trench",
    pattern: "plain",
    photo: "/images/grey-trench-coat-closeup.jpg",
  },
  {
    slug: "tailoring",
    label: "Tailoring",
    description: "Structured pieces with a relaxed, undone finish.",
    tone: ["#3A3C2E", "#14120F"],
    garment: "blazer",
    pattern: "pinstripe",
    photo: "/images/white-oversized-blazer-walking.jpg",
  },
  {
    slug: "knitwear",
    label: "Knitwear",
    description: "Heavyweight yarns, brushed finishes, off-duty ease.",
    tone: ["#8C7A5E", "#4A3F2D"],
    garment: "sweater",
    pattern: "rib",
    photo: "/images/crochet-cardigan-granny-square.jpg",
  },
  {
    slug: "accessories",
    label: "Accessories",
    description: "The details that finish the look.",
    tone: ["#6E6259", "#2B2822"],
    garment: "beltbag",
    pattern: "plain",
    photo: "/images/woven-leather-tote.jpg",
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
    price: { amount: 6990, currency: "INR" },
    caption: "A silhouette that does the talking — double-breasted, floor-skimming, unbothered by weather.",
    description:
      "Cut from a heavyweight wool blend, the trench falls just below the knee with a belted waist and storm flap. Built for the commute, the airport, the after-party.",
    fabric: "80% wool, 18% nylon, 2% elastane",
    care: "Dry clean only. Store on a wide hanger.",
    colorway: "Rust / Ink",
    variants: makeVariants(["Rust", "Ink"], ["rust-xs"]),
    images: [
      { alt: "Wool trench coat, front view flat sketch", tone: ["#C25E3A", "#8C4128"], garment: "trench", pattern: "plain", frame: "front", seed: 11 },
      { alt: "Wool trench coat, worn on an illustrated figure", tone: ["#8C4128", "#3A2013"], garment: "trench", pattern: "plain", frame: "worn", seed: 12 },
      { alt: "Wool trench coat, fabric and belt detail", tone: ["#D9784F", "#C25E3A"], garment: "trench", pattern: "plain", frame: "detail", seed: 13 },
      { alt: "Wool trench coat, back view flat sketch", tone: ["#A64F30", "#5C2C19"], garment: "trench", pattern: "plain", frame: "back", seed: 14 },
    ],
    limitedDrop: true,
    rating: 4.7,
    reviewCount: 3,
    reviews: [
      { id: "r1", author: "M. Alvarez", rating: 5, title: "Worth every rupee", body: "The wool is substantial without being stiff. Runs true to size.", date: "2026-06-02", avatarSeed: 1, avatarPhoto: "/images/portrait-woman-striped-shirt-laptop.jpg" },
      { id: "r2", author: "J. Okafor", rating: 4, title: "Beautiful cut", body: "Slightly long on me at 5'4\" but tailoring fixed it easily.", date: "2026-05-14", avatarSeed: 2 },
      { id: "r3", author: "R. Chen", rating: 5, title: "Editorial in real life", body: "Photographs exactly like it looks in person — rare.", date: "2026-04-29", avatarSeed: 3 },
    ],
  },
  {
    id: "p2",
    handle: "quilted-field-jacket",
    name: "Quilted Field Jacket",
    category: "outerwear",
    categoryLabel: "Outerwear",
    price: { amount: 4990, currency: "INR" },
    caption: "Diamond-quilted, four-pocket, built like it has somewhere to be.",
    description:
      "A field jacket reworked in a matte quilted shell with a soft brushed lining. Four utility pockets, a stand collar, and a boxy body that layers over anything.",
    fabric: "Shell: 100% nylon. Lining: 100% recycled polyester fill.",
    care: "Machine wash cold, hang dry.",
    colorway: "Bone / Olive",
    variants: makeVariants(["Bone", "Olive"]),
    images: [
      { alt: "Quilted field jacket, front view flat sketch", tone: ["#4A4D3A", "#242619"], garment: "fieldjacket", pattern: "quilt", frame: "front", seed: 21 },
      { alt: "Quilted field jacket, worn on an illustrated figure", tone: ["#3A3C2E", "#14120F"], garment: "fieldjacket", pattern: "quilt", frame: "worn", seed: 22 },
      { alt: "Quilted field jacket, pocket and quilting detail", tone: ["#5C5F49", "#3A3C2E"], garment: "fieldjacket", pattern: "quilt", frame: "detail", seed: 23 },
    ],
    rating: 4.5,
    reviewCount: 2,
    reviews: [
      { id: "r4", author: "P. Novak", rating: 4, title: "Great everyday layer", body: "Lighter than it looks, keeps the wind out.", date: "2026-03-11", avatarSeed: 4 },
      { id: "r5", author: "S. Idris", rating: 5, title: "Perfect boxy fit", body: "Sized up one for the oversized look shown online.", date: "2026-02-27", avatarSeed: 5 },
    ],
  },
  {
    id: "p3",
    handle: "raw-hem-blazer",
    name: "Raw-Hem Blazer",
    category: "tailoring",
    categoryLabel: "Tailoring",
    price: { amount: 5490, currency: "INR" },
    caption: "Sharp shoulders, unfinished edges — tailoring that refuses to sit still.",
    description:
      "A single-breasted blazer with a deconstructed, raw-cut hem and lapel. Fully canvassed shoulders for structure, left otherwise unlined for drape.",
    fabric: "100% suiting blend",
    care: "Dry clean only.",
    colorway: "Ink",
    variants: makeVariants(["Ink"]),
    images: [
      { alt: "Raw-hem blazer, front view flat sketch", tone: ["#3A3C2E", "#14120F"], garment: "blazer", pattern: "pinstripe", frame: "front", seed: 31 },
      { alt: "Raw-hem blazer, worn on an illustrated figure", tone: ["#4A4D3A", "#242619"], garment: "blazer", pattern: "pinstripe", frame: "worn", seed: 32 },
      { alt: "Raw-hem blazer, hem and lapel detail", tone: ["#242619", "#14120F"], garment: "blazer", pattern: "pinstripe", frame: "detail", seed: 33 },
    ],
    rating: 4.8,
    reviewCount: 2,
    reviews: [
      { id: "r6", author: "T. Bergström", rating: 5, title: "The shoulder is everything", body: "Structured but never stiff. Best blazer I own.", date: "2026-07-01", avatarSeed: 6 },
      { id: "r7", author: "L. Duarte", rating: 4.5, title: "Runs slightly large", body: "Sized down and it's perfect now.", date: "2026-06-18", avatarSeed: 7 },
    ],
  },
  {
    id: "p4",
    handle: "wide-leg-wool-trouser",
    name: "Wide-Leg Wool Trouser",
    category: "tailoring",
    categoryLabel: "Tailoring",
    price: { amount: 2990, currency: "INR" },
    caption: "A pleat that moves. A break that's exactly right.",
    description:
      "High-rise wide-leg trousers in a fluid wool blend, finished with a double pleat and a clean break at the ankle.",
    fabric: "92% wool, 8% elastane",
    care: "Dry clean only.",
    colorway: "Bone / Ink",
    variants: makeVariants(["Bone", "Ink"]),
    images: [
      { alt: "Wide-leg wool trouser, front view flat sketch", tone: ["#8C7A5E", "#4A3F2D"], garment: "trouser", pattern: "plain", frame: "front", seed: 41 },
      { alt: "Wide-leg wool trouser, worn on an illustrated figure", tone: ["#6E6259", "#2B2822"], garment: "trouser", pattern: "plain", frame: "worn", seed: 42 },
    ],
    rating: 4.6,
    reviewCount: 2,
    reviews: [
      { id: "r8", author: "N. Petrov", rating: 5, title: "Movement is unreal", body: "Fabric has real weight and swing. Tailored to my ankle length.", date: "2026-05-30", avatarSeed: 8 },
      { id: "r9", author: "A. Kim", rating: 4, title: "Great with heels or flats", body: "Break is perfect either way.", date: "2026-04-09", avatarSeed: 9 },
    ],
  },
  {
    id: "p5",
    handle: "brushed-wool-crewneck",
    name: "Brushed Wool Crewneck",
    category: "knitwear",
    categoryLabel: "Knitwear",
    price: { amount: 2490, currency: "INR" },
    caption: "Heavy enough to wear alone, soft enough to live in.",
    description:
      "A brushed-finish crewneck knit in a chunky gauge, garment-washed for a broken-in feel from the first wear.",
    fabric: "70% wool, 30% recycled cotton",
    care: "Hand wash cold, dry flat.",
    colorway: "Bone / Rust / Ink",
    variants: makeVariants(["Bone", "Rust", "Ink"]),
    images: [
      { alt: "Brushed wool crewneck, front view flat sketch", tone: ["#8C7A5E", "#4A3F2D"], garment: "sweater", pattern: "rib", frame: "front", seed: 51 },
      { alt: "Brushed wool crewneck, worn on an illustrated figure", tone: ["#A6947A", "#6E6259"], garment: "sweater", pattern: "rib", frame: "worn", seed: 52 },
      { alt: "Brushed wool crewneck, ribbing texture detail", tone: ["#4A3F2D", "#241E14"], garment: "sweater", pattern: "rib", frame: "detail", seed: 53 },
    ],
    rating: 4.9,
    reviewCount: 3,
    reviews: [
      { id: "r10", author: "H. Voss", rating: 5, title: "Best sweater I own", body: "Softened up beautifully after one wash.", date: "2026-07-20", avatarSeed: 10, avatarPhoto: "/images/portrait-person-short-hair-outdoor.jpg" },
      { id: "r11", author: "C. Reyes", rating: 5, title: "True to size", body: "Chunky but not bulky. Layers well.", date: "2026-06-05", avatarSeed: 11 },
      { id: "r12", author: "D. Marsh", rating: 4.5, title: "Warm without overheating", body: "Great transitional-weather weight.", date: "2026-05-01", avatarSeed: 12 },
    ],
  },
  {
    id: "p6",
    handle: "cable-knit-vest",
    name: "Cable-Knit Vest",
    category: "knitwear",
    categoryLabel: "Knitwear",
    price: { amount: 1990, currency: "INR" },
    caption: "Layer-first knitwear for the in-between season.",
    description: "A cropped cable-knit vest designed to sit over shirting or under outerwear. Ribbed trims throughout.",
    fabric: "100% acrylic-wool blend",
    care: "Hand wash cold, dry flat.",
    colorway: "Olive",
    variants: makeVariants(["Olive"]),
    images: [
      { alt: "Cable-knit vest, front view flat sketch", tone: ["#3A3C2E", "#14120F"], garment: "vest", pattern: "rib", frame: "front", seed: 61 },
      { alt: "Cable-knit vest, worn on an illustrated figure", tone: ["#5C5F49", "#3A3C2E"], garment: "vest", pattern: "rib", frame: "worn", seed: 62 },
    ],
    rating: 4.4,
    reviewCount: 2,
    reviews: [
      { id: "r13", author: "E. Frank", rating: 4, title: "Great layering piece", body: "Cropped length is exactly as pictured.", date: "2026-03-22", avatarSeed: 13 },
      { id: "r14", author: "Y. Tanaka", rating: 5, title: "Versatile", body: "Works over a shirt or under a coat.", date: "2026-02-14", avatarSeed: 14 },
    ],
  },
  {
    id: "p7",
    handle: "leather-belt-bag",
    name: "Leather Belt Bag",
    category: "accessories",
    categoryLabel: "Accessories",
    price: { amount: 2290, currency: "INR" },
    caption: "Small enough to disappear, sturdy enough to matter.",
    description: "A vegan-leather belt bag with an adjustable strap and a single magnetic-close pocket.",
    fabric: "100% vegan leather",
    care: "Wipe clean with a dry cloth.",
    colorway: "Ink",
    variants: [{ id: "ink-os", size: "One Size", color: "Ink", inStock: true, inventory: 14 }],
    images: [
      { alt: "Leather belt bag, flat sketch", tone: ["#2B2822", "#14120F"], garment: "beltbag", pattern: "plain", frame: "front", seed: 71 },
      { alt: "Leather belt bag, worn on an illustrated figure", tone: ["#4A4130", "#2B2822"], garment: "beltbag", pattern: "plain", frame: "worn", seed: 72 },
    ],
    rating: 4.7,
    reviewCount: 2,
    reviews: [
      { id: "r15", author: "V. Osei", rating: 5, title: "Fits everything I need", body: "Phone, cards, keys, lip balm — all fits.", date: "2026-06-28", avatarSeed: 15 },
      { id: "r16", author: "K. Lindqvist", rating: 4.5, title: "Great quality for the price", body: "Feels premium, wallet-friendly.", date: "2026-05-19", avatarSeed: 16 },
    ],
  },
  {
    id: "p8",
    handle: "wool-scarf",
    name: "Oversized Wool Scarf",
    category: "accessories",
    categoryLabel: "Accessories",
    price: { amount: 1290, currency: "INR" },
    caption: "The last thing you put on, the first thing people notice.",
    description: "An oversized scarf in a soft brushed weave with fringed edges, generous enough to wrap twice.",
    fabric: "100% acrylic",
    care: "Dry clean only.",
    colorway: "Rust",
    variants: [{ id: "rust-os", size: "One Size", color: "Rust", inStock: true, inventory: 22 }],
    images: [
      { alt: "Oversized wool scarf, styled flat sketch", tone: ["#C25E3A", "#8C4128"], garment: "scarf", pattern: "plain", frame: "front", seed: 81 },
      { alt: "Oversized wool scarf, worn on an illustrated figure", tone: ["#D9784F", "#C25E3A"], garment: "scarf", pattern: "plain", frame: "worn", seed: 82 },
    ],
    rating: 4.8,
    reviewCount: 1,
    reviews: [{ id: "r17", author: "B. Laurent", rating: 5, title: "Impossibly soft", body: "Gift for myself, no regrets.", date: "2026-07-04", avatarSeed: 17 }],
  },
  {
    id: "p9",
    handle: "essential-cotton-tee",
    name: "Essential Cotton Tee",
    category: "daily-wear",
    categoryLabel: "Daily Wear",
    price: { amount: 790, currency: "INR" },
    caption: "The tee that goes under everything, over nothing.",
    description: "A heavyweight cotton tee with a boxy fit and a crew neckline that holds its shape wash after wash.",
    fabric: "100% cotton, 220gsm",
    care: "Machine wash cold, tumble dry low.",
    colorway: "Bone / Ink / Rust",
    variants: makeVariants(["Bone", "Ink", "Rust"]),
    images: [
      { alt: "Essential cotton tee, front view flat sketch", tone: ["#D8C9AE", "#B7A98A"], garment: "tee", pattern: "plain", frame: "front", seed: 91 },
      { alt: "Essential cotton tee, worn on an illustrated figure", tone: ["#B7A98A", "#8C7A5E"], garment: "tee", pattern: "plain", frame: "worn", seed: 92 },
      { alt: "Essential cotton tee, fabric weave detail", tone: ["#C9BA9C", "#9C8C6A"], garment: "tee", pattern: "plain", frame: "detail", seed: 93 },
    ],
    rating: 4.6,
    reviewCount: 2,
    reviews: [
      { id: "r18", author: "F. Achebe", rating: 5, title: "Doesn't go see-through", body: "Thick enough to layer under blazers without shadowing.", date: "2026-07-15", avatarSeed: 18 },
      { id: "r19", author: "M. Suzuki", rating: 4, title: "Great basics", body: "Bought three colors immediately.", date: "2026-06-30", avatarSeed: 19 },
    ],
  },
  {
    id: "p10",
    handle: "everyday-poplin-shirt",
    name: "Everyday Poplin Shirt",
    category: "daily-wear",
    categoryLabel: "Daily Wear",
    price: { amount: 1990, currency: "INR" },
    caption: "Crisp where it counts, soft everywhere else.",
    description: "A relaxed poplin shirt with a single chest pocket and a slightly dropped shoulder for easy movement.",
    fabric: "100% cotton poplin",
    care: "Machine wash cold, iron on low.",
    colorway: "Bone / Denim Blue",
    variants: makeVariants(["Bone", "Denim Blue"]),
    images: [
      { alt: "Everyday poplin shirt, front view flat sketch", tone: ["#7C93A3", "#455A6B"], garment: "shirt", pattern: "pinstripe", frame: "front", seed: 101 },
      { alt: "Everyday poplin shirt, worn on an illustrated figure", tone: ["#5C7285", "#33465A"], garment: "shirt", pattern: "pinstripe", frame: "worn", seed: 102 },
      { alt: "Everyday poplin shirt, collar and pocket detail", tone: ["#455A6B", "#243342"], garment: "shirt", pattern: "pinstripe", frame: "detail", seed: 103 },
    ],
    rating: 4.5,
    reviewCount: 2,
    reviews: [
      { id: "r20", author: "O. Girard", rating: 4, title: "Office to weekend", body: "Untucked with denim, tucked with trousers — both work.", date: "2026-05-22", avatarSeed: 20, avatarPhoto: "/images/outfit-woman-striped-romper-seaside.jpg" },
      { id: "r21", author: "P. Nair", rating: 5, title: "Barely needs ironing", body: "Poplin holds its shape well.", date: "2026-04-11", avatarSeed: 21 },
    ],
  },
  {
    id: "p11",
    handle: "straight-leg-denim",
    name: "Straight-Leg Denim",
    category: "daily-wear",
    categoryLabel: "Daily Wear",
    price: { amount: 2990, currency: "INR" },
    caption: "The jeans that make every other pair feel unnecessary.",
    description: "Mid-rise straight-leg jeans in a rigid-feel stretch denim, finished with a clean, uncuffed hem.",
    fabric: "98% cotton, 2% elastane",
    care: "Machine wash cold, inside out.",
    colorway: "Indigo",
    variants: makeVariants(["Indigo"]),
    images: [
      { alt: "Straight-leg denim, front view flat sketch", tone: ["#3B4A5A", "#202B36"], garment: "denim", pattern: "denim", frame: "front", seed: 111 },
      { alt: "Straight-leg denim, worn on an illustrated figure", tone: ["#4A5A6A", "#28323C"], garment: "denim", pattern: "denim", frame: "worn", seed: 112 },
      { alt: "Straight-leg denim, stitching and pocket detail", tone: ["#202B36", "#121A22"], garment: "denim", pattern: "denim", frame: "detail", seed: 113 },
    ],
    rating: 4.7,
    reviewCount: 2,
    reviews: [
      { id: "r22", author: "S. Molina", rating: 5, title: "The straight leg is perfect", body: "Not skinny, not baggy — exactly the cut I wanted.", date: "2026-07-09", avatarSeed: 22 },
      { id: "r23", author: "R. Blackwood", rating: 4.5, title: "Holds its shape", body: "No bagging out at the knee after a full day.", date: "2026-06-01", avatarSeed: 23 },
    ],
  },
  {
    id: "p12",
    handle: "jersey-wrap-dress",
    name: "Jersey Wrap Dress",
    category: "daily-wear",
    categoryLabel: "Daily Wear",
    price: { amount: 2490, currency: "INR" },
    caption: "One tie, zero decisions — the dress that dresses itself.",
    description: "A jersey wrap dress with a self-tie waist and a midi length that moves with you, not against you.",
    fabric: "95% viscose, 5% elastane",
    care: "Hand wash cold, dry flat.",
    colorway: "Rust",
    variants: makeVariants(["Rust"]),
    images: [
      { alt: "Jersey wrap dress, front view flat sketch", tone: ["#C97A52", "#8C4128"], garment: "wrapdress", pattern: "plain", frame: "front", seed: 121 },
      { alt: "Jersey wrap dress, worn on an illustrated figure", tone: ["#B36840", "#6E3018"], garment: "wrapdress", pattern: "plain", frame: "worn", seed: 122 },
    ],
    rating: 4.6,
    reviewCount: 2,
    reviews: [
      { id: "r24", author: "I. Wren", rating: 5, title: "Flattering on everyone I've recommended it to", body: "The wrap tie means it fits however you need it to.", date: "2026-05-18", avatarSeed: 24, avatarPhoto: "/images/outfit-woman-navy-satin-dress.jpg" },
      { id: "r25", author: "T. Okonkwo", rating: 4, title: "Great travel dress", body: "Doesn't wrinkle in a suitcase.", date: "2026-04-02", avatarSeed: 25 },
    ],
  },
  {
    id: "p13",
    handle: "sequin-mini-dress",
    name: "Sequin Mini Dress",
    category: "party-wear",
    categoryLabel: "Party Wear",
    price: { amount: 3990, currency: "INR" },
    caption: "Built for one thing: the room turning to look.",
    description: "An all-over sequin mini dress with a fitted bodice and a straight neckline. The kind of piece that doesn't need accessories.",
    fabric: "Sequin embellishment on stretch mesh base",
    care: "Dry clean only.",
    colorway: "Black / Gold",
    variants: makeVariants(["Black"]),
    limitedDrop: true,
    images: [
      { alt: "Sequin mini dress, front view flat sketch", tone: ["#1A1712", "#C9A227"], garment: "sequindress", pattern: "sequin", frame: "front", seed: 131 },
      { alt: "Sequin mini dress, worn on an illustrated figure", tone: ["#241F17", "#B8931F"], garment: "sequindress", pattern: "sequin", frame: "worn", seed: 132 },
      { alt: "Sequin mini dress, sequin texture detail", tone: ["#14120F", "#C9A227"], garment: "sequindress", pattern: "sequin", frame: "detail", seed: 133 },
    ],
    rating: 4.8,
    reviewCount: 2,
    reviews: [
      { id: "r26", author: "Z. Abara", rating: 5, title: "Stopped traffic, literally", body: "Wore this out for New Year's, best purchase of the year.", date: "2026-01-05", avatarSeed: 26, avatarPhoto: "/images/outfit-woman-pink-satin-dress.jpg" },
      { id: "r27", author: "C. Devereux", rating: 4.5, title: "Heavier than expected, in a good way", body: "Sequins are securely attached, nothing shedding.", date: "2025-12-20", avatarSeed: 27 },
    ],
  },
  {
    id: "p14",
    handle: "satin-slip-dress",
    name: "Satin Slip Dress",
    category: "party-wear",
    categoryLabel: "Party Wear",
    price: { amount: 2990, currency: "INR" },
    caption: "Bias-cut, barely-there straps, all the shine.",
    description: "A bias-cut satin slip dress with adjustable straps and a cowl back — the going-out dress that also works under a blazer.",
    fabric: "100% recycled satin polyester",
    care: "Hand wash cold, hang dry.",
    colorway: "Berry",
    variants: makeVariants(["Berry"]),
    images: [
      { alt: "Satin slip dress, front view flat sketch", tone: ["#B98B8F", "#6E4448"], garment: "slipdress", pattern: "plain", frame: "front", seed: 141 },
      { alt: "Satin slip dress, worn on an illustrated figure", tone: ["#A67378", "#5C363A"], garment: "slipdress", pattern: "plain", frame: "worn", seed: 142 },
    ],
    rating: 4.5,
    reviewCount: 2,
    reviews: [
      { id: "r28", author: "N. Halvorsen", rating: 4, title: "Great drape", body: "The bias cut really does skim instead of cling.", date: "2026-02-14", avatarSeed: 28 },
      { id: "r29", author: "A. Delacroix", rating: 5, title: "Versatile shine", body: "Dressed down with sneakers, dressed up with heels.", date: "2026-01-28", avatarSeed: 29 },
    ],
  },
  {
    id: "p15",
    handle: "off-shoulder-party-top",
    name: "Off-Shoulder Party Top",
    category: "party-wear",
    categoryLabel: "Party Wear",
    price: { amount: 1790, currency: "INR" },
    caption: "One shoulder note, played all night.",
    description: "A fitted off-shoulder top in a stretch knit, cropped to sit right at the waistband.",
    fabric: "92% polyester, 8% elastane",
    care: "Hand wash cold, dry flat.",
    colorway: "Berry",
    variants: makeVariants(["Berry"]),
    images: [
      { alt: "Off-shoulder party top, front view flat sketch", tone: ["#7A2A3A", "#3E1420"], garment: "partytop", pattern: "plain", frame: "front", seed: 151 },
      { alt: "Off-shoulder party top, worn on an illustrated figure", tone: ["#661F2C", "#2E0F18"], garment: "partytop", pattern: "plain", frame: "worn", seed: 152 },
    ],
    rating: 4.4,
    reviewCount: 1,
    reviews: [{ id: "r30", author: "J. Steele", rating: 4.5, title: "Stays put all night", body: "Was worried about the off-shoulder cut slipping — it didn't.", date: "2026-03-02", avatarSeed: 30 }],
  },
  {
    id: "p16",
    handle: "tailored-party-jumpsuit",
    name: "Tailored Party Jumpsuit",
    category: "party-wear",
    categoryLabel: "Party Wear",
    price: { amount: 4490, currency: "INR" },
    caption: "One piece, zero outfit math.",
    description: "A wide-leg jumpsuit with a fitted, pinstriped bodice and a tie waist — dressy enough for the party, no dress required.",
    fabric: "70% viscose, 30% polyester",
    care: "Dry clean only.",
    colorway: "Ink",
    variants: makeVariants(["Ink"]),
    images: [
      { alt: "Tailored party jumpsuit, front view flat sketch", tone: ["#2E2A2E", "#14111A"], garment: "jumpsuit", pattern: "pinstripe", frame: "front", seed: 161 },
      { alt: "Tailored party jumpsuit, worn on an illustrated figure", tone: ["#221E22", "#0E0C11"], garment: "jumpsuit", pattern: "pinstripe", frame: "worn", seed: 162 },
      { alt: "Tailored party jumpsuit, waist tie detail", tone: ["#3A353A", "#1C181C"], garment: "jumpsuit", pattern: "pinstripe", frame: "detail", seed: 163 },
    ],
    rating: 4.7,
    reviewCount: 1,
    reviews: [{ id: "r31", author: "G. Papadakis", rating: 5, title: "Wide leg is so flattering", body: "Got compliments all night, comfortable enough to actually dance in.", date: "2026-02-08", avatarSeed: 31 }],
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
    garment: "trench",
    pattern: "plain",
    photo: "/images/grey-trench-coat-closeup.jpg",
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
    garment: "blazer",
    pattern: "pinstripe",
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
    garment: "sweater",
    pattern: "rib",
    photo: "/images/brown-knit-sweater-hanger.jpg",
    body: [
      "Layering is a sequencing problem before it's a styling one: base for warmth, mid for insulation, outer for weather.",
      "Start with the Cable-Knit Vest as your mid layer — cropped enough to disappear under the Quilted Field Jacket without adding bulk at the waist.",
    ],
    shopThe: ["cable-knit-vest", "quilted-field-jacket", "wool-scarf"],
  },
  {
    slug: "five-minute-outfits-for-busy-mornings",
    title: "Five-Minute Outfits for Busy Mornings",
    dek: "The daily-wear pieces that require zero decisions before coffee.",
    date: "2026-07-25",
    tone: ["#5C7285", "#33465A"],
    garment: "denim",
    pattern: "denim",
    photo: "/images/yellow-tracksuit-streetwear.jpg",
    body: [
      "The best daily uniform isn't a uniform at all — it's three or four pieces that all work with each other, so the decision is already made.",
      "Straight-Leg Denim plus the Essential Cotton Tee is the fastest outfit in the lineup; add the Everyday Poplin Shirt open over it the moment the weather turns.",
    ],
    shopThe: ["straight-leg-denim", "essential-cotton-tee", "everyday-poplin-shirt"],
  },
  {
    slug: "one-dress-three-parties",
    title: "One Dress, Three Parties",
    dek: "How the same slip dress covers a rooftop, a dinner, and a dance floor.",
    date: "2026-08-10",
    tone: ["#7A2A3A", "#3E1420"],
    garment: "slipdress",
    pattern: "plain",
    photo: "/images/cream-embroidered-dress.jpg",
    body: [
      "A party wardrobe doesn't need to be large — it needs one or two pieces that flex across the whole night's itinerary.",
      "The Satin Slip Dress goes from rooftop drinks (worn alone) to the dinner after (layered under the Raw-Hem Blazer) to the dance floor after that (blazer off, sleeves pushed up).",
    ],
    shopThe: ["satin-slip-dress", "raw-hem-blazer", "off-shoulder-party-top"],
  },
];

export function getJournalPost(slug: string): JournalPost | undefined {
  return JOURNAL_POSTS.find((j) => j.slug === slug);
}
