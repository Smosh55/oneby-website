import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Analytics from "@/components/Analytics";
import { jsonLd } from "@/lib/jsonld";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://oneby.ai";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "OneBy: The All-in-One CRM That Catches Every Call",
    template: "%s · OneBy",
  },
  description:
    "OneBy is the all-in-one CRM for service businesses. Catch every call, then ticket, schedule, and invoice the job, all in one place. Launching August 2026 — join the waitlist.",
  keywords: [
    "VoIP CRM",
    "all-in-one CRM for service business",
    "field service CRM",
    "AI receptionist",
    "business phone system",
    "ticketing scheduling invoicing software",
    "CRM with phone system",
  ],
  openGraph: {
    title: "OneBy: Catch Every Call. Win Every Job.",
    description:
      "The all-in-one CRM for service businesses: calls, tickets, scheduling, and invoicing in one place. Launching August 2026 — join the waitlist.",
    type: "website",
    url: SITE_URL,
    siteName: "OneBy",
  },
  twitter: {
    card: "summary_large_image",
    title: "OneBy: Catch Every Call. Win Every Job.",
    description:
      "The all-in-one CRM for service businesses: calls, tickets, scheduling, and invoicing in one place.",
  },
  icons: {
    icon: "/brand/oneby-mark.svg",
  },
  // Set GOOGLE_SITE_VERIFICATION in env to emit the Search Console meta tag.
  verification: process.env.GOOGLE_SITE_VERIFICATION
    ? { google: process.env.GOOGLE_SITE_VERIFICATION }
    : undefined,
  // Meta (Facebook) Business Manager domain verification for oneby.ai.
  other: {
    "facebook-domain-verification": "98pwsneyc6v0jmlkb16k25amaeg49n",
  },
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "OneBy",
      url: SITE_URL,
      logo: `${SITE_URL}/brand/oneby-logo.svg`,
      description:
        "OneBy is the all-in-one CRM for service businesses: it catches every call and turns it into a ticket, a schedule, and an invoice, in one place.",
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+1-626-663-2944",
        email: "support@oneby.ai",
        contactType: "customer support",
        areaServed: "US",
        availableLanguage: "English",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "OneBy",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-surface text-ink">
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: jsonLd(orgJsonLd) }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
