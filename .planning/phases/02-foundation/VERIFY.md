# Phase 02: foundation - Verify

Result: PASS
Date: 2026-10-24 (VERIFY found GAPS; FIX re-run the same day passes)

Run on branch verify/02-foundation from main at 42181a7 (wave 3 merged), local Node 26.11.1. App repo checkout at ../athandapp: HEAD 0fa0ec4 (branch verify/07-release-acceptance), working tree clean under athand-design-handoff/_ds/, and `git diff` of that folder against e7537e7 (the commit named in the token headers) and against origin/main (60032bf) is empty.

## Fix wave re-run

Run at FIX on branch fix/02-touch-targets from main at 5e6e06d (VERIFY merged), local Node 26.11.1, after task 02-12 (commit 2b6933d). App repo checkout at ../athandapp unchanged (0fa0ec4).

- `npm ci`, `npm run build` (4 pages), `npm run check` (0 errors, 0 warnings, 0 hints), `npm run tokens:check` (exception line printed; 4 files match 0fa0ec4), `npm run check:external` (5 files, no third-party requests), and `npm run check:content` (index, privacy, support, and 404 against 52d8d1a): pass.
- Static checks 5 to 22: pass. Static checks 17 and 18 return nothing. Check 22: build_type `workflow`; the latest Deploy run on main (40128490655, head 5e6e06d) concluded `success`.
- 02-12 verify command: pass.
- Static check 23 and the 02-12 acceptance, built-in browser against `astro preview` at http://localhost:4321 serving this checkout's dist/, each page in light and dark at a 320 CSS px viewport:
  - Footer, every page: Privacy 53 by 44, Support 58 by 44, support@athandapp.com 184 by 44, Made by Jacob Davis 154 by 44.
  - Home page "Learn more": Privacy policy 105 by 44, Support and help 131 by 44.
  - 404 page: Go to the atHand home page 220 by 44.
  - Every one keeps `text-decoration-line: underline`. Inline links inside sentences stay `display: inline` (for example "full privacy policy" on the home page).
  - No horizontal scrolling on any page in either theme.
- The gap below is closed. FND-10 and the locked accessibility floor are now PASS.

## Gap (found at VERIFY, closed at FIX)

One gap, against a rule CONTEXT.md locks for this phase ("Locked by the brief and CLAUDE.md": 44px targets; CLAUDE.md, Hard rules). Standalone links are 20 to 21 CSS px tall:

- Footer, every page: Privacy 56 by 20, Support 60 by 20, support@athandapp.com 192 by 20, Made by Jacob Davis 163 by 20.
- Home page "Learn more" list: Privacy policy 112 by 21, Support and help 138 by 21.
- 404 page: Go to the atHand home page 231 by 21.

The lockup (103 by 44) and the theme buttons (87, 68, and 66 by 44) meet the rule. Links inside running sentences (for example "full privacy policy" on the home page, the policy links on /privacy.html) are treated as inline text links, which the 44px rule does not reach (the WCAG 2.5.8 inline exception). Fix wave task 02-12 in PLAN.md covers the seven standalone links with CSS only.

## Automated checks

