import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { industries, industriesBySlug } from "@/data/industries";
import IndustryLanding from "@/components/industry/IndustryLanding";
import { jsonLd as serializeJsonLd } from "@/lib/jsonld";

export function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const industry = industriesBySlug[slug];
  if (!industry) return {};
  return {
    title: industry.metaTitle,
    description: industry.metaDescription,
    keywords: industry.keywords,
    alternates: { canonical: `/industries/${industry.slug}` },
    openGraph: {
      title: `${industry.metaTitle} · OneBy`,
      description: industry.metaDescription,
      type: "website",
      url: `https://oneby.ai/industries/${industry.slug}`,
    },
  };
}

export default async function IndustryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const industry = industriesBySlug[slug];
  if (!industry) notFound();

  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://oneby.ai";
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "FAQPage",
        mainEntity: industry.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: base },
          {
            "@type": "ListItem",
            position: 2,
            name: "Industries",
            item: `${base}/industries`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: industry.shortName,
            item: `${base}/industries/${industry.slug}`,
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />
      <IndustryLanding industry={industry} />
    </>
  );
}
