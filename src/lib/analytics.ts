// Lightweight client-side event tracking for the conversion funnel:
//   lead_form_started -> lead_submitted -> founder_deposit_click
// Sends to GA4 (gtag) and Plausible if either is present, and no-ops safely
// when neither is configured. Never throws, analytics must not break the UI.

type Props = Record<string, string | number | boolean | undefined>;

export function track(event: string, props: Props = {}) {
  if (typeof window === "undefined") return;
  const w = window as unknown as {
    gtag?: (...args: unknown[]) => void;
    plausible?: (e: string, opts?: { props: Props }) => void;
  };
  try {
    w.gtag?.("event", event, props);
    w.plausible?.(event, { props });
    if (process.env.NODE_ENV !== "production") {
      console.debug("[track]", event, props);
    }
  } catch {
    /* swallow */
  }
}

// Where the visitor came from, for attribution. UTM params win; otherwise the
// referring domain; otherwise "direct".
export function getSource(): string {
  if (typeof window === "undefined") return "";
  try {
    const p = new URLSearchParams(window.location.search);
    const utm = ["utm_source", "utm_medium", "utm_campaign"]
      .map((k) => p.get(k))
      .filter(Boolean)
      .join(" / ");
    if (utm) return utm;
    const ref = document.referrer;
    if (ref && !ref.includes(window.location.host)) return new URL(ref).hostname;
    return "direct";
  } catch {
    return "";
  }
}
