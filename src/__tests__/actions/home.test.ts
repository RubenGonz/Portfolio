import { updateHero, updateTicker, updateAvailable, updateContact } from "@/actions/home";

const mockUpsert = jest.fn().mockResolvedValue({});
const mockTransaction = jest.fn().mockResolvedValue([]);

jest.mock("@/lib/prisma", () => ({
  prisma: {
    setting: {
      upsert: (...args: unknown[]) => mockUpsert(...args),
      findUnique: jest.fn().mockResolvedValue(null),
    },
    $transaction: (...args: unknown[]) => mockTransaction(...args),
  },
}));

jest.mock("@vercel/blob", () => ({ del: jest.fn().mockResolvedValue({}) }));
jest.mock("next/cache", () => ({ revalidatePath: jest.fn() }));
jest.mock("next/navigation", () => ({
  redirect: jest.fn().mockImplementation(() => { throw new Error("NEXT_REDIRECT"); }),
}));

function fd(entries: Record<string, string>): FormData {
  const form = new FormData();
  Object.entries(entries).forEach(([k, v]) => form.append(k, v));
  return form;
}

describe("updateHero", () => {
  it("returns error when title is missing", async () => {
    const result = await updateHero(undefined, fd({ hero_title: "", hero_description: "desc" }));
    expect(result).toBe("Title and description are required.");
  });

  it("returns error when description is missing", async () => {
    const result = await updateHero(undefined, fd({ hero_title: "Title", hero_description: "" }));
    expect(result).toBe("Title and description are required.");
  });

  it("redirects on success", async () => {
    await expect(
      updateHero(undefined, fd({ hero_title: "Title", hero_description: "Desc", hero_tagline: "Tag" }))
    ).rejects.toThrow("NEXT_REDIRECT");
  });
});

describe("updateTicker", () => {
  it("upserts ticker text and redirects", async () => {
    await expect(
      updateTicker(undefined, fd({ ticker_text: "React · TypeScript" }))
    ).rejects.toThrow("NEXT_REDIRECT");
    expect(mockUpsert).toHaveBeenCalled();
  });
});

describe("updateAvailable", () => {
  it("saves true when checkbox is checked", async () => {
    await expect(
      updateAvailable(undefined, fd({ available: "on", available_label: "Available" }))
    ).rejects.toThrow("NEXT_REDIRECT");
    expect(mockTransaction).toHaveBeenCalled();
  });

  it("saves false when checkbox is unchecked", async () => {
    await expect(
      updateAvailable(undefined, fd({ available_label: "Available" }))
    ).rejects.toThrow("NEXT_REDIRECT");
    expect(mockTransaction).toHaveBeenCalled();
  });

  it("falls back to 'Available' when label is empty", async () => {
    await expect(
      updateAvailable(undefined, fd({ available: "on", available_label: "" }))
    ).rejects.toThrow("NEXT_REDIRECT");
  });
});

describe("updateContact", () => {
  it("returns error when headline is missing", async () => {
    const result = await updateContact(undefined, fd({ contact_headline: "" }));
    expect(result).toBe("Headline is required.");
  });

  it("redirects on success", async () => {
    await expect(
      updateContact(undefined, fd({ contact_headline: "Let's talk.", contact_subtext: "Available." }))
    ).rejects.toThrow("NEXT_REDIRECT");
  });
});
