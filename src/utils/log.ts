type Level = "info" | "warn" | "error";

const LEVEL_ORDER: Record<Level, number> = { info: 0, warn: 1, error: 2 };

let active: Level = (typeof window !== "undefined" && (window as any).__IFIX_LOG__) || "info";

export function setLogLevel(level: Level): void {
  active = level;
}

export function log(level: Level, message: string, data?: unknown): void {
  if (LEVEL_ORDER[level] < LEVEL_ORDER[active]) return;
  const fn = level === "info" ? console.log : level === "warn" ? console.warn : console.error;
  if (data !== undefined) fn(`[ifx] ${message}`, data);
  else fn(`[ifx] ${message}`);
}