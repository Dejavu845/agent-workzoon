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
