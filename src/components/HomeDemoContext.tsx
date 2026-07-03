"use client";

import { createContext, useContext, useState } from "react";
import type { DemoData } from "@/data/demo/types";
import { hvacDemo } from "@/data/demo/hvac";

type HomeDemo = { data: DemoData; setData: (d: DemoData) => void };

const HomeDemoContext = createContext<HomeDemo | null>(null);

// Shares the homepage demo's selected industry between the hero switcher and
// the HearItWork section further down the page. Server-rendered sections pass
// straight through as children.
export function HomeDemoProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<DemoData>(hvacDemo);
  return (
    <HomeDemoContext.Provider value={{ data, setData }}>
      {children}
    </HomeDemoContext.Provider>
  );
}

export function useHomeDemo(): HomeDemo | null {
  return useContext(HomeDemoContext);
}
