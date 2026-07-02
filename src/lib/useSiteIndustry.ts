"use client";

import { usePathname } from "next/navigation";
import { industriesBySlug, type Industry } from "@/data/industries";
import { focusedIndustrySlug } from "@/config/site";

// The industry the current view should "present as", for a tailored,
// single-industry feel. Deploy-wide focus (env) wins; otherwise it's derived
// from an /industries/<slug> (or /industries/<slug>/<city>) route. Returns null
// on general pages of the master site (home, product, pricing, blog, …) and on
// the /industries hub itself, which keep the full multi-industry chrome.
export function useSiteIndustry(): Industry | null {
  const pathname = usePathname() || "";
  if (focusedIndustrySlug) return industriesBySlug[focusedIndustrySlug] ?? null;
  const m = pathname.match(/^\/industries\/([^/]+)/);
  if (m && industriesBySlug[m[1]]) return industriesBySlug[m[1]];
  return null;
}
