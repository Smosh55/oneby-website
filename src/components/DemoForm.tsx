"use client";

import { useState } from "react";
import { Check, Loader2, CalendarCheck } from "lucide-react";
import { industries } from "@/data/industries";

type Fields = {
  name: string;
  email: string;
  phone: string;
  company: string;
  industry: string;
  teamSize: string;
  message: string;
};

const empty: Fields = {
  name: "",
  email: "",
  phone: "",
  company: "",
  industry: "",
  teamSize: "",
  message: "",
};

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const teamSizes = ["Just me", "2 to 10", "11 to 50", "51 to 200", "200+"];

export default function DemoForm() {
  const [f, setF] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">(
    "idle"
  );
  const [serverError, setServerError] = useState("");

  const set = (k: keyof Fields, v: string) => {
    setF((p) => ({ ...p, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const validate = () => {
    const e: Partial<Record<keyof Fields, string>> = {};
    if (!f.name.trim()) e.name = "Your name, please.";
    if (!f.email.trim()) e.email = "We need an email to reach you.";
    else if (!EMAIL_RE.test(f.email.trim())) e.email = "That email looks off.";
    if (!f.phone.trim()) e.phone = "A phone number, so we can call.";
    if (!f.company.trim()) e.company = "What's the business called?";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setStatus("sending");
    setServerError("");
    try {
      const res = await fetch("/api/demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(f),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setStatus("done");
      } else {
        setServerError(data.error || "Something went wrong. Try again?");
        setStatus("error");
      }
    } catch {
      setServerError("Couldn't reach the server. Try again in a moment.");
      setStatus("error");
    }
  };

  if (status === "done") {
    return (
      <div className="surface-card flex flex-col items-center rounded-2xl p-10 text-center">
        <span className="grid h-14 w-14 place-items-center rounded-full bg-green/15 text-green-600">
          <CalendarCheck size={26} />
        </span>
        <h2 className="mt-5 text-2xl font-bold tracking-tight text-navy">
          You're on the list, {f.name.split(" ")[0]}.
        </h2>
        <p className="mt-3 max-w-sm text-[0.975rem] leading-relaxed text-muted">
          We'll reach out within one business day to set up your demo. Keep your
          phone close, we tend to practice what we preach.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      noValidate
      className="surface-card rounded-2xl p-6 sm:p-8"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          label="Full name"
          value={f.name}
          onChange={(v) => set("name", v)}
          error={errors.name}
          autoComplete="name"
        />
        <Field
          label="Work email"
          type="email"
          value={f.email}
          onChange={(v) => set("email", v)}
          error={errors.email}
          autoComplete="email"
        />
        <Field
          label="Phone"
          type="tel"
          value={f.phone}
          onChange={(v) => set("phone", v)}
          error={errors.phone}
          autoComplete="tel"
        />
        <Field
          label="Business name"
          value={f.company}
          onChange={(v) => set("company", v)}
          error={errors.company}
          autoComplete="organization"
        />
        <Select
          label="Industry"
          value={f.industry}
          onChange={(v) => set("industry", v)}
          options={[...industries.map((i) => i.shortName), "Other"]}
          placeholder="Pick one"
        />
        <Select
          label="Team size"
          value={f.teamSize}
          onChange={(v) => set("teamSize", v)}
          options={teamSizes}
          placeholder="How many of you?"
        />
      </div>

      <div className="mt-4">
        <label className="mb-2 block text-[0.8125rem] font-semibold text-navy">
          Anything we should know?{" "}
          <span className="font-normal text-faint">(optional)</span>
        </label>
        <textarea
          value={f.message}
          onChange={(e) => set("message", e.target.value)}
          rows={3}
          placeholder="How many calls a day? What's slipping through?"
          className="w-full resize-y rounded-xl border border-line bg-canvas px-4 py-3 text-[0.95rem] text-ink placeholder:text-faint focus:border-blue focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue/15"
        />
      </div>

      {status === "error" && (
        <p className="mt-4 rounded-lg bg-error/10 px-4 py-3 text-sm font-medium text-error">
          {serverError}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="btn btn-primary mt-5 w-full text-base disabled:opacity-70"
      >
        {status === "sending" ? (
          <>
            <Loader2 size={18} className="animate-spin" /> Sending...
          </>
        ) : (
          <>
            Book my demo <Check size={18} />
          </>
        )}
      </button>
      <p className="mt-3 text-center text-xs text-faint">
        No spam, no pushy sales. Just a real walkthrough.
      </p>
    </form>
  );
}

function Field({
  label,
  value,
  onChange,
  error,
  type = "text",
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-[0.8125rem] font-semibold text-navy">
        {label}
      </label>
      <input
        type={type}
        value={value}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
        className={`h-12 w-full rounded-xl border bg-canvas px-4 text-[0.95rem] text-ink placeholder:text-faint focus:bg-white focus:outline-none focus:ring-4 ${
          error
            ? "border-error focus:border-error focus:ring-error/15"
            : "border-line focus:border-blue focus:ring-blue/15"
        }`}
      />
      {error && <p className="mt-1.5 text-xs font-medium text-error">{error}</p>}
    </div>
  );
}

function Select({
  label,
  value,
  onChange,
  options,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  placeholder: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-[0.8125rem] font-semibold text-navy">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`h-12 w-full rounded-xl border border-line bg-canvas px-4 text-[0.95rem] focus:border-blue focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue/15 ${
          value ? "text-ink" : "text-faint"
        }`}
      >
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o} value={o} className="text-ink">
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}
