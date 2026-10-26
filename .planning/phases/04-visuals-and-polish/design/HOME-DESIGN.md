# Home page redesign: design contract

Status: approved direction from Jake (2026-10-25). Copy marked "New" below still needs approval in ANSWERS.
Amended 2026-10-26 by phase 04.2 decisions 7 to 12 (Jake authorized, ANSWERS): prose measure, dark privacy band fill, Home privacy h2, row 4 live pair, the `fields` and `lock` crops, and the one-frame Features page top. Approved copy and alt text live in the phase CONTEXT.md files, which win over the copy table here.
Source: Design artifact "athandapp.com home page" (canvas dc6e54d7). This file and the two reference builds beside it are the repo copy of that canvas; when they disagree with the canvas, this file wins.

Files in this folder:

- HOME-DESIGN.md: this contract.
- home-reference-light.html and home-reference-dark.html: static reference builds of the home page. Open either one in a browser and resize it to see both layouts. They are design references only, not production code. They use container queries on `.site`; production uses the media query below.

Screenshots: src/assets/shots/, 14 PNGs at 1320 by 2868, light and dark pairs. All data shown is a fictional sample household.

## Open decisions for ANSWERS

1. The home privacy band drops the Google scanning diagnostics and Apple location lookup disclosures that today's home page carries. They stay, in full, on /privacy-overview.html. Approve or keep a short disclosure line on home.
2. Two sizes sit above the token scale: the 56px desktop hero (`calc(var(--text-xl) * 2)`) and the 96px desktop section gap (`calc(var(--space-12) * 2)`). Keep them as computed values in site.css, or add a `--text-3xl` token to the app _ds first.
3. New copy (listed under Copy) needs approval. copy/index.txt must be replaced with the approved strings so check-text passes.
4. Scope: this goes beyond ROADMAP phase 04 as written. Fold it into 04, or split it into its own phase.

## Constraints (unchanged from CLAUDE.md)

- Astro, plain CSS, token variables only. No hex, rgb, or font names outside src/styles/tokens/.
- Zero third-party requests. No JavaScript required for content or navigation.
- WCAG AA in both themes; body 17px; nothing below 16px; 44px targets; no color-only meaning; links inside sentences underlined; works at 320px and 400% zoom with no horizontal scroll.
- /privacy.html and /support.html never move.
- The @Hand form appears only in the logo lockup. No price or currency anywhere on the site or in any image shown.

## Breakpoint and site variables

One breakpoint, in em so it follows zoom: `@media (min-width: 52.5em)` (840px at 100%). Add to site.css:

```css
:root{
  --site-max: 1200px;
  --site-gutter: var(--space-4);
  --site-section: var(--space-12);
  --site-display: var(--text-2xl);
  --site-h2: var(--text-xl);
  --site-h3: var(--text-lg);
  --site-phone: 280px;
  --site-phone-hero: 280px;
}
@media (min-width: 52.5em){
  :root{
    --site-gutter: var(--space-10);
    --site-section: calc(var(--space-12) * 2);
    --site-display: calc(var(--text-xl) * 2);
    --site-h2: var(--text-2xl);
    --site-h3: var(--text-xl);
    --site-phone: 300px;
    --site-phone-hero: 340px;
  }
}
```

Container: `max-width: var(--site-max)`, side padding `var(--site-gutter)`. Header, main, and footer share it. Adjacent sections collapse to one `--site-section` gap (the second drops its top padding); full-bleed bands keep both.

## Page order

1. Header
2. Hero
3. Moments
4. Features (five rows, in this order: Everything you look after; Scan instead of typing; The right record at the right time; Hidden until you need it; Locked to you), then a "See all features" link
5. Privacy band (full bleed)
6. Pricing
7. Closing
8. Footer

The feature order differs from the original brief on purpose: what atHand holds, how details get in, when they surface, then how they are protected.

## Copy

Curly apostrophes and quotes, sentence case, Oxford comma, no em dashes.

