import { rateLimit, clientIp } from "@/lib/rate-limit";

describe("rateLimit", () => {
  let now = 1_000_000;

  beforeEach(() => {
    now = 1_000_000;
    jest.spyOn(Date, "now").mockImplementation(() => now);
  });
  afterEach(() => jest.restoreAllMocks());

  it("allows calls up to the limit", () => {
    expect(rateLimit("under", 3, 1000)).toBe(true);
    expect(rateLimit("under", 3, 1000)).toBe(true);
    expect(rateLimit("under", 3, 1000)).toBe(true);
  });

  it("blocks once the limit is reached within the window", () => {
    rateLimit("block", 2, 1000);
    rateLimit("block", 2, 1000);
    expect(rateLimit("block", 2, 1000)).toBe(false);
  });

  it("resets after the window elapses", () => {
    rateLimit("reset", 1, 1000);
    expect(rateLimit("reset", 1, 1000)).toBe(false);
    now += 1001;
    expect(rateLimit("reset", 1, 1000)).toBe(true);
  });

  it("tracks keys independently", () => {
    expect(rateLimit("a", 1, 1000)).toBe(true);
    expect(rateLimit("a", 1, 1000)).toBe(false);
    expect(rateLimit("b", 1, 1000)).toBe(true);
  });
});

describe("clientIp", () => {
  it("returns the first x-forwarded-for entry", () => {
    const h = new Headers({ "x-forwarded-for": "1.2.3.4, 5.6.7.8" });
    expect(clientIp(h)).toBe("1.2.3.4");
  });

  it("trims surrounding whitespace", () => {
    expect(clientIp(new Headers({ "x-forwarded-for": "  9.9.9.9  " }))).toBe("9.9.9.9");
  });

  it("falls back to 'unknown' when the header is missing", () => {
    expect(clientIp(new Headers())).toBe("unknown");
  });
});
