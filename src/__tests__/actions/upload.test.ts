import { uploadImage, uploadDocument } from "@/actions/upload";

jest.mock("@vercel/blob", () => ({
  put: jest.fn().mockResolvedValue({ url: "https://blob.example.com/file.pdf" }),
}));

function makeFile(name: string, type: string, size: number): File {
  const file = new File(["x".repeat(size)], name, { type });
  return file;
}

function makeFormData(file: File): FormData {
  const fd = new FormData();
  fd.append("file", file);
  return fd;
}

describe("uploadImage", () => {
  it("returns error when no file provided", async () => {
    const fd = new FormData();
    const result = await uploadImage(fd);
    expect(result).toEqual({ error: "No file provided." });
  });

  it("returns error for disallowed file type", async () => {
    const file = makeFile("doc.pdf", "application/pdf", 100);
    const result = await uploadImage(makeFormData(file));
    expect(result).toEqual({ error: "Only JPEG, PNG, WebP or GIF allowed." });
  });

  it("returns error when file exceeds 5 MB", async () => {
    const file = makeFile("big.jpg", "image/jpeg", 6 * 1024 * 1024);
    const result = await uploadImage(makeFormData(file));
    expect(result).toEqual({ error: "Image must be under 5 MB." });
  });

  it("returns url on valid image", async () => {
    const file = makeFile("photo.jpg", "image/jpeg", 100);
    const result = await uploadImage(makeFormData(file));
    expect(result).toHaveProperty("url");
  });
});

describe("uploadDocument", () => {
  it("returns error when no file provided", async () => {
    const fd = new FormData();
    const result = await uploadDocument(fd);
    expect(result).toEqual({ error: "No file provided." });
  });

  it("returns error for disallowed file type", async () => {
    const file = makeFile("img.jpg", "image/jpeg", 100);
    const result = await uploadDocument(makeFormData(file));
    expect(result).toEqual({ error: "Only PDF allowed." });
  });

  it("returns error when file exceeds 10 MB", async () => {
    const file = makeFile("big.pdf", "application/pdf", 11 * 1024 * 1024);
    const result = await uploadDocument(makeFormData(file));
    expect(result).toEqual({ error: "File must be under 10 MB." });
  });

  it("returns url on valid PDF", async () => {
    const file = makeFile("cv.pdf", "application/pdf", 100);
    const result = await uploadDocument(makeFormData(file));
    expect(result).toHaveProperty("url");
  });
});
