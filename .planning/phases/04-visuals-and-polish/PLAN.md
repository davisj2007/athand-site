# Phase 04: visuals-and-polish - Plan

Status: Approved (2026-10-25)

## Goal

Turn athandapp.com into the visual showcase HOME-DESIGN.md defines: App Store screenshots in a theme-aware phone frame, a rebuilt Home, a new header and footer, and a page top on Features, Pricing, Privacy overview, and Support, with /privacy.html and /404.html text only under the new chrome. Add the Open Graph image and tags, favicon and apple-touch-icon, sitemap, robots.txt, and JSON-LD, and build the checks that prove the layout and accessibility floor (CONTEXT.md, Goal). Every string is Approved copy from CONTEXT.md, no price appears in any page or served image, the coming-soon state stays, and the permanent URLs do not move. FEAT-01 is outside these waves (decision 21).

## Facts confirmed at PLAN time (2026-10-25)

- This repo: main at 4821a36 (ANSWERS PR #25 merged; no open PRs). Pages build to dist/index.html, features.html, pricing.html, privacy-overview.html, privacy.html, support.html, and 404.html.
- App repo davisj2007/athandapp: origin/main is still 60032bf3848847b642443a59178ee40e385c9850, the commit CONTEXT.md read (Brief v4.12). assets/icon.png is 1024 by 1024 RGBA; its lowest alpha value is 252, so it is not fully opaque and the apple-touch-icon must be flattened (task 04-19).
- Node 26.11.1, npm 11.20.0 locally. sharp 0.35.5 is already installed as a dependency of astro 7.4.2, so astro:assets can emit WebP with no new dependency. `sips` is at /usr/bin/sips.
- Pinned versions for decision 22: playwright 1.64.1 (published 2026-10-14) and axe-core 4.14.0 (published 2026-10-05). No Playwright browser is installed on this Mac yet (~/Library/Caches/ms-playwright does not exist).
- Paywall crop: HOME-DESIGN.md's perks crop (aspect 1320 / 1208 at object-position 50% 10.36%) selects rows 172 to 1379 of the 1320 by 2868 PNG. `sips -c 1208 1320 --cropOffset 172 0` produces exactly that region. PLAN viewed the light and dark results: each ends below the perks card and above the price card (which starts near row 1400), with no price or currency visible. Running the crop twice gives byte-identical output, so task 04-07's verify re-derives it from the originals at 4821a36.
- Icon flattening: `sips -z 180 180`, then a JPEG round trip at `formatOptions best`, then back to PNG gives a 180 by 180 PNG with `hasAlpha: no` (3 channels). Checked in a scratch directory.
- The reference builds hold 12 inline SVG icons with `aria-hidden`; tasks copy their path data where an icon exists there.
- zsh expands an unquoted `--include=*.html`, so every grep in this plan quotes its globs.
- Every built page contains "sync" in the theme script's `sync()` function, so any word check for "sync" reads main text only (S6).

## Expected-copy fixtures

PLAN wrote the Approved copy for each page whose main text changes into .planning/phases/04-visuals-and-polish/copy/ (decision 10): index.txt (new), and features.txt, pricing.txt, privacy-overview.txt, and support.txt (the phase 03 fixtures plus the phase 04 entries at the end). A script check at PLAN time confirmed every expected and absent line appears verbatim in phase 03 or phase 04 CONTEXT.md, apart from "!Free to start." (HOME-DESIGN.md's version, which must not appear). Format is phase 03's, plus one new line type that task 04-08 adds to scripts/check-text.mjs:

- `alt: X` requires an `<img>` inside main whose alt equals X, and, when a fixture has any `alt:` line, every `<img>` inside main must have an alt that matches one of them.

index.txt holds A9, approved as drafted in REVISE (decision 24). EXECUTE does not edit fixtures; if one is wrong, stop and record a blocker.

## Requirement coverage

- VIS-01: 04-07, 04-08, 04-09, 04-10, 04-11, 04-12, 04-14, 04-15
- VIS-02: 04-08, 04-12 (rendered pairs), 04-14
- VIS-03: 04-20, 04-21
- VIS-04: 04-19
- VIS-05: 04-03
- VIS-06: 04-04, 04-05, 04-06
- VIS-07: 04-09, 04-10, 04-11, 04-12
- VIS-08: 04-13, 04-14, 04-15, 04-16, 04-17, 04-18
- VIS-09: 04-07, static checks S5 and S14
- VIS-10: 04-01 (check:layout), run in every wave's checks from 04-06 on
- VIS-11: fixtures in every task that places copy, and the claim list in the PRs for waves 2, 3, and 4
- SEO-01: 04-22
- SEO-02: 04-22
- SEO-03: 04-23
- SEO-04: 04-23, static check S15
- A11Y-01: 04-02 (check:a11y, axe in light and dark), run in every wave's checks from 04-06 on
- A11Y-02: VERIFY browser checklist (VoiceOver in Safari); 04-08 and 04-12 prove one alt per visible frame and the hidden image out of the accessibility tree
- A11Y-03: 04-01 (check:layout includes 1280 at 400%)
- A11Y-04: 04-02 (axe color-contrast, 16px minimum, 17px body, 44px standalone targets), 04-09 and 04-11 (badge and band pairings named in HOME-DESIGN.md)
- A11Y-05: 04-02 (check:a11y with reduced motion)
- A11Y-06: VERIFY records the audit and Jake's browser result
- FEAT-01: not in these waves (decision 21). If the app repo records its TestFlight VoiceOver and Dynamic Type passes before SHIP, a REVISE adds a wave with the Features accessibility section; otherwise SHIP moves FEAT-01 to phase 04.1.

## Files in scope

EXECUTE may change only these.

Added:

- scripts/check-layout.mjs
- scripts/check-a11y.mjs
- scripts/make-og-image.mjs
- src/components/Icon.astro
- src/components/PhoneFrame.astro
- src/components/PrivacyBand.astro
- src/components/PageTop.astro
- src/components/JumpList.astro
- src/assets/shots/07-paywall-perks-light.png
- src/assets/shots/07-paywall-perks-dark.png
- src/pages/sitemap.xml.ts
- public/favicon.png
- public/favicon-32.png
- public/apple-touch-icon.png
- public/og-image.png
- public/robots.txt

Changed:

- package.json (scripts, and the two devDependencies in 04-01; dependencies untouched)
- package-lock.json (only through `npm install --save-dev --save-exact` in 04-01)
- scripts/check-text.mjs (the `alt:` line type in 04-08)
- README.md
- src/layouts/Base.astro
- src/components/Header.astro
- src/components/ThemeControl.astro
- src/components/Footer.astro
- src/components/ComingSoon.astro
- src/styles/site.css
- src/pages/index.astro
- src/pages/features.astro
- src/pages/pricing.astro
- src/pages/privacy-overview.astro
- src/pages/support.astro
- src/pages/privacy.astro (wrapper markup only; main text unchanged)
- src/pages/404.astro (wrapper markup only; main text unchanged)
- .planning/ files the loop names (PLAN.md checkboxes, SUMMARY.md, STATE.md, BACKLOG.md)

Deleted:

- src/assets/shots/07-paywall-light.png
- src/assets/shots/07-paywall-dark.png

Not changed: src/styles/tokens/, src/assets/logo-lockup-mark.svg, the other shots in src/assets/shots/, public/CNAME, .github/workflows/deploy.yml, scripts/check-external.mjs, scripts/check-links.mjs, scripts/check-main-text.mjs, scripts/tokens-check.mjs, and the copy/ fixtures.

## Steps for Jake outside the repo

1. Before SHIP: tell the session whether the app repo has recorded its TestFlight VoiceOver and Dynamic Type passes (decision 21).
2. No GitHub settings change. After each wave merges, the Deploy workflow publishes it as usual.

## Wave 1

Foundation and chrome: the two browser checks, site variables and the breakpoint, the new header, theme control, and footer on every page. Page content stays in today's 68ch `.wrap` column until wave 3.

- [x] 04-01: Layout check (check:layout) and the pinned dev dependencies
  Requirements: VIS-10, A11Y-03
  Files: package.json, package-lock.json, scripts/check-layout.mjs, README.md
  Copy entries: none
  Steps:
  1. `npm install --save-dev --save-exact playwright@1.64.1 axe-core@4.14.0`. Then `npx playwright install chromium` (downloads Playwright's Chromium build into ~/Library/Caches/ms-playwright on this Mac; nothing is added to the repo or to dist/). No other package changes.
  2. scripts/check-layout.mjs (plain Node ESM; built-in modules plus playwright): usage `node scripts/check-layout.mjs [dir]` (default `dist`); exit 1 if the directory is missing or has no .html file. Serve the directory on 127.0.0.1 with a random port using node:http (`/` maps to index.html, `/x.html` to that file, anything missing returns 404.html with status 404, content types for html, css, js, svg, png, webp, woff2, and xml). Abort any request whose host is not that server and count it as a failure.
  3. For every .html file, in light and dark, at five viewports: 320 by 640, 390 by 844, 768 by 1024, 1280 by 800, and "1280 at 400%" (320 by 200 CSS px with deviceScaleFactor 4). Set the theme with `colorScheme` on the context and an init script that stores `athand-theme` as "light" or "dark" in localStorage before the page loads. Wait for `load` and `document.fonts.ready`.
  4. Fail when: (a) `document.documentElement.scrollWidth > clientWidth`; (b) any rendered element (non-zero box, not `display: none`, not visually hidden by a 1px clip, not the skip link while unfocused) has a box with `left < -0.5` or `right > viewport width + 0.5`; (c) any content element inside header, main, or footer starts less than 16px from either viewport edge, where content elements are those with a direct non-whitespace text node, plus img, svg, button, and input, and the test is `left < 15.5` or `right > viewport width - 15.5`. Full-bleed backgrounds are not content elements, so the privacy band's fill may touch the edges while its text may not.
  5. Print each failure as `check:layout: <page> <theme> <viewport>: <reason> <tag.class> <left>-<right>` and exit 1; on success print `check:layout: <n> pages, 2 themes, 5 viewports: no overflow, gutters kept`.
  6. package.json: add `"check:layout": "node scripts/check-layout.mjs dist"`.
  7. README.md: add check:layout under Commands, a short section on what it checks, the one-time `npx playwright install chromium`, and that it runs locally before every PR (like tokens:check) and not in the Deploy workflow.
  Acceptance: the script passes on a page whose content keeps 16px gutters and fails on a page with a 400px-wide box and on a page with text at the left edge; dependencies are unchanged; devDependencies are exactly the two pinned packages; nothing new appears in dist/.
  Verify command: `npx playwright install chromium && D=$(mktemp -d) && H='<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>T</title></head><body style="margin:0"><main>' && printf '%s<p style="margin:0 16px">ok</p></main></body></html>' "$H" > "$D/index.html" && node scripts/check-layout.mjs "$D" && printf '%s<div style="width:400px;margin:0 16px">wide</div></main></body></html>' "$H" > "$D/index.html" && ! node scripts/check-layout.mjs "$D" && printf '%s<p style="margin:0">edge</p></main></body></html>' "$H" > "$D/index.html" && ! node scripts/check-layout.mjs "$D" && node -e 'const p=require("./package.json");if(JSON.stringify(p.dependencies)!==JSON.stringify({"@astrojs/check":"0.9.12","@fontsource/inter":"5.3.0","@fontsource/space-grotesk":"5.3.0","astro":"7.4.2","typescript":"6.0.3"})||JSON.stringify(p.devDependencies)!==JSON.stringify({"axe-core":"4.14.0","playwright":"1.64.1"})||p.scripts["check:layout"]!=="node scripts/check-layout.mjs dist")process.exit(1)' && npm run build && ! grep -rl 'axe-core\|playwright' dist`

- [x] 04-02: Accessibility check (check:a11y)
  Requirements: A11Y-01, A11Y-04, A11Y-05
  Files: scripts/check-a11y.mjs, package.json, README.md
  Copy entries: none
  Steps:
  1. scripts/check-a11y.mjs (plain Node ESM; built-in modules, playwright, and axe-core): usage `node scripts/check-a11y.mjs [dir]` (default `dist`). Same local server, request blocking, and theme setup as check-layout.mjs (share nothing at runtime; a short duplicated helper is fine, or import a helper from check-layout.mjs if EXECUTE prefers, inside these two files only).
  2. For every .html file, in light and dark, at 390 by 844 and 1280 by 800, with `reducedMotion: "reduce"` on the context: inject axe with `page.addScriptTag({ path: <resolved axe-core/axe.min.js> })` and run `axe.run(document)` with default rules. Any violation fails.
  3. In the same pages, also fail when: (a) any element with a direct non-whitespace text node has a computed font-size below 16px; (b) the computed font-size of body is not 17px; (c) any visible standalone `a` or `button` has a box under 44 by 44 CSS px, where standalone means the element's parent has no text outside it (so links inside sentences are exempt); (d) under reduced motion, any element has a computed transition-duration or animation-duration other than 0s.
  4. Print each failure as `check:a11y: <page> <theme> <width>: <rule or check> <target>` and exit 1; on success print `check:a11y: <n> pages, 2 themes, 2 widths: no violations`.
  5. package.json: add `"check:a11y": "node scripts/check-a11y.mjs dist"`. README.md: list it beside check:layout with what it checks.
  Acceptance: passes on a minimal valid page; fails on a page with an img without alt, on 12px text, on a 20px-tall standalone link, and on a transition that survives reduced motion.
  Verify command: `D=$(mktemp -d) && H='<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>T</title><style>body{margin:0 16px;font-size:17px}@media (prefers-reduced-motion:reduce){*{transition:none!important}}</style></head><body><main><h1>T</h1>' && printf '%s<p>ok</p></main></body></html>' "$H" > "$D/index.html" && node scripts/check-a11y.mjs "$D" && printf '%s<img src="data:image/gif;base64,R0lGODlhAQABAAAAACw=" width="10" height="10"></main></body></html>' "$H" > "$D/index.html" && ! node scripts/check-a11y.mjs "$D" && printf '%s<p style="font-size:12px">small</p></main></body></html>' "$H" > "$D/index.html" && ! node scripts/check-a11y.mjs "$D" && printf '%s<p><a href="/" style="display:inline-block;height:20px;width:120px">Home</a></p></main></body></html>' "$H" > "$D/index.html" && ! node scripts/check-a11y.mjs "$D" && printf '%s<p style="animation:x 1s">moves</p><style>@keyframes x{to{opacity:.5}}</style></main></body></html>' "$H" > "$D/index.html" && ! node scripts/check-a11y.mjs "$D" && grep -q '"check:a11y": "node scripts/check-a11y.mjs dist"' package.json`

- [x] 04-03: Site variables, breakpoint, container, type scale, and motion
  Requirements: VIS-05
  Files: src/styles/site.css
  Copy entries: none
  Steps:
  1. Add the `:root` site variables and the `@media (min-width: 52.5em)` override exactly as HOME-DESIGN.md, Breakpoint and site variables, gives them (decision 2: the 56px hero and 96px gap are the calc() values there). site.css defines no custom property other than `--site-*` (no new tokens).
  2. `.container`: `max-width: var(--site-max)`, `margin-inline: auto`, `padding-inline: var(--site-gutter)`. Header, footer, and (from wave 2) every section use it.
  3. Keep `.wrap` for the interim text pages: max-width 68ch plus the gutter, centered, with `padding-inline: var(--site-gutter)` and `padding-block: var(--space-10) var(--space-12)`. Set `main { padding: 0; }` so full-bleed sections can touch the edges.
  4. Type scale (HOME-DESIGN.md, Type scale): h1, h2, and h3 use `--font-display` 700 with `--tracking-display`; global defaults are the prose sizes (h1 `--text-2xl`, h2 `--text-xl`, h3 `--text-lg`, `--leading-tight`); `.lede` is `--text-lg` with `--leading-normal`; body stays `--text-base` (17px). Remove the fixed rem heading sizes, the `max-width: 480px` media query, and every other fixed font size. `.meta` uses 1rem (16px) at the smallest.
  5. Utilities: `.vh` (visually hidden: 1px clip pattern, still read by screen readers); `.cta` link CTA per HOME-DESIGN.md, Link CTAs (`--text-base` 600, `--text-link`, 1px underline that becomes 2px on hover, `min-height: var(--touch-min)`, inline-flex with gap `--space-2` for a 20px icon after the text).
  6. Motion (HOME-DESIGN.md, Motion): body transitions background-color and color over `--dur-base` `--ease-standard`; links and buttons transition color, background-color, and text-decoration-thickness over `--dur-fast` `--ease-standard`; nothing else animates. effects.css already turns all transitions off under reduced motion.
  7. Focus ring: 3px solid `--text-link`, offset 3px, on a, button, and [tabindex]. Links in main and footer stay underlined.
  8. Colors, sizes, radii, and timings come from token variables only: no hex, rgb, hsl, or font name in site.css.
  Acceptance: the variables and breakpoint match HOME-DESIGN.md; the only media queries are the breakpoint and `prefers-color-scheme: dark` (added in 04-08); no font size below 16px; no new custom property outside `--site-*`; every page still builds and reads as today.
  Verify command: `npm run build && npm run check && for s in '--site-max: 1200px' '--site-gutter: var(--space-4)' '--site-section: var(--space-12)' '--site-display: var(--text-2xl)' '--site-phone-hero: 280px' '--site-gutter: var(--space-10)' '--site-section: calc(var(--space-12) * 2)' '--site-display: calc(var(--text-xl) * 2)' '--site-phone-hero: 340px' '@media (min-width: 52.5em)'; do grep -qF -- "$s" src/styles/site.css || { echo "missing $s"; exit 1; }; done && ! grep -n '@media' src/styles/site.css | grep -vE '\(min-width: 52\.5em\)|prefers-color-scheme: dark' && ! grep -nE '#[0-9a-fA-F]{3,8}\b|rgba?\(|hsla?\(|\bInter\b|Space Grotesk|sans-serif|system-ui' src/styles/site.css && ! grep -nE 'font-size:\s*(0?\.[0-9]+rem|(1[0-5]|[0-9])px)' src/styles/site.css && ! grep -oE '(^|[;{ ])--[a-z0-9-]+\s*:' src/styles/site.css | grep -v -- '--site-' && npm run check:content && npm run check:links`

- [x] 04-04: Header in two rows, then one
  Requirements: VIS-06
  Files: src/components/Header.astro, src/styles/site.css
  Copy entries: CH2 (N1, N2 unchanged)
  Steps:
  1. Header.astro: keep the lockup link (aria-label "atHand, home", aria-current on Home), the nav "Main" with the four links and aria-current logic, and ThemeControl, in that source order. Replace `.wrap` with `.container`. No menu button, no hidden navigation, no script.
  2. site.css, HOME-DESIGN.md, Header: below the breakpoint, grid areas `"logo theme" "nav nav"`; the nav row has a 1px `--divider` top rule and links spread with `justify-content: space-between`, wrapping at 320px. From the breakpoint, one row `"logo nav theme"`, nav right-aligned, column gap `--space-8`. Header bottom border 1px `--border-card`.
  3. Nav links: `--text-base` 600, `--text-link`, 44px tall; hover gives a 2px underline and `--accent-hover` in light, `--text-body` in dark; the current page gets weight 700 and a 3px underline (not color alone).
  4. Lockup: `--text-xl`, `--text-link`, mark plus "Hand" in `--font-display` 700.
  Acceptance: every page has one nav "Main" with the four links in order and aria-current exactly as phase 03 (index, features, pricing, privacy-overview, and support once each; privacy and 404 none); no button in the header except the three theme buttons; no script in Header.astro.
  Verify command: `npm run build && node -e 'const fs=require("fs");const want={"index":"href=\"/\"","features":"/features.html","pricing":"/pricing.html","privacy-overview":"/privacy-overview.html","support":"/support.html","privacy":null,"404":null};for(const [p,h] of Object.entries(want)){const s=fs.readFileSync("dist/"+p+".html","utf8");const hd=s.match(/<header[\s\S]*?<\/header>/)[0];const navs=hd.match(/<nav[^>]*aria-label="Main"[^>]*>[\s\S]*?<\/nav>/g)||[];if(navs.length!==1)throw p+": nav count";const order=[...navs[0].matchAll(/href="([^"]+)"/g)].map(m=>m[1]).join(",");if(order!=="/features.html,/pricing.html,/privacy-overview.html,/support.html")throw p+": order "+order;const cur=[...s.matchAll(/<a\b[^>]*aria-current="page"[^>]*>/g)].map(m=>m[0]);if(h===null?cur.length!==0:(cur.length!==1||!cur[0].includes(h)))throw p+": aria-current";const btn=(hd.match(/<button\b[^>]*>/g)||[]);if(btn.length!==3||btn.some(b=>!b.includes("data-theme-set")))throw p+": header buttons"}' && ! grep -q '<script' src/components/Header.astro && grep -qF '"logo theme" "nav nav"' src/styles/site.css && grep -qF '"logo nav theme"' src/styles/site.css && npm run check:links`

- [x] 04-05: Segmented theme control with icons
  Requirements: VIS-06
  Files: src/components/ThemeControl.astro, src/components/Icon.astro, src/styles/site.css
  Copy entries: CH1
  Steps:
  1. src/components/Icon.astro: `interface Props { name: string; size?: number }`; renders an inline `<svg viewBox="0 0 24 24" width height fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">` with the path data for the named icon. Start with "system" (half-filled circle), "sun", and "moon", copying path data from the reference builds where they have the icon; an unknown name throws at build time. Later tasks add icons to the same map.
  2. ThemeControl.astro: same group (`role="group"`, aria-label "Appearance", `data-theme-control`, `hidden`) and the same three buttons with `data-theme-set` and `aria-pressed` (the Base.astro script is unchanged and keeps working). Each button holds `<Icon name=... size={20} />` then `<span class="tlabel">System</span>` (Light, Dark).
  3. site.css, HOME-DESIGN.md, Header: the group is one segmented control with a 1px `--border-card` border, `--surface-card` fill, radius `--radius-control`, 2px inner padding, 44px tall; buttons at least `--touch-min` wide, 16px text, hover `--surface-chip`; pressed button filled `--text-body` with `--surface-page` text, weight 700. Below the breakpoint `.tlabel` uses the `.vh` pattern (read, not shown); from the breakpoint it shows.
  Acceptance: the control still ships hidden and appears only with JavaScript; each button's accessible name is its label at every width; aria-pressed reflects the choice; the choice still applies before first paint and persists (Base.astro script untouched).
  Verify command: `npm run build && git diff --quiet 4821a36 -- src/layouts/Base.astro && node -e 'const fs=require("fs");for(const f of fs.readdirSync("dist").filter(f=>f.endsWith(".html"))){const s=fs.readFileSync("dist/"+f,"utf8");const g=s.match(/<div[^>]*data-theme-control[^>]*>[\s\S]*?<\/div>/);if(!g||!/role="group"/.test(g[0])||!/aria-label="Appearance"/.test(g[0])||!/\bhidden\b/.test(g[0].match(/<div[^>]*>/)[0]))throw f+": group";for(const [k,l] of [["system","System"],["light","Light"],["dark","Dark"]]){const b=g[0].match(new RegExp("<button[^>]*data-theme-set=\""+k+"\"[^>]*>[\\s\\S]*?</button>"));if(!b||!/aria-pressed="false"/.test(b[0])||!/<svg[^>]*aria-hidden="true"/.test(b[0])||!new RegExp("<span class=\"tlabel\">"+l+"</span>").test(b[0]))throw f+": "+k}}'`

- [x] 04-06: Footer
  Requirements: VIS-06
  Files: src/components/Footer.astro, src/styles/site.css
  Copy entries: CH2, HM26 (unchanged links and credit)
  Steps:
  1. Footer.astro: replace `.wrap` with `.container`; keep the nav "Footer" (Privacy policy to /privacy.html, Support to /support.html, the mailto address) and "Made by Jacob Davis" linking to https://jacobdavis.co.
  2. site.css, HOME-DESIGN.md, Footer: 1px `--border-card` top rule; padding `--space-8` top and `--space-10` bottom; a wrapping flex row with `space-between` and gap `--space-4` by `--space-8`; links `--text-base` (17px, up from 16px), underlined, 44px tall, link gap `--space-6`; text `--text-muted` (not `--text-faint`).
  Acceptance: every page's footer has the four links unchanged; the wave's checks (check:layout, check:a11y) pass on all seven pages.
  Verify command: `npm run build && for f in dist/*.html; do for s in '<a href="/privacy.html">Privacy policy</a>' '<a href="/support.html">Support</a>' '<a href="mailto:support@athandapp.com">support@athandapp.com</a>' '<a href="https://jacobdavis.co">Made by Jacob Davis</a>'; do grep -qF "$s" "$f" || { echo "$f: $s"; exit 1; }; done; done && npm run check:links && npm run check:layout && npm run check:a11y`

Wave 1 checks: `npm ci`, `npm run build`, `npm run check`, `npm run tokens:check`, `npm run check:external`, `npm run check:links`, `npm run check:content` (privacy and 404), `npm run check:layout`, `npm run check:a11y`, and static checks S1 to S4, S7, S8, S11, S12, and S13. Also open `npm run preview` in the built-in browser at 320, 390, and 1280 px wide in light and dark, confirm the header rows, the theme control (labels hidden then shown, pressed state, OS flip on System), and the footer, and record it in SUMMARY.md.

Live site after this wave: every page has the new header (two rows on a phone, one row from 840px), the segmented theme control, and the new footer. Page content is unchanged and stays in its 68ch column (check:content for privacy and 404; check-text for the others still passes against the phase 03 fixtures because no main text changes). Every link resolves. The Deploy workflow is unchanged and passes; the two new dev dependencies install with `npm ci` but are never imported by a page.

## Wave 2

Phone frame and Home.

- [x] 04-07: Pre-cropped paywall image
  Requirements: VIS-01, VIS-09
  Files: src/assets/shots/07-paywall-perks-light.png, src/assets/shots/07-paywall-perks-dark.png, src/assets/shots/07-paywall-light.png (deleted), src/assets/shots/07-paywall-dark.png (deleted)
  Copy entries: none
  Steps:
  1. `for t in light dark; do sips -c 1208 1320 --cropOffset 172 0 src/assets/shots/07-paywall-$t.png --out src/assets/shots/07-paywall-perks-$t.png; done` (decision 9: rows 172 to 1379, the HOME-DESIGN.md perks region, ending above the price card).
  2. Open both results and confirm they show the logo, headline, and four perks and no price or currency; record it in SUMMARY.md.
  3. `git rm src/assets/shots/07-paywall-light.png src/assets/shots/07-paywall-dark.png` in the same commit (decision 9, Jake's answer 4).
  Acceptance: both derived files are 1320 by 1208 and byte-identical to a fresh crop of the originals at 4821a36; neither original exists; nothing in src/ names an original.
  Verify command: `D=$(mktemp -d) && for t in light dark; do f=src/assets/shots/07-paywall-perks-$t.png; test "$(sips -g pixelWidth -g pixelHeight $f | awk '/pixel/{print $2}' | tr '\n' ' ')" = "1320 1208 " || exit 1; git show 4821a36:src/assets/shots/07-paywall-$t.png > "$D/o-$t.png" && sips -c 1208 1320 --cropOffset 172 0 "$D/o-$t.png" --out "$D/c-$t.png" >/dev/null && cmp "$D/c-$t.png" $f || exit 1; test ! -e src/assets/shots/07-paywall-$t.png || exit 1; done && ! grep -rnE '07-paywall-(light|dark)' src && npm run build`

- [x] 04-08: PhoneFrame component and the alt-text fixture lines
  Requirements: VIS-01, VIS-02, A11Y-02
  Files: src/components/PhoneFrame.astro, src/styles/site.css, scripts/check-text.mjs, README.md
  Copy entries: none (alt text arrives with each use)
  Steps:
  1. PhoneFrame.astro, HOME-DESIGN.md, Phone frame: `interface Props { shot: string; alt: string; crop: "full" | "suggest" | "record" | "perks"; hero?: boolean; caption?: string; class?: string }`. No `placeholder` crop (decision 19). Resolve `src/assets/shots/<shot>-light.png` and `-dark.png` with `import.meta.glob` (non-eager, so only shots a page uses are imported); throw at build time if either is missing.
  2. Markup: `<figure class="frame" data-crop={crop} data-hero={hero}>` holding `<div class="screen">` with two `<Image>` elements from astro:assets: same alt, `widths={[360, 720]}`, `format="webp"`, explicit width and height, `sizes` "(min-width: 52.5em) 340px, 280px" for the hero and "(min-width: 52.5em) 300px, 280px" otherwise, `loading` "eager" for the hero and "lazy" otherwise, classes `shot-light` and `shot-dark`. A `caption` renders `<figcaption>` after the screen.
  3. site.css: frame (`--surface-card` fill, 1px `--border-card`, radius `--radius-phone`, padding `--space-2`, width `--site-phone` or `--site-phone-hero`, max-width 100%); only `.frame[data-hero]` gets `box-shadow: var(--shadow-soft)`; screen (overflow hidden, radius `calc(var(--radius-phone) - var(--space-2))`, 1px `--divider` border); image `width: 100%; height: 100%; object-fit: cover`. Crops by `data-crop`: full `aspect-ratio: 1320 / 2696; object-position: 50% 100%`; suggest `1320 / 1388` at `50% 11.62%`; record `1320 / 1348` at `50% 11.32%`; perks `1320 / 1208` at `50% 50%` (the derived file is already the perks region, so the whole image shows). Theme pairs: `.shot-dark { display: none; }`, swapped under `:root[data-theme="dark"]` and under `@media (prefers-color-scheme: dark)` with `:root:not([data-theme="light"])`, mirroring colors.css (decision 8). The swap has no transition.
  4. scripts/check-text.mjs: add the `alt: X` line type (Expected-copy fixtures, above). Collect `<img>` tags inside main with their decoded alt. `alt: X` fails as `alt: <X>` when no img has that alt; when the fixture has at least one `alt:` line, each img whose alt is in none of them fails as `unexpected alt: <alt>`, and an img with no alt attribute fails as `missing alt`. Update the header comment and README.md's check:text section.
  Acceptance: PhoneFrame type-checks; site.css holds the four crops and the theme swap; check-text passes and fails on the alt cases below; the phase 03 fixtures (which have no `alt:` lines) still pass on today's pages.
  Verify command: `npm run check && npm run build && for s in 'aspect-ratio: 1320 / 2696' 'object-position: 50% 100%' 'aspect-ratio: 1320 / 1388' 'object-position: 50% 11.62%' 'aspect-ratio: 1320 / 1348' 'object-position: 50% 11.32%' 'aspect-ratio: 1320 / 1208' ':root:not([data-theme="light"])' '[data-theme="dark"]' 'box-shadow: var(--shadow-soft)'; do grep -qF -- "$s" src/styles/site.css || { echo "missing $s"; exit 1; }; done && test "$(grep -c 'box-shadow' src/styles/site.css)" = 1 && grep -q 'widths={\[360, 720\]}' src/components/PhoneFrame.astro && grep -q 'format="webp"' src/components/PhoneFrame.astro && ! grep -q 'eager: true' src/components/PhoneFrame.astro && D=$(mktemp -d) && printf '<!doctype html><html><head><title>T</title></head><body><main><p>Hi</p><img alt="A b"><img alt="A b"></main></body></html>' > "$D/a.html" && printf 'Hi\nalt: A b\n' > "$D/ok.txt" && node scripts/check-text.mjs "$D/a.html" "$D/ok.txt" && printf 'alt: C d\n' > "$D/miss.txt" && ! node scripts/check-text.mjs "$D/a.html" "$D/miss.txt" && printf '<!doctype html><html><head><title>T</title></head><body><main><img alt="A b"><img alt="Other"></main></body></html>' > "$D/b.html" && ! node scripts/check-text.mjs "$D/b.html" "$D/ok.txt" && printf '<!doctype html><html><head><title>T</title></head><body><main><p>Hi</p><img></main></body></html>' > "$D/c.html" && ! node scripts/check-text.mjs "$D/c.html" "$D/ok.txt" && for p in features pricing privacy-overview support; do node scripts/check-text.mjs dist/$p.html .planning/phases/03-pages-and-copy/copy/$p.txt || exit 1; done`

- [x] 04-09: Home hero and moments
  Requirements: VIS-01, VIS-07, VIS-11, A11Y-04
  Files: src/pages/index.astro, src/components/ComingSoon.astro, src/components/Icon.astro, src/styles/site.css
  Copy entries: HM1, HM2, HM3, HM4 (C1), HM5, HM6, HM7, HM8, A1
  Steps:
  1. index.astro: Base props unchanged (HM1). Replace today's content (HM27 removals begin here) with sections, each `<section aria-labelledby=...>` holding a `.container`.
  2. Hero (HOME-DESIGN.md, Hero): h1 HM2; `<p class="lede">` HM3; `<ComingSoon />`; then `<PhoneFrame shot="01-home" crop="full" hero alt={A1} />`. Grid one column, from the breakpoint `minmax(0, 1fr) auto`; gaps and padding as specified; h1 at `--site-display`, line height 1.08, max 12ch, `text-wrap: balance`; line at `--text-lg` `--text-muted`, max 34rem.
  3. ComingSoon.astro: same sentence (C1), now `<p class="coming-soon">` with `<Icon name="phone" size={24} />` before the text (icon in `--text-muted`, gap `--space-3`, text `--text-base` 600 `--text-body`; plain text, not a pill). The text content of the paragraph is unchanged, so Features and Pricing still pass their fixtures.
  4. Moments (HOME-DESIGN.md, Moments): h2 HM5; `<ul>` of three `<li>` cards in order HM6, HM7, HM8. Each: a 44px `--surface-chip` circle with an aria-hidden 24px icon ("cross", "car", "plane") and the h3; a record row with an aria-hidden `--badge-size` circle in `--entity-person` showing "P" (text `--white` in light, `--text-on-ink` in dark), the record name "Sam Rivera" at 700, and the label as the subtitle at 16px `--text-muted`; then the value at `--text-lg` 500, `--tracking-label`, tabular figures. HM8's value is aria-hidden dots followed by `<span class="vh">Passport number, hidden until you tap Reveal</span>`. Add "phone", "cross", "car", "plane", and "arrow" (for the link CTAs from 04-10 on) to Icon.astro.
  5. Values are fictional samples (CONTEXT.md, Copy drafts); no other strings.
  Acceptance: one h1; the hero pair carries A1, `loading="eager"`, 360w and 720w WebP srcsets, width and height, and the hero sizes; three moment cards in order with their h3, label, record, and value; the badge and icons are aria-hidden (decision 11); Features and Pricing still pass their phase 03 fixtures.
  Verify command: `npm run build && node -e 'const fs=require("fs");const s=fs.readFileSync("dist/index.html","utf8");const m=s.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)[1];if((m.match(/<h1\b/g)||[]).length!==1)throw "h1";const imgs=[...m.matchAll(/<img\b[^>]*>/g)].map(x=>x[0]);const hero=imgs.filter(i=>i.includes("The atHand home screen. A banner reads"));if(hero.length!==2||!hero.some(i=>/class="[^"]*shot-light/.test(i))||!hero.some(i=>/class="[^"]*shot-dark/.test(i)))throw "hero pair";for(const i of hero){if(!/loading="eager"/.test(i)||!/srcset="[^"]*\.webp 360w[^"]*\.webp 720w"/.test(i)||!/\bwidth="\d+"/.test(i)||!/\bheight="\d+"/.test(i)||!i.includes("sizes=\"(min-width: 52.5em) 340px, 280px\""))throw "hero attrs "+i}const t=m.replace(/<[^>]*>/g,"");let at=0;for(const w of ["At the doctor’s office","Insurance member ID","XYZ000000000","At a traffic stop","Driver’s license","D000-0000-0000","At the airport","Passport","Passport number, hidden until you tap Reveal"]){const k=t.indexOf(w,at);if(k<0)throw "order "+w;at=k}if(/<svg(?![^>]*aria-hidden="true")[^>]*>/.test(m))throw "svg not hidden"' && for p in features pricing; do node scripts/check-text.mjs dist/$p.html .planning/phases/03-pages-and-copy/copy/$p.txt || exit 1; done`

- [x] 04-10: Home feature rows one to four
  Requirements: VIS-01, VIS-07, VIS-11
  Files: src/pages/index.astro, src/styles/site.css
  Copy entries: HM9, HM10, HM11, HM12, HM13, HM15, A2, A3, A4, A5, A6
  Steps:
  1. Features section (HOME-DESIGN.md, Features): h2 HM9; `<ul class="features">` (flex column, gap `--site-section`). Rows in order: HM10 with 02-person-top `crop="full"` (A2); HM11 with 04-check-what-we-read `crop="full"` (A3); HM12 with 01-home `crop="suggest"` (A4); HM13 with two frames, 05-masked and 05-revealed, both `crop="record"`, captions "Masked" and "Revealed" (A5, A6), each `flex: 1 1 140px`, max 240px, stacking when narrow.
  2. Row: one column with gap `--space-6`; from the breakpoint two equal columns with gap `--space-12`; even rows put the shot panel first with CSS `order: -1` only (source order stays text then image). Copy: h3 at `--site-h3`, line at `--text-lg` `--text-muted`, gap `--space-3`, max 28rem. Shot panel: `--surface-chip`, radius `--radius-card`, padding `--space-10` by `--space-6`, flex centered, wrapping, gap `--space-4`; captions `--text-base` 600 `--text-body`. Panels and frames use `min-width: 0` and `max-width: 100%` so nothing overflows at 320px (decision 6b).
  3. After the list: `<a class="cta" href="/features.html">` HM15 with the aria-hidden "arrow" icon (added in 04-09), margin-top `--space-10`.
  Acceptance: four rows in order; the six images carry A2 to A6 (A4 on the suggest crop), all lazy with the non-hero sizes; figcaptions "Masked" and "Revealed"; the CTA links to /features.html.
  Verify command: `npm run build && node -e 'const fs=require("fs");const s=fs.readFileSync("dist/index.html","utf8");const m=s.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)[1];const t=m.replace(/<[^>]*>/g,"");let at=0;for(const w of ["What it does","Everything you look after","People, vehicles, pets, homes, and more, in one place.","Scan instead of typing","Licenses, passports, insurance cards, VINs, and more. You check every field before it is saved.","The right record at the right time","Suggestions from the time of day and, if you allow them, your calendar and location.","Hidden until you need it","Sensitive numbers stay masked until you tap Reveal.","Masked","Revealed","See all features"]){const k=t.indexOf(w,at);if(k<0)throw "order "+w;at=k}const imgs=[...m.matchAll(/<img\b[^>]*>/g)].map(x=>x[0]);for(const a of ["Sam Rivera’s record in atHand.","The “Check what we read” screen","Close view of the atHand home screen.","A home record named Maple Street house.","The same home record after tapping Reveal."]){const p=imgs.filter(i=>i.includes(a));if(p.length!==2||p.some(i=>!/loading="lazy"/.test(i)||!i.includes("sizes=\"(min-width: 52.5em) 300px, 280px\"")))throw "img "+a}if(!/<figcaption[^>]*>\s*Masked\s*<\/figcaption>/.test(m)||!/<figcaption[^>]*>\s*Revealed\s*<\/figcaption>/.test(m))throw "captions";if(!/<a[^>]*class="cta"[^>]*href="\/features.html"|<a[^>]*href="\/features.html"[^>]*class="cta"/.test(m))throw "cta"' && npm run check:links`

- [ ] 04-11: Privacy band, pricing, and closing on Home
  Requirements: VIS-01, VIS-07, VIS-09, VIS-11, A11Y-04
  Files: src/pages/index.astro, src/components/PrivacyBand.astro, src/components/Icon.astro, src/styles/site.css
  Copy entries: HM16, HM17, HM18, HM19, HM20, HM21, HM22, HM23, HM24 (C1), HM25, A8
  Steps:
  1. PrivacyBand.astro (reused by 04-16): `interface Props { labelledby: string }`; renders a full-bleed `<section class="band" aria-labelledby={labelledby}>` (`--accent` fill, `--text-on-cobalt` text, links, icons, and focus ring) with `<div class="container band-inner">` (padding `--site-section`, flex column, gap `--space-8`, and the `--site-gutter` side padding at every width: decision 6a), then the default slot (the heading and anything before the facts), then `<ul class="facts">` with HM17, HM18, and HM19 in order, each with an aria-hidden 28px icon ("person-slash", "scan", "eye-slash"), a 1px `currentColor` top rule, padding-top `--space-5`, `--text-lg` 500 at line height 1.35, then a named slot "after". Facts grid `repeat(auto-fit, minmax(min(260px, 100%), 1fr))`, gap `--space-6`. Add the three icons to Icon.astro.
  2. Home: `<PrivacyBand labelledby="privacy-heading">` with `<h2 id="privacy-heading">` HM16 (no period; max 20ch) and, in slot "after", a `.cta` HM20 to /privacy-overview.html. No network disclosures and no link to /privacy.html in main (decision 1); the footer keeps "Privacy policy".
  3. Pricing section (HOME-DESIGN.md, Pricing): h2 HM21 (no period); line HM22 at `--text-lg` `--text-muted`, max 30rem; `.cta` HM23 to /pricing.html; shot panel with `<PhoneFrame shot="07-paywall-perks" crop="perks" alt={A8} />`. One column with gap `--space-10`; from the breakpoint two equal columns with gap `--space-12`.
  4. Closing (HOME-DESIGN.md, Closing): 1px `--border-card` top rule; centered flex column, gap `--space-5`, padding `--site-section`; the SVG mark alone at width `--logo-floor` in `--text-link`, inside `<span aria-hidden="true">` (the SVG file carries role="img" and a label, which must not be read here); h2 HM24, C1 verbatim with its period; line HM25 at `--text-lg` `--text-muted`.
  5. Adjacent sections collapse to one `--site-section` gap (the second drops its top padding); the band keeps both.
  Acceptance: band in a labelled section with the three facts in order and one CTA; no "RevenueCat", "Google", or "geocoding" and no /privacy.html link in Home main; pricing pair carries A8 and comes from the perks files; the coming-soon sentence appears exactly twice on Home (hero line and closing h2); no price pattern in Home text or alt text.
  Verify command: `npm run build && node -e 'const fs=require("fs");const s=fs.readFileSync("dist/index.html","utf8");const m=s.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)[1];const band=m.match(/<section[^>]*class="band"[^>]*aria-labelledby="privacy-heading"[\s\S]*?<\/section>/);if(!band)throw "band";const bt=band[0].replace(/<[^>]*>/g,"");let at=0;for(const w of ["Your information stays on your iPhone","No account and no sign-in.","Scanning runs on your iPhone.","The developer added no advertising or tracking tools.","How atHand handles your information"]){const k=bt.indexOf(w,at);if(k<0)throw "band order "+w;at=k}if(bt.includes("Your information stays on your iPhone."))throw "HM16 period";const t=m.replace(/<[^>]*>/g,"");for(const w of ["RevenueCat","Google","geocoding"])if(t.includes(w))throw "disclosure on Home: "+w;if(m.includes("href=\"/privacy.html\""))throw "policy link in main";for(const w of ["Free to start","Your own record is free. One purchase unlocks everything else. No subscription, no ads, no account.","See pricing","Free to download. Your own record is free."])if(!t.includes(w))throw "missing "+w;if(t.includes("Free to start."))throw "HM21 period";if((t.match(/Coming soon to the App Store for iPhone\./g)||[]).length!==2)throw "coming soon count";const p=[...m.matchAll(/<img\b[^>]*>/g)].map(x=>x[0]).filter(i=>i.includes("The atHand unlock screen"));if(p.length!==2)throw "A8 pair";const alts=[...m.matchAll(/\salt="([^"]*)"/g)].map(x=>x[1]).join(" ");if(/\$\s*\d|\d\.\d\d(?!\d)|USD|€|£/.test(t+" "+alts))throw "price"' && ! ls dist/_astro | grep -E '07-paywall-(light|dark)' && npm run check:links`

- [ ] 04-12: Home feature row five (06-lock) and the full Home checks
  Requirements: VIS-01, VIS-02, VIS-07, VIS-10, VIS-11, A11Y-02
  Files: src/pages/index.astro
  Copy entries: HM14, A9 (Approved in REVISE; decision 24)
  Steps:
  1. Fifth row after HM13: h3 HM14, its line, and a shot panel with `<PhoneFrame shot="06-lock" crop="full" alt={A9} />` (decision 19). No placeholder.
  2. Run the full Home fixture and the browser checks.
  Acceptance: check-text passes against copy/index.txt (every Approved string, every removal, and all eight alt texts, A9 included); the 06-lock pair is lazy with the non-hero sizes; no PNG and no 03-person-documents file in dist/; check:layout and check:a11y pass on every page.
  Verify command: `npm run build && node scripts/check-text.mjs dist/index.html .planning/phases/04-visuals-and-polish/copy/index.txt && test "$(grep -o 'The atHand lock screen. The atHand logo sits in the center' dist/index.html | wc -l | tr -d ' ')" = 2 && test -z "$(find dist -name '*.png')" && test -z "$(find dist -name '*03-person-documents*')" && npm run check:links && npm run check:layout && npm run check:a11y`

Wave 2 checks: `npm ci`, `npm run build`, `npm run check`, `npm run tokens:check`, `npm run check:external`, `npm run check:links`, `npm run check:content`, `npm run check:layout`, `npm run check:a11y`, check-text for Home against copy/index.txt and for Features, Pricing, Privacy overview, and Support against their phase 03 fixtures, and static checks S1 to S9, S11 to S14, and S19. Also open `npm run preview` in the built-in browser and check Home at 320, 390, 768, and 1280 px in light and dark: the screenshots swap with the theme control and with the OS appearance on System, the masked and revealed pair stacks when narrow, the privacy band keeps its side gutter, and the paywall image ends above the price card. Record it in SUMMARY.md. The wave 2 PR lists every claim with its citation (VIS-11).

Live site after this wave: Home is the new showcase (hero, moments, five feature rows, privacy band, pricing, closing) with real screenshots that follow the theme. Features and Pricing show the coming-soon line with its new icon and otherwise read as before. Every internal link resolves; no served image contains a price (04-07, S14).

## Wave 3

Page tops for the other pages, the prose column, and the final chrome for privacy and 404.

- [ ] 04-13: PageTop and JumpList components, prose column, and page-top styles
  Requirements: VIS-08
  Files: src/components/PageTop.astro, src/components/JumpList.astro, src/styles/site.css
  Copy entries: FP2, SU3 (the jump list name "On this page", passed by each page)
  Steps:
  1. PageTop.astro (HOME-DESIGN.md, Other pages): `interface Props { title: string }`; renders `<section class="page-top" aria-labelledby="page-title"><div class="container page-top-grid"><div class="page-top-copy"><h1 id="page-title">{title}</h1><slot /></div><div class="page-top-visual"><slot name="visual" /></div></div></section>`. The grid is the hero grid one size down: h1 `--text-2xl` at every width; the default slot holds the lede (`--text-lg`) and anything else; the visual column appears beside the copy from the breakpoint and below it otherwise.
  2. JumpList.astro: `interface Props { label: string; links: { href: string; text: string }[] }`; renders `<nav class="jump" aria-label={label}><ul>` with one `<li><a>` per link; links 44px tall, wrapping, underlined.
  3. site.css: `.prose` (max 68ch, line height 1.6, h2 `--text-xl`, h3 `--text-lg`, h2 sections separated by `--space-12`, in-sentence links underlined); `.fact-row` (three moment-card style items in the moments grid); `.contact-card` (card surface and border, h2, and a 44px underlined mailto link at `--text-lg`); `.shot-panel.overlap` for Features (two frames overlapping, the second hidden below the breakpoint with `display: none`).
  Acceptance: both components type-check; site.css holds the classes; no page changes yet.
  Verify command: `npm run check && npm run build && for c in '.prose' '.fact-row' '.contact-card' '.jump' '.page-top'; do grep -qF -- "$c" src/styles/site.css || exit 1; done && grep -q 'id="page-title"' src/components/PageTop.astro && grep -q 'aria-label={label}' src/components/JumpList.astro`

- [ ] 04-14: Features page top and jump list
  Requirements: VIS-01, VIS-02, VIS-08, VIS-11
  Files: src/pages/features.astro
  Copy entries: FE1 to FE30, C1, FP1, FP2, FP3, A2, A3
  Steps:
  1. `<PageTop title=FE3>` with `<p class="lede">` FE4 and `<ComingSoon />`; visual slot: a `.shot-panel.overlap` with 04-check-what-we-read (A3, `crop="full"`) over 02-person-top (A2, `crop="full"`, hidden below the breakpoint).
  2. Below, `<div class="container"><div class="prose">`: `<JumpList label="On this page" links=...>` with FP3 in order (Records → #records, Scanning → #scanning, Suggestions → #suggestions, App lock → #app-lock, Backups → #backups, Light and dark → #light-and-dark), then today's six h2 sections unchanged, each h2 given the matching id.
  3. Remove the `.wrap` div. No FE31 (decision 21).
  Acceptance: check-text passes against the phase 04 features fixture (copy, jump hrefs, and alt text); one h1; six h2 with the six ids; check:links passes.
  Verify command: `npm run build && node scripts/check-text.mjs dist/features.html .planning/phases/04-visuals-and-polish/copy/features.txt && test "$(grep -o '<h1' dist/features.html | wc -l | tr -d ' ')" = 1 && for i in records scanning suggestions app-lock backups light-and-dark; do grep -q "<h2[^>]*id=\"$i\"" dist/features.html || exit 1; done && grep -q '<nav[^>]*aria-label="On this page"' dist/features.html && npm run check:links`

- [ ] 04-15: Pricing page top and fact row
  Requirements: VIS-01, VIS-08, VIS-09, VIS-11
  Files: src/pages/pricing.astro
  Copy entries: P1 to P19, C1, PP1, PP2, A8
  Steps:
  1. `<PageTop title=P3>` with `<p class="lede">` P4 and `<ComingSoon />`; visual slot: shot panel with `<PhoneFrame shot="07-paywall-perks" crop="perks" alt={A8} />`.
  2. Then `<div class="container">`: `<ul class="fact-row">` with PP2's three items in order, then `<div class="prose">` with today's sections P5 to P19 unchanged.
  3. Remove the `.wrap` div. No amount anywhere.
  Acceptance: check-text passes against the phase 04 pricing fixture; the fact row has three items in order; no price pattern in the page's text or alt text.
  Verify command: `npm run build && node scripts/check-text.mjs dist/pricing.html .planning/phases/04-visuals-and-polish/copy/pricing.txt && node -e 'const s=require("fs").readFileSync("dist/pricing.html","utf8");const m=s.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)[1];const r=m.match(/<ul[^>]*class="fact-row"[^>]*>([\s\S]*?)<\/ul>/);if(!r)throw "row";const items=[...r[1].matchAll(/<li\b[^>]*>([\s\S]*?)<\/li>/g)].map(x=>x[1].replace(/<[^>]*>/g,"").trim());if(JSON.stringify(items)!==JSON.stringify(["Free to download","Your own record is free","One purchase unlocks everything else"]))throw JSON.stringify(items);const t=m.replace(/<[^>]*>/g,"")+" "+[...m.matchAll(/\salt="([^"]*)"/g)].map(x=>x[1]).join(" ");if(/\$\s*\d|\d\.\d\d(?!\d)|USD|€|£/.test(t))throw "price"' && npm run check:links`

- [ ] 04-16: Privacy overview band as page top
  Requirements: VIS-08, VIS-11
  Files: src/pages/privacy-overview.astro
  Copy entries: V1 to V24, PV1 (V3, V4, HM17, HM18, HM19)
  Steps:
  1. `<PrivacyBand labelledby="page-title">` with `<h1 id="page-title">` V3 and `<p class="lede">` V4 in the default slot; no "after" slot, so no CTA to itself (decision 12).
  2. Then `<div class="container"><div class="prose">` with today's sections V5 to V24 unchanged, every disclosure in full, ending with V24's link to /privacy.html.
  3. Remove the `.wrap` div.
  Acceptance: check-text passes against the phase 04 privacy-overview fixture; one h1, inside the band; the page names RevenueCat, Google ML Kit, and Apple's geocoding service; main has no link to /privacy-overview.html.
  Verify command: `npm run build && node scripts/check-text.mjs dist/privacy-overview.html .planning/phases/04-visuals-and-polish/copy/privacy-overview.txt && node -e 'const s=require("fs").readFileSync("dist/privacy-overview.html","utf8");const m=s.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)[1];if((m.match(/<h1\b/g)||[]).length!==1)throw "h1";if(!/<section[^>]*class="band"[^>]*>[\s\S]*?<h1\b/.test(m))throw "h1 not in band";if(m.includes("href=\"/privacy-overview.html\""))throw "self link";for(const w of ["RevenueCat","Google ML Kit","Apple’s geocoding service"])if(!m.includes(w))throw w' && npm run check:links`

- [ ] 04-17: Support contact card and jump list
  Requirements: VIS-08, VIS-11
  Files: src/pages/support.astro
  Copy entries: S1 to S58, SU1, SU2, SU3, SU4
  Steps:
  1. `<PageTop title=S3>` with the S4 lede (its inline mailto unchanged); visual slot: `<div class="contact-card">` with `<h2>` SU1 and the SU2 mailto link.
  2. Then `<div class="container"><div class="prose">`: `<JumpList label="On this page" links=...>` with SU4 in order (Backups → #backups, Purchases → #purchases, App lock → #app-lock, Scanning → #scanning, Suggestions → #suggestions, Permissions and your data → #permissions, About atHand → #about), then today's content from S5 on, unchanged, each FAQ group h2 given the matching id.
  3. Remove the `.wrap` div. The file stays src/pages/support.astro and builds to /support.html.
  Acceptance: dist/support.html exists; check-text passes against the phase 04 support fixture; the seven group ids exist; check:links passes.
  Verify command: `npm run build && test -f dist/support.html && test ! -e dist/support && node scripts/check-text.mjs dist/support.html .planning/phases/04-visuals-and-polish/copy/support.txt && for i in backups purchases app-lock scanning suggestions permissions about; do grep -q "<h2[^>]*id=\"$i\"" dist/support.html || exit 1; done && grep -q '<nav[^>]*aria-label="On this page"' dist/support.html && npm run check:links`

- [ ] 04-18: Privacy policy and 404 in the new layout, and `.wrap` removed
  Requirements: VIS-08, VIS-10
  Files: src/pages/privacy.astro, src/pages/404.astro, src/styles/site.css
  Copy entries: none (main text unchanged)
  Steps:
  1. privacy.astro and 404.astro: replace `<div class="wrap">` with `<div class="container"><div class="prose page-text">` (and close both). `.page-text` gives the vertical padding `.wrap` had. Nothing inside changes; 404 keeps its `<style>`.
  2. site.css: remove the `.wrap` rules. No page uses `.wrap` after this task.
  3. Run the full wave checks.
  Acceptance: check:content passes for privacy and 404 (main text and links unchanged); no `wrap` class remains in src/; all five phase 04 fixtures pass; check:layout and check:a11y pass on all seven pages.
  Verify command: `npm run build && npm run check:content && ! grep -rn 'class="wrap"\|\.wrap\b' src && for p in index features pricing privacy-overview support; do node scripts/check-text.mjs dist/$p.html .planning/phases/04-visuals-and-polish/copy/$p.txt || exit 1; done && npm run check:links && npm run check:layout && npm run check:a11y`

Wave 3 checks: everything in the wave 2 checks, with check-text now against all five phase 04 fixtures (S10). Also open `npm run preview` in the built-in browser and check each page top at 320 and 1280 px in light and dark, both jump lists (each link moves focus to its section), the Support contact card, the Pricing fact row, and the privacy overview band. Record it in SUMMARY.md. The wave 3 PR lists every claim with its citation (VIS-11).

Live site after this wave: Features, Pricing, Privacy overview, and Support have their page tops with their existing text below in the prose column; /privacy.html and /404.html read as before under the new chrome. /support.html and /privacy.html keep their URLs (S7). Every internal and in-page link resolves.

## Wave 4

Metadata: icons, the Open Graph image and tags, sitemap, robots.txt, and JSON-LD. Nothing a visitor reads changes.

- [ ] 04-19: Favicon and apple-touch-icon
  Requirements: VIS-04
  Files: public/favicon.png, public/favicon-32.png, public/apple-touch-icon.png, src/layouts/Base.astro
  Copy entries: none
  Steps:
  1. With the app repo at 60032bf (`A=${ATHAND_APP_DIR:-../athandapp}`; locally ~/dev/athandapp; confirm `git -C "$A" rev-parse origin/main` is 60032bf3848847b642443a59178ee40e385c9850 and read the file with `git -C "$A" show 60032bf:assets/icon.png`): `sips -z 48 48` to public/favicon.png; `sips -z 32 32` to public/favicon-32.png; `sips -z 180 180`, then `sips -s format jpeg -s formatOptions best`, then `sips -s format png` to public/apple-touch-icon.png (flattened, because the icon's alpha dips to 252). Delete the intermediate files. SUMMARY.md records the source commit and commands.
  2. Base.astro head: `<link rel="icon" type="image/png" sizes="48x48" href="/favicon.png">`, `<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png">`, `<link rel="apple-touch-icon" href="/apple-touch-icon.png">`.
  Acceptance: sizes 48, 32, and 180; the apple-touch-icon has no alpha; every built page links all three; the files are in dist/.
  Verify command: `for x in 'favicon.png 48' 'favicon-32.png 32' 'apple-touch-icon.png 180'; do set -- $x; test "$(sips -g pixelWidth -g pixelHeight public/$1 | awk '/pixel/{print $2}' | tr '\n' ' ')" = "$2 $2 " || exit 1; done && sips -g hasAlpha public/apple-touch-icon.png | grep -q 'hasAlpha: no' && npm run build && for f in dist/*.html; do grep -q 'rel="icon" type="image/png" sizes="48x48" href="/favicon.png"' "$f" && grep -q 'href="/favicon-32.png"' "$f" && grep -q 'rel="apple-touch-icon" href="/apple-touch-icon.png"' "$f" || { echo "$f"; exit 1; }; done && test -f dist/favicon.png && test -f dist/apple-touch-icon.png && npm run check:external`

- [ ] 04-20: Open Graph image
  Requirements: VIS-03
  Files: scripts/make-og-image.mjs, public/og-image.png, package.json, README.md
  Copy entries: M6
  Steps:
  1. scripts/make-og-image.mjs (decision 18; the tool is Playwright, already a pinned dev dependency from decision 22, used here at authoring time only; decision 25): builds an HTML string in memory and screenshots it at 1200 by 630 (deviceScaleFactor 1) to public/og-image.png. The page links src/styles/tokens/colors.css and typography.css and the self-hosted @fontsource CSS files from node_modules by file:// URL, so colors and faces come from the tokens and fonts the site ships; it embeds the app icon (read from the app repo at 60032bf as in 04-19) as a data: URL and the lockup mark SVG inline.
  2. Layout, light theme, flat, no gradient, no shadow (brief, Brand): `--surface-page` ground; the app icon at left; at right the lockup (mark plus "Hand" in `--font-display` 700, `--text-link`; the @Hand form is allowed here as the logo), then "Your info, ready when you need it" (H3) in `--font-display` 700 `--text-body`, then "A private household organizer for iPhone" in `--font-ui` `--text-muted`. No other words, no price, no religious or devotional imagery.
  3. The script routes every request and aborts any that is not file: or data:, exiting 1 if one was attempted. package.json: `"og:image": "node scripts/make-og-image.mjs"`. README.md: how and when to regenerate it. Run it and commit public/og-image.png.
  4. Open the PNG and confirm the three text items are legible and nothing is clipped; record it in SUMMARY.md.
  Acceptance: public/og-image.png is 1200 by 630; the script made no network request; the image shows only M6's content.
  Verify command: `npm run og:image && test "$(sips -g pixelWidth -g pixelHeight public/og-image.png | awk '/pixel/{print $2}' | tr '\n' ' ')" = "1200 630 " && grep -q '"og:image": "node scripts/make-og-image.mjs"' package.json && grep -q "route(" scripts/make-og-image.mjs && npm run build && test -f dist/og-image.png`

- [ ] 04-21: Canonical, Open Graph, and Twitter tags
  Requirements: VIS-03
  Files: src/layouts/Base.astro
  Copy entries: M1, M2
  Steps:
  1. Base.astro (decision 13): from `current`, `const url = current === "/" ? "https://athandapp.com/" : "https://athandapp.com" + current + ".html"`. Unless `noindex`: `<link rel="canonical" href={url}>` and `<meta property="og:url" content={url}>`.
  2. On every page: `og:type` "website", `og:site_name` "atHand", `og:title` = title, `og:description` = description, `og:image` "https://athandapp.com/og-image.png", `og:image:width` 1200, `og:image:height` 630, `og:image:alt` M2, `twitter:card` "summary_large_image".
  3. 404 keeps noindex and gets no canonical or og:url.
  4. Write each meta tag with `property` (or `name`) before `content`, as the existing description tag does; the verify reads them in that order.
  Acceptance: the tags below on every page; canonical equals the page's own permanent URL; 404 has noindex and neither canonical nor og:url.
  Verify command: `npm run build && node -e 'const fs=require("fs");const dec=s=>s.replace(/&#39;/g,"\x27").replace(/&quot;/g,"\"").replace(/&amp;/g,"&");const urls={"index":"https://athandapp.com/","features":"https://athandapp.com/features.html","pricing":"https://athandapp.com/pricing.html","privacy-overview":"https://athandapp.com/privacy-overview.html","privacy":"https://athandapp.com/privacy.html","support":"https://athandapp.com/support.html","404":null};for(const [p,u] of Object.entries(urls)){const s=fs.readFileSync("dist/"+p+".html","utf8");const meta=k=>{const m=s.match(new RegExp("<meta[^>]*(?:property|name)=\""+k+"\"[^>]*content=\"([^\"]*)\""));return m?dec(m[1]):null};const title=dec(s.match(/<title>([^<]*)<\/title>/)[1]);const desc=meta("description");const want={"og:type":"website","og:site_name":"atHand","og:title":title,"og:description":desc,"og:image":"https://athandapp.com/og-image.png","og:image:width":"1200","og:image:height":"630","og:image:alt":"The atHand logo and the words “Your info, ready when you need it.”","twitter:card":"summary_large_image"};for(const [k,v] of Object.entries(want))if(meta(k)!==v)throw p+": "+k+" = "+meta(k);const canon=(s.match(/<link rel="canonical" href="([^"]*)"/)||[])[1]||null;if(canon!==u||meta("og:url")!==u)throw p+": canonical "+canon;if(u===null&&!/<meta name="robots" content="noindex"/.test(s))throw "404 noindex"}' && npm run check:external`

- [ ] 04-22: Sitemap and robots.txt
  Requirements: SEO-01, SEO-02
  Files: src/pages/sitemap.xml.ts, public/robots.txt, README.md
  Copy entries: none
  Steps:
  1. src/pages/sitemap.xml.ts (decision 15; no @astrojs/sitemap): a static `GET` endpoint returning `application/xml` with a `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">` holding six `<url><loc>` entries in this order: https://athandapp.com/, /features.html, /pricing.html, /privacy-overview.html, /privacy.html, /support.html (absolute). No 404, no lastmod.
  2. public/robots.txt: `User-agent: *`, `Allow: /`, a blank line, `Sitemap: https://athandapp.com/sitemap.xml`.
  3. README.md: list the two files under Layout.
  Acceptance: dist/sitemap.xml and dist/robots.txt exist with exactly that content; check:links and check:external still pass.
  Verify command: `npm run build && node -e 'const s=require("fs").readFileSync("dist/sitemap.xml","utf8");const locs=[...s.matchAll(/<loc>([^<]*)<\/loc>/g)].map(m=>m[1]);if(JSON.stringify(locs)!==JSON.stringify(["https://athandapp.com/","https://athandapp.com/features.html","https://athandapp.com/pricing.html","https://athandapp.com/privacy-overview.html","https://athandapp.com/privacy.html","https://athandapp.com/support.html"])||!s.includes("http://www.sitemaps.org/schemas/sitemap/0.9"))throw JSON.stringify(locs)' && test "$(cat dist/robots.txt)" = "$(printf 'User-agent: *\nAllow: /\n\nSitemap: https://athandapp.com/sitemap.xml')" && npm run check:links && npm run check:external`

- [ ] 04-23: SoftwareApplication JSON-LD on Home
  Requirements: SEO-03, SEO-04
  Files: src/layouts/Base.astro, src/pages/index.astro
  Copy entries: M3, M4, M5
  Steps:
  1. Base.astro: add `<slot name="head" />` at the end of head.
  2. index.astro: `<script type="application/ld+json" slot="head" set:html={JSON.stringify(ld)} />` where `ld` is `{"@context":"https://schema.org","@type":"SoftwareApplication","name":"atHand","alternateName":"atHand: Your Info, Ready","operatingSystem":"iOS","applicationCategory":"UtilitiesApplication","description":M5,"url":"https://athandapp.com/"}` (decision 16). No offers, price, rating, or download URL.
  3. No other page gets JSON-LD. No title or description changes (decision 14).
  Acceptance: Home has exactly one JSON-LD block that parses to exactly those keys and values; no other page has one; static check S15 passes.
  Verify command: `npm run build && node -e 'const fs=require("fs");for(const f of fs.readdirSync("dist").filter(f=>f.endsWith(".html"))){const s=fs.readFileSync("dist/"+f,"utf8");const b=[...s.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];if(f!=="index.html"){if(b.length)throw f+": JSON-LD";continue}if(b.length!==1)throw "count";const j=JSON.parse(b[0][1]);const want={"@context":"https://schema.org","@type":"SoftwareApplication","name":"atHand","alternateName":"atHand: Your Info, Ready","operatingSystem":"iOS","applicationCategory":"UtilitiesApplication","description":"A private household organizer for iPhone. atHand keeps the details you look up all the time, for you and everyone you look after, and suggests the right record when it can help.","url":"https://athandapp.com/"};if(JSON.stringify(j)!==JSON.stringify(want))throw JSON.stringify(j)}' && ! grep -rniwE 'athan|adhan|azan|prayers?|salah|salat|islam|islamic|muslim|mosque|quran|ramadan' dist --include='*.html' --include='*.xml' && npm run check:external`

Wave 4 checks: everything in the wave 3 checks plus S15 to S18. Also open `npm run preview` in the built-in browser, confirm the favicon shows in the tab, and view public/og-image.png; record it in SUMMARY.md. The wave 4 PR lists the metadata strings with their citations (VIS-11).

Live site after this wave: every page has a favicon, an apple-touch-icon, canonical and Open Graph tags (404 excepted for canonical), and Home has JSON-LD; /sitemap.xml and /robots.txt exist. Nothing a visitor reads changes, and every request stays on athandapp.com.

## Static checks for VERIFY

Run from the repo root after `npm run build`. Each must succeed as written.

- S1. No em or en dashes in pages, components, layouts, or built HTML: `! grep -rn -e '—' -e '–' src/pages src/components src/layouts dist --include='*.astro' --include='*.html'`
- S2. No straight apostrophe between letters in page or component source: `! grep -rnE "[A-Za-z]'[A-Za-z]" src/pages src/components`
- S3. "@Hand" appears nowhere as text in src or dist (the lockup and the OG image draw "@" as an SVG mark): `! grep -rn '@Hand' src dist`
- S4. No "nothing leaves your phone" equivalent: `! grep -rniE 'nothing (ever )?leaves|never leaves|stays on your phone' dist --include='*.html'`
- S5. No price in any page's text, alt text, meta content, or JSON-LD (style blocks and the theme script are excluded, since inline CSS holds decimals such as 1.08): `node -e 'const fs=require("fs");for(const f of fs.readdirSync("dist").filter(f=>f.endsWith(".html"))){const s=fs.readFileSync("dist/"+f,"utf8").replace(/<style\b[\s\S]*?<\/style>/g,"").replace(/<script(?![^>]*ld\+json)[^>]*>[\s\S]*?<\/script>/g,"");const t=s.replace(/<[^>]*>/g," ")+" "+[...s.matchAll(/\s(?:alt|content)="([^"]*)"/g)].map(m=>m[1]).join(" ");if(/\$\s*\d|\d\.\d\d(?!\d)|USD|€|£/.test(t)){console.error(f);process.exitCode=1}}'`
- S6. No out-of-scope feature: `! grep -rniw -e android -e ipad -e icloud -e carplay -e bluetooth -e ai -e 'apple health' -e 'artificial intelligence' -e 'car connectivity' dist --include='*.html'`, and every main-text sentence that mentions a subscription or sync is an approved one: `node -e 'const fs=require("fs");const ok=["There is no subscription.","There is no subscription, no ads, and no account.","A backup is a one-time copy, not sync.","No subscription, no ads, no account."];for(const f of fs.readdirSync("dist").filter(f=>f.endsWith(".html"))){const m=fs.readFileSync("dist/"+f,"utf8").match(/<main\b[^>]*>([\s\S]*?)<\/main>/)[1].replace(/<[^>]*>/g,"").replace(/\s+/g," ");for(const s of m.match(/[^.?]*\b(subscriptions?|sync)\b[^.]*\./gi)||[])if(!ok.includes(s.trim())){console.error(f+": "+s.trim());process.exitCode=1}}'`
- S7. Every page exists at its URL and the permanent URLs do not move: `for p in index features pricing privacy-overview privacy support 404; do test -f dist/$p.html || exit 1; done && test ! -e dist/support && test ! -e dist/privacy && test -f src/pages/privacy.astro && test -f src/pages/support.astro`
- S8. Policy and 404 main text unchanged: `npm run check:content`
- S9. Coming-soon line twice on Home (hero line and closing h2), once on Features and Pricing, and on no other page: `test "$(grep -o 'Coming soon to the App Store for iPhone.' dist/index.html | wc -l | tr -d ' ')" = 2 && for p in features pricing; do test "$(grep -o 'Coming soon to the App Store for iPhone.' dist/$p.html | wc -l | tr -d ' ')" = 1 || exit 1; done && ! grep -l 'Coming soon' dist/privacy-overview.html dist/support.html dist/privacy.html dist/404.html`
- S10. Approved copy and alt text on every changed page: `for p in index features pricing privacy-overview support; do node scripts/check-text.mjs dist/$p.html .planning/phases/04-visuals-and-polish/copy/$p.txt || exit 1; done`
- S11. Token variables only in the site layer: `! grep -nE '#[0-9a-fA-F]{3,8}\b|rgba?\(|hsla?\(|\bInter\b|Space Grotesk|sans-serif|system-ui' src/styles/site.css src/components/*.astro src/layouts/Base.astro src/pages/*.astro`
- S12. One breakpoint, in em, and no text below 16px in CSS: `! grep -n '@media' src/styles/site.css | grep -vE '\(min-width: 52\.5em\)|prefers-color-scheme: dark' && ! grep -nE 'font-size:\s*(0?\.[0-9]+rem|(1[0-5]|[0-9])px)' src/styles/site.css && ! grep -rn 'container-type\|@container' src/styles/site.css`
- S13. No new tokens and dependencies as planned: `npm run tokens:check && ! grep -oE '(^|[;{ ])--[a-z0-9-]+\s*:' src/styles/site.css | grep -v -- '--site-' && node -e 'const p=require("./package.json");if(JSON.stringify(p.dependencies)!==JSON.stringify({"@astrojs/check":"0.9.12","@fontsource/inter":"5.3.0","@fontsource/space-grotesk":"5.3.0","astro":"7.4.2","typescript":"6.0.3"})||JSON.stringify(p.devDependencies)!==JSON.stringify({"axe-core":"4.14.0","playwright":"1.64.1"}))process.exit(1)' && ! grep -rl 'axe-core\|playwright' dist`
- S14. No served image can show a price: `test ! -e src/assets/shots/07-paywall-light.png && test ! -e src/assets/shots/07-paywall-dark.png && ! grep -rnE '07-paywall-(light|dark)' src && test -z "$(find dist -name '*.png' ! -name favicon.png ! -name favicon-32.png ! -name apple-touch-icon.png ! -name og-image.png)" && test -z "$(find dist -name '*03-person-documents*')"`
- S15. Athan disambiguation without religious wording: `! grep -rniwE 'athan|adhan|azan|prayers?|salah|salat|islam|islamic|muslim|mosque|quran|ramadan' dist --include='*.html' --include='*.xml' --include='*.txt'`
- S16. Metadata on every page: re-run the verify commands of 04-19, 04-21, and 04-23.
- S17. Sitemap and robots: re-run the verify command of 04-22.
- S18. No script in content components or pages except the JSON-LD block: `test -z "$(grep -rn '<script' src/pages src/components | grep -v 'application/ld+json')"`
- S19. Layout and accessibility checks: `npm run check:layout && npm run check:a11y`

VERIFY also reads each page against its Copy drafts entries in order and heading level (the fixtures prove presence, not structure), compares Home and the page tops with HOME-DESIGN.md at 390 and 1280 px in both themes, and records the axe and layout results per page and theme (A11Y-06).

## Risks and rollback

- OG image tool. Decision 22 names Playwright for check scripts; 04-20 also uses it once, at authoring time, to render the OG image, because `sips` cannot set type. The output is a committed static PNG and nothing reaches dist/ but that file. Jake approved this use in REVISE (decision 25).
- Chromium download. `npx playwright install chromium` downloads Playwright's browser build to this Mac once (04-01). It is a local dev tool, not a runtime request, and never ships. check:layout and check:a11y run locally before every PR and are not added to the Deploy workflow, so CI does not download a browser; the workflow's existing checks are unchanged.
- check:a11y strictness. axe best-practice rules and the 44px standalone-target rule may flag existing markup outside a wave's files (for example the support lede or a phase 03 element). A failure the wave's files cannot fix is a blocker, not a reason to weaken the check.
- Interim layout. During wave 1 and 2, page content sits in the 68ch `.wrap` column while the header and footer use the 1200px container, so text pages look narrower than the chrome on wide screens until wave 3. This is cosmetic and accepted.
- astro:assets emission. Decision 7 requires that only imported shots are emitted. 04-08 uses a non-eager glob, and 04-12 and S14 prove dist/ holds no PNG and no 03-person-documents file. If Astro still emits an unused original, EXECUTE switches PhoneFrame to explicit imports passed in by each page, inside 04-08's files, and notes it in SUMMARY.md.
- Paywall crop margin. The crop ends at row 1379 and the price card starts near row 1400. PLAN viewed both crops; 04-07 repeats the visual check.
- Fixture transcription. Fixtures were checked mechanically against CONTEXT.md, but a reviewer should still skim them; EXECUTE stops rather than editing one.
- Rollback: revert the wave's PR on main; the Deploy workflow republishes the previous build. Wave 1 reverts to the phase 03 chrome. Wave 2 reverts Home and restores the 07-paywall originals with it. Wave 3 reverts the page tops and brings back `.wrap`. Wave 4 removes metadata only.

## Self-check

Run 2026-10-25 at PLAN; re-run 2026-10-25 at REVISE (A9 approved, decision 24; Playwright for the OG image recorded as decision 25). No task, file, wave, or verify command changed beyond removing the A9 gate from 04-12; results below unchanged.

- All phase requirements covered: yes, with one planned exception. VIS-01 to VIS-11, SEO-01 to SEO-04, and A11Y-01 to A11Y-06 each map to tasks or to VERIFY steps above. FEAT-01 is deliberately outside the waves by decision 21 and is either added by REVISE or moved to phase 04.1 at SHIP.
- Every task has acceptance and verify: yes. All 23 tasks.
- No conflict with the brief or CLAUDE.md: yes. Copy comes only from Approved entries via the fixtures (A9 Approved in REVISE, decision 24); no price in pages or served images (04-07, S5, S14); no "nothing leaves" wording (S4); no out-of-scope feature (S6); no third-party request at runtime (check:external in every task that adds head links or assets; the two dev dependencies never reach dist/, S13); tokens unchanged and no new tokens (S13); @Hand only in the lockup and the OG image logo (S3, 04-20); 17px body, 16px minimum, 44px targets, contrast, reduced motion, and 400% zoom (check:a11y, check:layout); /privacy.html and /support.html keep their URLs (S7); privacy and 404 main text unchanged (S8); no religious wording (S15).
- Files in scope complete: yes. Every file a task names is listed, including the two deletions; deploy.yml, the token files, the other check scripts, and the fixtures are named as not changed.
- Every wave leaves the live site whole: yes. Wave 1 changes chrome only and keeps main text; wave 2 rebuilds Home and touches other pages only through the coming-soon icon; wave 3 converts each page and removes `.wrap` in its last task, with all fixtures, check:content, and check:links at the wave's end; wave 4 adds metadata only. Each wave ends with check:links, check:layout, and check:a11y.
- Waves are at most six tasks: yes (6, 6, 6, and 5).

## Fix wave

(added by VERIFY if needed)
