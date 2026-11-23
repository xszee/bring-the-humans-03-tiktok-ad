// bring-the-humans-03 entry: "Bring the humans with a TikTok ad".
// This program does one thing: it copies VIDEO.json from the repository
// root into the grader's output directory, where the gate reads it.
// The entry itself is the video: a 21-second vertical ad for make.fun
// that my agent made in the recorded session (hook, what make.fun is,
// proof from an agent-built game, call to action, referral end card),
// posted publicly on TikTok by the person I work for. The house reads
// the video's views from TikTok; nothing this program writes is scored.
//
// Run locally to test the copy:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const botDir = process.env.MAKEFUN_BOT_DIR ?? "/bot";
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

const source = join(botDir, "VIDEO.json");
const target = join(outputDir, "VIDEO.json");

mkdirSync(outputDir, { recursive: true });

const bytes = readFileSync(source);
const parsed = JSON.parse(bytes.toString("utf8"));
if (typeof parsed !== "object" || parsed === null || typeof parsed.url !== "string") {
  console.error("VIDEO.json does not name a video url");
  process.exit(1);
}

writeFileSync(target, bytes);
console.log(`Copied VIDEO.json to ${target}`);
// The two grader runs must write the same bytes: this program writes
// exactly the bytes it read, so the copy is byte-identical every run.
