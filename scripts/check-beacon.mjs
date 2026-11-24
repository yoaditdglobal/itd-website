// Prebuild guard: the first-party analytics beacon must ship with every build.
// Fails the build (exit 1) when <Beacon /> is missing from the root layout or
// either beacon route is gone. See AGENTS.md → Analytics.
import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const problems = [];

const layout = join(root, "src/app/layout.tsx");
if (!existsSync(layout) || !readFileSync(layout, "utf8").includes("<Beacon")) {
  problems.push("src/app/layout.tsx does not render <Beacon /> (the first-party analytics beacon).");
}
for (const route of ["src/app/api/v/route.ts", "src/app/api/v/export/route.ts"]) {
  if (!existsSync(join(root, route))) problems.push(`${route} is missing.`);
}

if (problems.length) {
  console.error("\ncheck-beacon: the first-party analytics beacon is broken:");
  for (const p of problems) console.error(`  - ${p}`);
  console.error("Restore it before building (AGENTS.md → Analytics).\n");
  process.exit(1);
}
console.log("check-beacon: ok");
