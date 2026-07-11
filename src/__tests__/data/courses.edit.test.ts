import { getCourseForEdit } from "@/data/courses/edit";

const mockFindUnique = jest.fn();
jest.mock("@/lib/prisma", () => ({
  prisma: { course: { findUnique: (...a: unknown[]) => mockFindUnique(...a) } },
}));

beforeEach(() => jest.clearAllMocks());

const row = {
  slug: "node",
  platform: "Udemy",
  year: 2026,
  status: "completed",
  certificateUrl: null,
  repoUrl: null,
  demoUrl: null,
  translations: [
    { locale: "es", title: "Node", shortDescription: "s", fullDescription: "f", topics: [{ label: "L", items: ["a"] }], tags: ["node"] },
  ],
};

describe("getCourseForEdit", () => {
  it("returns undefined when not found", async () => {
    mockFindUnique.mockResolvedValueOnce(null);
    expect(await getCourseForEdit("x")).toBeUndefined();
  });

  it("fills the present locale, empties the missing one and maps null neutrals", async () => {
    mockFindUnique.mockResolvedValueOnce(row);
    const edit = await getCourseForEdit("node");
    expect(edit?.translations.es.title).toBe("Node");
    expect(edit?.translations.es.topics).toEqual([{ label: "L", items: ["a"] }]);
    expect(edit?.translations.en).toEqual({
      title: "", shortDescription: "", fullDescription: "", topics: [], tags: [],
    });
    expect(edit?.certificateUrl).toBe("");
    expect(edit?.demoUrl).toBe("");
  });

  it("defaults null topics to an empty array", async () => {
    mockFindUnique.mockResolvedValueOnce({ ...row, translations: [{ ...row.translations[0], topics: null }] });
    const edit = await getCourseForEdit("node");
    expect(edit?.translations.es.topics).toEqual([]);
  });
});
