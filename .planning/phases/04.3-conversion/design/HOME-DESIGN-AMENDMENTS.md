# HOME-DESIGN.md amendments: phase 04.3, conversion

Status: draft for Jake’s review (2026-10-26). Phase 04.3 “conversion” is inserted before phase 05 (Jake, 2026-10-26); phase 05 stays the launch flip, gated on App Store approval (App Store badge, Smart App Banner, removing the coming-soon line). Jake’s answers on the headline, “Group number”, sentence case, and the phase are recorded in COPY.md, Decisions. Strings are approved only when recorded in ANSWERS. Copy lives in COPY.md beside this file; its Approved column wins over any string quoted here.
Source: Design artifact “athandapp.com conversion redesign” (canvas c990cb96). The four reference builds beside this file are the repo copy of that canvas.
Scope: Home, Features, and the Open Graph image and its alt text. Every other page, and every section of HOME-DESIGN.md not named below, is unchanged. The page title “atHand: Your Info, Ready” is the App Store listing name and does not change.

Files in this folder:

- HOME-DESIGN-AMENDMENTS.md: this file.
- COPY.md: every new or changed string, marked New, Changed, Moved, or Unchanged, with its source.
- og-image-reference.html and og-image-reference.png: the Open Graph image with the new headline (see Open Graph image below). The PNG is a preview with system font fallbacks and the apple-touch icon; production regenerates public/og-image.png with scripts/make-og-image.mjs.
- home-reference-light.html, home-reference-dark.html, features-reference-light.html, features-reference-dark.html: static reference builds. Like the phase 04 builds, they use a container query at 840px on `.site` (production uses `@media (min-width: 52.5em)`), fall back to system fonts, and load the PNGs from src/assets/shots/ by a relative path. Open one and resize the window to see both layouts.

## What stays exactly as it is

- Constraints, breakpoint, and every `--site-*` variable. No new token and no new site variable.
- Header, footer, theme control, phone frame, link CTAs, focus ring, and Motion.
- Moments section (markup, copy, and style).
- Feature row 4, the live Masked and Revealed pair (HM13, HM28 to HM30), now on a `.stage` panel.
- Privacy band, its h2 “What you add stays on your iPhone”, its three facts, and its CTA.
- Pricing (HM21 to HM23, 07-paywall perks crop) and Closing (C1, HM25). No price amount anywhere.
- Hero screenshot: 01-home, `crop="full"`, `hero`, alt A1. It stays the only large screenshot on Home.

## Page order (replaces “Page order”)

1. Header
2. Hero
3. Moments
4. Features (five rows, same order), then “See all features”
5. Why not just… (new)
6. Privacy band
7. Pricing
8. Closing
9. Footer

## Shared new parts

### Chip (`.chip` in a `ul.chips`)

A non-interactive label: an `li`, never a link or button, with no hover style and no cursor change.

| Property | Value |
|---|---|
| List | flex, wrap, gap `--space-2` |
| Fill | `--surface-card` (on a `.stage` or the lock card: `--surface-chip`, border `--surface-chip`) |
| Border | 1px `--border-card`, radius `--radius-chip` |
| Padding | `--space-2` top and bottom, `--space-3` left, `--space-4` right |
| Text | `--text-base` 600, line height 1.3, `--text-body` |
| Icon | 20px inline SVG, `aria-hidden`, `--text-link` |

Contrast: `--text-link` on `--surface-chip` is 6.74:1 light and 6.32:1 dark.

### Stage (`.stage`)

Replaces `.shot-panel` wherever a live card or crop sits. `--surface-chip` fill, radius `--radius-card`, flex wrap centered, gap `--space-6`. Padding `--space-8` by `--space-4`; from 840px `--space-10`.

### Mock card (`.mock`)

Live HTML in the moments-card style: `--surface-card`, 1px `--border-card`, radius `--radius-card`, padding `--space-6`, flex column gap `--space-4`, `flex: 1 1 17rem`, max 26rem.

- `.mock-title`: `--font-display` 700 `--text-lg`, `--tracking-display`.
- `.mock-sub`: 16px, line height 1.35, `--text-muted`.
- `.mock-label`: 16px 600 `--text-muted`.
- `.field-list` (a `dl`): 1px `--border-card`, radius `--radius-card-sm`; each row padding `--space-3` by `--space-4`, rows split by 1px `--divider`; `dt` 16px `--text-muted`; `dd` `--text-lg` 500, `--tracking-label`, tabular figures.

