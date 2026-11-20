// Refuses to run Next.js from an iCloud-synced folder.
//
// With node_modules inside iCloud Drive, fileproviderd pins the CPU, `next dev`
// takes minutes to boot and never serves a page, and `mv` hangs in rename().
// Wired in as `predev` and `prebuild` so it runs before every local start.
// Netlify and other CI skip it.

import { existsSync } from "node:fs";
import { homedir } from "node:os";
import { realpathSync } from "node:fs";
import { join, sep } from "node:path";

if (process.env.CI || process.env.NETLIFY) process.exit(0);

const cwd = realpathSync(process.cwd());
const home = homedir();
const cloudDocs = join(home, "Library", "Mobile Documents", "com~apple~CloudDocs");

const reasons = [];

if (cwd.includes(`${sep}Library${sep}Mobile Documents${sep}`)) {
  reasons.push("the folder is inside iCloud Drive");
}

for (const name of ["Documents", "Desktop"]) {
  const local = join(home, name);
  const synced = existsSync(join(cloudDocs, name));
  if (synced && (cwd === local || cwd.startsWith(local + sep))) {
    reasons.push(`~/${name} is synced by iCloud (Desktop & Documents sync is on)`);
  }
}

if (reasons.length === 0) process.exit(0);

console.error(`
Refusing to run Next.js from ${cwd}
Reason: ${reasons.join("; ")}.

Run this repo from local disk instead. The checkout lives at ~/dev/itd-website:

  cd ~/dev/itd-website && npm run dev

See "Local servers" in AGENTS.md.
`);
process.exit(1);
