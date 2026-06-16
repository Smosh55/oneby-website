import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { features, featuresBySlug } from "@/data/features";
import FeatureLanding from "@/components/feature/FeatureLanding";
import { jsonLd as serializeJsonLd } from "@/lib/jsonld";

export function generateStaticParams() {
  return features.map((f) => ({ slug: f.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const f = featuresBySlug[slug];
  if (!f) return {};
  return {
    title: f.metaTitle,
    description: f.metaDescription,
    keywords: f.keywords,
    alternates: { canonical: `/features/${f.slug}` },
    openGraph: {
      title: `${f.metaTitle} · OneBy`,
      description: f.metaDescription,
      type: "website",
      url: `https://oneby.ai/features/${f.slug}`,
    },
  };
}

export default async function FeaturePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const feature = featuresBySlug[slug];
  if (!feature) notFound();

  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://oneby.ai";
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "FAQPage",
        mainEntity: feature.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: base },
          { "@type": "ListItem", position: 2, name: "Product", item: `${base}/product` },
          {
            "@type": "ListItem",
            position: 3,
            name: feature.name,
            item: `${base}/features/${feature.slug}`,
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
      <FeatureLanding feature={feature} />
    </>
  );
}
