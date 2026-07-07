import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ProjectGallery } from "@/components/ui/project-gallery/ProjectGallery";

jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ src, alt }: { src: string; alt: string }) => <img src={src} alt={alt} />,
}));

const images = [
  { name: "hero", src: "/img1.webp", alt: "Image 1" },
  { name: "about", src: "/img2.webp", alt: "Image 2" },
  { name: "stack", src: "/img3.webp", alt: "Image 3" },
];

describe("ProjectGallery", () => {
  it("renders nothing when images array is empty", () => {
    const { container } = render(<ProjectGallery images={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("renders the first image by default", () => {
    render(<ProjectGallery images={images} />);
    expect(screen.getAllByAltText("Image 1").length).toBeGreaterThan(0);
  });

  it("renders thumbnails when more than one image", () => {
    render(<ProjectGallery images={images} />);
    expect(screen.getAllByRole("button").length).toBeGreaterThan(1);
  });

  it("opens lightbox when main image is clicked", async () => {
    render(<ProjectGallery images={images} />);
    await userEvent.click(screen.getByLabelText("Expand image"));
    expect(screen.getByText("1 / 3")).toBeInTheDocument();
  });

  it("closes lightbox when backdrop is clicked", async () => {
    render(<ProjectGallery images={images} />);
    await userEvent.click(screen.getByLabelText("Expand image"));
    expect(screen.getByText("1 / 3")).toBeInTheDocument();
    await userEvent.click(screen.getByText("✕ Close"));
    expect(screen.queryByText("1 / 3")).not.toBeInTheDocument();
  });

  it("closes lightbox on Escape key", async () => {
    render(<ProjectGallery images={images} />);
    await userEvent.click(screen.getByLabelText("Expand image"));
    await userEvent.keyboard("{Escape}");
    expect(screen.queryByText("1 / 3")).not.toBeInTheDocument();
  });

  it("navigates to next image with arrow key", async () => {
    render(<ProjectGallery images={images} />);
    await userEvent.click(screen.getByLabelText("Expand image"));
    await userEvent.keyboard("{ArrowRight}");
    expect(screen.getByText("2 / 3")).toBeInTheDocument();
  });

  it("navigates to previous image with arrow key", async () => {
    render(<ProjectGallery images={images} />);
    await userEvent.click(screen.getByLabelText("Expand image"));
    await userEvent.keyboard("{ArrowLeft}");
    expect(screen.getByText("3 / 3")).toBeInTheDocument();
  });
});
