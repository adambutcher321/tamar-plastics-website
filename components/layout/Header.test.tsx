import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Header } from './Header';

describe('Header', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('renders links to both audience funnels', () => {
    render(<Header />);
    expect(screen.getByRole('link', { name: /trade/i })).toHaveAttribute('href', '/trade/');
    expect(screen.getByRole('link', { name: /home improvements/i })).toHaveAttribute(
      'href',
      '/home-improvements/'
    );
  });

  it('persists the chosen mode to localStorage when a toggle link is clicked', async () => {
    const user = userEvent.setup();
    render(<Header />);
    await user.click(screen.getByRole('link', { name: /trade/i }));
    expect(window.localStorage.getItem('tamar-audience-mode')).toBe('trade');
  });

  it('renders the phone number as a tel: link', () => {
    render(<Header />);
    const phoneLink = screen.getByRole('link', { name: '01752 841234' });
    expect(phoneLink).toHaveAttribute('href', 'tel:+441752841234');
  });
});
