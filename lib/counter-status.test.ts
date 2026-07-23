import { describe, it, expect } from 'vitest';
import { getCounterStatus } from './counter-status';

// All fixture dates are in January (GMT, no BST offset) so UTC hour == London hour.
describe('getCounterStatus', () => {
  it('is open on a weekday mid-morning', () => {
    const monday10am = new Date('2026-01-05T10:00:00Z');
    expect(getCounterStatus(monday10am)).toEqual({
      isOpen: true,
      label: 'Counter open — closes 17:00',
    });
  });

  it('is closed before opening on a weekday', () => {
    const monday7am = new Date('2026-01-05T07:00:00Z');
    expect(getCounterStatus(monday7am)).toEqual({
      isOpen: false,
      label: 'Closed — opens 08:00 today',
    });
  });

  it('is closed after hours on a non-Friday weekday', () => {
    const monday6pm = new Date('2026-01-05T18:00:00Z');
    expect(getCounterStatus(monday6pm)).toEqual({
      isOpen: false,
      label: 'Closed — opens 08:00 tomorrow',
    });
  });

  it('is closed after hours on a Friday, pointing to Monday', () => {
    const friday6pm = new Date('2026-01-09T18:00:00Z');
    expect(getCounterStatus(friday6pm)).toEqual({
      isOpen: false,
      label: 'Closed — opens 08:00 Monday',
    });
  });

  it('is closed on a Saturday', () => {
    const saturday10am = new Date('2026-01-10T10:00:00Z');
    expect(getCounterStatus(saturday10am)).toEqual({
      isOpen: false,
      label: 'Closed — opens 08:00 Monday',
    });
  });

  it('is closed on a Sunday', () => {
    const sunday10am = new Date('2026-01-11T10:00:00Z');
    expect(getCounterStatus(sunday10am)).toEqual({
      isOpen: false,
      label: 'Closed — opens 08:00 Monday',
    });
  });
});
