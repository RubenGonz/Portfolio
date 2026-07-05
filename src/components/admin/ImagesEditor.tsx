"use client";

import { useState, useRef } from "react";

interface ImageEntry {
  src: string;
  alt: string;
}

interface Props {
  defaultValue?: ImageEntry[];
}

export function ImagesEditor({ defaultValue = [] }: Props) {
  const [images, setImages] = useState<ImageEntry[]>(defaultValue);
  const srcRef = useRef<HTMLInputElement>(null);
  const altRef = useRef<HTMLInputElement>(null);

  function add() {
    const src = srcRef.current?.value.trim() ?? "";
    const alt = altRef.current?.value.trim() ?? "";
    if (!src) return;
    setImages((prev) => [...prev, { src, alt }]);
    if (srcRef.current) srcRef.current.value = "";
    if (altRef.current) altRef.current.value = "";
    srcRef.current?.focus();
  }

  function remove(i: number) {
    setImages((prev) => prev.filter((_, idx) => idx !== i));
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") { e.preventDefault(); add(); }
  }

  return (
    <div className="flex flex-col gap-3">
      <span className="font-inputmono text-[11px] text-muted tracking-widest uppercase">Images</span>

      {/* Inputs */}
      <div className="flex gap-2">
        <input
          ref={srcRef}
          type="text"
          placeholder="/images/projects/foo/bar.webp"
          onKeyDown={onKeyDown}
          className="flex-1 bg-surface border border-line/10 px-3 py-2 font-inputmono text-xs text-fg placeholder:text-faint focus:outline-none focus:border-brand/50"
        />
        <input
          ref={altRef}
          type="text"
          placeholder="Alt text"
          onKeyDown={onKeyDown}
          className="w-48 bg-surface border border-line/10 px-3 py-2 font-inputmono text-xs text-fg placeholder:text-faint focus:outline-none focus:border-brand/50"
        />
      </div>

      {/* List */}
      {images.map((img, i) => (
        <div key={i} className="flex items-start gap-2 border border-line/10 px-3 py-2">
          <div className="flex-1 min-w-0">
            <p className="font-inputmono text-xs text-fg truncate">{img.src}</p>
            <p className="font-inputmono text-[11px] text-faint truncate">{img.alt || "—"}</p>
          </div>
          <button
            type="button"
            onClick={() => remove(i)}
            className="font-inputmono text-xs text-faint hover:text-danger transition-colors shrink-0"
          >
            ×
          </button>
        </div>
      ))}

      {/* Hidden inputs — one pair per image */}
      {images.map((img, i) => (
        <span key={i}>
          <input type="hidden" name="images_src" value={img.src} />
          <input type="hidden" name="images_alt" value={img.alt} />
        </span>
      ))}
    </div>
  );
}
