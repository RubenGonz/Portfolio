import { getTimelineEntryForEdit } from "@/data/timeline/edit";

const mockFindUnique = jest.fn();
jest.mock("@/lib/prisma", () => ({
  prisma: { timelineEntry: { findUnique: (...a: unknown[]) => mockFindUnique(...a) } },
}));

beforeEach(() => jest.clearAllMocks());

const row = {
  id: "t1",
  year: "2025",
  current: true,
  translations: [{ locale: "en", title: "Started", subtitle: null, paragraphs: ["p1"] }],
};

describe("getTimelineEntryForEdit", () => {
  it("returns undefined when not found", async () => {
    mockFindUnique.mockResolvedValueOnce(null);
    expect(await getTimelineEntryForEdit("x")).toBeUndefined();
  });

  it("maps null subtitle to empty and empties the missing locale", async () => {
    mockFindUnique.mockResolvedValueOnce(row);
    const edit = await getTimelineEntryForEdit("t1");
    expect(edit?.translations.en).toEqual({ title: "Started", subtitle: "", paragraphs: ["p1"] });
    expect(edit?.translations.es).toEqual({ title: "", subtitle: "", paragraphs: [] });
    expect(edit?.year).toBe("2025");
    expect(edit?.current).toBe(true);
  });
});
