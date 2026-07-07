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
  title: "My Project",
  shortDescription: "Short",
  fullDescription: "Full",
  tags: ["react"],
  highlights: ["feature"],
  role: null,
  url: null,
  repoUrl: null,
  featured: false,
  year: 2025,
  status: "in-progress",
  images: [
    { name: "hero", src: "/img1.webp", alt: "Alt 1", order: 1 },
    { name: "about", src: "/img2.webp", alt: "Alt 2", order: 0 },
  ],
};

describe("getProjects", () => {
  it("returns mapped projects", async () => {
    mockFindMany.mockResolvedValueOnce([dbRow]);
    const projects = await getProjects();
    expect(projects).toHaveLength(1);
    expect(projects[0].slug).toBe("my-project");
  });

  it("sorts images by order", async () => {
    mockFindMany.mockResolvedValueOnce([dbRow]);
    const [project] = await getProjects();
    expect(project.images![0].src).toBe("/img2.webp");
    expect(project.images![1].src).toBe("/img1.webp");
  });

  it("maps null role/url to undefined", async () => {
    mockFindMany.mockResolvedValueOnce([dbRow]);
    const [project] = await getProjects();
    expect(project.role).toBeUndefined();
    expect(project.url).toBeUndefined();
  });
});

describe("getProjectBySlug", () => {
  it("returns project when found", async () => {
    mockFindUnique.mockResolvedValueOnce(dbRow);
    const project = await getProjectBySlug("my-project");
    expect(project?.slug).toBe("my-project");
  });

  it("returns undefined when not found", async () => {
    mockFindUnique.mockResolvedValueOnce(null);
    const project = await getProjectBySlug("missing");
    expect(project).toBeUndefined();
  });
});
