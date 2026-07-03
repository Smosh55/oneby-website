import { ImageResponse } from "next/og";
import { OgShell, ogSize, ogContentType } from "@/lib/og";
import { getPostBySlug, getPostSlugs, getAllPosts } from "@/lib/blog";
import { focusedIndustrySlug } from "@/config/site";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "OneBy blog article";

export function generateStaticParams() {
  if (focusedIndustrySlug) {
    return getAllPosts()
      .filter((p) => p.industry === focusedIndustrySlug || !p.industry)
      .map((p) => ({ slug: p.slug }));
  }
  return getPostSlugs().map((slug) => ({ slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  return new ImageResponse(
    <OgShell eyebrow="OneBy Blog" title={post?.title ?? "OneBy"} />,
    { ...size }
  );
}
