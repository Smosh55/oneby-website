import type { DemoData } from "./types";
import { hvacDemo } from "./hvac";
import { plumbingDemo } from "./plumbing";
import { electriciansDemo } from "./electricians";
import { roofingDemo } from "./roofing";
import { restorationDemo } from "./restoration";
import { garageDoorDemo } from "./garage-door";
import { pestControlDemo } from "./pest-control";
import { propertyManagementDemo } from "./property-management";
import { mspItDemo } from "./msp-it";
import { lawFirmsDemo } from "./law-firms";
import { medicalOfficesDemo } from "./medical-offices";

export const demoBySlug: Record<string, DemoData> = {
  hvac: hvacDemo,
  plumbing: plumbingDemo,
  electricians: electriciansDemo,
  roofing: roofingDemo,
  restoration: restorationDemo,
  "garage-door": garageDoorDemo,
  "pest-control": pestControlDemo,
  "property-management": propertyManagementDemo,
  "msp-it": mspItDemo,
  "law-firms": lawFirmsDemo,
  "medical-offices": medicalOfficesDemo,
};

export function getDemo(slug?: string): DemoData {
  return (slug && demoBySlug[slug]) || hvacDemo;
}
