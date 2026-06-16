import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { comparisons, comparisonsBySlug } from "@/data/comparisons";
import ComparisonLanding from "@/components/compare/ComparisonLanding";

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
      url: `https://oneby.ai/compare/${data.slug}`,
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

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: data.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <ComparisonLanding data={data} />
    </>
  );
}
