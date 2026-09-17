import type { AppSettings } from "./api";

export type OpenRecipe = {
  openIn: AppSettings["openIn"];
  label: string;
  command: string;
};

const OPEN_LABEL: Record<AppSettings["openIn"], string> = {
  cursor: "将在 Cursor 打开",
  vscode: "将在 VS Code 打开",
  finder: "将在 Finder 打开",
  terminal: "将在终端打开",
  none: "只复制路径",
};

function quotePath(path: string): string {
  if (!path) return path;
  if (/[\s'"$`\\]/.test(path)) return `"${path.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
  return path;
}

/** Copy-only recipe. Preview never spawns Cursor / VS Code / Finder / terminal. */
export function openRecipe(openIn: AppSettings["openIn"] | undefined, path: string): OpenRecipe {
  const mode = openIn === "vscode" || openIn === "finder" || openIn === "terminal" || openIn === "none" ? openIn : "cursor";
  const quoted = quotePath(path.trim());
  const command =
    mode === "none" ? path.trim() : mode === "vscode" ? `code ${quoted}` : mode === "finder" ? `open ${quoted}` : mode === "terminal" ? `cd ${quoted}` : `cursor ${quoted}`;
  return { openIn: mode, label: OPEN_LABEL[mode], command };
}
