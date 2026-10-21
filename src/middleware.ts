import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { focusedIndustrySlug, salesFocusMode } from "@/config/site";
import { industriesBySlug } from "@/data/industries";

// Pages that stay reachable during the temporary sales-window focus mode.
// /free-year and /onboarding are the funnel; the rest are kept because the
// printed brochure and the offer's fine print link to them directly.
const FOCUS_ALLOW = new Set([
  "/free-year",
  "/onboarding",
  "/missed-call-calculator",
  "/terms",
  "/privacy",
  "/refunds",
]);

// Bots (and preview/link-unfurlers) always get the canonical homepage so the
// A/B rewrite never affects what search engines index.
const BOT_RE =
  /bot|crawl|spider|slurp|mediapartners|lighthouse|headless|facebookexternalhit|embedly|quora|pinterest|slackbot|twitter|linkedin|whatsapp|telegram|applebot|petalbot|semrush|ahrefs|yandex|baidu|duckduck|bingpreview/i;

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // TEMPORARY (see salesFocusMode in config/site.ts): the whole site funnels
  // to the in-person offer. 307 so nothing is cached as permanent; flip the
  // flag to restore every page exactly as it was.
  if (salesFocusMode) {
    if (!FOCUS_ALLOW.has(pathname)) {
      const url = req.nextUrl.clone();
      url.pathname = "/free-year";
      url.search = req.nextUrl.search; // keep utm params from ads/brochure
      return NextResponse.redirect(url, 307);
    }
    return NextResponse.next();
  }

  // Single-industry deployment: the homepage IS the industry, so the
  // /industries hub, every industry short URL, and legacy /industries/* paths
  // all redirect to the root. No A/B split runs on a focused site.
  if (focusedIndustrySlug) {
    const segs = pathname.split("/").filter(Boolean);
    const isIndustryPath =
      segs[0] === "industries" ||
      (segs[0] !== undefined && !!industriesBySlug[segs[0]]);
    if (isIndustryPath) {
      const url = req.nextUrl.clone();
      url.pathname = "/";
      return NextResponse.redirect(url, 308);
    }
    return NextResponse.next();
  }

  // Multi-industry site: 50/50 landing-page A/B split at the homepage.
  //   "ai"  -> the current homepage (Hero.tsx, AI-flow framing)
  //   "org" -> /o (OrgHero + OrganizedShowcase, organization-first framing)
  // Assignment is sticky via the ob-variant cookie so a visitor always sees the
  // same page; conversion events are tagged with the variant in lib/analytics.
  // A/B PAUSED (2026-10-21): everyone gets the new "ai" homepage hero while we
  // finalize the redesign. To restore the 50/50 split with /o, revert this
  // block to the cookie + Math.random() assignment.
  if (pathname === "/") {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  // Broad matcher (everything except api routes, Next internals, and files
  // with extensions) so focus mode can gate the whole site. The non-focus
  // logic below only acts on "/" and industry paths, so normal operation is
  // unchanged beyond the middleware running on more routes.
  matcher: ["/((?!api|_next/static|_next/image|.*\\..*).*)"],
};
