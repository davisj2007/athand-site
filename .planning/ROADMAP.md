# Roadmap: athandapp.com

Status values: Not started / In progress / Done / Blocked.

Every phase traces to athand-project-brief.md in the app repo and follows the hard rules in CLAUDE.md.

## 01 policy-correction: Done

Requirements: POL-01..03.
Delivered by davisj2007/athand-site#2 (branch fix/privacy-accuracy), merged to main.
Exit: the privacy policy, support page, and home copy match the brief's Privacy section, including RevenueCat purchase verification and ML Kit's anonymous diagnostics.

## 02 foundation: Done

Requirements: FND-01..14.
Delivered by davisj2007/athand-site#5 through #15 (DISCUSS, ANSWERS, PLAN, two REVISEs, EXECUTE waves 1, 2, 2b, and 3, VERIFY, and FIX), all merged to main, plus this SHIP PR. Jake's browser checklist passed on 2026-10-24.

- Astro with static output. build.format is set to "file" so /privacy.html and /support.html keep their exact URLs, and the 404 page builds to /404.html.
- A GitHub Actions workflow builds the site and deploys it to GitHub Pages on every push to main. Jake switches the Pages source to GitHub Actions in the repo settings; the PLAN names exactly when, so the live site never goes blank between the merge and the switch.
- CNAME moves to public/CNAME, unchanged (athandapp.com).
- Tokens: colors.css, effects.css, spacing.css, and typography.css copied verbatim from the app repo's athand-design-handoff/_ds/athand-design-system-*/tokens/, each with a header comment naming the app repo commit it came from. fonts.css is not copied: it imports Google Fonts from a CDN, which CLAUDE.md forbids, so the self-hosted faces below replace it and the token check reports it as a documented exception.
- An npm script, tokens:check, diffs each copied token file (header removed) against the app repo and fails on any difference.
- Space Grotesk and Inter self-hosted from npm packages, limited to the weights the tokens use.
- A System, Light, or Dark theme control adapted from the design system's theme-toggle.js, applied before first paint.
- A base layout, a header with the logo lockup SVG, a footer with "Made by Jacob Davis" linking to https://jacobdavis.co, and a 404 page.
- index.html, privacy.html, support.html, and 404.html ported with their content unchanged. The root styles.css and the old root HTML files are removed once their content lives in Astro.
- check:external fails the build check if dist/ requests anything from a host other than athandapp.com.

Exit: the live site is built and deployed by GitHub Actions, looks and reads the same as before apart from the new header, footer, fonts, tokens, and theme control, and every existing URL still loads.

## 03 pages-and-copy: Done

Requirements: PAGE-01..08.
Delivered by davisj2007/athand-site#17 through #22 (DISCUSS, ANSWERS, PLAN, EXECUTE waves 1 and 2, and VERIFY), all merged to main, plus this SHIP PR. Jake's browser checklist passed on 2026-10-25.

- Home, Features, Pricing, a Privacy explainer, and an expanded Support and FAQ (still at /support.html).
- All copy is drafted in DISCUSS, approved by Jake in ANSWERS, and traceable to a cited section of athand-project-brief.md.
- Pricing says "one-time purchase" and states no amount.
- The coming-soon state stays until phase 05.

Exit: every new page is live with Approved copy only, each claim cited in the PR, and the full privacy policy still at /privacy.html.

## 04 visuals-and-polish: Done

Requirements: VIS-01..11, SEO-01..04, A11Y-01..06. FEAT-01 moved to phase 04.1 at SHIP (decision 21).
Delivered by davisj2007/athand-site#24 through #34 (DISCUSS, ANSWERS, PLAN, two REVISEs, EXECUTE waves 1 to 4 and the wave 4 finish, and VERIFY), all merged to main, plus this SHIP PR. Jake's browser checklist passed on 2026-10-26.
Design contract: .planning/phases/04-visuals-and-polish/design/HOME-DESIGN.md (approved direction from Jake, 2026-10-25), with two reference builds beside it. Jake folded the redesign into this phase (2026-10-25).

