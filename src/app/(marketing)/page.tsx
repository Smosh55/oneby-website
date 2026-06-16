import Hero from "@/components/Hero";
import LogoCloud from "@/components/LogoCloud";
import Problem from "@/components/Problem";
import Solution from "@/components/Solution";
import HowItWorks from "@/components/HowItWorks";
import Features from "@/components/Features";
import ReceptionistDemo from "@/components/ReceptionistDemo";
import Stories from "@/components/Stories";
import Industries from "@/components/Industries";
import Comparison from "@/components/Comparison";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <LogoCloud />
      <Problem />
      <Solution />
      <HowItWorks />
      <Features />
      <ReceptionistDemo />
      <Stories />
      <Industries />
      <Comparison />
      <Pricing />
      <FAQ />
      <CTA />
    </>
  );
}
