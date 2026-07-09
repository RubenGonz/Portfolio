"use client";

import { useState, useRef } from "react";
import { addStackItem, deleteStackItem, moveStackItem } from "@/actions/stack";
import { useRouter } from "next/navigation";
import type { StackCategory, StackItemWithId } from "@/data/stack";

const TIERS = [
  { key: "professional", label: "Professional" },
  { key: "active",       label: "Active" },
  { key: "familiar",     label: "Familiar" },
] as const;

type TierKey = "professional" | "active" | "familiar";

function TierColumn({
  category,
  tier,
  items,
  onDelete,
  onAdd,
  onDrop,
}: {
  category: string;
  tier: TierKey;
  items: StackItemWithId[];
  onDelete: (id: string) => void;
  onAdd: (name: string) => void;
  onDrop: (id: string, fromTier: TierKey, toTier: TierKey) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [input, setInput] = useState("");
  const [dragOver, setDragOver] = useState(false);

  function submit() {
    const val = input.trim();
    if (!val) return;
    onAdd(val);
    setInput("");
  }

  function onDragOver(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(true);
  }

  function onDragLeave() {
    setDragOver(false);
  }

  function onDropColumn(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    const id = e.dataTransfer.getData("itemId");
    const fromTier = e.dataTransfer.getData("fromTier") as TierKey;
    if (id && fromTier !== tier) {
      onDrop(id, fromTier, tier);
    }
  }

  return (
    <div
      className={`flex flex-col gap-2 min-h-[80px] p-2 border transition-colors ${
        dragOver ? "border-brand/30 bg-brand/3" : "border-transparent"
      }`}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDropColumn}
    >
      <p className="font-inputmono text-[10px] tracking-widest uppercase text-subtle">{tier}</p>

      {/* Input at top */}
      <input
        ref={inputRef}
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); submit(); } }}
        placeholder="Add…"
        className="font-inputmono text-xs bg-surface border border-dashed border-line/15 px-2 py-1.5
          text-fg focus:border-brand/40 focus:outline-none transition-colors w-full"
      />

      {/* Items */}
      {items.map((item) => (
        <div
          key={item.id}
          draggable
          onDragStart={(e) => {
            e.dataTransfer.setData("itemId", item.id);
            e.dataTransfer.setData("fromTier", tier);
          }}
          className="flex items-center justify-between border border-line/10 bg-surface px-3 py-1.5 cursor-grab active:opacity-50 select-none"
        >
          <span className="font-inputmono text-xs text-fg">{item.name}</span>
          <button
            type="button"
            onClick={() => onDelete(item.id)}
            className="font-inputmono text-[11px] text-subtle hover:text-danger transition-colors ml-2 cursor-pointer"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
}

export function StackAdmin({ categories }: { categories: StackCategory[] }) {
  const [data, setData] = useState(categories);
  const router = useRouter();

  async function handleDelete(id: string) {
    if (!confirm("Delete this item? This cannot be undone.")) return;
    setData(data.map((cat) => ({ ...cat, items: cat.items.filter((i) => i.id !== id) })));
    await deleteStackItem(id);
    router.refresh();
  }

  async function handleAdd(category: string, tier: string, name: string) {
    await addStackItem(name, category, tier);
    router.refresh();
  }

  async function handleMove(category: string, id: string, fromTier: TierKey, toTier: TierKey) {
    setData(data.map((cat) => {
      if (cat.label !== category) return cat;
      const item = cat.items.find((i) => i.id === id);
      if (!item) return cat;
      return { ...cat, items: cat.items.map((i) => i.id === id ? { ...i, tier: toTier } : i) };
    }));
    await moveStackItem(id, toTier);
    router.refresh();
  }

  return (
    <div className="flex flex-col gap-8">
      {data.map((cat) => {
        const byTier = (tier: TierKey) => cat.items.filter((i) => i.tier === tier);

        return (
          <div key={cat.label}>
            <p className="font-inputmono text-[11px] tracking-widest uppercase text-subtle mb-3 pb-2 border-b border-line/6">
              {cat.label}
            </p>
            <div className="grid grid-cols-3 gap-4">
              {TIERS.map(({ key }) => (
                <TierColumn
                  key={key}
                  category={cat.label}
                  tier={key}
                  items={byTier(key)}
                  onDelete={handleDelete}
                  onAdd={(name) => handleAdd(cat.label, key, name)}
                  onDrop={(id, from, to) => handleMove(cat.label, id, from, to)}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
