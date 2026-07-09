"use client";

import { useState, useRef } from "react";
import { uploadImage } from "@/actions/upload";

interface ImageEntry {
  name: string;
  src: string;
  alt: string;
}

interface Props {
  defaultValue?: ImageEntry[];
}

export function ImagesEditor({ defaultValue = [] }: Props) {
  const [images, setImages] = useState<ImageEntry[]>(defaultValue);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [pendingName, setPendingName] = useState("");
  const [pendingAlt, setPendingAlt] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setUploadError(null);
    const fd = new FormData();
    fd.append("file", file);
    const result = await uploadImage(fd);
    setUploading(false);
    if ("error" in result) {
      setUploadError(result.error);
    } else {
      setImages((prev) => [...prev, { name: pendingName.trim(), src: result.url, alt: pendingAlt.trim() }]);
      setPendingName("");
      setPendingAlt("");
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  function remove(i: number) {
    setImages((prev) => prev.filter((_, idx) => idx !== i));
  }

  return (
    <div className="flex flex-col gap-3">
      <span className="font-inputmono text-[11px] text-muted tracking-widest uppercase">Images</span>

      {/* Upload fields */}
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Name (e.g. hero, dashboard, mobile)"
            value={pendingName}
            onChange={(e) => setPendingName(e.target.value)}
            className="flex-1 bg-surface border border-line/10 px-3 py-2 font-inputmono text-xs text-fg placeholder:text-faint focus:outline-none focus:border-brand/50"
          />
          <input
            type="text"
            placeholder="Alt text (accessibility)"
            value={pendingAlt}
            onChange={(e) => setPendingAlt(e.target.value)}
            className="flex-1 bg-surface border border-line/10 px-3 py-2 font-inputmono text-xs text-fg placeholder:text-faint focus:outline-none focus:border-brand/50"
          />
        </div>
        <label className={`flex items-center gap-3 border border-dashed border-line/20 px-4 py-3 cursor-pointer hover:border-brand/40 transition-colors ${uploading ? "opacity-50 pointer-events-none" : ""}`}>
          <input
            ref={fileRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            onChange={handleFileChange}
            className="sr-only"
          />
          <span className="font-inputmono text-[11px] text-muted tracking-widest uppercase">
            {uploading ? "Uploading…" : "Choose image"}
          </span>
          <span className="font-inputmono text-[10px] text-faint">JPEG · PNG · WebP · GIF · max 5 MB</span>
        </label>
        {uploadError && <p className="font-inputmono text-[11px] text-danger">{uploadError}</p>}
      </div>

      {/* Current images */}
      {images.map((img, i) => (
        <div key={i} className="flex items-start gap-2 border border-line/10 px-3 py-2">
          <div className="flex-1 min-w-0 flex flex-col gap-0.5">
            <p className="font-inputmono text-xs text-fg">{img.name || <span className="text-faint">—</span>}</p>
            <p className="font-inputmono text-[11px] text-subtle truncate">{img.src}</p>
            <p className="font-inputmono text-[10px] text-faint">{img.alt || "—"}</p>
          </div>
          <button
            type="button"
            onClick={() => remove(i)}
            className="font-inputmono text-xs text-faint hover:text-danger transition-colors shrink-0 pt-0.5 cursor-pointer"
          >
            ×
          </button>
        </div>
      ))}

      {/* Hidden inputs */}
      {images.map((img, i) => (
        <span key={i}>
          <input type="hidden" name="images_name" value={img.name} />
          <input type="hidden" name="images_src"  value={img.src} />
          <input type="hidden" name="images_alt"  value={img.alt} />
        </span>
      ))}
    </div>
  );
}
