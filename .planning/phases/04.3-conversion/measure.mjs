// Phase 04.3 acceptance measurements over a built site, in Chromium through
// the project's pinned Playwright. A planning tool for the phase's verify
// commands; it is not a site check and is not wired into package.json.
// Usage: node .planning/phases/04.3-conversion/measure.mjs <check> [--ref]
// Checks:
//   hero      CNV-01: hero order, the four chips, and the 56px store slot
//   slot      CNV-07: a 48px badge in the store slot moves nothing around it
//   rows      CNV-02: Home's five feature rows as live cards; only the planned shots load
//   compare   CNV-03: the comparison list at 320, 390, 1280, and 400% zoom, and its reading structure
//   features  CNV-04: the Features page top, seven-link jump list, seven sections, and the Light and dark frames
//   wrap      CNV-07: no heading or paragraph on Home or Features ends on a one-word line
// --ref measures the design's reference builds (served from the repo root)
// instead of dist/, for the structure checks; their copy predates ANSWERS, so
// copy failures there are expected. Exits 1 on any failure.
import { resolve } from "node:path";
import { chromium } from "playwright";
import { openPage, pageUrl, startServer } from "../../../scripts/check-layout.mjs";

const args = process.argv.slice(2);
const check = args[0];
const ref = args.includes("--ref");

const STATES = {
  light: { stored: "light", os: "light" },
  dark: { stored: "dark", os: "dark" },
};

const VIEWPORTS = {
  320: { viewport: { width: 320, height: 640 } },
  390: { viewport: { width: 390, height: 844 } },
  840: { viewport: { width: 840, height: 900 } },
  1280: { viewport: { width: 1280, height: 800 } },
  "400%": { viewport: { width: 320, height: 200 }, deviceScaleFactor: 4 },
};

// Approved copy (phase 04.3 CONTEXT.md, Copy drafts).
const H1 = "Your household’s IDs and insurance, ready on your iPhone";
const CHIPS = ["No account", "Stored on your iPhone", "Face ID or passcode lock", "One-time purchase, no subscription"];
const C1 = "Coming soon to the App Store for iPhone.";
const ROWS = ["Everything you look after", "Scan instead of typing", "The right record at the right time", "Hidden until you need it", "Locked to you"];
const ROW_CLASSES = ["f-span", "f-split", "f-center", "f-split flip", "f-lock"];
const TYPES = ["People", "Vehicles", "Pets", "Homes", "Financial accounts", "Contacts", "Custom records"];
const SIGNALS = ["Time of day", "Your calendar, if you allow it", "Your location, if you allow it"];
const UNLOCK = ["Face ID", "Touch ID", "Your passcode"];
const BANNER = "Example suggestion banner: Flight to Denver, your recommended info is ready";
const COLUMNS = ["Photos of cards", "A notes app", "atHand"];
const COMPARE = [
  ["Finding the right detail fast", [
    ["Partly", "Find the photo, then zoom in to read the number."],
    ["Partly", "Search finds it if you typed it in."],
    ["Yes", "Each detail has its own labeled field."]]],
  ["Records for the whole household in one place", [
    ["No", "Photos can share an album, but they are not organized by record."],
    ["Partly", "Up to you to set up, and not organized by record."],
    ["Yes", "A record for each person, vehicle, pet, and home."]]],
  ["Locked behind Face ID", [
    ["Partly", "Only if you move them to a locked album."],
    ["Varies", "Some apps can lock individual notes."],
    ["Yes", "Face ID, Touch ID, or your passcode."]]],
  ["No account to create", [
    ["Yes", "Taking a photo needs no account."],
    ["Varies", "Depends on the app."],
    ["Yes", "No account and no sign-in."]]],
  ["Suggests a record when it can help", [
    ["No", "You look it up yourself."],
    ["No", "You look it up yourself."],
    ["Yes", "From the time of day and, if you allow them, your calendar and location."]]],
];
const JUMP = [
  ["Records", "records"],
  ["Scanning", "scanning"],
  ["Suggestions", "suggestions"],
  ["Hidden until you need it", "hidden"],
  ["App lock", "app-lock"],
  ["Backups", "backups"],
  ["Light and dark", "light-and-dark"],
];
const H2S = ["Records for everything you look after", "Scan instead of typing", "The right record at the right time", "Hidden until you need it", "Locked to you", "Backups you control", "Light and dark"];
const INTROS = [
  "Everything you look after, each in its own record.",
  "Point your camera at a document, then check what atHand read.",
  "atHand can suggest a record before you go looking for it.",
  "Sensitive numbers stay masked until you tap Reveal.",
  "Face ID, Touch ID, or your passcode. No password to remember.",
  "An encrypted copy of your records, saved where you choose.",
  "Light or dark, your choice.",
];
const FE24 = "Sensitive numbers, such as passport numbers, account numbers, alarm codes, and Wi-Fi passwords, stay hidden until you tap Reveal, and hide again when you leave the app.";
const BACKUP_FACTS = ["Your records and photos", "Saved wherever you like", "A one-time copy, not sync"];
const HOME_SHOTS = ["01-home", "04-check-what-we-read", "07-paywall-perks"];

