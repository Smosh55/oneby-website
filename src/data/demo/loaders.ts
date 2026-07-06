import type { DemoData } from "./types";
import { hvacDemo } from "./hvac";

// Client-side, per-slug dynamic imports so each vertical's demo data becomes
// its own chunk instead of shipping all 11 datasets in every bundle. HVAC is
// the eager default (HeroAppMock's fallback); the rest load on demand. Server
// code should keep using getDemo() from ./index — it never hits the client
// bundle from a Server Component.
const loaders: Record<string, () => Promise<DemoData>> = {
  plumbing: () => import("./plumbing").then((m) => m.plumbingDemo),
  electricians: () => import("./electricians").then((m) => m.electriciansDemo),
  roofing: () => import("./roofing").then((m) => m.roofingDemo),
  restoration: () => import("./restoration").then((m) => m.restorationDemo),
  "garage-door": () => import("./garage-door").then((m) => m.garageDoorDemo),
  "pest-control": () => import("./pest-control").then((m) => m.pestControlDemo),
  "property-management": () =>
    import("./property-management").then((m) => m.propertyManagementDemo),
  "msp-it": () => import("./msp-it").then((m) => m.mspItDemo),
  "law-firms": () => import("./law-firms").then((m) => m.lawFirmsDemo),
  "medical-offices": () =>
    import("./medical-offices").then((m) => m.medicalOfficesDemo),
  dental: () => import("./dental").then((m) => m.dentalDemo),
  barber: () => import("./barber").then((m) => m.barberDemo),
  landscaping: () => import("./landscaping").then((m) => m.landscapingDemo),
};

export function loadDemo(slug?: string): Promise<DemoData> {
  const load = slug ? loaders[slug] : undefined;
  return load ? load() : Promise.resolve(hvacDemo);
}
