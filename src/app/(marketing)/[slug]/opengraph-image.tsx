import { ImageResponse } from "next/og";
import { OgShell, ogSize, ogContentType } from "@/lib/og";
import { industries, industriesBySlug } from "@/data/industries";
import { focusedIndustrySlug } from "@/config/site";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "OneBy for your industry";

export function generateStaticParams() {
  // Focused deployments redirect every /industries/* URL to the root, so
  // there's nothing to generate images for.
  if (focusedIndustrySlug) return [];
  return industries.map((i) => ({ slug: i.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const ind = industriesBySlug[slug];
  return new ImageResponse(
    <OgShell
      eyebrow={ind ? `OneBy for ${ind.shortName}` : "Industries"}
      title={ind?.heroTitle ?? "OneBy"}
    />,
    { ...size }
  );
}
