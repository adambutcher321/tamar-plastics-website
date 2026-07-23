'use client';

import { useState } from 'react';
import type { Faq } from '@/content/content-types';

export function FAQAccordion({ faqs }: { faqs: Faq[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="divide-y divide-ink-200 border-t border-b border-ink-200">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={faq.question}>
            <button
              type="button"
              className="w-full min-h-[44px] flex items-center justify-between py-4 text-left font-body font-semibold text-lg"
              aria-expanded={isOpen}
              onClick={() => setOpenIndex(isOpen ? null : index)}
            >
              <span>{faq.question}</span>
              <span aria-hidden="true">{isOpen ? '−' : '+'}</span>
            </button>
            {isOpen && (
              <p className="pb-4 text-base text-ink-800">{faq.answer}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}
