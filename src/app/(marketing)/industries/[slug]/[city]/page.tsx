import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { industries, industriesBySlug } from "@/data/industries";
import { cities, citiesBySlug } from "@/data/locations";
import LocalLanding from "@/components/local/LocalLanding";
import { jsonLd as serializeJsonLd } from "@/lib/jsonld";

export function generateStaticParams() {
  return industries.flatMap((i) =>
    cities.map((c) => ({ slug: i.slug, city: c.slug }))
  );
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; city: string }>;
}): Promise<Metadata> {
  const { slug, city } = await params;
  const industry = industriesBySlug[slug];
  const place = citiesBySlug[city];
  if (!industry || !place) return {};
  const title = `${industry.shortName} Answering Service in ${place.name}, ${place.state}`;
  return {
    title,
    description: `OneBy answers every ${industry.shortName.toLowerCase()} call in ${place.name}, ${place.state}, captures the details, and turns it into a booked job. AI receptionist, summaries, and tasks, live in a day.`,
    keywords: [
      `${industry.shortName} answering service ${place.name}`,
      `${industry.shortName} AI receptionist ${place.name}`,
      `${place.name} ${industry.shortName.toLowerCase()} call answering`,
    ],
    alternates: { canonical: `/industries/${slug}/${city}` },
    openGraph: {
      title: `${title} · OneBy`,
      description: `AI call answering for ${place.name} ${industry.shortName.toLowerCase()} businesses.`,
      type: "website",
      url: `https://oneby.ai/industries/${slug}/${city}`,
    },
  };
}

export default async function LocalPage({
  params,
}: {
  params: Promise<{ slug: string; city: string }>;
}) {
  const { slug, city } = await params;
  const industry = industriesBySlug[slug];
  const place = citiesBySlug[city];
  if (!industry || !place) notFound();

  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://oneby.ai";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: `${industry.shortName} answering service`,
    provider: { "@type": "Organization", name: "OneBy", url: base },
    areaServed: { "@type": "City", name: `${place.name}, ${place.state}` },
    url: `${base}/industries/${slug}/${city}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />
      <LocalLanding industry={industry} city={place} />
    </>
  );
}
