'use client';

import { useState } from 'react';
import { Reveal } from '@/components/home/Reveal';
import type { Faq } from '@/content/content-types';

export function ProductFAQSection({ faqs }: { faqs: Faq[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="pd-faq-list">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <Reveal key={faq.question} delayMs={index * 80}>
            <div className="pd-faq-row">
              <button
                type="button"
                className="pd-faq-trigger"
                aria-expanded={isOpen}
                onClick={() => setOpenIndex(isOpen ? null : index)}
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
  );
}
