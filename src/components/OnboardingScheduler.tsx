"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, CalendarCheck2, Loader2, PhoneCall } from "lucide-react";
import { track, getSource } from "@/lib/analytics";

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

const WINDOWS = ["8 to 10am", "10 to 12", "12 to 2pm", "2 to 4pm", "4 to 6pm"];

// Next N weekdays starting tomorrow, as picker options.
function upcomingWeekdays(count: number): { iso: string; label: string }[] {
  const out: { iso: string; label: string }[] = [];
  const d = new Date();
  while (out.length < count) {
    d.setDate(d.getDate() + 1);
    const dow = d.getDay();
    if (dow === 0 || dow === 6) continue;
    out.push({
      iso: d.toISOString().slice(0, 10),
      label: d.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      }),
    });
  }
  return out;
}

// The onboarding slot picker for the free-year flow. The customer picks a real
// day and time window; we confirm by text (onboarding is run personally, so
// this requests a slot rather than reading a live calendar).
export default function OnboardingScheduler() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [claimCode, setClaimCode] = useState("");
  const [day, setDay] = useState("");
  const [timeWindow, setTimeWindow] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState("");
  const honeypot = useRef<HTMLInputElement>(null);
  const source = useRef("");

  useEffect(() => {
    source.current = getSource();
  }, []);

  const days = useMemo(() => upcomingWeekdays(10), []);
  const dayLabel = days.find((d) => d.iso === day)?.label ?? "";

  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!name.trim() || !EMAIL_RE.test(email.trim())) {
      setError("A name and a real email is all we need to start.");
      return;
    }
    const digits = phone.replace(/\D/g, "");
    if (digits.length < 10) {
      setError("We confirm your slot by text, so add your mobile number.");
      return;
    }
    if (claimCode && !/^\d{5}$/.test(claimCode.trim())) {
      setError("The claim code is the 5 digits written on your brochure.");
      return;
    }
    if (!day || !timeWindow) {
      setError("Pick a day and a time window that suit you.");
      return;
    }
    setError("");
    setStatus("sending");
    try {
      const res = await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          claimCode: claimCode.trim(),
          day: dayLabel || day,
          window: timeWindow,
          source: source.current,
          website: honeypot.current?.value ?? "",
        }),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        track("onboarding_booked", { window: timeWindow, hasCode: !!claimCode });
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
      <div className="surface-card mx-auto max-w-xl rounded-2xl p-8 text-left">
        <span className="grid h-12 w-12 place-items-center rounded-full bg-green/15 text-green-600">
          <CalendarCheck2 size={22} />
        </span>
        <h2 className="mt-4 text-xl font-bold text-navy">
          You&apos;re booked, {name.split(" ")[0]}.
        </h2>
        <p className="mt-2 leading-relaxed text-muted">
          {dayLabel}, {timeWindow}. We&apos;ll confirm by text shortly. Have a
          recent phone bill handy: it has the account details we need to port
          your number.
        </p>
        <p className="mt-4 flex items-center gap-2 text-sm text-faint">
          <PhoneCall size={15} /> Need to change it? Reply to the confirmation
          text and we&apos;ll move you.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="surface-card mx-auto max-w-xl rounded-2xl p-6 text-left sm:p-8">
      {/* honeypot */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="ob-website">Leave this field empty</label>
        <input ref={honeypot} id="ob-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-2.5 sm:grid-cols-2">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          aria-label="Your name"
          autoComplete="name"
          className="rounded-xl border border-line bg-white px-4 py-3 text-[0.95rem] text-ink outline-none placeholder:text-faint focus:border-blue"
        />
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Mobile number"
          aria-label="Mobile number"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          className="rounded-xl border border-line bg-white px-4 py-3 text-[0.95rem] text-ink outline-none placeholder:text-faint focus:border-blue"
        />
      </div>
      <div className="mt-2.5 grid gap-2.5 sm:grid-cols-2">
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Work email"
          aria-label="Work email"
          type="email"
          autoComplete="email"
          className="rounded-xl border border-line bg-white px-4 py-3 text-[0.95rem] text-ink outline-none placeholder:text-faint focus:border-blue"
        />
        <input
          value={claimCode}
          onChange={(e) => setClaimCode(e.target.value.replace(/\D/g, "").slice(0, 5))}
          placeholder="Claim code (if you have one)"
          aria-label="Claim code"
          inputMode="numeric"
          autoComplete="off"
          className="rounded-xl border border-line bg-white px-4 py-3 text-[0.95rem] text-ink outline-none placeholder:text-faint focus:border-blue"
        />
      </div>

      <p className="mt-5 text-[0.8rem] font-bold uppercase tracking-wide text-faint">
        Pick a day
      </p>
      <div className="mt-2 flex flex-wrap gap-2">
        {days.map((d) => (
          <button
            key={d.iso}
            type="button"
            onClick={() => setDay(d.iso)}
            className={`rounded-xl border px-3.5 py-2 text-sm font-medium transition-colors ${
              day === d.iso
                ? "border-blue bg-blue/10 text-blue"
                : "border-line bg-white text-ink hover:border-blue/50"
            }`}
          >
            {d.label}
          </button>
        ))}
      </div>

      <p className="mt-5 text-[0.8rem] font-bold uppercase tracking-wide text-faint">
        Pick a window
      </p>
      <div className="mt-2 flex flex-wrap gap-2">
        {WINDOWS.map((w) => (
          <button
            key={w}
            type="button"
            onClick={() => setTimeWindow(w)}
            className={`rounded-xl border px-3.5 py-2 text-sm font-medium transition-colors ${
              timeWindow === w
                ? "border-blue bg-blue/10 text-blue"
                : "border-line bg-white text-ink hover:border-blue/50"
            }`}
          >
            {w}
          </button>
        ))}
      </div>

      {error && <p className="mt-3 text-sm font-medium text-[#c2492b]">{error}</p>}
      <button
        type="submit"
        disabled={status === "sending"}
        className="btn btn-primary mt-5 w-full text-base"
      >
        {status === "sending" ? (
          <>
            <Loader2 size={18} className="animate-spin" /> Booking your slot…
          </>
        ) : (
          <>
            Book my onboarding <ArrowRight size={18} />
          </>
        )}
      </button>
      <p className="mt-3 text-center text-[0.8rem] text-faint">
        Twenty minutes by phone. We confirm your slot by text.
      </p>
    </form>
  );
}
