import type { Metadata } from "next";
import { legalDocs } from "@/data/legal";
import LegalDoc from "@/components/LegalDoc";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "The terms governing your use of OneBy's website, software, and services.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return <LegalDoc doc={legalDocs.terms} />;
}
