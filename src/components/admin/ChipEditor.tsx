"use client";

import { useState, useRef } from "react";

interface ChipEditorProps {
  label: string;
  name: string;
  defaultValue?: string[];
  hint?: string;
}

export function ChipEditor({ label, name, defaultValue = [], hint }: ChipEditorProps) {
  const [chips, setChips] = useState<string[]>(defaultValue);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  function add() {
    const value = input.trim();
    if (!value || chips.includes(value)) { setInput(""); return; }
    setChips([...chips, value]);
    setInput("");
    inputRef.current?.focus();
  }

  function remove(index: number) {
    setChips(chips.filter((_, i) => i !== index));
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") { e.preventDefault(); add(); }
    if (e.key === "Backspace" && input === "" && chips.length > 0) {
      setChips(chips.slice(0, -1));
    }
  }

  return (
    <div className="flex flex-col gap-1.5">
      <span className="font-inputmono text-[11px] tracking-widest uppercase text-subtle">{label}</span>

      {/* Hidden input carries the value for the server action */}
      <input type="hidden" name={name} value={chips.join("\n")} />

      <input
        ref={inputRef}
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={onKeyDown}
        onBlur={add}
        placeholder="Type and press Enter…"
        className="font-inputmono text-sm bg-surface border border-line/10 px-3 py-2
          text-fg focus:border-brand/50 focus:outline-none transition-colors"
      />

      {chips.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-0.5">
          {chips.map((chip, i) => (
            <span
              key={i}
              className="flex items-center gap-1.5 font-inputmono text-xs bg-line/6 border border-line/10 px-2.5 py-1 text-fg"
            >
              {chip}
              <button
                type="button"
                onClick={() => remove(i)}
                className="text-subtle hover:text-danger transition-colors leading-none cursor-pointer"
                aria-label={`Remove ${chip}`}
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}

      {hint && <span className="font-inputmono text-[10px] text-subtle/60">{hint}</span>}
    </div>
  );
}
