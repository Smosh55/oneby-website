import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { industryGroups } from "@/data/industries";
import { getIcon } from "@/components/industry/iconMap";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Industries: AI Call Answering Built for Your Trade",
  description:
    "OneBy is purpose-built for businesses that can't always pick up: HVAC, plumbing, roofing, property management, and more. Find the playbook for your industry.",
  alternates: { canonical: "/industries" },
};

export default function IndustriesHub() {
  return (
    <>
      <section className="relative overflow-hidden pt-28 pb-12 lg:pt-32">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-[460px] w-[900px] rounded-full bg-[radial-gradient(closest-side,rgba(0,143,224,0.13),transparent)]" />
        </div>
        <div className="container-x text-center">
          <span className="eyebrow rounded-full border border-blue/20 bg-blue/5 px-3 py-1.5">
            Industries
          </span>
          <h1 className="mx-auto mt-5 max-w-3xl text-[2.3rem] font-extrabold leading-[1.08] tracking-tight text-navy sm:text-[3.25rem]">
            One platform, tuned to how your trade works.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            Every business that lives on the phone loses customers to voicemail.
            OneBy answers, captures the details, and turns each call into booked
            work, with a playbook built for your industry.
          </p>
        </div>
      </section>

      {industryGroups.map((grp) => (
        <section key={grp.group} className="py-12">
          <div className="container-x">
            <div className="mb-8 flex items-center gap-3">
              <h2 className="text-xl font-bold tracking-tight text-navy">
                {grp.group}
              </h2>
              <span className="h-px flex-1 bg-line" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {grp.items.map((ind, i) => {
                const Icon = getIcon(ind.icon);
                return (
                  <Reveal key={ind.slug} delay={(i % 3) * 60}>
                    <Link
                      href={`/${ind.slug}`}
                      className="group surface-card flex h-full flex-col rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue/30 hover:shadow-[var(--shadow-md)]"
                    >
                      <div className="flex items-center justify-between">
                        <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-blue/10 to-green/10 text-blue">
                          <Icon size={20} />
                        </span>
                        {ind.priority && (
                          <span className="rounded-full bg-green/15 px-2.5 py-1 text-[11px] font-semibold text-green-600">
                            Priority
                          </span>
                        )}
                      </div>
                      <h3 className="mt-4 flex items-center gap-1 text-lg font-semibold text-navy">
                        {ind.name}
                      </h3>
                      <p className="mt-2 flex-1 text-[0.9rem] leading-relaxed text-muted">
                        {ind.heroSub.split(".")[0]}.
                      </p>
                      <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-blue">
                        View playbook
                        <ArrowUpRight
                          size={15}
                          className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                      </span>
                    </Link>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="py-16 lg:py-24">
        <div className="container-x">
          <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-navy via-navy to-navy-700 px-7 py-14 text-center sm:px-16">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -left-20 top-0 h-72 w-72 rounded-full bg-[radial-gradient(closest-side,rgba(0,143,224,0.35),transparent)]" />
              <div className="absolute -right-16 bottom-0 h-72 w-72 rounded-full bg-[radial-gradient(closest-side,rgba(28,219,150,0.3),transparent)]" />
            </div>
            <div className="relative mx-auto max-w-2xl">
              <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-[2.5rem] sm:leading-[1.1]">
                Don&apos;t see your trade? It still fits.
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-white/70">
                If your business runs on the phone, OneBy turns your calls into
                action. Book a demo and we&apos;ll map it to your workflow.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link href="/demo" className="btn btn-primary text-base">
                  Book a demo <ArrowRight size={18} />
                </Link>
                <Link href="/#pricing" className="btn btn-white text-base">
                  Start free trial
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
