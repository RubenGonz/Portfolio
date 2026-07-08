import {
  createTimelineEntry,
  updateTimelineEntry,
  deleteTimelineEntry,
  reorderTimeline,
  toggleTimelineCurrent,
} from "@/actions/timeline";

const mockCreate   = jest.fn().mockResolvedValue({});
const mockUpdate   = jest.fn().mockResolvedValue({});
const mockDelete   = jest.fn().mockResolvedValue({});
const mockCount    = jest.fn().mockResolvedValue(0);
const mockTransaction = jest.fn().mockResolvedValue([]);

jest.mock("@/lib/prisma", () => ({
  prisma: {
    timelineEntry: {
      create:     (...args: unknown[]) => mockCreate(...args),
      update:     (...args: unknown[]) => mockUpdate(...args),
      delete:     (...args: unknown[]) => mockDelete(...args),
      count:      (...args: unknown[]) => mockCount(...args),
    },
    timelineEntryTranslation: {
      upsert: jest.fn().mockResolvedValue({}),
    },
    $transaction: (...args: unknown[]) => mockTransaction(...args),
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

const valid = { year: "2025", title: "Joined company", paragraphs: "First paragraph.\n\nSecond paragraph." };

describe("createTimelineEntry", () => {
  it("returns error when year is missing", async () => {
    const result = await createTimelineEntry(undefined, fd({ ...valid, year: "" }));
    expect(result).toBe("Year and title are required.");
  });

  it("returns error when title is missing", async () => {
    const result = await createTimelineEntry(undefined, fd({ ...valid, title: "" }));
    expect(result).toBe("Year and title are required.");
  });

  it("redirects on success", async () => {
    await expect(createTimelineEntry(undefined, fd(valid))).rejects.toThrow("NEXT_REDIRECT");
    expect(mockCreate).toHaveBeenCalled();
  });
});

describe("updateTimelineEntry", () => {
  it("returns error when title is missing", async () => {
    const result = await updateTimelineEntry("id-1", undefined, fd({ ...valid, title: "" }));
    expect(result).toBe("Year and title are required.");
  });

  it("redirects on success", async () => {
    await expect(updateTimelineEntry("id-1", undefined, fd(valid))).rejects.toThrow("NEXT_REDIRECT");
    expect(mockUpdate).toHaveBeenCalled();
  });

  it("reads current checkbox from form", async () => {
    const form = fd({ ...valid, current: "on" });
    await expect(updateTimelineEntry("id-1", undefined, form)).rejects.toThrow("NEXT_REDIRECT");
    const call = mockUpdate.mock.calls[0][0];
    expect(call.data.current).toBe(true);
  });
});

describe("deleteTimelineEntry", () => {
  it("deletes by id", async () => {
    await deleteTimelineEntry("id-1");
    expect(mockDelete).toHaveBeenCalledWith({ where: { id: "id-1" } });
  });
});

describe("reorderTimeline", () => {
  it("calls $transaction", async () => {
    await reorderTimeline(["id-1", "id-2"]);
    expect(mockTransaction).toHaveBeenCalled();
  });
});

describe("toggleTimelineCurrent", () => {
  it("updates current flag", async () => {
    await toggleTimelineCurrent("id-1", true);
    expect(mockUpdate).toHaveBeenCalledWith({
      where: { id: "id-1" },
      data: { current: true },
    });
  });
});
