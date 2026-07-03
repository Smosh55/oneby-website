import { getIcon } from "./iconMap";

// A tasteful, on-brand per-industry graphic: the vertical's own icon (roofline,
// pipes, circuit, stethoscope…) rendered large and soft in the accent color,
// plus an accent halo. Distinct per industry, themed by the accent CSS vars, no
// stock photography. Decorative only.
export default function IndustryHeroArt({ icon }: { icon: string }) {
  const Icon = getIcon(icon);
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* soft accent halo behind the emblem */}
      <div className="absolute right-[6%] top-8 h-64 w-64 rounded-full bg-[radial-gradient(closest-side,rgba(var(--accent-rgb),0.16),transparent)]" />
      {/* oversized industry emblem, soft in the accent color */}
      <Icon
        className="absolute -right-10 top-2 text-blue/[0.07]"
        size={340}
        strokeWidth={1}
      />
    </div>
  );
}
