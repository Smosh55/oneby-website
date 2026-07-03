"use client";

import { usePathname } from "next/navigation";
import { industriesBySlug, type Industry } from "@/data/industries";
import { focusedIndustrySlug } from "@/config/site";

// The industry the current view should "present as", for a tailored,
// single-industry feel. Deploy-wide focus (env) wins; otherwise it's derived
// from the route: industries live at /<slug> (and /<slug>/<city>, /<slug>/blog),
// with legacy /industries/<slug> paths still recognized during redirects.
// Returns null on general pages of the master site (home, product, pricing,
// blog, …) and on the /industries hub itself, which keep the full
// multi-industry chrome.
export function useSiteIndustry(): Industry | null {
  const pathname = usePathname() || "";
  if (focusedIndustrySlug) return industriesBySlug[focusedIndustrySlug] ?? null;
  const segs = pathname.split("/").filter(Boolean);
  const candidate = segs[0] === "industries" ? segs[1] : segs[0];
  if (candidate && industriesBySlug[candidate]) return industriesBySlug[candidate];
  return null;
}
