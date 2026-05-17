'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

type Faq = { question: string; answer: string }

export function ServiceFaqAccordion({ faqs }: { faqs: Faq[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="space-y-3">
      {faqs.map((faq, i) => {
        const isOpen = openIndex === i
        return (
          <div
            key={i}
            className="rounded-2xl border border-border bg-white overflow-hidden transition-shadow hover:shadow-sm"
          >
            <button
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              aria-expanded={isOpen}
            >
              <span className="font-semibold text-gray-900 text-base leading-snug">
                {faq.question}
              </span>
              <ChevronDown
                size={20}
                className={`shrink-0 text-primary transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
              />
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96' : 'max-h-0'}`}
            >
              <p className="px-6 pb-5 text-muted-foreground leading-relaxed">{faq.answer}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