- `npm ci`: pass. Same fsevents install-scripts notice as earlier waves; no effect on the build.
- `npm run build`: pass, 4 pages.
- `npm run check` (static check 1): pass, 0 errors, 0 warnings, 0 hints.
- `npm run tokens:check` (static check 2): pass, prints the fonts.css exception line and "4 files match 0fa0ec4f731111368db3dc976fd67d92f9cf3334".
- `npm run check:external` (static check 3): pass, 5 files scanned, no third-party requests.
- `npm run check:content` (static check 4): pass for index, privacy, support, and 404 against 52d8d1a.
- Static check 5: pass. dist/index.html, privacy.html, support.html, 404.html, and CNAME exist; no dist/privacy or dist/support directory.
- Static check 6 (Google Fonts hosts in dist, src, public): pass, nothing.
- Static check 7 (absolute URLs in dist CSS and JS): pass, nothing.
- Static check 8 (fonts): pass. 16 files, woff2 and woff for inter-latin 400, 500, 600, 700, 800 and space-grotesk-latin 500, 600, 700; no italic, cyrillic, greek, vietnamese, or ext.
- Static check 9: pass. "atHand is made by Jacob Davis" absent from dist; the privacy identification sentence appears exactly once in dist/privacy.html.
- Static check 10: pass. Every dist page has "Made by Jacob Davis" and `href="https://jacobdavis.co"`.
- Static check 11: pass. Every dist page has `aria-label="atHand, home"`.
- Static check 12 (@Hand as text in src and dist): pass, nothing.
- Static check 13 (em dashes in src outside tokens, and README.md): pass, nothing.
- Static check 14 (straight apostrophes in src/pages): pass, nothing.
- Static check 15 (forbidden privacy phrasing in src and dist): pass, nothing.
- Static check 16 (iframe, form, embed, object in dist): pass, nothing.
- Static check 17 (transition or animation in site.css): pass, nothing.
- Static check 18 (font sizes under 16px in site.css): pass, nothing.
- Static check 19: pass. Each of colors, effects, spacing, and typography has a valid header, and the rest of the file matches the app's _ds token file byte for byte (`tail -n +2 | cmp`).
- Static check 20: pass. src/assets/logo-lockup-mark.svg matches the app's asset byte for byte.
- Static check 21: pass. src/styles/tokens/ holds only the four token files.
- Static check 22: pass. Pages build_type `workflow`, cname athandapp.com, HTTPS enforced; the latest Deploy run on main (run 40128017171, head 42181a7) concluded `success`.
- Live site: https://athandapp.com/ 200, /privacy.html 200, /support.html 200, an unknown path 404; live /privacy.html carries the theme control (`aria-label="Appearance"`).
- Static check 23, built-in browser against `astro preview` at http://localhost:4321 serving this checkout's dist/:
  - Theme: Dark chosen on / persisted to /privacy.html after navigation (`data-theme="dark"`, stored `dark`, Dark `aria-pressed="true"`, dark background). System removed `data-theme`, stored `system`, and followed the emulated OS appearance both ways (dark OS: background rgb(14, 15, 19); light OS: rgb(246, 245, 241)) with System pressed.
  - JavaScript off (each page rendered in a sandboxed frame without scripts): the theme control stays `hidden` (display none), no `data-theme` is set, and the page follows the OS.
  - Targets: theme buttons 87, 68, and 66 by 44 CSS px; lockup 103 by 44. Standalone text links fail (see Gap).
  - 320 CSS px viewport: no horizontal scrolling on any page in light or dark (scrollWidth equals clientWidth).
  - Keyboard: the first Tab reaches the skip link, which becomes visible (47px tall) with a 3px solid outline; the theme buttons show a 3px outline in the link color.
  - Reduced motion: the tokens' `prefers-reduced-motion: reduce` rule is present; site.css has no transition or animation.
  - Network: every request was to localhost:4321 (pages, one CSS file, woff2 faces).
- Accessibility audit: axe-core and Playwright are not installed on this machine, and the plan names no dependency for them, so axe did not run. Instead an in-page script checked every page in light and dark:
  - Text contrast against the effective background, every visible text element: lowest 4.85:1 in light and 5.86:1 in dark, both on the "Last updated" line of /privacy.html (`--text-faint`); every other page's lowest is 7.11:1 (light) and 7.93:1 (dark). All pass AA for 16px and larger text.
  - Smallest text: 16px (theme buttons and footer); body text 17px on every page.
  - Structure: `lang="en"`; one header, one main, and one footer per page; footer nav named "Footer"; skip link to `#main`; one h1 per page and no skipped heading level (home h1, h2; privacy h1, h2, h3; support h1, h2, h3; 404 h1); no link or button without a name; no images without alt; no duplicate ids.

## Requirement evidence

