# Phase 03: pages-and-copy - Context

Status: Needs answers
Date: 2026-10-24

## Goal

Grow athandapp.com from a home page, a privacy policy, and a support page into a small product site: a rewritten Home, new Features, Pricing, and Privacy overview pages, and an expanded Support and FAQ at /support.html. A header navigation reaches every page. Every string is drafted here, approved by Jake in ANSWERS, and traceable to a section of athand-project-brief.md. The coming-soon state stays, the price is never stated, and the full privacy policy stays at /privacy.html unchanged.

## Requirements in scope

PAGE-01, PAGE-02, PAGE-03, PAGE-04, PAGE-05, PAGE-06, PAGE-07, PAGE-08.

## What the site does today

This repo at 3775bef (main, phase 02 shipped):

- Four Astro pages built with build.format "file": src/pages/index.astro, privacy.astro, support.astro, and 404.astro.
- Home, src/pages/index.astro:4-32. Title "atHand: Your Info, Ready" (index.astro:4). H1 "Your info, ready when you need it" (:6), a lede listing record types (:7), the coming-soon line "Coming soon to the App Store for iPhone." (:8), a "How it works" section (:10-14), a "Privacy in short" panel (:16-25), and a "Learn more" link list to Privacy and Support (:27-31).
- Two home strings this phase should not carry forward as written:
  - index.astro:21 "The developer runs no server and cannot see your information." The brief does not state "no server" directly; it follows only from the brief's list of network activity naming no developer service. The privacy policy (privacy.astro:8, :22) keeps it.
  - index.astro:22 "No advertising, tracking, analytics, or crash-reporting tools." Read flatly, this conflicts with ML Kit's diagnostics, which Google says it uses for diagnostics and usage analytics (privacy.astro:38). The privacy policy already words it as "The developer added no ..." (privacy.astro:17); the new copy uses that form.
- Privacy policy, src/pages/privacy.astro:4-75. Already names Apple and RevenueCat purchases (:35-36), ML Kit diagnostics (:37-38), and Apple place lookup (:39-40), matching brief Privacy at v4.12. Not changed in this phase.
- Support, src/pages/support.astro:4-49. A contact lede (:7), "What to include in your message" (:9-16), and ten questions under "Common questions" (:18-48).
- 404, src/pages/404.astro:4-13. Links home; unchanged in this phase.
- Header, src/components/Header.astro:5-10: the logo lockup link (aria-label "atHand, home") and the theme control. No navigation today.
- Footer, src/components/Footer.astro:1-12: a "Footer" nav with "Privacy" (to /privacy.html), "Support", and support@athandapp.com, then "Made by Jacob Davis".
- Layout, src/layouts/Base.astro:18-24 takes title, description, and noindex. No prop or slot tells the header which page is current.
- Styles, src/styles/site.css: header is a wrapping flex row (:60-66); `.links` gives 44px link targets (:147-159); main and footer links are underlined (:32-35); content width 68ch (:21-25). No styles exist for a header nav.

App repo davisj2007/athandapp at 60032bf3848847b642443a59178ee40e385c9850 (origin/main, read only):

- athand-project-brief.md is Brief v4.12. Sections cited below by name: Current milestone, Concept, Brand, Copy rules, Accessibility floor, Business model and entitlement, Information architecture, Entity creation and editing, Onboarding, Home, Document capture, Scan-first creation, Secure fields, App lock, Backup and restore, Contextual suggestions, Privacy, Release requirements.
- Changes since REQUIREMENTS.md was written (v4.9): v4.10 and v4.11 add Apple's geocoding service to Privacy (the policy already covers it); v4.12 sets Family Sharing off (support.astro:33 already says so). No requirement changes.
- App labels the FAQ refers to, from app/settings.tsx: section labels "Appearance" (:135, row "Theme"), "Security" (:155, row "Require Face ID"), "Contextual Surfacing" (:198, row "Context mode" with options "Off" and "Device only", :39-40), "Purchase" (:223, row "Restore purchase", :250), and "Data" (:264, row "Backup & restore"). Re-auth labels "Immediately" and "After 5 minutes" in lib/auth.ts:23-24.
- docs/store/metadata.md: App Store description drafts, written against Brief v4.11. Used only as a cross-check for tone; every site string cites the brief, not this file.
- athand-design-handoff/screenshots/: placeholders for phase 04; not used in this phase.

## Locked by the brief and CLAUDE.md

