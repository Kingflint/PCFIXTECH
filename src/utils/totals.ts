// Totals helpers shared by the booking flow and admin dashboard.

import { calculateOverstayFee } from "./dates";

export interface RepairTotalInput {
  repairFee?: number;
  deliveryFee?: number;
  diagnosisFee?: number;
}

export interface StoreTotalInput {
  amount?: number;
  deliveryFee?: number;
  discount?: number;
}

export function repairTotal(order: RepairTotalInput): number {
  const fee = (order.repairFee ?? 0) + (order.deliveryFee ?? 0) + (order.diagnosisFee ?? 0);
  return Math.max(0, Math.round(fee));
}

export function storeOrderTotal(order: StoreTotalInput): number {
  const total = (order.amount ?? 0) + (order.deliveryFee ?? 0) - (order.discount ?? 0);
  return Math.max(0, Math.round(total));
}

export function totalWithOverstay(
  order: RepairTotalInput & { createdAt?: unknown; graceDays?: number; perDay?: number },
  now: Date = new Date(),
): number {
  const base = repairTotal(order);
  if (!order.createdAt) return base;
  const raw = order.createdAt as { toMillis?: () => number } | string | number | Date;
  const created =
    typeof raw === "object" && raw !== null && typeof (raw as { toMillis?: () => number }).toMillis === "function"
      ? new Date((raw as { toMillis: () => number }).toMillis())
      : new Date(raw as string | number | Date);
  const overstay = calculateOverstayFee(created, order.graceDays ?? 3, order.perDay ?? 0, now);
  return base + overstay;
}