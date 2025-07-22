// Numeric helpers used in stock badges and analytics tiles.

export function clamp(value: number, min: number, max: number): number {
  if (Number.isNaN(value)) return min;
  return Math.max(min, Math.min(max, value));
}

export function compactNumber(value: number): string {
  if (!Number.isFinite(value)) return "0";
  const abs = Math.abs(value);
  if (abs >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
  if (abs >= 1_000) return `${(value / 1_000).toFixed(1)}k`;
  return String(Math.round(value));
}

export function safeAvg(values: number[]): number {
  if (values.length === 0) return 0;
  const finite = values.filter(Number.isFinite);
  if (finite.length === 0) return 0;
  const sum = finite.reduce((acc, v) => acc + v, 0);
  return sum / finite.length;
}