# athand-site

This repository builds athandapp.com, the marketing, privacy, and support site for the atHand iPhone app. The site is an Astro static build deployed to GitHub Pages by GitHub Actions. The app's own repository is private.

## Requirements

- Node 22.23.4 or later (Astro 7.4.2 exits on older versions)
- npm

## Commands

- `npm ci` installs the exact dependency versions from package-lock.json.
- `npm run dev` starts a local development server at http://localhost:4321.
- `npm run build` writes the static site to dist/.
- `npm run preview` serves the built dist/ locally.
- `npm run check` runs `astro check` (types and templates).
- `npm run tokens:check`, `npm run check:external`, `npm run check:links`, and `npm run check:content` are described below.
- `npm run check:layout` loads every built page in Chromium and checks for sideways scrolling and the 16px gutter; see check:layout below.
- `npm run check:a11y` runs axe-core and the site's own accessibility floor on every built page; see check:a11y below.
- `node scripts/check-text.mjs` checks a built page against an expected-copy fixture; see check:text below.
- `npm run og:image` renders public/og-image.png, the Open Graph image; see og:image below.

## Layout

- src/pages/: one file per page. index.astro, features.astro, pricing.astro, privacy-overview.astro, privacy.astro, support.astro, and 404.astro build to /index.html, /features.html, /pricing.html, /privacy-overview.html, /privacy.html, /support.html, and /404.html. /privacy.html and /support.html are permanent URLs.
- src/layouts/Base.astro: the shared page shell, head metadata, font and token imports, and the inline theme script.
- src/components/: Header.astro (logo lockup, main navigation, and theme control), ThemeControl.astro (System, Light, and Dark buttons), ComingSoon.astro (the coming-soon line), PhoneFrame.astro (one screenshot in a phone frame, light and dark, cropped by CSS), Icon.astro (inline line icons), and Footer.astro.
- src/styles/tokens/: design tokens copied from the app repo. Do not edit them by hand.
- src/styles/site.css: the site stylesheet, written against the token variables.
- src/assets/: the logo mark SVG, copied from the app repo, and shots/, the App Store screenshots in light and dark pairs.
- src/pages/sitemap.xml.ts: builds /sitemap.xml, listing the six indexable pages (not 404) by their absolute URLs.
- public/: files copied into dist/ as is, including CNAME, robots.txt (allows all and names the sitemap), the favicons, the apple-touch-icon, and og-image.png.
- scripts/: the check scripts, plain Node. check-layout.mjs and check-a11y.mjs use Playwright (and axe-core); the others use built-in modules only.

## Deploy

The Deploy workflow (.github/workflows/deploy.yml) runs on every push to main and can also be run by hand from the Actions tab. Its build job runs `npm ci`, `npm run build`, `npm run check`, `npm run check:external`, `npm run check:links`, and `npm run check:content`, then uploads dist/; its deploy job publishes it to GitHub Pages. Merging to main publishes the site.

In the repository settings, Pages Source must be "GitHub Actions" and the custom domain must be athandapp.com with Enforce HTTPS checked.

## tokens:check

`npm run tokens:check` confirms that each file in src/styles/tokens/ matches the app repo's design tokens byte for byte. It reads the app repo from `ATHAND_APP_DIR`, which defaults to ../athandapp:

```bash
ATHAND_APP_DIR=../athandapp npm run tokens:check
```

Each copied file starts with one header line naming its source path and the full app repo commit, followed by the source file unchanged:

```
/* Source: davisj2007/athandapp athand-design-handoff/_ds/athand-design-system-<id>/tokens/<name>.css at <40-character commit hash>. Do not edit; run npm run tokens:check. */
```

The app's fonts.css is not copied, because it loads Google Fonts from a CDN and the site makes no third-party requests. The site self-hosts Space Grotesk and Inter through @fontsource instead, and the check reports this exception on every run.

This check does not run in the Deploy workflow, because the app repo is private and the workflow cannot read it. Run it locally before any change to the tokens.

