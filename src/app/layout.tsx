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
    default: "OneBy — Run your whole team and all your work in one place",
    template: "%s · OneBy",
  },
  description:
    "OneBy is the all-in-one CRM that gives your whole team one place to run all their work: customers, projects, scheduling, and invoicing, with a built-in phone system and an open connector for the AI you already use. Now in invite-only early access; public launch January 2027.",
  keywords: [
    "all-in-one CRM",
    "team management software",
    "sales pipeline CRM",
    "business phone system",
    "CRM with phone system",
    "ticketing scheduling invoicing software",
    "CRM with AI connector",
  ],
  openGraph: {
    title: "OneBy — Run your whole team and all your work in one place",
    description:
      "The all-in-one platform for your whole team and all their work: customers, projects, scheduling, and invoicing, with a built-in phone system and an open connector for the AI you already use. Now in invite-only early access; public launch January 2027.",
    type: "website",
    url: SITE_URL,
    siteName: "OneBy",
  },
  twitter: {
    card: "summary_large_image",
    title: "OneBy — Run your whole team and all your work in one place",
    description:
      "The all-in-one platform for your whole team and all their work: customers, projects, scheduling, and invoicing, with a built-in phone system and an open connector for the AI you already use.",
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
        "OneBy is the all-in-one CRM that gives your whole team one place to run all their work: customers, projects, scheduling, and invoicing, with a built-in phone system and an open connector for the AI you already use.",
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+1-442-446-6329",
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
