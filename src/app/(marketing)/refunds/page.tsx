import type { Metadata } from "next";
import { legalDocs } from "@/data/legal";
import LegalDoc from "@/components/LegalDoc";

export const metadata: Metadata = {
  title: "Refund & Subscription Policy",
  description:
    "How billing, renewals, refunds, equipment returns, and related fees work at OneBy.",
  alternates: { canonical: "/refunds" },
};

export default function RefundsPage() {
  return <LegalDoc doc={legalDocs.refunds} />;
}
