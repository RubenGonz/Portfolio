import { auth } from "@/auth";
import { requireAdmin } from "@/lib/auth-guard";

jest.mock("@/auth", () => ({ auth: jest.fn() }));

const mockAuth = auth as jest.Mock;

beforeEach(() => jest.clearAllMocks());

describe("requireAdmin", () => {
  it("throws when there is no session", async () => {
    mockAuth.mockResolvedValueOnce(null);
    await expect(requireAdmin()).rejects.toThrow("Unauthorized");
  });

  it("throws when the session has no user", async () => {
    mockAuth.mockResolvedValueOnce({});
    await expect(requireAdmin()).rejects.toThrow("Unauthorized");
  });

  it("resolves when an authenticated user is present", async () => {
    mockAuth.mockResolvedValueOnce({ user: { email: "admin@site.com" } });
    await expect(requireAdmin()).resolves.toBeUndefined();
  });
});
