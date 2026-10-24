// Fails unless every copied token file in src/styles/tokens/ matches the app
// repo's _ds tokens byte for byte after its one-line source header.
// Usage: ATHAND_APP_DIR=../athandapp node scripts/tokens-check.mjs
import { execFileSync } from "node:child_process";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const appDir = resolve(root, process.env.ATHAND_APP_DIR || "../athandapp");
const dsDir = join(appDir, "athand-design-handoff", "_ds");
const siteDir = join(root, "src", "styles", "tokens");
const names = ["colors", "effects", "spacing", "typography"];
const header = /^\/\* Source: davisj2007\/athandapp .+ at [0-9a-f]{40}\. .*\*\/$/;

function fail(message) {
  console.error(`tokens:check: ${message}`);
  process.exit(1);
}

console.log("fonts.css: documented exception (self-hosted faces replace the Google Fonts import)");

if (!existsSync(appDir)) fail(`app repo not found at ${appDir} (set ATHAND_APP_DIR)`);
if (!existsSync(dsDir)) fail(`${dsDir} not found`);

const systems = readdirSync(dsDir).filter((d) => d.startsWith("athand-design-system-"));
if (systems.length !== 1) {
  fail(`expected exactly one athand-design-system-* folder in ${dsDir}, found ${systems.length}: ${systems.join(", ")}`);
}
const appTokens = join(dsDir, systems[0], "tokens");

let failed = false;

const extra = readdirSync(siteDir).filter((f) => !names.map((n) => `${n}.css`).includes(f));
for (const f of extra) {
  console.error(`tokens:check: unexpected file src/styles/tokens/${f}`);
  failed = true;
}

for (const name of names) {
  const sitePath = join(siteDir, `${name}.css`);
  const appPath = join(appTokens, `${name}.css`);
  if (!existsSync(sitePath)) {
    console.error(`tokens:check: missing src/styles/tokens/${name}.css`);
    failed = true;
    continue;
  }
  if (!existsSync(appPath)) {
    console.error(`tokens:check: missing ${appPath}`);
    failed = true;
    continue;
  }
  const site = readFileSync(sitePath);
  const newline = site.indexOf(0x0a);
  const first = site.subarray(0, newline === -1 ? site.length : newline).toString("utf8");
  if (!header.test(first)) {
    console.error(`tokens:check: ${name}.css: line 1 is not a valid source header`);
    failed = true;
    continue;
  }
  const body = newline === -1 ? Buffer.alloc(0) : site.subarray(newline + 1);
  const app = readFileSync(appPath);
  if (body.equals(app)) continue;

  failed = true;
  console.error(`tokens:check: ${name}.css differs from the app repo`);
  const appLines = app.toString("utf8").split("\n");
  const siteLines = body.toString("utf8").split("\n");
  const count = Math.max(appLines.length, siteLines.length);
  for (let i = 0; i < count; i++) {
    if (appLines[i] === siteLines[i]) continue;
    // Line numbers refer to the app file; the site copy is one line lower.
    console.error(`  line ${i + 1}:`);
    if (appLines[i] !== undefined) console.error(`  - ${appLines[i]}`);
    if (siteLines[i] !== undefined) console.error(`  + ${siteLines[i]}`);
  }
}

if (failed) process.exit(1);

let head = "unknown commit";
try {
  head = execFileSync("git", ["-C", appDir, "rev-parse", "HEAD"], { encoding: "utf8" }).trim();
} catch {}
console.log(`tokens:check: 4 files match ${head}`);
