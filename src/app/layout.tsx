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
    default: "OneBy: The AI Communications OS That Turns Calls Into Action",
    template: "%s · OneBy",
  },
  description:
    "OneBy makes every call smarter. Answered or missed, desk phone or mobile, it transcribes the conversation, writes the summary, and creates and assigns the follow-up task, automatically. For businesses of every size.",
  keywords: [
    "post-call automation",
    "AI call summaries",
    "call task automation",
    "AI receptionist",
    "business phone system",
    "workflow automation",
    "call transcription",
  ],
  openGraph: {
    title: "OneBy: Turn Every Call Into Action",
    description:
      "The AI Communications OS that makes every call smarter. Every conversation becomes a summary and an assigned task, automatically.",
    type: "website",
    url: SITE_URL,
    siteName: "OneBy",
  },
  twitter: {
    card: "summary_large_image",
    title: "OneBy: Turn Every Call Into Action",
    description:
      "The AI Communications OS that makes every call smarter. Every conversation becomes a summary and an assigned task.",
  },
  icons: {
    icon: "/brand/oneby-mark.svg",
  },
  // Set GOOGLE_SITE_VERIFICATION in env to emit the Search Console meta tag.
  verification: process.env.GOOGLE_SITE_VERIFICATION
    ? { google: process.env.GOOGLE_SITE_VERIFICATION }
    : undefined,
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
        "The AI Communications OS that turns every call into action: post-call automation, AI receptionist, and tasks that create and assign themselves.",
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
