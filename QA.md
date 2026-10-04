# Verification — redesign, 4 October 2026

## Build

- `npm run check`: 0 errors, 0 warnings, 0 hints.
- `npm run build`: 34 static pages (33 public routes + 404).
- Production bundle: ~73 KB CSS and ~16 KB JS before compression; no framework or animation-library runtime.

## Automated browser checks (headless Chromium, local dev server)

- Hero lift opens on load. ▲ advances to floor 02 (Architectural Gold) and ▼ returns to floor 01.
- Video dialog opens from "Watch the film" and closes on Escape.
- The panel finish selector updates the preview and the product link (Rose Gold → `/products/rose-gold-panel/`).
- The cabin lightbox opens from the pinned gallery (1 / 10), and "next" moves to Reflective Silver.
- The floor indicator shows 07 at the video floor.
- The video reel auto-scrolls on desktop (1440) and mobile (390). It pauses while hovered or touched, and on focus.
- Cabin filter "Copper & warm" shows 3 designs.
- The enquiry form prefills interest, design and building from the URL, and submitting prepares a `mailto:sales@bkelevator.in` draft. No email is sent.
- The mobile menu (door animation) opens and closes, and the header quote button is hidden under 560px.
- 85 unique internal links and media assets across all sitemap routes return HTTP 200.
- No page errors were recorded.
- No horizontal overflow at 390px.

## Visual review

Screenshots of every homepage floor were reviewed at 1440×900 and 390×844. The About, Cabins, Products, Panel detail, Technical, Mechanism, Installation, Videos, Partners and Contact pages were reviewed at 1440×900. Cabins, Mechanism and Contact were also reviewed at 390×844.

## Generated images

- 7 sector images were generated with `gemini-3.1-flash-lite-image` at 1K and saved as WebP (29–107 KB each, ~534 KB in total) in `public/images/generated/`. Each was reviewed: no text, logos or watermarks.
- The sector cards switch to the photographic style; all 7 are present in `dist/index.html`.

## Not yet done

- No manual screen-reader audit has been done since the redesign.
- The site has not been deployed.