### Entity badge with an icon

The existing `.badge` (`--badge-size`, radius `--radius-chip`, `--white` in light and `--text-on-ink` in dark) holding a 22px icon instead of an initial, `aria-hidden`; the label beside it carries the meaning. Fills: `--entity-person`, `--entity-vehicle`, `--entity-pet`, `--entity-home`, `--entity-financial`, `--entity-contact`, `--entity-custom`. Measured: white on each light fill 4.98:1 or higher; `--text-on-ink` on each dark fill 6.53:1 or higher (icons need 3:1).

### New icons (Icon.astro)

24 by 24, stroke `currentColor`, width 1.8, round caps and joins, `aria-hidden`: person, paw, house, bank, contact-card, tag, check, check-circle, minus-circle, lock, face-id, fingerprint, keypad, clock, calendar, pin, chevron, archive. The existing `system` icon doubles as the “Partly” and “Varies” verdict mark. Path data is in the reference builds.

## Hero (amends “Hero”)

- h1: `--site-display`, as before, but max width 16ch instead of 12ch for the longer headline. New copy (COPY.md H-1).
- Lede: unchanged style; new copy (H-2).
- Trust chips (new): a `ul.chips` with `aria-label="At a glance"`, between the lede and the action. Four chips: No account (person-slash), Stored on your iPhone (phone), Locked with Face ID (face-id), One-time purchase, no subscription (check-circle).
- Action slot (new): `.store-slot`, flex, `align-items: center`, min height `calc(var(--space-12) + var(--space-2))` (56px). It holds the coming-soon line (unchanged component and copy, C1) today. Phase 05 replaces the line with the official App Store badge at a height of `--space-12` inside the same slot, so nothing around it moves.
- Copy column order: h1, lede, chips, action slot. Gap unchanged (`--space-6`, `--space-8` from 840px).

## Features (replaces “Features”)

h2 “What it does” (HM9) unchanged; heading to list `--space-10`. List `ul.f-list`: flex column, gap `--space-12`, `--site-section` from 840px. Each row has a different layout so the section changes pace. Copy blocks share `.f-copy`: flex column, gap `--space-3`, max 28rem; h3 `--site-h3`; line `--text-lg`, `--leading-normal`, `--text-muted`.

1. **Everything you look after, `.f-span`.** One card for the whole row: `--surface-card`, 1px `--border-card`, radius `--radius-card`, padding `--space-6`; from 840px two columns 5fr and 7fr, gap `--space-12`, padding `--space-12`. Right side: `ul.entities` (`aria-label="Record types"`), grid `repeat(auto-fill, minmax(min(7rem, 100%), 1fr))`, gap `--space-3`. Each tile: `--surface-page` fill, 1px `--divider`, radius `--radius-card-sm`, padding `--space-4`, icon badge above a `--text-base` 600 label. Seven tiles: People, Vehicles, Pets, Homes, Financial accounts, Contacts, Custom records.
2. **Scan instead of typing, `.f-split`.** From 840px two columns 5fr and 7fr, gap `--space-12`, copy left. Stage holds a mock card “Check what we read” with a two-row field list (Member ID XYZ000000000, Group number 00000) and, from 840px only, a 200px 04-check-what-we-read frame with `crop="fields"` (`.frame-sm`, `display: none` below 840px) and alt A3r.
3. **The right record at the right time, `.f-center`.** Copy centered above a full-width stage (padding `--space-12` by `--space-10` from 840px, flex column, gap `--space-6`). In it: the banner, then a centered chip row (`aria-label="What suggestions use"`): Time of day (clock), Your calendar, if you allow it (calendar), Your location, if you allow it (pin).
   - Banner `.banner`: `--accent` fill in both themes, `--text-on-cobalt` text at `--text-lg`, line height 1.35, radius `--radius-card`, padding `--space-5` with `--space-6` left, max 34rem, a 24px chevron after the text (`aria-hidden`). Text, as the app words it: “Flight to Denver, your **recommended** info is ready” with “recommended” in 700, preceded by visually hidden “Example suggestion banner: ”. It never names a category. Contrast 7.75:1 light, 5.18:1 dark.
