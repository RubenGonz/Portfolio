import { formReader, filledLocales } from "@/lib/form";

function fd(entries: Record<string, string>): FormData {
  const f = new FormData();
  for (const [k, v] of Object.entries(entries)) f.append(k, v);
  return f;
}

describe("formReader.get", () => {
  it("trims the value", () => {
    expect(formReader(fd({ a: "  hi  " })).get("a")).toBe("hi");
  });
  it("returns empty string for a missing field", () => {
    expect(formReader(fd({})).get("nope")).toBe("");
  });
});

describe("formReader.lines", () => {
  it("splits on newlines, trims and drops blank lines", () => {
    expect(formReader(fd({ t: "a\n  b  \n\n c\n" })).lines("t")).toEqual(["a", "b", "c"]);
  });
  it("returns [] for an empty field", () => {
    expect(formReader(fd({ t: "   " })).lines("t")).toEqual([]);
  });
});

describe("formReader.json", () => {
  it("parses valid JSON", () => {
    expect(formReader(fd({ j: '[{"x":1}]' })).json("j", [])).toEqual([{ x: 1 }]);
  });
  it("returns the fallback on invalid JSON", () => {
    expect(formReader(fd({ j: "nope" })).json("j", [])).toEqual([]);
  });
  it("returns the fallback for a missing field", () => {
    expect(formReader(fd({})).json("j", { d: 1 })).toEqual({ d: 1 });
  });
});

describe("filledLocales", () => {
  it("keeps only locales whose title is non-empty", () => {
    expect(filledLocales({ en: { title: "Hi" }, es: { title: "" } })).toEqual(["en"]);
  });
  it("treats whitespace-only titles as empty", () => {
    expect(filledLocales({ en: { title: "  " }, es: { title: "Hola" } })).toEqual(["es"]);
  });
  it("returns [] when none are filled", () => {
    expect(filledLocales({ en: { title: "" }, es: { title: "" } })).toEqual([]);
  });
});
