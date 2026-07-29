import { NextResponse } from "next/server";
import { deliverLead } from "@/lib/leads";

// Low-friction waitlist signup: name + email (+ optional industry, source, and
// ?ref= referral credit). Same delivery pipe as /api/demo.

type WaitlistBody = {
  name?: string;
  email?: string;
  phone?: string;
  industry?: string;
  source?: string;
  ref?: string;
  // 5-digit brochure claim code (in-person offer); optional site-wide,
  // required client-side on /free-year
  claimCode?: string;
  // honeypot: real users never fill this
  website?: string;
};

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

const LIMITS: Record<string, number> = {
  name: 120,
  email: 200,
  phone: 40,
  industry: 80,
  source: 200,
  ref: 200,
  claimCode: 10,
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

  // Claim code (brochure offer): optional overall, but if sent it must be
  // exactly 5 digits so a typo never silently drops rep attribution.
  const claimCode = body.claimCode?.trim() ?? "";
  if (claimCode && !/^\d{5}$/.test(claimCode)) {
    return NextResponse.json(
      { ok: false, error: "That claim code doesn't look right. It's the 5 digits written on your brochure." },
      { status: 400 }
    );
  }

  const clean = {
    kind: "waitlist" as const,
    name,
    email,
    phone: body.phone?.trim() ?? "",
    industry: body.industry?.trim() ?? "",
    source: body.source?.trim() ?? "",
    ref: body.ref?.trim() ?? "",
    claimCode,
    receivedAt: new Date().toISOString(),
  };

  const delivered = await deliverLead(clean);
  if (!delivered) console.log("[oneby waitlist]", clean);

  return NextResponse.json({ ok: true });
}
