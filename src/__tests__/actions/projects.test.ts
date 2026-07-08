import { createProject, updateProject, deleteProject, toggleProjectFeatured } from "@/actions/projects";

const mockCreate   = jest.fn().mockResolvedValue({});
const mockUpdate   = jest.fn().mockResolvedValue({});
const mockDelete   = jest.fn().mockResolvedValue({});
const mockFindUnique = jest.fn().mockResolvedValue({ id: "project-1" });
const mockCount    = jest.fn().mockResolvedValue(0);
const mockFindMany = jest.fn().mockResolvedValue([]);
const mockTransaction = jest.fn().mockResolvedValue([]);

jest.mock("@/lib/prisma", () => ({
  prisma: {
    project: {
      create:     (...args: unknown[]) => mockCreate(...args),
      update:     (...args: unknown[]) => mockUpdate(...args),
      delete:     (...args: unknown[]) => mockDelete(...args),
      findUnique: (...args: unknown[]) => mockFindUnique(...args),
      count:      (...args: unknown[]) => mockCount(...args),
    },
    projectImage: {
      findMany:   (...args: unknown[]) => mockFindMany(...args),
      deleteMany: jest.fn().mockResolvedValue({}),
    },
    projectTranslation: {
      upsert: jest.fn().mockResolvedValue({}),
    },
    $transaction: (...args: unknown[]) => mockTransaction(...args),
  },
}));

jest.mock("@vercel/blob", () => ({ del: jest.fn().mockResolvedValue({}) }));
jest.mock("next/cache", () => ({ revalidatePath: jest.fn() }));
jest.mock("next/navigation", () => ({
  redirect: jest.fn().mockImplementation(() => { throw new Error("NEXT_REDIRECT"); }),
}));

beforeEach(() => jest.clearAllMocks());

function fd(entries: Record<string, string | string[]>): FormData {
  const form = new FormData();
  Object.entries(entries).forEach(([k, v]) => {
    if (Array.isArray(v)) v.forEach((item) => form.append(k, item));
    else form.append(k, v);
  });
  return form;
}

const validProject = {
  slug: "my-project",
  title: "My Project",
  year: "2026",
  status: "in-progress",
  shortDescription: "Short",
  fullDescription: "Full description here",
};

describe("createProject", () => {
  it("returns error when slug is missing", async () => {
    const result = await createProject(undefined, fd({ ...validProject, slug: "" }));
    expect(result).toBe("Slug and title are required.");
  });

  it("returns error when title is missing", async () => {
    const result = await createProject(undefined, fd({ ...validProject, title: "" }));
    expect(result).toBe("Slug and title are required.");
  });

  it("redirects on success", async () => {
    await expect(createProject(undefined, fd(validProject))).rejects.toThrow("NEXT_REDIRECT");
    expect(mockCreate).toHaveBeenCalled();
  });

  it("returns error on DB failure", async () => {
    mockCreate.mockRejectedValueOnce(new Error("unique constraint"));
    const result = await createProject(undefined, fd(validProject));
    expect(result).toBe("Slug already exists or DB error.");
  });
});

describe("updateProject", () => {
  it("returns error when title is missing", async () => {
    const result = await updateProject("my-project", undefined, fd({ ...validProject, title: "" }));
    expect(result).toBe("Title is required.");
  });

  it("returns error when project not found", async () => {
    mockFindUnique.mockResolvedValueOnce(null);
    const result = await updateProject("missing", undefined, fd(validProject));
    expect(result).toBe("Project not found.");
  });

  it("redirects on success", async () => {
    await expect(
      updateProject("my-project", undefined, fd(validProject))
    ).rejects.toThrow("NEXT_REDIRECT");
  });
});

describe("deleteProject", () => {
  it("deletes the project", async () => {
    await deleteProject("my-project");
    expect(mockDelete).toHaveBeenCalledWith({ where: { slug: "my-project" } });
  });
});

describe("toggleProjectFeatured", () => {
  it("returns error when max featured reached", async () => {
    mockCount.mockResolvedValueOnce(2);
    const result = await toggleProjectFeatured("my-project", true);
    expect(result).toBe("Max 2 featured projects. Unmark one first.");
  });

  it("updates featured status", async () => {
    await toggleProjectFeatured("my-project", true);
    expect(mockUpdate).toHaveBeenCalledWith({
      where: { slug: "my-project" },
      data: { featured: true },
    });
  });

  it("allows unfeaturing without count check", async () => {
    await toggleProjectFeatured("my-project", false);
    expect(mockCount).not.toHaveBeenCalled();
  });
});
