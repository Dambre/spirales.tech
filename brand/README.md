# SPIRALES brand assets

Everything here is generated. Do not edit these files by hand — change
`scripts/generate-brand.mjs` and run:

```
npm run brand
```

PNG and ICO output needs `rsvg-convert` (`brew install librsvg`). Without it the
script still writes every SVG and warns about the rest.

## Palette

| Token   | Hex       | Use                                     |
| ------- | --------- | --------------------------------------- |
| `ink`   | `#0B0F1A` | Primary dark — badge ground, headings   |
| `paper` | `#E5E4DF` | Page ground                             |
| `white` | `#FFFFFF` | Mark on dark grounds                    |
| `blue`  | `#2563EB` | Accent, alternate badge                 |
| `grey`  | `#9CA3AF` | Secondary lettering (`spirales.tech`)   |

## What is here

### `svg/` — vectors, the master format

| File                                | What it is                                          |
| ----------------------------------- | --------------------------------------------------- |
| `spirales-mark-{white,ink,blue,paper}.svg` | Bare spiral, transparent ground, cropped tight |
| `spirales-icon-{ink,paper,blue,white}.svg` | Mark centred on a rounded square             |
| `spirales-icon-transparent-{white,ink}.svg` | Square framing, no ground                   |
| `spirales-lockup-on-light.svg`      | Ink badge + ink lettering — for light backgrounds    |
| `spirales-lockup-on-dark.svg`       | Light badge + white lettering — for dark backgrounds |
| `spirales-lockup-on-light-blue.svg` | Blue badge variant for light backgrounds            |

Lockup names describe the background they sit **on**, not their own ink.

The lettering is outlined, so the SVGs render identically anywhere without
Unbounded or DM Mono installed.

### `png/` — rasters

- `icon-*-{16,32,48,64,128,180,192,256,512,1024}.png` — favicons, app icons,
  avatars. `180` is the Apple touch icon size, `192`/`512` the PWA sizes.
- `mark-*-{512,1024,2048}.png` — bare mark, transparent ground.
- `lockup-*-{600,1200,2400}.png` — horizontal lockup.

### `social/`

| File                                 | Where it goes                                        |
| ------------------------------------ | ---------------------------------------------------- |
| `avatar-{ink,blue,paper}-{400,800}.png` | LinkedIn / X / GitHub profile picture             |
| `linkedin-banner-1128x191.png`       | LinkedIn **company page** cover                      |
| `linkedin-banner-1584x396.png`       | LinkedIn **personal profile** cover                  |
| `og-1200x630.png`                    | Open Graph / Twitter card, link previews             |

### `favicon.ico`

Multi-resolution (16/32/48) for legacy browsers and bookmark bars.

## What the site serves

`scripts/generate-brand.mjs` copies the subset the site needs into `public/`:
`favicon.ico`, `favicon.svg`, `apple-touch-icon.png`, `icon-192.png`,
`icon-512.png`, `og-image.png`. Regenerating the brand refreshes them.

## The mark

A Fibonacci golden spiral: seven true quarter-circle arcs over 1.75 turns, radii
stepping by φ (2.4 → 3.8 → 6.3 → 10.1 → 16.4 → 26.5 → 42.8). Its bounding box is
69.3 × 42.9, itself a golden rectangle.

The same path drives the live site via `src/app/components/Spiral.tsx`. If one
changes, change the other.

## Clear space and minimum size

Keep clear space of at least one badge-corner-radius on every side of the badge
or lockup. Do not use the lockup below 120 px wide — use the bare icon instead.
Never recolour the mark outside the palette above, rotate it, or add effects.
