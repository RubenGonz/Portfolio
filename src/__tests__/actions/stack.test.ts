import { addStackItem, moveStackItem, deleteStackItem, createStackItem, updateStackItem } from "@/actions/stack";

const mockCreate = jest.fn().mockResolvedValue({});
const mockUpdate = jest.fn().mockResolvedValue({});
const mockDelete = jest.fn().mockResolvedValue({});
const mockCount  = jest.fn().mockResolvedValue(0);

jest.mock("@/lib/prisma", () => ({
  prisma: {
    stackItem: {
      create: (...args: unknown[]) => mockCreate(...args),
      update: (...args: unknown[]) => mockUpdate(...args),
      delete: (...args: unknown[]) => mockDelete(...args),
      count:  (...args: unknown[]) => mockCount(...args),
    },
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

describe("addStackItem", () => {
  it("does nothing when name is empty", async () => {
    await addStackItem("  ", "Frontend", "core");
    expect(mockCreate).not.toHaveBeenCalled();
  });

  it("creates item with computed order", async () => {
    mockCount.mockResolvedValueOnce(3);
    await addStackItem("React", "Frontend", "core");
    expect(mockCreate).toHaveBeenCalledWith({
      data: { name: "React", category: "Frontend", tier: "core", order: 3 },
    });
  });
});

describe("moveStackItem", () => {
  it("updates the tier", async () => {
    await moveStackItem("item-1", "familiar");
    expect(mockUpdate).toHaveBeenCalledWith({
      where: { id: "item-1" },
      data: { tier: "familiar" },
    });
  });
});

describe("deleteStackItem", () => {
  it("deletes by id", async () => {
    await deleteStackItem("item-1");
    expect(mockDelete).toHaveBeenCalledWith({ where: { id: "item-1" } });
  });
});

describe("createStackItem (form action)", () => {
  it("returns error when name is missing", async () => {
    const result = await createStackItem(undefined, fd({ name: "", tier: "core", category: "Frontend", order: "0" }));
    expect(result).toBe("Name is required.");
  });

  it("redirects on success", async () => {
    await expect(
      createStackItem(undefined, fd({ name: "TypeScript", tier: "core", category: "Frontend", order: "0" }))
    ).rejects.toThrow("NEXT_REDIRECT");
    expect(mockCreate).toHaveBeenCalled();
  });
});

describe("updateStackItem (form action)", () => {
  it("returns error when name is missing", async () => {
    const result = await updateStackItem("item-1", undefined, fd({ name: "", tier: "core", category: "Frontend", order: "0" }));
    expect(result).toBe("Name is required.");
  });

  it("redirects on success", async () => {
    await expect(
      updateStackItem("item-1", undefined, fd({ name: "TypeScript", tier: "core", category: "Frontend", order: "0" }))
    ).rejects.toThrow("NEXT_REDIRECT");
    expect(mockUpdate).toHaveBeenCalled();
  });
});
