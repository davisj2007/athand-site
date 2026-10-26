# Phase 04.2: design-polish - Verify

Result: PASS
Date: 2026-10-26

Run on branch verify/04.2-design-polish from main at b2fe01e (wave 2, PR #43, merged), local Node 26.11.1, Playwright 1.64.1 with its Chromium, axe-core 4.14.0. App repo checkout at ~/dev/athandapp: HEAD and origin/main both 487b454; `git diff --quiet f4f2450 origin/main -- athand-project-brief.md athand-design-handoff/_ds` succeeds, so the brief and the _ds tokens are unchanged since the commit CONTEXT.md read. PLAN.md: all eight tasks in waves 1 and 2 (04.2-01 to 04.2-08) are checked.

## Automated checks

- `npm ci`: pass. Same fsevents install-scripts notice as earlier phases; no effect on the build.
- `npm run build`: pass, 7 pages.
- `npm run check`: pass, 0 errors, 0 warnings, 0 hints.
- `npm run tokens:check`: pass, prints the fonts.css exception line and "4 files match 487b45478a9d763b26b9cae8db769ec3ae05f9a6".
- `npm run check:external`: pass, 8 files scanned, no third-party requests.
- `npm run check:links`: pass, 61 internal links resolve.
- `npm run check:content`: pass for privacy and 404 against 52d8d1a.
- `npm run check:layout`: pass, "7 pages, 2 themes, 5 viewports: no overflow, gutters kept" (320 by 640, 390 by 844, 768 by 1024, 1280 by 800, and 1280 at 400%, in light and dark).
- `npm run check:a11y`: pass, "7 pages, 4 theme states, 2 widths: no violations". This is axe-core with default rules on every page in light, dark, and System with the OS light and dark, at 390 and 1280 px, plus the 17px body, 16px minimum text, 44px standalone target, reduced-motion, and one-displayed-image-per-`.screen` checks.
- Static checks S1 to S15, S18, and S21 to S25, parsed straight from the phase 04 and phase 04.2 PLAN.md files and run as written: all exit 0 (S1 dashes, S2 straight apostrophes, S3 "@Hand", S4 "nothing leaves" wording, S5 prices, S6 out-of-scope words and the subscription and sync sentence list, S7 permanent URLs, S8 check:content, S9 coming-soon counts, S10 check-text on the five pages, S11 token variables only, S12 one em breakpoint and no text under 16px, S13 tokens and dependencies, S14 no served image can show a price, S15 no religious wording, S18 no script but the JSON-LD block, S21 tokens, Base.astro, and package files unchanged since 63a8b7d, S22 HOME-DESIGN.md and the reference builds unchanged since 1d3efe5, S23 only the four planned src files changed, S24 the old HM16 h2 and removed alts gone and the 05 shots kept, S25 impeccable absent). check-text counts: index 71 lines, features 47, pricing 30, privacy-overview 30, support 81.
- S16 and S17: the verify commands of 04-19, 04-21, 04-22, and 04-23 pass, including 04-23's three check-external fixture cases. 04-19 was run under bash: its `set -- $x` relies on word splitting, which zsh does not do, so under zsh it fails with "public/favicon.png 48 not a valid file". That is the shell, not the site; phase 04 VERIFY ran it the same way.
- S19: `npm run check:layout && npm run check:a11y` pass, and 04-24's verify re-runs and passes, so its fixture page without theme CSS still fails with "screen shows 2 images".
- S20: all seven measure.mjs checks pass (headings, stragglers, measure, band, row4, crops, features-top).

### Copy order and heading levels

Read as Playwright ARIA snapshots of `main` at 1280 px in light, against CONTEXT.md, Copy drafts and phase 04's:

- Home: region h1 HM2 with lede, C1, and the hero figure (A1); region h2 HM5 with three h3 moments; region h2 HM9 with five h3 rows in order, figures A2, A3r, A4, then the row 4 pair, then A9r, and the "See all features" link; region h2 "What you add stays on your iPhone" (HM16 revised) with its three facts and the privacy overview link; region h2 HM21 with A8; region h2 HM24. Row 4 reads figure "Masked" (Maple Street house, Alarm code, "Alarm code, hidden until you tap Reveal") and figure "Revealed" (Maple Street house, Alarm code, "0000"); no Reveal or Hide label and no link, button, or image in the pair.
- Features: region h1 "Features" with the lede, C1, and one figure (A3r); nav "On this page" with six links; six h2 in FP3 order with the detail text unchanged. In order.

### Comparison with HOME-DESIGN.md (as amended at ANSWERS and REVISE)

Full-page screenshots of Home and Features at 390 and 1280 in light and dark, after scrolling so lazy images load:

- Home row 2 shows the `fields` crop (Cancel through the three fields, no status bar, no Save); row 5 shows the `lock` crop (lockup, "atHand is locked.", Unlock). Rows 1 and 3 and the hero are unchanged.
- Home row 4 shows the two live cards side by side in the shot panel at 390 and 1280, captioned Masked and Revealed, with the H badge in `--entity-home`, eight dots or 0000, and the Reveal or Hide label in link color. At 390 each card is narrow enough that "Maple Street house" wraps to three lines; nothing is clipped and check:layout passes (BACKLOG.md).
- The privacy band fills cobalt in light and the darker `--accent-press` in dark, with the h2 on two balanced lines.
- The Features page top shows one 300px `fields` frame at 1280 beside the copy and one 280px frame at 390, on a plain shot panel; the prose column is 56ch.

## Requirement evidence

- DSG-01: PASS.
  - Triage: all 24 detect findings (F1 to F4) and all 57 critique entries (C1 to C57) are triaged in CONTEXT.md (Triage and Critique triage), each as Fix, Decline naming the locked rule, Already covered citing the check or decision, or Not applicable saying why.
  - FX1: `text-wrap: balance` on the listed headings, src/styles/site.css:865; measure.mjs headings passes.
  - FX2: `text-wrap: pretty` on the listed paragraphs, src/styles/site.css:866; measure.mjs stragglers passes.
  - FX3: `.prose` max-width 56ch, src/styles/site.css:783; measure.mjs measure passes (SUMMARY.md: column 601px at 1280, highest paragraph average 72.0, longest line 77).
  - FX4: dark band fill `--accent-press`, src/styles/site.css:660 and :662; measure.mjs band passes (rgb(76, 57, 198) light, rgb(90, 71, 208) dark, on Home and the Privacy overview); axe contrast passes in both themes.
  - FX5: Home band h2 "What you add stays on your iPhone", src/pages/index.astro:157; check-text passes with the revised HM16 lines; S4 passes.
  - FX6: row 4 live pair, src/pages/index.astro:108 and :124, styles at src/styles/site.css:563-588 and :636; PhoneFrame excludes the 05 shots, src/components/PhoneFrame.astro:28; measure.mjs row4 and S24 pass; dist/ holds no 05 file.
  - FX7: `fields` and `lock` crops, src/pages/index.astro:90 and :148; measure.mjs crops passes.
  - FX8: one-frame Features page top, src/pages/features.astro:22; `.overlap` gone from src; measure.mjs features-top passes (no 02-person-top request).
  - Every phase 04 check passes (S1 to S19 above). No token or typeface change (S13, S21). HOME-DESIGN.md changed only by the authorized amendments (S22). impeccable is not in the repo (S25).

## Browser acceptance checklist for Jake

Run after this PR merges and the Deploy workflow on main finishes green, on https://athandapp.com. Use Safari on Mac unless a step says iPhone.

1. Open https://athandapp.com/ with the header's theme control on Light. Scroll to "What it does". Expected: row 2 ("Scan instead of typing") shows a short phone frame with Cancel, "Check what we read", the document photo with Retake photo, and three fields; no status bar and no Save button.
2. Keep scrolling to row 4, "Hidden until you need it". Expected: two cards, not screenshots, side by side, each with a brown H badge, "Maple Street house", and "Alarm code". The left card shows eight dots and a purple "Reveal", captioned Masked; the right shows 0000 and "Hide", captioned Revealed.
3. Click "Reveal", "Hide", and each card. Expected: nothing happens; the pointer stays an arrow and nothing gets a hover style.
4. Scroll to row 5, "Locked to you". Expected: a short frame with the logo, "atHand is locked.", and the Unlock button; the large blank area above the logo is gone.
5. Scroll to the privacy band. Expected: the heading reads "What you add stays on your iPhone" on two balanced lines, with the three facts and the "How atHand handles your information" link below.
6. Switch the theme control to Dark. Expected: the privacy band turns a deeper purple than before, with white text that is easy to read; row 4's cards turn dark with the badge, dots, and labels still clear.
7. Switch to System, then flip macOS between Light and Dark in System Settings, Appearance, while the page is open. Expected: the page, the band fill, row 4, and every phone frame follow the OS each time, with one image per frame.
8. Open https://athandapp.com/features.html at full window width. Expected: one phone frame beside the "Features" heading, about the width of a phone frame on Home, showing the "Check what we read" screen; no second, overlapping frame.
9. On the same page, read a few paragraphs under "Records for everything you look after". Expected: the text column is noticeably narrower than before, with lines well under a typical book line, and no paragraph ends on a single short word where a two-word last line was possible.
10. On iPhone in Safari, open Home and Features. Expected: headings such as "For the moments you need it" do not leave "it" alone on the last line; row 4's two cards fit side by side in the panel (the name wraps to three lines), with nothing cut off; the Features frame sits above the copy.
11. If you have a Mac or iPhone on an older Safari (before 17.5), open Home. Expected: headings and paragraphs wrap as they did before this phase, with nothing overlapping or cut off.
12. Turn on VoiceOver on Mac (Command F5) and move through Home's row 4 with Control Option Right Arrow. Expected: it reads the "Hidden until you need it" heading and line, then a figure with "Maple Street house", "Alarm code", "Alarm code, hidden until you tap Reveal", and "Masked", then a figure with "Maple Street house", "Alarm code", "0000", and "Revealed". It never reads "Reveal" or "Hide" as a separate item or announces a button.
13. With VoiceOver, open the rotor (Control Option U) on Home and check Headings and Landmarks. Expected: one h1, the section h2s including "What you add stays on your iPhone", and the five feature h3s; banner, navigation, main, and footer landmarks. On the image rows, VoiceOver reads the new alt text: row 2 begins "The “Check what we read” screen after scanning an insurance card", row 5 begins "Close view of the atHand lock screen".
14. Keyboard only on Home: press Tab from the top. Expected: the skip link appears first and works; focus moves through the header, the theme buttons (each showing its pressed state), and the page links with a visible focus ring; nothing in row 4 takes focus.
15. Zoom Home and Features to 400% (Command Plus until 400%). Expected: no horizontal scrolling and no clipped text; row 4's cards stack or shrink without cutting off text, and the Features frame fits the width.
16. Turn on Reduce Motion (System Settings, Accessibility, Display) and reload Home. Expected: nothing animates; the page looks the same otherwise.
17. With Safari's Web Inspector open on the Network tab, reload Home and Features and scroll to the end. Expected: every request goes to athandapp.com, and no request names 05-masked, 05-revealed, or (on Features) 02-person-top.
18. Open https://athandapp.com/privacy.html and https://athandapp.com/support.html directly. Expected: both load at those exact URLs with no redirect, and the policy text is unchanged.

## Jake's browser result

(recorded at SHIP)
