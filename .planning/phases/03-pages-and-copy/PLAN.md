# Phase 03: pages-and-copy - Plan

Status: Approved 2026-10-25

## Goal

Grow athandapp.com into a small product site: a rewritten Home, new Features, Pricing, and Privacy overview pages, an expanded Support and FAQ at /support.html, and a header navigation that reaches every page and marks the current one. Every string is Approved copy from CONTEXT.md, each claim cites a brief section in its PR, the coming-soon line stays, no price is stated, and /privacy.html and /404.html are unchanged (CONTEXT.md, Goal).

## Facts confirmed at PLAN time (2026-10-24)

- This repo: main at 5973706 (ANSWERS PR #18 merged). `npm run build` emits dist/index.html, privacy.html, support.html, and 404.html; `npm run check:content` passes on all four.
- App repo davisj2007/athandapp: origin/main is still 60032bf3848847b642443a59178ee40e385c9850, the commit CONTEXT.md read. Brief v4.12. `git diff 60032bf origin/main` over the brief, app/settings.tsx, app/backup.tsx, lib/signals.ts, lib/contextRules.ts, lib/auth.ts, and the _ds tokens is empty.
- The Deploy workflow runs `npm run check:content`, which today compares the main text of index, privacy, support, and 404 with the pre-port HTML. Rewriting Home and Support would fail it, the deploy job would not run, and the merge would not publish. Task 03-06 narrows its default to the two pages this phase leaves unchanged (privacy and 404) in the same wave that rewrites Home and Support. Home and Support are then held to the Approved copy by scripts/check-text.mjs instead (see Risks).
- Static check baselines on today's build all return nothing: en and em dashes, straight apostrophes between letters in src/pages and src/components, "@Hand", "nothing leaves" or "never leaves", price patterns, and the out-of-scope words in check S6 below. Every root-relative `<a href>` in dist/ resolves to a file.
- zsh expands an unquoted `--include=*.html`, so every grep in this plan quotes its globs.
- Every built page contains the word "sync" today, from the theme script's `sync()` function in the head, so any check for "sync" reads main text only (S6).

## Expected-copy fixtures

The Approved copy for each page is transcribed into .planning/phases/03-pages-and-copy/copy/: index.txt, features.txt, pricing.txt, privacy-overview.txt, and support.txt. PLAN wrote them from CONTEXT.md, and a script check at PLAN time confirmed every expected line appears verbatim in CONTEXT.md (the only exception is the absent-string line "Support and help", the old link text at index.astro:30). Each file has one string per line, `# <entry>` comments naming the Copy drafts entry, `title:` and `description:` lines for the head, `href:` lines for link targets inside main, and `!` lines for strings that must not appear. scripts/check-text.mjs (task 03-01) reads them. EXECUTE does not edit these files; if one is wrong, stop and record a blocker.

## Requirement coverage

- PAGE-01: 03-09
- PAGE-02: 03-03
- PAGE-03: 03-04
- PAGE-04: 03-05
- PAGE-05: 03-10
- PAGE-06: 03-01, 03-03, 03-04, 03-05, 03-08, 03-09, 03-10 (each fixture check, plus the claim list in each wave's PR)
- PAGE-07: 03-01 (check:links), 03-07
- PAGE-08: 03-02, 03-03, 03-04, 03-09

## Files in scope

EXECUTE may change only these.

Added:

- scripts/check-text.mjs
- scripts/check-links.mjs
- src/components/ComingSoon.astro
- src/pages/features.astro
- src/pages/pricing.astro
- src/pages/privacy-overview.astro

Changed:

- package.json (scripts only: add `check:links`; dependencies untouched)
- .github/workflows/deploy.yml (one step: `npm run check:links`)
- scripts/check-main-text.mjs (default page list only)
- README.md
- src/layouts/Base.astro
- src/components/Header.astro
- src/components/Footer.astro
- src/styles/site.css
- src/pages/index.astro
- src/pages/support.astro
- .planning/ files the loop names (PLAN.md checkboxes, SUMMARY.md, STATE.md, BACKLOG.md)

Not changed: src/pages/privacy.astro, src/pages/404.astro, src/components/ThemeControl.astro, src/styles/tokens/, public/, package-lock.json, and the copy/ fixtures.

## Steps for Jake outside the repo

None. No GitHub settings change. After each wave merges, the Deploy workflow publishes it as usual.

## Wave 1

Adds the two check scripts, the coming-soon component, and the three new pages. The new pages are complete but not yet linked from the header or Home; they are reachable by URL.

- [x] 03-01: check:text and check:links scripts
  Requirements: PAGE-06, PAGE-07
  Files: scripts/check-text.mjs, scripts/check-links.mjs, package.json, .github/workflows/deploy.yml, README.md
  Copy entries: none
  Steps:
  1. scripts/check-text.mjs (plain Node ESM, built-in modules only, same style as check-main-text.mjs): usage `node scripts/check-text.mjs <dist html file> <fixture file>`. Reads the fixture: skip blank lines and lines starting with `#`. From the HTML, take the `<title>` text, the `content` of `<meta name="description">`, and the inner HTML of the single `<main>` (exit 1 unless exactly one). Main text: drop comments, `<script>` and `<style>` blocks, remove tags (replace with nothing, so an inline link joins its sentence), decode the five XML entities and numeric entities, collapse whitespace to single spaces. Title and description are decoded the same way. Then for each fixture line: `title: X` requires the title to equal X; `description: X` requires the description to equal X; `href: U` requires an `<a>` inside main whose href equals U; `!X` requires main text not to contain X; any other line requires main text to contain it. Print every failure as `check:text: <file>: missing|present|title|description|href: <value>` and exit 1 on any; on success print `check:text: <file>: <n> lines match`.
  2. scripts/check-links.mjs (plain Node ESM, built-in modules only): takes a directory argument (default `dist`); exits 1 if it is missing or holds no .html file. For every `<a href>` in every .html file, skip values with a scheme (`https:`, `mailto:`, and so on), `//` values, and fragment-only values; strip any query or fragment; resolve `/` to index.html, a trailing `/` to `index.html` inside it, and relative paths against the file's directory; require the target file to exist in the directory. Print each broken link as `file: href` and exit 1 if any; otherwise print `check:links: <n> internal links resolve`.
  3. package.json: add `"check:links": "node scripts/check-links.mjs dist"` to scripts. Nothing else changes; package-lock.json is untouched.
  4. .github/workflows/deploy.yml: add `- run: npm run check:links` after `npm run check:external`. No other change.
  5. README.md: list check:links beside the other checks under Commands, add it to the Deploy paragraph's list of build job steps, and add a short "check:links" section and a "check:text" section (usage with a fixture path; not run by the workflow).
  Acceptance: both scripts pass on today's build for the pages they can check; check-links fails on a fixture with a broken root-relative link and passes on one with only outbound, mailto, and fragment links; check-text fails when an expected line is missing and when a `!` line is present; package.json dependencies are unchanged.
  Verify command: `npm run build && npm run check:links && D=$(mktemp -d) && printf '<!doctype html><html><body><main><a href="/missing.html">x</a></main></body></html>' > "$D/a.html" && ! node scripts/check-links.mjs "$D" && printf '<!doctype html><html><head><title>T</title><meta name="description" content="D"></head><body><main><p>Read the <a href="/privacy.html">policy</a>.</p><a href="https://jacobdavis.co">j</a><a href="mailto:support@athandapp.com">m</a><a href="#main">s</a></main></body></html>' > "$D/a.html" && node scripts/check-links.mjs "$D" && printf 'title: T\ndescription: D\nRead the policy.\nhref: /privacy.html\n!Learn more\n' > "$D/ok.txt" && node scripts/check-text.mjs "$D/a.html" "$D/ok.txt" && printf 'Not on the page\n' > "$D/miss.txt" && ! node scripts/check-text.mjs "$D/a.html" "$D/miss.txt" && printf '!Read the policy\n' > "$D/absent.txt" && ! node scripts/check-text.mjs "$D/a.html" "$D/absent.txt" && git diff --quiet 5973706 -- package-lock.json && node -e 'const p=require("./package.json");if(JSON.stringify(p.dependencies)!==JSON.stringify({"@astrojs/check":"0.9.12","@fontsource/inter":"5.3.0","@fontsource/space-grotesk":"5.3.0","astro":"7.4.2","typescript":"6.0.3"})||p.devDependencies)process.exit(1)' && grep -q 'run: npm run check:links' .github/workflows/deploy.yml`

- [x] 03-02: Coming-soon component
  Requirements: PAGE-08
  Files: src/components/ComingSoon.astro, src/pages/index.astro
  Copy entries: C1
  Steps:
  1. src/components/ComingSoon.astro renders exactly `<p>Coming soon to the App Store for iPhone.</p>` (CONTEXT decision 5). No props.
  2. In src/pages/index.astro, replace the literal line at index.astro:8 with `<ComingSoon />` and import it. Nothing else on Home changes in this wave.
  Acceptance: dist/index.html main text and links are unchanged (check:content still passes on all four pages); the string appears once in dist/index.html.
  Verify command: `npm run build && npm run check:content && test "$(grep -o 'Coming soon to the App Store for iPhone.' dist/index.html | wc -l | tr -d ' ')" = 1 && ! grep -q 'Coming soon' src/pages/index.astro`

- [x] 03-03: Features page
  Requirements: PAGE-02, PAGE-06, PAGE-08
  Files: src/pages/features.astro
  Copy entries: FE1 to FE30, C1 (FE31 is not in this phase)
  Steps:
  1. `<Base title={FE1} description={FE2}>`, then `<div class="wrap">` like the existing pages.
  2. h1 FE3; `<p class="lede">` FE4; `<ComingSoon />`.
  3. Five h2 sections in this order, each followed by its paragraphs as `<p>`: FE5 with FE6 to FE9; FE10 with FE11 to FE14; FE15 with FE16 to FE19; FE20 with FE21 to FE24; FE25 with FE26 to FE28; then h2 FE29 with FE30.
  4. FE18: the second sentence, "Read how atHand handles your information.", is a link to /privacy-overview.html (link text without the period; the period follows the link). It is an inline link in a sentence, so the underline rule for main links applies.
  5. No accessibility section (decision 15). No images.
  Acceptance: dist/features.html exists at that path; check-text passes against copy/features.txt; exactly one h1 and six h2. The FE18 link target arrives in 03-05, so check:links runs in 03-05's verify and the wave checks, not here.
  Verify command: `npm run build && node scripts/check-text.mjs dist/features.html .planning/phases/03-pages-and-copy/copy/features.txt && test "$(grep -o '<h1' dist/features.html | wc -l | tr -d ' ')" = 1 && test "$(grep -o '<h2' dist/features.html | wc -l | tr -d ' ')" = 6`

- [x] 03-04: Pricing page
  Requirements: PAGE-03, PAGE-06, PAGE-08
  Files: src/pages/pricing.astro
  Copy entries: P1 to P19, C1
  Steps:
  1. `<Base title={P1} description={P2}>`, `<div class="wrap">`.
  2. h1 P3; `<p class="lede">` P4; `<ComingSoon />`.
  3. h2 P5; `<p>` P6; `<ul>` with the four P7 items.
  4. h2 P8; `<p>` P9; `<ul>` with the three P10 items; `<p>` P11.
  5. h2 P12; `<p>` P13, P14, P15.
  6. h2 P16; `<p>` P17, P18.
  7. `<p>` P19, with "See Support" linking to /support.html.
  8. No amount, currency symbol, or "price" figure anywhere on the page.
  Acceptance: dist/pricing.html exists; check-text passes against copy/pricing.txt; the page contains "one-time purchase" (case-insensitive) and no price pattern.
  Verify command: `npm run build && node scripts/check-text.mjs dist/pricing.html .planning/phases/03-pages-and-copy/copy/pricing.txt && grep -qi 'one-time purchase' dist/pricing.html && ! grep -qE '\$[0-9]|[0-9]\.[0-9]{2}|USD|€|£' dist/pricing.html`

- [x] 03-05: Privacy overview page
  Requirements: PAGE-04, PAGE-06
  Files: src/pages/privacy-overview.astro
  Copy entries: V1 to V24
  Steps:
  1. `<Base title={V1} description={V2}>`, `<div class="wrap">`. The page builds to /privacy-overview.html (decision 14).
  2. h1 V3; `<p class="lede">` V4. No coming-soon line (decision 5: the overview does not talk about getting the app).
  3. h2 V5; `<p>` V6, V7, V8.
  4. h2 V9; `<p>` V10; h3 V11 with `<p>` V12; h3 V13 with `<p>` V14; h3 V15 with `<p>` V16; then `<p>` V17 after the three subsections.
  5. h2 V18; `<ul>` with the two V19 items.
  6. h2 V20; `<p>` V21, V22.
  7. h2 V23; `<p>` V24, with "full privacy policy" linking to /privacy.html and the address as a mailto link.
  Acceptance: dist/privacy-overview.html exists; check-text passes against copy/privacy-overview.txt; the page names Apple, RevenueCat, Google ML Kit, and Apple's geocoding service (every connection the policy names); no "nothing leaves" wording; src/pages/privacy.astro is unchanged.
  Verify command: `npm run build && node scripts/check-text.mjs dist/privacy-overview.html .planning/phases/03-pages-and-copy/copy/privacy-overview.txt && for s in RevenueCat 'Google ML Kit' 'Apple’s geocoding service' 'Apple handles the purchase'; do grep -qF "$s" dist/privacy-overview.html || exit 1; done && ! grep -qiE 'nothing (ever )?leaves|never leaves' dist/privacy-overview.html && git diff --quiet 5973706 -- src/pages/privacy.astro && npm run check:links`

Wave 1 checks: `npm ci`, `npm run build`, `npm run check`, `npm run tokens:check`, `npm run check:external`, `npm run check:content` (all four pages, unchanged default), `npm run check:links`, and static checks S1 to S8 below. Also open `npm run preview` in the built-in browser, load /features.html, /pricing.html, and /privacy-overview.html in light and dark, and confirm they render with the existing header and footer; record it in SUMMARY.md.

Live site after this wave: Home, Privacy, Support, and 404 read exactly as today (check:content proves main text and links are unchanged). /features.html, /pricing.html, and /privacy-overview.html go live, reachable by URL only; each has the existing header (lockup home link, theme control) and footer, and every link on them resolves (check:links). The Deploy workflow gains one check step and still passes. Nothing links to the new pages yet, so no visitor path changes.

## Wave 2

Adds the header navigation, renames the footer policy link, rewrites Home, expands Support, and moves check:content to the two pages that stay unchanged. These land together so the site switches to the new structure in one merge.

- [x] 03-06: Narrow check:content to unchanged pages
  Requirements: PAGE-06 (keeps the deploy check meaningful while Home and Support change)
  Files: scripts/check-main-text.mjs, README.md
  Steps:
  1. scripts/check-main-text.mjs: change the default page list from `["index", "privacy", "support", "404"]` to `["privacy", "404"]`, with a one-line comment above it: Home and Support were rewritten in phase 03 and are checked against their Approved copy by check-text.mjs instead. Arguments still override the default. Nothing else in the script changes.
  2. README.md: update the check:content section to say it checks privacy and 404 by default and why; update the Layout section to list the seven pages (index, features, pricing, privacy-overview, privacy, support, 404 and their .html URLs) and ComingSoon.astro, and say Header.astro holds the main navigation.
  Acceptance: `npm run check:content` passes and names only privacy and 404; `node scripts/check-main-text.mjs index` still runs (and fails once 03-09 lands, which is expected).
  Verify command: `npm run build && out=$(npm run check:content 2>&1) && echo "$out" && echo "$out" | grep -q 'check:content: privacy main text and links match' && echo "$out" | grep -q 'check:content: 404 main text and links match' && ! echo "$out" | grep -qE 'check:content: (index|support) '`

- [x] 03-07: Header navigation with the current page
  Requirements: PAGE-07
  Files: src/layouts/Base.astro, src/components/Header.astro, src/styles/site.css
  Copy entries: N1, N2
  Steps:
  1. Base.astro: compute `const current = Astro.url.pathname.replace(/\.html$/, "").replace(/\/index$/, "/").replace(/(.)\/$/, "$1") || "/";` (so "/", "/index.html", "/features", and "/features.html" all normalize) and render `<Header current={current} />`. No new prop on Base; pages do not change for this.
  2. Header.astro: `interface Props { current: string }`. Links, in this order (decision 2): Features → /features.html (key "/features"), Pricing → /pricing.html ("/pricing"), Privacy → /privacy-overview.html ("/privacy-overview"), Support → /support.html ("/support"). Markup between the lockup and `<ThemeControl />`: `<nav class="site-nav" aria-label="Main"><ul>` with one `<li><a>` per link; the matching link gets `aria-current="page"`. The lockup link gets `aria-current="page"` when current is "/". On /privacy.html and /404.html no link is current (the "Privacy" link goes to the overview, not the policy; decision 14). No script.
  3. site.css, token variables only (decision 13), no font-size below 1rem and none set on nav links (they inherit the 17px body size): `.site-nav ul { list-style: none; margin: 0; padding: 0; display: flex; flex-wrap: wrap; gap: 0 1.25rem; }`, `.site-nav li { margin: 0; }`, `.site-nav a { display: inline-flex; align-items: center; min-height: var(--touch-min); min-width: var(--touch-min); font-weight: 500; color: var(--text-link); text-decoration: none; }`, `.site-nav a:hover { text-decoration: underline; text-decoration-thickness: 2px; text-underline-offset: 0.3em; }`, `.site-nav a[aria-current="page"] { font-weight: 700; text-decoration: underline; text-decoration-thickness: 3px; text-underline-offset: 0.3em; }` (decision 3: weight and a solid 3px underline, not color alone). The header row stays the existing wrapping flex row (lockup, nav, theme control) so items wrap at narrow widths and 400% zoom (decision 4). Add no transition or animation.
  Acceptance: every built page has one `<nav aria-label="Main">` with the four links in order; aria-current="page" appears exactly once on index, features, pricing, privacy-overview, and support, on the right link, and zero times on privacy and 404; nav links have 44px targets; the nav works with JavaScript off (no script in Header.astro); check:links passes.
  Verify command: `npm run build && node -e 'const fs=require("fs");const want={"index":"href=\"/\"","features":"/features.html","pricing":"/pricing.html","privacy-overview":"/privacy-overview.html","support":"/support.html","privacy":null,"404":null};for(const [p,h] of Object.entries(want)){const s=fs.readFileSync("dist/"+p+".html","utf8");const navs=s.match(/<nav[^>]*aria-label="Main"[^>]*>[\s\S]*?<\/nav>/g)||[];if(navs.length!==1)throw p+": nav count "+navs.length;const order=[...navs[0].matchAll(/href="([^"]+)"/g)].map(m=>m[1]).join(",");if(order!=="/features.html,/pricing.html,/privacy-overview.html,/support.html")throw p+": order "+order;const cur=[...s.matchAll(/<a\b[^>]*aria-current="page"[^>]*>/g)].map(m=>m[0]);if(h===null?cur.length!==0:(cur.length!==1||!cur[0].includes(h)))throw p+": aria-current "+JSON.stringify(cur)}' && ! grep -q '<script' src/components/Header.astro && npm run check:links && ! grep -nE 'font-size:\s*0?\.[0-9]+rem|font-size:\s*(1[0-5]|[0-9])px' src/styles/site.css`

- [x] 03-08: Footer policy link name
  Requirements: PAGE-07 (distinct link names beside the header "Privacy" link)
  Files: src/components/Footer.astro
  Copy entries: F1
  Steps:
  1. Change the link text "Privacy" (Footer.astro:5) to "Privacy policy". Its href stays /privacy.html. Nothing else changes.
  Acceptance: every built page's footer has a link "Privacy policy" to /privacy.html and no footer link named only "Privacy".
  Verify command: `npm run build && for f in dist/*.html; do grep -q '<a href="/privacy.html">Privacy policy</a>' "$f" || { echo "$f"; exit 1; }; ! grep -q '<a href="/privacy.html">Privacy</a>' "$f" || { echo "$f"; exit 1; }; done`

- [x] 03-09: Home page rewrite
  Requirements: PAGE-01, PAGE-06, PAGE-08
  Files: src/pages/index.astro
  Copy entries: H1 to H22, C1
  Steps:
  1. `<Base title={H1} description={H2}>` (title unchanged; description replaced; decision 11).
  2. h1 H3; `<p class="lede">` H4; `<ComingSoon />`.
  3. h2 H5; `<p>` H6.
  4. h2 H7; `<ul>` with H8 to H11; then `<ul class="links">` with one item, H12 linking to /features.html (a standalone link, so it uses the existing 44px `.links` pattern).
  5. `<section class="panel" aria-labelledby="privacy-summary">` with h2 H13 (id privacy-summary, as today); `<ul>` with H14 to H17; then `<ul class="links">` with the two H18 links: "How atHand handles your information" to /privacy-overview.html, "Read the full privacy policy" to /privacy.html.
  6. h2 H19; `<p>` H20; `<ul class="links">` with H21 linking to /pricing.html.
  7. Remove everything H22 lists: the "How it works" section, the "no server" and unqualified "No advertising" items, the "Read the full privacy policy." sentence, and the "Learn more" list.
  Acceptance: check-text passes against copy/index.txt, including the removed strings; check:links passes; the panel keeps its labelled region.
  Verify command: `npm run build && node scripts/check-text.mjs dist/index.html .planning/phases/03-pages-and-copy/copy/index.txt && grep -q 'aria-labelledby="privacy-summary"' dist/index.html && npm run check:links`

- [x] 03-10: Support and FAQ expansion
  Requirements: PAGE-05, PAGE-06
  Files: src/pages/support.astro
  Copy entries: S1 to S58 (there is no S56)
  Steps:
  1. Base props unchanged (S1, S2). h1 S3; lede S4; h2 S5 with the S6 list; `<p>` S7. These are unchanged from today.
  2. Remove the "Common questions" h2 (S8). Add the seven h2 group headings in order, each followed by its h3 questions and `<p>` answers (decision 7; no disclosure widgets): S9 Backups (S10/S11, S12/S13, S14/S15, S16/S17, S18, S19); S20 Purchases (S21/S22, S23/S24, S25/S26, S27/S28, S29/S30, S31/S32); S33 App lock (S34/S35, S36/S37, S38/S39); S40 Scanning (S41, S42/S43, S44, S45/S46); S47 Suggestions (S48/S49, S50/S51); S52 Permissions and your data (S53, S54, S55); S57 About atHand (S58).
  3. Links: S22 "See Pricing" to /pricing.html; S46 "privacy policy" to /privacy.html; S53 "privacy policy" to /privacy.html (as today); S55 "privacy overview" to /privacy-overview.html and "privacy policy" to /privacy.html. Write "Backup &amp; restore" in S13 so the built HTML is valid.
  4. The URL stays /support.html; the file stays src/pages/support.astro.
  Acceptance: dist/support.html exists at that exact path; check-text passes against copy/support.txt; seven h2 group headings plus S5; check:links passes.
  Verify command: `npm run build && test -f dist/support.html && node scripts/check-text.mjs dist/support.html .planning/phases/03-pages-and-copy/copy/support.txt && test "$(grep -o '<h2' dist/support.html | wc -l | tr -d ' ')" = 8 && npm run check:links`

Wave 2 checks: `npm ci`, `npm run build`, `npm run check`, `npm run tokens:check`, `npm run check:external`, `npm run check:content` (privacy and 404), `npm run check:links`, check-text against all five fixtures, and static checks S1 to S10 below. Also open `npm run preview` in the built-in browser and confirm on every page: the nav reaches every page and marks the current one, the header wraps without horizontal scrolling at 320px wide and at 400% zoom, the theme control still works, and dist/ requests only localhost; record it in SUMMARY.md.

Live site after this wave: every page has the main navigation; Home is rewritten and links to Features, Pricing, the Privacy overview, and the policy; Support has the grouped FAQ at the same /support.html URL; the footer's policy link reads "Privacy policy". /privacy.html and /404.html main content is unchanged (check:content). Every internal link resolves (check:links), so nothing breaks.

## Static checks for VERIFY

Run from the repo root after `npm run build`. Each must succeed as written.

- S1. No em or en dashes in pages, components, layouts, or built HTML: `! grep -rn -e '—' -e '–' src/pages src/components src/layouts dist --include='*.astro' --include='*.html'`
- S2. No straight apostrophe between letters in page or component source: `! grep -rnE "[A-Za-z]'[A-Za-z]" src/pages src/components`
- S3. "@Hand" appears nowhere as text (the lockup renders "@" as an SVG and "Hand" as a span): `! grep -rn '@Hand' src dist`
- S4. No "nothing leaves your phone" equivalent: `! grep -rniE 'nothing (ever )?leaves|never leaves|stays on your phone' dist --include='*.html'`
- S5. No price: `! grep -nE '\$[0-9]|[0-9]\.[0-9]{2}|USD|€|£' dist/*.html`
- S6. No out-of-scope feature: `! grep -rniw -e android -e ipad -e icloud -e carplay -e bluetooth -e ai -e 'apple health' -e 'artificial intelligence' -e 'car connectivity' dist --include='*.html'`, and every main-text sentence that mentions a subscription or sync is an approved one (main only, because the theme script in the head has a `sync()` function): `node -e 'const fs=require("fs");const ok=["There is no subscription.","There is no subscription, no ads, and no account.","A backup is a one-time copy, not sync."];for(const f of fs.readdirSync("dist").filter(f=>f.endsWith(".html"))){const m=fs.readFileSync("dist/"+f,"utf8").match(/<main\b[^>]*>([\s\S]*?)<\/main>/)[1].replace(/<[^>]*>/g,"").replace(/\s+/g," ");for(const s of m.match(/[^.?]*\b(subscriptions?|sync)\b[^.]*\./gi)||[])if(!ok.includes(s.trim())){console.error(f+": "+s.trim());process.exitCode=1}}'`
- S7. Every page exists at its URL: `for p in index features pricing privacy-overview privacy support 404; do test -f dist/$p.html || exit 1; done && test ! -e dist/support && test ! -e dist/privacy`
- S8. Policy and 404 unchanged, no dependency change: `git diff --quiet 5973706 -- src/pages/privacy.astro src/pages/404.astro package-lock.json`
- S9. Coming-soon line exactly once on Home, Features, and Pricing, and on no other page: `for p in index features pricing; do test "$(grep -o 'Coming soon to the App Store for iPhone.' dist/$p.html | wc -l | tr -d ' ')" = 1 || exit 1; done && ! grep -l 'Coming soon' dist/privacy-overview.html dist/support.html dist/privacy.html dist/404.html`
- S10. Approved copy on every rewritten or new page: `for p in index features pricing privacy-overview support; do node scripts/check-text.mjs dist/$p.html .planning/phases/03-pages-and-copy/copy/$p.txt || exit 1; done`

VERIFY also reads each page against its Copy drafts entries in order (the fixtures prove presence, not order or heading level) and records the result per page, and runs axe-core in light and dark on all seven pages where the pre-installed Chromium allows.

## Risks and rollback

- check:content scope (03-06). Narrowing the deploy check from four pages to two is a deliberate change, not a skipped check: Home and Support are meant to change, and check-text against Jake-approved fixtures replaces it for them. It lands in the same wave as the rewrites; if it landed earlier, check:content would no longer guard Home and Support during wave 1, and if later, the wave 2 deploy would fail. Jake should confirm this in plan review.
- Astro.url.pathname form under build.format "file" is not confirmed at PLAN time. 03-07 normalizes both "/features" and "/features.html", and its verify proves the result in dist/.
- Header crowding. Lockup, four links, and three theme buttons wrap onto two or three rows on a phone. This is accepted (decision 4: no menu button, no JavaScript). VERIFY's 400% zoom and 320px checks catch overlap.
- Fixture transcription. The fixtures were checked against CONTEXT.md mechanically, but a reviewer should still skim them; a wrong fixture would make EXECUTE place wrong copy. EXECUTE stops rather than editing a fixture.
- 03-03's FE18 link points to /privacy-overview.html, which arrives in 03-05. Both are in wave 1, so the merge is whole; check:links runs at the wave level.
- Rollback: revert the wave's PR on main; the Deploy workflow republishes the previous build. Wave 1 adds pages nothing links to, so reverting it removes only those URLs. Reverting wave 2 restores the old Home, Support, header, and footer together, with check:content back to four pages.

## Self-check

Run 2026-10-24.

- All phase requirements covered: yes. PAGE-01 to PAGE-08 each map to at least one task above.
- Every task has acceptance and verify: yes. All ten tasks.
- No conflict with the brief or CLAUDE.md: yes. Copy comes only from Approved entries via the fixtures; no price, no out-of-scope feature, no "nothing leaves" wording (S4 to S6); no third-party request (check:external); no new dependency (03-01 verify, S8); /privacy.html and /support.html keep their URLs (S7); privacy.astro and 404.astro unchanged (S8); nav targets 44px with weight and underline for the current page (03-07); no font size below 16px (03-07 verify).
- Files in scope complete: yes. Every file a task names is listed; privacy.astro, 404.astro, ThemeControl.astro, tokens, and package-lock.json are named as not changed.
- Every wave leaves the live site whole: yes. Wave 1 changes no existing page's main content and adds unlinked pages whose links all resolve. Wave 2 adds the nav, Home, Support, footer, and the check:content change in one merge, with check:links proving every internal link resolves.

## Fix wave

None. VERIFY (2026-10-25) found every requirement PASS; see VERIFY.md.
