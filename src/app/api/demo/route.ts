import { NextResponse } from "next/server";

// Lead-capture endpoint for the /demo form.
//
// Right now this validates the submission and acknowledges it (the lead is
// logged server-side). To actually deliver leads, wire the marked spot below
// to one of: an email send (Resend/SendGrid), a CRM (HubSpot/Salesforce), a
// Slack webhook, or a database. Nothing here sends data to a third party yet.

type DemoLead = {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  industry?: string;
  teamSize?: string;
  message?: string;
};

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export async function POST(req: Request) {
  let lead: DemoLead;
  try {
    lead = (await req.json()) as DemoLead;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request." },
      { status: 400 }
    );
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

  // ----- Wire your lead destination here (email / CRM / Slack / DB) -----
  console.log("[oneby demo request]", {
    name,
    email,
    phone,
    company,
    industry: lead.industry ?? "",
    teamSize: lead.teamSize ?? "",
    message: lead.message?.trim() ?? "",
    receivedAt: new Date().toISOString(),
  });
  // ----------------------------------------------------------------------

  return NextResponse.json({ ok: true });
}
