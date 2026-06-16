# OneBy — Demo Website

Marketing site for **OneBy**, _The AI Communications OS for Small Business_.

> Never miss a customer because you're busy. When you can't pick up, OneBy's AI
> answers, captures the details, and turns the conversation into a summary and a
> task — automatically.

Built around the core product story: **Call → AI → Summary → Task → Resolution.**

## Tech stack

- **Next.js 16** (App Router) + **React 19**
- **Tailwind CSS v4** (CSS-first config; brand tokens in `src/app/globals.css`)
- **TypeScript**
- **lucide-react** icons
- **Inter** via `next/font`

## Brand

Design tokens are sourced from the OneBy Universal Brand Guide:

| Token | Hex | Use |
| --- | --- | --- |
| Deep Navy | `#04034F` | Headings, dark surfaces, primary brand |
| Professional Blue | `#008FE0` | Primary actions, links, interactive |
| Accent Green | `#1CDB96` | Success, highlights, call indicators |

Logos live in `public/brand/`. Full guide and the original brief are in `docs/`.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
```

> **Note:** This repo lives in OneDrive. If `npm install` ever hits file-lock
> errors, pause OneDrive sync during installs, or move the project outside the
> synced folder.

## Homepage structure

`src/app/page.tsx` composes 14 sections from `src/components/`:

Nav · Hero · LogoCloud · Problem · Solution · HowItWorks · Features ·
ReceptionistDemo (interactive) · Stories · Industries · Comparison · Pricing ·
FAQ (accordion) · CTA · Footer

## Docs

- `docs/brief/website-prompt.txt` — the original product/positioning brief
- `docs/brief/wordpress-seo-handoff.txt` — separate WordPress SEO project (not part of this site)
