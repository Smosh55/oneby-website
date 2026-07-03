import { NextResponse } from "next/server";

// Lead-capture endpoint for the /demo form.
//
// Delivery is env-driven and layered — configure either or both:
//   LEAD_WEBHOOK_URL   POST the lead to any webhook (Slack incoming webhooks
//                      get a formatted message; anything else gets raw JSON —
//                      Zapier/Make/Discord/CRM all work).
//   RESEND_API_KEY +   Email the lead via Resend's REST API (no SDK needed).
//   LEAD_EMAIL_TO      Optional LEAD_EMAIL_FROM (defaults to Resend's
//                      onboarding sender, fine until your domain is verified).
// If neither is configured, the lead is logged server-side as a last resort.

type DemoLead = {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  industry?: string;
  teamSize?: string;
  provider?: string;
  source?: string;
  message?: string;
  // honeypot: real users never fill this (it's hidden in the form)
  website?: string;
};

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

// Per-field length caps to keep payloads sane and block junk.
const LIMITS: Record<string, number> = {
  name: 120,
  email: 200,
  phone: 40,
  company: 160,
  industry: 80,
  teamSize: 40,
  provider: 80,
  source: 200,
  message: 2000,
};

// Naive in-memory rate limit: a first line of defense against form spam and
// abuse. On serverless this is per-instance, so for production-grade limiting
// move it to a shared store (Vercel KV / Upstash).
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, { count: number; resetAt: number }>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  if (hits.size > 5000) hits.clear(); // bound memory
  const rec = hits.get(ip);
  if (!rec || now > rec.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  rec.count += 1;
  return rec.count > MAX_PER_WINDOW;
}

export async function POST(req: Request) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Please wait a moment and try again." },
      { status: 429 }
    );
  }

  let lead: DemoLead;
  try {
    lead = (await req.json()) as DemoLead;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request." },
      { status: 400 }
    );
  }

  // Honeypot: if the hidden field is filled, it's a bot. Accept silently so the
  // bot thinks it succeeded, but do nothing.
  if (typeof lead.website === "string" && lead.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  // Reject oversized fields before doing anything else.
  for (const [key, max] of Object.entries(LIMITS)) {
    const v = lead[key as keyof DemoLead];
    if (typeof v === "string" && v.length > max) {
      return NextResponse.json(
        { ok: false, error: "That submission looks too long. Mind trimming it?" },
        { status: 400 }
      );
    }
  }

  const name = lead.name?.trim();
  const email = lead.email?.trim();
  const phone = lead.phone?.trim();
  const company = lead.company?.trim();

  if (!name || !email || !phone || !company) {
    return NextResponse.json(
      { ok: false, error: "Please fill in your name, email, phone, and business." },
      { status: 400 }
    );
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { ok: false, error: "That email doesn't look right. Mind checking it?" },
      { status: 400 }
    );
  }

  const clean = {
    name,
    email,
    phone,
    company,
    industry: lead.industry ?? "",
    teamSize: lead.teamSize ?? "",
    provider: lead.provider ?? "",
    source: lead.source ?? "",
    message: lead.message?.trim() ?? "",
    receivedAt: new Date().toISOString(),
  };

  const delivered = await deliverLead(clean);
  if (!delivered) {
    // Last resort so the lead is at least recoverable from server logs.
    console.log("[oneby demo request]", clean);
  }

  return NextResponse.json({ ok: true });
}

type CleanLead = {
  name: string;
  email: string;
  phone: string;
  company: string;
  industry: string;
  teamSize: string;
  provider: string;
  source: string;
  message: string;
  receivedAt: string;
};

function leadText(l: CleanLead): string {
  return [
    `New demo request — ${l.name} (${l.company})`,
    ``,
    `Email:     ${l.email}`,
    `Phone:     ${l.phone}`,
    `Industry:  ${l.industry || "—"}`,
    `Team size: ${l.teamSize || "—"}`,
    `Provider:  ${l.provider || "—"}`,
    `Source:    ${l.source || "—"}`,
    l.message ? `\nMessage:\n${l.message}` : ``,
    ``,
    `Received ${l.receivedAt}`,
  ].join("\n");
}

// Sends the lead to every configured destination. Returns true if at least one
// delivery succeeded. Failures are logged, never thrown — the visitor already
// did their part.
async function deliverLead(l: CleanLead): Promise<boolean> {
  const results = await Promise.allSettled([sendWebhook(l), sendEmail(l)]);
  let delivered = false;
  for (const r of results) {
    if (r.status === "fulfilled" && r.value) delivered = true;
    if (r.status === "rejected") console.error("[lead delivery]", r.reason);
  }
  return delivered;
}

async function sendWebhook(l: CleanLead): Promise<boolean> {
  const url = process.env.LEAD_WEBHOOK_URL;
  if (!url) return false;
  const isSlack = url.includes("hooks.slack.com");
  const body = isSlack ? { text: leadText(l) } : l;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    console.error("[lead webhook] failed:", res.status, await res.text().catch(() => ""));
    return false;
  }
  return true;
}

async function sendEmail(l: CleanLead): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_EMAIL_TO;
  if (!key || !to) return false;
  const from = process.env.LEAD_EMAIL_FROM || "OneBy Leads <onboarding@resend.dev>";
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to,
      reply_to: l.email,
      subject: `Demo request: ${l.name} — ${l.company}${l.industry ? ` (${l.industry})` : ""}`,
      text: leadText(l),
    }),
  });
  if (!res.ok) {
    console.error("[lead email] failed:", res.status, await res.text().catch(() => ""));
    return false;
  }
  return true;
}