- Every product claim is literally true and cites a brief section; never "nothing leaves your phone" or an equivalent (brief, Copy rules and Privacy; CLAUDE.md, Hard rules).
- In-app style wording "Your information stays on this device" is allowed; the site says "on your iPhone" (brief, Privacy; Current milestone, iPhone only).
- Every network connection the policy names appears on the Privacy overview: Apple and RevenueCat for purchases, Google ML Kit diagnostics, and Apple's geocoding service when location is allowed (brief, Privacy; PAGE-04).
- Pricing says "one-time purchase" and states no amount; the price comes from the store (brief, Business model and entitlement; ROADMAP phase 03).
- No out-of-scope feature appears: AI suggestions, Android, iPad, sync or iCloud backup, subscriptions, Apple Health import, or Contacts auto-fill (brief, Current milestone, Out of scope; PAGE-02).
- Purchases belong to the Apple ID, restore is required, Family Sharing is off, and a backup never unlocks (brief, Business model and entitlement).
- The coming-soon state stays on every page that mentions availability until phase 05 (PAGE-08; ROADMAP).
- Zero third-party requests at runtime; outbound links are fine (CLAUDE.md).
- /privacy.html and /support.html keep their exact URLs (CLAUDE.md).
- American English, sentence case, Oxford comma, no em dashes, no emoji, curly apostrophes (CLAUDE.md; brief, Copy rules).
- atHand in prose, titles, metadata, and alt text; @Hand only in the logo lockup (CLAUDE.md; brief, Brand).
- 17px body, 16px minimum, 44px targets, no color-only meaning, 400% zoom without horizontal scrolling, reduced motion honored, AA contrast in both themes (CLAUDE.md).
- Every merge leaves the site whole (README rule 8).

## Implementation decisions

1. New pages: src/pages/features.astro builds /features.html, src/pages/pricing.astro builds /pricing.html, and the Privacy overview builds at the URL Jake picks in question 1 (default /privacy-overview.html). Support stays src/pages/support.astro at /support.html. Reason: build.format "file" (phase 02) gives each page a .html URL like the existing ones.
2. Header navigation in src/components/Header.astro: a `<nav aria-label="Main">` with four links in this order: Features, Pricing, Privacy, Support. Home is reached through the logo lockup, as today. Reason: PAGE-07; the lockup is already the home link, and a fifth "Home" link would repeat it.
3. Current page: Base.astro passes the current path to the header (from `Astro.url.pathname`). The matching nav link gets `aria-current="page"`; on the home page the lockup link gets it. The current link is marked visually by weight and a solid 3px underline, not by color alone. Reason: PAGE-07; CLAUDE.md, no color-only meaning.
4. Header layout: lockup, then nav, then the theme control, in the existing wrapping flex row. Nav links are at least 44 by 44px and wrap onto more lines at narrow widths and at 400% zoom. No menu button and no JavaScript for the nav. Reason: PAGE-07 and the 400% zoom rule; four short labels fit without a disclosure menu, and a JavaScript menu would add a failure mode.
5. Coming-soon line: one component, src/components/ComingSoon.astro, rendering the existing string "Coming soon to the App Store for iPhone." Used on Home, Features, and Pricing, the three pages that talk about getting the app. Reason: PAGE-08; phase 05 then replaces one component instead of hunting strings.
6. Footer: the "Privacy" link keeps its target, /privacy.html, and its text becomes "Privacy policy". Reason: with a header "Privacy" link going to the overview, two links both named "Privacy" with different targets would confuse screen reader users (copy entry F1).
7. Page structure: an h1, a lede, h2 sections, short paragraphs, and lists. FAQ answers stay as h3 questions with paragraph answers, not disclosure widgets, so every answer is visible, searchable with Find, and needs no JavaScript. No images in this phase. Reason: phase 04 owns visuals; the existing support page already uses this pattern.
8. Headings on the FAQ and all pages are sentence case. The "Title Case group labels" rule in CLAUDE.md mirrors the brief's rule for entity group and settings section labels inside the app; page headings are body copy. Where the site names an app label, it uses the app's own casing (for example "Contextual Surfacing" and "Restore purchase"). Reason: brief, Copy rules; consistency with the existing pages.
9. Home drops the "Learn more" link list (index.astro:27-31); the header nav and footer replace it.
10. /privacy.html and /404.html content is unchanged. Reason: phase scope; the policy is accurate to Brief v4.12.
11. Each page gets its own title in the form "Page | atHand" and its own meta description (copy entries below). Home keeps "atHand: Your Info, Ready", the App Store listing name. Reason: FND-08 pattern; brief, Brand. Athan disambiguation in metadata is SEO-04, phase 04.
12. The PR for each wave that places copy lists every claim with its brief section, taken from the Copy drafts entries it uses. Reason: PAGE-06; CLAUDE.md, Hard rules.
13. New styles go in src/styles/site.css using token variables only, matching the phase 02 approach. No new dependencies. Reason: README rule 10.

