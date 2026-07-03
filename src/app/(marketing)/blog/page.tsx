import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { getAllPosts, getIndustryPosts, formatDate } from "@/lib/blog";
import { focusedIndustry } from "@/config/site";
import PostCard from "@/components/blog/PostCard";
import Reveal from "@/components/Reveal";

export function generateMetadata(): Metadata {
  const focus = focusedIndustry();
  if (focus) {
    return {
      title: `${focus.shortName} Insights & Playbooks`,
      description: `Practical guides on call answering, lead capture, and workflow automation for ${focus.name.toLowerCase()}.`,
      alternates: { canonical: "/blog" },
    };
  }
  return {
    title: "Blog: Playbooks for Capturing Every Customer",
    description:
      "Practical guides on call answering, lead capture, AI receptionists, and workflow automation for home service and small businesses.",
    alternates: { canonical: "/blog" },
  };
}

export default function BlogIndex() {
  // On a single-industry deployment, the blog is that trade's cluster plus the
  // general (untagged) posts that apply to every business.
  const focus = focusedIndustry();
  const posts = focus
    ? [...getIndustryPosts(focus.slug), ...getAllPosts().filter((p) => !p.industry)]
    : getAllPosts();
  const featured = posts.find((p) => p.featured) ?? posts[0];
  const rest = posts.filter((p) => p.slug !== featured?.slug);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-28 pb-10 lg:pt-32">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-[440px] w-[900px] rounded-full bg-[radial-gradient(closest-side,rgba(0,143,224,0.12),transparent)]" />
        </div>
        <div className="container-x">
          <span className="eyebrow rounded-full border border-blue/20 bg-blue/5 px-3 py-1.5">
            {focus ? `${focus.shortName} Insights` : "The OneBy Blog"}
          </span>
          <h1 className="mt-5 max-w-3xl text-[2.3rem] font-extrabold leading-[1.08] tracking-tight text-navy sm:text-[3.25rem]">
            {focus
              ? `${focus.shortName} playbooks for turning every call into a customer.`
              : "Playbooks for turning every call into a customer."}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
            Practical, no-fluff guides on call answering, lead capture, AI, and
            workflow automation for businesses that live on the phone.
          </p>
        </div>
      </section>

      {/* Featured */}
      {featured && (
        <section className="pb-12">
          <div className="container-x">
            <Reveal>
              <Link
                href={`/blog/${featured.slug}`}
                className="group grid overflow-hidden rounded-[24px] border border-line bg-white shadow-[var(--shadow-sm)] transition-all duration-300 hover:shadow-[var(--shadow-lg)] lg:grid-cols-2"
              >
                <div className="relative hidden min-h-[20rem] items-center justify-center overflow-hidden bg-gradient-to-br from-navy via-navy to-navy-700 lg:flex">
                  <div className="pointer-events-none absolute inset-0">
                    <div className="absolute -left-10 top-6 h-56 w-56 rounded-full bg-[radial-gradient(closest-side,rgba(0,143,224,0.45),transparent)]" />
                    <div className="absolute -right-8 bottom-4 h-56 w-56 rounded-full bg-[radial-gradient(closest-side,rgba(28,219,150,0.4),transparent)]" />
                  </div>
                  <span className="relative px-10 text-center text-2xl font-bold leading-snug text-white">
                    {featured.title}
                  </span>
                </div>
                <div className="flex flex-col justify-center p-8 lg:p-12">
                  <div className="flex items-center gap-3 text-xs font-semibold">
                    <span className="rounded-full bg-blue/10 px-2.5 py-1 text-blue">
                      {featured.category}
                    </span>
                    <span className="text-faint">Featured</span>
                  </div>
                  <h2 className="mt-4 text-2xl font-bold tracking-tight text-navy sm:text-3xl">
                    {featured.title}
                  </h2>
                  <p className="mt-3 text-[1.0625rem] leading-relaxed text-muted">
                    {featured.excerpt}
                  </p>
                  <div className="mt-6 flex items-center gap-4 text-sm text-muted">
                    <span>{formatDate(featured.date)}</span>
                    <span className="inline-flex items-center gap-1">
                      <Clock size={14} /> {featured.readingMinutes} min read
                    </span>
                  </div>
                  <span className="mt-6 inline-flex items-center gap-1.5 font-semibold text-blue">
                    Read article
                    <ArrowRight
                      size={17}
                      className="transition-transform group-hover:translate-x-0.5"
                    />
                  </span>
                </div>
              </Link>
            </Reveal>
          </div>
        </section>
      )}

      {/* Grid */}
      <section className="pb-20 lg:pb-28">
        <div className="container-x">
          <div className="mb-8 flex items-center gap-3">
            <h2 className="text-xl font-bold tracking-tight text-navy">
              Latest articles
            </h2>
            <span className="h-px flex-1 bg-line" />
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((post, i) => (
              <Reveal key={post.slug} delay={(i % 3) * 60}>
                <PostCard post={post} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
