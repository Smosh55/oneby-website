import { NextResponse } from "next/server";
import { deliverLead } from "@/lib/leads";

// Onboarding slot request from /onboarding (the free-year in-person flow).
// The customer picks a day and a time window; we confirm by text. Same
// delivery pipe as /api/waitlist and /api/demo.

type OnboardingBody = {
  name?: string;
  email?: string;
  phone?: string;
  claimCode?: string;
  day?: string;
  window?: string;
  source?: string;
  // honeypot: real users never fill this
  website?: string;
};

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

const LIMITS: Record<string, number> = {
  name: 120,
  email: 200,
  phone: 40,
  claimCode: 10,
  day: 60,
  window: 40,
  source: 200,
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

  let body: OnboardingBody;
  try {
    body = (await req.json()) as OnboardingBody;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: accept silently so the bot thinks it succeeded.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  for (const [key, max] of Object.entries(LIMITS)) {
    const v = body[key as keyof OnboardingBody];
    if (typeof v === "string" && v.length > max) {
      return NextResponse.json(
        { ok: false, error: "That submission looks too long." },
        { status: 400 }
      );
    }
  }

  const name = body.name?.trim();
  const email = body.email?.trim();
  const phone = body.phone?.trim() ?? "";
  const day = body.day?.trim();
  const timeWindow = body.window?.trim();

  if (!name || !email || !day || !timeWindow) {
    return NextResponse.json(
      { ok: false, error: "Please fill in your details and pick a time." },
      { status: 400 }
    );
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { ok: false, error: "That email doesn't look right. Mind checking it?" },
      { status: 400 }
    );
  }
  const phoneDigits = phone.replace(/\D/g, "");
  if (phoneDigits.length < 10 || phoneDigits.length > 15) {
    return NextResponse.json(
      { ok: false, error: "We confirm your slot by text, so we need a real phone number." },
      { status: 400 }
    );
  }
  const claimCode = body.claimCode?.trim() ?? "";
  if (claimCode && !/^\d{5}$/.test(claimCode)) {
    return NextResponse.json(
      { ok: false, error: "That claim code doesn't look right. It's the 5 digits written on your brochure." },
      { status: 400 }
    );
  }

  const clean = {
    kind: "onboarding" as const,
    name,
    email,
    phone,
    claimCode,
    source: body.source?.trim() ?? "",
    message: `Requested onboarding slot: ${day}, ${timeWindow}`,
    receivedAt: new Date().toISOString(),
  };

  const delivered = await deliverLead(clean);
  if (!delivered) console.log("[oneby onboarding]", clean);

  return NextResponse.json({ ok: true });
}
