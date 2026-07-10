"use server";
import { requireAdmin } from "@/lib/auth-guard";

import { put } from "@vercel/blob";

const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const ALLOWED_DOC_TYPES = ["application/pdf"];
const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5 MB
const MAX_DOC_SIZE = 10 * 1024 * 1024;  // 10 MB

export async function uploadImage(fd: FormData): Promise<{ url: string } | { error: string }> {
  await requireAdmin();
  const file = fd.get("file") as File | null;
  if (!file || file.size === 0) return { error: "No file provided." };
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) return { error: "Only JPEG, PNG, WebP or GIF allowed." };
  if (file.size > MAX_IMAGE_SIZE) return { error: "Image must be under 5 MB." };

  const ext = file.name.split(".").pop() ?? "bin";
  const filename = `projects/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const blob = await put(filename, file, { access: "public" });
  return { url: blob.url };
}

export async function uploadDocument(fd: FormData): Promise<{ url: string } | { error: string }> {
  await requireAdmin();
  const file = fd.get("file") as File | null;
  if (!file || file.size === 0) return { error: "No file provided." };
  if (!ALLOWED_DOC_TYPES.includes(file.type)) return { error: "Only PDF allowed." };
  if (file.size > MAX_DOC_SIZE) return { error: "File must be under 10 MB." };

  const originalName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, "-");
  const blob = await put(`documents/${originalName}`, file, {
    access: "public",
    allowOverwrite: true,
  });
  return { url: blob.url };
}