## check:external

`npm run check:external` scans every HTML, CSS, JS, and SVG file in dist/ for runtime requests: `src`, `srcset`, `poster`, `<link href>`, `<object data>`, `<form action>`, CSS `url()` and `@import`, and absolute URLs in scripts. It allows relative and root-relative URLs, fragments, `data:` URLs, and absolute URLs on athandapp.com. Ordinary links (`<a href>`) are not requests and are ignored. Any other host fails the check.

## check:links

`npm run check:links` reads every `<a href>` in every HTML file in dist/ and fails if an internal link points to a file that does not exist. It resolves `/` to index.html, a trailing `/` to the index.html inside that folder, and relative paths against the page's own folder, ignoring any query or fragment. Outbound links (any scheme, such as `https:` or `mailto:`), protocol-relative `//` links, and fragment-only links are skipped.

## check:text

`node scripts/check-text.mjs` confirms that a built page holds the expected copy listed in a fixture file. Each fixture line is one string: `title:` and `description:` lines must equal the page's head values, `href:` lines require a link with that target inside `<main>`, lines starting with `!` must not appear in the main text, `alt:` lines require an `<img>` inside `<main>` with exactly that alt text, and every other line must appear in it. When a fixture has any `alt:` line, every `<img>` inside `<main>` must carry one of the listed alts, so an image with a missing or unexpected alt fails. Blank lines and lines starting with `#` are skipped.

```bash
node scripts/check-text.mjs dist/features.html .planning/phases/03-pages-and-copy/copy/features.txt
```

The Deploy workflow does not run this check; run it locally after any copy change.

## check:content

`npm run check:content` compares the visible text and link targets inside each built page's `<main>` with the original hand-written HTML from before the Astro port. It reads those files from git history at `PRE_PORT_REF`, which defaults to 52d8d1afc6de84391e401c738905da3f186f9f50. By default it checks privacy and 404, the two pages whose content has not changed since the port. Home and Support were rewritten in phase 03, so check-text.mjs checks them against their approved copy instead. Pass page names to check other pages:

```bash
node scripts/check-main-text.mjs privacy support
```

## check:layout

`npm run check:layout` serves dist/ on 127.0.0.1 and loads every page in Playwright's Chromium, in light and dark, at 320 by 640, 390 by 844, 768 by 1024, 1280 by 800, and 1280 wide at 400% zoom (320 by 200 CSS px). It fails if a page scrolls sideways, if any rendered box crosses a viewport edge, or if any content element (text, images, icons, buttons, and inputs) in the header, main, or footer starts less than 16px from either edge. Full-bleed backgrounds may touch the edges. Any request to a host other than the local server also fails.

Playwright and axe-core are pinned devDependencies used only by the checks; no page imports them. Download Playwright's Chromium once per machine:

```bash
npx playwright install chromium
```

## check:a11y

`npm run check:a11y` serves dist/ the same way and loads every page with reduced motion on, in light and dark, at 390 by 844 and 1280 by 800. It runs axe-core with its default rules and fails on any violation. It also fails on text below 16px, a body size other than 17px, a standalone link or button smaller than 44 by 44 CSS px (links inside sentences are exempt), any transition or animation that survives reduced motion, and any request to a host other than the local server.

Like tokens:check, check:layout and check:a11y run locally before every PR and do not run in the Deploy workflow.

## og:image

`npm run og:image` renders public/og-image.png (1200 by 630) in Playwright's Chromium from an HTML page built in scripts/make-og-image.mjs. It uses the site's token CSS and self-hosted fonts, the lockup mark, and the app icon read from the app repo (`ATHAND_APP_DIR`, default ../athandapp) at the commit named in the script. Any request that is not `file:` or `data:` is blocked and fails the run. The PNG is committed and copied into dist/ as is; the build never runs the script.

Regenerate it when the tagline, the app icon, the lockup, or the light color or type tokens change: update the icon commit in the script if needed, run the command, view the PNG, and commit it.
