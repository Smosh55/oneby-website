import { NextResponse } from "next/server";
import { deliverLead } from "@/lib/leads";

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
    kind: "demo" as const,
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

