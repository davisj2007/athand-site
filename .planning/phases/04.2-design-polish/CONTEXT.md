# Phase 04.2: design-polish - Context

Status: Ready
Date: 2026-10-26

## Goal

Triage the findings of two impeccable runs Jake made outside the repo (detect against dist/, then critique of Home and Features), and fix only what is a real issue inside the brand and the accessibility floor. Nothing in the brief's Brand section, the tokens, or CLAUDE.md's hard rules changes. HOME-DESIGN.md changes only where Jake promoted a finding at ANSWERS (decisions 6 to 12). Jake inserted this phase on 2026-10-26, independent of the 04.1 and 05 gates.

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
- C8. Line length of about 88 to 90 characters on four Features paragraphs at 1280: Decline at DISCUSS (HOME-DESIGN.md, Other pages, "max 68ch"; measured 86 characters per line), listed as override candidate O1. Promoted by Jake (decision 7): Fix, FX3.
- C9. Overused font, Inter, on both pages: Decline, as F4. Brief, Brand names "Space Grotesk (display) + Inter (body)"; CLAUDE.md requires exact token parity, enforced by tokens:check. The report itself calls this a false positive.

Priority issues:

- C10. [P1] The privacy band headline "Your information stays on your iPhone" (index.astro:127) overclaims beside the Apple geocoding disclosure; narrow it to "What you add stays on your iPhone", restore a disclosure line, or reword the CTA: Already covered. Brief, Privacy: "Personal information never leaves the device, except inside a backup file the user explicitly exports and shares" and "In-app copy may say 'Your information stays on this device'. It must not say 'nothing leaves your phone'." HM16 was approved with that citation (phase 04 decision 23). Dropping the network disclosures from Home is phase 04 decision 1 (Jake's answer); they stay in full on /privacy-overview.html, which the band's CTA (HM20, approved) names and links. Promoted by Jake (decision 9): Fix, FX5, the h2 narrowed to "What you add stays on your iPhone"; band facts and CTA unchanged.
- C11. [P1] Screenshots unreadable, part 1: rebuild "Hidden until you need it" as live HTML in the Moments card style: Decline. HOME-DESIGN.md, Features specifies row 4 as two figures, 05-masked and 05-revealed with `crop="record"`, captioned Masked and Revealed; VIS-01 makes real screenshots the showcase. The content is also in the row's line (HM13) and the approved alt text A5 and A6. Promoted by Jake (decision 10): Fix, FX6.
- C12. [P1] Part 2: replace whole screens with tight crops on the other rows: Decline. HOME-DESIGN.md, Features names each row's shot and crop, and PhoneFrame's crop set is that contract's (Phone frame); 06-lock uses `crop="full"` by phase 04 decision 19 (Jake). Promoted in part by Jake (decision 11): Fix, FX7, for rows 2 and 5 only (the "fields" and "lock" crops); rows 1 and 3 keep their crops.
- C13. [P1] Part 3: raise the Features page-top frames to at least 280px, or show one: Decline. HOME-DESIGN.md, Other pages specifies 04-check-what-we-read overlapping 02-person-top beside the copy from 840px, with one breakpoint (Breakpoint and site variables). Measured: at 280px the overlap panel needs about 560px and leaves the copy column about 150px at 840px, so the change needs a new page-top layout, not a value. Listed as override candidate O3. Promoted by Jake as an alternative (decision 12): Fix, FX8, one frame at `--site-phone`, so no new page-top layout.
- C14. [P2] Crop 04-check-what-we-read to its fields: Decline at DISCUSS (HOME-DESIGN.md, Features: shot 2 full). Promoted by Jake (decision 11): Fix, FX7, the "fields" crop.
- C15. [P2] The 06-lock shot is about 85% blank; use a tight crop of the lock area: Decline at DISCUSS (phase 04 decision 19). Promoted by Jake (decision 11): Fix, FX7, the "lock" crop.
- C16. [P2] 01-home is reused for row 3: Not applicable. Row 3 uses the `suggest` crop HOME-DESIGN.md, Features specifies, a different view of the screen (the banner and Suggested for you list) with its own alt text, A4. It is not a repeat of the hero view.
- C17. [P2] Align feature copy to the top of the panel on desktop: Decline. The approved reference build centers it (home-reference-light.html, `.feat{...align-items:center}`), and site.css:571 follows it; phase 04 decision 5 makes the reference the design reference where HOME-DESIGN.md is silent. Not a defect against any rule.
- C18. [P2] Reduce shot-panel vertical padding: Decline. HOME-DESIGN.md, Features: shot panel "padding `--space-10` by `--space-6`".
- C19. [P2] Home is 7,442px tall at 390: Not applicable as a separate finding. Measured as stated; it follows from C14, C15, and C18, each declined above. No rule sets a page height.
- C20. [P2] Features is one visual and then about 22 paragraphs: Decline. HOME-DESIGN.md, Other pages: a page top, then "today's detail text unchanged below it in a `.prose` column".
- C21. [P2] Jump labels differ from the h2s ("App lock" and "Locked to you"): Already covered. Phase 04 FP3 offered the full h2s as link text as the alternative; Jake approved the short labels, which match the Support page's jump list (SU4).
- C22. [P2] Give "Sensitive numbers" its own section on Features: Decline. HOME-DESIGN.md, Other pages: the jump list links "its six h2s" and the detail text stays unchanged. The paragraph is FE24 at features.astro:53, under Locked to you.
- C23. [P2] Features ends on "Light and dark" with no next step; end with the coming-soon line and a privacy-overview link: Decline. HOME-DESIGN.md, Other pages (detail text unchanged). The coming-soon line is already in the page top (features.astro:20), the privacy overview is linked at features.astro:46 and in the header, and the closing action that would make sense, an App Store link, waits for phase 05.
- C24. [P2] Add the contract's optional per-section crop beside each h2: Not applicable. HOME-DESIGN.md, Other pages lists it as "Optional later", a new feature with new alt text, not a defect; DSG-01 covers triage fixes only. Added to BACKLOG.md.
- C25. [P2] Tighten `.prose` to about 60ch: as C8, promoted (decision 7): Fix, FX3.
- C26. [P2] The dark privacy band is the brightest field and the lowest-contrast block; fill it with `--accent-press` in dark: Decline at DISCUSS (HOME-DESIGN.md, Privacy band, "`--accent` fill"; measured 5.18:1 in dark, above AA; `--accent-press` gives 6.47:1), listed as override candidate O2. Promoted by Jake (decision 8): Fix, FX4, dark only, no new token.

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
- C37. Riley: the headline versus the geocoding disclosure: as C10, promoted (decision 9): Fix, FX5.
- C38. Riley: "Scanning runs on your iPhone" beside the Google ML Kit diagnostics disclosure: Already covered. HM18 is approved, citing brief, Document capture and Privacy: recognition runs on the device, and the diagnostics carry no scans, photos, or recognized text. /privacy-overview.html:24 states exactly what Google receives.
- C39. Riley: the Moments cards look tappable but are inert: Not applicable. Measured: no link, button, hover style, or cursor change on `.moment`, and the masked value has no Reveal control. Nothing presents the cards as interactive.
- C40. Riley: "Your own record is free" appears three times on Home: Already covered. HM22 and HM25 are both approved. Measured: the string appears twice in page text (the pricing line and the closing line).
- C41. Riley: Features requests both the light and the dark WebPs of 02 and 04: Not applicable. Not reproduced against dist/ in Chromium in either theme at 320, 390, or 1280: Features requests only the current theme's images. The report ran against the dev server with its overlay injected and theme buttons exercised, either of which loads the other theme. The one frame that loads both themes is Home's hero, by HOME-DESIGN.md, Phone frame ("Hero images are `loading="eager"`").
- C42. Casey: Home is 7,442px tall and the lock row is mostly blank: Not applicable for the page height (C19); the lock row is addressed by C15's promotion (FX7).
- C43. Casey: the orphaned "it" at 390: Fix, FX1 (as C6).
- C44. Casey: at 320 the nav wraps Support alone onto a second row: Decline. HOME-DESIGN.md, Header: the nav links "spread with `justify-content: space-between` and wrap at 320px". Every target stays 44px, and check:layout passes at 320.
- C45. Sam: screenshot text cannot be enlarged by zoom, and the Masked and Revealed demo is illegible: Decline at DISCUSS, as C11 to C13; now addressed in part by their promotions (FX6 to FX8). Every frame carries approved alt text (A1 to A6, A8, A9), and each row's line states the feature in live text.
- C46. Sam: the dark band is the lowest-contrast block: as C26, promoted (decision 8): Fix, FX4.
- C47. Sam: the hero alt text runs about 45 words and largely repeats row 3's: Already covered. A1 and A4 are approved and each describes its own view (full screen versus the suggest crop), as HOME-DESIGN.md, Alt text specifies.

Minor observations:

- C48. h2 terminal punctuation is mixed: Already covered. Phase 04 decision 23 (Jake): HM16 and HM21 without periods; HM24 keeps C1 verbatim, with its period.
- C49. HOME-DESIGN.md is out of date (the 06-lock placeholder and the h2 periods): Already covered. Phase 04 decisions 19 and 23 record both changes and supersede the contract on those points.
- C50. The contract does not size the Features page-top frames, and 200px on desktop is smaller than 280px on mobile: as C13, promoted as the one-frame alternative (decision 12): Fix, FX8.
- C51. The lede color differs between pages: Not applicable, as C30.
- C52. Stragglers on short final words; `text-wrap: pretty` would clear most: Fix, FX2.
- C53. The light-theme "P" badge is the lowest text contrast at 5.06:1: Already covered. It passes AA, and check:a11y (axe, both themes) passes.
- C54. Copy rules hold: Not applicable. A confirmation, not a finding.

Report-level items:

- C55. Design specificity verdict, the "stock skeleton" structure (hero, zigzag rows, band, pricing, closing): Decline. HOME-DESIGN.md, Page order is the approved structure.
- C56. Questions to consider: every feature as a Moments-style card (Decline, as C11 and C12); what a convinced visitor should do (Decline, as C32); whether the headline is worth the risk (Already covered, as C10); a shorter Features page with reference prose moved to Support or the privacy overview (Decline, as C20).
- C57. Run notes (no persisted snapshot, `.impeccable/live/` directories and the overlay left in the clone and the critic's browser, 400% zoom approximated at 320px): Not applicable. They concern the throwaway clone, not this repo, which has no .impeccable/ directory. Real 400% zoom is covered by check:layout's 1280 at 400% viewport (VIS-10).

Result: 57 entries (C1 to C57). Fix 9 (C1 to C7, C43, and C52, as two items, FX1 and FX2); Decline 24; Already covered 12; Not applicable 11; C56's four questions: Decline 3, Already covered 1. Override candidates, each declined under DSG-01 and HOME-DESIGN.md unless Jake promotes it: O1 (prose measure, C8 and C25), O2 (dark band fill, C26 and C46), O3 (Features page-top frame size, C13 and C50).

After ANSWERS (2026-10-26, decisions 6 to 12): Jake promoted O1, O2, the one-frame alternative to O3, C10 (with C37), C11, and C12 in part with C14 and C15 (C42's lock row follows). Fix items are now FX1 to FX8. Every other Decline, Already covered, and Not applicable entry stands as triaged (decision 13).

### Fix items

FX1 and FX2: Approved (decision 6). FX3 to FX8: promoted by Jake (decisions 7 to 12).

- FX1. Balanced headings. Add `text-wrap: balance` to the h2 and h3 headings in main (`.section-title`, `.feature h3`, `.moment h3`, `.band h2`, `.prose h2`, `.prose h3`, `.page-top h1`) in src/styles/site.css, matching the hero h1 (site.css:456). Findings: C6, C7, C43. HOME-DESIGN.md is silent on wrapping except the hero h1, so nothing in the contract changes; no copy, token, size, or spacing changes. Acceptance: at 320, 390, and 1280 in light and dark, no Home or Features heading that wraps ends on a one-word line where a two-line balance is possible; check:layout and check:a11y pass. Browsers without support (Safari before 17.5) keep today's wrapping.
- FX2. Fewer stragglers. Add `text-wrap: pretty` to paragraphs in main (`.lede`, `.section-line`, `.feature-copy p`, `.prose p`, `.prose li`, and the band's facts) in src/styles/site.css. Findings: C1 to C5, C52. Same contract and copy position as FX1. Acceptance: the one-word last lines measured this session on Home and Features drop at 390 and 1280 in Chromium; check-text, check:layout, and check:a11y pass unchanged. Browsers without support keep today's wrapping.
- FX3. Prose measure (O1; C8, C25). `.prose { max-width: 56ch }` in src/styles/site.css (58ch until REVISE, decision 7) (today 68ch, site.css:741). Acceptance: at 1280 in light and dark, no Features, Pricing, Privacy overview, Support, privacy policy, or 404 paragraph in `.prose` averages 80 or more characters per line; check:layout and check:a11y pass.
- FX4. Dark privacy band fill (O2; C26, C46). In dark theme only, `section.band` fills with `--accent-press` (#5A47D0; white `--text-on-cobalt` at 6.47:1), under both `:root[data-theme="dark"]` and `@media (prefers-color-scheme: dark)` with `:root:not([data-theme="light"])`, as colors.css does. Light keeps `--accent` (7.75:1). No new token and no token file changes; tokens:check passes. Applies wherever the band renders (Home and the Privacy overview page top). Acceptance: computed background is #5A47D0 in dark (explicit and System with the OS dark) and #4C39C6 in light; check:a11y passes both themes.
- FX5. Home privacy band h2 (C10, C37). src/pages/index.astro:127 reads HM16 as revised: "What you add stays on your iPhone". Facts and CTA unchanged. The privacy overview page top (its h1) is not changed by this item. Acceptance: check-text passes against the phase 04 index.txt fixture with the HM16 line updated by the plan.
- FX6. Row 4 live pair (C11). Home feature row 4 ("Hidden until you need it") replaces the 05-masked and 05-revealed PhoneFrames with two live HTML cards in the moments-card style inside the shot panel, captioned "Masked" and "Revealed" as today (each card plus its caption in a `figure`, the existing `flex: 1 1 140px`, max 240px pair layout). Each card: the record row (a `--badge-size` badge in `--entity-home` with "H", aria-hidden, as the moments badge pattern; white initial in light 5.12:1, `--text-on-ink` in dark 7.12:1), record name "Maple Street house" at `--text-base` 700, subtitle "Alarm code" at 16px `--text-muted`; then the value row. Masked: the value as aria-hidden dots plus visually hidden text "Alarm code, hidden until you tap Reveal", and a visual "Reveal" label. Revealed: the value "0000" and a visual "Hide" label. Value at `--text-lg` 500, `--tracking-label`, tabular figures, as `.record-value`. Reveal and Hide are static text in `--text-link` (7.75:1 light, 7.12:1 dark on `--surface-card`), not buttons or links, with no hover style or cursor change, and aria-hidden (decision 10). A5 and A6 are removed from Home; the 05 PNGs stay in src/assets/shots/ and, being unused, must be excluded from PhoneFrame's glob as 03-person-documents is, so they do not ship as full PNGs. Acceptance: no `img` in row 4; the screen reader reads the captions, the record name, the label, and the hidden text or "0000"; check-text, check:layout, and check:a11y pass; dist/ contains no 05-masked or 05-revealed file.
- FX7. Two PhoneFrame crops (C12, C14, C15). Add `fields` and `lock` to PhoneFrame's `crop` prop and site.css, measured this session on all four PNGs (light and dark rows match exactly; 1320 by 2868; status bar ends at row 171):
  - `fields`, 04-check-what-we-read: content runs from Cancel (row 233) to the bottom of the What we read card (row 1535); the Save button sits at rows 2567 to 2729 after about 1,030 blank rows. The crop keeps Save out, because including it keeps about 72% of the full height with the blank area inside. Rows 172 to 1595 (61px below the card, matching the 61px above Cancel): `aspect-ratio: 1320 / 1424`, `object-position: 50% 11.911%` (172 / (2868 - 1424)).
  - `lock`, 06-lock: content runs from the logo top (row 1384) to the Unlock button bottom (row 2579), with "atHand is locked." at rows 2288 to 2327. Rows 1288 to 2675 (96px margin above and below): `aspect-ratio: 1320 / 1388`, `object-position: 50% 87.027%` (1288 / (2868 - 1388)). The blank above the logo is gone; the app's own gap between the logo and the line (about 800 rows) stays, since a crop cannot remove it.
  - Home row 2 uses `crop="fields"`; row 5 uses `crop="lock"`. Rows 1 and 3 and the hero are unchanged. Alt text: A3 and A9 change (see Copy drafts, A3r and A9r, approved by decision 15). Acceptance: rendered crops at 280px and 300px show the listed content with no status bar and no Save button; check:layout and check:a11y pass.
- FX8. Features page top, one frame (O3 alternative; C13, C50). src/pages/features.astro shows one PhoneFrame, 04-check-what-we-read with `crop="fields"`, at `--site-phone` (280px, 300px from 840px) on a plain shot panel; 02-person-top is removed from the page top; the `.shot-panel.overlap` rules (site.css:824-833) are removed if nothing else uses them. Alt text A3r as FX7. Acceptance: Features requests no 02-person-top image; the frame renders 280px below 840px and 300px from it; check-text (features.txt with the 02 alt line removed and A3r in place), check:layout, and check:a11y pass.

## Implementation decisions

1. impeccable is not installed in this repo, not added to package.json, and not run by any session. Jake runs it outside the repo when he wants a reading, as he did for detect. Reason: CLAUDE.md and README rule 10 forbid dependencies the plan does not name, and the existing checks (check:layout, check:a11y with axe, tokens:check, check:external) already enforce the floor this phase cares about.
2. The detect output stays untracked in handoff/. This file lists every finding and the file's sha256, so the triage is traceable without committing a file that carries local machine paths.
3. DSG-01 is the only requirement. It is met by the detect and critique triage plus the Fix items Jake approves. With approved Fix items, PLAN writes one wave (FX1 and FX2 are both CSS in src/styles/site.css); with none, the phase needs no PLAN or EXECUTE, and VERIFY records the triage as DSG-01's evidence. The one-wave expectation is superseded by decision 14.
4. The phase does not close after detect. Jake ran impeccable critique outside the repo (a throwaway clone, a project-scoped install, the locked rules in its ignore list) on Home and Features; the report is handoff/impeccable-critique.md, untracked, sha256 592caaf6e7115ec477753b385e3ef8906a57ceea5304d696dc3983e9d27128e7. Every finding is triaged in the four detect buckets above (Critique triage), each Fix item is drafted as an implementation decision, and any changed string would be a Copy draft. Source: Jake's answer 1, ANSWERS 2026-10-26.
5. DSG-01 in REQUIREMENTS.md now names the critique report beside the detect run. Its bar on token, typeface, and HOME-DESIGN.md changes is unchanged, which is why O1 to O3 are declined unless Jake promotes them. Source: Jake's answer 1.
6. FX1 (balanced headings) and FX2 (`text-wrap: pretty`) are approved as drafted. Source: Jake's answer 1, ANSWERS 2026-10-26 (second round).
7. O1 promoted: the `.prose` measure becomes about 58ch, so lines run under 80 characters. HOME-DESIGN.md, Other pages amended. Fix item FX3. Source: Jake's answer 2. Changed at REVISE (2026-10-26): the measure is 56ch instead of 58ch, so every line runs under 80 characters with margin. At 58ch the longest line at 1280 was 80; at 56ch it is 77 (Support and the privacy policy) and the highest paragraph average is 72.0. HOME-DESIGN.md, Other pages amended to "max 56ch" (Jake authorized at REVISE), so the contract matches the build. Source: Jake's REVISE prompts.
8. O2 promoted: in dark theme only, the privacy band fill is `--accent-press` (white text 6.47:1). Light is unchanged, and no token is added or changed. HOME-DESIGN.md, Privacy band and Colors amended. Fix item FX4. Source: Jake's answer 3.
9. C10 promoted: the Home privacy band h2 becomes "What you add stays on your iPhone" (no period). Reason (Jake): literally true without relying on the brief's definition of personal information, and it matches the privacy overview's V6. Band facts and CTA unchanged. HM16 revised and approved; HOME-DESIGN.md, Copy amended. Fix item FX5. Source: Jake's answer 4a.
10. C11 promoted: Home feature row 4 replaces the 05-masked and 05-revealed screenshots with a live HTML pair in the moments-card style, captioned "Masked" and "Revealed", with the strings in Copy drafts (HM28 to HM30, approved). The Reveal and Hide labels are static text, not buttons; there is no interaction on the site. A5 and A6 leave Home; the 05 shots stay in the repo. HOME-DESIGN.md, Features amended. Fix item FX6. Source: Jake's answer 4b. Set by this session, where the answer is silent: the badge is the home entity badge (`--entity-home`, "H"), because the record is a home; the Reveal and Hide labels are aria-hidden, because the masked card's screen-reader text already says "hidden until you tap Reveal", the captions give each card's state, and a static "Hide" read aloud would announce a control that does not exist.
11. C12, C14, and C15 promoted in part: PhoneFrame gains a `fields` crop for 04-check-what-we-read and a `lock` crop for 06-lock, with the measured values in FX7; Home rows 2 and 5 use them. The Save button is left out of `fields` because it measures cleaner (FX7). A3 and A9 change because the crops change what they show, so revised drafts A3r and A9r replace them (approved, decision 15). HOME-DESIGN.md, Phone frame and Features amended; this supersedes phase 04 decision 19's `crop="full"` for 06-lock on Home. Source: Jake's answer 4c.
12. O3 alternative promoted: the Features page top shows one frame, 04-check-what-we-read with `crop="fields"`, at `--site-phone` (280px, 300px from 840px); 02-person-top leaves the page top. No new page-top layout. HOME-DESIGN.md, Other pages amended. Fix item FX8. Source: Jake's answer 4d.
13. Every other Decline, Already covered, and Not applicable entry stays as triaged. Source: Jake's answer 5.
14. DSG-01 is amended to allow exactly the HOME-DESIGN.md changes in decisions 7 to 12; the bar on token and typeface changes stays. Jake authorized the contract changes in this session (answer 4). With FX1 to FX8, PLAN writes the phase's waves; the phase 04 copy fixtures (copy/index.txt and copy/features.txt) change in the plan's tasks, not here, so check-text keeps passing on main until EXECUTE.
15. A3r and A9r are approved as drafted. A3r replaces A3 on Home row 2 and the Features page top; A9r replaces A9 on Home row 5. Source: Jake's answer 1, ANSWERS 2026-10-26 (third round).

## Copy drafts

IDs continue phase 04's (HM16, A3, A9 are that phase's entries; HM28 onward are new). FX1 to FX4 change no visible string. App repo read at origin/main ce97c5a; the brief and the _ds tokens are unchanged since f4f2450.

HM16 (revised). Home privacy band h2: "What you add stays on your iPhone" (no period). Replaces "Your information stays on your iPhone" (decision 9). Brief: Privacy ("Personal information never leaves the device, except inside a backup file the user explicitly exports and shares"); what the user adds is personal information the app stores on the device. Never "nothing leaves your phone"; the network disclosures stay on /privacy-overview.html, linked by HM20. Status: Approved.

HM28. Row 4 cards, both: record name "Maple Street house"; label "Alarm code". Fictional sample matching the 05 screenshots. Brief: Secure fields (alarm code is a masked field). Status: Approved.

HM29. Row 4 masked card: value shown as aria-hidden dots; visually hidden text "Alarm code, hidden until you tap Reveal"; visual label "Reveal" (static text, aria-hidden, decision 10). Brief: Secure fields ("Masked by default with a Reveal / Hide control"); Accessibility ("masked values announce as hidden"). Status: Approved.

HM30. Row 4 revealed card: value "0000"; visual label "Hide" (static text, aria-hidden, decision 10). Brief: Secure fields. Status: Approved.

HM13's captions "Masked" and "Revealed" are unchanged and stay Approved.

A5 and A6: removed from Home (decision 10). The 05 shots stay in the repo. Status: Removed.

A3r. 04-check-what-we-read, `crop="fields"`, on Home row 2 and the Features page top (replaces A3 in both places, because the crop no longer shows the Save button): "The “Check what we read” screen after scanning an insurance card. It shows the card photo with a Retake photo link and three fields read from it: Member ID, Group number, and Insurance phone." Checked against the measured crop rows (172 to 1595) in both themes. Not a claim beyond what the screen shows; supports HM11 (brief, Document capture). Status: Approved (decision 15).

A9r. 06-lock, `crop="lock"`, Home row 5 (replaces A9, because the crop drops the blank screen and the logo is no longer in the center): "Close view of the atHand lock screen: the atHand logo, the line “atHand is locked.”, and an Unlock button." Checked against the measured crop rows (1288 to 2675) in both themes; the logo shows the @Hand lockup, but the alt text says atHand (CLAUDE.md). Opens with "Close view of", as A4 does for a crop. Supports HM14 (brief, App lock). Status: Approved (decision 15).

Copy: all Approved. Nothing awaits approval.

## Open questions for Jake

None.

## Out of scope

- Any change to the typefaces or tokens, and any HOME-DESIGN.md change beyond decisions 7 to 12.
- Crops for Home rows 1 and 3 or the hero, and any interaction on the row 4 cards.
- Installing or configuring impeccable, or adding its rules to the repo's checks.
- Per-section crops on Features (C24), recorded in BACKLOG.md.
- FEAT-01 (phase 04.1) and the launch flip (phase 05).
