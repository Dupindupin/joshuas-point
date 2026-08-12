'use client'

import {useId, useState} from 'react'

export type FaqItem = {
  answer: string
  id: string
  question: string
}

type FaqAccordionProps = {
  items: readonly FaqItem[]
  openFirstItem?: boolean
}

export function FaqAccordion({items, openFirstItem = true}: FaqAccordionProps) {
  const instanceId = useId()
  const [openItemId, setOpenItemId] = useState<string | null>(
    openFirstItem ? (items[0]?.id ?? null) : null,
  )

  return (
    <div className="border-t border-ink/20">
      {items.map((item, index) => {
        const isOpen = openItemId === item.id
        const buttonId = `${instanceId}-${item.id}-button`
        const panelId = `${instanceId}-${item.id}-panel`

        return (
          <section className="border-b border-ink/20" key={item.id}>
            <h2>
              <button
                aria-controls={panelId}
                aria-expanded={isOpen}
                className="group grid w-full grid-cols-[2.75rem_1fr_1.5rem] items-start gap-4 py-8 text-left text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus sm:grid-cols-[3.5rem_1fr_2rem] sm:gap-7 sm:py-10"
                id={buttonId}
                onClick={() => setOpenItemId(isOpen ? null : item.id)}
                type="button"
              >
                <span
                  aria-hidden="true"
                  className="pt-1 font-body text-[0.6875rem] font-semibold tracking-[0.16em] text-ink-subtle"
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="max-w-3xl font-display text-[1.75rem] leading-[1.12] font-medium tracking-[-0.025em] sm:text-[2.25rem]">
                  {item.question}
                </span>
                <span
                  aria-hidden="true"
                  className="pt-1 text-center font-body text-xl leading-none text-ink/55"
                >
                  {isOpen ? '−' : '+'}
                </span>
              </button>
            </h2>

            <div
              aria-labelledby={buttonId}
              className="pb-10 pl-[3.75rem] sm:pb-12 sm:pl-[5.25rem]"
              hidden={!isOpen}
              id={panelId}
              role="region"
            >
              <p className="max-w-2xl font-body text-base leading-8 text-ink/72 sm:text-lg sm:leading-9">
                {item.answer}
              </p>
            </div>
          </section>
        )
      })}
    </div>
  )
}
