# Phase 02: foundation - Plan

Status: Draft (revised 2026-10-24; was Approved 2026-10-23)

## Goal

Move athandapp.com from hand-written root HTML served from the repository root to an Astro static build deployed by GitHub Actions, with the app's locked tokens, self-hosted Space Grotesk and Inter, a System, Light, and Dark theme control, and a shared layout with the logo lockup header and the "Made by Jacob Davis" footer. Main content stays word for word, /privacy.html and /support.html keep their exact URLs, and the live site stays whole after every merge (CONTEXT.md, Goal).

## Facts confirmed at PLAN time (2026-10-23)

- Pages source today: `gh api repos/davisj2007/athand-site/pages` returns `build_type: "legacy"`, `source: {branch: "main", path: "/"}`, `cname: "athandapp.com"`, `https_enforced: true`. This confirms the assumption in CONTEXT decision 6.
- The repo is public, so the branch deployment also publishes non-HTML files at the root (package.json, src/, scripts/) between wave 1 and the Pages source switch. They hold nothing secret and nothing links to them.
- Pre-port reference for FND-12: main at 52d8d1afc6de84391e401c738905da3f186f9f50. The root HTML, styles.css, and CNAME there are identical to b1ca4f7 (the commit CONTEXT.md cites).
- The root HTML uses no character entities and no `{` or `}`; curly apostrophes are literal characters. Main content can be pasted into .astro files without escaping.
- App repo davisj2007/athandapp main is e7537e77d2257f8e6c10473e047017fd6e335aa0. `git diff c928b40 e7537e7 -- athand-design-handoff/_ds/` is empty, so the tokens CONTEXT.md measured are current. Each token file starts with `:root{` and ends with a newline.
- Versions: astro 7.4.2 (engines `node >=22.23.4`), @astrojs/check 0.9.12 (peer `typescript ^5.0.0 || ^6.0.0`), typescript 6.0.3 (latest 6.x; 7.x is outside the peer range), @fontsource/inter 5.3.0, @fontsource/space-grotesk 5.3.0. Node 22.23.4 is the latest 22.x release, so the workflow's `node-version: 22` satisfies Astro's engines field.

## Refinement of CONTEXT decision 6

Decision 6 puts the Astro project and the workflow in "wave 1" and the root cleanup in "a later wave". This plan splits that first stage in two so each wave fits one session: wave 1 builds the project, tokens, fonts, layout, the 404 page, and the check scripts; wave 2 ports the other three pages and adds the Deploy workflow. The Pages source switch happens right after wave 2, the first point where dist/ holds the complete site. The cleanup is wave 3. The order and the safety argument of decision 6 are unchanged: the root HTML keeps serving until Actions deploys the full Astro build. The .nojekyll file (decision 23) lands in wave 1, the first wave that adds src/.

## Requirement coverage

- FND-01: 02-01, 02-04, 02-06, 02-07
- FND-02: 02-08
- FND-03: 02-01, 02-09
- FND-04: 02-02
- FND-05: 02-02
- FND-06: 02-03
- FND-07: 02-04
- FND-08: 02-04
- FND-09: 02-04
- FND-10: 02-04
- FND-11: 02-04
- FND-12: 02-05, 02-04, 02-06, 02-07
- FND-13: 02-05, 02-08
- FND-14: 02-10

## Files in scope

EXECUTE may change only these.

Added:

- package.json
- package-lock.json
- astro.config.mjs
- tsconfig.json
- .gitignore
- .nojekyll (added in wave 1, removed in wave 3)
- public/CNAME
- src/styles/tokens/colors.css
- src/styles/tokens/effects.css
- src/styles/tokens/spacing.css
- src/styles/tokens/typography.css
- src/styles/site.css
- src/assets/logo-lockup-mark.svg
- src/layouts/Base.astro
- src/components/Header.astro
- src/components/ThemeControl.astro
- src/components/Footer.astro
- src/pages/index.astro
- src/pages/privacy.astro
- src/pages/support.astro
- src/pages/404.astro
- scripts/tokens-check.mjs
- scripts/check-external.mjs
- scripts/check-main-text.mjs
- .github/workflows/deploy.yml

Changed:

- README.md

Removed (wave 3 only):

- index.html
- privacy.html
- support.html
- 404.html
- styles.css
- CNAME
- .nojekyll

Loop files every session updates: .planning/phases/02-foundation/PLAN.md (checkboxes, status), .planning/phases/02-foundation/SUMMARY.md, .planning/STATE.md, .planning/BACKLOG.md.

## Steps for Jake outside the repo