const HEADINGS = "main :is(.hero h1, .section-title, .f-copy h3, .moment h3, .band h2, .fsec h2, .cmp-q, .prose h2, .prose h3, .page-top h1)";
const PARAGRAPHS = "main :is(.lede, .section-line, .f-copy p, .fsec-intro, .prose p, .prose li, .facts li)";

const norm = (s) => (s || "").replace(/\s+/g, " ").trim();
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);

// Lines of an element's rendered text: words grouped by the top of their box.
// A token of punctuation alone joins the word before it. Visually hidden text
// (1px boxes) is left out. Same as phase 04.2's measure.mjs.
function linesOf(el) {
  const words = [];
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  for (let node = walker.nextNode(); node; node = walker.nextNode()) {
    const box = node.parentElement.getBoundingClientRect();
    if (box.width <= 1 || box.height <= 1) continue;
    for (const m of node.data.matchAll(/\S+/g)) {
      const range = document.createRange();
      range.setStart(node, m.index);
      range.setEnd(node, m.index + m[0].length);
      const rect = range.getClientRects()[0];
      if (!rect) continue;
      if (/^[.,;:!?”’)]+$/.test(m[0]) && words.length) {
        words[words.length - 1].text += m[0];
        continue;
      }
      words.push({ text: m[0], top: rect.top });
    }
  }
  const lines = [];
  for (const w of words) {
    const line = lines.find((l) => Math.abs(l.top - w.top) < 4);
    if (line) line.words.push(w.text);
    else lines.push({ top: w.top, words: [w.text] });
  }
  return lines.sort((a, b) => a.top - b.top).map((l) => l.words);
}

async function contextFor(browser, origin, state, options, requests) {
  const context = await browser.newContext({ ...options, colorScheme: state.os, reducedMotion: "reduce" });
  await context.addInitScript((t) => {
    try {
      localStorage.setItem("athand-theme", t);
    } catch (e) {}
  }, state.stored);
  await context.route("**/*", (route) => {
    const url = route.request().url();
    if (requests) requests.push(url);
    if (url.startsWith(origin + "/")) return route.continue();
    return route.abort();
  });
  return context;
}

function urlFor(origin, page, state) {
  if (!ref) return pageUrl(origin, page);
  const name = page === "index.html" ? "home" : "features";
  return `${origin}/.planning/phases/04.3-conversion/design/${name}-reference-${state}.html`;
}

// Scrolls to the end in steps so lazy images load, then waits for the network.
async function scrollThrough(page) {
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 400) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 30));
    }
  });
  await page.waitForLoadState("networkidle");
}

const shotsOf = (requests) => [...new Set(requests.map((u) => u.match(/\/(0\d-[a-z-]+?)-(?:light|dark)[^/]*\.(?:png|webp)/)?.[1]).filter(Boolean))];

