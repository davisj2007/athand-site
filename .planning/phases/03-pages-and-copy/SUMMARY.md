# Phase 03: pages-and-copy - Summary

Status: Shipped 2026-10-25. VERIFY PASS; Jake's browser result PASS.

## What changed

Wave 1 (EXECUTE, 2026-10-25, branch execute/03-wave-1 from main at e9822a4):

- 03-01: scripts/check-text.mjs (a built page against an expected-copy fixture: title, description, required and absent main-text strings, and link targets inside main) and scripts/check-links.mjs (every internal `<a href>` in dist/ resolves to a file). package.json gains the `check:links` script only; dependencies and package-lock.json are unchanged. The Deploy workflow runs `npm run check:links` after `npm run check:external`. README.md documents both.
- 03-02: src/components/ComingSoon.astro renders "Coming soon to the App Store for iPhone." Home uses it in place of the literal line; Home's main text and links are unchanged (check:content).
- 03-03: src/pages/features.astro builds /features.html from FE1 to FE30 and C1.
- 03-04: src/pages/pricing.astro builds /pricing.html from P1 to P19 and C1. No price, amount, or currency appears.
- 03-05: src/pages/privacy-overview.astro builds /privacy-overview.html from V1 to V24.

Live site after this wave: Home, Privacy, Support, and 404 read exactly as before. The three new pages are reachable by URL only; nothing links to them yet except each other (Features links to the Privacy overview).

Wave 1 check results (2026-10-25): `npm ci`, `npm run build` (7 pages), `npm run check` (0 errors, 0 warnings), `npm run tokens:check` (4 files match 0fa0ec4), `npm run check:external` (no third-party requests), `npm run check:content` (index, privacy, support, and 404 match 52d8d1a), `npm run check:links` (29 internal links resolve), check-text against features, pricing, and privacy-overview fixtures, and static checks S1 to S8: all pass. App repo origin/main is still 60032bf.

Browser check (built-in browser, `astro preview` at localhost:4321, 2026-10-25): /features.html, /pricing.html, and /privacy-overview.html each load with status 200 and render with the existing header (lockup and theme control) and footer, in both light and dark color schemes. The only host requested was localhost.

Wave 2 (EXECUTE, 2026-10-25, branch execute/03-wave-2 from main at 67fff21):

- 03-06: scripts/check-main-text.mjs checks privacy and 404 by default, with a comment saying why; Home and Support are held to their Approved copy by check-text.mjs. README.md describes the new default, the seven pages, ComingSoon.astro, and the main navigation in Header.astro.
- 03-07: Base.astro normalizes `Astro.url.pathname` and passes it to Header.astro, which renders `<nav class="site-nav" aria-label="Main">` with Features, Pricing, Privacy (to the overview), and Support. The current link, or the lockup on Home, gets `aria-current="page"`; nothing is current on /privacy.html and /404.html. site.css adds the nav styles (44px targets, inherited 17px text, weight and a 3px underline for the current page). No script.
- 03-08: the footer link to /privacy.html reads "Privacy policy".
- 03-09: src/pages/index.astro rewritten from H1 to H22 and C1.
- 03-10: src/pages/support.astro expanded from S1 to S58 into seven groups, at the same /support.html URL.

Live site after this wave: every page has the main navigation; Home and Support carry the Approved copy; /privacy.html and /404.html main content is unchanged.

Wave 2 check results (2026-10-25): `npm ci`, `npm run build` (7 pages), `npm run check` (0 errors, 0 warnings, 0 hints), `npm run tokens:check` (4 files match 0fa0ec4), `npm run check:external` (no third-party requests), `npm run check:content` (privacy and 404 match 52d8d1a), `npm run check:links` (62 internal links resolve), check-text against all five fixtures, each task's verify command, and static checks S1 to S10: all pass. App repo origin/main is still 60032bf.

Browser check (built-in browser, `astro preview` at localhost:4321, 2026-10-25): all seven pages return 200 and show the four nav links in order; aria-current marks the lockup on Home and the matching link on Features, Pricing, Privacy overview, and Support, and nothing on /privacy.html and /404.html. At 320px wide (the CSS width of a 1280px window at 400% zoom) the header wraps onto three rows (lockup, nav links, theme control) with no horizontal scrolling (scrollWidth 320); each nav link is 44px tall and at least 57px wide at 17px. The theme control still switches (Light set `data-theme="light"` and aria-pressed; reset to System afterward). The only host requested was localhost:4321.

## Brief citations

Every claim placed in wave 1, with its brief section (Brief v4.12), from CONTEXT.md Copy drafts:

