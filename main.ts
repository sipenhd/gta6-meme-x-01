// GTA 6 Meme on X — make.fun bounty gta6-meme-x-01
// Node.js 22.18+ compatible. Standard library only.
// No network, no installs, runs offline in the sandbox.
// Copies POST.json (the X post URL) to /output/POST.json
// so the bounty judge can read the post from X.
// Outside the grader, MAKEFUN_BOT_DIR and MAKEFUN_OUTPUT_DIR
// stand in for the repo dir and /output:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
//
// Run: node main.ts
// (Node 22.18+ strips types natively; this file uses no
//  TypeScript-only syntax, so it also works as plain JS.)

import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const botDir = process.env.MAKEFUN_BOT_DIR ?? here;
const source = join(botDir, "POST.json");
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const target = join(outputDir, "POST.json");

if (!existsSync(source)) {
  throw new Error("POST.json not found next to main.ts: " + source);
}

mkdirSync(outputDir, { recursive: true });
copyFileSync(source, target);

console.log("Copied POST.json to " + target);
