import { render, screen, act } from "@testing-library/react";
import { AnimateIn } from "@/components/ui/AnimateIn";

let ioCallback: (entries: { isIntersecting: boolean }[]) => void = () => {};

beforeAll(() => {
  class MockIO {
    constructor(cb: (entries: { isIntersecting: boolean }[]) => void) {
      ioCallback = cb;
    }
    observe() {}
    disconnect() {}
  }
  (global as unknown as { IntersectionObserver: unknown }).IntersectionObserver = MockIO;
});

describe("AnimateIn", () => {
  it("renders children hidden before intersecting", () => {
    render(<AnimateIn>Hello</AnimateIn>);
    const el = screen.getByText("Hello");
    expect(el).toHaveClass("animate-hidden");
    expect(el).not.toHaveClass("animate-in");
  });

  it("applies the delay and custom className", () => {
    render(<AnimateIn delay={2} className="mt-4">X</AnimateIn>);
    expect(screen.getByText("X")).toHaveClass("animate-hidden", "delay-2", "mt-4");
  });

  it("reveals itself when it enters the viewport", () => {
    render(<AnimateIn>Reveal</AnimateIn>);
    act(() => ioCallback([{ isIntersecting: true }]));
    expect(screen.getByText("Reveal")).toHaveClass("animate-in");
  });
});
