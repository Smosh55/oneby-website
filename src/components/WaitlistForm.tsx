"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Check, Copy, Loader2, PartyPopper } from "lucide-react";
import { industries } from "@/data/industries";
import { useSiteIndustry } from "@/lib/useSiteIndustry";
import { track, getSource } from "@/lib/analytics";

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

// Low-friction waitlist signup (name + email + industry). On success it flips
// to the two highest-value asks at the moment of peak intent: lock founding
// pricing (revenue now) and share a referral link (growth loop — referrals are
// credited via ?ref= on the signup that follows).
export default function WaitlistForm() {
  const siteIndustry = useSiteIndustry();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [industry, setIndustry] = useState(siteIndustry?.shortName ?? "");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const honeypot = useRef<HTMLInputElement>(null);
  const source = useRef("");
  const ref = useRef("");

  useEffect(() => {
    source.current = getSource();
    try {
      ref.current = new URLSearchParams(window.location.search).get("ref") ?? "";
    } catch {
      /* no-op */
    }
  }, []);

  const shareUrl = () => {
    const base =
      typeof window !== "undefined" ? window.location.origin : "https://oneby.ai";
    return `${base}/?ref=${encodeURIComponent(email.trim())}`;
  };

  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!name.trim() || !EMAIL_RE.test(email.trim())) {
      setError("A name and a real email is all we need.");
      return;
    }
    setError("");
    setStatus("sending");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          industry,
          source: source.current,
          ref: ref.current,
          website: honeypot.current?.value ?? "",
        }),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        track("waitlist_submitted", { industry, source: source.current, referred: !!ref.current });
        setStatus("done");
      } else {
        setError(data.error || "Something went wrong. Try again?");
        setStatus("error");
      }
    } catch {
      setError("Couldn't reach the server. Try again in a moment.");
      setStatus("error");
    }
  };

  if (status === "done") {
    return (
      <div className="mx-auto max-w-xl rounded-2xl border border-line bg-white p-7 text-left shadow-[var(--shadow-lg)]">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-green/15 text-green-600">
            <PartyPopper size={20} />
          </span>
          <div>
            <p className="text-lg font-bold text-navy">You&apos;re on the list, {name.split(" ")[0]}.</p>
            <p className="text-sm text-muted">We&apos;ll email you the moment doors open.</p>
          </div>
        </div>

        {/* Peak-intent upsell: founding pricing */}
        <a
          href="/founders"
          onClick={() => track("waitlist_founders_click", { industry })}
          className="mt-5 flex items-center justify-between rounded-xl border border-green/30 bg-green/[0.07] px-4 py-3.5 transition-colors hover:border-green/60"
        >
          <span>
            <span className="block text-[0.95rem] font-bold text-navy">
              Skip the line: become a founding member
            </span>
            <span className="block text-[0.82rem] text-muted">
              Lock your founder rate for two years. Limited spots.
            </span>
          </span>
          <ArrowRight size={18} className="shrink-0 text-green-600" />
        </a>

        {/* Referral loop */}
        <div className="mt-4 rounded-xl border border-line bg-canvas px-4 py-3.5">
          <p className="text-[0.85rem] font-semibold text-navy">
            Know another owner who lives on the phone?
          </p>
          <div className="mt-2 flex items-center gap-2">
            <code className="min-w-0 flex-1 truncate rounded-lg border border-line bg-white px-3 py-2 text-[0.78rem] text-muted">
              {shareUrl()}
            </code>
            <button
              type="button"
              onClick={() => {
                navigator.clipboard?.writeText(shareUrl());
                setCopied(true);
                track("waitlist_share_copied", {});
                setTimeout(() => setCopied(false), 2000);
              }}
              className="btn btn-navy shrink-0 !min-h-[38px] !px-3 text-sm"
            >
              {copied ? <Check size={15} /> : <Copy size={15} />}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="mx-auto max-w-xl text-left">
      {/* honeypot */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="wl-website">Leave this field empty</label>
        <input ref={honeypot} id="wl-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-2.5 sm:grid-cols-2">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          aria-label="Your name"
          autoComplete="name"
          className="rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-[0.95rem] text-white outline-none placeholder:text-white/50 focus:border-green"
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Work email"
          aria-label="Work email"
          type="email"
          autoComplete="email"
          className="rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-[0.95rem] text-white outline-none placeholder:text-white/50 focus:border-green"
        />
      </div>
      {!siteIndustry && (
        <select
          value={industry}
          onChange={(e) => setIndustry(e.target.value)}
          aria-label="Your industry"
          className={`mt-2.5 w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-[0.95rem] outline-none focus:border-green ${industry ? "text-white" : "text-white/50"}`}
        >
          <option value="" className="text-ink">What&apos;s your trade? (optional)</option>
          {industries.map((i) => (
            <option key={i.slug} value={i.shortName} className="text-ink">
              {i.shortName}
            </option>
          ))}
          <option value="Other" className="text-ink">Other</option>
        </select>
      )}
      {error && <p className="mt-2 text-sm font-medium text-[#ffb4a8]">{error}</p>}
      <button
        type="submit"
        disabled={status === "sending"}
        className="btn btn-primary mt-3 w-full text-base"
      >
        {status === "sending" ? (
          <>
            <Loader2 size={18} className="animate-spin" /> Saving your spot…
          </>
        ) : (
          <>
            Save my spot <ArrowRight size={18} />
          </>
        )}
      </button>
      <p className="mt-3 text-center text-[0.8rem] text-white/50">
        No spam, no card. Just first dibs when doors open.
      </p>
    </form>
  );
}
