// Prebuild guard: the first-party analytics beacon must ship with every build.
// Fails the build (exit 1) when <Beacon /> is missing from the root layout,
// <NotFoundBeacon /> from the not-found page, a beacon route is gone, or a lead
// route no longer links its leads (recordServerLead). See AGENTS.md → Analytics.
import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const problems = [];

const layout = join(root, "src/app/layout.tsx");
if (!existsSync(layout) || !readFileSync(layout, "utf8").includes("<Beacon")) {
  problems.push("src/app/layout.tsx does not render <Beacon /> (the first-party analytics beacon).");
}
const notFound = join(root, "src/app/not-found.tsx");
if (!existsSync(notFound) || !readFileSync(notFound, "utf8").includes("<NotFoundBeacon")) {
  problems.push("src/app/not-found.tsx does not render <NotFoundBeacon /> (the beacon's nf event).");
}
for (const route of ["src/app/api/v/route.ts", "src/app/api/v/export/route.ts", "src/app/api/v/ref/route.ts"]) {
  if (!existsSync(join(root, route))) problems.push(`${route} is missing.`);
}
for (const route of [
  "src/app/api/contact/route.ts",
  "src/app/api/chat/lead/route.ts",
  "src/app/api/peak-report/route.ts",
]) {
  const file = join(root, route);
  if (!existsSync(file) || !readFileSync(file, "utf8").includes("recordServerLead(")) {
    problems.push(`${route} no longer calls recordServerLead() (the beacon's lead_srv event).`);
  }
}

if (problems.length) {
  console.error("\ncheck-beacon: the first-party analytics beacon is broken:");
  for (const p of problems) console.error(`  - ${p}`);
  console.error("Restore it before building (AGENTS.md → Analytics).\n");
  process.exit(1);
}
console.log("check-beacon: ok");
