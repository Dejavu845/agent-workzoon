# Agent Workzoon · 工区 — Mac / Ezworktree 契约

这是给另一台机器（无 SSH、无 `gh`）用的唯一合同。源码快照对应私有仓 `Dejavu835/dejavu-notes` 分支 `cursor/workzoon-dawn-audit-b80f` 的 `28a92668229b542f45822aea862b5db5358816e5`（《Say the undeclared filter in plain language.》）。

**Ezworktree 原型不是真相。** 磁盘是真相。TypeScript 引擎是唯一执法写入方。UI 只读。

## 产品锁（不要改）

| 锁 | 内容 |
|---|---|
| 名字 | 中文 **工区**，英文 **Agent Workzoon**。不要改回 Lattice 当产品名，不要 Rust / Keel 重命名。 |
| 三主视图 | 只有 **掌控 / 全部分支 / 任务车道**。不要第四视图。 |
| 检查器 | 只有 **清单 · 对照 · 宪章 · 交接 · 范围 · 百科**。 |
| 动词 | 创建 / 归档 worktree 保留。不要 `declared.push` Git GUI。 |
| 百科 | 只收原文。不是向量检索。谁能写，由人定。 |
| 提示语气 | 对普通人说。用户可见文案不要出现 cite / sha / HEAD / ledger / slug / 对象 / 绝对路径。磁盘与 API 的 kind 仍用英文。 |
| Swift | 薄壳，同一引擎 `:7780`。本快照不要求你改 `.swift`。 |
| 演示 | 不要在本仓自己身上 `git worktree add`。`LATTICE_HOME` 必须在被治理的仓外面。Harbor 只允许 throw-before-write；不要 plant / archive / pin / unpin / sync / compile / ingest / decide 真实 Harbor 状态。 |

## 演示数据（你已经用的可以留下）

- `demo-harbor` — 已登记的演示仓
- `api-gateway` — 已登记的演示仓
- `scratch-notepad` — **清单外**（仓库里有、清单里没有。人来处理，不会自动删。）

不要把这些写成真实 Harbor，也不要当成生产仓。

## 在 Mac 上跑（无需凭据）

```bash
git clone https://github.com/Dejavu845/agent-workzoon.git
cd agent-workzoon

# 引擎（Node 22+），家目录放在仓外
export LATTICE_HOME="$HOME/workzoon-home"
mkdir -p "$LATTICE_HOME"
node --experimental-strip-types --test test/*.test.ts
node --experimental-strip-types src/server.ts          # :7780

# 另开终端：预览
cd preview && pnpm install && pnpm dev                 # :5173
```

浏览器打开 `http://127.0.0.1:5173/`。登记一个 **fixture 仓**（不要登记 dejavu-notes 自己，也不要登记这个快照仓当生产 Harbor）。

## 人怎么走一遍

1. 左下「+ 登记仓」给仓库最外面那一层。
2. **掌控**看四格：分支 / 树 / 任务 / 产物。
3. **全部分支**：上是活 worktree 甲板，下是全部分支。清单外那一行要能看见。
4. **任务车道**：一行一卡。先建卡，再对照里「创建 worktree」。
5. 闭环：卡 → 树 → 心跳 → 交接 → 完成。提示说人话。
6. 检查器「百科」只收原文。`/` 搜索，`2` 交接，`n` 下一手。

## 不要做

第四主视图 · 向量百科 · 玻璃重做 · 把工区当 IDE · 自动开 Cursor · 把流程写进仓内 `project.json` · 编造专辑/歌曲 · 把根目录 `pnpm-lock.yaml` 当工区锁文件提交。
