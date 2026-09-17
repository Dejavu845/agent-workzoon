import { useRef } from "react";
import type { HygieneKind, RepoLane } from "./api";
import { isDeckBay, shorten } from "./lanes";
import { useLocalPointer } from "./motion";

const HYGIENE: Record<HygieneKind, string> = {
  merged: "已合入",
  stale: "14 天无动",
  "no-handoff": "缺交接",
};

function intentOf(branch: string): string {
  const prefix = branch.split("/")[0] || branch;
  if (prefix === "feat" || prefix === "spike" || prefix === "hotfix") return prefix;
  if (prefix === "main" || prefix === "master") return "main";
  return "other";
}

function WorktreeBay({
  lane,
  selected,
  pins,
  nextHand,
  motionOn,
  onSelect,
}: {
  lane: RepoLane;
  selected: boolean;
  pins: number;
  nextHand?: string | null;
  motionOn: boolean;
  onSelect: () => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  useLocalPointer(ref, motionOn);
  const sha = (lane.sha || "").slice(0, 12);
  return (
    <button
      type="button"
      ref={ref}
      className={selected ? `wt-bay on intent-${intentOf(lane.branch)}` : `wt-bay intent-${intentOf(lane.branch)}`}
      onClick={onSelect}
    >
      <i className="wt-die" aria-hidden>
        <i className="wt-die-grid" />
        <i className="wt-die-core" />
      </i>
      <span className="wt-kicker">
        {intentOf(lane.branch)}
        {lane.isHead ? " · HEAD" : ""}
      </span>
      <strong>{lane.branch}</strong>
      <em>{shorten(lane.worktreePath || "")}</em>
      <span className="wt-meta">
        {sha ? <code>@{sha}</code> : <code>无 sha</code>}
        {pins ? <span className="tag">{pins} 版产物</span> : null}
      </span>
      {lane.taskTitle ? <span className="wt-task">{lane.taskTitle}</span> : <span className="wt-task idle">无任务卡</span>}
      {nextHand ? <span className="wt-next">下一手 · {nextHand}</span> : null}
      {lane.undeclared || lane.hygiene?.length ? (
        <span className="wt-hygiene">
          {lane.undeclared ? <span className="tag stop">清单外</span> : null}
          {lane.hygiene?.map((kind) => (
            <span key={kind} className={kind === "no-handoff" ? "tag stop" : "tag idle"}>
              {HYGIENE[kind]}
            </span>
          ))}
        </span>
      ) : null}
    </button>
  );
}

export function WorktreeDeck({
  lanes,
  rootPath,
  pinOf,
  nextOf,
  selectedId,
  motionOn,
  onSelect,
}: {
  lanes: RepoLane[];
  rootPath: string;
  pinOf: (branch: string) => number;
  nextOf?: (lane: RepoLane) => string | null;
  selectedId?: string | null;
  motionOn?: boolean;
  onSelect: (lane: RepoLane) => void;
}) {
  const floorRef = useRef<HTMLElement>(null);
  useLocalPointer(floorRef, Boolean(motionOn));
  const bays = lanes.filter((lane) => isDeckBay(lane, rootPath));
  return (
    <section className="wt-deck" aria-label="工位" ref={floorRef}>
      <div className="wt-grid" aria-hidden />
      <div className="wt-haze" aria-hidden />
      <p className="eyebrow">工位 · {bays.length} 棵检出</p>
      {bays.length === 0 ? (
        <p className="hint">还没有检出。森林里点分支，对照里创建 worktree。</p>
      ) : (
        <ol className="wt-bays">
          {bays.map((lane) => (
            <li key={lane.id}>
              <WorktreeBay
                lane={lane}
                selected={lane.id === selectedId}
                pins={pinOf(lane.branch)}
                nextHand={nextOf?.(lane)}
                motionOn={Boolean(motionOn)}
                onSelect={() => onSelect(lane)}
              />
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}
