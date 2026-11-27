// Next 16 static export writes nested route-segment payloads as `__next.<seg>/__PAGE__.txt`,
// but the client router prefetches the flat name `__next.<seg>.__PAGE__.txt`. Without the flat
// copies, every prefetch of a nested route 404s on static hosts (GitHub Pages, python http.server).
import { copyFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../out/", import.meta.url));
let copied = 0;

function flatten(dir, prefix, segDir) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) {
      flatten(full, `${prefix}.${name}`, segDir);
    } else {
      const target = join(segDir, `${prefix}.${name}`);
      if (!existsSync(target)) {
        copyFileSync(full, target);
        copied++;
      }
    }
  }
}

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (!statSync(full).isDirectory()) continue;
    if (name.startsWith("__next.")) flatten(full, name, dir);
    else if (name !== "_next") walk(full);
  }
}

if (!existsSync(root)) {
  console.error(`flatten-rsc: ${root} not found — run next build first`);
  process.exit(1);
}
walk(root);
console.log(`flatten-rsc: wrote ${copied} flat segment file(s)`);
