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
        /* open loop: solid arc with a gap at the lower right (dashes turn
           into unreadable dots at icon size) */
        <path
          d="M 16.6 19.1 A 8.5 8.5 0 1 1 19.9 14.4"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
      )}
      {/* the guest, at the gap (or riding the closed loop) */}
      <circle cx={closed ? 12 : 19.3} cy={closed ? 3.5 : 17.6} r="2.6" fill="currentColor" />
    </svg>
  );
}
