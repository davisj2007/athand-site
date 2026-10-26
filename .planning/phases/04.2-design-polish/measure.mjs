// Phase 04.2 acceptance measurements over a built site, in Chromium through
// the project's pinned Playwright. A planning tool for the phase's verify
// commands; it is not a site check and is not wired into package.json.
// Usage: node .planning/phases/04.2-design-polish/measure.mjs <check> [--inject file.css]
// Checks:
//   headings      FX1: no Home or Features heading that wraps ends on a one-word line
//   stragglers    FX2: no Home or Features paragraph ends on a one-word line at 390 or 1280
//   measure       FX3: no wrapping .prose paragraph or list item averages 80 or more characters per line at 1280
//   band          FX4: the privacy band fill is #4C39C6 in light and #5A47D0 in dark
//   row4          FX6: Home row 4 is the live pair with no image, read as decision 10 sets
//   crops         FX7: Home rows 2 and 5 use the fields and lock crops at the measured values
//   features-top  FX8: the Features page top shows one fields frame at --site-phone, and no 02-person-top request
// --inject adds a stylesheet before measuring (PLAN used it to preview a fix
// against today's build). Exits 1 on any failure.
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { chromium } from "playwright";
import { openPage, pageUrl, startServer } from "../../../scripts/check-layout.mjs";

const args = process.argv.slice(2);
const check = args[0];
const injectAt = args.indexOf("--inject");
const inject = injectAt > -1 ? readFileSync(args[injectAt + 1], "utf8") : null;

const STATES = {
  light: { stored: "light", os: "light" },
  dark: { stored: "dark", os: "dark" },
  "system, OS light": { stored: "system", os: "light" },
  "system, OS dark": { stored: "system", os: "dark" },
};

const HEADINGS = "main :is(.section-title, .feature h3, .moment h3, .band h2, .prose h2, .prose h3, .page-top h1)";
const PARAGRAPHS = "main :is(.lede, .section-line, .feature-copy p, .prose p, .prose li, .facts li)";

// Lines of an element's rendered text: words grouped by the top of their box.
// A token of punctuation alone (a period after an inline link) joins the word
// before it. Visually hidden text (1px boxes) is left out.
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

