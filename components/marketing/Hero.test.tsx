import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Hero } from './Hero';

describe('Hero', () => {
  it('renders the H1 headline text', () => {
    render(<Hero posterSrc="/placeholders/hero-roofline.svg" />);
    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /uPVC windows, doors and roofline/i,
      })
    ).toBeInTheDocument();
  });

  it('renders the eyebrow text', () => {
    render(<Hero posterSrc="/placeholders/hero-roofline.svg" />);
    expect(screen.getByText('SALTASH, CORNWALL · EST. AS CARLTON PLASTICS')).toBeInTheDocument();
  });

  it('does not render a <video> element when no videoSrc is given', () => {
    render(<Hero posterSrc="/placeholders/hero-roofline.svg" />);
    expect(document.querySelector('video')).not.toBeInTheDocument();
  });

  it('renders a <video> element when videoSrc is given', () => {
    render(<Hero posterSrc="/placeholders/hero-roofline.svg" videoSrc="/media/hero.mp4" />);
    expect(document.querySelector('video')).toBeInTheDocument();
  });

  it('renders both audience fork links', () => {
    render(<Hero posterSrc="/placeholders/hero-roofline.svg" />);
    expect(screen.getByRole('link', { name: /buying for a job/i })).toHaveAttribute('href', '/trade/');
    expect(screen.getByRole('link', { name: /improving your home/i })).toHaveAttribute(
      'href',
      '/home-improvements/'
    );
  });
});
