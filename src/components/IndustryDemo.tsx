"use client";

import HeroAppMock from "./HeroAppMock";
import { getDemo } from "@/data/demo";

// Client wrapper so a Server Component can embed the demo by passing only the
// serializable `slug`. getDemo resolves the DemoData (which holds icon
// components and functions) here on the client, never across the server→client
// boundary.
export default function IndustryDemo({
  slug,
  compact = true,
}: {
  slug: string;
  compact?: boolean;
}) {
  return <HeroAppMock compact={compact} data={getDemo(slug)} />;
}
