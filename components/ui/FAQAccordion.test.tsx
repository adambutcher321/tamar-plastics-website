import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FAQAccordion } from './FAQAccordion';

const faqs = [
  { question: 'Do you fit as well as supply?', answer: 'Yes, both.' },
  { question: 'Do you deliver?', answer: 'Yes, within the service area.' },
];

describe('FAQAccordion', () => {
  it('renders every question', () => {
    render(<FAQAccordion faqs={faqs} />);
    expect(screen.getByText('Do you fit as well as supply?')).toBeInTheDocument();
    expect(screen.getByText('Do you deliver?')).toBeInTheDocument();
  });

  it('reveals an answer when its question is activated', async () => {
    const user = userEvent.setup();
    render(<FAQAccordion faqs={faqs} />);
    await user.click(screen.getByRole('button', { name: 'Do you fit as well as supply?' }));
    expect(screen.getByText('Yes, both.')).toBeVisible();
  });
});
