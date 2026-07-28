import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, FileText, Check } from "lucide-react";
import { templates, getTemplate, allTemplateSlugs } from "@/data/templates";
import { industries } from "@/data/industries";
import WaitlistForm from "@/components/WaitlistForm";
import EstimateTemplateDoc from "@/components/templates/EstimateTemplateDoc";
import { jsonLd as serializeJsonLd } from "@/lib/jsonld";

export const dynamicParams = false;

const base = process.env.NEXT_PUBLIC_SITE_URL || "https://oneby.ai";

export function generateStaticParams() {
  return allTemplateSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const t = getTemplate(slug);
  if (!t) return {};
  return {
    title: t.metaTitle,
    description: t.metaDescription,
    keywords: t.keywords,
    alternates: { canonical: `/templates/${t.slug}` },
    openGraph: {
      title: `${t.metaTitle} · OneBy`,
      description: t.metaDescription,
      type: "article",
      url: `/templates/${t.slug}`,
    },
  };
}

// Next 16 passes params as a promise to the page component.
export default async function TemplatePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const t = getTemplate(slug);
  if (!t) notFound();

  const trade = industries.find((i) => i.slug === t.tradeSlug);
  const others = templates.filter((x) => x.slug !== t.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "FAQPage",
        mainEntity: t.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: base },
          {
            "@type": "ListItem",
            position: 2,
            name: "Free Templates",
            item: `${base}/templates`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: `${t.trade} Estimate Template`,
            item: `${base}/templates/${t.slug}`,
          },
        ],
      },
    ],
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
          <nav className="mb-4 text-[0.8rem] text-faint">
            <Link href="/templates" className="hover:text-blue">
              Free templates
            </Link>{" "}
            / {t.trade}
          </nav>
          <span className="eyebrow justify-center rounded-full border border-blue/20 bg-blue/5 px-3 py-1.5">
            <FileText size={14} /> Free {t.trade.toLowerCase()} template
          </span>
          <h1 className="mt-5 text-[2.2rem] font-extrabold leading-[1.1] tracking-tight text-navy sm:text-5xl">
            {t.h1}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted">{t.heroSub}</p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <a href="#template" className="btn btn-primary">
              Get the template <ArrowRight size={17} />
            </a>
            <a href="#build" className="btn btn-ghost">
              Build it in OneBy
            </a>
          </div>
        </div>
      </section>

      {/* Intro + the template itself */}
      <section id="template" className="scroll-mt-24 pb-14">
        <div className="container-x max-w-5xl">
          <div className="mx-auto max-w-3xl space-y-4">
            {t.intro.map((p) => (
              <p key={p.slice(0, 24)} className="leading-relaxed text-muted">
                {p}
              </p>
            ))}
          </div>
          <div className="mt-8">
            <EstimateTemplateDoc template={t} />
          </div>
        </div>
      </section>

      {/* Why three options */}
      <section className="border-t border-line py-14 lg:py-20">
        <div className="container-x max-w-3xl">
          <h2 className="text-2xl font-bold tracking-tight text-navy sm:text-3xl">
            Why the three-option layout books more work
          </h2>
          <p className="mt-4 leading-relaxed text-muted">
            One price is a yes-or-no question, and the easiest answer is to call
            the next company for a second quote. Three options change the question
            to which one. The customer stays with you and decides how much to
            spend, and the recommended middle option gives most people a
            comfortable place to land.
          </p>
          <p className="mt-4 leading-relaxed text-muted">{t.optionsNote}</p>
          <ul className="mt-6 space-y-3">
            {[
              "Put the option you recommend in the middle and mark it clearly.",
              "Keep each option to a few plain-language lines, not a parts list.",
              "Name what the customer gets, warranty and peace of mind, not just the hardware.",
              "Send it the same day. Estimates sent within an hour close far more often.",
            ].map((tip) => (
              <li key={tip} className="flex gap-3 text-[0.95rem] leading-relaxed text-ink">
                <Check size={18} className="mt-0.5 shrink-0 text-blue" />
                {tip}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Build it in OneBy, email capture */}
      <section id="build" className="scroll-mt-24 bg-navy py-16 lg:py-24">
        <div className="container-x max-w-3xl text-center">
          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Stop rebuilding this in a Word doc
          </h2>
          <p className="mx-auto mt-4 max-w-xl leading-relaxed text-white/70">
            In OneBy you save these three options once, then send a branded
            estimate from your phone on the job. The customer taps to accept and
            it turns into a scheduled job, no retyping. Join the founders list for
            early access and lock the AI at $39 a month for two years.
          </p>
          <div className="mt-8">
            <WaitlistForm />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-line py-14 lg:py-20">
        <div className="container-x max-w-3xl">
          <h2 className="text-2xl font-bold tracking-tight text-navy sm:text-3xl">
            {t.trade} estimate template questions
          </h2>
          <div className="mt-8 space-y-3">
            {t.faqs.map((f) => (
              <details key={f.q} className="group rounded-xl border border-line bg-surface p-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-navy">
                  {f.q}
                  <span className="shrink-0 text-faint transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Cross-links */}
      <section className="border-t border-line py-14 lg:py-20">
        <div className="container-x max-w-4xl">
          <div className="flex flex-wrap gap-3">
            <Link href={t.relatedFeature.href} className="btn btn-primary">
              {t.relatedFeature.label} <ArrowRight size={17} />
            </Link>
            {trade && (
              <Link href={`/${trade.slug}`} className="btn btn-ghost">
                OneBy for {trade.shortName}
              </Link>
            )}
          </div>

          {others.length > 0 && (
            <div className="mt-10">
              <h2 className="text-xl font-bold tracking-tight text-navy">
                More free templates
              </h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {others.map((o) => (
                  <Link
                    key={o.slug}
                    href={`/templates/${o.slug}`}
                    className="group flex items-center justify-between rounded-xl border border-line bg-surface px-4 py-3 text-sm font-medium text-navy transition-colors hover:border-blue"
                  >
                    {o.trade} estimate
                    <ArrowRight
                      size={15}
                      className="text-faint transition-colors group-hover:text-blue"
                    />
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
