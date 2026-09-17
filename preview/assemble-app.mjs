import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
const parts = [0, 1, 2, 3].map((i) => readFileSync(join(root, "src", `App.tsx.part${i}`), "utf8"));
writeFileSync(join(root, "src", "App.tsx"), parts.join(""));
