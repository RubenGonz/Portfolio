import { getCourses, getCourseBySlug } from "@/data/courses";

const mockFindMany   = jest.fn();
const mockFindUnique = jest.fn();

jest.mock("@/lib/prisma", () => ({
  prisma: {
    course: {
      findMany:   (...args: unknown[]) => mockFindMany(...args),
      findUnique: (...args: unknown[]) => mockFindUnique(...args),
    },
  },
}));

beforeEach(() => jest.clearAllMocks());

const dbRow = {
  slug: "my-course",
  platform: "Udemy",
  year: 2025,
  status: "completed",
  featured: false,
  certificateUrl: null,
  repoUrl: null,
  demoUrl: null,
  translations: [
    {
      locale: "en",
      title: "My Course",
      shortDescription: "Short EN",
      fullDescription: "Full EN",
      topics: [],
      tags: ["react"],
    },
    {
      locale: "es",
      title: "Mi Curso",
      shortDescription: "Corto ES",
      fullDescription: "Completo ES",
      topics: [],
      tags: ["react"],
    },
  ],
};

describe("getCourses", () => {
  it("returns the requested locale's translation", async () => {
    mockFindMany.mockResolvedValueOnce([dbRow]);
    const [course] = await getCourses("es");
    expect(course.title).toBe("Mi Curso");
  });

  it("defaults to English", async () => {
    mockFindMany.mockResolvedValueOnce([dbRow]);
    const [course] = await getCourses();
    expect(course.title).toBe("My Course");
  });

  it("falls back to English when the locale is missing", async () => {
    mockFindMany.mockResolvedValueOnce([{ ...dbRow, translations: [dbRow.translations[0]] }]);
    const [course] = await getCourses("es");
    expect(course.title).toBe("My Course");
  });

  it("maps null certificateUrl to undefined", async () => {
    mockFindMany.mockResolvedValueOnce([dbRow]);
    const [course] = await getCourses();
    expect(course.certificateUrl).toBeUndefined();
  });
});

describe("getCourseBySlug", () => {
  it("returns course when found", async () => {
    mockFindUnique.mockResolvedValueOnce(dbRow);
    const course = await getCourseBySlug("my-course");
    expect(course?.title).toBe("My Course");
  });

  it("returns undefined when not found", async () => {
    mockFindUnique.mockResolvedValueOnce(null);
    const course = await getCourseBySlug("missing");
    expect(course).toBeUndefined();
  });
});