1. Before merging wave 1 and wave 2: nothing.
2. Right after wave 2 merges (not before):
   1. The push to main starts a "Deploy" run. Its deploy job is expected to fail, because Pages still deploys from the branch. The site keeps serving the old root HTML. Ignore that failure.
   2. In GitHub, open the athand-site repository, Settings, Pages. Under Build and deployment, set Source to "GitHub Actions".
   3. On the same page, confirm Custom domain still reads athandapp.com and Enforce HTTPS is still checked. If the domain field is empty, type athandapp.com and save.
   4. Open the Actions tab, select "Deploy", choose Run workflow on main, and wait for it to finish green.
   5. Open https://athandapp.com, https://athandapp.com/privacy.html, and https://athandapp.com/support.html. Each should show the new header with the "@Hand" lockup and the System, Light, and Dark buttons. If any page fails, set Source back to "Deploy from a branch", main, / (root), which restores the old site, and report it.
3. Before the wave 3 EXECUTE session: steps 2.2 to 2.5 are done. Wave 3 checks this itself (task 02-09) and stops if not.
4. After wave 3 merges: wait for the Deploy run to finish green, then reload the three URLs above.

## Wave 1

Builds the Astro project alongside the live root HTML. Nothing it adds is served as a page.

- [x] 02-01: Astro project scaffold
  Requirements: FND-01, FND-03
  Files: package.json, package-lock.json, astro.config.mjs, tsconfig.json, .gitignore, .nojekyll, public/CNAME
  Copy entries: none
  Steps:
  1. package.json: `"name": "athand-site"`, `"private": true`, `"type": "module"`, `"engines": {"node": ">=22.23.4"}`. Dependencies pinned to exact versions (no ^ or ~): astro 7.4.2, @astrojs/check 0.9.12, typescript 6.0.3, @fontsource/inter 5.3.0, @fontsource/space-grotesk 5.3.0. Scripts: `dev` (astro dev), `build` (astro build), `preview` (astro preview), `check` (astro check), `tokens:check` (node scripts/tokens-check.mjs), `check:external` (node scripts/check-external.mjs dist), `check:content` (node scripts/check-main-text.mjs). The three script files are created in 02-02 and 02-05; until then those scripts are not run.
  2. Run `npm install` once to produce package-lock.json; commit it.
  3. astro.config.mjs: `defineConfig({ site: "https://athandapp.com", output: "static", trailingSlash: "ignore", build: { format: "file" }, devToolbar: { enabled: false } })`. No integrations.
  4. tsconfig.json: `{"extends": "astro/tsconfigs/strict", "include": [".astro/types.d.ts", "**/*"], "exclude": ["dist"]}`.
  5. .gitignore: `node_modules/`, `dist/`, `.astro/`.
  6. .nojekyll: empty file at the repository root (CONTEXT decision 23).
  7. public/CNAME: `cp CNAME public/CNAME`, so it is byte for byte the root file (athandapp.com). The root CNAME stays until wave 3.
  8. The first `npm run build` runs in 02-04, which adds the first page; 02-01's verify does not build.
  Acceptance: `npm ci` succeeds from the lockfile; package.json lists only the five named dependencies with exact versions; `cmp CNAME public/CNAME` succeeds; .nojekyll exists and is empty; root HTML files and styles.css are untouched.
  Verify command: `npm ci && node -e 'const p=require("./package.json");const d={...p.dependencies,...p.devDependencies};const want={"astro":"7.4.2","@astrojs/check":"0.9.12","typescript":"6.0.3","@fontsource/inter":"5.3.0","@fontsource/space-grotesk":"5.3.0"};if(JSON.stringify(Object.keys(d).sort())!==JSON.stringify(Object.keys(want).sort())||Object.entries(want).some(([k,v])=>d[k]!==v))process.exit(1)' && cmp CNAME public/CNAME && test -f .nojekyll && test ! -s .nojekyll && git diff --quiet 52d8d1afc6de84391e401c738905da3f186f9f50 -- index.html privacy.html support.html 404.html styles.css CNAME`

