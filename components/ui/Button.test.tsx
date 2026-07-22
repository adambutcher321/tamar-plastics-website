import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders primary variant with orange fill and near-black text classes', () => {
    render(<Button variant="primary">Book a survey</Button>);
    const button = screen.getByRole('button', { name: 'Book a survey' });
    expect(button.className).toContain('bg-tamar-orange');
    expect(button.className).toContain('text-tamar-black');
  });

  it('renders dark variant with black fill and white text classes', () => {
    render(<Button variant="dark">Call the counter</Button>);
    const button = screen.getByRole('button', { name: 'Call the counter' });
    expect(button.className).toContain('bg-tamar-black');
    expect(button.className).toContain('text-white');
  });

  it('renders as a link when href is provided', () => {
    render(<Button variant="primary" href="/trade/">Open a trade account</Button>);
    const link = screen.getByRole('link', { name: 'Open a trade account' });
    expect(link).toHaveAttribute('href', '/trade/');
  });

  it('meets the minimum 44px tap target via padding classes', () => {
    render(<Button variant="primary">Tap me</Button>);
    const button = screen.getByRole('button', { name: 'Tap me' });
    expect(button.className).toMatch(/min-h-\[44px\]/);
  });
});
