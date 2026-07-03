import { getIcon } from "./iconMap";
import { motifBySlug } from "./industryMotifs";

// A bespoke, on-brand per-industry graphic: a decorative line motif specific to
// the trade (roofline, pipe run, circuit, scales, server rack…), accent-themed
// via currentColor, plus an accent halo. Falls back to the vertical's lucide
// icon if a slug has no motif yet. Decorative only.
export default function IndustryHeroArt({
  slug,
  icon,
}: {
  slug?: string;
  icon: string;
}) {
  const motif = slug ? motifBySlug[slug] : undefined;
  const Icon = getIcon(icon);
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* soft accent halo */}
      <div className="absolute right-[6%] top-8 h-64 w-64 rounded-full bg-[radial-gradient(closest-side,rgba(var(--accent-rgb),0.16),transparent)]" />
      {motif ? (
        <svg
          viewBox="0 0 200 200"
          className="absolute -right-6 top-0 h-[220px] w-[220px] text-blue/[0.09] sm:h-[340px] sm:w-[340px]"
          xmlns="http://www.w3.org/2000/svg"
        >
          {motif}
        </svg>
      ) : (
        <Icon
          className="absolute -right-10 top-2 text-blue/[0.07]"
          size={340}
          strokeWidth={1}
        />
      )}
    </div>
  );
}
