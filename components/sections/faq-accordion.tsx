'use client'

import * as React from 'react'
import { Plus, Minus } from 'lucide-react'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'
import { siteConfig } from '@/data/site-config'

interface Faq {
  id: string
  question: string
  answer: string
  category?: { name: string } | null
}

export function FAQAccordion({ dbFaqs = [] }: { dbFaqs?: Faq[] }) {
  const [openIndex, setOpenIndex] = React.useState<string | null>(null)

  const groupedFaqs = dbFaqs.reduce((acc, faq) => {
    const catName = faq.category?.name || 'General'
    if (!acc[catName]) acc[catName] = []
    acc[catName].push(faq)
    return acc
  }, {} as Record<string, Faq[]>)

  const categories = Object.keys(groupedFaqs)

  if (dbFaqs.length === 0) return null

  return (
    <section className="py-24 bg-muted/20">
      <div className="container-premium max-w-4xl">
        {/* Header */}
        <div className="mb-16 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-4 py-1.5 text-primary text-sm font-bold mb-5">
            Got Questions?
          </div>
          <h2 className="text-4xl font-black tracking-tight sm:text-5xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Everything you need to know before you book.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-10">
          {categories.map((category) => (
            <div key={category}>
              {categories.length > 1 && (
                <h3 className="text-xl font-black mb-5 text-gray-900 flex items-center gap-3">
                  <span className="h-px flex-1 bg-border" />
                  {category}
                  <span className="h-px flex-1 bg-border" />
                </h3>
              )}
              <div className="space-y-3">
                {groupedFaqs[category].map((faq) => (
                  <div
                    key={faq.id}
                    className={cn(
                      'rounded-2xl border transition-all duration-200',
                      openIndex === faq.id
                        ? 'bg-white border-primary/30 shadow-soft'
                        : 'bg-white border-border hover:border-primary/20'
                    )}
                  >
                    <button
                      className="flex w-full items-center justify-between p-6 text-left"
                      onClick={() => setOpenIndex(openIndex === faq.id ? null : faq.id)}
                    >
                      <span className="text-base font-bold text-foreground pr-4">{faq.question}</span>
                      <div
                        className={cn(
                          'flex h-8 w-8 items-center justify-center rounded-full shrink-0 transition-all duration-300',
                          openIndex === faq.id
                            ? 'bg-primary text-white'
                            : 'bg-muted text-primary'
                        )}
                      >
                        {openIndex === faq.id ? <Minus size={16} /> : <Plus size={16} />}
                      </div>
                    </button>

                    <AnimatePresence>
                      {openIndex === faq.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-6 pt-0 text-muted-foreground leading-relaxed">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground text-sm mb-3">Still have questions?</p>
          <a
            href={siteConfig.links.whatsapp}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-green-500 px-6 py-3 text-sm font-bold text-white hover:bg-green-600 transition-colors"
          >
            Chat with us on WhatsApp →
          </a>
        </div>
      </div>
    </section>
  )
}
