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
// CRM-first homepage sections
import HeroCrm from "@/components/crm/HeroCrm";
import CrmShowcase from "@/components/crm/CrmShowcase";
import ProductTour from "@/components/crm/ProductTour";
import McpSection from "@/components/crm/McpSection";
import CrmComparison from "@/components/crm/CrmComparison";
import CrmPricing from "@/components/crm/CrmPricing";
import CrmCTA from "@/components/crm/CrmCTA";
import { focusedIndustry, crmFirst } from "@/config/site";
import { getPostsForIndustry } from "@/lib/blog";
import { homeFaqs } from "@/data/homeFaqs";
import { crmFaqs } from "@/data/crmFaqs";
import { jsonLd as serializeJsonLd } from "@/lib/jsonld";

export function generateMetadata(): Metadata {
  const focus = focusedIndustry();
  if (focus) {
    return {
      title: focus.metaTitle,
      description: focus.metaDescription,
      keywords: focus.keywords,
      alternates: { canonical: "/" },
    };
  }
  if (crmFirst) {
    return {
      title: "OneBy — Run your whole team and all your work in one place",
      description:
        "One platform for your whole team to manage customers, projects, scheduling, and invoicing, for any business in any industry. $15 per user, every feature included, with complimentary onboarding and a dedicated account rep.",
      keywords: [
        "CRM",
        "team management software",
        "sales CRM",
        "business management platform",
        "Jobber alternative",
        "Housecall Pro alternative",
      ],
      alternates: { canonical: "/" },
    };
  }
  return {};
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

  const faqs = crmFirst ? crmFaqs : homeFaqs;
  const homeJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  // CRM-first homepage: lead with the CRM + the open MCP connector, position
  // against Jobber / Housecall Pro. The AI answering story is parked.
  if (crmFirst) {
    return (
      <>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(homeJsonLd) }}
        />
        <HeroCrm />
        <CrmShowcase />
        <ProductTour />
        <McpSection />
        <CrmComparison />
        <CrmPricing />
        <FAQ
          faqs={crmFaqs}
          blurb="Still weighing it against Jobber or Housecall Pro? Book a 20-minute demo and we'll walk your exact workflow."
        />
        <CrmCTA />
        <StickyWaitlistCTA />
      </>
    );
  }

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
