# Copy table: phase 04.3, conversion (Home and Features)

Status: draft. Every New or Changed string needs Jake’s approval before it ships. Jake’s answers of 2026-10-26 are recorded under Decisions at the end. IDs in the Source column point at .planning/phases/04-visuals-and-polish/copy/index.txt (HM, A) and features.txt (FE, FP), phase 04.2 decisions, or the brief Jake gave for this redesign (“Redesign brief”).

Status key: New (not on the site today), Changed (replaces a live string), Moved (live string, new place), Unchanged (live string, same place), Removed (live string leaves the page).

## Home

| ID | Place | String | Status | Source |
|---|---|---|---|---|
| H-0 | Hero h1, today | Your info, ready when you need it | Removed from h1 and the OG image | HM2. The page title “atHand: Your Info, Ready” (the App Store listing name) is unchanged; decision 1 |
| H-1 | Hero h1 | Your household’s IDs and insurance, ready on your iPhone | New | Redesign brief, Hero: IDs, insurance, on the iPhone |
| H-2 | Hero line | Keep IDs, insurance, vehicle, pet, and home details for everyone you look after in one app, organized by record instead of scattered through photos and notes. | Changed (replaces HM3) | Redesign brief, Hero; “everyone you look after” from HM3; “organized by record” from the brief’s comparison wording |
| H-3 | Chips list name (aria-label) | At a glance | New | Not shown; names the list for screen readers |
| H-4 | Chip | No account | New | Redesign brief, chip list; HM17 |
| H-5 | Chip | Stored on your iPhone | New | Redesign brief, chip list |
| H-6 | Chip | Locked with Face ID | New | Redesign brief, chip list; FE21, FE22 |
| H-7 | Chip | One-time purchase, no subscription | New | Redesign brief, chip list; HM22 |
| C1 | Hero action | Coming soon to the App Store for iPhone. | Unchanged | C1, HM4 |
| A1 | Hero image alt | The atHand home screen. A banner reads “Flight to Denver, your recommended info is ready.” Below it are a search field, three suggested records, Your People with Sam Rivera, and Your Vehicles with a 2020 Honda Civic. | Unchanged | A1 |
| HM5 to HM8 | Moments | All strings | Unchanged | HM5 to HM8 |
| HM9 | Features h2 | What it does | Unchanged | HM9 |
| HM10a | Row 1 h3 | Everything you look after | Unchanged | HM10 |
| R1-1 | Row 1 line | A record for each person, vehicle, pet, home, financial account, and contact, plus custom records with your own labels. | Changed (replaces “People, vehicles, pets, homes, and more, in one place.”) | Redesign brief, row 1; FE6 |
| R1-2 | Entity list name (aria-label) | Record types | New | Not shown |
| R1-3 | Entity labels | People / Vehicles / Pets / Homes / Financial accounts / Contacts / Custom records | New | Redesign brief, row 1; FE6 |
| HM11 | Row 2 h3 and line | Scan instead of typing / Licenses, passports, insurance cards, VINs, and more. You check every field before it is saved. | Unchanged | HM11 |
| R2-1 | Row 2 card title | Check what we read | New | The app’s screen title (04-check-what-we-read); Redesign brief, row 2 |
| R2-2 | Row 2 card line | Change anything that’s wrong before you save. | New | The app’s screen subtitle (04-check-what-we-read) |
| R2-3 | Row 2 card label | What we read | New | The app’s group label (04-check-what-we-read) |
| R2-4 | Row 2 fields | Member ID / XYZ000000000; Group number / 00000 | New | Redesign brief, row 2; sample data. “Group number” on purpose (the app shows “Group #”); decision 2 |
| A3r | Row 2 crop alt | The “Check what we read” screen after scanning an insurance card. It shows the card photo with a Retake photo link and three fields read from it: Member ID, Group number, and Insurance phone. | Unchanged | A3r, phase 04.2 decision 15 |
| HM12 | Row 3 h3 and line | The right record at the right time / Suggestions from the time of day and, if you allow them, your calendar and location. | Unchanged | HM12 |
| R3-1 | Row 3 banner, hidden prefix | Example suggestion banner: | New | Not shown; read before the banner text |
| R3-2 | Row 3 banner | Flight to Denver, your recommended info is ready | New | Redesign brief, row 3 (exact app wording; names no category, FE19) |
| R3-3 | Row 3 chips list name (aria-label) | What suggestions use | New | Not shown |
| R3-4 | Row 3 chips | Time of day / Your calendar, if you allow it / Your location, if you allow it | New | HM12, FE17 |
| A4 | Row 3 image alt | Close view of the atHand home screen… | Removed | Row 3 is live HTML |
| HM13, HM28 to HM30 | Row 4 | All strings | Unchanged | Phase 04.2 decisions 9 to 10 |
| HM14 | Row 5 h3 and line | Locked to you / Face ID, Touch ID, or your passcode. No password to remember. | Unchanged | HM14 |
| R5-1 | Row 5 chips list name (aria-label) | Ways to unlock | New | Not shown |
| R5-2 | Row 5 chips | Face ID / Touch ID / Your passcode | New | HM14, FE21 |
| A9r | Row 5 image alt | Close view of the atHand lock screen… | Removed | Row 5 is a live card |
| HM15 | CTA | See all features | Unchanged | HM15 |
| W-1 | Compare h2 | Why not just use photos or notes? | New | Redesign brief, section 3 |
| W-2 | Compare line | Most people keep these details as photos of cards or in a notes app. Here’s how the three compare. | New | Redesign brief, section 3 |
| W-3 | Column names | Photos of cards / A notes app / atHand | New | Redesign brief, section 3 (no product or company names); sentence case, decision 3 |
| W-4 | Row label | Finding the right detail fast | New | Redesign brief, section 3 |
| W-5 | Row 1 answers | Partly. Find the photo, then zoom in to read the number. / Partly. Search finds it if you typed it in. / Yes. Each detail has its own labeled field. | New | Neutral description; atHand from FE7 |
| W-6 | Row label | Records for the whole household in one place | New | Redesign brief, section 3 |
| W-7 | Row 2 answers | No. Mixed in with your other photos, not organized by record. / Partly. Up to you to set up, and not organized by record. / Yes. A record for each person, vehicle, pet, and home. | New | Redesign brief (“not organized by record”); FE6 |
| W-8 | Row label | Locked behind Face ID | New | Redesign brief, section 3 |
| W-9 | Row 3 answers | Phone lock. Relies on your phone’s lock. (both alternatives) / Yes. Face ID, Touch ID, or your passcode. | New | Redesign brief (“relies on your phone’s lock”); HM14 |
| W-10 | Row label | No account to create | New | Redesign brief, section 3 |
| W-11 | Row 4 answers | Yes. Taking a photo needs no account. / Varies. Depends on the app. / Yes. No account and no sign-in. | New | Neutral description; HM17 |
| W-12 | Row label | Works without searching | New | Redesign brief, section 3 |
| W-13 | Row 5 answers | No. You search or scroll each time. (both alternatives) / Yes. Suggests a record when it can help, and lists your records on the home screen. | New | FE16; 01-home shows Your People and Your Vehicles lists |
| HM16 to HM20 | Privacy band | All strings | Unchanged | Phase 04.2 decision 9 |
| HM21 to HM23, A8 | Pricing | All strings | Unchanged | HM21 to HM23, A8 |
| C1, HM25 | Closing | All strings | Unchanged | C1, HM25 |
| HM1 | Title and meta description | atHand: Your Info, Ready / atHand keeps your household’s reference information… | Unchanged | HM1; decision 1 |
| OG-1 | Open Graph image (public/og-image.png), h1 | Your household’s IDs and insurance, ready on your iPhone | New (replaces “Your info, ready when you need it” in the image) | H-1; decision 1 |
| OG-2 | Open Graph image, line | A private household organizer for iPhone | Unchanged | Current og-image.png |
| OG-3 | og:image:alt (Base.astro, every page) | The atHand logo and the words “Your household’s IDs and insurance, ready on your iPhone.” | New (replaces the current alt, which quotes “Your info, ready when you need it.”) | H-1; decision 1 |
| LD-1 | SoftwareApplication structured data, description | A private household organizer for iPhone. atHand keeps the details you look up all the time… | Unchanged | Decision 1; it does not use the headline |

## Features

| ID | Place | String | Status | Source |
|---|---|---|---|---|
| FE3, FE4, C1 | Page top | Features / atHand stores the details you look up all the time and brings up the right record when it can help. / Coming soon to the App Store for iPhone. | Unchanged | FE3, FE4, C1 |
| FP3 | Jump list | Records / Scanning / Suggestions / App lock / Backups / Light and dark | Moved (into the page top) | FP3 |
| F-J1 | Jump list | Hidden fields (#hidden) | New | Redesign brief, Features: new section |
| A2 | Page top image alt | Sam Rivera’s record in atHand. A Personal section lists full name, relationship, and date of birth, followed by Medical and Documents sections, each with Scan and Upload buttons. | Moved (from Home row 1) | A2 |
| A3r | Page top image alt | (04 fields crop) | Removed from Features | It is now only on Home row 2 |
| FE5 | h2 | Records for everything you look after | Unchanged | FE5 |
| F-I1 | Records intro | Everything you look after, each in its own record. | New | FE6 |
| R1-2, R1-3 | Records visual | Record types; the seven entity labels | New | As Home |
| FE6 to FE9 | Records detail | All strings | Unchanged | FE6 to FE9 |
| FE10 | h2 | Scan instead of typing | Unchanged | FE10 |
| F-I2 | Scanning intro | Point your camera at a document, then check what atHand read. | New | FE11, FE13 |
| R2-1 to R2-4 | Scanning visual | Check what we read card | New | As Home |
| FE11 to FE14 | Scanning detail | All strings | Unchanged | FE11 to FE14 |
| FE15 | h2 | The right record at the right time | Unchanged | FE15 |
| F-I3 | Suggestions intro | atHand can suggest a record before you go looking for it. | New | FE16 |
| R3-1 to R3-4 | Suggestions visual | Banner and chips | New | As Home |
| FE16 to FE19 | Suggestions detail | All strings, including the privacy overview link | Unchanged | FE16 to FE19 |
| F-H1 | h2 | Hidden until you need it | New on Features | HM13 |
| F-I4 | Hidden intro | Sensitive numbers stay masked until you tap Reveal. | New on Features | HM13 |
| HM28 to HM30 | Hidden visual | Masked / Revealed pair | New on Features | Phase 04.2 decision 10 |
| FE24 | Hidden detail | Sensitive numbers, such as passport numbers, account numbers, alarm codes, and Wi-Fi passwords, stay hidden until you tap Reveal, and hide again when you leave the app. | Moved (from Locked to you) | FE24 |
| FE20 | h2 | Locked to you | Unchanged | FE20 |
| F-I5 | App lock intro | Face ID, Touch ID, or your passcode. No password to remember. | New on Features | HM14 |
| R5-1, R5-2 | App lock visual | Ways to unlock; Face ID / Touch ID / Your passcode | New | As Home |
| FE21 to FE23 | App lock detail | All strings | Unchanged | FE21 to FE23 |
| FE25 | h2 | Backups you control | Unchanged | FE25 |
| F-I6 | Backups intro | An encrypted copy of your records, saved where you choose. | New | FE26 |
| F-B1 | Backups card | Encrypted backup / Protected by a passphrase you choose | New | FE26 |
| F-B2 | Backups card list | Your records and photos / Saved wherever you like / A one-time copy, not sync | New | FE26, FE27 |
| FE26 to FE28 | Backups detail | All strings | Unchanged | FE26 to FE28 |
| FE29 | h2 | Light and dark | Unchanged | FE29 |
| F-I7 | Light and dark intro | Light or dark, your choice. | New | FE30 |
| F-C1 | Light and dark captions | Light / Dark | New | FE30 |
| F-A1 | Light frame alt | Close view of the atHand home screen in Light appearance, with the Flight to Denver banner and the Suggested for you list. | New | 01-home light |
| F-A2 | Dark frame alt | The same view in Dark appearance. | New | 01-home dark |
| FE30 | Light and dark detail | atHand follows your iPhone’s appearance, or you can choose Light or Dark in Settings. | Unchanged | FE30 |

## Decisions (Jake, 2026-10-26)

1. Headline. The page title stays “atHand: Your Info, Ready”, the App Store listing name. The Open Graph image text and og:image:alt change to H-1 so social previews match the hero (OG-1, OG-3). The structured data’s description does not use the headline and stays (LD-1).
2. “Group number”, not the app’s “Group #”. The card illustrates the screen rather than reproducing it, the spelled-out label reads clearly to screen readers and low-vision readers, and it matches the approved alt text (A3r) and the brief.
3. Sentence case for site headings and table columns, including the comparison columns (W-3). They are body copy (phase 03, decision 8). CLAUDE.md’s Title Case rule covers in-app entity group and settings section labels; use Title Case on the site only when quoting an app label exactly.
4. This is a new phase, 04.3 “conversion”, inserted before phase 05, in .planning/phases/04.3-conversion/. Phase 05 stays the launch flip, gated on App Store approval: the App Store badge, the Smart App Banner, and removing the coming-soon line.
