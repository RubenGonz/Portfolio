"use client";

import { useRef, useState } from "react";
import { uploadDocument, uploadImage } from "@/actions/upload";
import { updateCvUrl } from "@/actions/home";

interface Props {
  cvUrl: string;
}

function UploadField({
  label,
  hint,
  accept,
  currentUrl,
  uploading,
  onUpload,
}: {
  label: string;
  hint: string;
  accept: string;
  currentUrl: string;
  uploading: boolean;
  onUpload: (file: File) => Promise<void>;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [localUploading, setLocalUploading] = useState(false);

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError(null);
    setLocalUploading(true);
    await onUpload(file).catch((err) => setError(String(err)));
    setLocalUploading(false);
    if (fileRef.current) fileRef.current.value = "";
  }

  const busy = uploading || localUploading;

  return (
    <div className="flex flex-col gap-2">
      <span className="font-inputmono text-[11px] text-muted tracking-widest uppercase">{label}</span>
      {currentUrl && (
        <p className="font-inputmono text-[11px] text-subtle truncate">{currentUrl}</p>
      )}
      <label className={`flex items-center gap-3 border border-dashed border-line/20 px-4 py-3 cursor-pointer hover:border-brand/40 transition-colors ${busy ? "opacity-50 pointer-events-none" : ""}`}>
        <input ref={fileRef} type="file" accept={accept} onChange={handleChange} className="sr-only" />
        <span className="font-inputmono text-[11px] text-muted tracking-widest uppercase">
          {busy ? "Uploading…" : currentUrl ? "Replace file" : "Choose file"}
        </span>
        <span className="font-inputmono text-[10px] text-faint">{hint}</span>
      </label>
      {error && <p className="font-inputmono text-[11px] text-danger">{error}</p>}
    </div>
  );
}

export function FileUploader({ cvUrl }: Props) {
  const [busy, setBusy] = useState(false);
  const [cvCurrent, setCvCurrent] = useState(cvUrl);

  async function handleCv(file: File) {
    setBusy(true);
    const fd = new FormData();
    fd.append("file", file);
    const result = await uploadDocument(fd);
    if ("error" in result) throw new Error(result.error);
    await updateCvUrl(result.url);
    setCvCurrent(result.url);
    setBusy(false);
  }

  return (
    <div className="flex flex-col gap-8 max-w-2xl">
      <UploadField
        label="CV / Resume"
        hint="PDF · max 10 MB"
        accept="application/pdf"
        currentUrl={cvCurrent}
        uploading={busy}
        onUpload={handleCv}
      />
    </div>
  );
}
