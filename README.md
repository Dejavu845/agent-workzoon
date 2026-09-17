# Agent Workzoon · 工区

人掌控仓库、分支、源码 checkout 和产物；Agent 在宪章和一棵已登记的 worktree 里规范开发。知识层是 Karpathy 式 LLM wiki：`raw/` 原文、`wiki/` 编译页。`.lattice/HOLDINGS.md` 是两边共用的资产清单。

这不是 Cursor / Claude / Codex 的启动器。引擎只做治理：冻层、允许路径、爆炸半径、强制交接、编译实体页。

**不是**：Git GUI、IDE、聊天壳、终端复用器、Gas Town 式编排器。不启动 Agent 进程，不看 diff 正文，不合入分支。

> 这是公开快照。私有源仓 `Dejavu835/dejavu-notes` 我这边没有管理员权限，改不了可见性。快照对齐 `28a92668229b542f45822aea862b5db5358816e5`（`cursor/workzoon-dawn-audit-b80f`）。Mac 上无 SSH / `gh` 时，clone 这个仓即可。契约见 [`BRIEF.md`](BRIEF.md)。

## 在这台机器上跑

```bash
git clone https://github.com/Dejavu845/agent-workzoon.git
cd agent-workzoon
export LATTICE_HOME="${LATTICE_HOME:-$HOME/workzoon-home}"
mkdir -p "$LATTICE_HOME"
node --experimental-strip-types --test test/*.test.ts
node --experimental-strip-types src/server.ts   # :7780
cd preview && pnpm install && pnpm dev          # :5173
```

`cd preview && pnpm install && pnpm dev` will stitch App.tsx from the four parts before Vite starts. The four parts concatenate to the 28a9266 App.tsx (94386 bytes).

`LATTICE_HOME` 必须在被治理的仓外面。不要对正在开发的主树随手 `git worktree add`。演示请登记 fixture 仓（例如 `demo-harbor`、`api-gateway`；清单外可用 `scratch-notepad`）。

## CLI

默认身份是 **agent**（fail closed）。人必须传 `--actor human`。`ask` 会写成 `.lattice/requests/<id>.json` 并退出码 2。

```bash
node --experimental-strip-types src/cli.ts init --root /path/to/repo --name Harbor --group studio
node --experimental-strip-types src/cli.ts task --root /path/to/repo --title "Fix player" --allow app/** --actor human
node --experimental-strip-types src/cli.ts tree --root /path/to/repo --task <id> --actor human
node --experimental-strip-types src/cli.ts handoff --root /path/to/repo --task <id>
node --experimental-strip-types src/cli.ts done --root /path/to/repo --task <id> --actor human
```

## macOS 原生

`macos/Lattice/` 是 SwiftUI 薄壳，打 `http://127.0.0.1:7780`。差距见 [`docs/SWIFT-GAP.md`](docs/SWIFT-GAP.md)。人走完整流程以 preview 为准。
