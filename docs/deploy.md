# Deploy & launch checklist

The site is a standard Next.js App Router app. Vercel auto-detects it, no special
build config needed. This is the pre-launch runbook.

## 1. Deploy to Vercel
1. Push to `main` (already connected to the private repo).
2. In Vercel, **Import Project** from the GitHub repo. Framework preset: Next.js.
   Build command and output are auto-detected.
3. Add the env vars from `.env.example` under **Settings > Environment Variables**
   (Production + Preview):
   - `NEXT_PUBLIC_SITE_URL=https://oneby.ai` (your real domain)
   - `NEXT_PUBLIC_GA_ID` once you create a GA4 property
   - `GOOGLE_SITE_VERIFICATION` from Search Console
   - `NEXT_PUBLIC_STRIPE_DEPOSIT_URL` once you create the Stripe Payment Link
4. Add the custom domain (`oneby.ai`) under **Settings > Domains** and point DNS.

## 2. SEO go-live
- [ ] Confirm `https://oneby.ai/robots.txt` and `https://oneby.ai/sitemap.xml`
      resolve and list the real domain.
- [ ] Google Search Console: verify the domain, submit the sitemap.
- [ ] Confirm `/demo` is the only `noindex` page (intentional, it's a lead form).
- [ ] Set `NEXT_PUBLIC_SITE_URL` so canonicals, OG, and JSON-LD use the live URL.

## 3. Turn on measurement (the validation funnel)
- [ ] Create a GA4 property, set `NEXT_PUBLIC_GA_ID`.
- [ ] The funnel events fire automatically once GA4 is on:
      `lead_form_started` -> `lead_submitted` -> `founder_deposit_click`
      (each carries `source`, plus `industry` / `teamSize` / `provider`).
- [ ] In GA4, build a funnel exploration on those three events, and a report
      broken down by `source` and `industry` to see which channel and which
      trade converts. This is the whole point: read willingness-to-pay by message.

## 4. Wire the lead destination
- [ ] `/api/demo` currently validates and logs the lead server-side only. Wire the
      marked spot in `src/app/api/demo/route.ts` to a real destination: an email
      (Resend/SendGrid), a Slack webhook, a CRM, or a DB. Until then, leads only
      appear in the server logs.

## 5. The deposit (strongest signal)
- [ ] Create a refundable founder deposit as a **Stripe Payment Link**.
- [ ] Set `NEXT_PUBLIC_STRIPE_DEPOSIT_URL` to it. The founder "Reserve" buttons
      then send people to put a card down; until then they fall back to the lead
      form.

## 6. Content truth-check before launch
- [ ] Replace the placeholder testimonials in `src/components/Stories.tsx` with
      real ones (name, company, result). Invented testimonials are a trust and
      legal risk.
- [ ] Replace the placeholder logos in the logo cloud, or remove it.
- [ ] Confirm the phone number / email are real (`(626) 663-2944`,
      `support@oneby.ai`) or swap them.
- [ ] Confirm nothing claims a feature is live that launches later (the modules
      are framed as "launching with go-live", keep it that way until they ship).

## 7. Final pass
- [ ] `npm run build` is clean.
- [ ] Spot-check on a real phone (the homepage and the hero demo).
- [ ] Click the full demo loop once on production.
