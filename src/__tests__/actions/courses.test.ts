import { createCourse, updateCourse, deleteCourse, toggleCourseFeatured } from "@/actions/courses";

const mockCreate = jest.fn().mockResolvedValue({});
const mockUpdate = jest.fn().mockResolvedValue({});
const mockDelete = jest.fn().mockResolvedValue({});
const mockCount  = jest.fn().mockResolvedValue(0);
const mockFindUnique = jest.fn().mockResolvedValue({ id: "course-1" });
const mockUpsert = jest.fn().mockResolvedValue({});

jest.mock("@/lib/prisma", () => ({
  prisma: {
    course: {
      create:     (...args: unknown[]) => mockCreate(...args),
      update:     (...args: unknown[]) => mockUpdate(...args),
      delete:     (...args: unknown[]) => mockDelete(...args),
      count:      (...args: unknown[]) => mockCount(...args),
      findUnique: (...args: unknown[]) => mockFindUnique(...args),
    },
    courseTranslation: {
      upsert: (...args: unknown[]) => mockUpsert(...args),
    },
    // Execute the ops so a rejected update propagates (DB-failure test).
    $transaction: (ops: Promise<unknown>[]) => Promise.all(ops),
  },
}));

jest.mock("next/cache", () => ({ revalidatePath: jest.fn() }));
jest.mock("next/navigation", () => ({
  redirect: jest.fn().mockImplementation(() => { throw new Error("NEXT_REDIRECT"); }),
}));

beforeEach(() => jest.clearAllMocks());

function fd(entries: Record<string, string>): FormData {
  const form = new FormData();
  Object.entries(entries).forEach(([k, v]) => form.append(k, v));
  return form;
}

const valid = {
  slug: "my-course",
  title: "My Course",
  platform: "Udemy",
  year: "2025",
  status: "completed",
  shortDescription: "Short",
  fullDescription: "Full",
  topics: "[]",
};

describe("createCourse", () => {
  it("returns error when slug is missing", async () => {
    const result = await createCourse(undefined, fd({ ...valid, slug: "" }));
    expect(result).toBe("Slug and title are required.");
  });

  it("returns error when title is missing", async () => {
    const result = await createCourse(undefined, fd({ ...valid, title: "" }));
    expect(result).toBe("Slug and title are required.");
  });

  it("redirects on success", async () => {
    await expect(createCourse(undefined, fd(valid))).rejects.toThrow("NEXT_REDIRECT");
    expect(mockCreate).toHaveBeenCalled();
  });

  it("returns error on DB failure", async () => {
    mockCreate.mockRejectedValueOnce(new Error("unique constraint"));
    const result = await createCourse(undefined, fd(valid));
    expect(result).toBe("Slug already exists or DB error.");
  });
});

describe("updateCourse", () => {
  it("returns error when title is missing", async () => {
    const result = await updateCourse("my-course", undefined, fd({ ...valid, title: "" }));
    expect(result).toBe("Title is required.");
  });

  it("redirects on success", async () => {
    await expect(updateCourse("my-course", undefined, fd(valid))).rejects.toThrow("NEXT_REDIRECT");
    expect(mockUpdate).toHaveBeenCalled();
  });

  it("returns error on DB failure", async () => {
    mockUpdate.mockRejectedValueOnce(new Error("DB error"));
    const result = await updateCourse("my-course", undefined, fd(valid));
    expect(result).toBe("DB error.");
  });
});

describe("deleteCourse", () => {
  it("deletes the course", async () => {
    await deleteCourse("my-course");
    expect(mockDelete).toHaveBeenCalledWith({ where: { slug: "my-course" } });
  });
});

describe("toggleCourseFeatured", () => {
  it("returns error when max featured reached", async () => {
    mockCount.mockResolvedValueOnce(2);
    const result = await toggleCourseFeatured("my-course", true);
    expect(result).toBe("Max 2 featured courses. Unmark one first.");
  });

  it("updates featured status", async () => {
    await toggleCourseFeatured("my-course", true);
    expect(mockUpdate).toHaveBeenCalledWith({
      where: { slug: "my-course" },
      data: { featured: true },
    });
  });

  it("allows unfeaturing without count check", async () => {
    await toggleCourseFeatured("my-course", false);
    expect(mockCount).not.toHaveBeenCalled();
  });
});
