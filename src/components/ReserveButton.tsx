"use client";

import Link from "next/link";
import { track } from "@/lib/analytics";

// The founder "reserve" CTA. When NEXT_PUBLIC_STRIPE_DEPOSIT_URL is set it sends
// the visitor to put a refundable deposit down (the real willingness-to-pay
// signal); otherwise it falls back to the lead form. Either way it fires a
// founder_deposit_click event so the funnel is measurable.
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
  const deposit = process.env.NEXT_PUBLIC_STRIPE_DEPOSIT_URL;
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