## Copy drafts

All strings are Draft until Jake approves them in ANSWERS. Entries marked "existing" are on the live site today and are listed so the approval covers every string on these pages (PAGE-06). Brief citations are to Brief v4.12. A citation of "/privacy.html" means the string repeats a statement from the policy approved in phase 01 that the brief does not spell out word for word; question 3 asks about these.

### Shared

N1. Header / nav accessible name (not visible): "Main". Not a claim. Status: Draft.
N2. Header / nav links: "Features", "Pricing", "Privacy", "Support". Not claims. Status: Draft.
F1. Footer / link to /privacy.html: "Privacy policy" (was "Privacy"). Not a claim. Status: Draft.
C1. Home, Features, Pricing / coming-soon line (existing): "Coming soon to the App Store for iPhone." Brief: Current milestone (iPhone only). Status: Draft.

### Home (/index.html)

H1. Title (existing): "atHand: Your Info, Ready". Brief: Brand (App Store listing name). Status: Draft.
H2. Meta description: "atHand keeps your household’s reference information on your iPhone and suggests the right record when it can help." Brief: Concept; Information architecture (self and household); Contextual suggestions. Status: Draft.
H3. H1 (existing): "Your info, ready when you need it". Brief: Concept. Status: Draft.
H4. Lede (existing): "atHand keeps the details you look up all the time, such as people, vehicles, pets, homes, financial accounts, and contacts, in one place on your iPhone." Brief: Concept; Information architecture. Status: Draft.
H5. Section heading: "For the moments you need it". Brief: Concept. Status: Draft.
H6. Paragraph: "At the doctor’s office, at a traffic stop, or at the airport, you need a member ID, a license number, or a passport number right away. atHand keeps them on your iPhone, for you and the people, vehicles, pets, and homes you look after." Brief: Concept (doctor’s office, traffic stop, airport); Information architecture. Status: Draft.
H7. Section heading: "What it does". Not a claim. Status: Draft.
H8. List item: "Keep records for people, vehicles, pets, homes, financial accounts, and contacts, or make a custom record for anything else." Brief: Information architecture. Status: Draft.
H9. List item: "Scan a driver’s license, passport, insurance card, VIN, vaccine record, or business card instead of typing. You check every field before it is saved." Brief: Document capture; Scan-first creation. Status: Draft.
H10. List item: "Get a suggestion for the record that is likely to help right now, based on the time of day and, if you allow them, your calendar and location." Brief: Contextual suggestions. Status: Draft.
H11. List item: "Lock atHand with Face ID, Touch ID, or your device passcode, and export an encrypted backup protected by a passphrase you choose." Brief: App lock; Backup and restore. Status: Draft.
H12. Link: "See all features" (to /features.html). Not a claim. Status: Draft.
H13. Section heading (existing): "Privacy in short". Not a claim. Status: Draft.
H14. List item: "Your information stays on your iPhone. It leaves only inside an encrypted backup file that you choose to export." Brief: Privacy (first bullet). Status: Draft.
H15. List item (existing): "There is no account and no sign-in." Brief: Concept (no account). Status: Draft.
H16. List item: "atHand connects to Apple and RevenueCat for purchases, to Google for anonymous scanning diagnostics, and, if you allow location, to Apple to look up the name of a nearby place. It never sends your scans, photos, recognized text, or anything you enter." Brief: Privacy (v1 network activity). Status: Draft.
H17. List item: "The developer added no advertising, tracking, analytics, or crash-reporting tools." Brief: Privacy (no analytics, advertising, tracking, or crash-reporting SDKs). Status: Draft.
H18. Links: "How atHand handles your information" (to the Privacy overview) and "Read the full privacy policy" (to /privacy.html). Not claims. Status: Draft.
H19. Section heading: "Free to start". Brief: Business model and entitlement. Status: Draft.
H20. Paragraph: "Your own record is free. A one-time purchase unlocks everything else. There is no subscription." Brief: Business model and entitlement (Free vs paid; no subscription at launch). Status: Draft.
H21. Link: "See pricing" (to /pricing.html). Not a claim. Status: Draft.
H22. Removed (existing, no replacement): "How it works" section, index.astro:10-14; its points move into H8 to H11. "The developer runs no server and cannot see your information." (index.astro:21). The unqualified "No advertising, tracking, analytics, or crash-reporting tools." (index.astro:22), replaced by H17. "Read the full privacy policy." sentence (index.astro:24), replaced by H18. "Learn more" list (index.astro:27-31). Status: Draft (removal).

### Features (/features.html)

