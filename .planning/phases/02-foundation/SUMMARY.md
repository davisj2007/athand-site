# Phase 02: foundation - Summary

## What changed

Wave 1 (EXECUTE, 2026-10-23, branch execute/02-foundation from main at 55faa82):

- 02-01: Astro 7.4.2 project scaffold. package.json with the five pinned dependencies and the seven scripts, package-lock.json, astro.config.mjs (static, `build.format: "file"`), tsconfig.json, .gitignore, an empty .nojekyll, and public/CNAME (byte for byte the root CNAME).
- 02-02: The four token files copied from the app repo at e7537e77d2257f8e6c10473e047017fd6e335aa0 into src/styles/tokens/, each with a one-line source header. scripts/tokens-check.mjs compares them byte for byte, fails on a missing app repo, a changed byte, a bad header, more than one design system folder, or an extra file in src/styles/tokens/, and prints the fonts.css exception line.
- 02-03: src/styles/site.css, a port of styles.css onto token variables: Inter 400 at 17px body, Space Grotesk headings, underlined links in main and footer, a 3px focus outline, 16px footer and `.meta`, explicit `color-scheme` per theme, lockup and theme control rules, and no motion.
- 02-04: Base layout, Header (inlined @ mark SVG plus "Hand"), ThemeControl (System, Light, and Dark, rendered hidden and shown by the inline theme script), Footer ("Made by Jacob Davis" linked to https://jacobdavis.co replaces the developer sentence), and src/pages/404.astro with the 404 main content pasted unchanged.
- 02-05: scripts/check-external.mjs (runtime request scan of dist/) and scripts/check-main-text.mjs (main text and link comparison against the pre-port root HTML at 52d8d1a).

The live site is unchanged by this wave: the root HTML, styles.css, and CNAME are untouched, and Pages still deploys from the branch.

## Brief citations

None. No product claims were added or changed. New strings are the approved Copy drafts entries 1 to 4 in CONTEXT.md (footer credit, "Appearance", "System", "Light", "Dark", and the removed footer sentence).

## Commits

- c64da66 phase 02 task 02-01: Astro project scaffold
- a46795c phase 02 task 02-02: copied tokens and tokens:check
- 0e14745 phase 02 task 02-03: self-hosted fonts and site stylesheet
- 8a8f517 phase 02 task 02-04: base layout, header, theme control, footer, and 404 page
- 5b2c4d5 phase 02 task 02-05: check:external and check:content scripts
- 8e1996e phase 02 task 02-03: align footer measure with header and main

## Check results (wave 1)

- `npm ci`: pass. One npm notice that fsevents@2.3.3 (an optional macOS dependency of Astro's file watcher) has install scripts not covered by allowScripts; it does not affect the build.
- `npm run build`: pass, dist/404.html and dist/CNAME, 16 font files (woff2 and woff for the eight named faces only).
- `npm run check`: 0 errors, 0 warnings, 0 hints.
- `npm run tokens:check`: pass, 4 files match e7537e7; also fails as expected on a missing app repo, an appended byte, and an extra fonts.css.
- `npm run check:external`: pass; also fails as expected on a third-party `<script src>`, `<style>` @import, a protocol-relative CSS `url()`, an `srcset` candidate, and an inline `fetch` URL, and passes on a fixture with only outbound and mailto links.
- `node scripts/check-main-text.mjs 404`: pass; fails as expected when one word of the built 404 main is changed.
- Every task's own verify command: pass.
- Built-in browser against `astro preview` (not required for wave 1): dist/404.html renders in System (dark OS), Light, and Dark; the Dark choice persists across reload with `aria-pressed` on Dark; theme buttons measure 87, 68, and 66 by 44 CSS px; only localhost requests (one CSS file and three woff2 faces); no horizontal scrolling at a 320 CSS px viewport.

## Deviations

- 02-03 bug fixed in its own file: the footer's `.wrap` sat about 10px right of the header and main, because `.wrap` is 68ch and the 16px footer font made its ch narrower (the same offset existed in styles.css at 15px). The 16px size moved from `footer.site` to `footer.site nav` and `footer.site p`. Separate commit 8e1996e.
- Branch incident, corrected: between the 02-03 and 02-04 commits, something outside this session checked out main in this working copy (reflog: "checkout: moving from execute/02-foundation to main"). On main, .gitignore and the 02-01 to 02-03 files did not exist, so the first 02-04 commit (7aa44da) landed on local main and included node_modules/, dist/, and .astro/. It was never pushed. The 02-04 source files were restored onto execute/02-foundation, re-verified, and committed as 8a8f517; local main was reset to origin/main (55faa82). If another session or terminal works in ~/dev/athand-site at the same time, this can happen again.

## Backlog items added

- VERIFY static check 13 conflicts with FND-04 (see BACKLOG.md).

## Follow-ups

- Wave 2 (02-06 to 02-08): port index, privacy, and support, and add the Deploy workflow.
- Wave 3 (02-09, 02-10): root cleanup after the Pages source switch, and README.
