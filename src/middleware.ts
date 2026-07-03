import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { focusedIndustrySlug } from "@/config/site";

// On a single-industry deployment, the homepage IS the industry, so the
// /industries hub and every /industries/* page (including other verticals)
// redirect to the root. The industry's own content already lives at "/".
export function middleware(req: NextRequest) {
  if (!focusedIndustrySlug) return NextResponse.next();
  if (req.nextUrl.pathname.startsWith("/industries")) {
    // Clone so query strings (utm_*, gclid, …) survive the redirect.
    const url = req.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url, 308);
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/industries/:path*",
};
