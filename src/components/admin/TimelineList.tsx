"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { reorderTimeline, deleteTimelineEntry, toggleTimelineCurrent } from "@/actions/timeline";
import { DeleteButton } from "./DeleteButton";
import { useRouter } from "next/navigation";
import type { TimelineEntry } from "@/data/timeline";

function CurrentToggle({ id, current: initial }: { id: string; current: boolean }) {
  const [current, setCurrent] = useState(initial);

  async function toggle() {
    const next = !current;
    await toggleTimelineCurrent(id, next);
    setCurrent(next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      title={current ? "Unmark as current" : "Mark as current"}
      className={`font-inputmono text-[10px] tracking-widest uppercase border px-2 py-1 transition-colors ${
        current
          ? "border-brand/40 text-brand bg-brand/5"
          : "border-line/10 text-faint hover:text-subtle hover:border-line/20"
      }`}
    >
      now
    </button>
  );
}

export function TimelineList({ entries }: { entries: TimelineEntry[] }) {
  const [items, setItems] = useState(entries);
  const dragIndex = useRef<number | null>(null);
  const router = useRouter();

  function onDragStart(index: number) {
    dragIndex.current = index;
  }

  function onDragOver(e: React.DragEvent, index: number) {
    e.preventDefault();
    if (dragIndex.current === null || dragIndex.current === index) return;
    const next = [...items];
    const [moved] = next.splice(dragIndex.current, 1);
    next.splice(index, 0, moved);
    dragIndex.current = index;
    setItems(next);
  }

  async function onDrop() {
    dragIndex.current = null;
    await reorderTimeline(items.map((i) => i.id));
    router.refresh();
  }

  return (
    <div className="flex flex-col gap-1.5">
      {items.map((entry, index) => (
        <div
          key={entry.id}
          draggable
          onDragStart={() => onDragStart(index)}
          onDragOver={(e) => onDragOver(e, index)}
          onDrop={onDrop}
          className="flex items-center justify-between border border-line/10 bg-surface px-5 py-3 cursor-grab active:cursor-grabbing active:opacity-60 transition-opacity select-none"
        >
          <div className="flex items-center gap-3">
            <span className="text-subtle text-xs">⠿</span>
            <div>
              <p className="font-inputmono text-sm text-fg">{entry.title}</p>
              <p className="font-inputmono text-[10px] text-subtle">{entry.year}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <CurrentToggle id={entry.id} current={entry.current} />
            <Link
              href={`/admin/timeline/${entry.id}/edit`}
              className="font-inputmono text-[11px] tracking-widest uppercase text-subtle hover:text-fg transition-colors"
            >
              Edit
            </Link>
            <DeleteButton action={deleteTimelineEntry.bind(null, entry.id)} label="Delete" />
          </div>
        </div>
      ))}
      {items.length === 0 && (
        <p className="font-inputmono text-sm text-subtle">No entries yet.</p>
      )}
    </div>
  );
}
