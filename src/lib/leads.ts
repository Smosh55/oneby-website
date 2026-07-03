// Shared lead-delivery for the demo and waitlist endpoints. Sends to every
// configured destination; failures are logged, never thrown.

export type CleanLead = {
  kind: "demo" | "waitlist";
  name: string;
  email: string;
  phone?: string;
  company?: string;
  industry?: string;
  teamSize?: string;
  provider?: string;
  source?: string;
  ref?: string;
  message?: string;
  receivedAt: string;
};

export function leadText(l: CleanLead): string {
  const title =
    l.kind === "waitlist"
      ? `New waitlist signup — ${l.name}`
      : `New demo request — ${l.name} (${l.company})`;
  const lines = [
    title,
    "",
    `Email:     ${l.email}`,
    ...(l.phone ? [`Phone:     ${l.phone}`] : []),
    ...(l.company ? [`Company:   ${l.company}`] : []),
    `Industry:  ${l.industry || "—"}`,
    ...(l.teamSize ? [`Team size: ${l.teamSize}`] : []),
    ...(l.provider ? [`Provider:  ${l.provider}`] : []),
    `Source:    ${l.source || "—"}`,
    ...(l.ref ? [`Referred by: ${l.ref}`] : []),
    ...(l.message ? ["", "Message:", l.message] : []),
    "",
    `Received ${l.receivedAt}`,
  ];
  return lines.join("\n");
}

export async function deliverLead(l: CleanLead): Promise<boolean> {
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
  const from = process.env.LEAD_EMAIL_FROM || "OneBy Leads <leads@oneby.ai>";
  const subject =
    l.kind === "waitlist"
      ? `Waitlist: ${l.name}${l.industry ? ` (${l.industry})` : ""}${l.ref ? " — referred" : ""}`
      : `Demo request: ${l.name} — ${l.company}${l.industry ? ` (${l.industry})` : ""}`;
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
      subject,
      text: leadText(l),
    }),
  });
  if (!res.ok) {
    console.error("[lead email] failed:", res.status, await res.text().catch(() => ""));
    return false;
  }
  return true;
}
