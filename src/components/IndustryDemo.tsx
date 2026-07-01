"use client";

import HeroAppMock from "./HeroAppMock";
import { getDemo } from "@/data/demo";

// Client wrapper so a Server Component (IndustryLanding) can embed the demo by
// passing only the serializable `slug`. getDemo resolves the DemoData (which
// holds icon components and functions) here on the client, never across the
// server→client boundary.
export default function IndustryDemo({ slug }: { slug: string }) {
  return <HeroAppMock compact data={getDemo(slug)} />;
}
