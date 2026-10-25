# Phase 03: pages-and-copy - Verify

Result: PASS
Date: 2026-10-25

Run on branch verify/03-pages-and-copy from main at dec5a85 (wave 2, PR #21, merged), local Node 26.11.1. App repo checkout at ~/dev/athandapp: HEAD 0fa0ec4, origin/main 60032bf (the commit CONTEXT.md read); `git diff 60032bf origin/main -- athand-project-brief.md` is empty. PLAN.md: all ten tasks in waves 1 and 2 are checked. The copy/ fixtures are unchanged since the PLAN commit (1a74a11).

## Automated checks

- `npm ci`: pass. Same fsevents install-scripts notice as earlier phases; no effect on the build.
- `npm run build`: pass, 7 pages.
- `npm run check`: pass, 0 errors, 0 warnings, 0 hints.
- `npm run tokens:check`: pass, prints the fonts.css exception line and "4 files match 0fa0ec4f731111368db3dc976fd67d92f9cf3334".
- `npm run check:external`: pass, 8 files scanned, no third-party requests.
- `npm run check:content`: pass for privacy and 404 against 52d8d1a (the default since 03-06).
- `npm run check:links`: pass, 62 internal links resolve.
- check-text against all five fixtures: pass. index 33 lines, features 34, pricing 26, privacy-overview 27, support 72.
- Static checks S1 to S10 from PLAN.md, each run as written: all pass (S1 dashes, S2 straight apostrophes, S3 "@Hand", S4 "nothing leaves" wording, S5 prices, S6 out-of-scope words and the subscription and sync sentence list, S7 every page at its URL with no dist/support or dist/privacy directory, S8 privacy.astro, 404.astro, and package-lock.json unchanged since 5973706, S9 coming-soon line once on Home, Features, and Pricing and on no other page, S10 check-text on the five pages).
- Task-level checks re-run: 03-07 nav script (one `nav aria-label="Main"` per page, links in order, aria-current on the right link and none on privacy and 404), 03-07 font-size grep, 03-08 footer link on every page, 03-03 and 03-10 heading counts (Features 1 h1 and 6 h2; Support 1 h1 and 8 h2), 03-04 "one-time purchase", and 03-05 named connections: all pass.
- Not changed since 5973706: ThemeControl.astro, src/styles/tokens/, and public/ (empty diff).
- Live site (Deploy run 40206530300 on main, head dec5a85, `success`): https://athandapp.com/, /features.html, /pricing.html, /privacy-overview.html, /privacy.html, and /support.html return 200; an unknown path returns 404; live /features.html carries the main navigation.

### Copy order and heading levels

The fixtures prove presence, not order or heading level, so each built page's main content was printed as an outline (element, text, link targets) and read against its Copy drafts entries in CONTEXT.md:

- Home: H3 (h1), H4 (lede), C1, H5 (h2), H6, H7 (h2), H8 to H11 (list), H12 (link to /features.html), the panel section labelled by the h2 H13 (`id="privacy-summary"`) with H14 to H17 and the two H18 links, H19 (h2), H20, H21 (link to /pricing.html). Title H1 and description H2 match. In order.
- Features: FE3 to FE30 in order, six h2 (FE5, FE10, FE15, FE20, FE25, FE29), FE18 link to /privacy-overview.html with the period outside the link. Title and description match. In order.
- Pricing: P3 to P19 in order, four h2, the P7 and P10 lists, "See Support" to /support.html. In order.
- Privacy overview: V3 to V24 in order, five h2, three h3 (V11, V13, V15) under V9 with V17 after them, the V19 list, "full privacy policy" to /privacy.html and the mailto link. In order.
- Support: S3 to S7 unchanged, then the seven h2 groups S9, S20, S33, S40, S47, S52, and S57 with every h3 question and answer in the drafted order; links S22, S46, S53, and S55 go to the drafted targets; S13 reads "Backup & restore". In order.

### Browser and accessibility

Built-in browser against `astro preview` at http://localhost:4321 serving this checkout's dist/ (served pages compared with the fresh build). axe-core and Playwright are not installed on this machine, and the plan names no dependency for them, so axe did not run. As in phase 02, an in-page script checked all seven pages in light and dark, each at 1024 and 320 CSS px:

- Contrast, every visible text element against its effective background: lowest 7.11:1 (light) and 7.93:1 (dark) on every page except /privacy.html, whose lowest is the unchanged "Last updated" line at 4.85:1 (light) and 5.86:1 (dark). All pass AA.
- Text size: body paragraphs 17px on every page; smallest text 16px (theme buttons, footer, and the /privacy.html "Last updated" line).
- Targets: no standalone link or button under 44 by 44 CSS px on any page at either width. Nav links at 320px: Features 71 by 44, Pricing 57 by 44, Privacy 60 by 44, Support 65 by 44. Inline links inside sentences stay inline and underlined.
- Reflow: at 320 CSS px (the width 400% zoom gives on a 1280px window) no page scrolls horizontally in either theme, and no element extends past the viewport. The header wraps to lockup, then Features, Pricing, and Privacy, then Support, then the theme buttons.
- Current page: on Features, Pricing, Privacy overview, and Support the current nav link computes to weight 700 with a solid 3px underline; on Home the lockup carries aria-current; on /privacy.html and /404.html nothing does.
- No color-only meaning: every link in main and the footer is underlined.
- Structure: `lang="en"`; one header, main, and footer per page; navigations named "Main" and "Footer"; one h1 per page; no skipped heading level; no unnamed link or button; no images; no duplicate ids.
- Theme: Dark chosen on /support.html persisted to /pricing.html (`data-theme="dark"`, stored `dark`, Dark pressed, background rgb(14, 15, 19)); System restored afterward.
- Keyboard: the first Tab reaches "Skip to main content" (47px tall, 3px solid outline); Tab order continues lockup, Features, Pricing, Privacy, Support, each with a 3px outline.
- JavaScript: Header.astro has no script; the nav is plain links.
- Reduced motion: site.css has no transition or animation; the tokens' `prefers-reduced-motion: reduce` rule is present.
- Network: every request was to localhost:4321 (pages, one CSS file, and the self-hosted woff2 faces).

## Requirement evidence

- PAGE-01: PASS. src/pages/index.astro builds dist/index.html with the h1 "Your info, ready when you need it", the lede naming people, vehicles, pets, homes, financial accounts, and contacts, "For the moments you need it" (who it is for, from the brief's Concept), and "What it does" with the four in-scope capabilities; check-text against copy/index.txt passes, including the H22 removals.
- PAGE-02: PASS. src/pages/features.astro builds /features.html with the five in-scope sections (records, scanning, suggestions, app lock, backups) plus Light and dark; S6 finds no Android, iPad, iCloud, CarPlay, Bluetooth, AI, Apple Health, or car connectivity, and the only sync or subscription sentences are the approved ones; FE17 names no car-connectivity signal (decision 18); check-text against copy/features.txt passes.
- PAGE-03: PASS. src/pages/pricing.astro builds /pricing.html: free download, "One-time purchase" heading and lede, the free list (P7), what the unlock adds (P10), purchases belong to the Apple ID with Restore purchase (P13), Family Sharing off (P14), and "Backups never unlock" (P16 to P18); S5 finds no amount or currency; check-text against copy/pricing.txt passes.
- PAGE-04: PASS. src/pages/privacy-overview.astro builds /privacy-overview.html naming Apple and RevenueCat (purchases), Google ML Kit (diagnostics), and Apple's geocoding service (place lookup), every connection /privacy.html names; V24 links "full privacy policy" to /privacy.html; S4 finds no "nothing leaves" wording on any page; check-text against copy/privacy-overview.txt passes.
- PAGE-05: PASS. dist/support.html exists at that exact path (S7) with backup, restore purchase, app lock, scanning, permissions, and contact answers in seven groups; check-text against copy/support.txt passes; live /support.html returns 200.
- PAGE-06: PASS. Every string on the five pages matches an Approved Copy drafts entry (S10 and the outline read above), and the copy fixtures are unchanged since PLAN. PR #20 ("Brief citations") and PR #21 ("Product claims and brief sections") list every claim placed in each wave with its brief section.
- PAGE-07: PASS. src/components/Header.astro:9-14 and :20-23 render the Main nav with Features, Pricing, Privacy (overview), and Support; Home is the lockup (:19); src/layouts/Base.astro:25 normalizes the path; aria-current is correct on all seven pages (03-07 script); check:links 62 links resolve; 320px reflow with 44px nav targets and no horizontal scrolling (browser).
- PAGE-08: PASS. src/components/ComingSoon.astro is used at index.astro:9, features.astro:9, and pricing.astro:9, the three pages that talk about getting the app (decision 5); S9 shows the line exactly once on each and on no other page. Support mentions the App Store only for how the price is shown (S22), not availability.
- Locked accessibility floor (CONTEXT.md, Locked by the brief and CLAUDE.md): PASS. Contrast, 17px body, 16px minimum, 44px targets, underlined links and a weight plus underline current marker, 320px reflow, and reduced motion all pass in both themes (browser).

## Browser acceptance checklist for Jake

Run after this PR merges and the Deploy workflow on main finishes green, on https://athandapp.com.

1. On a Mac in Safari, open https://athandapp.com. The header shows the "@" mark with "Hand", then Features, Pricing, Privacy, and Support, then the System, Light, and Dark buttons. The page heading reads "Your info, ready when you need it", followed by "Coming soon to the App Store for iPhone."
2. Click Features, Pricing, Privacy, and Support in turn. Each opens its page (/features.html, /pricing.html, /privacy-overview.html, /support.html), and the link for the page you are on is bold with a thick underline. On the home page none of the four is marked.
3. Type https://athandapp.com/privacy.html and https://athandapp.com/support.html into the address bar. Each loads at that exact address with no redirect. On /privacy.html none of the four header links is marked, and the footer link reads "Privacy policy".
4. Open https://athandapp.com/does-not-exist. A "Page not found" page appears with the same header, navigation, and footer.
5. Read Home, Features, Pricing, Privacy, and Support. Features, Pricing, and Home each say "Coming soon to the App Store for iPhone." once. Pricing says "one-time purchase" and shows no price. The Privacy page names Apple, RevenueCat, Google ML Kit, and Apple's geocoding service, and links to the full privacy policy.
6. On Support, scroll through the questions. They sit under seven headings: Backups, Purchases, App lock, Scanning, Suggestions, Permissions and your data, and About atHand. Every answer is visible without clicking anything.
7. Click every link inside the page text on each page (for example "See all features", "See pricing", "Read how atHand handles your information", "See Pricing", "privacy overview"). Each opens the expected page; none shows "Page not found".
8. With System pressed, open System Settings, Appearance, and switch between Light and Dark while a page is open. The page follows the OS each time without a reload.
9. Press Dark, then go to Pricing and Support. They stay dark and Dark stays pressed. Press Light and repeat. Press System at the end.
10. In both Light and Dark, read every page. All text is easy to read, every link in the page body and footer is underlined, and the current header link is visibly marked by its thickness and underline, not only by color.
11. Keyboard only: reload, then press Tab. "Skip to main content" appears with a visible outline; press Return and focus moves to the page content. Reload and keep pressing Tab (turn on "Press Tab to highlight each item on a webpage" in Safari, Settings, Advanced, if Tab skips links). Focus moves lockup, Features, Pricing, Privacy, Support, System, Light, Dark, links in the page, then footer links, each with a visible outline.
12. VoiceOver in Safari on Mac (Command-F5): open the rotor (Control-Option-U). Landmarks lists banner, a navigation named "Main", main, a navigation named "Footer", and contentinfo. Headings lists one heading 1 per page; on Support the seven group headings are level 2 and the questions are level 3. On the Pricing page, VoiceOver reads the Pricing header link as current page (for example "Pricing, current page, link"). On Home, the lockup reads "atHand, home" and is marked current. The theme buttons read as toggle buttons inside a group named "Appearance", with the pressed one marked selected.
13. Zoom: press Command-Plus until Safari reaches its largest zoom (aim for 400%) on Home, Features, Pricing, Privacy, and Support. No horizontal scrolling and no clipped or overlapping text. The header wraps onto several rows (lockup, links, theme buttons), and every link stays clickable.
14. Turn on System Settings, Accessibility, Display, Reduce motion, and reload. Nothing on the site animates.
15. Open Develop, Show Web Inspector, Network, and reload each of the seven pages. Every request goes to athandapp.com; nothing goes to any other host.
16. On iPhone in Safari, repeat steps 1, 2, 3, 6, and 8 (switch the iPhone between Light and Dark in Control Center while on System). The header wraps without sideways scrolling, and each header link is easy to tap without hitting its neighbor.

## Jake's browser result

(recorded at SHIP)
