import { describe, it, expect } from "vitest";
import {
  addDays,
  calculateOverstayFee,
  daysBetween,
  formatRelative,
  overstayDays,
  startOfDay,
} from "../src/utils/dates";

const date = (iso: string) => new Date(iso);

describe("startOfDay", () => {
  it("zeroes the time component", () => {
    const d = startOfDay(date("2026-04-22T15:34:00Z"));
    expect(d.getHours()).toBe(0);
    expect(d.getMinutes()).toBe(0);
    expect(d.getSeconds()).toBe(0);
  });
});

describe("daysBetween", () => {
  it("returns positive count for forward movement", () => {
    expect(daysBetween(date("2026-04-20T00:00:00Z"), date("2026-04-25T00:00:00Z"))).toBe(5);
  });

  it("returns 0 for the same day", () => {
    expect(daysBetween(date("2026-04-20T08:00:00Z"), date("2026-04-20T22:00:00Z"))).toBe(0);
  });
});

describe("addDays", () => {
  it("does not mutate the input", () => {
    const base = date("2026-01-01T00:00:00Z");
    const added = addDays(base, 7);
    expect(added.getTime()).toBeGreaterThan(base.getTime());
    expect(base.toISOString()).toBe("2026-01-01T00:00:00.000Z");
  });
});

describe("formatRelative", () => {
  const now = date("2026-04-22T12:00:00Z");

  it("describes seconds", () => {
    expect(formatRelative(date("2026-04-22T11:59:30Z"), now)).toBe("just now");
  });

  it("describes minutes", () => {
    expect(formatRelative(date("2026-04-22T11:30:00Z"), now)).toBe("30m ago");
  });

  it("describes hours", () => {
    expect(formatRelative(date("2026-04-22T08:00:00Z"), now)).toBe("4h ago");
  });

  it("describes days", () => {
    expect(formatRelative(date("2026-04-19T12:00:00Z"), now)).toBe("3d ago");
  });
});

describe("overstayDays", () => {
  it("returns 0 within the grace period", () => {
    expect(overstayDays(date("2026-04-20T00:00:00Z"), 3, date("2026-04-22T00:00:00Z"))).toBe(0);
  });

  it("returns days past the grace period", () => {
    expect(overstayDays(date("2026-04-15T00:00:00Z"), 3, date("2026-04-22T00:00:00Z"))).toBe(4);
  });
});

describe("calculateOverstayFee", () => {
  it("multiplies overstay days by per-day fee", () => {
    expect(
      calculateOverstayFee(date("2026-04-15T00:00:00Z"), 3, 300, date("2026-04-22T00:00:00Z")),
    ).toBe(1200);
  });
});
