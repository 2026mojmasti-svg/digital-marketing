import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { faqJsonLd, breadcrumbJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Shipping, Returns & FAQ",
  description:
    "Shipping times, the 30-day return policy, sizing guidance, payment options, and order tracking for Ferrous.",
  alternates: { canonical: "/faq" },
};

const SECTIONS: { id: string; heading: string; items: { question: string; answer: string }[] }[] = [
  {
    id: "shipping",
    heading: "Shipping & Returns",
    items: [
      {
        question: "How much does shipping cost?",
        answer:
          "Shipping is free on orders over ₹2,999. Below that, a flat ₹99 shipping fee applies at checkout. Orders ship within 1–2 business days and typically arrive in 3–5 business days.",
      },
      {
        question: "What is your return policy?",
        answer:
          "You can return any unworn item, with tags attached, within 30 days of delivery for a full refund. Start a return from your Account page or by contacting us with your order number.",
      },
      {
        question: "Do you ship internationally?",
        answer:
          "Currently we ship within India only. International shipping is on our roadmap — join the mailing list for updates.",
      },
    ],
  },
  {
    id: "sizing",
    heading: "Sizing & Fit",
    items: [
      {
        question: "How do I find my size?",
        answer:
          "Every product page has a Size Guide link next to the size selector, with a chest/waist/hip measurement chart in inches. If you're between sizes, we recommend sizing up for outerwear and knitwear.",
      },
      {
        question: "What if my size is out of stock?",
        answer:
          "Out-of-stock sizes are shown struck through on the product page rather than hidden, so you always know what's actually available before you try to add it to your bag.",
      },
    ],
  },
  {
    id: "payment",
    heading: "Payment & Pricing",
    items: [
      {
        question: "What payment methods do you accept?",
        answer:
          "Apple Pay, Google Pay, PayPal, and major credit/debit cards, all available at checkout. All prices are in Indian Rupees (₹) and include GST.",
      },
      {
        question: "Is checkout secure?",
        answer:
          "Yes — checkout runs over HTTPS end to end, and we never store raw card details on our own servers.",
      },
    ],
  },
  {
    id: "orders",
    heading: "Orders & Tracking",
    items: [
      {
        question: "How do I track my order?",
        answer:
          "Once your order ships, you'll get a tracking link by email. You can also see order status any time from your Account page.",
      },
      {
        question: "Can I change or cancel an order after placing it?",
        answer:
          "Contact us within 1 hour of placing your order and we'll do our best to adjust it before it enters fulfillment. After that, use our 30-day return policy instead.",
      },
    ],
  },
];

export default function FaqPage() {
  const allItems = SECTIONS.flatMap((s) => s.items);
  const crumbs = [{ label: "Home", href: "/" }, { label: "FAQ" }];

  return (
    <div className="mx-auto max-w-[900px] px-5 py-10 md:px-10">
      <JsonLd data={faqJsonLd(allItems)} />
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <Breadcrumbs items={crumbs} />
      <h1 className="mt-4 font-serif text-4xl md:text-5xl">Shipping, Returns &amp; FAQ</h1>
      <p className="mt-2 max-w-xl text-sm text-ink-soft/80">
        Everything you need to know before, during, and after checkout. Can&rsquo;t find your
        answer? <Link href="/account" className="underline underline-offset-2 hover:text-accent-text">Reach out from your account page</Link>.
      </p>

      <nav aria-label="FAQ sections" className="mt-8 flex flex-wrap gap-2">
        {SECTIONS.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="border border-ink px-3 py-1.5 text-xs uppercase tracking-wider hover:bg-ink hover:text-bone"
          >
            {s.heading}
          </a>
        ))}
      </nav>

      {SECTIONS.map((section) => (
        <section key={section.id} id={section.id} className="mt-14 scroll-mt-24 border-t border-line pt-8">
          <h2 className="font-serif text-2xl">{section.heading}</h2>
          <dl className="mt-6 space-y-6">
            {section.items.map((item) => (
              <div key={item.question}>
                <dt className="font-medium">{item.question}</dt>
                <dd className="mt-1.5 text-sm leading-relaxed text-ink-soft/90">{item.answer}</dd>
              </div>
            ))}
          </dl>
        </section>
      ))}
    </div>
  );
}
