"use client";

import Link from "next/link";
import { track } from "@/lib/analytics";

// The founder "reserve" CTA. Works with ANY processor that gives hosted
// payment links (Sola, Stripe, etc.). Set a link per tier so each charges the
// right amount; NEXT_PUBLIC_STRIPE_DEPOSIT_URL acts as a catch-all fallback
// (kept under its historical name). With no link configured, falls back to
// the lead form. Every click fires founder_deposit_click so the funnel is
// measurable in GA4.
//
// NOTE: NEXT_PUBLIC_* vars are inlined at build time, so each must be
// referenced statically — no dynamic process.env lookups.
const TIER_URLS: Record<string, string | undefined> = {
  believer: process.env.NEXT_PUBLIC_DEPOSIT_URL_BELIEVER,
  "founding-solo": process.env.NEXT_PUBLIC_DEPOSIT_URL_FOUNDING_SOLO,
  "oneby-phone": process.env.NEXT_PUBLIC_DEPOSIT_URL_ONEBY_PHONE,
  "founding-pro": process.env.NEXT_PUBLIC_DEPOSIT_URL_FOUNDING_PRO,
  "office-starter": process.env.NEXT_PUBLIC_DEPOSIT_URL_OFFICE_STARTER,
  "founding-partner": process.env.NEXT_PUBLIC_DEPOSIT_URL_FOUNDING_PARTNER,
};

export default function ReserveButton({
  tier,
  label = "Reserve this tier",
  primary = false,
  className = "",
}: {
  tier: string;
  label?: string;
  primary?: boolean;
  className?: string;
}) {
  const deposit = TIER_URLS[tier] || process.env.NEXT_PUBLIC_STRIPE_DEPOSIT_URL;
  const cls = `${primary ? "btn btn-primary" : "btn btn-ghost"} ${className}`;
  const onClick = () => track("founder_deposit_click", { tier, deposit: !!deposit });

  if (deposit) {
    return (
      <a
        href={deposit}
        onClick={onClick}
        target="_blank"
        rel="noopener noreferrer"
        className={cls}
      >
        {label}
      </a>
    );
  }
  return (
    <Link href="/demo" onClick={onClick} className={cls}>
      {label}
    </Link>
  );
}
