// Hero animation: a real-looking OneBy customer timeline that BUILDS as one
// job moves from call to paid. Slow, deliberate, product-real (not a
// motion-graphic slideshow). Pure CSS, ~18s loop, a few KB. Lives on the right
// of the hero; swap for a Lottie/MP4 later without touching the layout.

export default function HeroFlow() {
  return (
    <div className="obf-root relative mx-auto w-full max-w-lg select-none">
      <style>{css}</style>

      {/* app window */}
      <div className="overflow-hidden rounded-[22px] border border-line bg-white shadow-[var(--shadow-xl)]">
        {/* header chrome */}
        <div className="flex items-center justify-between border-b border-line bg-canvas px-5 py-3">
          <div className="flex items-center gap-2.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/oneby-logo.svg" alt="OneBy" className="h-5 w-auto" />
            <span className="text-[0.78rem] font-semibold text-muted">Maria G.</span>
          </div>
          <span className="inline-flex items-center gap-1.5 text-[0.72rem] font-semibold text-muted">
            <span className="h-2 w-2 rounded-full bg-green obf-live" /> Live
          </span>
        </div>

        {/* timeline */}
        <div className="obf-timeline relative px-5 py-5">
          <span className="obf-rail" aria-hidden />

          {/* 1 — incoming call */}
          <div className="obf-row obf-r1">
            <span className="obf-node obf-node-blue"><IconPhone /></span>
            <div className="obf-body">
              <div className="obf-line1">
                <span className="obf-title">Incoming call</span>
                <span className="obf-time">2:14 PM</span>
              </div>
              <p className="obf-sub">Maria G. &middot; (602) 555-0192</p>
              <p className="obf-sub obf-ai">OneBy answered &middot; 0:38 &middot; &ldquo;A/C out, needs same-day&rdquo;</p>
            </div>
          </div>

          {/* 2 — ticket opened */}
          <div className="obf-row obf-r2">
            <span className="obf-node obf-node-navy"><IconTicket /></span>
            <div className="obf-body">
              <div className="obf-line1">
                <span className="obf-title">Ticket #1042 opened</span>
                <span className="obf-time">2:14 PM</span>
              </div>
              <p className="obf-sub">Upstairs A/C not cooling. Same-day.</p>
              <div className="obf-chips">
                <span className="obf-chip">HVAC</span>
                <span className="obf-chip">Same-day</span>
              </div>
            </div>
          </div>

          {/* 3 — scheduled */}
          <div className="obf-row obf-r3">
            <span className="obf-node obf-node-blue"><IconCal /></span>
            <div className="obf-body">
              <div className="obf-line1">
                <span className="obf-title">Scheduled</span>
                <span className="obf-time">2:15 PM</span>
              </div>
              <p className="obf-sub">Friday 3&ndash;5 PM &middot; assigned to Luis</p>
            </div>
          </div>

          {/* 4 — completed */}
          <div className="obf-row obf-r4">
            <span className="obf-node obf-node-green"><IconCheck /></span>
            <div className="obf-body">
              <div className="obf-line1">
                <span className="obf-title">Job completed</span>
                <span className="obf-time">4:52 PM</span>
              </div>
              <p className="obf-sub">Upstairs A/C back online.</p>
            </div>
          </div>

          {/* 5 — paid */}
          <div className="obf-row obf-r5">
            <span className="obf-node obf-node-green"><IconDollar /></span>
            <div className="obf-body">
              <div className="obf-line1">
                <span className="obf-title">Invoice paid</span>
                <span className="obf-time">4:58 PM</span>
              </div>
              <div className="obf-paidrow">
                <span className="obf-amount">$285.00</span>
                <span className="obf-paid">PAID</span>
              </div>
              <p className="obf-sub">Paid by card &middot; tap-to-pay link</p>
            </div>
          </div>
        </div>

        {/* footer */}
        <div className="border-t border-line bg-canvas px-5 py-3 text-center">
          <p className="text-[0.76rem] font-semibold text-navy">One call, from the first ring to paid.</p>
        </div>
      </div>
    </div>
  );
}

