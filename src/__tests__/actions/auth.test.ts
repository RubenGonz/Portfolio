import { authenticate } from "@/actions/auth";
import { AuthError } from "next-auth";

const mockSignIn  = jest.fn();
const mockSignOut = jest.fn();

jest.mock("@/auth", () => ({
  signIn:  (...args: unknown[]) => mockSignIn(...args),
  signOut: (...args: unknown[]) => mockSignOut(...args),
}));

jest.mock("next-auth", () => ({
  AuthError: class AuthError extends Error {},
}));

beforeEach(() => jest.clearAllMocks());

function fd(entries: Record<string, string>): FormData {
  const form = new FormData();
  Object.entries(entries).forEach(([k, v]) => form.append(k, v));
  return form;
}

describe("authenticate", () => {
  it("returns error message on AuthError", async () => {
    mockSignIn.mockRejectedValueOnce(new AuthError("Invalid credentials"));
    const result = await authenticate(undefined, fd({ email: "a@b.com", password: "wrong" }));
    expect(result).toBe("Invalid email or password.");
  });

  it("re-throws non-AuthError (e.g. NEXT_REDIRECT)", async () => {
    mockSignIn.mockRejectedValueOnce(new Error("NEXT_REDIRECT"));
    await expect(
      authenticate(undefined, fd({ email: "a@b.com", password: "correct" }))
    ).rejects.toThrow("NEXT_REDIRECT");
  });

  it("calls signIn with credentials provider", async () => {
    mockSignIn.mockRejectedValueOnce(new Error("NEXT_REDIRECT"));
    await expect(
      authenticate(undefined, fd({ email: "a@b.com", password: "correct" }))
    ).rejects.toThrow();
    expect(mockSignIn).toHaveBeenCalledWith("credentials", expect.objectContaining({
      email: "a@b.com",
      password: "correct",
    }));
  });
});