| Place | String | Status |
|---|---|---|
| Hero h1 | Your info, ready when you need it | Approved (H3) |
| Hero line | The details you look up all the time, for you and everyone you look after, in one place on your iPhone. | New |
| Hero and closing | Coming soon to the App Store for iPhone. | Approved (C1) |
| Moments h2 | For the moments you need it | Approved (H5) |
| Moment 1 | At the doctor’s office / Insurance member ID / Sam Rivera / XYZ000000000 | New |
| Moment 2 | At a traffic stop / Driver’s license / Sam Rivera / D000-0000-0000 | New |
| Moment 3 | At the airport / Passport / Sam Rivera / masked value, hidden text "Passport number, hidden until you tap Reveal" | New |
| Features h2 | What it does | Approved (H7) |
| Feature 1 | Everything you look after / People, vehicles, pets, homes, and more, in one place. | New |
| Feature 2 | Scan instead of typing / Licenses, passports, insurance cards, VINs, and more. You check every field before it is saved. | New |
| Feature 3 | The right record at the right time / Suggestions from the time of day and, if you allow them, your calendar and location. | New |
| Feature 4 | Hidden until you need it / Sensitive numbers stay masked until you tap Reveal. Captions: Masked, Revealed. Cards: Maple Street house / Alarm code / masked value, hidden text "Alarm code, hidden until you tap Reveal", label Reveal; Maple Street house / Alarm code / 0000, label Hide | Approved (phase 04.2 HM28 to HM30) |
| Feature 5 | Locked to you / Face ID, Touch ID, or your passcode. No password to remember. | New |
| Link | See all features (/features.html) | Approved (H12) |
| Privacy h2 | What you add stays on your iPhone | Approved (phase 04.2 HM16 revised) |
| Privacy facts | No account and no sign-in. / Scanning runs on your iPhone. / The developer added no advertising or tracking tools. | New |
| Link | How atHand handles your information (/privacy-overview.html) | Approved (H18) |
| Pricing h2 | Free to start. | New |
| Pricing line | Your own record is free. One purchase unlocks everything else. No subscription, no ads, no account. | New |
| Link | See pricing (/pricing.html) | Approved (H21) |
| Closing h2 | Coming soon to the App Store for iPhone. | Approved (C1) |
| Closing line | Free to download. Your own record is free. | New |
| Footer | Privacy policy (/privacy.html); Support (/support.html); support@athandapp.com (mailto); Made by Jacob Davis (https://jacobdavis.co) | Unchanged |

Page title and meta description: unchanged.

## Header

- Same markup and links as today: lockup linking to /, nav Features, Pricing, Privacy, Support, and the System, Light, and Dark control.
- Below 840px, two rows: CSS grid areas `"logo theme" "nav nav"`. The nav row has a 1px `--divider` top rule, and its links spread with `justify-content: space-between` and wrap at 320px.
- From 840px, one row: `"logo nav theme"`, nav right-aligned, column gap `--space-8`.
- No menu button and no hidden navigation.
- Theme control: a segmented group with a 1px `--border-card` border, `--surface-card` fill, radius `--radius-control`, and 2px inner padding. Each button has a 20px icon (half-filled circle, sun, moon) and a `.tlabel` text span. Below 840px the label is visually hidden but read by screen readers; from 840px it shows. Buttons are at least `--touch-min` wide and the control is 44px tall. The pressed button is filled `--text-body` with `--surface-page` text, weight 700, and `aria-pressed="true"`. It still ships `hidden` and appears only when JavaScript runs.
- Nav links: `--text-base` 600, `--text-link`, 44px tall. Hover gives a 2px underline. The current page gets weight 700 and a 3px underline.
- Lockup: `--text-xl`, `--text-link`, SVG mark plus "Hand" in `--font-display` 700.

## Phone frame (PhoneFrame.astro)

Props: `shot` (base name), `alt`, `crop` (`full`, `suggest`, `record`, `perks`, `fields`, `lock`, or `placeholder`), `hero` (boolean), and `caption` (optional, renders a figcaption).

- Frame: `figure`, `--surface-card` fill, 1px `--border-card`, radius `--radius-phone`, padding `--space-2`, width `--site-phone` (hero: `--site-phone-hero`), `max-width: 100%`. Only the hero frame gets `box-shadow: var(--shadow-soft)`.
- Screen: `overflow: hidden`, radius `calc(var(--radius-phone) - var(--space-2))`, 1px `--divider` border.
- Image: `width: 100%; height: 100%; object-fit: cover`. CSS does the cropping, so one file per screen serves every view.

| crop | screen aspect-ratio | object-position | Shows |
|---|---|---|---|
| full | 1320 / 2696 | 50% 100% | Whole screen minus the 172px status bar |
| suggest | 1320 / 1388 | 50% 11.62% | Home top: greeting, banner, search, Suggested for you |
| record | 1320 / 1348 | 50% 11.32% | Home record top: name, alarm code, Wi-Fi rows |
| perks | 1320 / 1208 | 50% 10.36% | Paywall logo, headline, and perks; ends above the price card |
| fields | 1320 / 1424 | 50% 11.911% | 04-check-what-we-read rows 172 to 1595: Cancel, header, document photo, and the What we read card; ends above the blank area, Save button out |
| lock | 1320 / 1388 | 50% 87.027% | 06-lock rows 1288 to 2675: logo, "atHand is locked.", and Unlock, without the blank screen above |
| placeholder | 1320 / 2696 | n/a | `--surface-chip` fill, 2px dashed `--text-faint` border, "06-lock" in `--font-display` 700 `--text-lg`, note "Lock screen, 1320 by 2868" in 16px `--text-muted`; `role="img"` with aria-label "Placeholder for the atHand lock screen screenshot" |

07-paywall is only ever used with `crop="perks"`.

Theme pairs: render two `img` elements per frame, `.shot-light` and `.shot-dark`, with the same alt text and explicit width and height. `.shot-dark{display:none}`, and the two swap under `[data-theme="dark"]` and under `@media (prefers-color-scheme: dark)` with `:root:not([data-theme="light"])`, mirroring colors.css. A hidden image leaves the accessibility tree and, when lazy, is not downloaded. A `picture` media query is not used because it cannot follow the explicit theme choice.

Images: `astro:assets` WebP at 360w and 720w. `sizes`: hero `(min-width: 52.5em) 340px, 280px`; others `(min-width: 52.5em) 300px, 280px`. Hero images are `loading="eager"`; all others `loading="lazy"`.

## Sections

### Hero

- Grid: one column; from 840px, `minmax(0, 1fr) auto`. Gap `--space-10`, or `--space-12` from 840px. Padding `--site-section` top and bottom.
- Copy column: flex column, gap `--space-6` (`--space-8` from 840px).
- h1: `--site-display`, `--font-display` 700, line height 1.08, `--tracking-display`, max 12ch, `text-wrap: balance`.
- Line: `--text-lg`, `--leading-normal`, `--text-muted`, max 34rem.
- Coming-soon line: `--text-base` 600 `--text-body`, a 24px phone outline icon in `--text-muted`, gap `--space-3`. It is plain text, not a pill or a button.
- Frame: 01-home, `crop="full"`, `hero`.

### Moments

- h2 `--site-h2`; heading to grid `--space-8`.
- `ul` grid: `repeat(auto-fit, minmax(min(300px, 100%), 1fr))`, gap `--space-4`.
- Card `li`: `--surface-card`, 1px `--border-card`, radius `--radius-card`, padding `--space-6`, flex column with gap `--space-5`.
  - Head: a 44px circle (`--surface-chip`, radius `--radius-chip`) holding a 24px icon (medical cross, car, plane), then the h3 at `--text-lg`.
  - Record row: 1px `--divider` top rule, padding-top `--space-5`. A `--badge-size` circular badge in `--entity-person` with "P" in `--font-display` 700 `--text-base` (`--white` text in light, `--text-on-ink` in dark), then the record name at `--text-base` 700 and the subtitle at 16px `--text-muted`.
  - Value: `--text-lg` 500, `--tracking-label`, tabular figures.

### Features

- h2 `--site-h2`; heading to list `--space-10`. `ul` flex column, gap `--site-section`.
- Row `li`: one column with gap `--space-6`; from 840px, two equal columns with gap `--space-12`. Even rows put the shot first with CSS `order: -1` only, so source order stays text then image.
- Copy: h3 `--site-h3`; line `--text-lg` `--text-muted`; gap `--space-3`; max 28rem.
- Shot panel: `--surface-chip`, radius `--radius-card`, padding `--space-10` by `--space-6`, flex centered, wrap, gap `--space-4`.
- Shots: 1 is 02-person-top (full). 2 is 04-check-what-we-read with `crop="fields"`. 3 is 01-home with `crop="suggest"`. 4 is two live HTML cards, not screenshots (below). 5 is 06-lock with `crop="lock"`.
- Row 4 pair: two `figure`s, captioned "Masked" and "Revealed" at `--text-base` 600, each `flex: 1 1 140px`, max 240px; they stack when the panel is too narrow. Each holds a card in the moments-card style (`--surface-card`, 1px `--border-card`, radius `--radius-card`, padding `--space-6`): a record row with a `--badge-size` badge in `--entity-home` with "H" (aria-hidden; `--white` text in light, `--text-on-ink` in dark), "Maple Street house" at `--text-base` 700, and "Alarm code" at 16px `--text-muted`; then the value at `--text-lg` 500, `--tracking-label`, tabular figures, with a label in `--text-link`. Masked: aria-hidden dots, visually hidden "Alarm code, hidden until you tap Reveal", label "Reveal". Revealed: "0000", label "Hide". The labels are static, aria-hidden text: no button, link, hover style, or cursor change.
- After the list: the "See all features" link CTA, margin-top `--space-10`.

### Privacy band

- Full-bleed `section` with `--accent` fill in light and `--accent-press` fill in dark (explicit dark and System with the OS dark), and `--text-on-cobalt` text. Links, icons, and the focus ring also use `--text-on-cobalt`.
- Inner container padding `--site-section`, flex column with gap `--space-8`. h2 `--site-h2`, max 20ch.
- Facts `ul` grid: `repeat(auto-fit, minmax(min(260px, 100%), 1fr))`, gap `--space-6`. Each fact has a 1px `currentColor` top rule, padding-top `--space-5`, a 28px icon (person with slash, scan corners, eye with slash), and `--text-lg` 500 text at line height 1.35.
- Link CTA to /privacy-overview.html.

### Pricing

- Padding `--site-section`. Grid: one column with gap `--space-10`; from 840px, two equal columns with gap `--space-12`.
- Copy: h2 `--site-h2`; line `--text-lg` `--text-muted`, max 30rem; "See pricing" link CTA; gap `--space-5`.
- Shot panel with 07-paywall, `crop="perks"`.

### Closing

- 1px `--border-card` top rule. Centered flex column, gap `--space-5`, padding `--site-section`.
- The SVG mark alone at width `--logo-floor` in `--text-link`, `aria-hidden`. Then h2 `--site-h2`, then the line at `--text-lg` `--text-muted`.

### Footer

- 1px `--border-card` top rule. Padding `--space-8` top and `--space-10` bottom.
- Flex row that wraps, `space-between`, gap `--space-4` by `--space-8`.
- Links `--text-base`, underlined, 44px tall; link gap `--space-6`. Text color `--text-muted`.

### Link CTAs (used in every section)

`--text-base` 600, `--text-link` (`--text-on-cobalt` in the band), underline 1px that thickens to 2px on hover, min height `--touch-min`, and a 20px arrow icon after the text with gap `--space-2`.

## Color tokens by element

| Element | Fill | Text or stroke | Border |
|---|---|---|---|
| Page | --surface-page | --text-body | |
| Header, footer | --surface-page | footer text --text-muted | 1px --border-card |
| Lockup, closing mark | | --text-link | |
| Nav, footer, and CTA links | | --text-link; hover --accent-hover (light), --text-body (dark) | |
| Theme control | --surface-card; hover --surface-chip; pressed --text-body | --text-body; pressed --surface-page | 1px --border-card |
| Ledes and feature lines | | --text-muted | |
| Phone frame | --surface-card | | 1px --border-card; screen 1px --divider |
| Hero frame shadow | --shadow-soft | | |
| Shot panel | --surface-chip | caption --text-body | |
| Placeholder | --surface-chip | --text-body, note --text-muted | 2px dashed --text-faint |
| Moment card | --surface-card | --text-body, subtitle --text-muted | 1px --border-card, rule --divider |
| Moment icon circle | --surface-chip | --text-body | |
| Entity badge | --entity-person | --white (light), --text-on-ink (dark) | |
| Privacy band | --accent (light), --accent-press (dark) | --text-on-cobalt | fact rules currentColor |
| Focus ring | | 3px solid --text-link, offset 3px (--text-on-cobalt in the band) | |

Measured contrast: white on `--accent` is 7.75:1 in light; white on `--accent-press` is 6.47:1 in dark (the band's dark fill; `--accent` would be 5.18:1). `--text-link` is 7.11:1 on paper and 7.93:1 on the dark page. `--text-muted` is 7.84:1 on paper and 7.34:1 on dark cards. `--text-faint` is 4.85:1 on paper and 5.86:1 on the dark page. Badge initials are 5.06:1 in light and 6.94:1 in dark.

## Type scale

| Role | Below 840px | From 840px | Style |
|---|---|---|---|
| h1 hero | --text-2xl (36) | calc(--text-xl * 2) (56) | --font-display 700, line height 1.08, --tracking-display |
| h2 section | --text-xl (28) | --text-2xl (36) | --font-display 700, --leading-tight, --tracking-display |
| h3 feature | --text-lg (22) | --text-xl (28) | same |
| h3 card | --text-lg | --text-lg | same |
| Lede, feature line, fact | --text-lg | --text-lg | --font-ui |
| Body, nav, links | --text-base (17) | --text-base | --font-ui |
| Minimum | 16px | 16px | theme buttons, subtitles, placeholder note |

`--text-xs` and `--text-sm` are not used on the site.

## Motion

| What | Property | Timing |
|---|---|---|
| Link and button hover, press | color, background-color, underline thickness | --dur-fast, --ease-standard |
| Theme change | background-color and color on body | --dur-base, --ease-standard |
| Screenshot swap on theme change | none; the visible img switches instantly | 0 |
| Focus ring | none | 0 |

Nothing animates on load or on scroll, and content is never hidden waiting for an animation. There are no bounces, parallax, loops, or transforms. Under `prefers-reduced-motion: reduce` every transition is off (effects.css already ships this rule).

## Alt text

1. 01-home, hero: The atHand home screen. A banner reads “Flight to Denver, your recommended info is ready.” Below it are a search field, three suggested records, Your People with Sam Rivera, and Your Vehicles with a 2020 Honda Civic.
2. 02-person-top: Sam Rivera’s record in atHand. A Personal section lists full name, relationship, and date of birth, followed by Medical and Documents sections, each with Scan and Upload buttons.
3. 04-check-what-we-read, `crop="fields"` (phase 04.2 A3r, approved): The “Check what we read” screen after scanning an insurance card. It shows the card photo with a Retake photo link and three fields read from it: Member ID, Group number, and Insurance phone.
4. 01-home, suggest crop: Close view of the atHand home screen. A banner reads “Flight to Denver, your recommended info is ready,” and a Suggested for you list shows Flight to Denver tomorrow at 8:00 AM, Vet for weekend errands, and a recently viewed contact.
5. 05-masked: removed from Home (row 4 is live HTML; phase 04.2 decision 10).
6. 05-revealed: removed from Home (as 5).
7. 06-lock: the placeholder is gone (phase 04 decision 19). With `crop="lock"` the alt text is phase 04.2 A9r (approved): Close view of the atHand lock screen: the atHand logo, the line “atHand is locked.”, and an Unlock button.
8. 07-paywall, perks crop: The atHand unlock screen, headed “Unlock everything atHand knows.” Its list reads: add your household, vehicles, pets, homes, and more; scan documents for every record, not just yours; your information stays on this device; one purchase, no subscription, no ads, no account.

03-person-documents is not used on home. It is available for Features (see Other pages).

## Semantics

- Skip link, then `header`, `nav aria-label="Main"`, `main id="main"`, and `nav aria-label="Footer"`.
- Each section has `aria-labelledby` pointing at its heading. There is one h1. Headings run h1, then h2 per section, then h3 per card and feature.
- Moments, features, facts, and nav are real lists. Icons are inline SVG with `aria-hidden="true"`, `stroke="currentColor"`, and stroke width 1.8.

## Other pages

Every page gets the new header and footer and a "page top" built from home parts, with today's detail text unchanged below it in a `.prose` column (max 58ch, so lines run under 80 characters; line height 1.6, h2 `--text-xl`, h3 `--text-lg`, sections separated by `--space-12`, in-sentence links underlined).

- **Page top**: the hero grid one size down. The h1 is `--text-2xl` at every width, followed by the existing lede at `--text-lg` and one visual on the right from 840px.
- **Features**: one frame on a shot panel, 04-check-what-we-read with `crop="fields"`, at `--site-phone` (280px, 300px from 840px). 02-person-top is not in the page top. A jump list of in-page links to its six h2s, 44px tall and wrapping. Optional later: a small crop beside each h2.
- **Pricing**: the 07-paywall perks crop, then a three-item fact row in moment-card style (Free to download; Your own record is free; One purchase unlocks everything else), then the existing text. No amount anywhere.
- **Privacy overview**: the home privacy band as the page top (with the h1 in place of the h2), then every existing disclosure in full, ending with a link to /privacy.html.
- **Support** (/support.html, permanent): a contact card as the visual: h2 "Email support" and support@athandapp.com as a 44px underlined mailto link at `--text-lg`. Then a jump list to the topics and the existing text.
- **Privacy policy** (/privacy.html, permanent) and **404**: text only with the new header and footer.

New strings on these pages need approval the same way.

## Acceptance

- check-text (after index.txt is updated), check-links, check-external, check-main-text, and tokens:check all pass.
- No horizontal scroll at 320px or at 400% zoom of a 1280px window, in both themes.
- axe: no violations. VoiceOver in Safari: theme buttons announce their label and pressed state; screenshot alt text is read once per frame.
- With reduced motion on, nothing transitions.
- No price or currency in the built HTML or in any image shown.
