import { getProjectForEdit } from "@/data/projects/edit";

const mockFindUnique = jest.fn();
jest.mock("@/lib/prisma", () => ({
  prisma: { project: { findUnique: (...a: unknown[]) => mockFindUnique(...a) } },
}));

beforeEach(() => jest.clearAllMocks());

const row = {
  slug: "app",
  year: 2025,
  status: "live",
  url: null,
  repoUrl: null,
  tags: ["react"],
  images: [
    { name: "b", src: "/2.webp", alt: "2", order: 1 },
    { name: "a", src: "/1.webp", alt: "1", order: 0 },
  ],
  translations: [
    { locale: "en", title: "App", shortDescription: "s", fullDescription: "f", highlights: ["h"], role: "Dev" },
  ],
};

describe("getProjectForEdit", () => {
  it("returns undefined when not found", async () => {
    mockFindUnique.mockResolvedValueOnce(null);
    expect(await getProjectForEdit("x")).toBeUndefined();
  });

  it("fills the present locale and leaves the missing one empty", async () => {
    mockFindUnique.mockResolvedValueOnce(row);
    const edit = await getProjectForEdit("app");
    expect(edit?.translations.en.title).toBe("App");
    expect(edit?.translations.en.role).toBe("Dev");
    expect(edit?.translations.es).toEqual({
      title: "", shortDescription: "", fullDescription: "", highlights: [], role: "",
    });
  });

  it("maps null neutral fields to empty strings and sorts images by order", async () => {
    mockFindUnique.mockResolvedValueOnce(row);
    const edit = await getProjectForEdit("app");
    expect(edit?.url).toBe("");
    expect(edit?.repoUrl).toBe("");
    expect(edit?.images.map((i) => i.src)).toEqual(["/1.webp", "/2.webp"]);
  });

  it("maps a null role to an empty string", async () => {
    mockFindUnique.mockResolvedValueOnce({ ...row, translations: [{ ...row.translations[0], role: null }] });
    const edit = await getProjectForEdit("app");
    expect(edit?.translations.en.role).toBe("");
  });
});
