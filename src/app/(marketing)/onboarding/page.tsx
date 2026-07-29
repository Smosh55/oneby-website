import type { Metadata } from "next";
import { CalendarCheck2 } from "lucide-react";
import OnboardingScheduler from "@/components/OnboardingScheduler";

// The onboarding slot picker for free-year customers. Part of the in-person
// flow (linked from /free-year), so like that page it stays out of the index,
// the sitemap, and the footer.
export const metadata: Metadata = {
  title: "Book Your OneBy Onboarding",
  description:
    "Pick a day and time for your OneBy onboarding call. Twenty minutes by phone: we port your number, set up your lines, and you're running.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/onboarding" },
};

export default function OnboardingPage() {
  return (
    <section className="relative overflow-hidden pt-28 pb-20 lg:pt-32">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-[460px] w-[920px] rounded-full bg-[radial-gradient(closest-side,rgba(0,143,224,0.13),transparent)]" />
      </div>
      <div className="container-x max-w-3xl text-center">
        <span className="eyebrow justify-center rounded-full border border-blue/20 bg-blue/5 px-3 py-1.5">
          <CalendarCheck2 size={14} /> Book your onboarding
        </span>
        <h1 className="mt-5 text-[2.2rem] font-extrabold leading-[1.1] tracking-tight text-navy sm:text-5xl">
          Pick a time. We handle the rest.
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-muted">
          Twenty minutes by phone. We start your number port, set up your
          lines, and you leave the call running on OneBy. Your free year starts
          the day your number goes live.
        </p>
        <div className="mt-9">
          <OnboardingScheduler />
        </div>
      </div>
    </section>
  );
}
