// next/server references the Web `Request` global, which jsdom doesn't provide.
// The route only uses NextResponse.json, so stub it to a plain status object.
jest.mock("next/server", () => ({
  NextResponse: {
    json: (body: unknown, init?: { status?: number }) => ({
      status: init?.status ?? 200,
      json: async () => body,
    }),
  },
}));

import { POST } from "@/app/api/contact/route";

const mockSendMail = jest.fn().mockResolvedValue({});
jest.mock("nodemailer", () => ({
  createTransport: () => ({ sendMail: (...a: unknown[]) => mockSendMail(...a) }),
}));

const mockRateLimit = jest.fn(() => true);
jest.mock("@/lib/rate-limit", () => ({
  rateLimit: () => mockRateLimit(),
  clientIp: () => "test-ip",
}));

function req(body: unknown) {
  return { json: async () => body, headers: new Headers() } as unknown as Parameters<typeof POST>[0];
}

beforeEach(() => {
  jest.clearAllMocks();
  mockRateLimit.mockReturnValue(true);
});

describe("POST /api/contact", () => {
  const valid = { email: "a@b.com", message: "a genuinely valid message" };

  it("silently accepts honeypot submissions without sending", async () => {
    const res = await POST(req({ ...valid, _trap: "bot" }));
    expect(res.status).toBe(200);
    expect(mockSendMail).not.toHaveBeenCalled();
  });

  it("returns 429 when rate limited", async () => {
    mockRateLimit.mockReturnValueOnce(false);
    const res = await POST(req(valid));
    expect(res.status).toBe(429);
    expect(mockSendMail).not.toHaveBeenCalled();
  });

  it("returns 400 on missing fields", async () => {
    expect((await POST(req({ email: "", message: "" }))).status).toBe(400);
  });

  it("returns 400 on an invalid email", async () => {
    expect((await POST(req({ email: "nope", message: "a genuinely valid message" }))).status).toBe(400);
  });

  it("returns 400 when the message is too short", async () => {
    expect((await POST(req({ email: "a@b.com", message: "short" }))).status).toBe(400);
  });

  it("returns 400 when the message is too long", async () => {
    expect((await POST(req({ email: "a@b.com", message: "x".repeat(5001) }))).status).toBe(400);
  });

  it("sends the email and returns 200 on a valid submission", async () => {
    const res = await POST(req(valid));
    expect(res.status).toBe(200);
    expect(mockSendMail).toHaveBeenCalledTimes(1);
  });

  it("returns 500 when sending fails", async () => {
    mockSendMail.mockRejectedValueOnce(new Error("smtp down"));
    expect((await POST(req(valid))).status).toBe(500);
  });
});
