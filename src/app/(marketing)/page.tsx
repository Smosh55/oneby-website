import type { Metadata } from "next";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import Solution from "@/components/Solution";
import HearItWork from "@/components/HearItWork";
import Industries from "@/components/Industries";
import SpeaksYourTrade from "@/components/SpeaksYourTrade";
import Comparison from "@/components/Comparison";
import Features from "@/components/Features";
import Pricing from "@/components/Pricing";
import FoundersBanner from "@/components/FoundersBanner";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import IndustryLanding from "@/components/industry/IndustryLanding";
import StickyWaitlistCTA from "@/components/StickyWaitlistCTA";
import { HomeDemoProvider } from "@/components/HomeDemoContext";
import { focusedIndustry } from "@/config/site";
import { getPostsForIndustry } from "@/lib/blog";
import { homeFaqs } from "@/data/homeFaqs";
import { jsonLd as serializeJsonLd } from "@/lib/jsonld";

export function generateMetadata(): Metadata {
  const focus = focusedIndustry();
  if (!focus) return {};
  return {
    title: focus.metaTitle,
    description: focus.metaDescription,
    keywords: focus.keywords,
    alternates: { canonical: "/" },
  };
}

export default function Home() {
  // Single-industry deployment: the homepage IS that industry.
  const focus = focusedIndustry();
  if (focus) {
    return (
      <IndustryLanding
        industry={focus}
        relatedPosts={getPostsForIndustry(focus.slug, 6, false)}
        asHome
      />
    );
  }

  const homeJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: homeFaqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(homeJsonLd) }}
      />
      <HomeDemoProvider>
        <Hero />
        {/* LogoCloud and Stories removed: fabricated "trusted by" logos and
            customer testimonials. Restore with real proof once we have
            permissioned founding-customer quotes/logos. */}
        <Problem />
        <Solution />
        <HearItWork />
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
    </>
  );
}
