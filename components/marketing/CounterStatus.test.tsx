import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CounterStatus } from './CounterStatus';

describe('CounterStatus', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('shows the open label during opening hours', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-01-05T10:00:00Z')); // Monday 10am GMT
    render(<CounterStatus />);
    expect(screen.getByText('Counter open — closes 17:00')).toBeInTheDocument();
  });

  it('shows a closed label outside opening hours', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-01-10T10:00:00Z')); // Saturday
    render(<CounterStatus />);
    expect(screen.getByText('Closed — opens 08:00 Monday')).toBeInTheDocument();
  });
});
