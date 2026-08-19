import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FilterSidebar } from "@/components/FilterSidebar";
import { ProductGridWithLoadMore } from "@/components/ProductGridWithLoadMore";
import { ListViewTracker } from "@/components/ListViewTracker";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { CATEGORIES, getCategory, getProductsByCategory, filterProducts, sortProducts, type SortKey } from "@/lib/data";

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const cat = getCategory(category);
  if (!cat) return {};
  return {
    title: cat.label,
    description: `${cat.description} Shop ${cat.label.toLowerCase()} at Ferrous.`,
    alternates: { canonical: `/shop/${cat.slug}` },
  };
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ size?: string; color?: string; maxPrice?: string; sort?: string }>;
}) {
  const { category } = await params;
  const cat = getCategory(category);
  if (!cat) notFound();

  const sp = await searchParams;
  const filtered = filterProducts(getProductsByCategory(cat.slug), {
    size: sp.size?.split(",").filter(Boolean),
    color: sp.color?.split(",").filter(Boolean),
    maxPrice: sp.maxPrice ? Number(sp.maxPrice) : undefined,
  });
  const products = sortProducts(filtered, (sp.sort as SortKey) ?? "featured");

  const crumbs = [{ label: "Home", href: "/" }, { label: "Shop", href: "/shop" }, { label: cat.label }];

  return (
    <div className="mx-auto max-w-[1600px] px-5 py-10 md:px-10">
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <ListViewTracker products={products} listName={cat.label} />
      <Breadcrumbs items={crumbs} />
      <h1 className="mt-4 font-serif text-4xl md:text-5xl">{cat.label}</h1>
      <p className="mt-2 max-w-xl text-sm text-ink-soft/80">{cat.description}</p>
      <div className="mt-8 flex flex-col gap-10 md:flex-row">
        <FilterSidebar />
        <div className="flex-1">
          <p className="mb-6 text-sm text-ink-soft/70">{products.length} items</p>
          <ProductGridWithLoadMore products={products} listName={cat.label} />
        </div>
      </div>
    </div>
  );
}