4. **Hidden until you need it, `.f-split.flip`.** Columns 7fr and 5fr; stage first through CSS `order: -1` only, so source order stays copy then visual. The stage holds the existing pair, unchanged.
5. **Locked to you, `.f-lock`.** One card: `--surface-card`, 1px `--border-card`, radius `--radius-card`, padding `--space-6`; from 840px a three-column grid (`auto`, `1fr`, `auto`), gap `--space-10`, padding `--space-10` by `--space-12`. Left: an 80px circle (`calc(var(--space-12) + var(--space-8))`, `--surface-chip`, radius `--radius-chip`) with a 40px lock icon in `--text-link`, `aria-hidden`. Middle: copy. Right: chips Face ID, Touch ID, Your passcode (`aria-label="Ways to unlock"`), stacked from 840px, `--surface-chip` fill. No lock-screen screenshot; 06-lock leaves Home.

“See all features” CTA follows, margin-top `--space-10`.

Screenshots on Home after this change: 01-home (hero), 04-check-what-we-read (small `fields` crop, 840px and up), 07-paywall perks. 02-person-top and 06-lock leave Home; 02-person-top moves to the Features page top.

## Why not just… (new section)

`section.section`, `aria-labelledby="compare-title"`. Head: `.section-head`, flex column, gap `--space-3`, max 40rem, margin-bottom `--space-8`; h2 `--site-h2`; line `.section-line`.

Structure: a list, not a table, so it reads the same at every width and at 400% zoom.

```html
<div class="cmp">
  <div class="cmp-head" aria-hidden="true">…three column names…</div>
  <ul class="cmp-rows">
    <li class="cmp-row">
      <h3 class="cmp-q">Finding the right detail fast</h3>
      <dl class="cmp-cells">
        <div class="cmp-cell"><dt>Photos of cards</dt><dd><span class="verdict">[icon] Partly</span><span class="note">…</span></dd></div>
        <div class="cmp-cell"><dt>A notes app</dt>…</div>
        <div class="cmp-cell us"><dt>atHand</dt>…</div>
      </dl>
    </li>
  </ul>
</div>
```

- Every answer is a verdict word plus a sentence. The icon is decoration (`aria-hidden`); nothing relies on color or the icon.
- Verdict: `--text-base` 700, a 20px icon in `--text-muted` (`--text-link` in the atHand column). Note: 16px, line height 1.45, `--text-muted`.
- Below 840px: each `li` is a card (`--surface-card`, 1px `--border-card`, radius `--radius-card`, padding `--space-5`); h3 `--text-lg`; `dt` visible at `--text-base` 700; cells split by 1px `--divider`; the atHand cell gets `--surface-chip` fill, radius `--radius-card-sm`, padding `--space-3` by `--space-4`. `.cmp-head` is `display: none`.
- From 840px: `.cmp-head` and each `.cmp-row` are grids `minmax(0, 1.15fr) minmax(0, 3fr)`, column gap `--space-4`; the cells and head names sit in a nested `repeat(3, minmax(0, 1fr))` grid with the same gap. Head names `--font-display` 700 `--text-lg`. Rows are split by 1px `--border-card`; the question is `--text-base` 700 `--font-ui`; cells padding `--space-5`; `dt` is visually hidden (the visual header names the columns; `dt` still reads the column to screen readers). The atHand column is a continuous `--surface-card` strip with 1px `--border-card` sides, rounded `--radius-card` at the top (head) and bottom (last row), head name in `--text-link`.

## Features page (amends “Other pages”, Features)

