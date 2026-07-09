import { render, screen } from "@testing-library/react";
import { AvailableBadge } from "@/components/ui/AvailableBadge";

describe("AvailableBadge", () => {
  it("renders the label", () => {
    render(<AvailableBadge label="Available" />);
    expect(screen.getByText("Available")).toBeInTheDocument();
  });

  it("renders a custom label", () => {
    render(<AvailableBadge label="Open to work" />);
    expect(screen.getByText("Open to work")).toBeInTheDocument();
  });

  it("applies bordered class when bordered prop is set", () => {
    const { container } = render(<AvailableBadge label="Available" bordered />);
    expect(container.firstChild).toHaveClass("border");
  });
});
