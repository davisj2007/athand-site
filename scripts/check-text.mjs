// Fails unless a built page holds the expected copy listed in a fixture file.
// Fixture lines: "title: X" and "description: X" must equal the head values;
// "href: U" requires a link to U inside <main>; "!X" must not appear in the
// main text; any other line must appear in it. Blank and "#" lines are skipped.
// Usage: node scripts/check-text.mjs <dist html file> <fixture file>
import { existsSync, readFileSync } from "node:fs";

const [file, fixture] = process.argv.slice(2);

function fail(message) {
  console.error(`check:text: ${message}`);
  process.exit(1);
}

if (!file || !fixture) fail("usage: node scripts/check-text.mjs <dist html file> <fixture file>");
if (!existsSync(file)) fail(`${file} not found (run npm run build)`);
if (!existsSync(fixture)) fail(`${fixture} not found`);

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

function clean(s) {
  return decode(s).replace(/\s+/g, " ").trim();
}

const html = readFileSync(file, "utf8");

const mains = [...html.matchAll(/<main\b[^>]*>([\s\S]*?)<\/main>/gi)];
if (mains.length !== 1) fail(`${file}: expected one <main>, found ${mains.length}`);
const main = mains[0][1];

// Tags are removed without a space, so an inline link joins its sentence.
const text = clean(
  main
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<script\b[\s\S]*?<\/script>/gi, "")
    .replace(/<style\b[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]*>/g, ""),
);

const titleMatch = html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i);
const title = titleMatch ? clean(titleMatch[1]) : null;

let description = null;
for (const m of html.matchAll(/<meta\b[^>]*>/gi)) {
  if (!/\sname\s*=\s*["']?description["']?/i.test(m[0])) continue;
  const c = m[0].match(/\scontent\s*=\s*(?:"([^"]*)"|'([^']*)')/i);
  if (c) description = clean(c[1] ?? c[2]);
}

const hrefs = [];
for (const m of main.matchAll(/<a\b[^>]*>/gi)) {
  const h = m[0].match(/\shref\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/i);
  if (h) hrefs.push(decode(h[1] ?? h[2] ?? h[3]));
}

const lines = readFileSync(fixture, "utf8")
  .split(/\r?\n/)
  .map((l) => l.trim())
  .filter((l) => l !== "" && !l.startsWith("#"));

const failures = [];
for (const line of lines) {
  if (line.startsWith("title: ")) {
    const want = line.slice(7);
    if (title !== want) failures.push(`title: ${want}`);
  } else if (line.startsWith("description: ")) {
    const want = line.slice(13);
    if (description !== want) failures.push(`description: ${want}`);
  } else if (line.startsWith("href: ")) {
    const want = line.slice(6);
    if (!hrefs.includes(want)) failures.push(`href: ${want}`);
  } else if (line.startsWith("!")) {
    const absent = line.slice(1);
    if (text.includes(absent)) failures.push(`present: ${absent}`);
  } else if (!text.includes(line)) {
    failures.push(`missing: ${line}`);
  }
}

for (const f of failures) console.error(`check:text: ${file}: ${f}`);
if (failures.length) process.exit(1);
console.log(`check:text: ${file}: ${lines.length} lines match`);