async function contextFor(browser, origin, state, viewport, requests) {
  const context = await browser.newContext({ viewport, colorScheme: state.os, reducedMotion: "reduce" });
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

async function open(context, origin, page) {
  const p = await openPage(context, pageUrl(origin, page));
  if (inject) await p.addStyleTag({ content: inject });
  return p;
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

const checks = {
  async headings(run) {
    for (const width of [320, 390, 1280]) {
      for (const page of ["index.html", "features.html"]) {
        await run(page, "light", width, async (p, at, fail) => {
          const found = await p.evaluate(
            ([sel, fn]) => {
              const linesOf = new Function(`return (${fn})`)();
              return [...document.querySelectorAll(sel)].flatMap((el) => {
                const lines = linesOf(el);
                const words = lines.flat().length;
                return lines.length > 1 && words > 2 && lines.at(-1).length === 1 ? [lines.map((l) => l.join(" ")).join(" / ")] : [];
              });
            },
            [HEADINGS, linesOf.toString()],
          );
          for (const h of found) fail(`${at}: heading ends on one word: ${h}`);
        });
      }
    }
  },

  async stragglers(run) {
    for (const width of [390, 1280]) {
      for (const page of ["index.html", "features.html"]) {
        await run(page, "light", width, async (p, at, fail) => {
          const found = await p.evaluate(
            ([sel, fn]) => {
              const linesOf = new Function(`return (${fn})`)();
              return [...document.querySelectorAll(sel)].flatMap((el) => {
                const lines = linesOf(el);
                return lines.length > 1 && lines.at(-1).length === 1 ? [`…${lines.at(-2).slice(-3).join(" ")} / ${lines.at(-1)[0]}`] : [];
              });
            },
            [PARAGRAPHS, linesOf.toString()],
          );
          for (const s of found) fail(`${at}: paragraph ends on one word: ${s}`);
        });
      }
    }
  },

  async measure(run) {
    for (const page of ["features.html", "pricing.html", "privacy-overview.html", "support.html", "privacy.html", "404.html"]) {
      await run(page, "light", 1280, async (p, at, fail, note) => {
        const result = await p.evaluate(
          ([fn]) => {
            const linesOf = new Function(`return (${fn})`)();
            let max = 0;
            let longest = 0;
            const over = [];
            for (const el of document.querySelectorAll("main .prose :is(p, li)")) {
              const lines = linesOf(el).map((l) => l.join(" ").length);
              if (lines.length < 2) continue;
              const avg = lines.reduce((n, c) => n + c, 0) / lines.length;
              max = Math.max(max, avg);
              longest = Math.max(longest, ...lines);
              if (avg >= 80) over.push(`${avg.toFixed(1)}: ${el.textContent.trim().slice(0, 50)}…`);
            }
            const prose = document.querySelector("main .prose");
            return { max: max.toFixed(1), longest, width: prose ? Math.round(prose.getBoundingClientRect().width) : 0, over };
          },
          [linesOf.toString()],
        );
        note(`${at}: .prose ${result.width}px, highest paragraph average ${result.max} characters per line, longest line ${result.longest}`);
        for (const o of result.over) fail(`${at}: ${o}`);
      });
    }
  },

  async band(run) {
    const expect = { light: "rgb(76, 57, 198)", dark: "rgb(90, 71, 208)" };
    for (const state of Object.keys(STATES)) {
      for (const page of ["index.html", "privacy-overview.html"]) {
        await run(page, state, 390, async (p, at, fail, note) => {
          const bg = await p.evaluate(() => getComputedStyle(document.querySelector("main .band")).backgroundColor);
          note(`${at}: band ${bg}`);
          if (bg !== expect[STATES[state].os]) fail(`${at}: band is ${bg}, expected ${expect[STATES[state].os]}`);
        });
      }
    }
  },

  async row4(run) {
    for (const state of ["light", "dark"]) {
      for (const width of [390, 1280]) {
        await run("index.html", state, width, async (p, at, fail) => {
          const row = p.locator("main .feature").nth(3);
          if ((await row.locator("h3").textContent()) !== "Hidden until you need it") fail(`${at}: row 4 is not Hidden until you need it`);
          if ((await row.locator("img").count()) !== 0) fail(`${at}: row 4 has an img`);
          if ((await row.locator("figure figcaption").count()) !== 2) fail(`${at}: row 4 needs two captioned figures`);
          const tree = await row.locator(".shot-panel").ariaSnapshot();
          for (const s of ["Masked", "Revealed", "Alarm code, hidden until you tap Reveal", "0000"]) {
            if (!tree.includes(s)) fail(`${at}: screen reader does not get "${s}"`);
          }
          if ((tree.match(/Maple Street house/g) || []).length !== 2) fail(`${at}: "Maple Street house" not read once per card`);
          if ((tree.match(/Alarm code/g) || []).length !== 3) fail(`${at}: "Alarm code" not read as two labels plus the hidden text`);
          if (/\bHide\b/.test(tree)) fail(`${at}: the static Hide label is read`);
          if ((tree.match(/\bReveal\b/g) || []).length !== 1) fail(`${at}: the static Reveal label is read`);
          if (await row.locator(".shot-panel :is(a, button, [role=button], [tabindex])").count()) fail(`${at}: row 4 has a control`);
        });
      }
    }
  },

  async crops(run) {
    const want = [
      { row: 1, crop: "fields", ratio: 1320 / 1424, position: "50% 11.911%" },
      { row: 4, crop: "lock", ratio: 1320 / 1388, position: "50% 87.027%" },
    ];
    for (const state of ["light", "dark"]) {
      for (const width of [390, 1280]) {
        await run("index.html", state, width, async (p, at, fail) => {
          await scrollThrough(p);
          for (const w of want) {
            const got = await p.locator("main .feature").nth(w.row).locator(".frame").evaluate((f) => {
              const screen = f.querySelector(".screen").getBoundingClientRect();
              const img = [...f.querySelectorAll(".screen img")].find((i) => getComputedStyle(i).display !== "none");
              return { crop: f.dataset.crop, ratio: screen.width / screen.height, position: getComputedStyle(img).objectPosition, loaded: img.complete && img.naturalWidth > 0 };
            });
            if (got.crop !== w.crop) fail(`${at}: row ${w.row + 1} crop is ${got.crop}, expected ${w.crop}`);
            if (Math.abs(got.ratio - w.ratio) > 0.01) fail(`${at}: row ${w.row + 1} screen ratio ${got.ratio.toFixed(3)}, expected ${w.ratio.toFixed(3)}`);
            if (got.position !== w.position) fail(`${at}: row ${w.row + 1} object-position ${got.position}, expected ${w.position}`);
            if (!got.loaded) fail(`${at}: row ${w.row + 1} image did not load`);
          }
        });
      }
    }
  },

  async "features-top"(run) {
    for (const state of ["light", "dark"]) {
      for (const [width, size] of [[390, 280], [1280, 300]]) {
        await run("features.html", state, width, async (p, at, fail, note, requests) => {
          await scrollThrough(p);
          const frames = p.locator("main .page-top .frame");
          if ((await frames.count()) !== 1) fail(`${at}: ${await frames.count()} page-top frames, expected 1`);
          const got = await frames.first().evaluate((f) => ({ crop: f.dataset.crop, width: Math.round(f.getBoundingClientRect().width) }));
          note(`${at}: page-top frame ${got.width}px, crop ${got.crop}`);
          if (got.crop !== "fields") fail(`${at}: page-top crop ${got.crop}, expected fields`);
          if (got.width !== size) fail(`${at}: page-top frame ${got.width}px, expected ${size}`);
          if (await p.locator(".overlap").count()) fail(`${at}: .overlap still in the page`);
          for (const url of requests.filter((u) => u.includes("02-person-top"))) fail(`${at}: requested ${url}`);
        });
      }
    }
  },
};

if (!checks[check]) {
  console.error(`measure: unknown check "${check}"; one of ${Object.keys(checks).join(", ")}`);
  process.exit(1);
}

const dir = resolve("dist");
const { server, origin } = await startServer(dir);
const browser = await chromium.launch();
const failures = [];
const notes = [];
try {
  await checks[check](async (page, state, width, body) => {
    const requests = [];
    const context = await contextFor(browser, origin, STATES[state], { width, height: 900 }, requests);
    const p = await open(context, origin, page);
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
