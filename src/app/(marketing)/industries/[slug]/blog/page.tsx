import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, ArrowRight } from "lucide-react";
import { industries, industriesBySlug } from "@/data/industries";
import { getIndustryPosts, getAllPosts } from "@/lib/blog";
import { getIcon } from "@/components/industry/iconMap";
import IndustryHeroArt from "@/components/industry/IndustryHeroArt";
import PostCard from "@/components/blog/PostCard";
import Reveal from "@/components/Reveal";
import { industryAccentStyle } from "@/data/industryThemes";
import { focusedIndustrySlug } from "@/config/site";

export function generateStaticParams() {
  const list = focusedIndustrySlug
    ? industries.filter((i) => i.slug === focusedIndustrySlug)
    : industries;
  return list.map((i) => ({ slug: i.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const industry = industriesBySlug[slug];
  if (!industry) return {};
  return {
    title: `${industry.shortName} Insights & Playbooks`,
    description: `Guides on call answering, lead capture, and workflow automation for ${industry.name.toLowerCase()}.`,
    alternates: { canonical: `/industries/${industry.slug}/blog` },
  };
}

export default async function IndustryBlogHub({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const industry = industriesBySlug[slug];
  if (!industry) notFound();

  const Icon = getIcon(industry.icon);
  const pillar = getIndustryPosts(industry.slug);
  const general = getAllPosts()
    .filter((p) => !p.industry)
    .slice(0, 6);

  return (
    <div style={industryAccentStyle(industry.slug)}>
      <section className="relative overflow-hidden pt-28 pb-10 lg:pt-32">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <IndustryHeroArt slug={industry.slug} icon={industry.icon} />
        </div>
        <div className="container-x">
          <nav className="mb-6 flex items-center gap-1.5 text-sm text-muted">
            <Link href={`/industries/${industry.slug}`} className="hover:text-navy">
              {industry.shortName}
            </Link>
            <ChevronRight size={14} className="text-faint" />
            <span className="font-medium text-navy">Insights</span>
          </nav>
          <span className="eyebrow rounded-full border border-blue/20 bg-blue/5 px-3 py-1.5">
            <Icon size={14} /> {industry.shortName} insights
          </span>
          <h1 className="mt-5 max-w-3xl text-[2.3rem] font-extrabold leading-[1.08] tracking-tight text-navy sm:text-[3.25rem]">
            {industry.shortName} playbooks for the phone.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
            Guides on call answering, lead capture, and turning every{" "}
            {industry.shortName.toLowerCase()} call into a booked job.
          </p>
        </div>
      </section>

      {pillar.length > 0 && (
        <section className="pb-12">
          <div className="container-x">
            <div className="mb-8 flex items-center gap-3">
              <h2 className="text-xl font-bold tracking-tight text-navy">
                Written for {industry.shortName.toLowerCase()}
              </h2>
              <span className="h-px flex-1 bg-line" />
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {pillar.map((p, i) => (
                <Reveal key={p.slug} delay={(i % 3) * 60}>
                  <PostCard post={p} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {general.length > 0 && (
        <section className="pb-20 lg:pb-28">
          <div className="container-x">
            <div className="mb-8 flex items-center gap-3">
              <h2 className="text-xl font-bold tracking-tight text-navy">
                Also worth reading
              </h2>
              <span className="h-px flex-1 bg-line" />
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {general.map((p, i) => (
                <Reveal key={p.slug} delay={(i % 3) * 60}>
                  <PostCard post={p} />
                </Reveal>
              ))}
            </div>
            <div className="mt-8">
              <Link
                href={`/industries/${industry.slug}`}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue hover:underline"
              >
                Back to {industry.shortName} <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
