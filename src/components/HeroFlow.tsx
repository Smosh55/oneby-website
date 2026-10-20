// Looping hero animation: "One call, start to finish."
// Pure-CSS, six cross-fading scenes on a 12s loop (call -> AI answers ->
// ticket -> dispatched -> done -> paid). No JS, a few KB. Lives on the right
// side of the hero. Swap for a Lottie/MP4 later without touching the layout.

const SCENES = [
  "Incoming call",
  "OneBy picks up",
  "Ticket opened",
  "Booked & on the way",
  "Work done",
  "Invoice paid",
];

export default function HeroFlow() {
  return (
    <div className="obf-root relative mx-auto w-full max-w-md select-none">
      <style>{css}</style>

      {/* floating app frame */}
      <div className="overflow-hidden rounded-[22px] border border-line bg-white shadow-[var(--shadow-xl)]">
        {/* header chrome */}
        <div className="flex items-center justify-between border-b border-line bg-canvas px-4 py-2.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/oneby-logo.svg" alt="OneBy" className="h-5 w-auto" />
          <span className="inline-flex items-center gap-1.5 text-[0.7rem] font-semibold text-muted">
            <span className="h-2 w-2 rounded-full bg-green obf-live" /> Live
          </span>
        </div>

        {/* stage */}
        <div className="obf-stage relative">
          {/* Scene 1 — incoming call */}
          <div className="obf-scene" style={{ animationDelay: "0s" }}>
            <div className="obf-card">
              <div className="flex items-center gap-3">
                <span className="obf-ring grid h-11 w-11 place-items-center rounded-full bg-blue/10 text-blue">
                  <IconPhone />
                </span>
                <div>
                  <p className="text-[0.7rem] font-semibold uppercase tracking-wide text-faint">Incoming call</p>
                  <p className="text-[0.95rem] font-bold text-navy">Maria G.</p>
                  <p className="text-[0.78rem] text-muted">(602) 555-0192</p>
                </div>
              </div>
              <p className="mt-3 text-[0.75rem] text-faint">You&apos;re on a job. Normally this one is lost.</p>
            </div>
          </div>

          {/* Scene 2 — AI answers */}
          <div className="obf-scene" style={{ animationDelay: "2s" }}>
            <div className="obf-card items-center text-center">
              <span className="obf-pulse relative grid h-14 w-14 place-items-center rounded-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/brand/oneby-mark.svg" alt="" className="h-9 w-9" />
              </span>
              <div className="mt-3 flex items-end gap-1" aria-hidden>
                {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                  <span key={i} className="obf-bar" style={{ animationDelay: `${i * 90}ms` }} />
                ))}
              </div>
              <p className="mt-3 rounded-xl bg-canvas px-3 py-1.5 text-[0.8rem] font-medium text-navy">
                &ldquo;A/C is out, need someone today.&rdquo;
              </p>
              <p className="mt-2 text-[0.72rem] font-semibold text-blue">OneBy is answering…</p>
            </div>
          </div>

          {/* Scene 3 — ticket */}
          <div className="obf-scene" style={{ animationDelay: "4s" }}>
            <div className="obf-card">
              <div className="flex items-center justify-between">
                <p className="text-[0.82rem] font-extrabold text-navy">Ticket #1042</p>
                <span className="inline-flex items-center gap-1 rounded-full bg-green/15 px-2 py-0.5 text-[0.68rem] font-bold text-green-700"><IconCheck /> Created</span>
              </div>
              <p className="mt-2 text-[0.8rem] text-ink">A/C not cooling, upstairs unit. Wants same-day.</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {["HVAC", "Same-day", "Maria G."].map((c) => (
                  <span key={c} className="rounded-full border border-line bg-canvas px-2 py-0.5 text-[0.68rem] font-semibold text-muted">{c}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Scene 4 — scheduled + dispatched */}
          <div className="obf-scene" style={{ animationDelay: "6s" }}>
            <div className="obf-card">
              <div className="flex items-center gap-2">
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-blue/10 text-blue"><IconCal /></span>
                <div>
                  <p className="text-[0.82rem] font-bold text-navy">Friday · 3&ndash;5 PM</p>
                  <p className="text-[0.72rem] text-muted">Assigned to Luis</p>
                </div>
              </div>
              <div className="obf-route relative mt-4 h-8">
                <span className="obf-road" />
                <span className="obf-van"><IconVan /></span>
                <span className="obf-pin absolute right-0 top-1/2 -translate-y-1/2"><IconPin /></span>
              </div>
            </div>
          </div>

          {/* Scene 5 — done */}
          <div className="obf-scene" style={{ animationDelay: "8s" }}>
            <div className="obf-card items-center text-center">
              <span className="obf-done grid h-16 w-16 place-items-center rounded-full bg-green/15 text-green"><IconCheckBig /></span>
              <p className="mt-3 text-[0.95rem] font-extrabold text-navy">Job completed</p>
              <p className="text-[0.78rem] text-muted">Upstairs A/C back online.</p>
            </div>
          </div>

          {/* Scene 6 — paid */}
          <div className="obf-scene" style={{ animationDelay: "10s" }}>
            <div className="obf-card">
              <div className="flex items-center justify-between">
                <p className="text-[0.8rem] font-semibold text-muted">Invoice #1042</p>
                <span className="obf-stamp rounded-md border-2 border-green px-2 py-0.5 text-[0.72rem] font-extrabold uppercase tracking-wide text-green">Paid</span>
              </div>
              <p className="mt-1 text-[1.6rem] font-extrabold tracking-tight text-navy">$285.00</p>
              <p className="mt-1 text-[0.75rem] text-muted">Paid by card · tap to pay link</p>
              <div className="mt-3 h-8 rounded-lg bg-gradient-to-r from-blue to-[#0b6cc0]" />
            </div>
          </div>
        </div>

        {/* footer: sequence dots + caption */}
        <div className="border-t border-line bg-canvas px-4 py-3">
          <div className="relative h-4">
            {SCENES.map((label, i) => (
              <p key={label} className="obf-cap absolute inset-0 text-center text-[0.74rem] font-semibold text-navy" style={{ animationDelay: `${i * 2}s` }}>
                {label}
              </p>
            ))}
          </div>
          <div className="mt-2 flex items-center justify-center gap-1.5">
            {SCENES.map((label, i) => (
              <span key={label} className="relative h-1.5 w-6 overflow-hidden rounded-full bg-line">
                <span className="obf-fill absolute inset-0 rounded-full bg-gradient-to-r from-blue to-green" style={{ animationDelay: `${i * 2}s` }} />
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---- tiny inline glyphs ---- */
function IconPhone() {
  return (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" /></svg>);
}
function IconCheck() {
  return (<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>);
}
function IconCheckBig() {
  return (<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>);
}
function IconCal() {
  return (<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>);
}
function IconVan() {
  return (<svg width="24" height="18" viewBox="0 0 24 24" fill="#008FE0"><path d="M3 5h11a1 1 0 0 1 1 1v9H2V6a1 1 0 0 1 1-1z" /><path d="M15 8h4l3 3v4h-7V8z" /><circle cx="7" cy="17" r="2" fill="#04034F" /><circle cx="18" cy="17" r="2" fill="#04034F" /></svg>);
}
function IconPin() {
  return (<svg width="16" height="16" viewBox="0 0 24 24" fill="#1CDB96"><path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z" /></svg>);
}

const css = `
.obf-stage { height: 230px; }
.obf-scene {
  position: absolute; inset: 0; display: grid; place-items: center; padding: 18px;
  opacity: 0; animation: obf-win 12s linear infinite both;
}
.obf-card {
  width: 100%; max-width: 300px; display: flex; flex-direction: column;
  border-radius: 16px; border: 1px solid var(--line, #E6E4DE); background: #fff;
  box-shadow: 0 8px 24px rgba(4,3,79,0.08); padding: 16px;
}
@keyframes obf-win {
  0%   { opacity: 0; transform: translateY(10px) scale(.98); }
  2%   { opacity: 1; transform: translateY(0) scale(1); }
  13%  { opacity: 1; transform: translateY(0) scale(1); }
  16.6%{ opacity: 0; transform: translateY(-8px) scale(.98); }
  100% { opacity: 0; transform: translateY(-8px) scale(.98); }
}
.obf-cap { opacity: 0; animation: obf-win 12s linear infinite both; }
.obf-fill { transform: scaleX(0); transform-origin: left; animation: obf-fill 12s linear infinite both; }
@keyframes obf-fill {
  0% { transform: scaleX(0); } 2% { transform: scaleX(1); }
  16.6% { transform: scaleX(1); } 16.7% { transform: scaleX(0); } 100% { transform: scaleX(0); }
}
.obf-live { animation: obf-blink 1.4s ease-in-out infinite; }
@keyframes obf-blink { 0%,100%{opacity:1} 50%{opacity:.3} }
.obf-ring { position: relative; }
.obf-ring::after {
  content:""; position:absolute; inset:0; border-radius:9999px; border:2px solid #008FE0;
  animation: obf-ping 1.4s ease-out infinite;
}
@keyframes obf-ping { 0%{transform:scale(1);opacity:.7} 100%{transform:scale(1.8);opacity:0} }
.obf-pulse { background: rgba(0,143,224,.08); }
.obf-pulse::after {
  content:""; position:absolute; inset:0; border-radius:16px; border:2px solid #1CDB96;
  animation: obf-ping 1.6s ease-out infinite;
}
.obf-bar { width: 4px; height: 8px; border-radius: 3px; background: #008FE0; animation: obf-wave .9s ease-in-out infinite alternate; }
@keyframes obf-wave { from { height: 6px; } to { height: 22px; } }
.obf-road { position:absolute; left:0; right:0; top:50%; height:2px; background:repeating-linear-gradient(90deg,#CBD2DB 0 6px,transparent 6px 12px); }
.obf-van { position:absolute; top:50%; left:0; transform:translate(-4px,-60%); animation: obf-drive 12s linear infinite both; }
@keyframes obf-drive { 0%{left:-6%} 50%{left:-6%} 62%{left:78%} 66%{left:78%} 100%{left:78%} }
.obf-pin { color:#1CDB96; }
.obf-done { animation: obf-pop .6s ease-out both; animation-delay: inherit; }
.obf-done svg { animation: obf-pop 12s ease-out infinite both; }
@keyframes obf-pop { 0%{transform:scale(.4);opacity:0} 4%{transform:scale(1.08);opacity:1} 8%{transform:scale(1)} 100%{transform:scale(1)} }
.obf-stamp { animation: obf-stamp 12s ease-out infinite both; }
@keyframes obf-stamp {
  0%{transform:scale(1.6) rotate(-16deg);opacity:0}
  3%{transform:scale(1) rotate(-10deg);opacity:1}
  16%{opacity:1} 17%{opacity:1} 100%{opacity:1; transform:rotate(-10deg)}
}
@media (prefers-reduced-motion: reduce) {
  .obf-scene,.obf-cap,.obf-fill,.obf-bar,.obf-van,.obf-ring::after,.obf-pulse::after,.obf-live { animation: none; }
  .obf-scene:first-of-type,.obf-cap:first-of-type { opacity: 1; }
  .obf-fill { transform: scaleX(1); }
}
`;
