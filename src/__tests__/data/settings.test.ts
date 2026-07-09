import { getHomeContent } from "@/data/settings";

const mockFindMany = jest.fn();

jest.mock("@/lib/prisma", () => ({
  prisma: {
    setting: { findMany: (...args: unknown[]) => mockFindMany(...args) },
  },
}));

beforeEach(() => jest.clearAllMocks());

describe("getHomeContent", () => {
  it("returns defaults when DB has no rows", async () => {
    mockFindMany.mockResolvedValueOnce([]);
    const content = await getHomeContent();
    expect(content.hero.title).toBe("Frontend\nDeveloper");
    expect(content.available.available).toBe(true);
    expect(content.cvUrl).toBe("");
  });

  it("returns DB values when rows exist", async () => {
    mockFindMany.mockResolvedValueOnce([
      { key: "hero_title", value: "Full-Stack Dev" },
      { key: "ticker_text", value: "React · Node" },
      { key: "available", value: "false" },
      { key: "available_label", value: "Not available" },
      { key: "cv_url", value: "https://blob.example.com/cv.pdf" },
    ]);
    const content = await getHomeContent();
    expect(content.hero.title).toBe("Full-Stack Dev");
    expect(content.tickerText).toBe("React · Node");
    expect(content.available.available).toBe(false);
    expect(content.available.label).toBe("Not available");
    expect(content.cvUrl).toBe("https://blob.example.com/cv.pdf");
  });

  it("uses default label when available_label is missing", async () => {
    mockFindMany.mockResolvedValueOnce([{ key: "available", value: "true" }]);
    const content = await getHomeContent();
    expect(content.available.label).toBe("Available");
  });

  it("treats missing available key as available=true", async () => {
    mockFindMany.mockResolvedValueOnce([]);
    const content = await getHomeContent();
    expect(content.available.available).toBe(true);
  });
});