- FND-01: PASS. astro.config.mjs:5 `output: "static"`, :7 `build: { format: "file" }`; `npm run build` emits dist/index.html, privacy.html, support.html, and 404.html with no directories (static check 5).
- FND-02: PASS. .github/workflows/deploy.yml:5-6 (push to main, workflow_dispatch), :30 Node 22.23.4, :33-37 the four checks, :41 actions/upload-pages-artifact@v5, :52 actions/deploy-pages@v5; Pages build_type `workflow`; Deploy run 40128017171 on main `success`. Jake's settings change is PLAN.md, Steps for Jake outside the repo, step 2.
- FND-03: PASS. public/CNAME reads athandapp.com and ships as dist/CNAME; the root CNAME is gone (02-09, commit 4da84ea); Pages cname athandapp.com.
- FND-04: PASS. Static check 19 and `npm run tokens:check`: the four token files equal the app's _ds tokens after a one-line header naming davisj2007/athandapp and e7537e77d2257f8e6c10473e047017fd6e335aa0.
- FND-05: PASS. `npm run tokens:check` exits 0 and prints the fonts.css exception. Failure behavior (missing app repo, an appended byte, an extra fonts.css) was exercised at EXECUTE (SUMMARY.md, Check results, wave 1) and the script is unchanged since (commit a46795c).
- FND-06: PASS. src/layouts/Base.astro:6-13 imports the eight named latin faces from @fontsource; static check 8 (16 files, only those faces); static checks 6 and 7; browser requests only localhost.
- FND-07: PASS. Base.astro:42 key `athand-theme`, inline script in head applies before first paint, :76 `aria-pressed`, :111 follows `prefers-color-scheme` on System; ThemeControl.astro:1 group "Appearance", hidden until the script runs; browser: persistence, System both ways, JavaScript off, 44px buttons.
- FND-08: PASS. Base.astro:27 `lang="en"`, :30 viewport, :31-32 per-page title and description, :33 color-scheme, :124 skip link; landmarks one each per page (browser audit).
- FND-09: PASS. src/components/Header.astro:7, the inlined logo-lockup-mark.svg (byte for byte, static check 20) plus "Hand", linking `/`, named "atHand, home" (static check 11).
- FND-10: PASS. src/components/Footer.astro has Privacy, Support, support@athandapp.com, and "Made by Jacob Davis" to https://jacobdavis.co (static check 10). Footer links measure 44 CSS px tall after 02-12 (src/styles/site.css, `footer.site a`; Fix wave re-run).
- FND-11: PASS. src/pages/404.astro:8 links `/`; the footer links /support.html; dist/404.html is noindex.
- FND-12: PASS. `npm run check:content` matches main text and links for all four pages against 52d8d1a.
- FND-13: PASS. `npm run check:external` passes on dist/; its failure fixtures were exercised at EXECUTE (02-05 verify command) and the script is unchanged since (commit 5b2c4d5).
- FND-14: PASS. README.md (64 lines) covers the build, the Deploy workflow and Pages settings, tokens:check with ATHAND_APP_DIR, check:external, and check:content; 02-10's verify command passes.
- Locked accessibility floor (CONTEXT.md, Locked by the brief and CLAUDE.md): PASS. 44px targets pass after 02-12 (Fix wave re-run); VERIFY had failed it on the seven standalone links. Contrast, 17px body, 16px minimum, no color-only meaning (links underlined), 320px reflow, and reduced motion pass.

## Browser acceptance checklist for Jake

Run after the FIX PR merges and the Deploy workflow on main finishes green, on https://athandapp.com.

1. On a Mac in Safari, open https://athandapp.com. The page shows the "@" mark with "Hand" at the top left, the System, Light, and Dark buttons at the top right, the heading "Your info, ready when you need it", and a footer with Privacy, Support, support@athandapp.com, and "Made by Jacob Davis".
2. Open https://athandapp.com/privacy.html and https://athandapp.com/support.html by typing those exact addresses. Each loads at that address with no redirect, showing the privacy policy and the support page.
3. Open https://athandapp.com/does-not-exist. A "Page not found" page appears with a link to the home page and the same header and footer.
4. With System pressed, open System Settings, Appearance, and switch between Light and Dark while the page is open. The page changes with the OS each time, without a reload.
5. Press Light, then reload. The page stays light and Light stays pressed. Go to another page; it is light too. Repeat with Dark. Press System at the end; the page returns to following the OS.
6. In both Light and Dark, read every page. All text is easy to read against its background, and every link in the page body and footer is underlined.
7. In Safari, Settings, Advanced, check "Show features for web developers"; then Develop, Disable JavaScript, and reload. The theme buttons are gone, and the page follows the OS appearance. Turn JavaScript back on.
8. Keyboard only: reload, then press Tab. A "Skip to main content" link appears at the top left with a visible outline; press Return and focus moves to the main content. Keep pressing Tab (turn on "Press Tab to highlight each item on a webpage" in Safari, Settings, Advanced, if Tab skips links). Focus moves in order: lockup, System, Light, Dark, links in the page, then footer links, each with a visible outline.
9. Footer and "Learn more" links: on an iPhone, tap each footer link and the two "Learn more" links on the home page. Each has a comfortable tap area about as tall as the theme buttons, and taps do not hit the wrong link.
10. VoiceOver in Safari on Mac (Command-F5): open the rotor (Control-Option-U). Headings lists one heading 1 per page and nested headings in order; Landmarks lists banner, main, and contentinfo, and a navigation named "Footer". The lockup reads "atHand, home, link". The theme buttons read as "System, toggle button" (or similar) with "selected" on the pressed one, inside a group named "Appearance".
11. Zoom: press Command-Plus until Safari shows 400% (or set Page Zoom to 400% where available) on each of the four pages. No horizontal scrolling, no clipped or overlapping text, and the theme buttons wrap below the lockup.
12. Turn on System Settings, Accessibility, Display, Reduce motion, and reload. Nothing on the site animates (the site has no animation either way).
13. Open Develop, Show Web Inspector, Network, and reload each page. Every request goes to athandapp.com; nothing goes to fonts.googleapis.com, fonts.gstatic.com, or any other host.
14. On iPhone in Safari, repeat steps 1, 2, 4, 5, and 9. Switch the iPhone between Light and Dark in Control Center while on System; the page follows.

## Jake's browser result

(recorded at SHIP)
