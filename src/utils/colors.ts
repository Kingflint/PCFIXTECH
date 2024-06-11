// Colour helpers used by status badges and the admin dashboard charts.

import type { OrderStatus } from "../data/constants";

export const STATUS_COLOURS: Record<OrderStatus, string> = {
  "order-placed": "#0ea5e9",
  "delivery-started": "#6366f1",
  "item-picked-up": "#8b5cf6",
  "service-started": "#ec4899",
  "service-completed": "#f59e0b",
  "awaiting-repair-payment": "#eab308",
  "repair-payment-completed": "#22c55e",
  "repair-started": "#10b981",
  "repair-completed": "#14b8a6",
  "ready-for-return": "#06b6d4",
  "return-in-progress": "#3b82f6",
  "completed": "#16a34a",
  "cancelled": "#ef4444",
};

export function statusColour(status: OrderStatus | undefined | null): string {
  if (!status) return "#94a3b8";
  return STATUS_COLOURS[status] ?? "#94a3b8";
}

export function contrastTextOn(hex: string): string {
  const value = hex.replace("#", "");
  if (value.length !== 6) return "#000";
  const r = parseInt(value.slice(0, 2), 16);
  const g = parseInt(value.slice(2, 4), 16);
  const b = parseInt(value.slice(4, 6), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.6 ? "#000" : "#fff";
}