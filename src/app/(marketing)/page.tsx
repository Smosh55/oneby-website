import type { Metadata } from "next";
import Hero from "@/components/Hero";
import LogoCloud from "@/components/LogoCloud";
import Problem from "@/components/Problem";
import Solution from "@/components/Solution";
import HearItWork from "@/components/HearItWork";
import Stories from "@/components/Stories";
import Industries from "@/components/Industries";
import Comparison from "@/components/Comparison";
import Features from "@/components/Features";
import Pricing from "@/components/Pricing";
import FoundersBanner from "@/components/FoundersBanner";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import IndustryLanding from "@/components/industry/IndustryLanding";
import { focusedIndustry } from "@/config/site";
import { getPostsForIndustry } from "@/lib/blog";

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
        relatedPosts={getPostsForIndustry(focus.slug)}
        asHome
      />
    );
  }

  return (
    <>
      <Hero />
      <LogoCloud />
      <Problem />
      <Solution />
      <HearItWork />
      <Stories />
      <Industries />
      <Comparison />
      <Features />
      <Pricing />
      <FoundersBanner />
      <FAQ />
      <CTA />
    </>
  );
}
