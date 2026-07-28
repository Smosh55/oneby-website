import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";
import { templates } from "@/data/templates";
import { industryAccentStyle } from "@/data/industryThemes";
import { jsonLd as serializeJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Free Estimate & Proposal Templates for Service Businesses",
  description:
    "Free, ready-to-use estimate templates for the trades, built around the Good/Better/Best layout that wins bigger jobs. Print them, copy them, or build and send them in OneBy.",
  keywords: [
    "free estimate template",
    "contractor estimate template",
    "service business estimate template",
    "good better best estimate template",
    "trade estimate templates",
  ],
  alternates: { canonical: "/templates" },
  openGraph: {
    title: "Free Estimate Templates for the Trades · OneBy",
    description:
      "Ready-to-use, three-option estimate templates by trade. Free to print or build and send in OneBy.",
    type: "website",
    url: "/templates",
  },
};

const base = process.env.NEXT_PUBLIC_SITE_URL || "https://oneby.ai";

export default function TemplatesHub() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Free Estimate Templates for the Trades",
    url: `${base}/templates`,
    hasPart: templates.map((t) => ({
      "@type": "WebPage",
      name: t.metaTitle,
      url: `${base}/templates/${t.slug}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden pt-28 pb-10 lg:pt-32">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-[460px] w-[920px] rounded-full bg-[radial-gradient(closest-side,rgba(0,143,224,0.13),transparent)]" />
        </div>
        <div className="container-x max-w-3xl text-center">
          <span className="eyebrow justify-center rounded-full border border-blue/20 bg-blue/5 px-3 py-1.5">
            <FileText size={14} /> Free templates
          </span>
          <h1 className="mt-5 text-[2.2rem] font-extrabold leading-[1.1] tracking-tight text-navy sm:text-5xl">
            Free estimate templates for the trades
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted">
            Ready-to-use estimates built around the three-option layout that wins
            bigger jobs. Print them, copy the structure, or build and send them
            from your phone in OneBy. No cost, no catch.
          </p>
        </div>
      </section>

      {/* Template grid */}
      <section className="pb-16">
        <div className="container-x max-w-4xl">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {templates.map((t) => (
              <Link
                key={t.slug}
                href={`/templates/${t.slug}`}
                style={industryAccentStyle(t.tradeSlug)}
                className="group surface-card flex flex-col overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:border-blue/30 hover:shadow-[var(--shadow-md)]"
              >
                <div className="relative aspect-[16/9] overflow-hidden bg-gradient-to-br from-blue via-blue to-navy">
                  <FileText
                    className="absolute -bottom-6 -right-4 h-40 w-40 text-white/[0.16]"
                    strokeWidth={1}
                    aria-hidden
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-navy shadow-[var(--shadow-sm)]">
                    {t.kind}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h2 className="text-lg font-semibold leading-snug text-navy">
                    {t.trade} Estimate Template
                  </h2>
                  <p className="mt-2 flex-1 text-[0.9rem] leading-relaxed text-muted">
                    Good, Better, Best options for {t.scenario}.
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-blue">
                    Open template
                    <ArrowRight
                      size={15}
                      className="transition-transform group-hover:translate-x-0.5"
                    />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <p className="mt-10 text-center text-sm text-muted">
            More trades on the way. Want one for yours?{" "}
            <Link href="/contact" className="font-semibold text-blue hover:underline">
              Tell us
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
