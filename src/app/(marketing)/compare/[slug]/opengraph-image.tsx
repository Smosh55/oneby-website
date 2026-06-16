import { ImageResponse } from "next/og";
import { OgShell, ogSize, ogContentType } from "@/lib/og";
import { comparisons, comparisonsBySlug } from "@/data/comparisons";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "OneBy comparison";

export function generateStaticParams() {
  return comparisons.map((c) => ({ slug: c.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = comparisonsBySlug[slug];
  return new ImageResponse(
    <OgShell
      eyebrow="Comparison"
      title={c ? `OneBy vs ${c.competitor}` : "Compare OneBy"}
    />,
    { ...size }
  );
}
