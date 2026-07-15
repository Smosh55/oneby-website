// Lightweight client-side event tracking for the conversion funnel:
//   lead_form_started -> lead_submitted -> founder_deposit_click
// Sends to GA4 (gtag) and Plausible if either is present, and no-ops safely
// when neither is configured. Never throws, analytics must not break the UI.

type Props = Record<string, string | number | boolean | undefined>;

// Which landing-page A/B variant this visitor was served ("ai" | "org"), set as
// a cookie by middleware. Tagging every event with it is what lets us compare
// conversion rate per variant instead of just raw traffic.
function variant(): string | undefined {
  if (typeof document === "undefined") return undefined;
  const m = document.cookie.match(/(?:^|;\s*)ob-variant=(ai|org)\b/);
  return m?.[1];
}

export function track(event: string, props: Props = {}) {
  if (typeof window === "undefined") return;
  const w = window as unknown as {
    gtag?: (...args: unknown[]) => void;
    plausible?: (e: string, opts?: { props: Props }) => void;
  };
  const v = variant();
  const tagged: Props = v ? { variant: v, ...props } : props;
  try {
    w.gtag?.("event", event, tagged);
    w.plausible?.(event, { props: tagged });
    if (process.env.NODE_ENV !== "production") {
      console.debug("[track]", event, tagged);
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