- [x] 02-02: Copied tokens and tokens:check
  Requirements: FND-04, FND-05
  Files: src/styles/tokens/colors.css, src/styles/tokens/effects.css, src/styles/tokens/spacing.css, src/styles/tokens/typography.css, scripts/tokens-check.mjs
  Copy entries: none
  Steps:
  1. Record the app repo commit: `git -C "${ATHAND_APP_DIR:-../athandapp}" rev-parse HEAD`. Confirm that checkout is clean and on main. If main has moved past e7537e7 and `git diff e7537e77d2257f8e6c10473e047017fd6e335aa0 HEAD -- athand-design-handoff/_ds/` is not empty, stop and record a blocker (the tokens CONTEXT.md measured changed).
  2. For each of colors, effects, spacing, and typography: write one header line, `/* Source: davisj2007/athandapp athand-design-handoff/_ds/athand-design-system-23fcf9a9-cdd0-4b1b-a220-dcc704e0a8da/tokens/<name>.css at <full commit hash>. Do not edit; run npm run tokens:check. */`, a newline, then the source file appended byte for byte (`cat`, not an editor).
  3. scripts/tokens-check.mjs (plain Node ESM, built-in modules only; CONTEXT decision 9): read `ATHAND_APP_DIR` (default `../athandapp`, resolved from the repo root); exit 1 with a clear message if the directory or `athand-design-handoff/_ds/` is missing; list `athand-design-system-*` folders and exit 1 unless there is exactly one; for each of the four names, read the site copy, require line 1 to match `^/\* Source: davisj2007/athandapp .+ at [0-9a-f]{40}\. .*\*/$`, drop line 1 and its newline, compare the remaining bytes with the app file, and on difference print the file name and each differing line (line number, `-` app, `+` site); exit 1 on any difference, missing file, or bad header. Also exit 1 if src/styles/tokens/ holds any other file (a copied fonts.css would be caught). Print `fonts.css: documented exception (self-hosted faces replace the Google Fonts import)` on every run, and `tokens:check: 4 files match <app HEAD hash>` on success.
  Acceptance: `npm run tokens:check` exits 0 and prints the fonts.css line; it exits 1 when the app repo path is missing; it exits 1 and prints the differing line when one byte of a copy changes; the header names the full 40-character hash.
  Verify command: `npm run tokens:check && ! ATHAND_APP_DIR=/nonexistent npm run tokens:check && T=$(mktemp) && cp src/styles/tokens/spacing.css "$T" && printf 'x\n' >> src/styles/tokens/spacing.css && ! npm run tokens:check; cp "$T" src/styles/tokens/spacing.css && npm run tokens:check`

- [x] 02-03: Self-hosted fonts and site stylesheet
  Requirements: FND-06, FND-07 (color-scheme part), FND-08 (styling of existing structure)
  Files: src/styles/site.css
  Copy entries: none
  Steps:
  1. Fonts are imported in Base.astro (02-04), in this order, after the four token files: `@fontsource/space-grotesk/latin-500.css`, `latin-600.css`, `latin-700.css`, `@fontsource/inter/latin-400.css`, `latin-500.css`, `latin-600.css`, `latin-700.css`, `latin-800.css` (CONTEXT decision 10). No other weight, no other subset, no `index.css`.
  2. src/styles/site.css replaces styles.css (CONTEXT decision 15). Port every rule from styles.css with the token variables in place of the old ones: `--surface-page` for page, `--text-body` for text, `--text-link` for links and focus, `--text-faint` for faint, `--border-card` for the header and footer rules and `.panel` (decorative only). Keep `.wrap` at 68ch, the skip link behavior, the spacing, `.lede`, `.panel`, `.links`, and the 480px heading sizes.
  3. Changes from styles.css: body `font: 400 var(--text-base)/1.6 var(--font-ui)` (17px); h1, h2, h3 use `var(--font-display)` with `var(--tracking-display)` on h1; `main a, footer a { text-decoration: underline; text-underline-offset: 0.15em }` to override effects.css:19 (links are only 2.0 to 2.3:1 against body text); `a:focus-visible`, `button:focus-visible` get `outline: 3px solid var(--text-link); outline-offset: 3px`; `footer.site` and `.meta` at `1rem` (16px, was 15px); `[data-theme="light"] { color-scheme: light }` and `[data-theme="dark"] { color-scheme: dark }` (decision 13); `[hidden] { display: none !important }`.
  4. Header and lockup rules: `header.site .wrap` is a flex row with `flex-wrap: wrap`, `align-items: center`, `justify-content: space-between`, and a gap, so the theme control drops below the lockup at narrow widths and 400% zoom. `.lockup` is `display: inline-flex; align-items: center; gap: 0.06em; color: var(--text-link); text-decoration: none; min-height: var(--touch-min)`; `.lockup svg { height: 1em; width: auto }` sized from a 1.75rem font size, and the word "Hand" in `700 var(--font-display)` with `letter-spacing: var(--tracking-display)` (decision 14).
  5. Theme control rules (decision 12): buttons at `min-width` and `min-height` `var(--touch-min)` (44px), `font: 500 1rem var(--font-ui)`, `border: 1px solid var(--text-faint)`, background `var(--surface-page)`, text `var(--text-body)`; `[aria-pressed="true"]` uses `background: var(--text-body)` and `color: var(--surface-page)`, so the pressed button inverts in both themes (ink on paper in light, near-white fill with dark label in dark). No transitions or animation anywhere in site.css.
  6. Footer: the nav list, then the credit paragraph.
  Acceptance: site.css has no hex colors and no font-size below 1rem (16px); no `transition` or `animation`; no `@import` and no `url(` to any host.
  Verify command: `! grep -nE '#[0-9A-Fa-f]{3,8}\b' src/styles/site.css && ! grep -nE 'transition|animation|@import|url\(' src/styles/site.css && ! grep -nE 'font-size:\s*(0?\.[0-9]+rem|1[0-5]px|[0-9]px)' src/styles/site.css`

