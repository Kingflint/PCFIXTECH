import { describe, it, expect } from "vitest";
import {
  safeTrim,
  validateAddress,
  validateBooking,
  validateEmail,
  validateName,
} from "../src/utils/validation";

describe("validateEmail", () => {
  it.each([
    ["user@example.com", true],
    ["a@b.co", true],
    ["no-at-symbol", false],
    ["double@@bad.com", false],
    ["", false],
  ])("validateEmail(%s) -> %s", (input, expected) => {
    expect(validateEmail(input)).toBe(expected);
  });
});

describe("validateName", () => {
  it("accepts a normal name", () => {
    expect(validateName("Bola Akin")).toBe(true);
  });

  it("rejects a single character", () => {
    expect(validateName("B")).toBe(false);
  });

  it("rejects empty input", () => {
    expect(validateName("")).toBe(false);
  });

  it("rejects too-long input", () => {
    expect(validateName("a".repeat(81))).toBe(false);
  });
});

describe("validateAddress", () => {
  it("requires at least 10 characters", () => {
    expect(validateAddress("11 Shaba Ojo")).toBe(true);
    expect(validateAddress("short")).toBe(false);
  });
});

describe("validateBooking", () => {
  it("collects missing-field errors", () => {
    const result = validateBooking({});
    expect(result.ok).toBe(false);
    expect(result.errors).toEqual(
      expect.arrayContaining([
        "Please provide a valid name",
        "Please choose a device",
        "Describe the issue in at least 10 characters",
      ]),
    );
  });

  it("passes with a complete payload", () => {
    const result = validateBooking({
      name: "Bola Akin",
      device: "iPhone 14",
      description: "Cracked screen, replace it please.",
      email: "bola@example.com",
    });
    expect(result.ok).toBe(true);
    expect(result.errors).toEqual([]);
  });

  it("rejects an invalid email even when other fields are present", () => {
    const result = validateBooking({
      name: "Bola Akin",
      device: "iPhone 14",
      description: "Cracked screen, replace it please.",
      email: "not-an-email",
    });
    expect(result.ok).toBe(false);
    expect(result.errors).toContain("Invalid email address");
  });
});

describe("safeTrim", () => {
  it("trims and clamps strings", () => {
    expect(safeTrim("   hello   ", 10)).toBe("hello");
  });

  it("returns empty for non-string input", () => {
    expect(safeTrim(undefined)).toBe("");
    expect(safeTrim(42)).toBe("");
  });

  it("clamps to the max length", () => {
    expect(safeTrim("a".repeat(20), 5)).toBe("aaaaa");
  });
});
