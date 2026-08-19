import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PRODUCTS, getProductByHandle, getRelatedProducts } from "@/lib/data";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PdpGallerySection } from "@/components/PdpGallerySection";
import { Accordion } from "@/components/Accordion";
import { ProductCard } from "@/components/ProductCard";
import { AvatarArt } from "@/components/art/AvatarArt";
import { ReviewStars } from "@/components/ReviewStars";
import { MobileStickyBar } from "@/components/MobileStickyBar";
import { PdpViewTracker } from "@/components/PdpViewTracker";
import { JsonLd } from "@/components/JsonLd";
import { productJsonLd, breadcrumbJsonLd } from "@/lib/jsonld";

export const revalidate = 300; // ISR: re-check price/inventory every 5 minutes

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ handle: p.handle }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ handle: string }>;
}): Promise<Metadata> {
  const { handle } = await params;
  const product = getProductByHandle(handle);
  if (!product) return {};
  return {
    title: `${product.name} — ${product.categoryLabel}`,
    description: product.description,
    alternates: { canonical: `/product/${product.handle}` },
    openGraph: {
      title: `${product.name} — ${product.categoryLabel} | Ferrous`,
      description: product.caption,
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params;
  const product = getProductByHandle(handle);
  if (!product) notFound();

  const related = getRelatedProducts(product);
  const crumbs = [
    { label: "Home", href: "/" },
    { label: product.categoryLabel, href: `/shop/${product.category}` },
    { label: product.name },
  ];

  return (
    <div className="mx-auto max-w-[1600px] px-5 py-10 md:px-10">
      <PdpViewTracker product={product} />
      <JsonLd data={productJsonLd(product)} />
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <Breadcrumbs items={crumbs} />

      <div className="mt-6">
        <PdpGallerySection product={product} />
      </div>

      <div className="mt-16 grid grid-cols-1 gap-16 md:grid-cols-2">
        <div>
          <h2 className="mb-2 font-serif text-2xl">The Details</h2>
          <p className="text-sm leading-relaxed text-ink-soft/90">{product.description}</p>
          <Accordion
            items={[
              { title: "Fabric & Fit", content: <p>{product.fabric}. Colorway: {product.colorway}.</p> },
              { title: "Care", content: <p>{product.care}</p> },
              {
                title: "Shipping & Returns",
                content: <p>Free shipping on orders over ₹2,999. Free returns within 30 days of delivery.</p>,
              },
            ]}
          />
        </div>

        <div>
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-2xl">Reviews</h2>
            <ReviewStars rating={product.rating} reviewCount={product.reviewCount} />
          </div>
          <ul className="mt-6 space-y-6 border-t border-line pt-6">
            {product.reviews.map((r) => (
              <li key={r.id} className="flex gap-4 border-b border-line pb-6">
                <AvatarArt
                  seed={r.avatarSeed}
                  alt={`${r.author}'s profile photo`}
                  className="h-10 w-10 shrink-0 rounded-full"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{r.title}</p>
                    <ReviewStars rating={r.rating} reviewCount={0} hideCount />
                  </div>
                  <p className="mt-2 text-sm text-ink-soft/90">{r.body}</p>
                  <p className="mt-2 text-xs text-ink-soft/60">
                    {r.author} · {new Date(r.date).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <h3 className="mt-10 mb-4 text-xs uppercase tracking-wider text-ink-soft/70">
            Worn by customers
          </h3>
          <ul className="grid grid-cols-3 gap-2">
            {product.reviews.slice(0, 3).map((r) => (
              <li key={r.id} className="aspect-square">
                <AvatarArt
                  seed={r.avatarSeed + 200}
                  alt={`${r.author} wearing the ${product.name}`}
                  className="h-full w-full"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>

      {related.length > 0 ? (
        <section aria-labelledby="complete-look" className="mt-20 border-t border-line pt-14">
          <h2 id="complete-look" className="font-serif text-3xl">
            Complete the Look
          </h2>
          <ul className="mt-8 grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-4">
            {related.map((p) => (
              <li key={p.id}>
                <ProductCard product={p} listName="Complete the Look" />
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <p className="mt-16 text-xs text-ink-soft/60">
        Read the styling story:{" "}
        <Link href="/journal" className="underline underline-offset-2 hover:text-accent-text">
          visit the Journal
        </Link>
        .
      </p>

      <MobileStickyBar product={product} />
    </div>
  );
}
