// Exponential-backoff retry for flaky network calls.

export interface RetryOptions {
  attempts?: number;
  baseMs?: number;
  jitter?: boolean;
}

export async function withRetry<T>(fn: () => Promise<T>, opts: RetryOptions = {}): Promise<T> {
  const attempts = opts.attempts ?? 3;
  const base = opts.baseMs ?? 250;
  let lastError: unknown;
  for (let i = 0; i < attempts; i += 1) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
      if (i === attempts - 1) break;
      const delay = base * 2 ** i + (opts.jitter === false ? 0 : Math.random() * base);
      await new Promise((r) => setTimeout(r, delay));
    }
  }
  throw lastError;
}