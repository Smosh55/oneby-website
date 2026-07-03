import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { comparisons, comparisonsBySlug } from "@/data/comparisons";
import ComparisonLanding from "@/components/compare/ComparisonLanding";
import { jsonLd as serializeJsonLd } from "@/lib/jsonld";

export function generateStaticParams() {
  return comparisons.map((c) => ({ slug: c.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = comparisonsBySlug[slug];
  if (!data) return {};
  return {
    title: data.metaTitle,
    description: data.metaDescription,
    keywords: data.keywords,
    alternates: { canonical: `/compare/${data.slug}` },
    openGraph: {
      title: `${data.metaTitle} · OneBy`,
      description: data.metaDescription,
      type: "website",
      url: `/compare/${data.slug}`,
    },
  };
}

export default async function ComparePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = comparisonsBySlug[slug];
  if (!data) notFound();

  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://oneby.ai";
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "FAQPage",
        mainEntity: data.faqs.map((f) => ({
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
            name: "Compare",
            item: `${base}/compare`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: `OneBy vs ${data.competitor}`,
            item: `${base}/compare/${data.slug}`,
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
      <ComparisonLanding data={data} />
    </>
  );
}
