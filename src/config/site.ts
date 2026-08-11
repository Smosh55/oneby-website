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

// TEMPORARY sales-window focus mode (enabled July 29, 2026, intended for
// ~48-72 hours; revert by flipping to false). While true, the middleware
// redirects the whole site to the in-person offer funnel: only /free-year and
// /onboarding render (plus legal pages and the calculator, because the printed
// brochure links them). Flip to false to restore the full site.
export const salesFocusMode = true;
