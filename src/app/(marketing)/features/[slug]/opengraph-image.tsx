import { ImageResponse } from "next/og";
import { OgShell, ogSize, ogContentType } from "@/lib/og";
import { features, featuresBySlug } from "@/data/features";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "OneBy feature";

export function generateStaticParams() {
  return features.map((f) => ({ slug: f.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const f = featuresBySlug[slug];
  return new ImageResponse(
    <OgShell eyebrow={f?.heroEyebrow ?? "Product"} title={f?.heroTitle ?? "OneBy"} />,
    { ...size }
  );
}
