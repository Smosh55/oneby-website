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
  MessageSquareReply,
  Workflow,
  Layers,
  Tags,
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
  MessageSquareReply,
  Workflow,
  Layers,
  Tags,
};

export function getFeatureIcon(name: string): LucideIcon {
  return featureIconMap[name] ?? Sparkles;
}
