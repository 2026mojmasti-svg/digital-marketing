import type { Metadata } from "next";
import Link from "next/link";
import { JOURNAL_POSTS } from "@/lib/data";
import { EditorialArt } from "@/components/art/EditorialArt";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Journal",
  description: "Styling stories and lookbooks from Ferrous — shop the story, directly.",
  alternates: { canonical: "/journal" },
};

export default function JournalIndex() {
  return (
    <div className="mx-auto max-w-[1600px] px-5 py-10 md:px-10">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Journal" }]} />
      <h1 className="mt-4 font-serif text-4xl md:text-5xl">Journal</h1>
      <p className="mt-2 max-w-xl text-sm text-ink-soft/80">
        Styling notes, lookbooks, and long-form fits — every story links directly to what&rsquo;s worn.
      </p>

      <ul className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-3">
        {JOURNAL_POSTS.map((post) => (
          <li key={post.slug}>
            <Link href={`/journal/${post.slug}`} className="group block">
              <div className="relative aspect-[4/5] overflow-hidden">
                <EditorialArt
                  image={{
                    alt: post.title,
                    tone: post.tone,
                    garment: post.garment,
                    pattern: post.pattern,
                    frame: "worn",
                    seed: post.slug.length,
                  }}
                  className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <p className="mt-4 text-xs uppercase tracking-wider text-ink-soft/60">
                {new Date(post.date).toLocaleDateString("en-US", { dateStyle: "long" })}
              </p>
              <h2 className="mt-1 font-serif text-2xl leading-snug group-hover:text-accent">{post.title}</h2>
              <p className="mt-2 text-sm text-ink-soft/80">{post.dek}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
