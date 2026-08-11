# Low-voltage contractor site (standalone, reusable)

A single-file static site: no build step, no dependencies. Deploy the folder
anywhere (Vercel, Netlify, any host) and it just works.

## Set it up (2 minutes)

1. **Brand it.** Open `index.html`. The very first `<script>` block at the top
   is the ONLY thing to edit: company name, tagline, phone (display + tel:
   format), email, service area, license line. Every button, header, and
   footer fills itself from that block.
2. **Drop in the job photos.** Put the four rack photos in `images/` named:
   - `work-1.jpg`, dressed/bundled cable runs (tall shot)
   - `work-2.jpg`, patch panels mid-build
   - `work-3.jpg`, finished labeled rack with the camera NVR screen
   - `work-4.jpg`, overhead ladder-rack pathways

   No cropping needed: the gallery crops them automatically (CSS object-fit).
   Until the files exist, branded placeholders render so the site never looks
   broken. Add more shots by copying a `<figure class="shot">` block.

## Deploy

- Easiest: go to vercel.com/new, drag this folder in, done.
- Or from a terminal in this folder: `npx vercel --prod`
- Point the business domain at it in the Vercel dashboard when ready.

## Reuse for another brand or trade

Copy the folder, change the config block, swap the photos, adjust the four
service cards. Colors are CSS variables at the top of the stylesheet
(`--accent` is the cable yellow; swap it and the whole site rethemes).