FE1. Title: "Features | atHand". Not a claim. Status: Draft.
FE2. Meta description: "What atHand does on iPhone: records for your household, document scanning, suggestions, app lock, and encrypted backups." Brief: Current milestone (in scope). Status: Draft.
FE3. H1: "Features". Not a claim. Status: Draft.
FE4. Lede: "atHand stores the details you look up all the time and brings up the right record when it can help." Brief: Concept. Status: Draft.
FE5. Section heading: "Records for everything you look after". Brief: Information architecture. Status: Draft.
FE6. Paragraph: "Add records for people, vehicles, pets, homes, financial accounts, and contacts, or make a custom record with your own labels." Brief: Information architecture (Custom: user-defined labels). Status: Draft.
FE7. Paragraph: "Each detail is stored once, on the record it belongs to. A person holds identity, medical, insurance, and document details. A vehicle holds its plate, VIN, insurance, and roadside assistance number. A pet holds its microchip number, vet, and vaccine records." Brief: Information architecture (Person, Vehicle, Pet; store each field once). Status: Draft.
FE8. Paragraph: "Contacts, such as a doctor, a mechanic, or a vet, are records of their own, and you can link one to any person, pet, or vehicle." Brief: Information architecture (Contact). Status: Draft.
FE9. Paragraph: "Adding a record takes you through one section at a time, and you can save and close at any step. To make a change later, pick the section you want to edit." Brief: Entity creation and editing. Status: Draft.
FE10. Section heading: "Scan instead of typing". Brief: Document capture. Status: Draft.
FE11. Paragraph: "Scan a driver’s license, passport, insurance card, VIN, vaccine record, utility bill, payment card, or business card." Brief: Document capture (Tier A and Tier B); Scan-first creation (business card). Status: Draft.
FE12. Paragraph: "atHand reads the barcode on a driver’s license and the machine-readable lines in a passport, and suggests matches from the text on other documents. Recognition runs on your iPhone." Brief: Document capture; Privacy. Status: Draft.
FE13. Paragraph: "Nothing is saved until you check it. atHand marks any field it is unsure of with “Check this,” and you can correct any field or retake the photo before saving." Brief: Document capture (read once, confirm before saving; shared confirmation screen). Status: Draft.
FE14. Paragraph: "Start with Scan to add on the home screen and atHand works out what kind of record the document belongs to. It recognizes licenses, passports, VINs, and contact QR codes, and asks you to choose for anything else." Brief: Scan-first creation. Status: Draft.
FE15. Section heading: "The right record at the right time". Brief: Concept (contextual surfacing). Status: Draft.
FE16. Paragraph: "atHand can suggest a record when it is likely to help, such as before an appointment on your calendar." Brief: Contextual suggestions. Status: Draft.
FE17. Paragraph: "Suggestions use the time of day, the day of the week, the records you used recently, whether your iPhone is connected to your car, and, if you allow them, your calendar and location. Matching runs on your iPhone." Brief: Contextual suggestions (Device only signals). Status: Draft.
FE18. Paragraph: "If you allow location, Apple’s geocoding service receives your location to return the name of a nearby place. Read how atHand handles your information." The second sentence links to the Privacy overview. Brief: Contextual suggestions; Privacy. Status: Draft.
FE19. Paragraph: "A suggestion says only that a record is ready. It never names a category, such as medical. When nothing matches with confidence, atHand shows no suggestion, and you can turn suggestions off at any time." Brief: Contextual suggestions (banner never names a category; no weak guesses; Off). Status: Draft.
FE20. Section heading: "Locked to you". Brief: App lock. Status: Draft.
FE21. Paragraph: "Lock atHand with Face ID or Touch ID, with your device passcode as the fallback. There is no separate password to remember." Brief: App lock (no in-app password). Status: Draft.
FE22. Paragraph: "The lock is on by default when your iPhone has Face ID, Touch ID, or a passcode set up. Choose whether atHand locks again as soon as you leave it, or after 5 minutes, 30 minutes, or 1 hour." Brief: App lock (default on; re-auth timing). Status: Draft.
FE23. Paragraph: "When you switch away from atHand, a cover hides your information in the app switcher, whether or not the lock is on." Brief: App lock (privacy cover). Status: Draft.
FE24. Paragraph: "Sensitive numbers, such as passport numbers, account numbers, alarm codes, and Wi-Fi passwords, stay hidden until you tap Reveal, and hide again when you leave the app." Brief: Secure fields. Status: Draft.
FE25. Section heading: "Backups you control". Brief: Backup and restore. Status: Draft.
FE26. Paragraph: "Export an encrypted backup of your records and photos, protected by a passphrase you choose, and save it wherever you like." Brief: Backup and restore (export; share sheet). Status: Draft.
FE27. Paragraph: "A backup is a one-time copy, not sync. Importing one replaces all the data on that iPhone, and atHand asks you to confirm first." Brief: Backup and restore. Status: Draft.
FE28. Paragraph: "A backup never includes your purchase, your settings, or your app lock setting." Brief: Backup and restore (never included). Status: Draft.
FE29. Section heading: "Light and dark". Brief: Brand. Status: Draft.
FE30. Paragraph: "atHand follows your iPhone’s appearance, or you can choose Light or Dark in Settings." Brief: Brand (System / Light / Dark setting). Status: Draft.
FE31. Accessibility section: not drafted. See question 2.

