import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { featureGroups } from "@/data/features";
import { getFeatureIcon } from "@/components/feature/iconMap";
import Reveal from "@/components/Reveal";
import HeroAppMock from "@/components/HeroAppMock";
import IndustryDemo from "@/components/IndustryDemo";
import { focusedIndustry } from "@/config/site";
import { industryAccentStyle } from "@/data/industryThemes";

export function generateMetadata(): Metadata {
  const focus = focusedIndustry();
  if (focus) {
    return {
      title: `The all-in-one platform for ${focus.name}`,
      description: focus.metaDescription,
      alternates: { canonical: "/product" },
    };
  }
  return {
    title: "Product: The All-in-One CRM for Service Businesses",
    description:
      "OneBy answers every call, then turns it into a ticket, a scheduled job, an invoice, and a text, all in one place. A built-in phone system plus an AI layer that runs the whole job from first ring to paid.",
    alternates: { canonical: "/product" },
  };
}

export default function ProductHub() {
  const focus = focusedIndustry();
  return (
    <div style={focus ? industryAccentStyle(focus.slug) : undefined}>
      <section className="relative overflow-hidden pt-28 pb-12 lg:pt-32">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-[460px] w-[900px] rounded-full bg-[radial-gradient(closest-side,rgba(0,143,224,0.13),transparent)]" />
        </div>
        <div className="container-x text-center">
          <span className="eyebrow rounded-full border border-blue/20 bg-blue/5 px-3 py-1.5">
            {focus ? `Built for ${focus.shortName}` : "The platform"}
          </span>
          <h1 className="mx-auto mt-5 max-w-3xl text-[2.3rem] font-extrabold leading-[1.08] tracking-tight text-navy sm:text-[3.25rem]">
            {focus
              ? `Run your whole ${focus.shortName.toLowerCase()} business on one platform.`
              : "Every call answered. Every job run. One platform."}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            A built-in business phone system, calling, desk phones, and SMS,
            comes standard, so you can retire the old PBX. Then the AI turns
            every call into a summary and an assigned task, and the job moves
            from ticket to schedule to invoice without leaving the platform.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/demo" className="btn btn-primary text-base">
              Book a demo <ArrowRight size={18} />
            </Link>
            <Link href="/pricing" className="btn btn-ghost text-base">
              See pricing
            </Link>
          </div>
        </div>
      </section>

      {/* Interactive workspace tour (full) */}
      <section className="pb-10 pt-4">
        <div className="container-x">
          <Reveal className="mx-auto mb-10 max-w-2xl text-center">
            <span className="eyebrow justify-center text-blue">Live demo</span>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-navy sm:text-3xl">
              Click through the whole workspace.
            </h2>
            <p className="mt-3 text-muted">
              Every module, the way your team would use it: answer a call, ticket
              it, schedule it, bill it, and more.
            </p>
          </Reveal>
          {focus ? <IndustryDemo slug={focus.slug} compact={false} /> : <HeroAppMock />}
        </div>
      </section>

      {featureGroups.map((grp) => (
        <section key={grp.group} className="py-10">
          <div className="container-x">
            <div className="mb-7 flex items-center gap-3">
              <h2 className="text-xl font-bold tracking-tight text-navy">
                {grp.group}
              </h2>
              <span className="h-px flex-1 bg-line" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {grp.items.map((f, i) => {
                const Icon = getFeatureIcon(f.icon);
                return (
                  <Reveal key={f.slug} delay={(i % 3) * 60}>
                    <Link
                      href={`/features/${f.slug}`}
                      className="group surface-card flex h-full flex-col rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue/30 hover:shadow-[var(--shadow-md)]"
                    >
                      <div className="flex items-center justify-between">
                        <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-blue/10 to-green/10 text-blue">
                          <Icon size={20} />
                        </span>
                        <ArrowUpRight
                          size={16}
                          className="text-faint transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                      </div>
                      <h3 className="mt-4 text-lg font-semibold text-navy">
                        {f.name}
                      </h3>
                      <p className="mt-2 flex-1 text-[0.9rem] leading-relaxed text-muted">
                        {f.cardline}
                      </p>
                      <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-blue">
                        Learn more
                      </span>
                    </Link>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
      ))}

      <section className="py-16 lg:py-24">
        <div className="container-x">
          <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-navy via-navy to-navy-700 px-7 py-14 text-center sm:px-16">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -left-20 top-0 h-72 w-72 rounded-full bg-[radial-gradient(closest-side,rgba(0,143,224,0.35),transparent)]" />
              <div className="absolute -right-16 bottom-0 h-72 w-72 rounded-full bg-[radial-gradient(closest-side,rgba(28,219,150,0.3),transparent)]" />
            </div>
            <div className="relative mx-auto max-w-2xl">
              <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-[2.5rem] sm:leading-[1.1]">
                One platform. Every call handled.
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-white/70">
                Book a demo and see the whole thing work on a real call.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link href="/demo" className="btn btn-primary text-base">
                  Book a demo <ArrowRight size={18} />
                </Link>
                <Link href="/pricing" className="btn btn-white text-base">
                  See pricing
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
