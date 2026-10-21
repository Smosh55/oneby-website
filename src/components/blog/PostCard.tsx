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
        className="relative flex aspect-[3/2] flex-col justify-between overflow-hidden p-5 text-white"
      >
        {/* base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue via-blue to-navy" />
        {/* top-left light glow for depth */}
        <div className="pointer-events-none absolute -left-12 -top-16 h-52 w-52 rounded-full bg-white/20 blur-2xl" />
        {/* dot-grid texture */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.10]"
          style={{
            backgroundImage: "radial-gradient(#fff 1px, transparent 1px)",
            backgroundSize: "15px 15px",
          }}
        />
        {/* bold trade motif, oversized and tilted */}
        <div className="pointer-events-none absolute -right-8 top-1/2 -translate-y-1/2 -rotate-[8deg] text-white/[0.24]">
          {motif ? (
            <svg viewBox="0 0 200 200" className="h-72 w-72" fill="none" aria-hidden>
              {motif}
            </svg>
          ) : (
            <Phone className="h-64 w-64" strokeWidth={0.9} aria-hidden />
          )}
        </div>
        {/* bottom scrim so the title always reads */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />

        {/* top row: category kicker + brand mark */}
        <div className="relative flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.13em] text-white/90">
            <span className="h-1.5 w-1.5 rounded-full bg-green" /> {post.category}
          </span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/oneby-logo-white.svg" alt="OneBy" className="h-4 w-auto opacity-85" />
        </div>

        {/* title as the cover headline */}
        <h3 className="relative line-clamp-3 text-[1.25rem] font-extrabold leading-[1.13] tracking-tight [text-shadow:0_1px_12px_rgba(4,3,79,0.25)]">
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
