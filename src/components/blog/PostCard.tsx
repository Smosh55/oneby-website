import Link from "next/link";
import { ArrowUpRight, Clock, Phone } from "lucide-react";
import { formatDate, type PostMeta } from "@/lib/blog";
import { motifBySlug } from "@/components/industry/industryMotifs";
import { industryAccentStyle } from "@/data/industryThemes";

// Shared blog post card, used on the blog index, related-reading grids, and the
// per-industry blog hubs. One markup, consistent everywhere. Each card gets a
// branded header themed by the post's trade: an accent gradient with the trade's
// bespoke motif watermarked in. General posts fall back to the house blue and a
// phone glyph. No stock photos, fully generated, unique per trade.
export default function PostCard({ post }: { post: PostMeta }) {
  const motif = post.industry ? motifBySlug[post.industry] : null;
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group surface-card flex h-full flex-col overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:border-blue/30 hover:shadow-[var(--shadow-md)]"
    >
      {/* Branded header, themed by trade accent */}
      <div
        style={industryAccentStyle(post.industry)}
        className="relative aspect-[16/9] overflow-hidden bg-gradient-to-br from-blue via-blue to-navy"
      >
        {/* soft trade motif watermark */}
        <div className="pointer-events-none absolute -bottom-10 -right-8 text-white/[0.16]">
          {motif ? (
            <svg viewBox="0 0 200 200" className="h-56 w-56" fill="none" aria-hidden>
              {motif}
            </svg>
          ) : (
            <Phone
              className="h-44 w-44"
              strokeWidth={1.1}
              aria-hidden
            />
          )}
        </div>
        {/* subtle top sheen */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white/10 to-transparent" />
        {/* category chip */}
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-navy shadow-[var(--shadow-sm)]">
          {post.category}
        </span>
        <ArrowUpRight
          size={18}
          className="absolute right-4 top-4 text-white/70 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-semibold leading-snug text-navy">
          {post.title}
        </h3>
        <p className="mt-2 flex-1 text-[0.9rem] leading-relaxed text-muted">
          {post.excerpt}
        </p>
        <div className="mt-5 flex items-center gap-3 border-t border-line pt-4 text-xs text-faint">
          <span>{formatDate(post.date)}</span>
          <span className="inline-flex items-center gap-1">
            <Clock size={12} /> {post.readingMinutes} min
          </span>
        </div>
      </div>
    </Link>
  );
}
