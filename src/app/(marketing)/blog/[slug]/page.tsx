import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import {
  getPostBySlug,
  getPostSlugs,
  getRelatedPosts,
  formatDate,
} from "@/lib/blog";
import Prose from "@/components/blog/Prose";
import { industriesBySlug } from "@/data/industries";
import { jsonLd as serializeJsonLd } from "@/lib/jsonld";

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.seoTitle,
    description: post.seoDescription,
    keywords: post.keywords,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.seoTitle,
      description: post.seoDescription,
      type: "article",
      url: `https://oneby.ai/blog/${post.slug}`,
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = getRelatedPosts(post.slug, post.category);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.seoDescription,
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Organization", name: post.author },
    publisher: {
      "@type": "Organization",
      name: "OneBy",
      logo: {
        "@type": "ImageObject",
        url: "https://oneby.ai/brand/oneby-logo.svg",
      },
    },
    mainEntityOfPage: `https://oneby.ai/blog/${post.slug}`,
    keywords: post.keywords.join(", "),
  };

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />

      <article className="pt-28 lg:pt-32">
        {/* Header */}
        <header className="container-x max-w-3xl">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-navy"
          >
            <ArrowLeft size={15} /> All articles
          </Link>

          <div className="mt-6 flex flex-wrap items-center gap-3 text-xs font-semibold">
            <span className="rounded-full bg-blue/10 px-2.5 py-1 text-blue">
              {post.category}
            </span>
            {post.industry && industriesBySlug[post.industry] && (
              <Link
                href={`/industries/${post.industry}`}
                className="rounded-full bg-canvas-2 px-2.5 py-1 text-navy transition-colors hover:bg-line"
              >
                For {industriesBySlug[post.industry].shortName} →
              </Link>
            )}
          </div>

          <h1 className="mt-4 text-[2.1rem] font-extrabold leading-[1.12] tracking-tight text-navy sm:text-[2.75rem]">
            {post.title}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted">
            {post.excerpt}
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-4 border-y border-line py-4 text-sm text-muted">
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-navy text-xs font-bold text-white">
                1
              </span>
              <div>
                <p className="font-semibold text-navy">{post.author}</p>
                <p className="text-xs text-faint">{post.authorRole}</p>
              </div>
            </div>
            <span className="hidden text-line sm:block">·</span>
            <span>{formatDate(post.date)}</span>
            <span className="inline-flex items-center gap-1">
              <Clock size={14} /> {post.readingMinutes} min read
            </span>
          </div>
        </header>

        {/* Body */}
        <div className="container-x mt-8 max-w-3xl">
          <Prose content={post.content} />
        </div>

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="container-x mt-10 max-w-3xl">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-canvas-2 px-3 py-1 text-xs font-medium text-muted"
                >
                  #{t}
                </span>
              ))}
            </div>
          </div>
        )}
        {/* Go deeper (internal links to pillar + tools) */}
        <div className="container-x mt-12 max-w-3xl">
          <div className="rounded-2xl border border-line bg-canvas/50 p-6">
            <p className="text-xs font-bold uppercase tracking-wide text-faint">
              Go deeper
            </p>
            <div className="mt-2 flex flex-col divide-y divide-line">
              <Link
                href="/ai-receptionist"
                className="group flex items-center justify-between py-3 font-semibold text-navy"
              >
                The complete AI receptionist guide
                <ArrowRight size={16} className="text-faint transition-colors group-hover:text-blue" />
              </Link>
              <Link
                href="/product"
                className="group flex items-center justify-between py-3 font-semibold text-navy"
              >
                See the whole platform, from call to paid
                <ArrowRight size={16} className="text-faint transition-colors group-hover:text-blue" />
              </Link>
              <Link
                href="/missed-call-calculator"
                className="group flex items-center justify-between py-3 font-semibold text-navy"
              >
                See what missed calls are costing you
                <ArrowRight size={16} className="text-faint transition-colors group-hover:text-blue" />
              </Link>
              {post.industry && industriesBySlug[post.industry] && (
                <Link
                  href={`/industries/${post.industry}`}
                  className="group flex items-center justify-between py-3 font-semibold text-navy"
                >
                  OneBy for {industriesBySlug[post.industry].shortName}
                  <ArrowRight size={16} className="text-faint transition-colors group-hover:text-blue" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </article>

      {/* CTA */}
      <section className="py-16 lg:py-20">
        <div className="container-x max-w-3xl">
          <div className="relative overflow-hidden rounded-[24px] bg-gradient-to-br from-navy via-navy to-navy-700 px-7 py-12 text-center sm:px-12">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -left-16 top-0 h-60 w-60 rounded-full bg-[radial-gradient(closest-side,rgba(0,143,224,0.35),transparent)]" />
              <div className="absolute -right-12 bottom-0 h-60 w-60 rounded-full bg-[radial-gradient(closest-side,rgba(28,219,150,0.3),transparent)]" />
            </div>
            <div className="relative">
              <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                Never miss another customer.
              </h2>
              <p className="mx-auto mt-3 max-w-md text-white/70">
                See how OneBy answers every call, then tickets, schedules, and
                invoices the job, all in one place.
              </p>
              <div className="mt-7 flex flex-wrap justify-center gap-3">
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

      {/* Related */}
      {related.length > 0 && (
        <section className="pb-20 lg:pb-28">
          <div className="container-x">
            <div className="mb-8 flex items-center gap-3">
              <h2 className="text-xl font-bold tracking-tight text-navy">
                Keep reading
              </h2>
              <span className="h-px flex-1 bg-line" />
            </div>
            <div className="grid gap-5 sm:grid-cols-3">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/blog/${r.slug}`}
                  className="group surface-card flex h-full flex-col rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue/30 hover:shadow-[var(--shadow-md)]"
                >
                  <span className="w-fit rounded-full bg-canvas-2 px-2.5 py-1 text-[11px] font-semibold text-navy">
                    {r.category}
                  </span>
                  <h3 className="mt-4 text-[1.05rem] font-semibold leading-snug text-navy">
                    {r.title}
                  </h3>
                  <p className="mt-2 flex-1 text-[0.875rem] leading-relaxed text-muted">
                    {r.excerpt}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-blue">
                    Read
                    <ArrowRight
                      size={14}
                      className="transition-transform group-hover:translate-x-0.5"
                    />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
