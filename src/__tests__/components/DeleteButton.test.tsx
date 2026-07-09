import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DeleteButton } from "@/components/admin/DeleteButton";

const mockPush = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({ refresh: mockPush }),
}));

describe("DeleteButton", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    window.confirm = jest.fn(() => true);
  });

  it("renders with default label", () => {
    render(<DeleteButton action={jest.fn()} />);
    expect(screen.getByRole("button", { name: "Delete" })).toBeInTheDocument();
  });

  it("renders with custom label", () => {
    render(<DeleteButton action={jest.fn()} label="Remove" />);
    expect(screen.getByRole("button", { name: "Remove" })).toBeInTheDocument();
  });

  it("calls action after confirm", async () => {
    const action = jest.fn().mockResolvedValue(undefined);
    render(<DeleteButton action={action} />);
    await userEvent.click(screen.getByRole("button"));
    expect(window.confirm).toHaveBeenCalled();
    expect(action).toHaveBeenCalled();
  });

  it("does not call action if confirm is cancelled", async () => {
    window.confirm = jest.fn(() => false);
    const action = jest.fn();
    render(<DeleteButton action={action} />);
    await userEvent.click(screen.getByRole("button"));
    expect(action).not.toHaveBeenCalled();
  });
});
