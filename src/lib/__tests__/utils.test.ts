import { describe, expect, it } from "vitest";

import { cn } from "@/lib/utils";

describe("cn", () => {
  it("merges tailwind classes", () => {
    expect(cn("p-2", "p-4")).toBe("p-4");
  });

  it("handles conditional classes", () => {
    expect(cn("text-slate-200", false && "hidden", true && "font-semibold")).toBe(
      "text-slate-200 font-semibold"
    );
  });

  it("returns empty string when no inputs", () => {
    expect(cn()).toBe("");
  });
});
