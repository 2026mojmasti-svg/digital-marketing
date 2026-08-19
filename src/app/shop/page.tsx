import type { Metadata } from "next";
import { FilterSidebar } from "@/components/FilterSidebar";
import { ProductGridWithLoadMore } from "@/components/ProductGridWithLoadMore";
import { ListViewTracker } from "@/components/ListViewTracker";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { getAllProducts, filterProducts, sortProducts, type SortKey } from "@/lib/data";

export const metadata: Metadata = {
  title: "Shop All",
  description: "Shop the full Ferrous collection — outerwear, tailoring, knitwear, and accessories.",
  alternates: { canonical: "/shop" },
};

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ size?: string; color?: string; maxPrice?: string; sort?: string }>;
}) {
  const params = await searchParams;
  const filtered = filterProducts(getAllProducts(), {
    size: params.size?.split(",").filter(Boolean),
    color: params.color?.split(",").filter(Boolean),
    maxPrice: params.maxPrice ? Number(params.maxPrice) : undefined,
  });
  const products = sortProducts(filtered, (params.sort as SortKey) ?? "featured");

  return (
    <div className="mx-auto max-w-[1600px] px-5 py-10 md:px-10">
      <ListViewTracker products={products} listName="Shop All" />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Shop All" }]} />
      <h1 className="mt-4 font-serif text-4xl md:text-5xl">Shop All</h1>
      <div className="mt-8 flex flex-col gap-10 md:flex-row">
        <FilterSidebar />
        <div className="flex-1">
          <p className="mb-6 text-sm text-ink-soft/70">{products.length} items</p>
          <ProductGridWithLoadMore products={products} listName="Shop All" />
        </div>
      </div>
    </div>
  );
}
