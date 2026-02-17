import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { Button, buttonVariants } from "./button";

describe("Button", () => {
  describe("rendering", () => {
    it("renders as a button by default", () => {
      render(<Button>Click me</Button>);
      expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("renders children correctly", () => {
      render(<Button>Test Label</Button>);
      expect(screen.getByText("Test Label")).toBeInTheDocument();
    });

    it("renders with asChild prop", () => {
      render(
        <Button asChild>
          <a href="/test">Link Button</a>
        </Button>
      );
      expect(screen.getByRole("link")).toBeInTheDocument();
    });
  });

  describe("variants", () => {
    it("renders primary variant by default", () => {
      const { container } = render(<Button>Primary</Button>);
      const button = container.querySelector("button");
      expect(button).toHaveClass("bg-gray-100");
      expect(button).toHaveClass("text-gray-950");
    });

    it("renders primary variant with Figma specs", () => {
      const { container } = render(<Button variant="primary">Primary</Button>);
      const button = container.querySelector("button");
      expect(button).toHaveClass("bg-gray-100");
      expect(button).toHaveClass("text-gray-950");
      expect(button).toHaveClass("hover:bg-gray-200");
    });

    it("renders secondary variant with Figma specs", () => {
      const { container } = render(<Button variant="secondary">Secondary</Button>);
      const button = container.querySelector("button");
      expect(button).toHaveClass("border");
      expect(button).toHaveClass("border-gray-600");
      expect(button).toHaveClass("bg-transparent");
      expect(button).toHaveClass("text-gray-100");
      expect(button).toHaveClass("hover:bg-gray-800");
    });

    it("renders outline variant", () => {
      const { container } = render(<Button variant="outline">Outline</Button>);
      const button = container.querySelector("button");
      expect(button).toHaveClass("border");
      expect(button).toHaveClass("border-gray-600");
    });

    it("renders ghost variant", () => {
      const { container } = render(<Button variant="ghost">Ghost</Button>);
      const button = container.querySelector("button");
      expect(button).toHaveClass("hover:bg-gray-800");
    });

    it("renders link variant", () => {
      const { container } = render(<Button variant="link">Link</Button>);
      const button = container.querySelector("button");
      expect(button).toHaveClass("underline-offset-4");
    });

    it("renders destructive variant", () => {
      const { container } = render(<Button variant="destructive">Delete</Button>);
      const button = container.querySelector("button");
      expect(button).toHaveClass("bg-red-500");
    });
  });

  describe("sizes", () => {
    it("renders default size with Figma padding (12px 24px)", () => {
      const { container } = render(<Button>Default</Button>);
      const button = container.querySelector("button");
      expect(button).toHaveClass("px-6"); // 24px
      expect(button).toHaveClass("py-3"); // 12px
    });

    it("renders small size", () => {
      const { container } = render(<Button size="sm">Small</Button>);
      const button = container.querySelector("button");
      expect(button).toHaveClass("px-4");
      expect(button).toHaveClass("py-2");
      expect(button).toHaveClass("text-xs");
    });

    it("renders large size", () => {
      const { container } = render(<Button size="lg">Large</Button>);
      const button = container.querySelector("button");
      expect(button).toHaveClass("px-8");
      expect(button).toHaveClass("py-4");
      expect(button).toHaveClass("text-base");
    });

    it("renders icon size", () => {
      const { container } = render(<Button size="icon">★</Button>);
      const button = container.querySelector("button");
      expect(button).toHaveClass("h-9");
      expect(button).toHaveClass("w-9");
    });
  });

  describe("typography", () => {
    it("uses DM Sans font family", () => {
      const { container } = render(<Button>Text</Button>);
      const button = container.querySelector("button");
      expect(button).toHaveClass("font-display");
    });

    it("uses 14px font size", () => {
      const { container } = render(<Button>Text</Button>);
      const button = container.querySelector("button");
      expect(button).toHaveClass("text-sm");
    });

    it("uses medium font weight (500)", () => {
      const { container } = render(<Button>Text</Button>);
      const button = container.querySelector("button");
      expect(button).toHaveClass("font-medium");
    });
  });

  describe("interaction", () => {
    it("handles click events", async () => {
      const handleClick = vi.fn();
      render(<Button onClick={handleClick}>Click me</Button>);
      const button = screen.getByRole("button");
      await button.click();
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("is disabled when disabled prop is true", () => {
      render(<Button disabled>Disabled</Button>);
      expect(screen.getByRole("button")).toBeDisabled();
    });

    it("applies disabled opacity styles", () => {
      const { container } = render(<Button disabled>Disabled</Button>);
      const button = container.querySelector("button");
      expect(button).toHaveClass("disabled:opacity-50");
    });
  });

  describe("accessibility", () => {
    it("has focus visible ring", () => {
      const { container } = render(<Button>Focus</Button>);
      const button = container.querySelector("button");
      expect(button).toHaveClass("focus-visible:ring-1");
      expect(button).toHaveClass("focus-visible:ring-ring");
    });

    it("forwards ref correctly", () => {
      const ref = { current: null as HTMLButtonElement | null };
      render(<Button ref={ref}>Ref Test</Button>);
      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    });
  });

  describe("custom className", () => {
    it("applies custom className", () => {
      const { container } = render(<Button className="custom-class">Custom</Button>);
      const button = container.querySelector("button");
      expect(button).toHaveClass("custom-class");
    });
  });

  describe("buttonVariants helper", () => {
    it("exports buttonVariants function", () => {
      expect(buttonVariants).toBeDefined();
      expect(typeof buttonVariants).toBe("function");
    });

    it("generates correct classes for primary variant", () => {
      const classes = buttonVariants({ variant: "primary" });
      expect(classes).toContain("bg-gray-100");
      expect(classes).toContain("text-gray-950");
    });

    it("generates correct classes for secondary variant", () => {
      const classes = buttonVariants({ variant: "secondary" });
      expect(classes).toContain("border-gray-600");
      expect(classes).toContain("text-gray-100");
    });
  });
});
