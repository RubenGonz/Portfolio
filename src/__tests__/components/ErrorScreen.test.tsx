import { render, screen } from "@testing-library/react";
import { ErrorScreen, errorActionClass } from "@/components/common/ErrorScreen";

describe("ErrorScreen", () => {
  it("renders the code, heading and body", () => {
    render(<ErrorScreen code="404" heading="Not found" body="Missing" />);
    expect(screen.getByText("404")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Not found" })).toBeInTheDocument();
    expect(screen.getByText("Missing")).toBeInTheDocument();
  });

  it("renders action children", () => {
    render(
      <ErrorScreen code="500" heading="h" body="b">
        <a href="https://example.com">Home</a>
      </ErrorScreen>,
    );
    expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument();
  });

  it("exposes a reusable action class with a pointer cursor", () => {
    expect(errorActionClass).toContain("cursor-pointer");
  });
});
