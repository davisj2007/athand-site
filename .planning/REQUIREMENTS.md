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

- PAGE-01: Home page states what atHand is and who it is for, from the brief's Concept and in-scope list. Open
- PAGE-02: Features page covers the v1.0 in-scope features only (brief, Current milestone in-scope list, Document capture, Contextual suggestions, Backup and restore, App lock). Nothing out of scope appears, including AI suggestions, Android, iPad, sync, or subscriptions. Open
- PAGE-03: Pricing page says the app is a free download with a one-time purchase that unlocks full use, what stays free (brief, Business model and entitlement, Free vs paid), that purchases belong to the Apple ID and can be restored, and that a backup never unlocks. It says "one-time purchase" and states no amount. Open
- PAGE-04: Privacy explainer page summarizes the brief's Privacy section in plain language, names every network connection the policy names, and links to /privacy.html as the full policy. It never says "nothing leaves your phone". Open
- PAGE-05: Support and FAQ at /support.html expand the existing answers (backup, restore purchase, lock, scanning, permissions, contact), keeping the URL. Open
- PAGE-06: every string on these pages was drafted in DISCUSS, approved by Jake in ANSWERS, and cites a brief section; the PR lists each claim with its citation. Open
- PAGE-07: header navigation reaches every page, marks the current page with aria-current, and works at 400% zoom. Open
- PAGE-08: the coming-soon state stays on every page that mentions availability. Open

## Visuals and polish (phase 04)

- VIS-01: product images use Design Ref screenshots from the app repo's athand-design-handoff/screenshots as placeholders, each with alt text, and the PLAN names how they get replaced by app phase 06 simulator captures. Open
- VIS-02: a CSS phone frame wraps product images and swaps its light and dark treatment with the active theme. Open
- VIS-03: an Open Graph image (1200 x 630) and Open Graph and Twitter card tags on every page. Open
- VIS-04: favicon and apple-touch-icon generated from the app repo's assets/icon.png. Open
- SEO-01: sitemap.xml lists every page and is referenced from robots.txt. Open
- SEO-02: robots.txt allows crawling. Open
- SEO-03: SoftwareApplication JSON-LD names atHand, operatingSystem iOS, applicationCategory, and no price. Open
- SEO-04: titles, descriptions, and JSON-LD separate atHand from "Athan" (brief, Brand) without religious or devotional imagery or wording beyond the disambiguation. Open
- A11Y-01: axe reports no violations on any page in light and dark. Open
- A11Y-02: VoiceOver in Safari reads every page in a logical order with named landmarks, headings, links, images, and theme control state. Open
- A11Y-03: at 400% zoom every page reflows with no horizontal scrolling and no clipped or overlapping text. Open
- A11Y-04: WCAG AA contrast for all text and controls in both themes; body text 17px; no text below 16px; 44px targets; no color-only meaning. Open
- A11Y-05: with Reduce Motion on, no animation or transition runs beyond an instant change. Open
- A11Y-06: the audit results and Jake's browser result are recorded in VERIFY.md. Open
- FEAT-01: the Features page gains a section on VoiceOver, larger text (Dynamic Type), and light and dark, citing the brief's Accessibility floor and Release requirements. It is drafted only after the app repo records its TestFlight VoiceOver and Dynamic Type passes as done; until then it stays out of the site. Open

## Launch flip (phase 05, gated on App Store approval)

- LCH-01: the official Download on the App Store badge, from Apple's marketing resources and used per Apple's guidelines (size, clear space, no alteration), self-hosted. Open
- LCH-02: every availability mention links to the App Store listing for app id 6817842698. Open
- LCH-03: every page carries `<meta name="apple-itunes-app" content="app-id=6817842698">`. Open
- LCH-04: no coming-soon wording remains anywhere on the site. Open
