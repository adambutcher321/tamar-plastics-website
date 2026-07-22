const WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 5;

let hits = new Map<string, number[]>();

export function isRateLimited(key: string, now: number = Date.now()): boolean {
  const existing = hits.get(key) ?? [];
  const withinWindow = existing.filter((timestamp) => now - timestamp < WINDOW_MS);
  withinWindow.push(now);
  hits.set(key, withinWindow);
  return withinWindow.length > MAX_REQUESTS_PER_WINDOW;
}

/** Test-only: clears the module-level store between test cases. */
export function __resetRateLimitStore(): void {
  hits = new Map();
}
