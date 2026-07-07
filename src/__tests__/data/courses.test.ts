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
  title: "My Course",
  platform: "Udemy",
  year: 2025,
  status: "completed",
  shortDescription: "Short",
  fullDescription: "Full",
  topics: [],
  tags: ["react"],
  featured: false,
  certificateUrl: null,
  repoUrl: null,
  demoUrl: null,
};

describe("getCourses", () => {
  it("returns mapped courses", async () => {
    mockFindMany.mockResolvedValueOnce([dbRow]);
    const courses = await getCourses();
    expect(courses).toHaveLength(1);
    expect(courses[0].slug).toBe("my-course");
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
    expect(course?.slug).toBe("my-course");
  });

  it("returns undefined when not found", async () => {
    mockFindUnique.mockResolvedValueOnce(null);
    const course = await getCourseBySlug("missing");
    expect(course).toBeUndefined();
  });
});
