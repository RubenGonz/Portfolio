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
  current: true,
  order: 0,
  translations: [
    { locale: "en", title: "Joined company", subtitle: "As frontend dev", paragraphs: ["First.", "Second."] },
    { locale: "es", title: "Entré en la empresa", subtitle: "Como frontend", paragraphs: ["Primero.", "Segundo."] },
  ],
};

describe("getTimeline", () => {
  it("returns the requested locale's translation", async () => {
    mockFindMany.mockResolvedValueOnce([dbRow]);
    const [entry] = await getTimeline("es");
    expect(entry.title).toBe("Entré en la empresa");
    expect(entry.paragraphs).toHaveLength(2);
  });

  it("defaults to English and passes neutral fields through", async () => {
    mockFindMany.mockResolvedValueOnce([dbRow]);
    const [entry] = await getTimeline();
    expect(entry.title).toBe("Joined company");
    expect(entry.id).toBe("entry-1");
    expect(entry.current).toBe(true);
  });

  it("falls back to English when the locale is missing", async () => {
    mockFindMany.mockResolvedValueOnce([{ ...dbRow, translations: [dbRow.translations[0]] }]);
    const [entry] = await getTimeline("es");
    expect(entry.title).toBe("Joined company");
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