### Pricing (/pricing.html)

P1. Title: "Pricing | atHand". Not a claim. Status: Draft.
P2. Meta description: "atHand is a free download. A one-time purchase unlocks every record type. There is no subscription." Brief: Business model and entitlement. Status: Draft.
P3. H1: "Pricing". Not a claim. Status: Draft.
P4. Lede: "atHand is a free download. A one-time purchase unlocks full use. There is no subscription, no ads, and no account." Brief: Business model and entitlement (free download; one-time purchase; no subscription; paywall perk "No subscription, no ads, no account"). Status: Draft.
P5. Section heading: "Free". Brief: Business model and entitlement (Free vs paid). Status: Draft.
P6. Paragraph: "Without a purchase, you can:" Not a claim. Status: Draft.
P7. List: "Create, view, and edit your own record." / "Scan documents and attach photos to your own record." / "Use the app lock, appearance, and suggestion settings." / "Export and import backups." Brief: Business model and entitlement (Free vs paid, free list). Status: Draft.
P8. Section heading: "One-time purchase". Brief: Business model and entitlement. Status: Draft.
P9. Paragraph: "The unlock adds:" Not a claim. Status: Draft.
P10. List: "Records for your household, vehicles, pets, homes, financial accounts, contacts, and custom records." / "Scanning documents for every record, not just yours." / "Opening every record, including records that arrive in a backup you import." Brief: Business model and entitlement (Requires the unlock; paywall perks). Status: Draft.
P11. Paragraph: "You pay once, and the unlock is yours to keep. The App Store shows the price in your local currency before you buy." Brief: Business model and entitlement (paywall price line "One time. Yours to keep."; localized store price, never a hardcoded amount). Status: Draft.
P12. Section heading: "Your purchase and your Apple ID". Brief: Business model and entitlement (Scope of a purchase). Status: Draft.
P13. Paragraph: "A purchase belongs to the Apple ID you used to buy it. It unlocks every iPhone signed in to that Apple ID after you tap Restore purchase." Brief: Business model and entitlement (Scope of a purchase; Restore purchase on the paywall and in Settings). Status: Draft.
P14. Paragraph: "Someone with a different Apple ID, such as a partner, buys separately. Family Sharing is not available for the unlock." Brief: Business model and entitlement (a different Apple ID must buy separately; Family Sharing off). Status: Draft.
P15. Paragraph: "Purchases are handled by Apple." Brief: Business model and entitlement (paywall links). Status: Draft.
P16. Section heading: "Backups never unlock". Brief: Business model and entitlement (Import never unlocks). Status: Draft.
P17. Paragraph: "A backup file carries your information only, never the purchase. On a new iPhone, tap Restore purchase to unlock atHand with your Apple ID." Brief: Business model and entitlement. Status: Draft.
P18. Paragraph: "If you import a backup without the unlock, every record in it still appears on your home screen. Your own record stays free, and opening any other record asks you to unlock." Brief: Business model and entitlement (Free vs paid rules: self flag travels in backups; locked entities still appear; tapping opens the paywall). Status: Draft.
P19. Link: "Questions about purchases? See Support." with "See Support" linking to /support.html. Not a claim. Status: Draft.

### Privacy overview (URL per question 1)

