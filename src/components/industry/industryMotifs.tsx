import type { ReactNode } from "react";

// Decorative per-industry line motifs, drawn in a 0 0 200 200 space with
// stroke="currentColor" so they inherit the accent color. Rendered large and
// soft in the hero background by IndustryHeroArt. Purely decorative.
export const motifBySlug: Record<string, ReactNode> = {
  hvac: (
    <g stroke="currentColor" strokeWidth={3} strokeLinecap="round" fill="none">
      <path d="M20 66 H118 a18 18 0 1 0 -18 -18" />
      <path d="M20 104 H150 a16 16 0 1 1 -16 16" />
      <path d="M20 142 H108 a15 15 0 1 0 -15 -15" />
    </g>
  ),
  plumbing: (
    <g stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" fill="none">
      <path d="M34 44 v38 a20 20 0 0 0 20 20 h58 a20 20 0 0 1 20 20 v32" />
      <rect x="22" y="30" width="26" height="26" rx="5" />
      <rect x="119" y="150" width="26" height="26" rx="5" />
    </g>
  ),
  electricians: (
    <g stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" fill="none">
      <path d="M112 22 L68 104 H100 L82 178 L150 82 H114 L138 22 Z" />
    </g>
  ),
  roofing: (
    <g stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" fill="none">
      <path d="M18 112 L100 42 L182 112" />
      <path d="M42 112 L100 62 L158 112" />
      <path d="M58 132 h84 M48 150 h104" opacity={0.55} />
    </g>
  ),
  restoration: (
    <g stroke="currentColor" strokeWidth={3} strokeLinecap="round" fill="none">
      <path d="M18 124 q20 -18 40 0 t40 0 t40 0 t40 0" />
      <path d="M18 152 q20 -18 40 0 t40 0 t40 0 t40 0" opacity={0.55} />
      <path d="M100 34 q20 28 20 46 a20 20 0 1 1 -40 0 q0 -18 20 -46 z" />
    </g>
  ),
  "garage-door": (
    <g stroke="currentColor" strokeWidth={3} strokeLinejoin="round" fill="none">
      <rect x="28" y="40" width="144" height="122" rx="5" />
      <path d="M28 72 h144 M28 102 h144 M28 132 h144" opacity={0.6} />
    </g>
  ),
  "pest-control": (
    <g stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" fill="none">
      <path d="M100 24 L162 46 V96 a62 74 0 0 1 -62 74 a62 74 0 0 1 -62 -74 V46 Z" />
      <ellipse cx="100" cy="96" rx="16" ry="24" />
      <path d="M100 72 v-14 M84 84 l-18 -10 M116 84 l18 -10 M84 108 l-18 10 M116 108 l18 10" />
    </g>
  ),
  "property-management": (
    <g stroke="currentColor" strokeWidth={3} strokeLinejoin="round" fill="none">
      <rect x="56" y="28" width="88" height="142" rx="5" />
      <path d="M74 52 h12 M114 52 h12 M74 82 h12 M114 82 h12 M74 112 h12 M114 112 h12" />
      <path d="M92 148 h16 v22 h-16 z" />
    </g>
  ),
  "msp-it": (
    <g stroke="currentColor" strokeWidth={3} strokeLinejoin="round" fill="none">
      <rect x="46" y="34" width="108" height="34" rx="5" />
      <rect x="46" y="83" width="108" height="34" rx="5" />
      <rect x="46" y="132" width="108" height="34" rx="5" />
      <circle cx="64" cy="51" r="3.2" fill="currentColor" stroke="none" />
      <circle cx="64" cy="100" r="3.2" fill="currentColor" stroke="none" />
      <circle cx="64" cy="149" r="3.2" fill="currentColor" stroke="none" />
    </g>
  ),
  "law-firms": (
    <g stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" fill="none">
      <path d="M100 28 v134 M68 168 h64" />
      <path d="M38 56 h124" />
      <path d="M58 54 l-24 44 h48 z M142 54 l-24 44 h48 z" />
    </g>
  ),
  "medical-offices": (
    <g stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" fill="none">
      <path d="M16 118 h38 l14 -36 l22 72 l16 -46 l12 22 h48" />
      <path d="M150 38 h24 v20 h20 v24 h-20 v20 h-24 v-20 h-20 v-24 h20 z" opacity={0.5} />
    </g>
  ),
  dental: (
    <g stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" fill="none">
      <path d="M78 40 C56 40 47 62 51 96 C54 122 64 156 73 156 C82 156 84 120 100 120 C116 120 118 156 127 156 C136 156 146 122 149 96 C153 62 144 40 122 40 C110 40 107 50 100 50 C93 50 90 40 78 40 Z" />
      <path d="M74 70 q10 10 26 8" opacity={0.5} />
    </g>
  ),
  barber: (
    <g stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" fill="none">
      <rect x="84" y="42" width="32" height="116" rx="16" />
      <path d="M84 66 L116 50 M84 92 L116 76 M84 118 L116 102 M84 144 L116 128" opacity={0.7} />
      <path d="M92 42 v-12 h16 v12 M92 158 v12 h16 v-12" />
    </g>
  ),
  landscaping: (
    <g stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" fill="none">
      <path d="M100 38 C60 60 52 120 100 170 C148 120 140 60 100 38 Z" />
      <path d="M100 52 V162" />
      <path d="M100 90 L74 76 M100 90 L126 76 M100 118 L72 102 M100 118 L128 102" opacity={0.6} />
    </g>
  ),
};
