// Sticky mobile CTA for the master homepage — keeps the waitlist ask in
// reach on small screens. Style mirrors IndustryLanding's sticky bar.
export default function StickyWaitlistCTA() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 px-4 py-3 backdrop-blur-md lg:hidden"
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
    >
      <a href="#waitlist" className="btn btn-primary w-full">
        Join the waitlist — from $29/mo
      </a>
    </div>
  );
}
