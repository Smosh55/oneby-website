// The Looped ring glyph at icon size: an open loop with the guest's dot
// sitting at the gap. Strokes in currentColor so it inherits text color like
// a lucide icon; `closed` renders the full-user state (loop closed, no gap).
// Tier colors (grey open = Looped, amber open = Looped+, green closed = full
// user) are applied by the caller via text color per the guest-seat spec.
export default function LoopedRing({
  size = 20,
  closed = false,
}: {
  size?: number;
  closed?: boolean;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      {closed ? (
        <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="2.4" />
      ) : (
        /* open loop: arc with a gap at the lower right, dashed */
        <path
          d="M 17.3 18.4 A 8.5 8.5 0 1 1 19.6 15"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeDasharray="0.5 4"
        />
      )}
      {/* the guest, at the gap (or riding the closed loop) */}
      <circle cx={closed ? 12 : 18.9} cy={closed ? 3.5 : 17.2} r="2.6" fill="currentColor" />
    </svg>
  );
}
