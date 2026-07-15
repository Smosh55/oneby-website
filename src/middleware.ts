import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { focusedIndustrySlug } from "@/config/site";
import { industriesBySlug } from "@/data/industries";

// Bots (and preview/link-unfurlers) always get the canonical homepage so the
// A/B rewrite never affects what search engines index.
const BOT_RE =
  /bot|crawl|spider|slurp|mediapartners|lighthouse|headless|facebookexternalhit|embedly|quora|pinterest|slackbot|twitter|linkedin|whatsapp|telegram|applebot|petalbot|semrush|ahrefs|yandex|baidu|duckduck|bingpreview/i;

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

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
  if (pathname === "/") {
    const ua = req.headers.get("user-agent") ?? "";
    if (BOT_RE.test(ua)) return NextResponse.next();

    const existing = req.cookies.get("ob-variant")?.value;
    const variant =
      existing === "ai" || existing === "org"
        ? existing
        : Math.random() < 0.5
          ? "ai"
          : "org";

    const res =
      variant === "org"
        ? NextResponse.rewrite(new URL("/o", req.url))
        : NextResponse.next();

    if (existing !== variant) {
      res.cookies.set("ob-variant", variant, {
        path: "/",
        maxAge: 60 * 60 * 24 * 60, // 60 days
        sameSite: "lax",
        httpOnly: false, // readable client-side so track() can tag events
      });
    }
    return res;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/industries/:path*",
    "/:slug(hvac|plumbing|electricians|roofing|restoration|garage-door|pest-control|property-management|msp-it|law-firms|medical-offices|dental|barber|landscaping)/:path*",
  ],
};
