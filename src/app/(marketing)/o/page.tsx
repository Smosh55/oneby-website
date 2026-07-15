import type { Metadata } from "next";
import OrgHero from "@/components/OrgHero";
import LogoCloud from "@/components/LogoCloud";
import Problem from "@/components/Problem";
import OrganizedShowcase from "@/components/OrganizedShowcase";
import Stories from "@/components/Stories";
import Industries from "@/components/Industries";
import SpeaksYourTrade from "@/components/SpeaksYourTrade";
import Comparison from "@/components/Comparison";
import Features from "@/components/Features";
import Pricing from "@/components/Pricing";
import FoundersBanner from "@/components/FoundersBanner";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import StickyWaitlistCTA from "@/components/StickyWaitlistCTA";
import { HomeDemoProvider } from "@/components/HomeDemoContext";

// Organization-first A/B variant of the homepage. Middleware serves this at "/"
// for half of (non-bot) visitors. Kept out of the index and canonicalized to
// "/" so it never competes with the real homepage in search.
export const metadata: Metadata = {
  robots: { index: false, follow: true },
  alternates: { canonical: "/" },
};

export default function OrganizedVariant() {
  return (
    <HomeDemoProvider>
      <OrgHero />
      <LogoCloud />
      <Problem />
      <OrganizedShowcase />
      <Stories />
      <Industries />
      <SpeaksYourTrade />
      <Comparison />
      <Features />
      <Pricing />
      <FoundersBanner />
      <FAQ />
      <CTA />
      <StickyWaitlistCTA />
    </HomeDemoProvider>
  );
}
