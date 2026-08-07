# spirales.tech

Landing site for SPIRALES — Software Solutions & Services. React + Vite, built
to a static bundle and served from GitHub Pages.

## Develop

```
npm install
npm run dev
```

## Build

```
npm run build      # → dist/
npm run preview    # serve dist/ locally
```

`npm run build` runs Vite and then `scripts/prerender.mjs`, which renders the
app to static HTML, inlines it into `dist/index.html` and deletes the client
bundle. The page has no interactive state, so the browser gets **no runtime
JavaScript** — only a three-line inline script that refreshes the copyright
year. Everything the page needs is same-origin; there are no third-party
requests at all.

Typefaces are self-hosted in `public/fonts/`. To refresh them:

```
npm run fonts
```

That downloads the woff2 subsets, deduplicates variable-font files that Google
serves once per requested weight, and rewrites `src/styles/fonts.css`. The
fonts and the generated CSS are committed, so a normal build needs no network.

## Brand assets

Logo, favicons, app icons and social images all generate from one source:

```
npm run brand
```

See [`brand/README.md`](brand/README.md) for what gets produced and where each
file belongs. PNG output needs `rsvg-convert` (`brew install librsvg`).

The wordmark lettering is pre-outlined into `scripts/brand-glyphs.mjs`, which is
committed. Only re-run `npm run glyphs` if the brand typography changes.

## Deploy

`.github/workflows/deploy.yml` builds and publishes to GitHub Pages on every
push to `main`. One-time setup in the repo:

1. **Settings → Pages → Source**: _GitHub Actions_.
2. **Settings → Pages → Custom domain**: `spirales.tech` (matches
   `public/CNAME`), then tick _Enforce HTTPS_ once the certificate issues.
3. At the DNS registrar, point the apex `spirales.tech` at GitHub Pages:

   ```
   A     @   185.199.108.153
   A     @   185.199.109.153
   A     @   185.199.110.153
   A     @   185.199.111.153
   AAAA  @   2606:50c0:8000::153
   AAAA  @   2606:50c0:8001::153
   AAAA  @   2606:50c0:8002::153
   AAAA  @   2606:50c0:8003::153
   CNAME www dambre.github.io.
   ```

Without a custom domain, set a repository variable `BASE_PATH` to
`/spirales.tech/` so asset URLs resolve under the default Pages path, and delete
`public/CNAME`.
