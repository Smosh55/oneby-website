import {
  Wind,
  Droplets,
  Zap,
  Home,
  Waves,
  DoorOpen,
  Bug,
  Building2,
  Server,
  Scale,
  Stethoscope,
  Smile,
  Scissors,
  Sprout,
  Wrench,
  type LucideIcon,
} from "lucide-react";

// Maps the `icon` string in src/data/industries.ts to a lucide component.
export const iconMap: Record<string, LucideIcon> = {
  Wind,
  Droplets,
  Zap,
  Home,
  Waves,
  DoorOpen,
  Bug,
  Building2,
  Server,
  Scale,
  Stethoscope,
  Smile,
  Scissors,
  Sprout,
  Wrench,
};

export function getIcon(name: string): LucideIcon {
  return iconMap[name] ?? Wrench;
}
