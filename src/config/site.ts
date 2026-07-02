import { industriesBySlug, type Industry } from "@/data/industries";

// Set NEXT_PUBLIC_SITE_INDUSTRY to an industry slug (e.g. "hvac") to turn this
// deployment into a dedicated single-industry site: the homepage becomes that
// industry, every other industry is hidden from nav/footer/sitemap, and other
// /industries/* URLs redirect to the root. Leave unset (or "all") for the full
// multi-industry OneBy site.
const raw = process.env.NEXT_PUBLIC_SITE_INDUSTRY?.trim().toLowerCase();

export const focusedIndustrySlug: string | null =
  raw && raw !== "all" && industriesBySlug[raw] ? raw : null;

export const isFocusedSite = focusedIndustrySlug !== null;

export function focusedIndustry(): Industry | null {
  return focusedIndustrySlug ? industriesBySlug[focusedIndustrySlug] : null;
}