- [x] 02-04: Base layout, header, theme control, footer, and 404 page
  Requirements: FND-01, FND-07, FND-08, FND-09, FND-10, FND-11, FND-12
  Files: src/assets/logo-lockup-mark.svg, src/layouts/Base.astro, src/components/Header.astro, src/components/ThemeControl.astro, src/components/Footer.astro, src/pages/404.astro
  Copy entries: 1, 2, 3, 4
  Steps:
  1. `cp "${ATHAND_APP_DIR:-../athandapp}"/athand-design-handoff/_ds/athand-design-system-23fcf9a9-cdd0-4b1b-a220-dcc704e0a8da/assets/logo-lockup-mark.svg src/assets/logo-lockup-mark.svg` (byte for byte).
  2. Base.astro (decision 16): props `title: string`, `description: string`, `noindex?: boolean`. Frontmatter imports, in order: the four token files (colors, typography, spacing, effects), the eight @fontsource files from 02-03, then site.css. Head: `<meta charset="utf-8">`, viewport `width=device-width, initial-scale=1`, `<title>`, description, `<meta name="color-scheme" content="light dark">`, `<meta name="robots" content="noindex">` only when `noindex`, then the theme script. Body: `<a class="skip" href="#main">Skip to main content</a>`, `<Header />`, `<main id="main"><slot /></main>`, `<Footer />`. `<html lang="en">`.
  3. Theme script (decision 11): `<script is:inline>` in head, adapted from theme-toggle.js at the app commit recorded in 02-02. Keep: key `athand-theme`; values system, light, dark; system removes `data-theme`, light or dark sets it on `<html>`; apply immediately on parse; on DOMContentLoaded remove `hidden` from `[data-theme-control]`, set `aria-pressed` on every `[data-theme-set]` button, and handle clicks; listen to `prefers-color-scheme` changes while on System; dispatch `athand:themechange`; expose `window.atHandTheme`. localStorage access stays in try/catch. Add a comment naming the source file and commit. No external URL in the script.
  4. Header.astro (decisions 12, 14): `<header class="site"><div class="wrap">` with `<a class="lockup" href="/" aria-label="atHand, home">` containing the SVG inlined via `import mark from "../assets/logo-lockup-mark.svg?raw"` and `<Fragment set:html={mark} />`, followed by `<span class="lockup-word" aria-hidden="true">Hand</span>`; then `<ThemeControl />`.
  5. ThemeControl.astro: `<div class="theme-control" role="group" aria-label="Appearance" data-theme-control hidden>` with three `<button type="button" data-theme-set="system|light|dark" aria-pressed="false">` labeled "System", "Light", and "Dark" (Copy entries 2 and 3).
  6. Footer.astro (decision 22): `<footer class="site"><div class="wrap">` with the existing `<nav aria-label="Footer"><ul>` of Privacy (/privacy.html), Support (/support.html), and support@athandapp.com (mailto:support@athandapp.com), copied from index.html:50-56, then `<p><a href="https://jacobdavis.co">Made by Jacob Davis</a></p>` (Copy entry 1). The sentence "atHand is made by Jacob Davis, an individual developer in New York, United States." does not appear (Copy entry 4).
  7. src/pages/404.astro: `<Base title="Page not found | atHand" description="That page could not be found." noindex>` wrapping 404.html:20-24 (the `<div class="wrap">` block) pasted unchanged.
  Acceptance: `npm run build` emits dist/404.html; it contains `lang="en"`, the skip link, one `<header>`, `<main id="main">`, one `<footer>`, the noindex meta, the lockup link named "atHand, home", the group named "Appearance" with three buttons and the `hidden` attribute in the HTML, the "Made by Jacob Davis" link to https://jacobdavis.co, a link to `/` in main and to `/support.html` in the footer (FND-11), and not the removed developer sentence; `npm run check` reports 0 errors; `cmp` of the SVG with the app repo succeeds.
  Verify command: `npm run build && npm run check && cmp src/assets/logo-lockup-mark.svg "${ATHAND_APP_DIR:-../athandapp}"/athand-design-handoff/_ds/athand-design-system-23fcf9a9-cdd0-4b1b-a220-dcc704e0a8da/assets/logo-lockup-mark.svg && f=dist/404.html && grep -q '<html lang="en"' $f && grep -q 'href="#main"' $f && grep -q '<main id="main"' $f && grep -q 'name="robots" content="noindex"' $f && grep -q 'aria-label="atHand, home"' $f && grep -q 'aria-label="Appearance"' $f && [ $(grep -o 'data-theme-set=' $f | wc -l) -eq 3 ] && grep -q 'href="https://jacobdavis.co"' $f && grep -q 'Made by Jacob Davis' $f && grep -q 'href="/support.html"' $f && ! grep -q 'individual developer in New York' $f`

