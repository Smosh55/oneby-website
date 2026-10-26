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

// CRM-first mode. The public site leads with the CRM (jobs, scheduling,
// invoicing, customers) and the open MCP connector. The AI answering-service /
// agentic-automation pages aren't part of the story yet, so they're PARKED:
// their files stay on disk untouched, but middleware rewrites them to a
// "Shipping January 2027" coming-soon screen, and they're dropped from the
// nav, footer, and sitemap (and never indexed). Flip to false to restore the
// full AI-first site exactly as it was.
export const crmFirst = true;

// Standalone AI/answering landing pages parked in CRM-first mode.
export const parkedPaths: ReadonlySet<string> = new Set([
  "/ai-receptionist",
  "/missed-call-calculator",
  "/looped",
  "/voip-crm",
]);

// Feature deep-dive slugs parked in CRM-first mode (the AI & answering ones).
// Everything else in data/features.ts stays live as CRM capability pages.
export const parkedFeatureSlugs: ReadonlySet<string> = new Set([
  "ai-receptionist",
  "ai-voicemail-replacement",
  "missed-call-text-back",
  "smart-summaries",
  "honest-ai",
  "task-automation",
  "automations",
  "call-recording",
]);

// True when a given path is parked (coming-soon) under CRM-first mode.
export function isParkedPath(pathname: string): boolean {
  if (!crmFirst) return false;
  if (parkedPaths.has(pathname)) return true;
  const m = pathname.match(/^\/features\/([^/]+)\/?$/);
  if (m && parkedFeatureSlugs.has(m[1])) return true;
  return false;
}
