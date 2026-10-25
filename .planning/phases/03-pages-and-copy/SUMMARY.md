# Phase 03: pages-and-copy - Summary

Status: Wave 1 executed 2026-10-25. Wave 2 not started.

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

## Brief citations

Every claim placed in wave 1, with its brief section (Brief v4.12), from CONTEXT.md Copy drafts:

- C1, coming-soon line: Current milestone (iPhone only).
- Features: FE2 Current milestone; FE4 Concept; FE5 and FE6 Information architecture (Custom: user-defined labels); FE7 Information architecture (Person, Vehicle, Pet; store each field once); FE8 Information architecture (Contact); FE9 Entity creation and editing; FE10 and FE11 Document capture (Tier A and Tier B), Scan-first creation; FE12 Document capture, Privacy; FE13 Document capture (confirm before saving); FE14 Scan-first creation; FE15 Concept; FE16 Contextual suggestions; FE17 Contextual suggestions (Device only signals, less car connectivity; decision 18); FE18 Contextual suggestions, Privacy; FE19 Contextual suggestions (banner never names a category; no weak guesses; Off), decision 18; FE20 to FE23 App lock; FE24 Secure fields; FE25 to FE28 Backup and restore; FE29 and FE30 Brand (System, Light, Dark).
- Pricing: P2, P4 to P11, and P13 to P18 Business model and entitlement (free download, one-time purchase, no subscription, Free vs paid, paywall perks and price line, localized store price, scope of a purchase, Family Sharing off, import never unlocks, locked records still appear).
- Privacy overview: V2 and V4 Privacy; V6 Privacy, Information architecture (photos); V7 Concept, Privacy; V8 Privacy; V10 Privacy (three kinds of network activity); V12 Privacy, Business model and entitlement (RevenueCat); V14 Privacy (ML Kit diagnostics); V16 Privacy, Contextual suggestions (coordinates discarded); V17 /privacy.html (decision 16); V19 Privacy; V21 Onboarding, /privacy.html (decision 16); V22 Contextual suggestions, Privacy.

## Commits

- 6e48ee2 phase 03 task 03-01: check:text and check:links scripts
- 72163b4 phase 03 task 03-02: coming-soon component
- 3b98413 phase 03 task 03-03: Features page
- 13c0c28 phase 03 task 03-04: Pricing page
- c2adcb0 phase 03 task 03-05: Privacy overview page

## Deviations

- 03-01 verify command: as written it cannot pass with a correct check-links. Its "passing" fixture page links to `/privacy.html`, but the temporary directory holds no privacy.html, so the link is genuinely broken. EXECUTE ran the same command with one addition, `: > "$D/privacy.html"` before that check-links call, so the root-relative link resolves and is still checked. It also ran a separate fixture with only outbound, mailto, protocol-relative, and fragment links (the case the acceptance criterion describes), which passes with 0 internal links. No script was weakened. Logged in BACKLOG.md.
- 03-03: check:links failed on the Features link to /privacy-overview.html until 03-05 added that page, as the plan expected. It passes from 03-05 on.
- Browser check: `npm run preview` reported an `astro preview` server already running at localhost:4321 for this repo and exited, so the check used that server. It serves dist/, which was rebuilt immediately before.

## Backlog items added

- 2026-10-25: the 03-01 verify command's passing check-links fixture links to a file it never creates.

## Follow-ups

- Wave 2 (03-06 to 03-10): header navigation, footer "Privacy policy" link, Home rewrite, Support FAQ, and narrowing check:content to privacy and 404.
