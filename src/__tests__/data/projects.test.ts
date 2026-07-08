import { getProjects, getProjectBySlug } from "@/data/projects";

const mockFindMany  = jest.fn();
const mockFindUnique = jest.fn();

jest.mock("@/lib/prisma", () => ({
  prisma: {
    project: {
      findMany:   (...args: unknown[]) => mockFindMany(...args),
      findUnique: (...args: unknown[]) => mockFindUnique(...args),
    },
  },
}));

beforeEach(() => jest.clearAllMocks());

const dbRow = {
  slug: "my-project",
  tags: ["react"],
  url: null,
  repoUrl: null,
  featured: false,
  year: 2025,
  status: "in-progress",
  images: [
    { name: "hero", src: "/img1.webp", alt: "Alt 1", order: 1 },
    { name: "about", src: "/img2.webp", alt: "Alt 2", order: 0 },
  ],
  translations: [
    {
      locale: "en",
      title: "My Project",
      shortDescription: "Short EN",
      fullDescription: "Full EN",
      highlights: ["feature"],
      role: null,
    },
    {
      locale: "es",
      title: "Mi Proyecto",
      shortDescription: "Corto ES",
      fullDescription: "Completo ES",
      highlights: ["función"],
      role: null,
    },
  ],
};

describe("getProjects", () => {
  it("returns the requested locale's translation", async () => {
    mockFindMany.mockResolvedValueOnce([dbRow]);
    const [project] = await getProjects("es");
    expect(project.title).toBe("Mi Proyecto");
    expect(project.shortDescription).toBe("Corto ES");
  });

  it("defaults to English", async () => {
    mockFindMany.mockResolvedValueOnce([dbRow]);
    const [project] = await getProjects();
    expect(project.title).toBe("My Project");
  });

  it("falls back to English when the locale is missing", async () => {
    mockFindMany.mockResolvedValueOnce([{ ...dbRow, translations: [dbRow.translations[0]] }]);
    const [project] = await getProjects("es");
    expect(project.title).toBe("My Project");
  });

  it("sorts images by order", async () => {
    mockFindMany.mockResolvedValueOnce([dbRow]);
    const [project] = await getProjects();
    expect(project.images![0].src).toBe("/img2.webp");
    expect(project.images![1].src).toBe("/img1.webp");
  });

  it("maps null url/role to undefined", async () => {
    mockFindMany.mockResolvedValueOnce([dbRow]);
    const [project] = await getProjects();
    expect(project.url).toBeUndefined();
    expect(project.role).toBeUndefined();
  });
});

describe("getProjectBySlug", () => {
  it("returns project when found", async () => {
    mockFindUnique.mockResolvedValueOnce(dbRow);
    const project = await getProjectBySlug("my-project", "es");
    expect(project?.title).toBe("Mi Proyecto");
  });

  it("returns undefined when not found", async () => {
    mockFindUnique.mockResolvedValueOnce(null);
    const project = await getProjectBySlug("missing");
    expect(project).toBeUndefined();
  });
});
