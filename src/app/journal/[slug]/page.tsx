import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JOURNAL_POSTS, getJournalPost, getProductByHandle } from "@/lib/data";
import { EditorialArt } from "@/components/art/EditorialArt";
import { ProductCard } from "@/components/ProductCard";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/jsonld";

export function generateStaticParams() {
  return JOURNAL_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getJournalPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.dek,
    alternates: { canonical: `/journal/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.dek,
      publishedTime: post.date,
    },
  };
}

export default async function JournalPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getJournalPost(slug);
  if (!post) notFound();

  const shopThe = post.shopThe.map((handle) => getProductByHandle(handle)).filter(Boolean);
  const crumbs = [{ label: "Home", href: "/" }, { label: "Journal", href: "/journal" }, { label: post.title }];

  return (
    <article className="mx-auto max-w-[900px] px-5 py-10 md:px-10">
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <Breadcrumbs items={crumbs} />
      <p className="mt-6 text-xs uppercase tracking-wider text-ink-soft/60">
        {new Date(post.date).toLocaleDateString("en-US", { dateStyle: "long" })}
      </p>
      <h1 className="mt-2 font-serif text-4xl leading-tight md:text-5xl">{post.title}</h1>
      <p className="mt-4 font-serif text-xl italic text-ink-soft/80">{post.dek}</p>

      <div className="relative mt-8 aspect-[16/9] overflow-hidden">
        <EditorialArt
          image={{
            alt: post.title,
            tone: post.tone,
            garment: post.garment,
            pattern: post.pattern,
            frame: "worn",
            seed: post.slug.length + 1,
            photo: post.photo,
          }}
          priority
          className="absolute inset-0"
        />
      </div>

      <div className="prose-editorial mt-10 max-w-none space-y-6 text-base leading-relaxed">
        {post.body.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>

      {shopThe.length > 0 ? (
        <section aria-labelledby="shop-the-story" className="mt-16 border-t border-line pt-10">
          <h2 id="shop-the-story" className="font-serif text-2xl">
            Shop the Story
          </h2>
          <ul className="mt-6 grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3">
            {shopThe.map((p) => (
              <li key={p!.id}>
                <ProductCard product={p!} listName="Shop the Story" />
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </article>
  );
}
