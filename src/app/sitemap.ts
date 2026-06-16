import type { MetadataRoute } from "next";
import { industries } from "@/data/industries";
import { comparisons } from "@/data/comparisons";
import { features } from "@/data/features";
import { getAllPosts } from "@/lib/blog";

const BASE = "https://oneby.ai";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/product`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/pricing`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/industries`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/compare`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/blog`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/about`, changeFrequency: "monthly", priority: 0.5 },
  ];

  const featureRoutes: MetadataRoute.Sitemap = features.map((f) => ({
    url: `${BASE}/features/${f.slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const industryRoutes: MetadataRoute.Sitemap = industries.map((i) => ({
    url: `${BASE}/industries/${i.slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const compareRoutes: MetadataRoute.Sitemap = comparisons.map((c) => ({
    url: `${BASE}/compare/${c.slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const postRoutes: MetadataRoute.Sitemap = getAllPosts().map((p) => ({
    url: `${BASE}/blog/${p.slug}`,
    lastModified: new Date(`${p.date}T00:00:00Z`),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [
    ...staticRoutes,
    ...featureRoutes,
    ...industryRoutes,
    ...compareRoutes,
    ...postRoutes,
  ];
}
