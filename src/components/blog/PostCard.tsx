import Link from "next/link";
import { ArrowUpRight, Clock, Phone } from "lucide-react";
import { formatDate, type PostMeta } from "@/lib/blog";
import { motifBySlug } from "@/components/industry/industryMotifs";
import { industryAccentStyle } from "@/data/industryThemes";

// Shared blog post card, used on the blog index, related-reading grids, and the
// per-industry blog hubs. Each card gets a generated editorial cover: the post
// title set on a trade-colored brand card with a dot-grid texture, the trade's
// bespoke motif, and the OneBy mark. No stock photos, unique per post.
export default function PostCard({ post }: { post: PostMeta }) {
  const motif = post.industry ? motifBySlug[post.industry] : null;
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group surface-card flex h-full flex-col overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:border-blue/30 hover:shadow-[var(--shadow-md)]"
    >
      {/* Generated editorial cover, themed by trade accent */}
      <div
        style={industryAccentStyle(post.industry)}
        className="relative flex aspect-[3/2] flex-col justify-between overflow-hidden bg-gradient-to-br from-blue to-navy p-5 text-white"
      >
        {/* dot-grid texture */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.14]"
          style={{
            backgroundImage: "radial-gradient(#fff 1px, transparent 1px)",
            backgroundSize: "15px 15px",
          }}
        />
        {/* bold trade motif */}
        <div className="pointer-events-none absolute -bottom-12 -right-10 text-white/[0.22]">
          {motif ? (
            <svg viewBox="0 0 200 200" className="h-60 w-60" fill="none" aria-hidden>
              {motif}
            </svg>
          ) : (
            <Phone className="h-52 w-52" strokeWidth={1} aria-hidden />
          )}
        </div>

        {/* top row: category + brand mark */}
        <div className="relative flex items-center justify-between">
          <span className="rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-semibold backdrop-blur-sm">
            {post.category}
          </span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/oneby-logo-white.svg" alt="OneBy" className="h-4 w-auto opacity-80" />
        </div>

        {/* title as the cover headline */}
        <h3 className="relative mt-6 line-clamp-3 text-[1.15rem] font-bold leading-snug tracking-tight">
          {post.title}
        </h3>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <p className="line-clamp-2 flex-1 text-[0.9rem] leading-relaxed text-muted">
          {post.excerpt}
        </p>
        <div className="mt-4 flex items-center gap-3 border-t border-line pt-3 text-xs text-faint">
          <span>{formatDate(post.date)}</span>
          <span className="inline-flex items-center gap-1">
            <Clock size={12} /> {post.readingMinutes} min
          </span>
          <ArrowUpRight
            size={16}
            className="ml-auto text-blue transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </div>
      </div>
    </Link>
  );
}
