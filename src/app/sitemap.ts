import type { MetadataRoute } from "next";
import { industries } from "@/data/industries";
import { comparisons } from "@/data/comparisons";
import { features } from "@/data/features";
import { templates } from "@/data/templates";
import { cities } from "@/data/locations";
import { getAllPosts } from "@/lib/blog";
import {
  focusedIndustrySlug,
  crmFirst,
  parkedPaths,
  parkedFeatureSlugs,
} from "@/config/site";

// Per-deployment base so focused (single-industry) domains emit their own URLs.
const BASE = process.env.NEXT_PUBLIC_SITE_URL || "https://oneby.ai";

export default function sitemap(): MetadataRoute.Sitemap {
  // CRM-first mode: the sitemap presents OneBy purely as a CRM. Parked AI /
  // answering pages, the parked AI feature slugs, and (since they're AI-framed
  // trade landers for now) the industry + city pages are all left out.
  const staticRoutesRaw: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/product`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/voip-crm`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/ai-receptionist`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/missed-call-calculator`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/free-invoicing`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/low-voltage`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/looped`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/templates`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/pricing`, changeFrequency: "monthly", priority: 0.9 },
    // The /industries hub is only part of the multi-industry master site, and
    // is dropped entirely in CRM-first mode.
    ...(focusedIndustrySlug || crmFirst
      ? []
      : [{ url: `${BASE}/industries`, changeFrequency: "monthly" as const, priority: 0.8 }]),
    { url: `${BASE}/compare`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/founders`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/blog`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/about`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/contact`, changeFrequency: "yearly", priority: 0.5 },
    { url: `${BASE}/careers`, changeFrequency: "monthly", priority: 0.4 },
    { url: `${BASE}/terms`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE}/privacy`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE}/refunds`, changeFrequency: "yearly", priority: 0.3 },
  ];
  const staticRoutes = staticRoutesRaw.filter(
    (r) => !parkedPaths.has(r.url.replace(BASE, ""))
  );

  const featureRoutes: MetadataRoute.Sitemap = features
    .filter((f) => !(crmFirst && parkedFeatureSlugs.has(f.slug)))
    .map((f) => ({
      url: `${BASE}/features/${f.slug}`,
      changeFrequency: "monthly",
      priority: 0.7,
    }));

  const templateRoutes: MetadataRoute.Sitemap = templates.map((t) => ({
    url: `${BASE}/templates/${t.slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // On a focused deployment the industry lives at the root and every
  // /industries/* URL redirects there; in CRM-first mode the trade landers are
  // AI-framed, so none are listed in the sitemap either way.
  const hideIndustry = focusedIndustrySlug || crmFirst;
  const industryRoutes: MetadataRoute.Sitemap = hideIndustry
    ? []
    : industries.map((i) => ({
        url: `${BASE}/${i.slug}`,
        changeFrequency: "monthly",
        priority: 0.7,
      }));

  const localRoutes: MetadataRoute.Sitemap = hideIndustry
    ? []
    : industries.flatMap((i) =>
        cities.map((c) => ({
          url: `${BASE}/${i.slug}/${c.slug}`,
          changeFrequency: "monthly" as const,
          priority: 0.5,
        }))
      );

  // Per-industry blog hubs (master site only; redirected in focused mode).
  const hubRoutes: MetadataRoute.Sitemap = hideIndustry
    ? []
    : industries.map((i) => ({
        url: `${BASE}/${i.slug}/blog`,
        changeFrequency: "weekly" as const,
        priority: 0.6,
      }));

  const compareRoutes: MetadataRoute.Sitemap = comparisons.map((c) => ({
    url: `${BASE}/compare/${c.slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // On a focused deployment only the trade's own + general posts are served.
  const postRoutes: MetadataRoute.Sitemap = getAllPosts()
    .filter(
      (p) => !focusedIndustrySlug || p.industry === focusedIndustrySlug || !p.industry
    )
    .map((p) => ({
      url: `${BASE}/blog/${p.slug}`,
      lastModified: new Date(`${p.date}T00:00:00Z`),
      changeFrequency: "monthly",
      priority: 0.6,
    }));

  return [
    ...staticRoutes,
    ...featureRoutes,
    ...templateRoutes,
    ...industryRoutes,
    ...localRoutes,
    ...hubRoutes,
    ...compareRoutes,
    ...postRoutes,
  ];
}