const checks = {
  async hero(run) {
    for (const width of [320, 390, 840, 1280]) {
      for (const state of ["light", "dark"]) {
        await run("index.html", state, width, async (p, at, fail, note) => {
          const r = await p.evaluate(() => {
            const copy = document.querySelector("main .hero-copy");
            if (!copy) return null;
            const chips = copy.querySelector("ul.chips");
            const slot = copy.querySelector(".store-slot");
            const vw = document.documentElement.clientWidth;
            const lines = (el) => {
              // Text lines only: the icon's rect is not a line of text (its top
              // differs from the text's by a fraction of a pixel, or sits
              // between two lines when the chip wraps).
              const rects = [...el.childNodes].filter((n) => n.nodeType === Node.TEXT_NODE).flatMap((n) => {
                const range = document.createRange();
                range.selectNodeContents(n);
                return [...range.getClientRects()];
              });
              return new Set(rects.filter((r) => r.width > 1).map((r) => Math.round(r.top))).size;
            };
            const items = chips ? [...chips.children] : [];
            return {
              order: [...copy.children].map((c) => c.tagName + (c.classList.length ? "." + [...c.classList].join(".") : "")),
              h1: copy.querySelector("h1")?.textContent,
              label: chips?.getAttribute("aria-label"),
              chips: items.map((li) => ({
                tag: li.tagName,
                cls: li.className,
                text: li.textContent,
                lines: lines(li),
                controls: li.querySelectorAll("a, button, [tabindex]").length,
                cursor: getComputedStyle(li).cursor,
                svgHidden: [...li.querySelectorAll("svg")].every((s) => s.getAttribute("aria-hidden") === "true"),
                right: li.getBoundingClientRect().right,
                top: Math.round(li.getBoundingClientRect().top),
              })),
              vw,
              slot: slot && {
                minHeight: getComputedStyle(slot).minHeight,
                height: slot.getBoundingClientRect().height,
                kids: [...slot.children].map((c) => c.tagName + "." + c.className + ":" + c.textContent.trim()),
              },
            };
          });
          if (!r) return fail(`${at}: no .hero-copy`);
          if (!same(r.order.map((o) => o.split(".")[0] + (o.includes("lede") ? ".lede" : o.includes("chips") ? ".chips" : o.includes("store-slot") ? ".store-slot" : "")), ["H1", "P.lede", "UL.chips", "DIV.store-slot"])) fail(`${at}: hero copy order ${r.order.join(", ")}`);
          if (norm(r.h1) !== H1) fail(`${at}: h1 "${norm(r.h1)}"`);
          if (r.label !== "At a glance") fail(`${at}: chip list name "${r.label}"`);
          if (!same(r.chips.map((c) => norm(c.text)), CHIPS)) fail(`${at}: chips ${r.chips.map((c) => norm(c.text)).join(" | ")}`);
          r.chips.forEach((c, i) => {
            if (c.tag !== "LI" || !/\bchip\b/.test(c.cls)) fail(`${at}: chip ${i + 1} is ${c.tag}.${c.cls}`);
            if (c.controls) fail(`${at}: chip ${i + 1} holds a control`);
            if (c.cursor === "pointer") fail(`${at}: chip ${i + 1} has a pointer cursor`);
            if (!c.svgHidden) fail(`${at}: chip ${i + 1} icon is not aria-hidden`);
            if (c.right > r.vw - 16 + 0.5) fail(`${at}: chip ${i + 1} ends at ${c.right}, past the gutter`);
            const allowed = i === 3 && width === 320 ? 2 : 1;
            if (c.lines > allowed) fail(`${at}: chip ${i + 1} sets on ${c.lines} lines`);
          });
          note(`${at}: chip rows ${new Set(r.chips.map((c) => c.top)).size}`);
          if (!r.slot) return fail(`${at}: no .store-slot`);
          if (r.slot.minHeight !== "56px") fail(`${at}: store slot min-height ${r.slot.minHeight}`);
          if (r.slot.height < 56 - 0.5) fail(`${at}: store slot ${r.slot.height}px tall`);
          if (r.slot.kids.length !== 1 || !r.slot.kids[0].startsWith("P.coming-soon:") || !r.slot.kids[0].endsWith(C1)) fail(`${at}: store slot holds ${r.slot.kids.join(" | ")}`);
        });
      }
    }
  },

  async slot(run) {
    for (const width of [320, 390, 1280]) {
      await run("index.html", "light", width, async (p, at, fail, note) => {
        const box = () =>
          p.evaluate(() => {
            const slot = document.querySelector("main .store-slot");
            if (!slot) return null;
            const r = (el) => (el ? [Math.round(el.getBoundingClientRect().top * 2) / 2, Math.round(el.getBoundingClientRect().height * 2) / 2] : null);
            return {
              slot: r(slot),
              h1: r(document.querySelector("main .hero h1")),
              chips: r(document.querySelector("main .hero .chips")),
              shot: r(document.querySelector("main .hero-shot")),
              next: r(document.querySelector("main .hero").nextElementSibling),
            };
          });
        const before = await box();
        if (!before) return fail(`${at}: no .store-slot`);
        // A stand-in for the App Store badge at --space-12 (48px) tall.
        await p.evaluate(() => {
          document.querySelector("main .store-slot").innerHTML = '<span style="display:block;width:144px;height:48px"></span>';
        });
        const after = await box();
        for (const k of Object.keys(before)) {
          if (!same(before[k], after[k])) fail(`${at}: ${k} moved from ${before[k]} to ${after[k]} with a 48px badge`);
        }
        note(`${at}: slot ${before.slot[1]}px`);
      });
    }
  },

  async rows(run) {
    for (const width of [390, 1280]) {
      for (const state of ["light", "dark"]) {
        await run("index.html", state, width, async (p, at, fail, note, requests) => {
          const r = await p.evaluate((wide) => {
            const list = document.querySelector("main ul.f-list");
            if (!list) return null;
            const rows = [...list.children];
            const texts = (sel, root) => [...root.querySelectorAll(sel)].map((e) => e.textContent.replace(/\s+/g, " ").trim());
            const color = (v, prop) => {
              const t = document.createElement("div");
              t.style[prop] = `var(${v})`;
              list.append(t);
              const c = getComputedStyle(t)[prop];
              t.remove();
              return c;
            };
            const banner = list.querySelector(".banner");
            const frame = list.querySelector(".frame");
            const fr = frame?.getBoundingClientRect();
            return {
              rows: rows.map((li) => ({ cls: li.className, h3: li.querySelector("h3")?.textContent.trim(), imgs: li.querySelectorAll("img").length })),
              controls: list.querySelectorAll("a, button, [tabindex], input").length,
              types: list.querySelector("ul.entities")?.getAttribute("aria-label"),
              typeLabels: texts("ul.entities > li", list),
              typeBadges: [...list.querySelectorAll("ul.entities > li")].every((li) => li.querySelector(".badge[aria-hidden=true] svg")),
              mock: rows[1] && [texts(".mock-title", rows[1]), texts(".mock-sub", rows[1]), texts(".mock-label", rows[1]), texts(".field-list dt", rows[1]), texts(".field-list dd", rows[1])],
              frame: frame && { crop: frame.dataset.crop, shown: fr.width > 0 && fr.height > 0, width: Math.round(fr.width), row: rows.indexOf(frame.closest("li")) },
              banner: banner && { text: banner.textContent.replace(/\s+/g, " ").trim(), strong: banner.querySelector("strong")?.textContent, bg: getComputedStyle(banner).backgroundColor, fg: getComputedStyle(banner).color, accent: color("--accent", "backgroundColor"), onCobalt: color("--text-on-cobalt", "color") },
              signals: [list.querySelector(".banner ~ ul.chips, .stage ul.chips")?.getAttribute("aria-label"), texts(".banner ~ ul.chips > li", list)],
              unlock: [rows[4]?.querySelector("ul.chips")?.getAttribute("aria-label"), rows[4] ? texts("ul.chips > li", rows[4]) : []],
              lockGlyph: !!rows[4]?.querySelector(".lock-glyph[aria-hidden=true] svg"),
              pair: rows[3] && [texts("figure.pair figcaption", rows[3]), !!rows[3].querySelector(".stage figure.pair")],
              svgs: [...list.querySelectorAll("svg")].every((s) => s.getAttribute("aria-hidden") === "true" || s.closest("[aria-hidden=true]")),
            };
          }, width >= 840);
          if (!r) return fail(`${at}: no ul.f-list`);
          if (!same(r.rows.map((x) => x.h3), ROWS)) fail(`${at}: row h3s ${r.rows.map((x) => x.h3).join(" | ")}`);
          r.rows.forEach((x, i) => {
            if (!ROW_CLASSES[i].split(" ").every((c) => x.cls.split(/\s+/).includes(c))) fail(`${at}: row ${i + 1} class "${x.cls}"`);
            if (x.imgs !== (i === 1 ? 2 : 0)) fail(`${at}: row ${i + 1} has ${x.imgs} images`);
          });
          if (r.controls) fail(`${at}: ${r.controls} controls inside the rows`);
          if (r.types !== "Record types" || !same(r.typeLabels, TYPES) || !r.typeBadges) fail(`${at}: record types ${r.types}: ${r.typeLabels.join(" | ")}`);
          if (!same(r.mock, [["Check what we read"], ["Change anything that’s wrong before you save."], ["What we read"], ["Member ID", "Group number"], ["XYZ000000000", "00000"]])) fail(`${at}: row 2 card ${JSON.stringify(r.mock)}`);
          if (!r.frame || r.frame.crop !== "fields" || r.frame.row !== 1) fail(`${at}: row 2 frame ${JSON.stringify(r.frame)}`);
          else if (width >= 840 ? !r.frame.shown || r.frame.width !== 200 : r.frame.shown) fail(`${at}: row 2 frame shown ${r.frame.shown}, ${r.frame.width}px`);
          if (!r.banner || r.banner.text !== BANNER || r.banner.strong !== "recommended") fail(`${at}: banner "${r.banner?.text}"`);
          else if (r.banner.bg !== r.banner.accent || r.banner.fg !== r.banner.onCobalt) fail(`${at}: banner ${r.banner.fg} on ${r.banner.bg}, want ${r.banner.onCobalt} on ${r.banner.accent}`);
          if (r.signals[0] !== "What suggestions use" || !same(r.signals[1], SIGNALS)) fail(`${at}: signals ${r.signals[0]}: ${r.signals[1].join(" | ")}`);
          if (r.unlock[0] !== "Ways to unlock" || !same(r.unlock[1], UNLOCK)) fail(`${at}: unlock ${r.unlock[0]}: ${r.unlock[1].join(" | ")}`);
          if (!r.lockGlyph) fail(`${at}: no aria-hidden lock circle in row 5`);
          if (!r.pair || !same(r.pair[0], ["Masked", "Revealed"]) || !r.pair[1]) fail(`${at}: row 4 pair ${JSON.stringify(r.pair)}`);
          if (!r.svgs) fail(`${at}: an icon in the rows is not aria-hidden`);
          await scrollThrough(p);
          const shots = shotsOf(requests);
          for (const s of shots) if (!HOME_SHOTS.includes(s)) fail(`${at}: requested ${s}`);
          note(`${at}: shots ${shots.join(", ")}`);
        });
      }
    }
  },

  async compare(run) {
    for (const width of [320, 390, 1280, "400%"]) {
      for (const state of ["light", "dark"]) {
        await run("index.html", state, width, async (p, at, fail, note) => {
          const r = await p.evaluate(() => {
            const sec = document.querySelector('main section[aria-labelledby="compare-title"]');
            if (!sec) return null;
            const main = sec.parentElement;
            const kids = [...main.children];
            const vw = document.documentElement.clientWidth;
            const hidden = (el) => {
              const b = el.getBoundingClientRect();
              return b.width <= 1 && b.height <= 1;
            };
            const head = sec.querySelector(".cmp-head");
            const out = {
              h2: sec.querySelector("h2#compare-title")?.textContent.trim(),
              line: sec.querySelector(".section-line")?.textContent.trim(),
              afterFeatures: kids[kids.indexOf(sec) - 1]?.querySelector("#features-title") != null,
              beforeBand: kids[kids.indexOf(sec) + 1]?.classList.contains("band"),
              head: head && { hidden: head.getAttribute("aria-hidden"), display: getComputedStyle(head).display, names: [...head.querySelectorAll("span")].map((s) => s.textContent.trim()).filter(Boolean) },
              list: sec.querySelector(".cmp ul.cmp-rows")?.children.length,
              rows: [...sec.querySelectorAll("ul.cmp-rows > li")].map((li) => ({
                h3: [...li.children].filter((c) => c.tagName === "H3").map((h) => h.textContent.trim()),
                cells: [...li.querySelectorAll(":scope > dl > div")].map((d) => ({
                  dt: d.querySelector("dt")?.textContent.trim(),
                  dtHidden: hidden(d.querySelector("dt")),
                  verdict: d.querySelector("dd .verdict")?.textContent.trim(),
                  note: d.querySelector("dd .note")?.textContent.trim(),
                  us: d.classList.contains("us"),
                })),
              })),
              svgs: [...sec.querySelectorAll("svg")].every((s) => s.closest("[aria-hidden=true]")),
              scroll: document.documentElement.scrollWidth - vw,
              outside: [],
              small: [],
              height: Math.round(sec.querySelector(".cmp")?.getBoundingClientRect().height || 0),
            };
            for (const el of sec.querySelectorAll(".section-head, .section-head *, .cmp, .cmp *")) {
              if (el.getClientRects().length === 0 || hidden(el)) continue;
              const b = el.getBoundingClientRect();
              if (b.left < 16 - 0.5 || b.right > vw - 16 + 0.5) out.outside.push(`${el.tagName.toLowerCase()}.${el.className} ${Math.round(b.left)} to ${Math.round(b.right)}`);
              if ([...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim()) && parseFloat(getComputedStyle(el).fontSize) < 16) out.small.push(el.tagName);
            }
            return out;
          });
          if (!r) return fail(`${at}: no comparison section`);
          const wide = width === 1280;
          if (r.h2 !== "Why not just use photos or notes?") fail(`${at}: h2 "${r.h2}"`);
          if (r.line !== "Many people keep these details as photos of cards or in a notes app. Here’s how the three compare.") fail(`${at}: line "${r.line}"`);
          if (!r.afterFeatures || !r.beforeBand) fail(`${at}: not between Features and the privacy band`);
          if (!r.head || r.head.hidden !== "true") fail(`${at}: column head not aria-hidden`);
          else {
            if (wide ? r.head.display !== "grid" : r.head.display !== "none") fail(`${at}: column head display ${r.head.display}`);
            if (!same(r.head.names, COLUMNS)) fail(`${at}: column head names ${r.head.names.join(" | ")}`);
          }
          if (r.list !== 5) fail(`${at}: ${r.list} rows in ul.cmp-rows`);
          r.rows.forEach((row, i) => {
            const [q, cells] = COMPARE[i] || [];
            if (!same(row.h3, [q])) fail(`${at}: row ${i + 1} h3 ${row.h3.join(" | ")}`);
            if (row.cells.length !== 3) return fail(`${at}: row ${i + 1} has ${row.cells.length} cells`);
            row.cells.forEach((c, j) => {
              if (c.dt !== COLUMNS[j]) fail(`${at}: row ${i + 1} cell ${j + 1} dt "${c.dt}"`);
              if (c.dtHidden !== wide) fail(`${at}: row ${i + 1} cell ${j + 1} dt ${c.dtHidden ? "hidden" : "shown"}`);
              if (c.verdict !== cells[j][0] || c.note !== cells[j][1]) fail(`${at}: row ${i + 1} cell ${j + 1} "${c.verdict}" / "${c.note}"`);
              if (c.us !== (j === 2)) fail(`${at}: row ${i + 1} cell ${j + 1} us ${c.us}`);
            });
          });
          if (!r.svgs) fail(`${at}: an icon is not aria-hidden`);
          if (r.scroll > 0) fail(`${at}: page scrolls sideways by ${r.scroll}px`);
          for (const o of r.outside) fail(`${at}: outside the 16px gutters: ${o}`);
          if (r.small.length) fail(`${at}: text below 16px in ${r.small.join(", ")}`);
          note(`${at}: comparison ${r.height}px tall`);
          // Reading structure, as assistive tech gets it.
          const tree = await p.locator("main ul.cmp-rows").ariaSnapshot();
          const count = (re) => (tree.match(re) || []).length;
          if (count(/^\s*- heading "[^"]+" \[level=3\]/gm) !== 5) fail(`${at}: ${count(/\[level=3\]/g)} h3s in the tree`);
          for (const c of COLUMNS) if (count(new RegExp(`^\\s*- term: ${c}$`, "gm")) !== 5) fail(`${at}: term "${c}" read ${count(new RegExp(`- term: ${c}$`, "gm"))} times`);
          if (count(/^\s*- definition:/gm) !== 15) fail(`${at}: ${count(/- definition:/g)} definitions in the tree`);
          if (!/^- list:?$/m.test(tree.split("\n")[0])) fail(`${at}: the rows are not read as a list: ${tree.split("\n")[0]}`);
          if (state === "light" && width === 390) note(`tree:\n${tree}`);
        });
      }
    }
  },

  async features(run) {
    for (const width of [390, 1280]) {
      for (const state of ["light", "dark"]) {
        await run("features.html", state, width, async (p, at, fail, note, requests) => {
          const r = await p.evaluate(() => {
            const texts = (sel, root) => [...root.querySelectorAll(sel)].map((e) => e.textContent.replace(/\s+/g, " ").trim());
            const top = document.querySelector("main .page-top");
            const visual = top?.querySelector(".page-top-visual");
            const frames = visual ? [...visual.querySelectorAll(".frame")] : [];
            const nav = top?.querySelector(".page-top-copy nav.jump");
            const secs = [...document.querySelectorAll("main section.fsec")];
            const shownImgs = (f) => [...f.querySelectorAll(".screen img")].filter((i) => getComputedStyle(i).display !== "none" && i.getBoundingClientRect().width > 0);
            return {
              topFrames: frames.map((f) => ({ crop: f.dataset.crop, stage: !!f.closest(".stage"), srcs: shownImgs(f).map((i) => i.currentSrc || i.src), alt: shownImgs(f)[0]?.alt })),
              nav: nav && { label: nav.getAttribute("aria-label"), links: [...nav.querySelectorAll("a")].map((a) => [a.textContent.trim(), a.getAttribute("href")]) },
              jumpInProse: !!document.querySelector("main .prose nav.jump"),
              secs: secs.map((s) => {
                const h2 = s.querySelector("h2");
                const stages = s.querySelectorAll(".fsec-top .stage");
                const st = stages[0];
                return {
                  labelledby: s.getAttribute("aria-labelledby"),
                  id: h2?.id,
                  h2: h2?.textContent.trim(),
                  intro: texts(".fsec-top .fsec-intro", s),
                  stages: stages.length,
                  prose: texts(".prose p", s),
                  types: st ? [st.querySelector("ul.entities")?.getAttribute("aria-label"), texts("ul.entities > li", st)] : null,
                  mock: st ? texts(".mock .mock-title, .mock .mock-sub, .mock .mock-label, .mock dt, .mock dd, .mock .record-name, .mock .record-sub", st) : [],
                  facts: st ? texts(".fact-list > li", st) : [],
                  factIcons: st ? [...st.querySelectorAll(".fact-list > li")].every((li) => li.querySelector("svg[aria-hidden=true]")) : false,
                  banner: st?.querySelector(".banner")?.textContent.replace(/\s+/g, " ").trim(),
                  chips: st ? [...st.querySelectorAll("ul.chips")].map((u) => [u.getAttribute("aria-label"), texts(":scope > li", u)]) : [],
                  lockGlyph: !!st?.querySelector(".lock-glyph[aria-hidden=true] svg"),
                  pairs: st ? texts("figure.pair figcaption", st) : [],
                  frames: st
                    ? [...st.querySelectorAll(".frame")].map((f) => ({
                        crop: f.dataset.crop,
                        imgs: f.querySelectorAll(".screen img").length,
                        shown: shownImgs(f).map((i) => (i.currentSrc || i.src).match(/01-home-(light|dark)/)?.[1]),
                        alt: f.querySelector("img")?.alt,
                        caption: f.querySelector("figcaption")?.textContent.trim(),
                        width: Math.round(f.getBoundingClientRect().width),
                      }))
                    : [],
                  imgs: s.querySelectorAll("img").length,
                };
              }),
            };
          });
          if (r.topFrames.length !== 1) fail(`${at}: ${r.topFrames.length} page-top frames`);
          else {
            const f = r.topFrames[0];
            if (f.crop !== "full" || !f.stage || f.srcs.length !== 1 || !/02-person-top-(light|dark)/.test(f.srcs[0]) || !f.alt?.startsWith("Sam Rivera’s record in atHand.")) fail(`${at}: page-top frame ${JSON.stringify(f)}`);
          }
          if (!r.nav || r.nav.label !== "On this page" || !same(r.nav.links, JUMP.map(([t, id]) => [t, "#" + id]))) fail(`${at}: jump list ${JSON.stringify(r.nav)}`);
          if (r.jumpInProse) fail(`${at}: the jump list is still in the prose column`);
          if (r.secs.length !== 7) return fail(`${at}: ${r.secs.length} section.fsec`);
          r.secs.forEach((s, i) => {
            const id = JUMP[i][1];
            if (s.id !== id || s.labelledby !== id) fail(`${at}: section ${i + 1} id ${s.id}, labelledby ${s.labelledby}`);
            if (s.h2 !== H2S[i]) fail(`${at}: section ${i + 1} h2 "${s.h2}"`);
            if (!same(s.intro, [INTROS[i]])) fail(`${at}: section ${i + 1} intro ${s.intro.join(" | ")}`);
            if (s.stages !== 1) fail(`${at}: section ${i + 1} has ${s.stages} stages`);
            const fe24 = s.prose.includes(FE24);
            if (fe24 !== (id === "hidden")) fail(`${at}: FE24 ${fe24 ? "in" : "not in"} ${id}`);
            if (s.imgs !== (id === "light-and-dark" ? 2 : 0)) fail(`${at}: section ${id} has ${s.imgs} images`);
          });
          const [rec, scan, sug, hid, lock, back, ld] = r.secs;
          if (!rec.types || rec.types[0] !== "Record types" || !same(rec.types[1], TYPES)) fail(`${at}: records stage ${JSON.stringify(rec.types)}`);
          if (!same(scan.mock, ["Check what we read", "Change anything that’s wrong before you save.", "What we read", "Member ID", "XYZ000000000", "Group number", "00000"])) fail(`${at}: scanning card ${scan.mock.join(" | ")}`);
          if (sug.banner !== BANNER || !same(sug.chips, [["What suggestions use", SIGNALS]])) fail(`${at}: suggestions stage ${sug.banner} ${JSON.stringify(sug.chips)}`);
          if (!same(hid.pairs, ["Masked", "Revealed"])) fail(`${at}: hidden stage ${hid.pairs.join(" | ")}`);
          if (!lock.lockGlyph || !same(lock.chips, [["Ways to unlock", UNLOCK]])) fail(`${at}: app lock stage ${JSON.stringify(lock.chips)}`);
          if (!same(back.mock, ["Encrypted backup", "Protected by a passphrase you choose"]) || !same(back.facts, BACKUP_FACTS) || !back.factIcons) fail(`${at}: backups card ${back.mock.join(" | ")}; ${back.facts.join(" | ")}`);
          const want = [
            { crop: "suggest", imgs: 1, shown: ["light"], alt: "Close view of the atHand home screen in Light appearance, with the Flight to Denver banner and the Suggested for you list.", caption: "Light" },
            { crop: "suggest", imgs: 1, shown: ["dark"], alt: "The same view in Dark appearance.", caption: "Dark" },
          ];
          if (!same(ld.frames.map(({ width: _, ...f }) => f), want)) fail(`${at}: light and dark frames ${JSON.stringify(ld.frames)}`);
          else if (ld.frames.some((f) => f.width !== Math.min(220, f.width) || f.width < 120)) fail(`${at}: light and dark frame widths ${ld.frames.map((f) => f.width).join(", ")}`);
          await scrollThrough(p);
          const shots = shotsOf(requests);
          for (const s of shots) if (!["02-person-top", "01-home"].includes(s)) fail(`${at}: requested ${s}`);
          note(`${at}: shots ${shots.join(", ")}; frames ${ld.frames.map((f) => f.width).join(", ")}px`);
        });
      }
    }
  },

  async wrap(run) {
    for (const width of [320, 390, 1280]) {
      for (const page of ["index.html", "features.html"]) {
        await run(page, "light", width, async (p, at, fail) => {
          const found = await p.evaluate(
            ([hs, ps, fn, para]) => {
              const linesOf = new Function(`return (${fn})`)();
              const out = [];
              for (const el of document.querySelectorAll(hs)) {
                const lines = linesOf(el);
                if (lines.length > 1 && lines.flat().length > 2 && lines.at(-1).length === 1) out.push("heading: " + lines.map((l) => l.join(" ")).join(" / "));
              }
              if (para) {
                for (const el of document.querySelectorAll(ps)) {
                  const lines = linesOf(el);
                  if (lines.length > 1 && lines.at(-1).length === 1) out.push(`paragraph: …${lines.at(-2).slice(-3).join(" ")} / ${lines.at(-1)[0]}`);
                }
              }
              return out;
            },
            [HEADINGS, PARAGRAPHS, linesOf.toString(), width !== 320],
          );
          for (const f of found) fail(`${at}: ends on one word: ${f}`);
        });
      }
    }
  },
};

if (!checks[check]) {
  console.error(`measure: unknown check "${check}"; one of ${Object.keys(checks).join(", ")}`);
  process.exit(1);
}

const dir = resolve(ref ? "." : "dist");
const { server, origin } = await startServer(dir);
const browser = await chromium.launch();
const failures = [];
const notes = [];
try {
  await checks[check](async (page, state, width, body) => {
    const requests = [];
    const context = await contextFor(browser, origin, STATES[state], VIEWPORTS[width], requests);
    const p = await openPage(context, urlFor(origin, page, state));
    const at = `${page} ${state} ${width}`;
    await body(p, at, (m) => failures.push(m), (m) => notes.push(m), requests);
    await context.close();
  });
} finally {
  await browser.close();
  server.close();
}
for (const n of notes) console.log(`measure ${check}: ${n}`);
if (failures.length) {
  for (const f of failures) console.error(`measure ${check}: ${f}`);
  process.exit(1);
}
console.log(`measure ${check}: pass`);
