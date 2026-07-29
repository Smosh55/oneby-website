// The Looped mark: the OneBy "1" with the loop orbiting it, open at the
// bottom with the guest's dot at the gap (the "in the loop" state). This is
// the primary Looped glyph for 16px and up; LoopedRing (bare ring) exists
// only for tiny status chips where the mark cannot read. Closed variant
// renders the full-user state (loop closed, dot riding it).
export default function LoopedMark({
  size = 22,
  closed = false,
}: {
  size?: number;
  closed?: boolean;
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 800 800" fill="none" aria-hidden>
      {/* back half of the orbit, passing behind the mark */}
      <g transform="rotate(-18 400 400)">
        <path
          d="M 130 400 A 270 115 0 0 1 670 400"
          stroke="#008fe0"
          strokeWidth="34"
          strokeLinecap="round"
          opacity="0.4"
        />
      </g>
      {/* the OneBy mark */}
      <g transform="translate(185,155) scale(0.82)">
        <polygon
          fill="#1cdb96"
          points="490.72 29.93 489.76 457.8 309.41 457.8 309.41 142.18 241.31 142.18 315.82 29.93 490.72 29.93"
        />
        <polygon
          fill="#008fe0"
          points="309.42 457.81 234.9 570.07 60 570.07 60.73 241.05 60.96 142.17 241.32 142.17 175.7 241.05 241.32 241.05 241.32 457.81 309.42 457.81"
        />
      </g>
      {/* front of the orbit: open with the dot at the gap, or closed */}
      <g transform="rotate(-18 400 400)">
        {closed ? (
          <path
            d="M 670 400 A 270 115 0 0 1 130 400"
            stroke="#1cdb96"
            strokeWidth="38"
            strokeLinecap="round"
          />
        ) : (
          <>
            <path
              d="M 670 400 A 270 115 0 0 1 535 500"
              stroke="#008fe0"
              strokeWidth="38"
              strokeLinecap="round"
            />
            <path
              d="M 265 500 A 270 115 0 0 1 130 400"
              stroke="#008fe0"
              strokeWidth="38"
              strokeLinecap="round"
            />
          </>
        )}
        <circle
          cx="400"
          cy="515"
          r="40"
          fill="#1cdb96"
          stroke="#ffffff"
          strokeWidth="12"
        />
      </g>
    </svg>
  );
}