V1. Title: "How atHand handles your information | atHand". Not a claim. Status: Draft.
V2. Meta description: "A plain-language summary of what stays on your iPhone and every connection atHand makes." Brief: Privacy. Status: Draft.
V3. H1: "How atHand handles your information". Not a claim. Status: Draft.
V4. Lede: "Your information stays on your iPhone. This page explains, in plain language, when atHand connects to an outside service and what each one receives. The full privacy policy has every detail." Brief: Privacy. Status: Draft.
V5. Section heading: "What stays on your iPhone". Brief: Privacy. Status: Draft.
V6. Paragraph: "Everything you add to atHand, including your records, scans, and photos, is stored on your iPhone. It leaves your iPhone only inside an encrypted backup file that you choose to export and share." Brief: Privacy (first bullet); Information architecture (photos stay on the device except inside an encrypted backup). Status: Draft.
V7. Paragraph: "There is no account and no sign-in, and the developer cannot see your information." Brief: Concept (no account); Privacy (personal information never leaves the device except in a backup the user shares). Status: Draft.
V8. Paragraph: "Scanning runs on your iPhone. atHand never sends your scans, photos, recognized text, or anything you enter to any service." Brief: Privacy (no scans, photos, recognized text, or user-entered information are ever sent). Status: Draft.
V9. Section heading: "When atHand connects to the internet". Brief: Privacy. Status: Draft.
V10. Paragraph: "atHand makes three kinds of connection. None of them carries your records, scans, photos, or anything you type." Brief: Privacy (v1 network activity is limited to three). Status: Draft.
V11. Subheading: "Purchases: Apple and RevenueCat". Brief: Privacy. Status: Draft.
V12. Paragraph: "When you buy or restore the unlock, Apple handles the purchase and RevenueCat, a purchase service, confirms it so atHand can unlock. The privacy policy lists what RevenueCat receives." Brief: Privacy; Business model and entitlement (RevenueCat confirms the entitlement). Status: Draft.
V13. Subheading: "Scanning diagnostics: Google". Brief: Privacy. Status: Draft.
V14. Paragraph: "The scanning library, Google ML Kit, sends Google anonymous diagnostics: your iPhone model, iOS version, the app’s version, a random per-installation identifier, and performance data." Brief: Privacy (ML Kit diagnostics list). Status: Draft.
V15. Subheading: "Place lookup: Apple, only if you allow location". Brief: Privacy. Status: Draft.
V16. Paragraph: "If you allow location for suggestions, Apple’s geocoding service receives your location coordinates and returns the name of a nearby place. atHand sorts that name into a category on your iPhone, then discards the coordinates." Brief: Privacy; Contextual suggestions (coordinates discarded after categorization). Status: Draft.
V17. Paragraph: "As with any internet connection, these services can see your device’s IP address." Brief: Privacy names the connections; the IP address statement comes from /privacy.html. See question 3. Status: Draft.
V18. Section heading: "What atHand leaves out". Not a claim. Status: Draft.
V19. List: "The developer added no advertising, tracking, analytics, or crash-reporting tools." / "atHand keeps your personal information out of its logs." Brief: Privacy (no analytics, advertising, tracking, or crash-reporting SDKs; no personal data in logs). Status: Draft.
V20. Section heading: "Optional permissions". Brief: Onboarding (permissions optional). Status: Draft.
V21. Paragraph: "Camera, photos, calendar, and location access are all optional. atHand works without them, and you can change each one in iPhone Settings." Brief: Onboarding (step 5, optional permissions); /privacy.html (Optional permissions). See question 3. Status: Draft.
V22. Paragraph: "If you allow calendar access, atHand compares the titles of upcoming events with a keyword list on your iPhone. Event details are never sent." Brief: Contextual suggestions (calendar keywords against a local keyword table); Privacy. Status: Draft.
V23. Section heading: "The full policy". Not a claim. Status: Draft.
V24. Paragraph: "Read the full privacy policy for every detail, including what each service receives and how to delete your data. Questions? Email support@athandapp.com." "full privacy policy" links to /privacy.html; the address is a mailto link. Not a claim. Status: Draft.

### Support and FAQ (/support.html)

S1. Title (existing): "Support | atHand". Not a claim. Status: Draft.
S2. Meta description (existing): "Get help with atHand: contact details and answers to common questions." Not a claim. Status: Draft.
S3. H1 (existing): "Support". Status: Draft.
S4. Lede (existing): "Need help with atHand? Email support@athandapp.com." Status: Draft.
S5. Section heading (existing): "What to include in your message". Status: Draft.
S6. List (existing): "What you were trying to do, and what happened instead." / "Your iPhone model and iOS version." / "The atHand version, if you know it." / "Any error message you saw, word for word." Status: Draft.
S7. Paragraph (existing): "Please do not send passphrases, document images, or other sensitive details. I do not need them to help." Status: Draft.
S8. Replaced: the single "Common questions" heading (support.astro:18) gives way to the group headings S9, S20, S33, S40, S47, S52, and S57. Status: Draft (removal).

Backups

