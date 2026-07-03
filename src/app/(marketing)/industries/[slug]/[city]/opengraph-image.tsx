import { ImageResponse } from "next/og";
import { OgShell, ogSize, ogContentType } from "@/lib/og";
import { industries, industriesBySlug } from "@/data/industries";
import { cities, citiesBySlug } from "@/data/locations";
import { focusedIndustrySlug } from "@/config/site";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "OneBy local answering service";

export function generateStaticParams() {
  // Focused deployments redirect every /industries/* URL to the root, so
  // there's nothing to generate images for.
  if (focusedIndustrySlug) return [];
  return industries.flatMap((i) =>
    cities.map((c) => ({ slug: i.slug, city: c.slug }))
  );
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string; city: string }>;
}) {
  const { slug, city } = await params;
  const industry = industriesBySlug[slug];
  const place = citiesBySlug[city];
  return new ImageResponse(
    <OgShell
      eyebrow={place ? `Serving ${place.name}, ${place.state}` : "Local"}
      title={
        industry && place
          ? `${industry.shortName} answering in ${place.name}`
          : "OneBy"
      }
    />,
    { ...size }
  );
}
