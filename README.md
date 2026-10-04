# Bk Elevator Pvt. Ltd

A static Astro business website built around a ten-floor elevator journey. Uses the supplied cabin images, operating-panel images, mechanism photographs, technical references and six original videos. No stock imagery, generated videos, invented project identities, statistics or certifications.

## Local development

```sh
npm install
npm run dev
```

Default preview: http://localhost:4321. `npm run check` validates the Astro and TypeScript sources. `npm run build` creates the deployable static website in `dist/`. `npm run preview` serves that build locally.

## Website structure

The homepage is a ten-floor elevator ride from the lobby (hero) to the penthouse (CTA). A floor indicator tracks the current floor and the direction of travel.

| Floor | Section | Motion |
| --- | --- | --- |
| 01 | Hero lift: doors open on each signature cabin; ▲/▼ call buttons; LED floor readout | Door transitions, pointer tilt, rising light beams |
| 02 | Who we are | Scroll-filled statement (sticky), parallax image |
| 03 | Cabin collection | Pinned section, vertical scroll drives a horizontal gallery |
| 04 | The journey | Sticky stacked cards that scale and dim |
| 05 | Engineering + services | Clip-path zoom reveal, rising-fill service cards |
| 06 | Components | Panel finish selector, category cards |
| 07 | In motion | Self-scrolling, draggable video reel |
| 08 | Technology + brands | Outline marquees |
| 09 | Spaces we elevate | Sector cards that prefill the enquiry form |
| 10 | Your next level | Elevator doors part as you scroll |

- `src/data/site.ts`: company details, cabins (with finish tones), panels, categories, services, videos, partners, technical references, sectors and page definitions.
- `src/components/home/`: one component per homepage floor.
- `src/components/pages/`: page hero and content blocks for every inner-page type; `src/pages/[...slug].astro` routes to them.
- `src/styles/`: `base`, `layout` (header, menu, HUD, footer), `components`, `overlays` (dialogs, forms), `home*`, `pages*`.
- `src/scripts/`: one shared scroll loop (`scroll.ts`) plus focused modules: `nav`, `reveal`, `hero`, `scenes`, `interact`, `media`, `form`.

Buttons use a slow gold→amber→copper colour flow, with a fill that rises from the bottom on hover or tap. Cards lift and tilt on hover, and on phones they respond to touch. All motion respects `prefers-reduced-motion`.

## Optional generated images

The site is complete with the supplied photography. Sector cards (Residential, Commercial, etc.) can also show photographs generated with Google's Nano Banana 2 Lite model (`gemini-3.1-flash-lite-image`, 1K, saved as WebP):

1. Add `GEMINI_API_KEY=...` to `.env` in the project root (it is git-ignored).
2. Run `npm run images:generate`. This creates at most 8 images in `public/images/generated/` and skips any that already exist.
3. Run `npm run build`. Cards whose image exists switch to the photographic style automatically; all other cards keep the icon style.

## Enquiries

The form validates contact details and prepares a reviewable email draft addressed to `sales@bkelevator.in`. It does not send, submit or store enquiries on a server. The visitor sends the message in their email app or copies the enquiry. Direct phone and email links are available throughout the site. Connecting a submission service would require a real endpoint and a corresponding privacy-policy update.

## Publishing

The build is static: upload the contents of `dist/` to a static host with directory-index support. The canonical domain, sitemap and robots file use `https://bkelevator.in`. Update these if the production domain changes. This workspace has not been deployed.

## Content provenance

The requested name is used consistently: **Bk Elevator Pvt. Ltd**. Contact details come from the supplied business card and existing company website. The business card itself is not published because it includes the previous branding. Cabin showcase labels describe visual styles, not manufacturer model names. Component brands and categories follow the supplied brief without implying official or exclusive distribution status. Technical images remain general references; no project-specific specifications are claimed.
