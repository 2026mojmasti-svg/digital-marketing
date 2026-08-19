import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { WebVitalsReporter } from "@/components/WebVitalsReporter";
import { JsonLd } from "@/components/JsonLd";
import { organizationJsonLd, websiteJsonLd, SITE_URL } from "@/lib/jsonld";

// next/font self-hosts these at build time (no runtime request to Google
// Fonts), subsets to latin, and applies font-display: swap automatically —
// covers the "self-host + preload + subset" performance requirement.
const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Ferrous — Considered Clothing",
    template: "%s | Ferrous",
  },
  description:
    "Ferrous is a fashion house for considered clothing — daily wear, party wear, outerwear, tailoring, knitwear, and accessories, priced mid-range and sold like a magazine, not a template.",
  openGraph: {
    type: "website",
    siteName: "Ferrous",
    title: "Ferrous — Considered Clothing",
    description: "Daily wear to party wear, considered clothing at mid-range prices.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ferrous — Considered Clothing",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable} h-full`}>
      <body className="flex min-h-full flex-col">
        <JsonLd data={organizationJsonLd()} />
        <JsonLd data={websiteJsonLd()} />
        <WebVitalsReporter />
        <AnnouncementBar />
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <CartDrawer />
      </body>
    </html>
  );
}
