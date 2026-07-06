// Per-vertical accent colors. Each mini-site overrides the global --color-blue
// accent (and its darker hover shades) with these, so every industry reads as
// its own sub-brand while keeping the shared navy/green system. Applied via a
// CSS-variable wrapper in IndustryLanding (see industryAccentStyle).
import type { CSSProperties } from "react";

export type Accent = { base: string; dark: string };

// Keyed by industry slug. HVAC keeps the house brand blue.
export const accentBySlug: Record<string, Accent> = {
  hvac: { base: "#008fe0", dark: "#007acc" },
  plumbing: { base: "#0891b2", dark: "#0e7490" },
  electricians: { base: "#d9730b", dark: "#b45309" },
  roofing: { base: "#c2492b", dark: "#a13a20" },
  restoration: { base: "#0d9488", dark: "#0f766e" },
  "garage-door": { base: "#3b6fd4", dark: "#2f59ab" },
  "pest-control": { base: "#2f9e44", dark: "#26833a" },
  "property-management": { base: "#5b54d6", dark: "#453fb0" },
  "msp-it": { base: "#0ea5e9", dark: "#0284c7" },
  "law-firms": { base: "#a3324d", dark: "#872943" },
  "medical-offices": { base: "#0e9db0", dark: "#0b7f8e" },
  dental: { base: "#00a5b5", dark: "#00838f" },
  barber: { base: "#2f4a7a", dark: "#243a61" },
  landscaping: { base: "#4d7c0f", dark: "#3f6608" },
};

const DEFAULT: Accent = { base: "#008fe0", dark: "#007acc" };

export function getAccent(slug?: string): Accent {
  return (slug && accentBySlug[slug]) || DEFAULT;
}

// "#008fe0" -> "0, 143, 224" for use inside rgba(var(--accent-rgb), <alpha>).
function hexToRgbChannels(hex: string): string {
  const h = hex.replace("#", "");
  const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  const n = parseInt(full, 16);
  return `${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}`;
}

// Inline style that re-points the blue accent CSS variables for a subtree.
// Tailwind v4 utilities (text-blue, bg-blue/10, border-blue…) resolve
// var(--color-blue) at use-site, so overriding it here recolors the whole tree.
// --accent-rgb feeds the hero's radial-gradient glow so it matches too.
export function industryAccentStyle(slug?: string): CSSProperties {
  const a = getAccent(slug);
  return {
    ["--color-blue" as string]: a.base,
    ["--color-blue-600" as string]: a.dark,
    ["--color-blue-700" as string]: a.dark,
    ["--accent-rgb" as string]: hexToRgbChannels(a.base),
  } as CSSProperties;
}
