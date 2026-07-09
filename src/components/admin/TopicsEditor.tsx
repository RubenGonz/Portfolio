"use client";

import { useState } from "react";

interface Topic {
  label: string;
  items: string[];
}

export function TopicsEditor({ name, defaultValue = [] }: { name: string; defaultValue?: Topic[] }) {
  const [sections, setSections] = useState<Topic[]>(defaultValue);
  const [newSection, setNewSection] = useState("");

  function addSection() {
    const label = newSection.trim();
    if (!label) return;
    setSections([...sections, { label, items: [] }]);
    setNewSection("");
  }

  function removeSection(si: number) {
    setSections(sections.filter((_, i) => i !== si));
  }

  function updateLabel(si: number, label: string) {
    setSections(sections.map((s, i) => (i === si ? { ...s, label } : s)));
  }

  function addItem(si: number, item: string) {
    const value = item.trim();
    if (!value) return;
    setSections(sections.map((s, i) =>
      i === si ? { ...s, items: [...s.items, value] } : s
    ));
  }

  function removeItem(si: number, ii: number) {
    setSections(sections.map((s, i) =>
      i === si ? { ...s, items: s.items.filter((_, j) => j !== ii) } : s
    ));
  }

  return (
    <div className="flex flex-col gap-1.5">
      <span className="font-inputmono text-[11px] tracking-widest uppercase text-subtle">Topics</span>
      <input type="hidden" name={name} value={JSON.stringify(sections)} />

      {/* Add section — top */}
      <input
        type="text"
        value={newSection}
        onChange={(e) => setNewSection(e.target.value)}
        onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addSection(); } }}
        placeholder="New section title… (Enter to add)"
        className="font-inputmono text-sm bg-surface border border-dashed border-line/15 px-3 py-2
          text-fg focus:border-brand/40 focus:outline-none transition-colors"
      />

      {/* Sections */}
      <div className="flex flex-col gap-3 mt-1">
        {sections.map((section, si) => (
          <div key={si} className="border border-line/10 bg-surface p-4 flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={section.label}
                onChange={(e) => updateLabel(si, e.target.value)}
                placeholder="Section title…"
                className="font-inputmono text-sm bg-transparent border-b border-line/10 px-0 py-1
                  text-fg focus:border-brand/40 focus:outline-none transition-colors flex-1"
              />
              <button
                type="button"
                onClick={() => removeSection(si)}
                className="font-inputmono text-[11px] text-subtle hover:text-danger transition-colors shrink-0 cursor-pointer"
              >
                Remove
              </button>
            </div>

            {/* Add item — top */}
            <ItemInput onAdd={(val) => addItem(si, val)} />

            {/* Chips */}
            {section.items.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {section.items.map((item, ii) => (
                  <span
                    key={ii}
                    className="flex items-center gap-1.5 font-inputmono text-xs bg-line/6 border border-line/10 px-2.5 py-1 text-fg"
                  >
                    {item}
                    <button
                      type="button"
                      onClick={() => removeItem(si, ii)}
                      className="text-subtle hover:text-danger transition-colors leading-none cursor-pointer"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function ItemInput({ onAdd }: { onAdd: (val: string) => void }) {
  const [value, setValue] = useState("");

  function submit() {
    if (!value.trim()) return;
    onAdd(value);
    setValue("");
  }

  return (
    <input
      type="text"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); submit(); } }}
      placeholder="Add item… (Enter)"
      className="font-inputmono text-xs bg-transparent border border-dashed border-line/15 px-2 py-1.5
        text-fg focus:border-brand/40 focus:outline-none transition-colors"
    />
  );
}