S9. Section heading: "Backups". Status: Draft.
S10. Question (existing): "How do backups work?" Status: Draft.
S11. Answer: "You can export an encrypted backup file, protected by a passphrase you choose. You then share the file wherever you want to keep it. A backup is a one-time copy, not sync. The developer never receives the file." Existing answer plus the "one-time copy" sentence. Brief: Backup and restore; Privacy. Status: Draft.
S12. Question: "How do I move atHand to a new iPhone?" Status: Draft.
S13. Answer: "On your old iPhone, open Settings in atHand, choose Backup & restore, and export a backup. Save it somewhere your new iPhone can reach, such as the Files app. On the new iPhone, import the backup and enter your passphrase. Then tap Restore purchase to unlock." Brief: Backup and restore; Business model and entitlement (import never unlocks; restore). App label: Data, "Backup & restore" (app/settings.tsx:268). Status: Draft.
S14. Question: "What happens when I import a backup?" Status: Draft.
S15. Answer: "Importing replaces all the data on that iPhone with the data in the backup. atHand warns you first and asks you to confirm with Replace all data. If the passphrase is wrong, the import stops before anything changes." Brief: Backup and restore (explicit warning; "Replace all data"; a wrong passphrase fails before any data is touched). Status: Draft.
S16. Question: "How is my backup protected?" Status: Draft.
S17. Answer: "atHand encrypts the file with AES-256, using keys made from your passphrase with PBKDF2. An HMAC-SHA256 check means a changed or damaged file is rejected before it is opened." Brief: Backup and restore (Encryption). Status: Draft.
S18. Question (existing) and answer (existing): "What happens if I lose my backup passphrase?" / "The backup cannot be opened. The developer has no access to your passphrase and cannot recover it or the backup. Store your passphrase somewhere safe." Status: Draft.
S19. Question and answer: "What does a backup include?" / "Your records and their photos. A backup never includes your purchase, your settings, or your app lock setting." Brief: Backup and restore (export contents; never included). Status: Draft.

Purchases

S20. Section heading: "Purchases". Status: Draft.
S21. Question: "How much does atHand cost?" Status: Draft.
S22. Answer: "atHand is a free download. The unlock is a one-time purchase, and the App Store shows its price in your local currency before you buy. See Pricing for what is free and what the unlock adds." "See Pricing" links to /pricing.html. Brief: Business model and entitlement. Status: Draft.
S23. Question (existing): "How do I restore my purchase?" Status: Draft.
S24. Answer (existing): "Open atHand on an iPhone signed in to the Apple ID you used to buy the unlock, then tap Restore purchase in Settings or on the unlock screen. If it does not work, email me." Brief: Business model and entitlement. Status: Draft.
S25. Question (existing): "What is free, and what does the unlock add?" Status: Draft.
S26. Answer (existing): "Your own record is free, including scanning, the app lock, and backups. A one-time purchase unlocks records for your household, vehicles, pets, homes, financial accounts, contacts, and custom records. There is no subscription." Brief: Business model and entitlement. Status: Draft.
S27. Question (existing): "Can my family use my purchase?" Status: Draft.
S28. Answer (existing): "A purchase covers every iPhone signed in to your Apple ID. Someone with a different Apple ID buys separately. Family Sharing is not available for the unlock." Brief: Business model and entitlement. Status: Draft.
S29. Question (existing): "Does importing a backup unlock atHand?" Status: Draft.
S30. Answer (existing): "No. A backup carries your information only, never the purchase. Use Restore purchase on the new iPhone." Brief: Business model and entitlement. Status: Draft.
S31. Question: "Why are some records locked after I import a backup?" Status: Draft.
S32. Answer: "Records other than your own need the unlock. They still appear on your home screen, and tapping one opens the unlock screen. If you already bought the unlock with this Apple ID, tap Restore purchase." Brief: Business model and entitlement (locked entities still appear; tapping opens the paywall). Status: Draft.

App lock

S33. Section heading: "App lock". Status: Draft.
S34. Question (existing): "How do I turn on the app lock?" Status: Draft.
S35. Answer (existing): "The app lock is on by default when your iPhone has Face ID, Touch ID, or a passcode set up. You can turn it off, or change how soon it locks again, in atHand’s Settings." Brief: App lock. Status: Draft.
S36. Question: "Is there an atHand password?" Status: Draft.
S37. Answer: "No. atHand uses Face ID, Touch ID, or your device passcode, never a separate password. Turning the lock on or off asks you to confirm with one of them." Brief: App lock (no in-app password; turning the lock on or off requires authentication). Status: Draft.
S38. Question: "Why can’t I turn on the app lock?" Status: Draft.
S39. Answer: "The lock needs Face ID, Touch ID, or a device passcode. If none is set up, set a passcode in iPhone Settings, then turn the lock on in atHand." Brief: App lock (if nothing is enrolled, the toggle is disabled and the screen explains how to set a passcode). Status: Draft.

Scanning

