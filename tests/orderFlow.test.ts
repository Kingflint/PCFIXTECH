import { describe, it, expect } from "vitest";
import {
  isTerminal,
  nextOrderStatus,
  previousOrderStatus,
  progressPercent,
} from "../src/utils/orderFlow";

describe("nextOrderStatus", () => {
  it("walks the standard flow", () => {
    expect(nextOrderStatus("order-placed")).toBe("delivery-started");
    expect(nextOrderStatus("ready-for-return")).toBe("return-in-progress");
  });

  it("returns null at the end of the flow", () => {
    expect(nextOrderStatus("completed")).toBeNull();
  });

  it("walks the physical-only flow", () => {
    expect(nextOrderStatus("order-placed", true)).toBe("service-started");
  });

  it("returns null when the status is not part of the flow", () => {
    expect(nextOrderStatus("cancelled")).toBeNull();
  });
});

describe("previousOrderStatus", () => {
  it("walks the standard flow backwards", () => {
    expect(previousOrderStatus("delivery-started")).toBe("order-placed");
  });

  it("returns null at the start of the flow", () => {
    expect(previousOrderStatus("order-placed")).toBeNull();
  });
});

describe("progressPercent", () => {
  it("returns 0 for cancelled orders", () => {
    expect(progressPercent("cancelled")).toBe(0);
  });

  it("returns 100 at the end of the standard flow", () => {
    expect(progressPercent("completed")).toBe(100);
  });

  it("returns ~50% mid-flow", () => {
    const value = progressPercent("repair-payment-completed");
    expect(value).toBeGreaterThan(40);
    expect(value).toBeLessThan(80);
  });
});

describe("isTerminal", () => {
  it("flags completed and cancelled", () => {
    expect(isTerminal("completed")).toBe(true);
    expect(isTerminal("cancelled")).toBe(true);
  });

  it("does not flag in-progress statuses", () => {
    expect(isTerminal("repair-started")).toBe(false);
  });
});
