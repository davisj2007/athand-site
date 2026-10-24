// Fails unless the visible text and link targets inside <main> of each built
// page match the pre-port root HTML at PRE_PORT_REF.
// Usage: PRE_PORT_REF=<commit> node scripts/check-main-text.mjs [page ...]
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const ref = process.env.PRE_PORT_REF || "52d8d1afc6de84391e401c738905da3f186f9f50";
const pages = process.argv.length > 2 ? process.argv.slice(2) : ["index", "privacy", "support", "404"];

function decode(s) {
  return s
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#([0-9]+);/g, (_, d) => String.fromCodePoint(parseInt(d, 10)))
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, "&");
}

function mainOf(html, label) {
  const matches = [...html.matchAll(/<main\b[^>]*>([\s\S]*?)<\/main>/gi)];
  if (matches.length !== 1) throw new Error(`${label}: expected one <main>, found ${matches.length}`);
  return matches[0][1];
}

function visibleText(inner) {
  const stripped = inner
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/<script\b[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]*>/g, " ");
  return decode(stripped).replace(/\s+/g, " ").trim();
}

function links(inner) {
  const out = [];
  for (const m of inner.matchAll(/<a\b[^>]*>/gi)) {
    const h = m[0].match(/\shref\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/i);
    if (h) out.push(decode(h[1] ?? h[2] ?? h[3]));
  }
  return out;
}

function firstDifference(a, b) {
  let i = 0;
  while (i < a.length && i < b.length && a[i] === b[i]) i++;
  return i;
}

let failed = false;
for (const page of pages) {
  const label = `${page}.html`;
  const built = join(root, "dist", label);
  try {
    if (!existsSync(built)) throw new Error(`${label}: dist/${label} not found (run npm run build)`);
    let before;
    try {
      before = execFileSync("git", ["show", `${ref}:${label}`], { cwd: root, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] });
    } catch {
      throw new Error(`${label}: could not read ${label} at ${ref}`);
    }
    const oldMain = mainOf(before, `${ref}:${label}`);
    const newMain = mainOf(readFileSync(built, "utf8"), `dist/${label}`);

    const oldText = visibleText(oldMain);
    const newText = visibleText(newMain);
    if (oldText !== newText) {
      const i = firstDifference(oldText, newText);
      console.error(`check:content: ${page} main text differs at character ${i}`);
      console.error(`  before: ${oldText.slice(Math.max(0, i - 60), i + 60)}`);
      console.error(`  built:  ${newText.slice(Math.max(0, i - 60), i + 60)}`);
      failed = true;
    }

    const oldLinks = links(oldMain);
    const newLinks = links(newMain);
    if (JSON.stringify(oldLinks) !== JSON.stringify(newLinks)) {
      const i = firstDifference(oldLinks, newLinks);
      console.error(`check:content: ${page} main links differ at link ${i + 1}`);
      console.error(`  before: ${oldLinks[i] ?? "(none)"}`);
      console.error(`  built:  ${newLinks[i] ?? "(none)"}`);
      failed = true;
    }

    if (oldText === newText && JSON.stringify(oldLinks) === JSON.stringify(newLinks)) {
      console.log(`check:content: ${page} main text and links match ${ref}`);
    }
  } catch (e) {
    console.error(`check:content: ${e.message}`);
    failed = true;
  }
}

if (failed) process.exit(1);