/* ---- inline glyphs ---- */
function IconPhone() {
  return (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" /></svg>);
}
function IconTicket() {
  return (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v1a2 2 0 0 0 0 4v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1a2 2 0 0 0 0-4z" /></svg>);
}
function IconCal() {
  return (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>);
}
function IconCheck() {
  return (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>);
}
function IconDollar() {
  return (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>);
}

const css = `
.obf-timeline { min-height: 340px; }
.obf-rail {
  position: absolute; left: 34px; top: 34px; bottom: 34px; width: 2px;
  background: linear-gradient(#E6E4DE, #E6E4DE);
}
.obf-row {
  position: relative; display: grid; grid-template-columns: 34px 1fr; gap: 14px;
  padding: 9px 0; opacity: 0;
}
.obf-node {
  z-index: 1; display: grid; place-items: center; width: 34px; height: 34px;
  border-radius: 50%; color: #fff; box-shadow: 0 2px 6px rgba(4,3,79,0.12);
}
.obf-node-blue { background: #008FE0; }
.obf-node-navy { background: #04034F; }
.obf-node-green { background: #1CDB96; }
.obf-body { padding-top: 1px; }
.obf-line1 { display: flex; align-items: baseline; justify-content: space-between; gap: 8px; }
.obf-title { font-size: 0.95rem; font-weight: 700; color: #04034F; }
.obf-time { font-size: 0.72rem; color: #9A958D; white-space: nowrap; }
.obf-sub { margin-top: 2px; font-size: 0.82rem; line-height: 1.35; color: #6b6660; }
.obf-ai { color: #0b6cc0; font-weight: 500; }
.obf-chips { margin-top: 7px; display: flex; gap: 6px; }
.obf-chip { font-size: 0.68rem; font-weight: 600; color: #6b6660; background: #F4F2EE; border: 1px solid #E6E4DE; border-radius: 999px; padding: 2px 9px; }
.obf-paidrow { margin-top: 3px; display: flex; align-items: center; gap: 10px; }
.obf-amount { font-size: 1.25rem; font-weight: 800; letter-spacing: -0.01em; color: #04034F; }
.obf-paid { font-size: 0.68rem; font-weight: 800; letter-spacing: 0.04em; color: #1CDB96; border: 2px solid #1CDB96; border-radius: 6px; padding: 1px 7px; transform: rotate(-6deg); }

.obf-live { animation: obf-blink 1.8s ease-in-out infinite; }
@keyframes obf-blink { 0%,100%{opacity:1} 50%{opacity:.25} }

/* Each row slides + fades in at its moment, holds the whole time, then the
   timeline gently resets. Slow and deliberate over an 18s loop. */
.obf-r1 { animation: obf-r1 18s ease-out infinite both; }
.obf-r2 { animation: obf-r2 18s ease-out infinite both; }
.obf-r3 { animation: obf-r3 18s ease-out infinite both; }
.obf-r4 { animation: obf-r4 18s ease-out infinite both; }
.obf-r5 { animation: obf-r5 18s ease-out infinite both; }
@keyframes obf-r1 { 0%{opacity:0;transform:translateY(12px)} 2%{opacity:0;transform:translateY(12px)} 6%{opacity:1;transform:translateY(0)} 92%{opacity:1} 97%{opacity:0;transform:translateY(-6px)} 100%{opacity:0} }
@keyframes obf-r2 { 0%,19%{opacity:0;transform:translateY(12px)} 24%{opacity:1;transform:translateY(0)} 92%{opacity:1} 97%{opacity:0;transform:translateY(-6px)} 100%{opacity:0} }
@keyframes obf-r3 { 0%,38%{opacity:0;transform:translateY(12px)} 43%{opacity:1;transform:translateY(0)} 92%{opacity:1} 97%{opacity:0;transform:translateY(-6px)} 100%{opacity:0} }
@keyframes obf-r4 { 0%,57%{opacity:0;transform:translateY(12px)} 62%{opacity:1;transform:translateY(0)} 92%{opacity:1} 97%{opacity:0;transform:translateY(-6px)} 100%{opacity:0} }
@keyframes obf-r5 { 0%,74%{opacity:0;transform:translateY(12px)} 79%{opacity:1;transform:translateY(0)} 92%{opacity:1} 97%{opacity:0;transform:translateY(-6px)} 100%{opacity:0} }

@media (prefers-reduced-motion: reduce) {
  .obf-row { opacity: 1 !important; transform: none !important; animation: none !important; }
  .obf-live { animation: none; }
}
`;
