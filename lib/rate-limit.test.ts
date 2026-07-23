import { describe, it, expect, beforeEach } from 'vitest';
import { isRateLimited, __resetRateLimitStore } from './rate-limit';

describe('isRateLimited', () => {
  beforeEach(() => {
    __resetRateLimitStore();
  });

  it('allows the first few requests from a key', () => {
    for (let i = 0; i < 5; i++) {
      expect(isRateLimited('1.2.3.4', 1000)).toBe(false);
    }
  });

  it('blocks after the limit is exceeded within the window', () => {
    for (let i = 0; i < 5; i++) {
      isRateLimited('1.2.3.4', 1000);
    }
    expect(isRateLimited('1.2.3.4', 1000)).toBe(true);
  });

  it('resets once the window has passed', () => {
    for (let i = 0; i < 5; i++) {
      isRateLimited('1.2.3.4', 1000);
    }
    expect(isRateLimited('1.2.3.4', 1000 + 61_000)).toBe(false);
  });

  it('tracks separate keys independently', () => {
    for (let i = 0; i < 5; i++) {
      isRateLimited('1.2.3.4', 1000);
    }
    expect(isRateLimited('5.6.7.8', 1000)).toBe(false);
  });
});