- [x] 02-05: check:external and check:content scripts
  Requirements: FND-12, FND-13
  Files: scripts/check-external.mjs, scripts/check-main-text.mjs
  Copy entries: none
  Steps:
  1. scripts/check-external.mjs (decision 19; plain Node ESM, built-in modules only): takes a directory argument (default `dist`); exits 1 if it is missing or holds no .html file. Walks every .html, .css, .js, .mjs, and .svg file. In HTML it collects `src`, `srcset` (each candidate), `poster`, `data` (on object), `action` (on form), `href` on `<link>`, `src` on `<script>`, `url()` and `@import` inside `<style>` blocks and `style` attributes, and every `http://` or `https://` string inside inline `<script>` blocks. In CSS it collects `url()` and `@import`. In JS it collects every `http://` or `https://` string literal. It allows relative URLs, root-relative URLs (`/` but not `//`), fragment-only URLs, `data:` URLs, and absolute URLs whose host is athandapp.com. It ignores `<a href>` and the `xmlns` attribute. It prints each offender as `file: attribute or context: URL` and exits 1 if any exist; otherwise it prints the file count and `check:external: no third-party requests`.
  2. scripts/check-main-text.mjs (decision 17; plain Node ESM, built-in modules only): env `PRE_PORT_REF` defaults to `52d8d1afc6de84391e401c738905da3f186f9f50`; optional page names as arguments (default index, privacy, support, 404). For each page it reads the pre-port file with `git show <ref>:<page>.html` and the built `dist/<page>.html`, extracts the inner HTML of the single `<main ...>` element, and from each computes (a) the visible text: drop comments, `<script>` and `<style>` blocks, replace tags with a space, decode the five XML entities and numeric entities, collapse all whitespace to single spaces, trim; and (b) the ordered list of `href` values of `<a>` elements. It requires both to be equal, prints the first differing position with 60 characters of context on each side, and exits 1 on any difference or a missing file. On success it prints `check:content: <page> main text and links match <ref>` per page.
  3. Self-tests run from the verify command only (no fixture files committed): a temp dir with an HTML file that loads `https://example.com/x.js` must fail check:external; a temp dir with only a mailto and an outbound `<a href>` must pass.
  Acceptance: `npm run check:external` passes on the current dist/; it fails on the third-party fixture and passes on the link-only fixture; `node scripts/check-main-text.mjs 404` passes.
  Verify command: `npm run build && npm run check:external && D=$(mktemp -d) && printf '<!doctype html><html><head><script src="https://example.com/x.js"></script></head><body><main></main></body></html>' > "$D/a.html" && ! node scripts/check-external.mjs "$D" && printf '<!doctype html><html><body><main><a href="https://jacobdavis.co">x</a><a href="mailto:support@athandapp.com">y</a></main></body></html>' > "$D/a.html" && node scripts/check-external.mjs "$D" && node scripts/check-main-text.mjs 404`

Wave 1 checks: `npm ci`, `npm run build`, `npm run check`, `npm run tokens:check`, `npm run check:external`, `node scripts/check-main-text.mjs 404`.

Live site after this wave: unchanged. Pages still deploys main from the root with build type legacy; .nojekyll stops Jekyll from parsing .astro frontmatter or turning src/ into pages; the root index.html, privacy.html, support.html, 404.html, styles.css, and CNAME are untouched, so every URL serves exactly what it serves today. No workflow exists yet, so nothing else runs on merge.

## Wave 2

Completes the Astro site and adds the Deploy workflow. The live site still serves the root HTML until Jake switches the Pages source (Steps for Jake, step 2).

- [ ] 02-06: Port the home page
  Requirements: FND-01, FND-12
  Files: src/pages/index.astro
  Copy entries: none (main content moves unchanged)
  Steps:
  1. `<Base title="atHand: Your Info, Ready" description="atHand keeps your personal reference information on your iPhone and shows the right record when you need it.">` (index.html:6-7 verbatim).
  2. Paste index.html:19-46 (the `<div class="wrap">` block inside main) unchanged.
  Acceptance: dist/index.html exists; its main text and links match the pre-port index.html exactly; title and description match.
  Verify command: `npm run build && node scripts/check-main-text.mjs index && grep -q '<title>atHand: Your Info, Ready</title>' dist/index.html && grep -q 'content="atHand keeps your personal reference information on your iPhone and shows the right record when you need it."' dist/index.html`

