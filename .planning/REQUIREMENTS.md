# Requirements: athandapp.com

Source: athand-project-brief.md in the app repo (Brief v4.9 at setup) and CLAUDE.md in this repo. Each requirement belongs to exactly one phase. Status: Open / Done.

Brief sections are cited by name: Concept, Brand, Copy rules, Accessibility floor, Business model and entitlement, Privacy, Release requirements, and Open items.

## Policy correction (phase 01)

- POL-01: /privacy.html describes the app's network activity exactly as the brief's Privacy section does: purchase verification and restore through Apple and RevenueCat, and ML Kit's anonymous diagnostics to Google, with no scans, photos, recognized text, or user-entered information sent. Done
- POL-02: /support.html answers are accurate to the brief and use no "nothing leaves your phone" wording. Done
- POL-03: home page privacy summary is literally true under the brief's Privacy section. Done

## Foundation (phase 02)

- FND-01: Astro builds the site with static output and build.format "file"; the build emits /index.html, /privacy.html, /support.html, and /404.html. Done
- FND-02: a GitHub Actions workflow builds and deploys dist/ to GitHub Pages on push to main and on manual dispatch, using the official Pages actions. Jake's settings change (Pages source: GitHub Actions) is a named step in the PLAN. Done
- FND-03: CNAME lives at public/CNAME with the content athandapp.com, and the root CNAME is removed. Done
- FND-04: colors.css, effects.css, spacing.css, and typography.css are byte-for-byte copies of the app repo's _ds tokens apart from a leading header comment that names the app repo and the source commit hash. Done
- FND-05: `npm run tokens:check` removes each header, diffs the file against the app repo's _ds tokens (app repo path from ATHAND_APP_DIR, default ../athandapp), prints any difference, exits non-zero on a difference or a missing app repo, and reports fonts.css as the documented exception. Done
- FND-06: Space Grotesk and Inter are self-hosted from npm packages and bundled into dist/; only the weights named in tokens/typography.css and fonts.css ship; no request goes to fonts.googleapis.com or fonts.gstatic.com. Done
- FND-07: a theme control offers System, Light, and Dark, adapted from the design system's theme-toggle.js: the choice applies before first paint, persists in localStorage, follows the OS while on System, exposes its state to assistive tech (aria-pressed or an equivalent), has 44px targets, and the site still renders in the OS theme with JavaScript off. Done
- FND-08: one base layout sets lang="en", a skip link, landmarks, meta color-scheme, viewport, and per-page title and description. Done
- FND-09: the header shows the logo lockup (the design system's logo-lockup-mark.svg "@" mark with "Hand") linking home, with the accessible name "atHand, home". Done
- FND-10: the footer shows "Made by Jacob Davis" linking to https://jacobdavis.co, plus links to Privacy, Support, and support@athandapp.com. Done
- FND-11: a 404 page in the base layout links home and to Support. Done
- FND-12: the main content of index, privacy, support, and 404 is unchanged by the port: the visible text of each page's main element matches the pre-port HTML on main. Done
- FND-13: `npm run check:external` scans dist/ and fails on any src, srcset, link href, CSS url(), @import, or script that loads from a host other than athandapp.com. Outbound <a href> links are allowed. Done
- FND-14: README.md describes the build, the deploy, the token check, and the external request check. Done

## Pages and copy (phase 03)

- PAGE-01: Home page states what atHand is and who it is for, from the brief's Concept and in-scope list. Done
- PAGE-02: Features page covers the v1.0 in-scope features only (brief, Current milestone in-scope list, Document capture, Contextual suggestions, Backup and restore, App lock). Nothing out of scope appears, including AI suggestions, Android, iPad, sync, or subscriptions. Done
- PAGE-03: Pricing page says the app is a free download with a one-time purchase that unlocks full use, what stays free (brief, Business model and entitlement, Free vs paid), that purchases belong to the Apple ID and can be restored, and that a backup never unlocks. It says "one-time purchase" and states no amount. Done
- PAGE-04: Privacy explainer page summarizes the brief's Privacy section in plain language, names every network connection the policy names, and links to /privacy.html as the full policy. It never says "nothing leaves your phone". Done
- PAGE-05: Support and FAQ at /support.html expand the existing answers (backup, restore purchase, lock, scanning, permissions, contact), keeping the URL. Done
- PAGE-06: every string on these pages was drafted in DISCUSS, approved by Jake in ANSWERS, and cites a brief section; the PR lists each claim with its citation. Done
- PAGE-07: header navigation reaches every page, marks the current page with aria-current, and works at 400% zoom. Done
- PAGE-08: the coming-soon state stays on every page that mentions availability. Done

## Visuals and polish (phase 04)

Design contract: .planning/phases/04-visuals-and-polish/design/HOME-DESIGN.md. Where a requirement says "as HOME-DESIGN.md specifies", that file's section is the acceptance detail.

- VIS-01: product images are the App Store screenshots in src/assets/shots/ (1320 by 2868, light and dark pairs, fictional sample data), emitted through astro:assets as WebP at 360w and 720w with explicit width and height, eager on the hero and lazy elsewhere, each with Approved alt text. The lock screen uses the 1320 by 2868 06-lock pair (9:41 status bar) added in ANSWERS; the live site never shows a placeholder (phase 04 CONTEXT.md, decision 19). Done
- VIS-02: PhoneFrame.astro wraps every screenshot with the props, crops, sizes, and theme pairs HOME-DESIGN.md specifies; the visible image follows both the explicit theme choice and the OS setting while on System, and the hidden image is out of the accessibility tree. Done
- VIS-03: an Open Graph image (1200 by 630) and Open Graph and Twitter card tags on every page. Done
- VIS-04: favicon and apple-touch-icon generated from the app repo's assets/icon.png. Done
- VIS-05: site.css defines the site variables, the single `@media (min-width: 52.5em)` breakpoint, the shared container, the type scale, and the motion rules HOME-DESIGN.md specifies, using token variables only; the 56px hero and 96px section gap are calc() values, and no token is added. Done
- VIS-06: the header and footer follow HOME-DESIGN.md on every page: two header rows below the breakpoint and one from it, no menu button or hidden navigation, and a segmented System, Light, and Dark control with icons, labels read by screen readers at every width, aria-pressed state, and 44px targets, still hidden until JavaScript runs. Done
- VIS-07: Home follows HOME-DESIGN.md's page order and sections: hero, moments, five feature rows in the stated order, the full-bleed privacy band, pricing, and closing, with Approved copy only. The network disclosures are not on Home and remain in full on /privacy-overview.html. Done
- VIS-08: Features, Pricing, Privacy overview, and Support get the page tops HOME-DESIGN.md's Other pages section specifies (Features and Support jump lists, the Pricing fact row, the privacy band, the Support contact card), with their existing text below in a prose column. /privacy.html and /404.html keep their main text unchanged. Done
- VIS-09: no price or currency appears in the built HTML or in any image file the site serves; the paywall image is served pre-cropped above its price card. Done
- VIS-10: the reference builds' known defects are absent: below the breakpoint every section after the hero keeps the side gutter, and at 320px no feature row or shot panel overflows. A layout check at 320, 390, and 768 CSS px and at 400% zoom of a 1280px window, in light and dark, fails on any horizontal scroll, any element past the viewport, or any main section starting less than 16px from a viewport edge. Done
- VIS-11: every new string in this phase was drafted in DISCUSS, approved by Jake in ANSWERS, and cites a brief section; each PR that places copy lists every claim with its citation. Done
- SEO-01: sitemap.xml lists every page and is referenced from robots.txt. Done
- SEO-02: robots.txt allows crawling. Done
- SEO-03: SoftwareApplication JSON-LD names atHand, operatingSystem iOS, applicationCategory, and no price. Done
- SEO-04: titles, descriptions, and JSON-LD separate atHand from "Athan" (brief, Brand) without religious or devotional imagery or wording beyond the disambiguation. Done
- A11Y-01: axe reports no violations on any page in light and dark. Done
- A11Y-02: VoiceOver in Safari reads every page in a logical order with named landmarks, headings, links, images, and theme control state; each screenshot's alt text is read once per frame. Done
- A11Y-03: at 400% zoom every page reflows with no horizontal scrolling and no clipped or overlapping text. Done
- A11Y-04: WCAG AA contrast for all text and controls in both themes, including the privacy band; body text 17px; no text below 16px; 44px targets; no color-only meaning. Done
- A11Y-05: with Reduce Motion on, no animation or transition runs beyond an instant change. Done
- A11Y-06: the audit results and Jake's browser result are recorded in VERIFY.md. Done

## Features accessibility section (phase 04.1, gated on the app repo's TestFlight passes)

Moved from phase 04 at SHIP (2026-10-26) under phase 04 CONTEXT.md decision 21.

- FEAT-01: the Features page gains a section on VoiceOver, larger text (Dynamic Type), and light and dark, citing the brief's Accessibility floor and Release requirements. It is drafted only after the app repo records its TestFlight VoiceOver and Dynamic Type passes as done; until then it stays out of the site. Open

## Design polish (phase 04.2)

Inserted by Jake on 2026-10-26.

- DSG-01: every finding of Jake's `npx impeccable detect` run against dist/ built from main, and of his impeccable critique of Home and Features (handoff/impeccable-critique.md), is triaged in phase 04.2 CONTEXT.md as Fix, Decline (naming the locked rule), Already covered (citing the check or decision), or Not applicable (saying why); each Fix item ships with every phase 04 check passing; no token or typeface changes; HOME-DESIGN.md changes only as Jake promoted at phase 04.2 ANSWERS (decisions 7 to 12: prose measure, dark privacy band fill, Home privacy h2, the row 4 live pair, the `fields` and `lock` crops, and the one-frame Features page top); impeccable is not added to the repo. Done

## Launch flip (phase 05, gated on App Store approval)

- LCH-01: the official Download on the App Store badge, from Apple's marketing resources and used per Apple's guidelines (size, clear space, no alteration), self-hosted. Open
- LCH-02: every availability mention links to the App Store listing for app id 6817842698. Open
- LCH-03: every page carries `<meta name="apple-itunes-app" content="app-id=6817842698">`. Open
- LCH-04: no coming-soon wording remains anywhere on the site. Open
