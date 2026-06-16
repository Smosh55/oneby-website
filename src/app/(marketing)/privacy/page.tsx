import type { Metadata } from "next";
import { legalDocs } from "@/data/legal";
import LegalDoc from "@/components/LegalDoc";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How OneBy collects, uses, and protects your personal data, including voice and AI processing.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return <LegalDoc doc={legalDocs.privacy} />;
}
