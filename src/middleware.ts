import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { focusedIndustrySlug } from "@/config/site";
import { industriesBySlug } from "@/data/industries";

// On a single-industry deployment, the homepage IS the industry, so the
// /industries hub, every industry short URL (/<slug>, /<slug>/<city>,
// /<slug>/blog), and legacy /industries/* paths all redirect to the root.
export function middleware(req: NextRequest) {
  if (!focusedIndustrySlug) return NextResponse.next();

  const segs = req.nextUrl.pathname.split("/").filter(Boolean);
  const isIndustryPath =
    segs[0] === "industries" || (segs[0] !== undefined && !!industriesBySlug[segs[0]]);

  if (isIndustryPath) {
    // Clone so query strings (utm_*, gclid, …) survive the redirect.
    const url = req.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url, 308);
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/industries/:path*",
    "/:slug(hvac|plumbing|electricians|roofing|restoration|garage-door|pest-control|property-management|msp-it|law-firms|medical-offices|dental|barber|landscaping)/:path*",
  ],
};
