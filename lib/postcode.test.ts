import { describe, it, expect } from 'vitest';
import { isInServiceArea } from './postcode';

describe('isInServiceArea', () => {
  it('accepts a Saltash postcode with a space', () => {
    expect(isInServiceArea('PL12 6TW')).toBe(true);
  });

  it('accepts a Saltash postcode without a space, lowercase', () => {
    expect(isInServiceArea('pl126tw')).toBe(true);
  });

  it('accepts a central Plymouth postcode', () => {
    expect(isInServiceArea('PL4 8AA')).toBe(true);
  });

  it('rejects a postcode outside the service area', () => {
    expect(isInServiceArea('EX1 1AA')).toBe(false);
  });

  it('rejects garbage input without throwing', () => {
    expect(isInServiceArea('not a postcode')).toBe(false);
  });

  it('rejects an empty string', () => {
    expect(isInServiceArea('')).toBe(false);
  });
});
