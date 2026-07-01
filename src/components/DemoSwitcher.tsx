"use client";

import { useState } from "react";
import HeroAppMock from "./HeroAppMock";
import { getIcon } from "./industry/iconMap";
import { industries } from "@/data/industries";
import { getDemo } from "@/data/demo";
import { industryAccentStyle } from "@/data/industryThemes";

// Homepage demo with an industry switcher. Picking a vertical swaps the demo's
// data and accent. HeroAppMock seeds its state from `data` on mount, so we key
// it by slug to force a fresh mount (and re-seed) on every switch.
export default function DemoSwitcher() {
  const [slug, setSlug] = useState(industries[0].slug);

  return (
    <div style={industryAccentStyle(slug)}>
      <div className="mb-6 flex flex-wrap justify-center gap-2">
        {industries.map((ind) => {
          const on = ind.slug === slug;
          const Icon = getIcon(ind.icon);
          return (
            <button
              key={ind.slug}
              type="button"
              onClick={() => setSlug(ind.slug)}
              aria-pressed={on}
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[0.82rem] font-semibold transition-colors ${
                on
                  ? "border-blue bg-blue text-white"
                  : "border-line bg-surface text-ink/70 hover:border-blue/50 hover:text-blue"
              }`}
            >
              <Icon size={14} /> {ind.shortName}
            </button>
          );
        })}
      </div>
      <HeroAppMock key={slug} compact data={getDemo(slug)} />
    </div>
  );
}
