import { getStack, getStackItem } from "@/data/stack";

const mockFindMany   = jest.fn();
const mockFindUnique = jest.fn();

jest.mock("@/lib/prisma", () => ({
  prisma: {
    stackItem: {
      findMany:   (...args: unknown[]) => mockFindMany(...args),
      findUnique: (...args: unknown[]) => mockFindUnique(...args),
    },
  },
}));

beforeEach(() => jest.clearAllMocks());

const rows = [
  { id: "1", name: "React",      tier: "core",     category: "Frontend", order: 0 },
  { id: "2", name: "TypeScript", tier: "core",     category: "Frontend", order: 1 },
  { id: "3", name: "PostgreSQL", tier: "familiar", category: "Database", order: 0 },
];

describe("getStack", () => {
  it("groups items by category", async () => {
    mockFindMany.mockResolvedValueOnce(rows);
    const stack = await getStack();
    const labels = stack.map((c) => c.label);
    expect(labels).toContain("Frontend");
    expect(labels).toContain("Database");
    expect(labels).not.toContain("Backend");
  });

  it("respects CATEGORY_ORDER (Frontend before Database)", async () => {
    mockFindMany.mockResolvedValueOnce(rows);
    const stack = await getStack();
    const frontendIdx = stack.findIndex((c) => c.label === "Frontend");
    const dbIdx       = stack.findIndex((c) => c.label === "Database");
    expect(frontendIdx).toBeLessThan(dbIdx);
  });

  it("maps tier correctly", async () => {
    mockFindMany.mockResolvedValueOnce(rows);
    const stack = await getStack();
    const frontend = stack.find((c) => c.label === "Frontend")!;
    expect(frontend.items[0].tier).toBe("core");
  });

  it("returns empty array when no items", async () => {
    mockFindMany.mockResolvedValueOnce([]);
    const stack = await getStack();
    expect(stack).toHaveLength(0);
  });
});

describe("getStackItem", () => {
  it("returns item when found", async () => {
    mockFindUnique.mockResolvedValueOnce(rows[0]);
    const item = await getStackItem("1");
    expect(item?.name).toBe("React");
  });

  it("returns undefined when not found", async () => {
    mockFindUnique.mockResolvedValueOnce(null);
    const item = await getStackItem("missing");
    expect(item).toBeUndefined();
  });
});