- C1, coming-soon line: Current milestone (iPhone only).
- Features: FE2 Current milestone; FE4 Concept; FE5 and FE6 Information architecture (Custom: user-defined labels); FE7 Information architecture (Person, Vehicle, Pet; store each field once); FE8 Information architecture (Contact); FE9 Entity creation and editing; FE10 and FE11 Document capture (Tier A and Tier B), Scan-first creation; FE12 Document capture, Privacy; FE13 Document capture (confirm before saving); FE14 Scan-first creation; FE15 Concept; FE16 Contextual suggestions; FE17 Contextual suggestions (Device only signals, less car connectivity; decision 18); FE18 Contextual suggestions, Privacy; FE19 Contextual suggestions (banner never names a category; no weak guesses; Off), decision 18; FE20 to FE23 App lock; FE24 Secure fields; FE25 to FE28 Backup and restore; FE29 and FE30 Brand (System, Light, Dark).
- Pricing: P2, P4 to P11, and P13 to P18 Business model and entitlement (free download, one-time purchase, no subscription, Free vs paid, paywall perks and price line, localized store price, scope of a purchase, Family Sharing off, import never unlocks, locked records still appear).
- Privacy overview: V2 and V4 Privacy; V6 Privacy, Information architecture (photos); V7 Concept, Privacy; V8 Privacy; V10 Privacy (three kinds of network activity); V12 Privacy, Business model and entitlement (RevenueCat); V14 Privacy (ML Kit diagnostics); V16 Privacy, Contextual suggestions (coordinates discarded); V17 /privacy.html (decision 16); V19 Privacy; V21 Onboarding, /privacy.html (decision 16); V22 Contextual suggestions, Privacy.


Every claim placed in wave 2, with its brief section (Brief v4.12), from CONTEXT.md Copy drafts:

- Home: H1 Brand; H2 Concept, Information architecture, Contextual suggestions; H3 to H5 Concept; H6 Concept, Information architecture; H8 Information architecture; H9 Document capture, Scan-first creation; H10 Contextual suggestions; H11 App lock, Backup and restore; H14 Privacy; H15 Concept; H16 Privacy (v1 network activity); H17 Privacy; H19 and H20 Business model and entitlement; C1 Current milestone.
- Support: S11 Backup and restore, Privacy; S13 Backup and restore, Business model and entitlement (app label "Backup & restore", app/settings.tsx:268); S15 Backup and restore (app label app/backup.tsx:249, decision 19); S17 and S19 Backup and restore; S22, S24, S26, S28, S30, and S32 Business model and entitlement; S35, S37, and S39 App lock; S41 and S44 Document capture, Scan-first creation; S43 Document capture; S46 Privacy; S49 Contextual suggestions, Privacy, decision 18; S51 Contextual suggestions (app labels app/settings.tsx:198-200, :39); S58 Current milestone. S18, S53, and S54 are unchanged existing copy.
- Header, footer, and link text (N1, N2, F1, H12, H18, H21, S55): not claims.

## Commits

- 6e48ee2 phase 03 task 03-01: check:text and check:links scripts
- 72163b4 phase 03 task 03-02: coming-soon component
- 3b98413 phase 03 task 03-03: Features page
- 13c0c28 phase 03 task 03-04: Pricing page
- c2adcb0 phase 03 task 03-05: Privacy overview page
- 04c07c1 phase 03 task 03-06: narrow check:content to unchanged pages
- 46e3acb phase 03 task 03-07: header navigation with the current page
- 09f8374 phase 03 task 03-08: footer policy link name
- a2413d9 phase 03 task 03-09: Home page rewrite
- b10953e phase 03 task 03-10: Support and FAQ expansion

## Deviations

- 03-01 verify command: as written it cannot pass with a correct check-links. Its "passing" fixture page links to `/privacy.html`, but the temporary directory holds no privacy.html, so the link is genuinely broken. EXECUTE ran the same command with one addition, `: > "$D/privacy.html"` before that check-links call, so the root-relative link resolves and is still checked. It also ran a separate fixture with only outbound, mailto, protocol-relative, and fragment links (the case the acceptance criterion describes), which passes with 0 internal links. No script was weakened. Logged in BACKLOG.md.
- 03-03: check:links failed on the Features link to /privacy-overview.html until 03-05 added that page, as the plan expected. It passes from 03-05 on.
- Browser check: `npm run preview` reported an `astro preview` server already running at localhost:4321 for this repo and exited, so the check used that server. It serves dist/, which was rebuilt immediately before.

- Wave 2, branch: four seconds after this session created execute/03-wave-2, something outside the session's commands checked out main again (git reflog, 11:16:40), so the five task commits were first made on local main. Nothing was pushed. EXECUTE pointed execute/03-wave-2 at those commits and reset local main to origin/main before pushing; the commits and their content are unchanged.
- Wave 2: no deviations inside task files. Every verify command ran as written and passed.

## Backlog items added

- 2026-10-25: the 03-01 verify command's passing check-links fixture links to a file it never creates.

## Follow-ups

- VERIFY (2026-10-25): result PASS, PAGE-01 to PAGE-08 all PASS, no Fix wave. Merged as 1c74305 (PR #22) and deployed.
- SHIP (2026-10-25): VERIFY.md result PASS; Jake's browser checklist on https://athandapp.com: PASS, all steps. PAGE-01 to PAGE-08 are Done in REQUIREMENTS.md and phase 03 is Done in ROADMAP.md.
- Next: phase 04 (visuals-and-polish), step DISCUSS.
