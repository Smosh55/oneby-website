import {
  Bot,
  Voicemail,
  FileText,
  UserCheck,
  History,
  MessageSquare,
  Phone,
  Printer,
  Mic,
  Smartphone,
  CreditCard,
  ShieldCheck,
  Ticket,
  CalendarDays,
  Receipt,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

export const featureIconMap: Record<string, LucideIcon> = {
  Bot,
  Voicemail,
  FileText,
  UserCheck,
  History,
  MessageSquare,
  Phone,
  Printer,
  Mic,
  Smartphone,
  CreditCard,
  ShieldCheck,
  Ticket,
  CalendarDays,
  Receipt,
};

export function getFeatureIcon(name: string): LucideIcon {
  return featureIconMap[name] ?? Sparkles;
}
