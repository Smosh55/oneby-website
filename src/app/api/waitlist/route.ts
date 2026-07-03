import { NextResponse } from "next/server";
import { deliverLead } from "@/lib/leads";

// Low-friction waitlist signup: name + email (+ optional industry, source, and
// ?ref= referral credit). Same delivery pipe as /api/demo.

type WaitlistBody = {
  name?: string;
  email?: string;
  industry?: string;
  source?: string;
  ref?: string;
  // honeypot: real users never fill this
  website?: string;
};

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

const LIMITS: Record<string, number> = {
  name: 120,
  email: 200,
  industry: 80,
  source: 200,
  ref: 200,
};

const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 8;
const hits = new Map<string, { count: number; resetAt: number }>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  if (hits.size > 5000) hits.clear();
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

  let body: WaitlistBody;
  try {
    body = (await req.json()) as WaitlistBody;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: accept silently so the bot thinks it succeeded.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  for (const [key, max] of Object.entries(LIMITS)) {
    const v = body[key as keyof WaitlistBody];
    if (typeof v === "string" && v.length > max) {
      return NextResponse.json(
        { ok: false, error: "That submission looks too long." },
        { status: 400 }
      );
    }
  }

  const name = body.name?.trim();
  const email = body.email?.trim();
  if (!name || !email) {
    return NextResponse.json(
      { ok: false, error: "Please fill in your name and email." },
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
    kind: "waitlist" as const,
    name,
    email,
    industry: body.industry?.trim() ?? "",
    source: body.source?.trim() ?? "",
    ref: body.ref?.trim() ?? "",
    receivedAt: new Date().toISOString(),
  };

  const delivered = await deliverLead(clean);
  if (!delivered) console.log("[oneby waitlist]", clean);

  return NextResponse.json({ ok: true });
}