- [ ] 02-07: Port the privacy and support pages
  Requirements: FND-01, FND-12
  Files: src/pages/privacy.astro, src/pages/support.astro
  Copy entries: none (main content moves unchanged)
  Steps:
  1. Copy each page's `<title>` and description meta values verbatim from privacy.html and support.html into the Base props.
  2. Paste privacy.html:19-89 and support.html:19-63 (each page's block inside main) unchanged. The privacy policy's "Who this applies to" identification stays as is (decision 22).
  Acceptance: dist/privacy.html and dist/support.html exist at those exact paths (not privacy/index.html); main text and links match the pre-port files exactly; titles and descriptions match; the four outbound policy links are present.
  Verify command: `npm run build && test -f dist/privacy.html && test -f dist/support.html && test ! -e dist/privacy && test ! -e dist/support && node scripts/check-main-text.mjs privacy support && node -e 'const {execSync}=require("child_process"),fs=require("fs");const re=[/<title>[^<]*<\/title>/,/<meta name="description" content="[^"]*">/];for(const p of ["privacy","support"]){const o=execSync("git show 52d8d1afc6de84391e401c738905da3f186f9f50:"+p+".html","utf8"),n=fs.readFileSync("dist/"+p+".html","utf8");for(const r of re){const m=o.match(r)[0].replace(/>$/,"");if(!n.includes(m)){console.error(p,m);process.exit(1)}}}' && [ $(grep -o 'href="https://' dist/privacy.html | wc -l) -ge 5 ]`

- [ ] 02-08: Deploy workflow
  Requirements: FND-02, FND-13
  Files: .github/workflows/deploy.yml
  Copy entries: none
  Steps:
  1. `name: Deploy`; `on: push: branches: [main]` and `workflow_dispatch:`; top-level `permissions: contents: read, pages: write, id-token: write`; `concurrency: group: pages, cancel-in-progress: false` (decision 4).
  2. Job `build` on ubuntu-latest: actions/checkout@v5; actions/setup-node@v5 with `node-version: 22` and `cache: npm`; actions/configure-pages@v5; `npm ci`; `npm run build`; `npm run check`; `npm run check:external`; `npm run check:content` (git history is needed, so checkout uses `fetch-depth: 0`); actions/upload-pages-artifact@v4 with `path: dist`. Use the latest major version of each action at EXECUTE time, pinned by major tag, and record the versions in SUMMARY.md.
  3. Job `deploy`: `needs: build`, `environment: name: github-pages, url: ${{ steps.deployment.outputs.page_url }}`, one step actions/deploy-pages@v4 with `id: deployment`.
  4. tokens:check is deliberately absent (decision 5); add a YAML comment saying why.
  Acceptance: the workflow parses; it runs on push to main and on manual dispatch; the build job runs the four checks before upload; no step runs tokens:check; only the official actions/* actions are used.
  Verify command: `node -e 'const s=require("fs").readFileSync(".github/workflows/deploy.yml","utf8");for(const k of ["name: Deploy","workflow_dispatch","branches: [main]","pages: write","id-token: write","npm ci","npm run build","npm run check","npm run check:external","npm run check:content","actions/upload-pages-artifact","actions/deploy-pages","actions/configure-pages","path: dist","fetch-depth: 0"])if(!s.includes(k)){console.error("missing",k);process.exit(1)}if(/run:.*tokens:check/.test(s)||/uses:\s*(?!actions\/)/.test(s))process.exit(1)' && npm run build && npm run check && npm run check:external && npm run check:content`

Wave 2 checks: `npm ci`, `npm run build`, `npm run check`, `npm run tokens:check`, `npm run check:external`, `npm run check:content`. Also open http://localhost:4321 with `npm run preview` in the built-in browser and confirm the four pages render, the theme buttons switch and persist across a reload, and dist/ requests only localhost; record the result in SUMMARY.md.

Live site after this wave: unchanged until Jake switches the source. The push to main starts a Deploy run whose deploy job fails while the source is "Deploy from a branch"; the branch deployment keeps serving the root HTML (.nojekyll still in place). After Jake's switch and a manual Deploy run, athandapp.com serves dist/, which holds all four pages at /, /privacy.html, /support.html, and /404.html, and public/CNAME.

## Wave 3

Cleanup and README, after the Actions deployment is confirmed live.

- [ ] 02-09: Remove the root site files
  Requirements: FND-03
  Files: index.html, privacy.html, support.html, 404.html, styles.css, CNAME, .nojekyll
  Copy entries: none
  Steps:
  1. Gate. Run `gh api repos/davisj2007/athand-site/pages --jq .build_type` and `gh run list --workflow Deploy --branch main --limit 1 --json conclusion --jq '.[0].conclusion'`. Continue only if they print `workflow` and `success`, and `curl -sI https://athandapp.com/privacy.html` returns 200 with the built page (`curl -s https://athandapp.com/privacy.html | grep -q 'aria-label="Appearance"'`). Otherwise stop and record under Blockers in STATE.md that Steps for Jake, step 2, is not done.
  2. `git rm index.html privacy.html support.html 404.html styles.css CNAME .nojekyll`.
  3. `npm run check:content` still passes, because it reads the pre-port files from 52d8d1a.
  Acceptance: the gate passed and its output is in SUMMARY.md; none of the seven files exist at the root; public/CNAME is unchanged; all checks pass.
  Verify command: `for f in index.html privacy.html support.html 404.html styles.css CNAME .nojekyll; do test ! -e "$f" || exit 1; done && test "$(cat public/CNAME)" = athandapp.com && npm run build && npm run check && npm run check:external && npm run check:content`

- [ ] 02-10: README
  Requirements: FND-14
  Files: README.md
  Copy entries: none (repository documentation, not site copy)
  Steps:
  1. Rewrite README.md (decision 20): what the repo is; requirements (Node 22.23.4 or later, npm); `npm ci`, `npm run dev`, `npm run build`, `npm run preview`; where pages, layout, components, tokens, and scripts live; the Deploy workflow (push to main or manual run, the checks it runs, and that the Pages source must be "GitHub Actions" with custom domain athandapp.com); `npm run tokens:check` with `ATHAND_APP_DIR` (default ../athandapp), the header line format, why fonts.css is not copied, and why the check does not run in CI (the app repo is private); `npm run check:external` and what it allows; `npm run check:content` and `PRE_PORT_REF`. American English, Oxford comma, no em dashes.
  Acceptance: README.md mentions each of: `npm run build`, `Deploy`, `GitHub Actions`, `tokens:check`, `ATHAND_APP_DIR`, `check:external`, `check:content`; it no longer says the site is served from the repository root or has no build step; it contains no em dash.
  Verify command: `for k in 'npm run build' 'Deploy' 'GitHub Actions' 'tokens:check' 'ATHAND_APP_DIR' 'check:external' 'check:content'; do grep -qF "$k" README.md || exit 1; done && ! grep -qiE 'repository root|no build step' README.md && ! grep -q "$(printf '\342\200\224')" README.md`

Wave 3 checks: `npm ci`, `npm run build`, `npm run check`, `npm run tokens:check`, `npm run check:external`, `npm run check:content`.

Live site after this wave: unchanged. Pages deploys only the Actions artifact (dist/), so the root files were no longer served; the custom domain lives in the Pages settings and public/CNAME ships in dist/. The Deploy run on this merge republishes the same build.

## Static checks for VERIFY

Run after `npm ci && npm run build`. Each must hold as stated.

1. `npm run check`: 0 errors, 0 warnings.
2. `npm run tokens:check`: exit 0, prints the fonts.css exception line.
3. `npm run check:external`: exit 0.
4. `npm run check:content`: exit 0 for index, privacy, support, and 404.
5. `ls dist/index.html dist/privacy.html dist/support.html dist/404.html dist/CNAME`: all exist; `test ! -d dist/privacy && test ! -d dist/support`.
6. `grep -rlE 'fonts\.googleapis\.com|fonts\.gstatic\.com' dist src public` returns nothing.
7. `grep -rIl -E 'https?://' dist --include='*.css' --include='*.js'` returns nothing.
8. Font files in dist/_astro/: at most 16 (.woff2 and .woff for the eight faces); every name matches `^(inter-latin-(400|500|600|700|800)|space-grotesk-latin-(500|600|700))-normal\.`; none contains `italic`, `cyrillic`, `greek`, `vietnamese`, or `ext`.
9. `grep -rn 'atHand is made by Jacob Davis' dist` returns nothing (footer sentence removed); dist/privacy.html contains "atHand is published by Jacob Davis, an individual developer in New York, United States." exactly once (the policy keeps its identification, privacy.html:25).
10. `grep -L 'Made by Jacob Davis' dist/*.html` returns nothing, and every page has `href="https://jacobdavis.co"`.
11. `grep -L 'aria-label="atHand, home"' dist/*.html` returns nothing.
12. `grep -rn '@Hand' src dist` returns nothing (the lockup is an SVG plus "Hand"; the @Hand form never appears as text).
13. `grep -rn "$(printf '\342\200\224')" src README.md --exclude-dir=tokens` returns nothing (no em dashes). src/styles/tokens/ is excluded because it holds the app's token files copied byte for byte (FND-04); their em dashes are in CSS comments the app owns, not site copy. tokens:check and static check 19 already govern those files.
14. `grep -rnE "[a-z]'[a-z]" src/pages` returns nothing (curly apostrophes only).
15. `grep -rnE 'nothing leaves your phone|never leaves your (phone|device)' src dist` returns nothing.
16. `grep -rnE '<(iframe|form|embed|object)\b' dist` returns nothing.
17. `grep -nE 'transition|animation' src/styles/site.css` returns nothing.
18. `grep -nE 'font-size:\s*(0?\.[0-9]+rem|1[0-5]px|[0-9]px)' src/styles/site.css` returns nothing.
19. For each token file, line 1 matches the header pattern, and `tail -n +2 src/styles/tokens/<name>.css | cmp - <app>/tokens/<name>.css` succeeds (an independent check of what tokens:check does).
20. `cmp src/assets/logo-lockup-mark.svg <app>/assets/logo-lockup-mark.svg` succeeds.
21. `test -z "$(ls src/styles/tokens | grep -v -E '^(colors|effects|spacing|typography)\.css$')"` (no fonts.css copied).
22. `gh api repos/davisj2007/athand-site/pages --jq .build_type` prints `workflow`, and the latest Deploy run on main concluded `success`.
23. In the built-in browser against `npm run preview`, and with axe-core where the session can load it locally: each page in System, Light, and Dark; theme choice persists across reload; with JavaScript disabled the theme control is absent and the page follows the OS; the theme control buttons measure at least 44 by 44 CSS px; at a 320 CSS px viewport (the 400% zoom equivalent of 1280) no horizontal scrolling. Record results in VERIFY.md.

## Risks and rollback

- Pages source switch. The one window where the site could break is the switch after wave 2. Mitigation: the switch happens only after dist/ holds all four pages and every check passes; Jake runs Deploy by hand and checks three URLs; rollback is to set Source back to "Deploy from a branch", main, / (root), which serves the untouched root HTML. That rollback stops working after wave 3 removes the root files, which is why wave 3 gates on a confirmed Actions deployment.
- Custom domain on switch. GitHub usually keeps the custom domain and certificate when the source changes. If the field clears, Jake re-enters athandapp.com; the certificate already covers athandapp.com and www.athandapp.com (expires 2027-01-04).
- Expected red run. The Deploy run triggered by the wave 2 merge fails at deploy while the source is the branch. It changes nothing on the live site.
- Astro output differences. Astro may reformat whitespace or attribute order inside main. check:content compares visible text and link targets, not raw markup, so it catches wording and link changes without failing on formatting. If Astro changes a character (for example a curly apostrophe), the check fails and the task fixes it within its files.
- Font weights. If Astro or @fontsource emits a file outside the eight named faces, static check 8 fails.
- Node version. Astro 7.4.2 needs Node 22.23.4 or later; the workflow uses the latest 22.x. Local sessions run Node 26, which is also in range.
- typescript is pinned to 6.0.3 because @astrojs/check 0.9.12 does not accept 7.x. A later upgrade goes through BACKLOG.md.
- Root files published between wave 1 and the switch (package.json, src/, scripts/, .github/) are public in the repo already and hold no secrets.
- General rollback for any wave: revert the PR on main. Before the switch, the branch deployment republishes the reverted root. After the switch, the Deploy workflow republishes the previous build.

## Self-check

Run 2026-10-23 at PLAN.

- All phase requirements covered: yes. FND-01 to FND-14 each map to at least one task (Requirement coverage).
- Every task has acceptance and verify: yes. 02-01 to 02-10 each list Acceptance and a Verify command.
- No conflict with the brief or CLAUDE.md: yes. No product claims added; main content moves unchanged and is checked by check:content; zero third-party runtime requests, checked by check:external and static checks 6, 7, and 16; tokens byte for byte except fonts.css; 17px body, 16px minimum, 44px targets, underlined links (no color-only meaning), reduced motion via the tokens' rule and no site animation; @Hand only as the lockup; /privacy.html and /support.html keep their URLs (02-07 and static check 5); no new dependency beyond the five named in CONTEXT decision 2.
- Files in scope complete: yes. Every file each task touches is listed; Base.astro imports @fontsource CSS from node_modules, which is not a repo file.
- Every wave leaves the live site whole: yes. Waves 1 and 2 leave the root deployment untouched; the switch follows wave 2 with a tested rollback; wave 3 gates on a confirmed Actions deployment before removing anything.
- One deviation from CONTEXT recorded: decision 6's "wave 1" is split into waves 1 and 2 (see Refinement of CONTEXT decision 6).

Re-run 2026-10-24 at REVISE (static check 13 now excludes src/styles/tokens/).

- All phase requirements covered: yes. No task or requirement mapping changed.
- Every task has acceptance and verify: yes. No task changed.
- No conflict with the brief or CLAUDE.md: yes. The no em dash rule covers site copy; every file under src/ and README.md that the site authors is still checked. The excluded token files are the app's own, kept byte for byte by FND-04 and governed by tokens:check and static check 19. Run on main at ad6bc8d, the revised check returns nothing; the old form matched only src/styles/tokens/colors.css and effects.css.
- Files in scope complete: yes. No task files changed.
- Every wave leaves the live site whole: yes. Waves unchanged; wave 1 is merged.

## Fix wave

(added by VERIFY if needed)
