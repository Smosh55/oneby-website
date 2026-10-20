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

// Launch state. The product is live now in invite-only early access; full
// public launch is targeted for January 2027. Components read from here so the
// phase and date are set in one place instead of scattered across the site.
export const launch = {
  phase: "invite-only" as "invite-only" | "public",
  // Short label for badges/chips.
  statusLabel: "Invite-only early access",
  // When general availability opens.
  publicLaunch: "January 2027",
} as const;

// Sales-window focus mode: while true, the middleware redirects the whole
// site to the in-person offer funnel (only /free-year, /onboarding, legal
// pages, and the calculator render). Used Aug 10-11, 2026, then reverted in
// favor of keeping the full site up alongside the offer pages.
export const salesFocusMode = false;