- **Page top**: h1 Features, lede FE4, coming-soon line, then the jump list (moved up from the prose column into the page top copy). Visual: 02-person-top, `crop="full"`, at `--site-phone`, on a stage, alt A2. The 04 `fields` frame leaves the page top (it is the Home row 2 crop).
- **Jump list**: seven links; “Hidden fields” (#hidden) is new, between Suggestions and App lock.
- **Sections** `section.fsec` (one per h2, `aria-labelledby` its h2): 1px `--border-card` top rule, padding `--space-12` block, `--site-section` from 840px.
  - `.fsec-top`: one column, gap `--space-6`, margin-bottom `--space-8`; from 840px 5fr and 7fr, gap `--space-12`. Left: h2 `--site-h2` and a one-line intro at `--text-lg` `--text-muted`. Right: one stage with one live card or small crop.
  - Below it: the existing detail text in `.prose` (56ch, line height 1.6), unchanged.
- **Visual per section**: Records, the entity tiles (on the stage, tiles `--surface-card` with 1px `--border-card`); Scanning, the mock “Check what we read” card; Suggestions, the banner and signal chips; Hidden until you need it, the Masked and Revealed pair; App lock, the lock circle (`--surface-card` on the stage) and the three unlock chips; Backups, a mock card with an archive icon in a 44px `--surface-chip` circle, “Encrypted backup” (`--text-base` 700), “Protected by a passphrase you choose” (16px `--text-muted`), and a three-line fact list with 20px `--text-link` check icons; Light and dark, two 01-home frames with `crop="suggest"` at 220px, captioned Light and Dark.
- **New section “Hidden until you need it”** (`id="hidden"`), built from the existing secure-fields content: FE24 moves here from Locked to you, unchanged.
- **Light and dark frames**: each shows one fixed theme regardless of the site theme. PhoneFrame needs a `theme` prop (`"light"` or `"dark"`) that renders one `img` and skips the theme swap; check:a11y’s one-image rule still holds.

## Color tokens by element (rows to add)

| Element | Fill | Text or stroke | Border |
|---|---|---|---|
| Chip | --surface-card (--surface-chip on a stage or the lock card) | --text-body; icon --text-link | 1px --border-card |
| Stage | --surface-chip | | |
| Mock card | --surface-card | --text-body; sub and labels --text-muted | 1px --border-card; field rows --divider |
| Entity tile (Home) | --surface-page | --text-body | 1px --divider |
| Entity tile (stage) | --surface-card | --text-body | 1px --border-card |
| Icon badge | --entity-* per type | --white (light), --text-on-ink (dark) | |
| Span and lock cards | --surface-card | --text-body | 1px --border-card |
| Lock circle | --surface-chip (--surface-card on a stage) | --text-link | |
| Suggestion banner | --accent (both themes) | --text-on-cobalt | |
| Comparison card (below 840px) | --surface-card; atHand cell --surface-chip | verdict --text-body, note --text-muted | 1px --border-card; cells --divider |
| Comparison grid (from 840px) | atHand column --surface-card | head atHand --text-link | rows 1px --border-card; atHand column 1px --border-card |
| Verdict icon | | --text-muted; atHand --text-link | |

## Open Graph image (new section)

Decision 1 (COPY.md): social previews match the hero; the page title does not change.

- public/og-image.png: same layout, tokens, and fonts as today (scripts/make-og-image.mjs). The h1 text becomes OG-1, “Your household’s IDs and insurance, ready on your iPhone”. The line under it, “A private household organizer for iPhone”, is unchanged.
- Add `text-wrap: balance` to the script’s h1 rule. Without it the 56px headline breaks with “iPhone” alone on a third line in the 656px copy column; balanced, it sets as “Your household’s / IDs and insurance, / ready on your iPhone” and the copy block still sits inside the 630px height (measured top 143, bottom 487).
- og:image:alt in Base.astro (every page): OG-3, “The atHand logo and the words “Your household’s IDs and insurance, ready on your iPhone.””.
- Unchanged: `<title>`, meta description, og:title, og:description, and the SoftwareApplication structured data, including its description and alternateName.

## Alt text (amends “Alt text”)

- A1, A3r, A8: unchanged and still on Home. A2 moves to the Features page top. A4 and A9r leave Home (row 3 and row 5 are live HTML).
- Features, Light and dark frames: two new strings (COPY.md F-A1, F-A2).

## Acceptance (adds to “Acceptance”)

- Reference builds measured in Chromium: no horizontal scroll at 1440, 390, or 320, or at 400% zoom of 1280, in light and dark; no text below 16px.
- check-text fixtures for index and features must be rewritten from COPY.md once approved; the `!` lines for removed strings (H-0, HM10 line, A4, A9r) go in. H-0 stays allowed in the `title:` line.
- public/og-image.png regenerated with the script and checked by eye; og:image:alt matches OG-3 on every page.
- Every new string in COPY.md traced to this brief or the current site before merge.
