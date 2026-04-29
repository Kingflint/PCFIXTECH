import { describe, it, expect } from "vitest";
import { cn } from "../src/app/components/ui/utils";
import { formatPrice } from "../src/data/constants";

describe("cn", () => {
  it("merges class names", () => {
    expect(cn("a", "b")).toBe("a b");
  });

  it("dedupes tailwind utilities", () => {
    expect(cn("p-2", "p-4")).toBe("p-4");
  });

  it("filters falsy values", () => {
    expect(cn("a", false && "b", null, undefined, "c")).toBe("a c");
  });
});

describe("formatPrice", () => {
  it("renders with naira sign and thousand separators", () => {
    expect(formatPrice(15000)).toBe("\u20A615,000");
  });

  it("handles zero", () => {
    expect(formatPrice(0)).toBe("\u20A60");
  });
});
