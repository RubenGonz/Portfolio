import { getTimeline, getTimelineEntry } from "@/data/timeline";

const mockFindMany   = jest.fn();
const mockFindUnique = jest.fn();

jest.mock("@/lib/prisma", () => ({
  prisma: {
    timelineEntry: {
      findMany:   (...args: unknown[]) => mockFindMany(...args),
      findUnique: (...args: unknown[]) => mockFindUnique(...args),
    },
  },
}));

beforeEach(() => jest.clearAllMocks());

const dbRow = {
  id: "entry-1",
  year: "2025",
  title: "Joined company",
  subtitle: "As frontend dev",
  paragraphs: ["First paragraph.", "Second paragraph."],
  current: true,
  order: 0,
};

describe("getTimeline", () => {
  it("returns mapped entries", async () => {
    mockFindMany.mockResolvedValueOnce([dbRow]);
    const timeline = await getTimeline();
    expect(timeline).toHaveLength(1);
    expect(timeline[0].title).toBe("Joined company");
  });

  it("passes all fields through", async () => {
    mockFindMany.mockResolvedValueOnce([dbRow]);
    const [entry] = await getTimeline();
    expect(entry.id).toBe("entry-1");
    expect(entry.current).toBe(true);
    expect(entry.paragraphs).toHaveLength(2);
  });

  it("returns empty array when no entries", async () => {
    mockFindMany.mockResolvedValueOnce([]);
    const timeline = await getTimeline();
    expect(timeline).toHaveLength(0);
  });
});

describe("getTimelineEntry", () => {
  it("returns entry when found", async () => {
    mockFindUnique.mockResolvedValueOnce(dbRow);
    const entry = await getTimelineEntry("entry-1");
    expect(entry?.year).toBe("2025");
  });

  it("returns undefined when not found", async () => {
    mockFindUnique.mockResolvedValueOnce(null);
    const entry = await getTimelineEntry("missing");
    expect(entry).toBeUndefined();
  });
});
