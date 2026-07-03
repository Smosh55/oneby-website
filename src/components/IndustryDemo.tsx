"use client";

import { useEffect, useState } from "react";
import HeroAppMock from "./HeroAppMock";
import type { DemoData } from "@/data/demo/types";
import { hvacDemo } from "@/data/demo/hvac";
import { loadDemo } from "@/data/demo/loaders";

// Client wrapper so a Server Component can embed the demo by passing only the
// serializable `slug`. The vertical's DemoData (icon components, functions)
// lazy-loads as its own chunk here on the client — only the one dataset this
// page needs, never the whole registry.
export default function IndustryDemo({
  slug,
  compact = true,
}: {
  slug: string;
  compact?: boolean;
}) {
  const [data, setData] = useState<DemoData | null>(
    slug === "hvac" ? hvacDemo : null
  );

  useEffect(() => {
    let active = true;
    loadDemo(slug).then((d) => {
      if (active) setData(d);
    });
    return () => {
      active = false;
    };
  }, [slug]);

  if (!data) {
    // Lightweight frame while the vertical's data chunk loads.
    return (
      <div
        aria-hidden
        className="mx-auto min-h-[520px] w-full max-w-5xl animate-pulse rounded-[20px] border border-line bg-surface"
      />
    );
  }

  return <HeroAppMock key={data.slug} compact={compact} data={data} />;
}
