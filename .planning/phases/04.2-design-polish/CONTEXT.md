# Phase 04.2: design-polish - Context

Status: Needs answers
Date: 2026-10-26

## Goal

Triage the findings of two impeccable runs Jake made outside the repo (detect against dist/, then critique of Home and Features), and fix only what is a real issue inside the brand and the accessibility floor. Nothing in the brief's Brand section, HOME-DESIGN.md, or CLAUDE.md's hard rules changes. Jake inserted this phase on 2026-10-26, independent of the 04.1 and 05 gates.

## Requirements in scope

DSG-01.

## What the site does today

Input: handoff/impeccable-detect.txt (untracked; handoff/ is in .gitignore; sha256 cbe18ae5b0ac3ae8dd4832404ff2a0dadb66d4d5813aadc317eab170c7b35670), the output of `npx impeccable detect` that Jake ran against dist/ built from main. impeccable is not installed in this repo and is not a dependency; this session did not run it.

The file reports 24 findings over the seven built pages. They reduce to four distinct issues under two rules:

- F1, cramped-padding, `div.theme-control` (the header's System, Light, and Dark control): 7 findings, one per page. Detector text: "children flush against border+bg on top/bottom (no inset)".
- F2, cramped-padding, `section.band` (the full-bleed privacy band): 2 findings, index.html and privacy-overview.html. Detector text: "children flush against bg on all sides (no inset)".
- F3, cramped-padding, `section.closing` (Home's closing section): 1 finding, index.html. Detector text: "children flush against border-top on top (no inset)".
- F4, overused-font, document body and headings: 14 findings, two per page, "Primary font: inter" and "Primary font: space grotesk".

Every finding, by page (rule, element):

1. 404.html: cramped-padding, div.theme-control (F1)
2. 404.html: overused-font, Inter (F4)
3. 404.html: overused-font, Space Grotesk (F4)
4. features.html: cramped-padding, div.theme-control (F1)
5. features.html: overused-font, Inter (F4)
6. features.html: overused-font, Space Grotesk (F4)
7. index.html: cramped-padding, div.theme-control (F1)
8. index.html: cramped-padding, section.band (F2)
9. index.html: cramped-padding, section.closing (F3)
10. index.html: overused-font, Inter (F4)
11. index.html: overused-font, Space Grotesk (F4)
12. pricing.html: cramped-padding, div.theme-control (F1)
13. pricing.html: overused-font, Inter (F4)
14. pricing.html: overused-font, Space Grotesk (F4)
15. privacy-overview.html: cramped-padding, div.theme-control (F1)
16. privacy-overview.html: cramped-padding, section.band (F2)
17. privacy-overview.html: overused-font, Inter (F4)
18. privacy-overview.html: overused-font, Space Grotesk (F4)
19. privacy.html: cramped-padding, div.theme-control (F1)
20. privacy.html: overused-font, Inter (F4)
21. privacy.html: overused-font, Space Grotesk (F4)
22. support.html: cramped-padding, div.theme-control (F1)
23. support.html: overused-font, Inter (F4)
24. support.html: overused-font, Space Grotesk (F4)

The detector's stated threshold for cramped-padding is at least 8px, ideally 12 to 16px, between rendered text and a visible boundary.

Measurement (this session, main at 84b67ce, `npm ci` and `npm run build`, then Chromium through the project's pinned Playwright at 320, 390, and 1280 CSS px in light and dark): for each flagged container, the smallest distance from any rendered text line or icon inside it to its border box. Visually hidden `.tlabel` spans (1px, clipped) are excluded, as check:layout excludes them.

- Theme control, src/components/ThemeControl.astro:9-13, src/styles/site.css:210-258. The group is 50px tall: 1px border, 2px inner padding (site.css:216), 44px buttons (site.css:226-227, `--touch-min`). Smallest text or icon inset: 15px on every side at 320, 390, and 1280 (icons only below 52.5em; icon and label from 52.5em). Font size 16px. What sits flush is the child button's own box: its hover fill (`--surface-chip`) and pressed fill (`--text-body`) are 2px inside the group border, as HOME-DESIGN.md specifies.
- Privacy band, src/components/PrivacyBand.astro:18-28, src/styles/site.css:618-627. The padding lives on `.band-inner` (the `.container` gutter inline, `--site-section` block), not on `section.band`, so the section's first child box touches its fill. Smallest text inset: 16px left and right at 320 and 390 (the site gutter), 80px at 1280; 45px or more top and bottom at every width.
- Closing, src/pages/index.astro:144-150, src/styles/site.css:684-693. Again the padding is on the child `.closing-inner`. Smallest distance from the 1px top rule to the mark or text: 49px at 320 and 390, 97px at 1280.
- Fonts: body computes to `Inter, ui-sans-serif, system-ui, sans-serif` and headings to `"Space Grotesk", ui-sans-serif, system-ui, sans-serif`, from `--font-ui` and `--font-display` in src/styles/tokens/typography.css:3-4 (copied from the app repo's _ds tokens; tokens:check enforces the match), self-hosted from @fontsource/inter 5.3.0 and @fontsource/space-grotesk 5.3.0 (package.json:23-24).

App repo read at origin/main 60032bf (Brief v4.12).

### Critique input (ANSWERS, 2026-10-26)

Input: handoff/impeccable-critique.md (untracked; sha256 592caaf6e7115ec477753b385e3ef8906a57ceea5304d696dc3983e9d27128e7). Jake ran impeccable critique outside this repo, in a throwaway clone with a project-scoped install and the locked rules in its ignore list, against Home (src/pages/index.astro) and Features (src/pages/features.astro) served by the dev server at localhost:4321, in light and dark at 390 and 1280 and light at 320. The report has a design-review assessment, a detector pass over the rendered pages, five priority issues, persona notes, minor observations, questions, and run notes. impeccable was not installed in or run from this repo; there is no .impeccable/ directory here.

Measurement (this session, main at ec4d78a, `npm ci` and `npm run build`, then dist/ in Chromium through the project's pinned Playwright at 320, 390, and 1280 CSS px in light and dark, scrolled to the end so lazy images load):

- Headings whose last line is one word: "For the moments you need it" at 390 ("it" alone); "The right record at the right time" on Home at 320 and on Features at 320 and 390; "At the doctor’s office" at 320; Features "Records for everything you look after" and "Scan instead of typing" at 320. None at 1280. Only the hero h1 has `text-wrap: balance` (src/styles/site.css:456).
- Paragraphs whose last line is one word: 6 on Home at 320, 4 at 390, and 2 at 1280; 3 on Features at 390 and 1280's "Suggestions use the time of day" paragraph. No `text-wrap: pretty` anywhere in src/styles/.
- Features prose at 1280: the column is 729px wide (`.prose { max-width: 68ch }`, site.css:741, as HOME-DESIGN.md, Other pages specifies), and the longest paragraphs average 86 characters per line.
- Page heights: Home 7,442px at 390 and 6,249px at 1280; Features 4,463px at 390.
- Header nav at 320: two rows, with Support alone on the second; one row at 390 and 1280.
- Image requests: Features requests only the current theme's images at every width (04 alone below the breakpoint; 04 and 02 from it). Home requests both themes of 01-home (the hero, `loading="eager"`, src/components/PhoneFrame.astro:39) and only the current theme's image for every other frame.
- Privacy band contrast, white text (`--text-on-cobalt`) on the fill: light `--accent` #4C39C6 7.75:1; dark `--accent` #6A57E0 5.18:1; dark `--accent-press` #5A47D0 6.47:1 (src/styles/tokens/colors.css:23-25, :71-73).
- Features page top from the breakpoint: two 200px frames overlapping by `--space-12` (site.css:824-833), a 400px panel with padding. At 280px each, the panel would be about 560px, leaving the copy column about 150px at 840px.
- Moment cards (site.css:478-553) have no link, button, hover style, or cursor change.

App repo read at origin/main f4f2450 (Brief v4.13). v4.13 changed Contextual suggestions only (car connectivity removed from the signals; the card-naming rule matched to shipped behavior). The site never claims car connectivity, and FE19's banner sentence remains true. The Brand and Privacy sections, and the _ds tokens, are unchanged since 60032bf.

## Locked by the brief and CLAUDE.md

- Brief, Brand: "Visual system: cobalt accent #4C39C6, paper #F6F5F1, ink #14161C, seven muted entity colors, Space Grotesk (display) + Inter (body), flat, borders first, at most one soft shadow, no gradients."
- CLAUDE.md, Hard rules: "Tokens match the app's _ds tokens exactly." The only allowed difference is fonts.css, replaced by self-hosted faces of the same families.
- CLAUDE.md, Hard rules: 44px minimum targets; 16px minimum for any text; WCAG AA contrast in both themes.
- HOME-DESIGN.md, Header: the theme control is "a segmented group with a 1px `--border-card` border, `--surface-card` fill, radius `--radius-control`, and 2px inner padding", buttons at least `--touch-min`, "the control is 44px tall" (site.css:210-211 records the 50px outer height that follows from the border and padding).
- HOME-DESIGN.md, Privacy band: full-bleed section, "Inner container padding `--site-section`".
- HOME-DESIGN.md, Closing: "1px `--border-card` top rule. Centered flex column, gap `--space-5`, padding `--site-section`."
- VIS-10 and check:layout (scripts/check-layout.mjs:1-7, :127-129): no content element in header, main, or footer sits less than 16px from a viewport edge, at 320, 390, 768, 1280, and 1280 at 400% zoom, in light and dark; "a band's fill may touch the edges while its text may not."

## Triage

- F1, cramped-padding, div.theme-control, all seven pages (findings 1, 4, 7, 12, 15, 19, 22): Not applicable. The detector measures the child buttons' boxes against the group's border, not the text. Rendered text and icons sit 15px from the group's border on every side at every width tested, above the detector's own 12 to 16px ideal. The only thing flush is the pressed or hovered segment's fill, 2px inside the border, which is the segmented-control pattern HOME-DESIGN.md, Header specifies ("2px inner padding"). Widening that gap would be a change to the locked design contract, and it would not move the text, which already clears the threshold.
- F2, cramped-padding, section.band, index.html and privacy-overview.html (findings 8, 16): Already covered. check:layout (VIS-10, scripts/check-layout.mjs:4-7) fails any text inside the band that sits less than 16px from a viewport edge, at five viewports including 320px and 400% zoom, and explicitly lets the band's fill touch the edges while its text may not. It passed at phase 04 VERIFY. Measured insets: 16px or more inline, 45px or more block. The finding is a false positive from the padding living on `.band-inner` rather than on the section.
- F3, cramped-padding, section.closing, index.html (finding 9): Not applicable. The top border is a section divider, not a container edge, and the first content (the mark) sits 49px below it at 320 and 390 and 97px at 1280, the `--site-section` padding HOME-DESIGN.md, Closing specifies. Same false-positive shape as F2: the padding is on `.closing-inner`.
- F4, overused-font, Inter and Space Grotesk, all seven pages (findings 2, 3, 5, 6, 10, 11, 13, 14, 17, 18, 20, 21, 23, 24): Decline. Brief, Brand names "Space Grotesk (display) + Inter (body)", and CLAUDE.md requires the site's tokens to match the app's _ds tokens exactly; `--font-display` and `--font-ui` are those tokens, and tokens:check fails on any change. The site matches the app's typography by design, so a different face would break the one product voice the brief sets.

Result: Fix 0, Decline 14 (one issue, F4), Already covered 2 (F2), Not applicable 8 (F1 and F3). No change to site code is drafted.

## Critique triage

Every finding in handoff/impeccable-critique.md, numbered C1 to C52 in report order. Where the report repeats a finding under another heading, the later entry points to the first. Report line numbers refer to src/pages/index.astro and src/pages/features.astro at ec4d78a.

Detector pass (report, Deterministic scan):

- C1. Straggler "iPhone." in the hero line (index.astro:34), Home 1280 and 390: Fix, FX2.
- C2. Straggler "location." in feature 3's line (index.astro:96), Home 1280: Fix, FX2.
- C3. Straggler "account." in the pricing line (index.astro:135), Home 390: Fix, FX2.
- C4. One unnamed straggler, Features 1280: Fix, FX2. Measured: the "Suggestions use the time of day" paragraph (features.astro:45).
- C5. Stragglers "else." (features.astro:41) and "first." (features.astro:57), Features 390: Fix, FX2.
- C6. Unbalanced heading "For the moments you need it" (index.astro:45), Home 390: Fix, FX1. Measured: "it" alone on line 2.
- C7. Unbalanced heading "The right record at the right time" (features.astro:43), Features 390: Fix, FX1.
- C8. Line length of about 88 to 90 characters on four Features paragraphs at 1280: Decline. HOME-DESIGN.md, Other pages sets the `.prose` column at "max 68ch", and DSG-01 bars HOME-DESIGN.md changes in this phase. Measured 86 characters per line. Listed as override candidate O1.
- C9. Overused font, Inter, on both pages: Decline, as F4. Brief, Brand names "Space Grotesk (display) + Inter (body)"; CLAUDE.md requires exact token parity, enforced by tokens:check. The report itself calls this a false positive.

Priority issues:

- C10. [P1] The privacy band headline "Your information stays on your iPhone" (index.astro:127) overclaims beside the Apple geocoding disclosure; narrow it to "What you add stays on your iPhone", restore a disclosure line, or reword the CTA: Already covered. Brief, Privacy: "Personal information never leaves the device, except inside a backup file the user explicitly exports and shares" and "In-app copy may say 'Your information stays on this device'. It must not say 'nothing leaves your phone'." HM16 was approved with that citation (phase 04 decision 23). Dropping the network disclosures from Home is phase 04 decision 1 (Jake's answer); they stay in full on /privacy-overview.html, which the band's CTA (HM20, approved) names and links.
- C11. [P1] Screenshots unreadable, part 1: rebuild "Hidden until you need it" as live HTML in the Moments card style: Decline. HOME-DESIGN.md, Features specifies row 4 as two figures, 05-masked and 05-revealed with `crop="record"`, captioned Masked and Revealed; VIS-01 makes real screenshots the showcase. The content is also in the row's line (HM13) and the approved alt text A5 and A6.
- C12. [P1] Part 2: replace whole screens with tight crops on the other rows: Decline. HOME-DESIGN.md, Features names each row's shot and crop, and PhoneFrame's crop set is that contract's (Phone frame); 06-lock uses `crop="full"` by phase 04 decision 19 (Jake).
- C13. [P1] Part 3: raise the Features page-top frames to at least 280px, or show one: Decline. HOME-DESIGN.md, Other pages specifies 04-check-what-we-read overlapping 02-person-top beside the copy from 840px, with one breakpoint (Breakpoint and site variables). Measured: at 280px the overlap panel needs about 560px and leaves the copy column about 150px at 840px, so the change needs a new page-top layout, not a value. Listed as override candidate O3.
- C14. [P2] Crop 04-check-what-we-read to its fields: Decline. HOME-DESIGN.md, Features: shot 2 is 04-check-what-we-read (full).
- C15. [P2] The 06-lock shot is about 85% blank; use a tight crop of the lock area: Decline. Phase 04 decision 19 (Jake): 06-lock with `crop="full"`.
- C16. [P2] 01-home is reused for row 3: Not applicable. Row 3 uses the `suggest` crop HOME-DESIGN.md, Features specifies, a different view of the screen (the banner and Suggested for you list) with its own alt text, A4. It is not a repeat of the hero view.
- C17. [P2] Align feature copy to the top of the panel on desktop: Decline. The approved reference build centers it (home-reference-light.html, `.feat{...align-items:center}`), and site.css:571 follows it; phase 04 decision 5 makes the reference the design reference where HOME-DESIGN.md is silent. Not a defect against any rule.
- C18. [P2] Reduce shot-panel vertical padding: Decline. HOME-DESIGN.md, Features: shot panel "padding `--space-10` by `--space-6`".
- C19. [P2] Home is 7,442px tall at 390: Not applicable as a separate finding. Measured as stated; it follows from C14, C15, and C18, each declined above. No rule sets a page height.
- C20. [P2] Features is one visual and then about 22 paragraphs: Decline. HOME-DESIGN.md, Other pages: a page top, then "today's detail text unchanged below it in a `.prose` column".
- C21. [P2] Jump labels differ from the h2s ("App lock" and "Locked to you"): Already covered. Phase 04 FP3 offered the full h2s as link text as the alternative; Jake approved the short labels, which match the Support page's jump list (SU4).
- C22. [P2] Give "Sensitive numbers" its own section on Features: Decline. HOME-DESIGN.md, Other pages: the jump list links "its six h2s" and the detail text stays unchanged. The paragraph is FE24 at features.astro:53, under Locked to you.
- C23. [P2] Features ends on "Light and dark" with no next step; end with the coming-soon line and a privacy-overview link: Decline. HOME-DESIGN.md, Other pages (detail text unchanged). The coming-soon line is already in the page top (features.astro:20), the privacy overview is linked at features.astro:46 and in the header, and the closing action that would make sense, an App Store link, waits for phase 05.
- C24. [P2] Add the contract's optional per-section crop beside each h2: Not applicable. HOME-DESIGN.md, Other pages lists it as "Optional later", a new feature with new alt text, not a defect; DSG-01 covers triage fixes only. Added to BACKLOG.md.
- C25. [P2] Tighten `.prose` to about 60ch: Decline, as C8 (override candidate O1).
- C26. [P2] The dark privacy band is the brightest field and the lowest-contrast block; fill it with `--accent-press` in dark: Decline. HOME-DESIGN.md, Privacy band: "`--accent` fill"; `--accent-press` is the pressed-state token, so reusing it as a fill changes the contract and the token's meaning. Measured 5.18:1 in dark, above AA's 4.5:1, and check:a11y (axe) passes both themes (phase 04 VERIFY); `--accent-press` would give 6.47:1. Listed as override candidate O2.

Design health table (key issues not covered by another entry):

- C27. Heuristic 1: the Features jump list gives no sense of position on a long page: Not applicable. Measured 4,463px at 390. The six-link jump list and the h2s give in-page navigation; no rule requires a progress indicator, and adding one would be new UI on a page whose detail text HOME-DESIGN.md, Other pages keeps unchanged.
- C28. Heuristic 3: Features has no return to the jump list: Decline. HOME-DESIGN.md, Other pages (detail text unchanged); back-to-top links would add strings to every section.
- C29. Heuristic 2: jargon, "VINs" (index.astro:87), "machine-readable lines" (features.astro:39), and "geocoding service" (features.astro:46): Already covered. HM11, FE12, and FE18 are approved, each cited to the brief; "Apple's geocoding service" is the brief's own Privacy wording, adopted in v4.10 so the claim is literally true, as CLAUDE.md requires.
- C30. Heuristic 4: the Home lede is muted and the Features lede is body color: Not applicable. Each follows the contract: HOME-DESIGN.md, Hero sets the hero line in `--text-muted`, and Other pages keeps "the existing lede" on page tops. Both pass AA.
- C31. Heuristic 6: below 840px the theme control is icon-only: Decline. HOME-DESIGN.md, Header: "Below 840px the label is visually hidden but read by screen readers". The pressed state shows by fill, weight 700, and `aria-pressed`, not color alone.

Persona red flags:

- C32. Jordan: the hero and closing offer nothing to do: Decline. CLAUDE.md, Hard rules forbids waitlist forms; the App Store link arrives with phase 05, gated on App Store approval (ROADMAP.md).
- C33. Jordan: the three link CTAs share one style, so none reads as primary: Decline. HOME-DESIGN.md, Link CTAs: one style "used in every section".
- C34. Jordan: at 390 the icon-only theme control outweighs the nav: Decline, as C31 (HOME-DESIGN.md, Header).
- C35. Jordan: "One purchase unlocks everything else" (index.astro:135) never says what everything else is: Already covered. HM22 is approved (brief, Business model and entitlement), and the "See pricing" link beside it leads to the list on /pricing.html.
- C36. Jordan: "VINs" is unexplained: Already covered, as C29.
- C37. Riley: the headline versus the geocoding disclosure: Already covered, as C10.
- C38. Riley: "Scanning runs on your iPhone" beside the Google ML Kit diagnostics disclosure: Already covered. HM18 is approved, citing brief, Document capture and Privacy: recognition runs on the device, and the diagnostics carry no scans, photos, or recognized text. /privacy-overview.html:24 states exactly what Google receives.
- C39. Riley: the Moments cards look tappable but are inert: Not applicable. Measured: no link, button, hover style, or cursor change on `.moment`, and the masked value has no Reveal control. Nothing presents the cards as interactive.
- C40. Riley: "Your own record is free" appears three times on Home: Already covered. HM22 and HM25 are both approved. Measured: the string appears twice in page text (the pricing line and the closing line).
- C41. Riley: Features requests both the light and the dark WebPs of 02 and 04: Not applicable. Not reproduced against dist/ in Chromium in either theme at 320, 390, or 1280: Features requests only the current theme's images. The report ran against the dev server with its overlay injected and theme buttons exercised, either of which loads the other theme. The one frame that loads both themes is Home's hero, by HOME-DESIGN.md, Phone frame ("Hero images are `loading="eager"`").
- C42. Casey: Home is 7,442px tall and the lock row is mostly blank: Not applicable, as C19 and C15.
- C43. Casey: the orphaned "it" at 390: Fix, FX1 (as C6).
- C44. Casey: at 320 the nav wraps Support alone onto a second row: Decline. HOME-DESIGN.md, Header: the nav links "spread with `justify-content: space-between` and wrap at 320px". Every target stays 44px, and check:layout passes at 320.
- C45. Sam: screenshot text cannot be enlarged by zoom, and the Masked and Revealed demo is illegible: Decline, as C11 to C13. Every frame carries approved alt text (A1 to A6, A8, A9), and each row's line states the feature in live text.
- C46. Sam: the dark band is the lowest-contrast block: Decline, as C26 (override candidate O2).
- C47. Sam: the hero alt text runs about 45 words and largely repeats row 3's: Already covered. A1 and A4 are approved and each describes its own view (full screen versus the suggest crop), as HOME-DESIGN.md, Alt text specifies.

Minor observations:

- C48. h2 terminal punctuation is mixed: Already covered. Phase 04 decision 23 (Jake): HM16 and HM21 without periods; HM24 keeps C1 verbatim, with its period.
- C49. HOME-DESIGN.md is out of date (the 06-lock placeholder and the h2 periods): Already covered. Phase 04 decisions 19 and 23 record both changes and supersede the contract on those points.
- C50. The contract does not size the Features page-top frames, and 200px on desktop is smaller than 280px on mobile: Decline, as C13 (override candidate O3).
- C51. The lede color differs between pages: Not applicable, as C30.
- C52. Stragglers on short final words; `text-wrap: pretty` would clear most: Fix, FX2.
- C53. The light-theme "P" badge is the lowest text contrast at 5.06:1: Already covered. It passes AA, and check:a11y (axe, both themes) passes.
- C54. Copy rules hold: Not applicable. A confirmation, not a finding.

Report-level items:

- C55. Design specificity verdict, the "stock skeleton" structure (hero, zigzag rows, band, pricing, closing): Decline. HOME-DESIGN.md, Page order is the approved structure.
- C56. Questions to consider: every feature as a Moments-style card (Decline, as C11 and C12); what a convinced visitor should do (Decline, as C32); whether the headline is worth the risk (Already covered, as C10); a shorter Features page with reference prose moved to Support or the privacy overview (Decline, as C20).
- C57. Run notes (no persisted snapshot, `.impeccable/live/` directories and the overlay left in the clone and the critic's browser, 400% zoom approximated at 320px): Not applicable. They concern the throwaway clone, not this repo, which has no .impeccable/ directory. Real 400% zoom is covered by check:layout's 1280 at 400% viewport (VIS-10).

Result: 57 entries (C1 to C57). Fix 9 (C1 to C7, C43, and C52, as two items, FX1 and FX2); Decline 24; Already covered 12; Not applicable 11; C56's four questions: Decline 3, Already covered 1. Override candidates, each declined under DSG-01 and HOME-DESIGN.md unless Jake promotes it: O1 (prose measure, C8 and C25), O2 (dark band fill, C26 and C46), O3 (Features page-top frame size, C13 and C50).

### Fix items (Draft, for Jake's approval)

- FX1. Balanced headings. Add `text-wrap: balance` to the h2 and h3 headings in main (`.section-title`, `.feature h3`, `.moment h3`, `.band h2`, `.prose h2`, `.prose h3`, `.page-top h1`) in src/styles/site.css, matching the hero h1 (site.css:456). Findings: C6, C7, C43. HOME-DESIGN.md is silent on wrapping except the hero h1, so nothing in the contract changes; no copy, token, size, or spacing changes. Acceptance: at 320, 390, and 1280 in light and dark, no Home or Features heading that wraps ends on a one-word line where a two-line balance is possible; check:layout and check:a11y pass. Browsers without support (Safari before 17.5) keep today's wrapping.
- FX2. Fewer stragglers. Add `text-wrap: pretty` to paragraphs in main (`.lede`, `.section-line`, `.feature-copy p`, `.prose p`, `.prose li`, and the band's facts) in src/styles/site.css. Findings: C1 to C5, C52. Same contract and copy position as FX1. Acceptance: the one-word last lines measured this session on Home and Features drop at 390 and 1280 in Chromium; check-text, check:layout, and check:a11y pass unchanged. Browsers without support keep today's wrapping.

## Implementation decisions

1. impeccable is not installed in this repo, not added to package.json, and not run by any session. Jake runs it outside the repo when he wants a reading, as he did for detect. Reason: CLAUDE.md and README rule 10 forbid dependencies the plan does not name, and the existing checks (check:layout, check:a11y with axe, tokens:check, check:external) already enforce the floor this phase cares about.
2. The detect output stays untracked in handoff/. This file lists every finding and the file's sha256, so the triage is traceable without committing a file that carries local machine paths.
3. DSG-01 is the only requirement. It is met by the detect and critique triage plus the Fix items Jake approves. With approved Fix items, PLAN writes one wave (FX1 and FX2 are both CSS in src/styles/site.css); with none, the phase needs no PLAN or EXECUTE, and VERIFY records the triage as DSG-01's evidence.
4. The phase does not close after detect. Jake ran impeccable critique outside the repo (a throwaway clone, a project-scoped install, the locked rules in its ignore list) on Home and Features; the report is handoff/impeccable-critique.md, untracked, sha256 592caaf6e7115ec477753b385e3ef8906a57ceea5304d696dc3983e9d27128e7. Every finding is triaged in the four detect buckets above (Critique triage), each Fix item is drafted as an implementation decision, and any changed string would be a Copy draft. Source: Jake's answer 1, ANSWERS 2026-10-26.
5. DSG-01 in REQUIREMENTS.md now names the critique report beside the detect run. Its bar on token, typeface, and HOME-DESIGN.md changes is unchanged, which is why O1 to O3 are declined unless Jake promotes them. Source: Jake's answer 1.

## Copy drafts

None. FX1 and FX2 change wrapping only; no visible string is new or changed. Copy: nothing awaits approval.

## Open questions for Jake

1. Approve the Fix list? FX1 (balanced headings) and FX2 (`text-wrap: pretty` on paragraphs) are CSS-only in src/styles/site.css, change no copy, token, size, or spacing, and clear 9 of the critique's entries. Separately, the critique raised three changes the triage declines only because they alter HOME-DESIGN.md, which DSG-01 bars: O1, a narrower Features prose measure (`.prose` from 68ch to about 58ch, bringing the measured 86 characters per line under 80); O2, the dark privacy band filled with `--accent-press` (5.18:1 to 6.47:1); O3, larger Features page-top frames (needs a new page-top layout). Recommended default: approve FX1 and FX2, and promote O1 only. Reason: O1 is one CSS value on a measured readability problem, above the 80-character line WCAG 1.4.8 suggests, and touches nothing else; O2 repurposes the pressed-state token for a fill that already passes AA, and O3 is a layout redesign rather than polish. Promoting any O item amends DSG-01 and HOME-DESIGN.md in the next ANSWERS.

## Out of scope

- Any change to the typefaces, tokens, or HOME-DESIGN.md's specifications, unless Jake promotes O1, O2, or O3.
- Installing or configuring impeccable, or adding its rules to the repo's checks.
- Per-section crops on Features (C24), recorded in BACKLOG.md.
- FEAT-01 (phase 04.1) and the launch flip (phase 05).
