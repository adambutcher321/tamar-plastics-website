'use client';

import { useState } from 'react';
import { Reveal } from '@/components/home/Reveal';
import type { Faq } from '@/content/content-types';

export function ProductFAQSection({ faqs }: { faqs: Faq[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Split FAQs evenly into 2 columns (3 on left, 3 on right) to balance the page layout
  const mid = Math.ceil(faqs.length / 2);
  const leftFaqs = faqs.slice(0, mid);
  const rightFaqs = faqs.slice(mid);

  return (
    <div className="pd-faq-grid">
      <div className="pd-faq-list">
        {leftFaqs.map((faq, index) => {
          const globalIndex = index;
          const isOpen = openIndex === globalIndex;
          return (
            <Reveal key={faq.question} delayMs={index * 60}>
              <div className="pd-faq-row">
                <button
                  type="button"
                  className="pd-faq-trigger"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIndex(isOpen ? null : globalIndex)}
                >
                  <span className="pd-faq-question">{faq.question}</span>
                  <span className="pd-faq-plus" aria-hidden="true">
                    +
                  </span>
                </button>
                {isOpen && <p className="pd-faq-answer">{faq.answer}</p>}
              </div>
            </Reveal>
          );
        })}
      </div>

      <div className="pd-faq-list">
        {rightFaqs.map((faq, index) => {
          const globalIndex = mid + index;
          const isOpen = openIndex === globalIndex;
          return (
            <Reveal key={faq.question} delayMs={(mid + index) * 60}>
              <div className="pd-faq-row">
                <button
                  type="button"
                  className="pd-faq-trigger"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIndex(isOpen ? null : globalIndex)}
                >
                  <span className="pd-faq-question">{faq.question}</span>
                  <span className="pd-faq-plus" aria-hidden="true">
                    +
                  </span>
                </button>
                {isOpen && <p className="pd-faq-answer">{faq.answer}</p>}
              </div>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}
