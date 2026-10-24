# Phase 02: foundation - Summary

## What changed

Wave 1 (EXECUTE, 2026-10-23, branch execute/02-foundation from main at 55faa82):

- 02-01: Astro 7.4.2 project scaffold. package.json with the five pinned dependencies and the seven scripts, package-lock.json, astro.config.mjs (static, `build.format: "file"`), tsconfig.json, .gitignore, an empty .nojekyll, and public/CNAME (byte for byte the root CNAME).
- 02-02: The four token files copied from the app repo at e7537e77d2257f8e6c10473e047017fd6e335aa0 into src/styles/tokens/, each with a one-line source header. scripts/tokens-check.mjs compares them byte for byte, fails on a missing app repo, a changed byte, a bad header, more than one design system folder, or an extra file in src/styles/tokens/, and prints the fonts.css exception line.
- 02-03: src/styles/site.css, a port of styles.css onto token variables: Inter 400 at 17px body, Space Grotesk headings, underlined links in main and footer, a 3px focus outline, 16px footer and `.meta`, explicit `color-scheme` per theme, lockup and theme control rules, and no motion.
- 02-04: Base layout, Header (inlined @ mark SVG plus "Hand"), ThemeControl (System, Light, and Dark, rendered hidden and shown by the inline theme script), Footer ("Made by Jacob Davis" linked to https://jacobdavis.co replaces the developer sentence), and src/pages/404.astro with the 404 main content pasted unchanged.
- 02-05: scripts/check-external.mjs (runtime request scan of dist/) and scripts/check-main-text.mjs (main text and link comparison against the pre-port root HTML at 52d8d1a).

The live site is unchanged by this wave: the root HTML, styles.css, and CNAME are untouched, and Pages still deploys from the branch.

Wave 2 (EXECUTE, 2026-10-24, branch execute/02-wave-2 from main at 9e1979c):

- 02-06: src/pages/index.astro. Title and description from index.html:6-7; main content is index.html:19-46 copied with `sed`, unchanged.
- 02-07: src/pages/privacy.astro and src/pages/support.astro. Titles and descriptions copied verbatim; main content is privacy.html:19-89 and support.html:19-63 copied with `sed`, unchanged. Astro emits dist/privacy.html and dist/support.html (no directories).
- 02-08: .github/workflows/deploy.yml. Runs on push to main and on manual dispatch; build job runs `npm ci`, `npm run build`, `npm run check`, `npm run check:external`, and `npm run check:content`, then uploads dist/; deploy job publishes it. tokens:check is absent, with a YAML comment saying why. Action versions (latest major at EXECUTE time, pinned by major tag): actions/checkout@v7 (latest v7.0.1), actions/setup-node@v7 (v7.1.0), actions/configure-pages@v6 (v6.0.0), actions/upload-pages-artifact@v5 (v5.0.0), actions/deploy-pages@v5 (v5.0.1).

The live site is unchanged by this wave until Jake switches the Pages source (PLAN.md, Steps for Jake outside the repo, step 2). The Deploy run on this merge is expected to fail at the deploy job.

Wave 2b (EXECUTE, 2026-10-24, branch execute/02-wave-2b from main at 5ee3147):

- 02-11: .github/workflows/deploy.yml. The setup-node step now names `node-version: 22.23.4`, matching package.json `engines.node` (`>=22.23.4`), with a YAML comment saying why a bare major is not enough.

This merge switches athandapp.com to the Astro build: the Pages source is already "GitHub Actions", so the Deploy run on main publishes dist/.

## Brief citations

None. No product claims were added or changed. New strings are the approved Copy drafts entries 1 to 4 in CONTEXT.md (footer credit, "Appearance", "System", "Light", "Dark", and the removed footer sentence).

## Commits

- c64da66 phase 02 task 02-01: Astro project scaffold
- a46795c phase 02 task 02-02: copied tokens and tokens:check
- 0e14745 phase 02 task 02-03: self-hosted fonts and site stylesheet
- 8a8f517 phase 02 task 02-04: base layout, header, theme control, footer, and 404 page
- 5b2c4d5 phase 02 task 02-05: check:external and check:content scripts
- 8e1996e phase 02 task 02-03: align footer measure with header and main
- c6c707f phase 02 task 02-06: port the home page
- 44e1db8 phase 02 task 02-07: port the privacy and support pages
- 739fe88 phase 02 task 02-08: Deploy workflow
- 06f5001 phase 02 task 02-11: pin Node in the Deploy workflow

## Check results (wave 1)

- `npm ci`: pass. One npm notice that fsevents@2.3.3 (an optional macOS dependency of Astro's file watcher) has install scripts not covered by allowScripts; it does not affect the build.
- `npm run build`: pass, dist/404.html and dist/CNAME, 16 font files (woff2 and woff for the eight named faces only).
- `npm run check`: 0 errors, 0 warnings, 0 hints.
- `npm run tokens:check`: pass, 4 files match e7537e7; also fails as expected on a missing app repo, an appended byte, and an extra fonts.css.
- `npm run check:external`: pass; also fails as expected on a third-party `<script src>`, `<style>` @import, a protocol-relative CSS `url()`, an `srcset` candidate, and an inline `fetch` URL, and passes on a fixture with only outbound and mailto links.
- `node scripts/check-main-text.mjs 404`: pass; fails as expected when one word of the built 404 main is changed.
- Every task's own verify command: pass.
- Built-in browser against `astro preview` (not required for wave 1): dist/404.html renders in System (dark OS), Light, and Dark; the Dark choice persists across reload with `aria-pressed` on Dark; theme buttons measure 87, 68, and 66 by 44 CSS px; only localhost requests (one CSS file and three woff2 faces); no horizontal scrolling at a 320 CSS px viewport.

## Check results (wave 2)

- `npm ci`: pass, with the same fsevents install-scripts notice as wave 1.
- `npm run build`: pass, 4 pages (index, privacy, support, 404), dist/CNAME, and the same 16 font files.
- `npm run check`: 0 errors, 0 warnings, 0 hints.
- `npm run tokens:check`: pass, 4 files match 5e7c70be2bb9abf7830aad2ffed6fa917229a794 (app main moved past e7537e7; `git diff e7537e7 HEAD -- athand-design-handoff/_ds/` is empty, so the copied headers naming e7537e7 still hold).
- `npm run check:external`: pass.
- `npm run check:content`: pass for index, privacy, support, and 404.
- Every task's own verify command: pass (02-07 and 02-08 as corrected; see Deviations).
- Workflow YAML parses (Ruby YAML loader; top-level keys name, on, permissions, concurrency, jobs; jobs build and deploy).
- Built-in browser against `astro preview` at http://localhost:4321 (the preview server left running by the wave 1 session, serving this checkout's dist/): all four pages return 200 with the right title, h1, three theme buttons, and the footer credit; an unknown path returns 404 with the 404 page. Light chosen on /privacy.html persisted to /support.html with `aria-pressed` on Light; Dark chosen on /support.html persisted across navigation to / with a dark background; System removed `data-theme`, stored `system`, and followed the dark OS. Theme buttons measure 87, 68, and 66 by 44 CSS px. Only localhost:4321 requests (one CSS file and three woff2 faces on the home page). No horizontal scrolling at a 320 CSS px viewport on any page.

## Check results (wave 2b)

- 02-11 verify command: pass.
- Workflow YAML parses (Ruby YAML loader); setup-node's `node-version` loads as the string "22.23.4".
- 22.23.4 is the newest v22 release in https://nodejs.org/dist/index.json, so setup-node can resolve it.
- Local Node 26.11.1: `npm ci`, `npm run build` (4 pages), `npm run check` (0 errors, 0 warnings, 0 hints), `npm run tokens:check` (4 files match app main 0fa0ec4; `git diff e7537e7 0fa0ec4 -- athand-design-handoff/_ds/` is empty), `npm run check:external`, and `npm run check:content` (index, privacy, support, and 404): all pass.
- Node 22.23.4 (official darwin-arm64 tarball from nodejs.org, SHA-256 checked, run from the session scratchpad and deleted afterward): the workflow's sequence `npm ci`, `npm run build`, `npm run check`, `npm run check:external`, and `npm run check:content` all pass. This is the check wave 2 lacked.

## Deviations

- 02-03 bug fixed in its own file: the footer's `.wrap` sat about 10px right of the header and main, because `.wrap` is 68ch and the 16px footer font made its ch narrower (the same offset existed in styles.css at 15px). The 16px size moved from `footer.site` to `footer.site nav` and `footer.site p`. Separate commit 8e1996e.
- Branch incident, corrected: between the 02-03 and 02-04 commits, something outside this session checked out main in this working copy (reflog: "checkout: moving from execute/02-foundation to main"). On main, .gitignore and the 02-01 to 02-03 files did not exist, so the first 02-04 commit (7aa44da) landed on local main and included node_modules/, dist/, and .astro/. It was never pushed. The 02-04 source files were restored onto execute/02-foundation, re-verified, and committed as 8a8f517; local main was reset to origin/main (55faa82). If another session or terminal works in ~/dev/athand-site at the same time, this can happen again.

- Wave 2, two PLAN.md verify commands could not pass as written. Both were run in corrected form that tests the same thing; PLAN.md text was not edited (REVISE owns it).
  - 02-07: `execSync(cmd, "utf8")` returns a Buffer on Node 26 (a string is no longer accepted as the options argument), so `o.match` threw a TypeError before any comparison. Run with `{encoding: "utf8"}`; titles and descriptions of both pages match.
  - 02-08: `/uses:\s*(?!actions\/)/` matches every `uses: actions/...` line, because `\s*` backtracks to zero characters and the lookahead then sees the space. YAML requires that space, so no valid workflow passes. Run with `/uses:\s*(?!\s|actions\/)/`; it passes on deploy.yml, and on copies with an added `uses: peaceiris/actions-gh-pages@v4` line and an added `run: npm run tokens:check` line it fails on the right condition.
- Wave 2, the PLAN.md status line now reads "Approved 2026-10-24".
- Wave 2, Deploy failed on GitHub (recorded at REVISE, 2026-10-24): Deploy run 40104311488, started by the wave 2 merge, failed at `npm run build` with Astro's "Please upgrade Node.js to a supported version: \">=22.23.4\"". setup-node's `node-version: 22` resolved to the runner's preinstalled 22.x, which is older than 22.23.4; the PLAN.md Facts entry saying it satisfies Astro's engines field was wrong. Local checks ran on Node 26 and did not catch it. Nothing was uploaded, so the live site was unchanged. REVISE added wave 2b (02-11) to pin `node-version: 22.23.4`.

## Backlog items added

- VERIFY static check 13 conflicts with FND-04 (see BACKLOG.md). Resolved by REVISE on 2026-10-24.
- Wave 2: the two PLAN.md verify command defects above (see BACKLOG.md).

## Follow-ups

- Pages Source switched to "GitHub Actions" on 2026-10-24 (PLAN.md, Steps for Jake outside the repo, step 2.2).
- Wave 2b (02-11) done. After it merges, Jake waits for the automatic Deploy run to finish green, then does steps 2.3 and 2.5 (custom domain and HTTPS, then the three live URLs).
- Wave 3 (02-09, 02-10): root cleanup after the first green Actions deployment and the live checks, and README.
