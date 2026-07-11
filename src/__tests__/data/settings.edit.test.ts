import { getHomeForEdit } from "@/data/settings/edit";
import { DEFAULTS } from "@/data/settings/defaults";

const mockFindMany = jest.fn();
jest.mock("@/lib/prisma", () => ({
  prisma: { setting: { findMany: (...a: unknown[]) => mockFindMany(...a) } },
}));

beforeEach(() => jest.clearAllMocks());

describe("getHomeForEdit", () => {
  it("uses stored values, defaults for missing EN, empty for missing non-default locale", async () => {
    mockFindMany.mockResolvedValueOnce([
      { locale: "en", key: "hero_title", value: "Custom" },
      { locale: "es", key: "hero_title", value: "Personalizado" },
    ]);
    const edit = await getHomeForEdit();
    expect(edit.translations.en.heroTitle).toBe("Custom");
    expect(edit.translations.es.heroTitle).toBe("Personalizado");
    // A key absent for EN falls back to the built-in default…
    expect(edit.translations.en.heroTagline).toBe(DEFAULTS.hero.tagline);
    // …but stays empty for a non-default locale.
    expect(edit.translations.es.heroTagline).toBe("");
  });

  it("reads the neutral available flag and cvUrl from the default locale", async () => {
    mockFindMany.mockResolvedValueOnce([
      { locale: "en", key: "available", value: "false" },
      { locale: "en", key: "cv_url", value: "https://x/cv.pdf" },
    ]);
    const edit = await getHomeForEdit();
    expect(edit.available).toBe(false);
    expect(edit.cvUrl).toBe("https://x/cv.pdf");
  });

  it("defaults available to true and cvUrl to empty when absent", async () => {
    mockFindMany.mockResolvedValueOnce([]);
    const edit = await getHomeForEdit();
    expect(edit.available).toBe(true);
    expect(edit.cvUrl).toBe("");
  });
});
