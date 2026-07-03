import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import { formatDate, type PostMeta } from "@/lib/blog";

// Shared blog post card, used on the blog index, related-reading grids, and the
// per-industry blog hubs. One markup, consistent everywhere.
export default function PostCard({ post }: { post: PostMeta }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group surface-card flex h-full flex-col rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue/30 hover:shadow-[var(--shadow-md)]"
    >
      <div className="flex items-center justify-between">
        <span className="rounded-full bg-canvas-2 px-2.5 py-1 text-[11px] font-semibold text-navy">
          {post.category}
        </span>
        <ArrowUpRight
          size={16}
          className="text-faint transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </div>
      <h3 className="mt-4 text-lg font-semibold leading-snug text-navy">
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
    </Link>
  );
}
