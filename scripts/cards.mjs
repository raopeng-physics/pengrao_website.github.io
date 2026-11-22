// Turns every card.svg in the built site into card.png (the link-preview images; see layouts/partials/meta.html).
// Runs during deployment: node scripts/cards.mjs public
import { readFileSync, writeFileSync, readdirSync, statSync, unlinkSync } from "node:fs";
import { join } from "node:path";
import { Resvg } from "@resvg/resvg-js";

const root = process.argv[2] || "public";
const fontDir = new URL("../assets/cards/fonts/", import.meta.url).pathname;
const fontFiles = readdirSync(fontDir).filter((f) => f.endsWith(".ttf")).map((f) => join(fontDir, f));

function* walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) yield* walk(p);
    else if (name === "card.svg") yield p;
  }
}

let n = 0;
for (const svg of walk(root)) {
  const png = new Resvg(readFileSync(svg, "utf8"), {
    font: { fontFiles, loadSystemFonts: false, defaultFontFamily: "IBM Plex Sans" },
  }).render().asPng();
  writeFileSync(svg.replace(/\.svg$/, ".png"), png);
  unlinkSync(svg);
  n++;
}
console.log(`cards: rendered ${n} preview image(s)`);
