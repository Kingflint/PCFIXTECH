// Date and duration helpers used by order tracking and the admin dashboard.

const MS_PER_DAY = 24 * 60 * 60 * 1000;

export function startOfDay(date: Date): Date {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

export function daysBetween(a: Date, b: Date): number {
  const diff = startOfDay(b).getTime() - startOfDay(a).getTime();
  return Math.round(diff / MS_PER_DAY);
}

export function addDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

export function formatRelative(date: Date, now: Date = new Date()): string {
  const diffMs = now.getTime() - date.getTime();
  const seconds = Math.round(diffMs / 1000);
  if (Math.abs(seconds) < 60) return seconds <= 0 ? "in a moment" : "just now";
  const minutes = Math.round(seconds / 60);
  if (Math.abs(minutes) < 60) return minutes > 0 ? `${minutes}m ago` : `in ${-minutes}m`;
  const hours = Math.round(minutes / 60);
  if (Math.abs(hours) < 24) return hours > 0 ? `${hours}h ago` : `in ${-hours}h`;
  const days = Math.round(hours / 24);
  return days > 0 ? `${days}d ago` : `in ${-days}d`;
}

export function overstayDays(orderDate: Date, graceDays: number, now: Date = new Date()): number {
  const elapsed = daysBetween(orderDate, now);
  return Math.max(0, elapsed - graceDays);
}

export function calculateOverstayFee(orderDate: Date, graceDays: number, perDay: number, now: Date = new Date()): number {
  const days = overstayDays(orderDate, graceDays, now);
  return days * perDay;
}