- The site becomes a visual showcase of the app, built to HOME-DESIGN.md: one 52.5em breakpoint, site variables in site.css (the 56px hero and 96px section gap as calc() values, no new tokens), a shared container and gutter.
- A new header (two rows, then one) with a segmented System, Light, and Dark control, and a new footer.
- App Store screenshots from src/assets/shots/ (1320 by 2868, light and dark, fictional sample data) in a PhoneFrame component that crops with CSS and swaps light and dark with the theme. The lock screen uses the 1320 by 2868 06-lock pair; no placeholder ships. No served image contains a price.
- Home rebuilt in HOME-DESIGN.md order: hero, moments, five feature rows, a full-bleed privacy band, pricing, and closing. The network disclosures leave Home and stay in full on /privacy-overview.html.
- Every other page gets a page top built from Home parts, with today's text below in a prose column: Features and Support gain jump lists, Pricing a fact row, Privacy overview the privacy band, and Support a contact card. /privacy.html and 404 stay text only.
- Carried over: an Open Graph image, a favicon, and an apple-touch-icon made from the app icon; a sitemap, robots.txt, SoftwareApplication JSON-LD, and metadata that separates atHand from "Athan".
- An accessibility audit: axe, VoiceOver in Safari, 320px and 400% zoom with no horizontal scroll and the side gutter kept, both themes, and reduced motion.

Exit: every page matches HOME-DESIGN.md with Approved copy only, the audit passes with no open issues, and Jake signs off the browser checklist.

## 04.1 features-accessibility: Blocked (gated on the app repo's TestFlight passes)

Requirements: FEAT-01.
Inserted at phase 04 SHIP (2026-10-26) under decision 21 of phase 04 CONTEXT.md: the app repo had not recorded its TestFlight VoiceOver and Dynamic Type passes (davisj2007/athandapp phase 07 VERIFY not yet run; origin/main 60032bf).

- A section on the Features page about VoiceOver, larger text (Dynamic Type), and light and dark, citing the brief's Accessibility floor and Release requirements.
- Its copy is drafted in DISCUSS and approved by Jake in ANSWERS, like every other string.

Gate: do not start DISCUSS until the app repo records its TestFlight VoiceOver and Dynamic Type passes as done.

Exit: the Features page carries the accessibility section with Approved copy only, each claim cited in the PR, and every phase 04 check still passes.

## 04.2 design-polish: In progress

Requirements: DSG-01.
Inserted by Jake on 2026-10-26, independent of the 04.1 and 05 gates.

- Triage every finding of `npx impeccable detect` (run by Jake outside the repo against dist/ built from main) and of his impeccable critique of Home and Features as Fix, Decline, Already covered, or Not applicable, naming the rule, page, and element.
- Fix only real issues that fit the brief's Brand section, HOME-DESIGN.md (as amended by Jake's promotions at ANSWERS, phase 04.2 decisions 7 to 12), and CLAUDE.md's hard rules. Any new or changed visible string is drafted in DISCUSS and approved in ANSWERS.
- impeccable is never installed in this repo or added as a dependency.

Exit: every finding is triaged in the phase CONTEXT.md, each Fix item is live with every phase 04 check still passing, and no locked rule changed.

## 05 launch-flip: Blocked (gated on App Store approval)

Requirements: LCH-01..04.

- The official App Store badge, used per Apple's marketing guidelines.
- The App Store link.
- The apple-itunes-app meta tag with app-id=6817842698.
- Removal of the coming-soon state.

Gate: do not start DISCUSS until the prompt states that Apple approved atHand and the listing is live.

Exit: every page that mentions availability points to the live listing, and no coming-soon wording remains.

## Order

01, 02, 03, and 04 done. 04.2 runs now; it has no gate. 04.1 once the app repo records its TestFlight VoiceOver and Dynamic Type passes. 05 once Apple approves the app. The two gates are independent; whichever opens first runs first.