S40. Section heading: "Scanning". Status: Draft.
S41. Question and answer: "Which documents can I scan?" / "Driver’s licenses, passports, insurance cards, VINs, vaccine records, utility bills, payment cards, and business cards." Brief: Document capture; Scan-first creation. Status: Draft.
S42. Question: "What if a scan reads something wrong?" Status: Draft.
S43. Answer: "Every scan opens a check screen before anything is saved. atHand marks any field it is unsure of with “Check this.” Correct any field, or tap the photo to retake it." Brief: Document capture (shared confirmation screen; tap thumbnail to retake). Status: Draft.
S44. Question and answer: "Can I add a record without scanning?" / "Yes. When you add a record, choose Enter manually." Brief: Scan-first creation. Status: Draft.
S45. Question: "Are my scans sent anywhere?" Status: Draft.
S46. Answer: "No. Recognition runs on your iPhone, and atHand never sends your scans, photos, or the text read from them. The scanning library does send Google anonymous diagnostics, described in the privacy policy." "privacy policy" links to /privacy.html. Brief: Privacy. Status: Draft.

Suggestions

S47. Section heading: "Suggestions". Status: Draft.
S48. Question: "How do suggestions work?" Status: Draft.
S49. Answer: "atHand compares signals such as the time of day and, if you allow them, your calendar and location with your records, on your iPhone. If you allow location, Apple’s geocoding service returns the name of a nearby place. When nothing matches with confidence, atHand shows nothing." Brief: Contextual suggestions; Privacy. Status: Draft.
S50. Question: "How do I turn suggestions off?" Status: Draft.
S51. Answer: "In atHand’s Settings, under Contextual Surfacing, set Context mode to Off." Brief: Contextual suggestions (Off). App labels: app/settings.tsx:198-200, :39. Status: Draft.

Permissions and your data

S52. Section heading: "Permissions and your data". Status: Draft.
S53. Question and answer (existing): "Which permissions are optional?" / "Calendar and location access are both optional. atHand works without them, and you can change them at any time in iPhone Settings. Camera access for scanning and the app lock are also your choice. See the privacy policy for what each one does." Status: Draft.
S54. Question and answer (existing): "How do I delete all my data?" / "Delete the app from your iPhone. This removes all of its data from the device. Backup files you exported are stored separately, so delete those as well if you no longer want them." Status: Draft.
S55. Question and answer: "Where can I read how atHand handles my information?" / "The privacy overview explains it in plain language, and the privacy policy has every detail." Links to the Privacy overview and /privacy.html. Not a claim. Status: Draft.

About atHand

S57. Section heading: "About atHand". Status: Draft.
S58. Question and answer (existing, moved): "Which devices does atHand support?" / "iPhone only." Brief: Current milestone. Status: Draft.

## Open questions for Jake

1. What URL should the Privacy overview page use? Recommended default: /privacy-overview.html, with the header link labeled "Privacy" and the footer link to the full policy renamed "Privacy policy" (entry F1). Reason: the overview needs its own permanent-looking URL, separate from /privacy.html, which must never move; "overview" says what it is, and the two link names stay distinct.
2. Should the Features page say atHand works with VoiceOver and larger text sizes? Recommended default: leave it out of this phase and revisit in phase 04 once the app's TestFlight VoiceOver and Dynamic Type passes (brief, Release requirements, Quality gates) are recorded as done. Reason: the brief makes these requirements, and the app repo's phase 07 acceptance is still in progress, so saying it today would state a goal as a fact.
3. May the site repeat statements that come from the approved privacy policy but are not spelled out in the brief? This covers V17 (services can see your device’s IP address) and V21 (camera and photos access is optional; the brief names calendar and location as optional). Recommended default: yes. Reason: both were checked when the policy was written in phase 01, both make the copy more complete rather than more flattering, and leaving out the IP address line would make the overview less accurate than the policy.
4. Should the support FAQ describe the purchase error, cancellation, and Ask to Buy states? Recommended default: no, not in this phase. Reason: the brief requires clear copy in the app for those states but does not say what the user should do, so any FAQ answer would describe app behavior the brief does not fix; add it later from the shipped app’s wording if support email shows the need.

Copy awaits approval: every entry above is Draft.

## Out of scope

- Changes to /privacy.html or /404.html content.
- Screenshots, the phone frame, Open Graph tags and image, favicon, apple-touch-icon, sitemap, robots.txt, JSON-LD, and Athan disambiguation in metadata (phase 04).
- The full accessibility audit with axe and VoiceOver (phase 04). This phase still meets the CLAUDE.md floor for what it builds.
- App Store badge, App Store link, the apple-itunes-app meta tag, and removing the coming-soon line (phase 05).
- Any statement of price.
