import { Fragment, memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  setMotionPreference,
  useChromeMotion,
  useFocusReceive,
  useForgeParallax,
  useGlassSpecular,
  usePane,
  usePop,
  useRise,
  useScene,
} from "./motion";
import {
  api,
  type AgentAction,
  type AppSettings,
  type AppSkin,
  type BlastReport,
  type Consent,
  type ConsentRequest,
  type Drift,
  type Holdings,
  type Policy,
  type PolicyPreset,
  type Project,
  type RepoLane,
  type Snapshot,
  type SourceEntry,
  type Task,
  type HygieneKind,
  type Occupancy,
  type ProcessGraph,
  type ProcessStep,
  type WikiLint,
  type WikiPage,
} from "./api";
import { onDutySatellites, PROCESS_STEPS, processStripView, stripLabel } from "./graph";
import { bayPath, formatIdle, groupLanes, laneOf, liveBayCount, resolveSelection, shorten } from "./lanes";
import { WorktreeDeck } from "./WorktreeDeck";
import { openRecipe } from "./open";
import { resolveWikiLink } from "./wiki";
import { WikiPane } from "./WikiPane";
import { LoopRail } from "./LoopRail";
import { isTypingTarget, shortcutFor } from "./keys";
import { loopForLane, loopFromOccupancy, nextHandIntent, type LoopStep } from "./loop";

const POLICY_ACTIONS: { id: AgentAction; label: string; destructive: boolean; group: "任务" | "分支" | "宪章" | "百科" }[] = [
  { id: "createTask", label: "开新任务", destructive: false, group: "任务" },
  { id: "markDone", label: "标记任务完成", destructive: false, group: "任务" },
  { id: "escalateFrozen", label: "给自己的任务开「动冻层」", destructive: true, group: "任务" },
  { id: "createBranch", label: "为任务建分支和 worktree", destructive: false, group: "分支" },
  { id: "plantBranch", label: "检出已有分支为 worktree", destructive: false, group: "分支" },
  { id: "archiveWorktree", label: "归档干净的 worktree（留分支）", destructive: false, group: "分支" },
  { id: "archiveWorktreeForce", label: "丢弃未提交改动并归档", destructive: true, group: "分支" },
  { id: "deleteBranch", label: "删除分支", destructive: true, group: "分支" },
  { id: "editCharter", label: "修改宪章", destructive: true, group: "宪章" },
  { id: "ingestRaw", label: "收入原文到 raw/", destructive: false, group: "百科" },
  { id: "lintFix", label: "lint 自动补 index", destructive: false, group: "百科" },
];
const POLICY_GROUPS: Array<(typeof POLICY_ACTIONS)[number]["group"]> = ["任务", "分支", "宪章", "百科"];
const TASK_STATUSES: Task["status"][] = ["backlog", "active", "review", "done", "blocked"];
const CONSENT_LABEL: Record<Consent, string> = { never: "禁止", ask: "需确认", allow: "允许" };
type Tab = "task" | "holdings" | "charter" | "handoff" | "wiki" | "blast";
type Filter = "all" | "active" | "review" | "done" | "hygiene" | "undeclared";
type View = "holdings" | "forest" | "lanes";
const STATUS: Record<Task["status"], string> = { backlog: "待开始", active: "进行中", review: "待审", done: "已完成", blocked: "受阻" };
const VIEW_LABEL: Record<View, string> = { holdings: "掌控", forest: "全部分支", lanes: "任务车道" };
const TAB_LABEL: Record<Tab, string> = { holdings: "清单", task: "对照", charter: "宪章", handoff: "交接", blast: "范围", wiki: "百科" };
export function App() { return <div className="mac">工区</div>; }
