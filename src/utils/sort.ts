// Reusable comparators for orders, products, and store purchases.

export type Comparator<T> = (a: T, b: T) => number;

export function byKey<T, K extends keyof T>(key: K, direction: "asc" | "desc" = "asc"): Comparator<T> {
  const sign = direction === "asc" ? 1 : -1;
  return (a, b) => {
    const av = a[key];
    const bv = b[key];
    if (av == null && bv == null) return 0;
    if (av == null) return -1 * sign;
    if (bv == null) return 1 * sign;
    if (typeof av === "number" && typeof bv === "number") return (av - bv) * sign;
    return String(av).localeCompare(String(bv)) * sign;
  };
}

export function byCreatedAtDesc<T extends { createdAt?: { toMillis?: () => number } | number | null }>(): Comparator<T> {
  return (a, b) => createdAtMs(b) - createdAtMs(a);
}

function createdAtMs(value: { createdAt?: { toMillis?: () => number } | number | null }): number {
  const raw = value.createdAt as any;
  if (!raw) return 0;
  if (typeof raw === "number") return raw;
  if (typeof raw.toMillis === "function") return raw.toMillis();
  if (raw.seconds) return raw.seconds * 1000;
  return 0;
}